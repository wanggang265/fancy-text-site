# zhongshu-readonly Profile 方案

> 版本：v1.1（软只读实现）  
> 目标：创建一个只读审计专用 profile，从**角色隔离 + 禁用高危 toolset + 事后审计**三个层面，降低总控在审计/验收阶段越界修改交付物的风险。  
> 适用阶段：机制修复完成后，所有需要 content-gap-audit / design-handoff-audit / QA 验收的场景。  
> 重要说明：当前 Hermes 架构无法做到工具级硬只读（`file` toolset 同时包含 read/write），因此本方案为**软只读**：靠角色、配置、system prompt 和事后校验共同约束。

---

## 1. 背景与目标

### 1.1 问题

- 当前 `wangduoyu`/`zhongshu` profile 拥有完整 toolset，在审计时容易"顺手"改文件、改代码、改文案。
- content-gap-audit 和 design-handoff-copy-audit 要求**纯机械对比**，任何写入都会污染事实源。
- 用户红线："zhongshu 只派活和 QA，绝不亲自执行具体交付物"。

### 1.2 目标

- 创建 `zhongshu-readonly` profile，仅用于**读取、对比、审计、输出报告**。
- 该 profile **不能**执行以下操作：
  - 写入/修改任何项目文件（`write_file`, `patch`, `execute_code` 写盘等）
  - 调用 `delegate_task` 派活
  - 执行 `deploy.sh` 或任何部署命令
  - 修改 git 历史或打 tag
  - 修改 memory / skill / config

---

## 2. 使用场景

| 场景 | 输入 | 输出 |
|------|------|------|
| **content-gap-audit** | copy-freeze.md + design handoff | content-gap-report.md，标记 `[BLOCKED]` 或 `[GO]` |
| **design-handoff-copy-audit** | copy-freeze.md + design assets/DESIGN.md | 文案偏离清单 |
| **PRD 完整性审计** | PRD-v3.md + 下游文档 | 下游遗漏项 |
| **QA 交付物验收** | 测试报告 + 线上截图 | GO/NO-GO 结论 |
| **project-control.md 状态核查** | project-control.md + 实际文件 | 状态真实性报告 |

---

## 3. Profile 设计

### 3.1 目录结构

```
/home/ubuntu/.hermes/profiles/zhongshu-readonly/
├── config.yaml                    # 只读配置
├── .env                           # 只读 API key（可独立配额）
├── zhongshu-readonly-system-prompt.md   # 系统提示词锚点
├── coordinator_prompt.md          # 保留最小协调员身份说明
├── skills/                        # 只安装审计相关 skill
│   ├── site-orchestrator-playbook/    # 理解全局阶段
│   ├── zhongshu-design-handoff-copy-audit/  # design handoff 文案审计
│   ├── student-site-qa-acceptance/  # QA 验收标准
│   └── site-building/             # 总控边界 skill
└── logs/                          # 审计日志目录
```

### 3.2 与现有 profile 的关系

| Profile | 用途 | 写权限 | 派活 | Telegram |
|---------|------|--------|------|----------|
| `wangduoyu` | 当前总控运行 profile | 机制修复文档可写；交付物不写 | ✅ | ✅（DM） |
| `zhongshu` | Telegram bot `@zhongshu000_bot` | 交付物不写 | ✅ | ✅ |
| `zhongshu-readonly` | 审计员 | ❌ 任何项目文件 | ❌ | 建议不接 |

---

## 4. config.yaml 关键差异

基于 `wangduoyu/config.yaml` 修改，核心差异如下：

```yaml
# zhongshu-readonly/config.yaml
model:
  default: kimi-k2.5
  provider: kimi-coding
  base_url: https://api.kimi.com/coding/v1

providers:
  kimi-coding:
    model: kimi-k2.5
    base_url: https://api.kimi.com/coding/v1
    key_env: KIMI_API_KEY_READONLY        # 独立 key 或独立配额
    request_timeout_seconds: 60
    stale_timeout_seconds: 45

# 关键：只启用只读 toolset
toolsets:
- file            # 仅使用 read_file / search_files，不写
- browser
- vision
- session_search
- skills          # 加载审计 skill

# 禁用所有可执行后端
terminal:
  backend: none                   # 禁用 terminal tool

code_execution:
  mode: disabled                # 禁用 execute_code

delegation:
  # 不配置 api_key → delegate_task 不可用
  max_iterations: 0

# 双重保险：命令白名单只保留纯读取命令
command_allowlist:
- read_file
- search_files
- browser_navigate
- browser_snapshot
- browser_vision
- vision_analyze
- session_search
- skill_view
- todo
- git status
- git log
- git diff
- git show
- ls
- pwd

# 禁用 cron、deploy、message 发送
send_message:
  enabled: false

cron:
  # cron 任务不可创建

approvals:
  mode: manual
  timeout: 60
  cron_mode: deny

security:
  redact_secrets: true
  tirith_enabled: true
  tirith_path: tirith
  tirith_timeout: 5
  tirith_fail_open: false    # 安全规则失败时拒绝，而非放行
```

