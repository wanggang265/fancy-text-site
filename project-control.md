# RemovePDFPages — Project Control Board

项目：removepdfpages.net (fancy-text-site)  
**当前状态：09 QA [IN_PROGRESS]**
事实源：本文件 + 仓库 `/home/ubuntu/fancy-text-site`  
更新日期：2026-07-31（用户确认 backend 架构：B 简化用户识别 + jishi 创建 Creem 产品 + 第三方 API 转换）
机制修复基线：`git tag before-mechanism-repair-2026-07-29`（保留）

**流程修正**：03 pricing 必须先 `[DONE]`，05 copy-freeze 才能启动，禁止 pricing 与 copy 并行派活。

**当前任务**：@jishi555_bot 后端改造。输入 `/home/ubuntu/projects/removepdfpages-workers/` + `docs/PRD-v3.md` + `docs/copy-freeze.md` + `docs/pricing-calibration-v3.md` + `docs/data-contract.md`，输出改造后的后端代码 + 部署验证。

---

## 0. 事实源声明

1. **唯一事实源**：`project-control.md` 是当前状态、阶段、决策、阻塞项的唯一依据。
2. **每次推进前必须先读此文件**，状态必须与交付物实际状态一致。
3. **任何 agent（包括总控）不得凭记忆汇报状态**。

---

## 1. 阶段硬闸门（不可逆顺序）

```
00 setup → 01 research → 02 PRD → 03 pricing → 04 compliance
→ 05 copy-freeze → 06 design-freeze → 07 frontend → 08 backend
→ 09 QA → 10 SEO → 11 launch → 12 data-review
```

**规则**：
- 下一阶段必须前一阶段 `[DONE]` 才能启动。
- 前一阶段状态只能由负责该阶段的 agent 在验收通过后标记，总控不能自行标记。
- 出现上游变更时，必须回退到最早受影响的阶段，重新走闸，**禁止跨阶段补丁**。

### 1.1 阶段状态定义

| 状态 | 含义 | 谁可以标记 |
|---|---|---|
| `[NOT_STARTED]` | 未开始 | 总控 |
| `[IN_PROGRESS]` | 执行中 | 总控 |
| `[NEEDS_REVIEW]` | 交付物已出，等总控/用户审核 | 负责 agent |
| `[BLOCKED]` | 有阻塞项，不能进入下一阶段 | 负责 agent 或总控 |
| `[DONE]` | 验收通过，可进入下一阶段 | 总控审核后，或用户确认 |

---

## 2. 总控角色边界（wangduoyu / zhongshu）

**总控只能做三件事**：
1. **派活**：给子 agent 分配任务，提供输入路径、输出路径、验收标准。
2. **QA / 审计**：检查交付物，输出问题报告，标记 `[GO]` / `[BLOCKED]` / `[NEEDS_REVIEW]`。
3. **回滚决策**：在方向跑偏或代码混乱时，决定回滚到哪个 baseline，并通知用户。

**总控禁止做以下任何事**：
- 直接修改项目代码、文案、设计文件、PRD、合规文档。
- 直接执行 `deploy.sh` 或部署操作。
- 直接给交付物打 `[DONE]` 而不经过验收。
- 跳过阶段或让下游 agent 基于未冻结文档工作。

**唯一例外**：用户明确说"你来改"，且只限于改配置/流程文档（如本文件、skill、deploy.sh 检查脚本）。

---

## 3. 错误处理 SOP

### Level 1 — 可恢复错误
**场景**：API 401/429/超时、临时网络失败、工具调用偶发错误。  
**总控动作**：
1. 自动重试 3 次，间隔 5 秒。
2. 切换到 fallback（key 轮换 / 手动转发）。
3. 记录到 `docs/execution-log.md`，不打扰用户。

### Level 2 — 需人工决策错误
**场景**：
- 上游文档冲突
- 商业模式/定价/产品边界变更
- 阶段顺序错误需要回退
- 多个下游 agent 输出不一致
- 任何"两种方案都可以，但需要选择"的情况

**总控动作**：
1. **立即停止推进**，不派新任务。
2. 输出结构化问题报告：问题、影响范围、选项 A/B、推荐选项、需要用户确认的内容。
3. 在 `project-control.md` 中标记 `[BLOCKED]`。
4. **等待用户明确回复**，禁止自行决定。

### Level 3 — 不可逆错误
**场景**：
- 代码已乱，多轮修补无效
- 方向严重跑偏，继续修下去成本高于重做
- 已部署到线上但出现重大问题

**总控动作**：
1. 立即执行 `git tag` 当前状态。
2. 回滚到最近的干净 baseline（优先 `before-mechanism-repair-2026-07-29` 或用户指定的 baseline）。
3. 通知用户回滚已完成，说明原因。
4. 重新从受影响阶段开始走流程。

