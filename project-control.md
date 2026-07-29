# RemovePDFPages — Project Control Board

项目：removepdfpages.net (fancy-text-site)  
**当前状态：机制修复完成 / 流程恢复中 — 02 PRD [DONE]，03 pricing [NEEDS_REPAIR]**

事实源：本文件 + 仓库 `/home/ubuntu/fancy-text-site`  
更新日期：2026-07-29

---

## 0. 机制修复说明

用户决定：暂停建站流程（07 frontend 及以后），先按教练建议逐项修复执行机制。建站流程在以下机制完成并验证后恢复。

必须完成的机制修复项（全部由 zhongshu 完成，需要用户配合时会明确说明）：
1. 基础设施：KIMI_API_KEY 环境变量 + 重启 Hermes gateway 验证 `delegate_task`
2. 统一核心 skill 安装：各 agent profile 必须都有 `site-orchestrator-playbook` 等必要 skill
3. 阶段硬闸门：确保每个阶段必须 `[GO]` 才能进入下一阶段，部署必须有 commit SHA + 线上 URL
4. 上游完整性审计：设计 handoff 后必须对照 `copy-freeze` / `PRD` 输出 `content-gap-report.md`，gap > 0 则 `[BLOCKED]`
5. PRD 「决策变量」章节：解耦定价模式、额度策略等易变参数
6. 错误处理 SOP（Level 1/2/3）和总控角色边界：明确什么时候可以自修、什么时候必须等用户
7. 回滚机制：给当前代码打 tag，确定 clean baseline，乱代码不补而是回滚
8. 设计交付质量标准：首页首屏检查点、完整交付包要求
9. 页面矩阵规范：在 copy-freeze 阶段就必须明确所有页面
10. 汇总形成新的执行规范文档，等待用户确认后恢复建站流程

---

## 0. 固定执行机制（zhongshu 必须遵守）

1. **唯一事实源**：`project-control.md` 是当前状态和下一步的唯一依据。每次推进前先更新本文件。
2. **阶段硬闸门**：PRD → 定价 → 合规 → Copy Freeze → Design Freeze → Data Contract → 前端/后端 → QA → SEO → Launch → Data Review。
3. **关门状态**：每个阶段结束时必须是 `[DONE]` / `[BLOCKED]` / `[NEEDS_REVIEW]` 之一，不 [DONE] 不进下一阶段。
4. **派活格式**：每次派活必须给出：输入路径、输出路径、owner、使用 Skill、验收标准。
5. **zhongshu 不自改代码**：只做协调、QA、汇报、更新控制板。
6. **汇报格式**：只汇报当前阶段状态、已完成交付物、阻塞项、下一步需要什么。
7. **设计 handoff diff 闸口**：任何前端交付/部署前必须运行 `./deploy.sh --check-only`，通过后才能 [GO]。
8. **内容完整性审计**：每次 design handoff 出来后，必须先对照 copy-freeze 输出 `docs/content-gap-report.md`，问题数 > 0 则 [BLOCKED]。

---

## 1. 当前项目真实状态

| 阶段 | 状态 | 已有产物 | 关键缺失 | 备注 |
|------|------|----------|----------|------|
| 00 setup | DONE | 仓库、域名、Cloudflare 项目、deploy.sh | 无 | 基础设施已就绪 |
| 01 research | DONE | `docs/keyword-research-v1.md` | 无 | SEMRUSH / DataForSEO / Yahoo SERP 代理 |
| 02 PRD | **DONE** | `docs/PRD-v3.md` | 无 | 首页定义已修复，顶部状态 [DONE]，@jiagoushi777_bot [GO] |
| 03 pricing | **NEEDS_REPAIR** | `docs/pricing-calibration-v2.md` 待升 v3 | 订阅制主体价格策略待定 | 用户决策变更：订阅为主 + 买断/lifetime 隐藏，@jiancha_claw_bot 咨询中 |
| 04 compliance | DONE | `docs/compliance-report.md` v2 | 待确认 Creem 配置、退款操作细节 | 合规文案已落地 |
| 05 copy | **NEEDS_REPAIR** | `docs/copy-freeze.md` v2 | 首页 Hero CTA 错误指向 `/checkout` | CTA 统一规则把首页误伤为销售入口 |
| 06 design | **NEEDS_REPAIR** | `design-handoff-extract/` 14 页 | 首页首屏仍为购买导向；footer 出现 `Split PDF` | copy-audit 只做机械对比，未发现结构错误 |
| 07 frontend | **BLOCKED** | 14 个 `app/` 路由已回滚到 978f457 | 等待 06 design 重新冻结 | 06 修复后方可启动 |
| 08 backend | NOT_STARTED | `docs/data-contract.md` | /api/convert quota、/api/credits/purchase、KV 额度维护 | 待 PRD / copy 冻结后启动 |
| 09 QA | NOT_STARTED | 无 | 真实用户任务测试 | 未开始 |
| 10 SEO | NOT_STARTED | 无 | sitemap、robots、GSC | 未开始 |
| 11 launch | NOT_STARTED | 无 | 发布素材、渠道计划 | 未开始 |
| 12 data review | NOT_STARTED | 无 | 分析后台 | 未开始 |

---

## 2. 已确认决策（由用户确认）