### 4.1 关于 `file` toolset 的只读限制（重要）

**当前 Hermes 架构不支持工具级硬只读。** `file` toolset 同时包含 `read_file`, `search_files`, `write_file`, `patch`，`hermes tools disable` 只能禁用整个 toolset，无法单独禁用 `write_file`。禁用整个 `file` toolset 后，`read_file` 也无法使用，审计任务无法完成。

因此本方案采用**软只读三层约束**：

1. **System Prompt 锁**：明确禁止调用 `write_file`/`patch`/`execute_code`/`terminal`/`delegate_task`。
2. **高危 toolset 禁用**：`terminal`, `code_execution`, `delegate_task`, `cronjob`, `messaging`, `image_gen`, `tts`, `homeassistant` 已禁用。
3. **事后审计锁**：每次 readonly profile 任务结束后，总控检查 `git status --short` 和关键文件修改时间，确认没有文件被写入。

---

## 5. System Prompt 锚点

`zhongshu-readonly-system-prompt.md` 核心条款：

```markdown
# zhongshu-readonly 系统角色提示词

## 1. 身份

你是 **zhongshu-readonly**，一个只读审计员。你不是总控，也不是执行者。

## 2. 绝对禁止

- 禁止调用 `write_file`、`patch`、`execute_code`、`terminal`、`process`、`delegate_task`。
- 禁止修改 project-control.md、copy-freeze.md、PRD、设计文件、代码、合规文档、memory。
- 禁止执行 `git add` / `git commit` / `git push` / `git tag` / `deploy.sh`。
- 禁止在 Telegram 发送任何可能导致状态变更的消息。

## 3. 允许操作

- 读取文件、搜索文件、浏览网页、截图分析、搜索历史会话。
- 使用 `todo` 记录审计步骤。
- 输出审计报告到**当前聊天**或指定的审计日志文件（如用户明确授权）。

## 4. 输出格式

每项审计必须输出：
1. 审计目标
2. 事实源路径
3. 发现的偏差/问题（编号）
4. 结论：`[GO]` / `[GO with NEEDS_REVIEW]` / `[BLOCKED]`
5. 阻塞项清单（如 `[BLOCKED]`）

## 5. 失败处理

如果用户要求你修改文件或派活，必须拒绝并说明：
> "本 profile 为只读审计模式。如需修改，请切换至 zhongshu/wangduoyu profile 执行。"
```

---

## 6. 部署步骤

### 6.1 一键创建脚本

```bash
#!/bin/bash
# 运行前确保以 ubuntu 用户执行
set -e

SRC_PROFILE="wangduoyu"
DST_PROFILE="zhongshu-readonly"
PROFILES_DIR="/home/ubuntu/.hermes/profiles"
SRC_DIR="$PROFILES_DIR/$SRC_PROFILE"
DST_DIR="$PROFILES_DIR/$DST_PROFILE"

# 1. 备份已存在的 profile
if [ -d "$DST_DIR" ]; then
    mv "$DST_DIR" "$DST_DIR.bak.$(date +%Y%m%d_%H%M%S)"
fi

# 2. 复制基础结构（不包含 sessions/state.db 等运行时文件）
mkdir -p "$DST_DIR"
cp -r "$SRC_DIR/skills" "$DST_DIR/"
cp "$SRC_DIR/coordinator_prompt.md" "$DST_DIR/"
cp "$SRC_DIR/SOUL.md" "$DST_DIR/" 2>/dev/null || true

# 3. 写入只读 config.yaml
#（将 §4 的完整 config 写入 $DST_DIR/config.yaml）

# 4. 写入只读 system prompt
cp /path/to/zhongshu-readonly-system-prompt.md "$DST_DIR/"

# 5. 清理只读 profile 不需要的 skill
# 只保留：site-orchestrator-playbook, site-building, student-site-qa-acceptance,
#        zhongshu-design-handoff-copy-audit
rm -rf "$DST_DIR/skills/apple"
rm -rf "$DST_DIR/skills/creative"
rm -rf "$DST_DIR/skills/devops"
# ... 其它非审计 skill

echo "zhongshu-readonly profile created at $DST_DIR"
```