---

## 4. 手动转发 Fallback 机制

由于当前只有 Kimi API，delegate_task 存在单点故障风险。建立以下 fallback：

### 4.1 触发条件
- `delegate_task` 连续失败 2 次，或
- gateway 重启导致子 agent 任务中断，或
- 任何 agent 因 skill 未安装无法加载

### 4.2 Fallback 流程
1. 总控生成完整 prompt（含输入路径、输出路径、验收标准、必须加载的 skill）。
2. 总控将 prompt 发给用户，由用户转发给对应子 agent。
3. 子 agent 完成后，用户将结果回传给总控。
4. 总控验收后更新 `project-control.md`。

### 4.3 Fallback 不是临时方案
- 手动转发是正式流程的一部分。
- 任何通过 fallback 产出的交付物，验收标准与自动派发完全一致。
- 总控不能因为"用户要手动转发"就降低质量要求。

---

## 5. 上游完整性审计

### 5.1 触发时机
- 每次 handoff 后（PRD → 定价 → copy → design → frontend/backend）
- 每次用户做上游变更后
- 每次 design-freeze 交付后必须执行

### 5.2 审计输入
- 上游冻结文件：`docs/PRD-vX.md`、`docs/pricing-calibration-vX.md`、`docs/copy-freeze.md`
- 下游交付物：设计 handoff、前端代码、文案等
- `docs/MVP-NOT-DO.md`（禁用项清单）

### 5.3 审计输出
- 文件：`docs/content-gap-report.md`
- 格式：见 `docs/content-gap-report-template.md`
- 标准：
  - 机械缺失：路由数量、FAQ 数量、工具入口数量、footer 链接数量
  - 结构问题：首页首屏 CTA 是否指向免费工具、是否出现禁用词、价格口径是否统一
  - **结构问题数 > 0，直接 `[BLOCKED]`**

### 5.4 审计 Agent
- 暂时由总控执行，或委派 @jiancha_claw_bot / @duoshou666_bot 兼任。
- 长期建议设立独立审计 Agent，拥有阻塞权限，与总控形成制衡。

---

## 6. 部署硬闸门

### 6.1 [GO] 必须满足
1. 当前代码已 `git commit`，且有 commit SHA。
2. `./deploy.sh --check-only` 通过。`/login` 路由为 noindex 认证页面，不在 design-handoff-v4/route-mapping.json 中，已在 `deploy.sh` 的 design-handoff diff 脚本中加入 `allowed_extra = {'/login'}` 例外。该例外记录于 `project-control.md` §6.1。
3. 实际部署成功。
4. 部署后 curl 检查关键页面返回 200：
   - `https://removepdfpages.net/`
   - `https://removepdfpages.net/pricing`
   - `https://removepdfpages.net/checkout`
   - 以及本次变更涉及的所有页面
5. 更新 `project-control.md` 中的线上状态。

### 6.2 任一项失败
- 状态保持 `[BLOCKED]`。
- 不得给用户汇报"已完成"。

---

## 7. 决策变量模块

在 PRD 中必须包含以下章节：

```markdown
## 决策变量（变更时只改这里）

| 变量 | 当前值 | 影响文档 | 最后变更 |
|---|---|---|---|
| pricing_model | subscription + hidden_lifetime | pricing, copy-freeze, PRD, design, backend | 2026-07-29 |
| launch_price | $19/month | copy-freeze, pricing page, checkout, CTA | 2026-07-29 |
| anchor_price | $29/month | pricing page, checkout | 2026-07-29 |
| free_trial_mode | freemium_direct | copy-freeze, PRD, backend | 2026-07-29 |
| convert_word_free_quota | 3/30 days | PRD, copy-freeze, backend | 2026-07-29 |
| convert_word_paid_quota | 30/month | PRD, copy-freeze, backend | 2026-07-31 |
| refund_window | 14 days | compliance, terms, refund page | 2026-07-29 |

变更流程：
1. 修改本表。
2. 标注所有受影响文档。
3. 回退到最早受影响阶段，重新走闸。
```

**规则**：商业模式相关变更必须只改决策变量表，并触发下游重跑，不得 scattered patch。

---

## 8. 回滚机制

### 8.1 基线标签
- `before-mechanism-repair-2026-07-29`（commit `b96a1f0`）
- 后续每完成一个阶段 `[DONE]`，打一个标签：`phase-{stage}-done-{date}`

### 8.2 回滚触发条件
- 发现代码混乱且 2 轮修补未解决
- 上游决策变更导致已完成后阶段需要重做
- 用户明确要求"回滚重来"

### 8.3 回滚流程
1. `git tag before-{reason}-{date}`
2. `git reset --hard {baseline}` 或 `git checkout {baseline}`
3. 通知用户回滚完成
4. 从受影响阶段重新启动