1. 产品边界：**B — 5 工具套件 MVP + 博客/扩展页 Post-MVP**（Remove Pages / Merge / Compress / Sign / Convert to Word）
2. 法律页：**恢复 `/privacy`、`/terms`、`/refund`**
3. 定价模式：**尚待 @jiancha_claw_bot 定价意见** — 方向为：主托订阅制，买断/lifetime 作为隐藏选项，Freemium 直接转化
4. 买断/lifetime：**保留作为隐藏选项**
5. 定价：**MVP 主推 `$19 Launch Special`，`$29` 仅作为删除线原价锚点** — 具体是月费/年费/买断隐藏价等待 @jiancha_claw_bot 定价
6. 付费入口：**全站统一 "$19 Launch Special"，禁止直接展示 $29 为当前价**
7. 订阅试用：**Freemium 直接转化，不提供 7 天免费试用**
8. Convert to Word：**免费 3 次/30 天，订阅用户含 10 次/月，超出按量 Top-up（$0.50/次或 $5/10 次）** — 订阅制下需重新审议超额策略
9. 设计 handoff：`design-handoff-extract/` 当前为旧版，需按 copy-freeze v2 重新生成
10. 扩展页：`docs/page-matrix-v2.md` + `docs/content-roadmap.md` 已建立，Launch 后执行

---

## 3. 当前状态

1. **02 PRD [DONE]**：@jiagoushi777_bot 已完成首页定义修复，变更摘要和验收标准已达标，状态标记 [GO]。
2. **03 pricing [NEEDS_REPAIR]**：用户决策变更，不再采用 v2 的买断为主模式，改为**订阅制为主 + 买断/lifetime 作为隐藏选项 + Freemium 直接转化**。已派 @jiancha_claw_bot 进行定价咨询，但任务被 gateway 重启打断，需重新派发。
3. **05 copy [NEEDS_REPAIR]**：`docs/copy-freeze.md` §3.1 首页 Hero Primary CTA 为 `Get Full Editor — $19 Launch Special` → `/checkout`，把首页当成销售页，与 PRD 转化路径"入口 → 3 次免费试用 → Paywall → 购买"矛盾。受定价模式变更影响，需待定价意见后一并修订。
4. **06 design [NEEDS_REPAIR]**：`design-handoff-v2` 首页首屏仍出现购买导向内容（Header "Buy License"、Hero Primary CTA 购买、Hero 段落内 `$19` 价格）。Footer 出现 `Split PDF` 链接，违反 `MVP-NOT-DO.md`。
5. **07 frontend [BLOCKED]**：等待 05 copy + 06 design 重新冻结。
6. **08 backend [NOT_STARTED]**：等待 06/07 推进，但 API contract 已在 `docs/data-contract.md` 中准备。订阅制下需新增/调整订阅状态、续订、取消等后端能力，待定价确定后同步。
7. **skill 机制已修复**：`zhongshu-shipsolo-stage-gate` + `zhongshu-design-handoff-copy-audit` 已增加首页首屏检查点。
8. **delegate_task 已恢复**：Hermes gateway 重启后已能正常调用 Kimi API 进行 `delegate_task`。

---

## 4. 给用户的汇报

- 当前状态：**02 PRD [DONE]** → **03 pricing [NEEDS_REPAIR]** → 04 compliance [DONE] → **05 copy [NEEDS_REPAIR]** → **06 design [NEEDS_REPAIR]** → 07 frontend [BLOCKED]
- 02 PRD 首页修复：已完成，@jiagoushi777_bot 标记 [GO]
- 03 pricing：订阅制 + 隐藏买断咨询被 gateway 重启打断，正在重派 @jiancha_claw_bot
- 执行计划：
  1. 重派 @jiancha_claw_bot 完成 pricing-calibration-v3.md
  2. pricing [GO] 后，派 @jiagoushi777_bot 修订 PRD-v3 订阅模式部分
  3. PRD + pricing [GO] 后，派 @wenshu2011_bot 生成 copy-freeze.md v3（修正首页 CTA + 订阅文案）
  4. Copy [GO] 后派 @moyun3212bot 重制 design-handoff v3
  5. 重新跑 copy-audit + 首页首屏检查
- 当前阻塞：等待 @jiancha_claw_bot 返回定价意见
- 待决策：无（用户已确认订阅制 + 隐藏买断）

---

## 5. 06 design 重新生成要求

设计 Agent 必须基于以下事实源重新生成 design-handoff-extract/：
- `docs/copy-freeze.md` v2（唯一文案源）
- `docs/PRD-v3.md`（产品定义）
- `docs/page-matrix-v2.md` + `docs/content-roadmap.md`（B 方案：MVP 11 页，博客 Post-MVP）
- `docs/compliance-report.md` v2（法律声明）
- `docs/data-contract.md`（API 与数据流）

输出要求：
1. 11 个 MVP 页面：/、/remove-pages、/merge、/compress、/sign、/convert-to-word、/pricing、/checkout、/success、/faq、/contact
2. 新增 3 个合规页面：/privacy、/terms、/refund
3. 全站价格统一为 "$19 Launch Special"，$29 仅作 strikethrough 原价锚点
4. 每页 footer 必须包含 /privacy /terms /refund 链接
5. FAQ 页必须包含 FAQPage JSON-LD schema
6. 工具页必须包含 SoftwareApplication schema
7. 首页必须包含 WebSite + Organization schema
8. /sign 必须包含免责声明；/convert-to-word 必须包含 1 小时删除说明；免费工具页必须包含 browser-default 数据流说明
9. 重新生成后必须再次通过 `docs/content-gap-report.md` 审计（缺陷数 = 0）