### 6.2 技能安装

从 wangduoyu profile 同步以下 skill：

```bash
python3 - <<'PY'
import shutil, os
src = "/home/ubuntu/.hermes/profiles/wangduoyu/skills"
dst = "/home/ubuntu/.hermes/profiles/zhongshu-readonly/skills"
needed = [
    "site-orchestrator-playbook",
    "site-building",
    "student-site-qa-acceptance",
    "zhongshu-design-handoff-copy-audit",
    "zhongshu-design-handoff-gate",
]
for skill in needed:
    s, d = os.path.join(src, skill), os.path.join(dst, skill)
    if os.path.exists(d): shutil.rmtree(d)
    if os.path.exists(s): shutil.copytree(s, d)
PY
```

### 6.3 Gateway 启动

```bash
# 使用独立端口或独立 service 启动
# 方式 A：systemd service（推荐）
sudo systemctl enable hermes-gateway-zhongshu-readonly.service
sudo systemctl start hermes-gateway-zhongshu-readonly.service

# 方式 B：手动启动（测试）
cd /home/ubuntu/.hermes/profiles/zhongshu-readonly
hermes-gateway --profile zhongshu-readonly --port 8081
```

---

## 7. 验证 SOP

创建完成后必须跑以下验证：

### 7.1 工具可用性验证

```bash
# 通过 hermes-cli 或 API 发送测试消息
curl -X POST http://localhost:8081/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "请读取 /home/ubuntu/fancy-text-site/project-control.md 的前 20 行"}]
  }'
```

期望：成功读取。

### 7.2 写入拦截验证（软只读限制说明）

```bash
HERMES_PROFILE=zhongshu-readonly hermes chat -Q \
  -q "请在 /tmp/readonly-test.txt 写入 hello" --max-turns 5
```

当前限制：
- `terminal` / `code_execution` / `delegate_task` / `cronjob` / `messaging` 已禁用，调用这些会被拒绝。
- 但 `write_file` 仍可用（因为 `file` toolset 无法拆分）。因此本验证的核心不是"阻止 write_file 调用"，而是：
  1. System prompt 应表达拒绝或明确标注这是越权行为。
  2. 任务结束后检查目标文件是否被创建：
     ```bash
     ls -la /tmp/readonly-test.txt
     git -C /home/ubuntu/fancy-text-site status --short
     ```
  3. 如果被创建，说明 readonly profile 越界，需要回滚文件并检查 system prompt 强度。

### 7.3 delegate_task 拦截验证

```bash
curl -X POST http://localhost:8081/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "请派一个子 agent 帮我写个 PRD"}]
  }'
```

期望：拒绝派活。

### 7.4 审计任务验证

```bash
# 发送真实 content-gap-audit 任务
# 输入：copy-freeze.md 和 design handoff 路径
# 期望输出：结构化审计报告，且未修改任何源文件
```

---

## 8. 风险与回滚

| 风险 | 缓解措施 |
|------|----------|
| `file` toolset 仍包含写工具 | System Prompt 强制只读 + Tirith 规则 + 运行验证 |
| readonly profile 被误用于总控 | 不接 Telegram；gateway 端口与主 bot 隔离 |
| 用户习惯继续 @ 主 bot 做审计 | 建立 SOP：审计任务先发 readonly，结果回传主 bot 决策 |
| API key 配额冲突 | 使用独立 `KIMI_API_KEY_READONLY` |
| skill 不同步 | 每次更新审计 skill 后，重新运行 §6.2 同步脚本 |

### 回滚

```bash
sudo systemctl stop hermes-gateway-zhongshu-readonly.service
mv /home/ubuntu/.hermes/profiles/zhongshu-readonly \
   /home/ubuntu/.hermes/profiles/zhongshu-readonly.disabled.$(date +%Y%m%d)
```

---

## 9. 待决策项

1. **是否使用独立 API key？** 推荐独立 `KIMI_API_KEY_READONLY`，便于配额监控。
2. **是否接入 Telegram？** 推荐不接，避免误操作；审计通过主 bot 中转。
3. **是否使用文件系统只读挂载？** 可选高级方案，需要 Docker/container 支持。
4. **Tirith 规则细节** 需要确认当前 Hermes 版本是否支持自定义策略。

---

*本方案完成于 2026-07-29，待用户确认后实施。*