---

## 9. 当前项目真实状态

| 阶段 | 状态 | 已有产物 | 关键缺失 | 备注 |
|------|------|----------|----------|------|
| 00 setup | DONE | 仓库、域名、Cloudflare、deploy.sh | 无 | 基础设施已就绪 |
| 01 research | DONE | `docs/keyword-research-v1.md` | 无 | 关键词研究已完成 |
| 02 PRD | [DONE] | `docs/PRD-v3.md` | 已补「决策变量」章节；待 04 compliance / 05 copy 验收后算正式完结 | 商业模式确认为混合后已同步 |
| 03 pricing | [DONE] | `docs/pricing-calibration-v3.md` | $59 买断隐藏方案已由用户 2026-07-29 确认（选项 A） | jiagoushi v3 已更新，竞品价格已由用户快照覆盖 |
| 04 compliance | [DONE] | `docs/compliance-report.md` v3 | 无剩余 P0 冲突；4 个 [待确认] 项在 05/07 前解决 | @jiancha_claw_bot 已提交 v3，退款窗口 14 天已确认 |
| 05 copy | [DONE] | `docs/copy-freeze.md` v3 | 无 | wenshu 已修正残留 10→30；zhongshu 复核通过 |
|| 06 design-freeze | [DONE] | `design-handoff-v4/` 完整：HANDOFF.md、shared.css、route-mapping.json、所有 20 页面 | 无 | v4 设计已冻结 |
|| 07 frontend | [DONE] | `app/` 全 20 路由实现；Worker 已部署；所有 20 URL 线上 200；handoff 文档已生成 | 6 个路由标题/H1 与 route-contract 有 copy drift；pre-existing lint errors | v4 前端已部署并验证；详见 `docs/07-frontend-handoff-v4.md` |
|| 08 backend | [DONE] | `docs/data-contract.md` + `/home/ubuntu/projects/removepdfpages-workers/` + `docs/08-backend-handoff.md` | 无 | jishi 返修通过：真实 webhook secret 已配置、产品描述统一为 30 次/月、debug 端点已删除、Google OAuth redirect 已确认 |
|| 09 QA | [GO with residual issues] | `docs/09-qa-acceptance-report-v2.md` 返修后通过 | 新增 P2 见 §11.3 | zhongshu Re-QA 验证：commit 30d6c56、deploy.sh 20/20 通过、关键页面 200、checkout 跳转 Creem 成功、paywall 文案 30/month、success 动态渲染 |
|| 10 SEO | [BLOCKED] | `docs/10-seo-report.md`, `lib/seo.ts`, `public/_headers`, `app/login/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` | 生产部署与缓存刷新未执行；GSC/Bing/IndexNow 提交需要权限 | 代码修复本地已验证通过，见 `docs/10-seo-report.md` |
| 11 launch | NOT_STARTED | 无 | — | — |
| 12 data-review | NOT_STARTED | 无 | — | — |

---

## 10. 已确认决策

1. 产品边界：5 工具 MVP（Remove Pages / Merge / Compress / Sign / Convert to Word）
2. **商业模式：混合（订阅制为主 + 一次性买断作为隐藏选项）**：月度 $19/month、年度 $99/year，隐藏 One-time License $59
3. MVP 主推：`$19/month Launch Special` / `$99/year`，`$29` 仅作删除线原价锚点
4. 试用模式：Freemium 直接转化，不提供 7 天免费试用
5. 法律页：保留 `/privacy`、`/terms`、`/refund`
6. Convert to Word：免费 3 次/30 天，订阅/买断用户 30 次/月，超出 Top-up
7. 首页：首屏 Primary CTA 必须指向免费工具入口，`$19 Launch Special` 只能出现在首页底部转化区及其他付费转化入口
8. **支付/税务：Creem + Creem Tax，退款窗 14 天**
9. **Backend 架构（2026-07-31 确认）**：保留简化用户识别（magic link / Google 一键登录），不做完整账户系统；Convert to Word 用第三方 API；jishi 在 Creem 创建 Monthly $19 / Yearly $99 / One-time $59 三个产品

---

## 11. 10 SEO 阶段阻塞项

10-seo 代码修复已完成并通过本地构建验证，结论为 **[BLOCKED]**（详见 `docs/10-seo-report.md`）。

### 必须完成才能进入 11-launch

1. **生产部署 + Cloudflare 缓存刷新**
   - Owner：前端维护者
   - 操作：`git push` / `deploy.sh` 部署；在 Cloudflare Dashboard Purge Everything
   - 验证：
     - `curl -I https://removepdfpages.net/` 返回 `Content-Type: text/html; charset=utf-8`
     - `curl -sL https://removepdfpages.net/login | grep robots` 包含 `noindex, nofollow`

2. **Google Search Console 提交**
   - Owner：有 GSC 站点所有权的用户/运营
   - 操作：验证站点 → 提交 `https://removepdfpages.net/sitemap.xml` → 请求索引核心页面
   - 验证：GSC「站点地图」显示成功

3. **Bing Webmaster Tools 提交**
   - Owner：有 Microsoft 账号权限的用户（1gw471210@gmail.com）
   - 操作：验证站点 → 提交 sitemap

4. **IndexNow 配置（建议）**
   - Owner：前端维护者 + 运营
   - 操作：生成随机 key，部署 `{key}.txt` 到根目录；调用 IndexNow API 批量提交 18 个 sitemap URL

---

## 12. 09 QA 残留 P2（上线前尽量完成）

### 返修项已全部通过（commit 30d6c56）
1. ✅ `/checkout` 按钮完成购买：已改为 Client Component `CheckoutForm.tsx`，POST `/api/creem/checkout` 并跳转 Creem。
2. ✅ `ConvertToWordTool` paywall 文案 10→30：已修正为 "paid plans include 30 per month"。
3. ✅ `/success` 动态化：已新增 `SuccessContent.tsx`，读取 sessionStorage + `/api/subscription` 匹配 transaction + URL query fallback。
4. ✅ `/checkout` 按钮文案随 plan/topup 变化：monthly/yearly/onetime/topup 文案均正确。
5. ✅ `/checkout` topup 入口：`?topup=10` / `?topup=2` 进入 topup 模式，按钮文案分别为 "Buy 10 extra credits — $5" / "Buy 2 extra credits — $1"。
6. ✅ `deploy.sh --check-only` 通过：新增 `allowed_extra = {'/login'}` 例外，并在 `project-control.md` §6.1 记录。

### P2 — 上线前尽量完成（新发现）
7. `/success` 页面的 license key 仍为硬编码占位符 `REMPDF-XXXX-XXXX-XXXX`；subscription 不应显示 license key，onetime 应显示真实 license key。
8. `/success` 页面 "Your subscription is active" 文案对 onetime 和 topup 不准确。
9. `/success` 在 sessionStorage 存在旧 checkout 数据时优先使用旧数据，可能导致用户直接访问带 query 的 `/success` 看到与 query 不符的信息。
10. 登录后 `/api/usage/quota` 与 `convertToWord` 返回的 quota 字段命名不一致（不影响显示，但建议统一）。
11. 大文件 / 多页 PDF 转换超时和错误提示验证。
12. 分析工具选型与 `privacy`/`terms`/`cookie-policy` 文案一致。
13. 订阅到期后自动降级为 free plan 验证。

### 因缺少测试账号未覆盖
- Google OAuth 登录回调及登录态保持。
- 真实支付后 webhook 激活订阅、`/success` 真实数据渲染、topup credits 增加。
- 取消订阅、退款后状态 revoked。
- 文件 1 小时后自动删除。

---

## 13. 机制修复执行计划

**第一批（总控独立完成）**
- [x] 给当前代码打 tag：`before-mechanism-repair-2026-07-29`
- [x] 重写 `project-control.md`（本文件）
- [x] 新建 `docs/content-gap-report-template.md`
- [x] 升级 `deploy.sh`，加入线上 URL 验证
- [x] 更新 skill：`zhongshu-shipsolo-stage-gate`、`zhongshu-design-handoff-copy-audit`、`zhongshu-coordinator-boundary`

**第二批（需用户配合）**
- [x] 用户生成第 2 个 Kimi API key（`KIMI_API_KEY_DELEGATION`）
- [x] 用户重启 Hermes gateway
- [x] 用户配置 AUXILIARY_VISION_API_KEY
- [x] 各 agent profile 同步安装 `site-orchestrator-playbook`

**第三批（总控配置）**
- [x] 配置 Kimi key 轮换
- [x] 创建 `zhongshu-readonly` profile（软只读模式，禁用高危 toolset）
- [~] 配置总控 `command_allowlist`，限制写文件权限 —— 受 Hermes 架构限制，`file` toolset 无法拆分 read/write，当前以流程约束 + 事后审计替代

**第四批（验证，不推进真实建站）**
- [x] 用新机制跑一遍最小流程验证（readonly profile content-gap-audit）
- [x] 输出机制修复验收报告（`docs/content-gap-audit-2026-07-29-readonly-validation.md`）

---

## 14. 给用户的汇报格式

每次汇报必须包含：
1. 当前阶段状态（从本文件复制，不得凭记忆）
2. 本阶段交付物路径
3. 验收结果 / 问题清单
4. 阻塞项（如有）
5. 下一步需要什么

禁止说"感觉"、"大概"、"应该"。只汇报事实。
