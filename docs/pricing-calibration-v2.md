# RemovePDFPages — Pricing Calibration v2

> 项目：removepdfpages.net  
> 当前阶段：03-pricing  
> 状态：[NEEDS_REVIEW]  
> 更新原因：将支付/税务/退款服务商从 Stripe 切换至 Creem，并更新国际销售范围  
> 更新日期：2026-07-23

---

## 1. 方案概述

### 1.1 设计约束（来自上游输入）

| 约束 | 来源 | 影响 |
|---|---|---|
| 免费 4 工具保持客户端处理 | `data-contract.md` / `compliance-report.md` | 边际成本 ≈ $0，但需 fair-use 限制 |
| Convert to Word 必须后端处理 | `PRD-v2.md` | 有边际成本，必须限额度 |
| 必须提供 Convert to Word 免费试用 | 用户当前要求 | 额度需足够体验、但不可亏穿 |
| 不再局限于买断制 | 用户当前要求 | 可探索订阅 / 按量 / 组合 |
| 当前 NOT-DO 仍禁止订阅 | `MVP-NOT-DO.md` §2.3 | 任何订阅方案需先修订 NOT-DO |
| 禁用词限制 | `copy-freeze.md` §4 | 禁止 `unlimited` / `free forever` / `no limits` 等 |
| 价格口径统一 | `copy-freeze.md` | 全站 CTA 以 `$19 Launch Special` 为主，`$29` 仅作 strikethrough 原价锚点 |

### 1.2 方案总览

本次输出三个方案：

| 方案 | 名称 | 商业模式 | 是否推荐 | 关键前提 |
|---|---|---|---|---|
| A | Freemium + 买断 + 按量 Top-up | 组合模式 | ✅ 推荐 | 保持一次性付费卖点，通过额度 + Top-up 覆盖后端成本 |
| B | 纯订阅 SaaS | 订阅 | 备选 | 需修订 `MVP-NOT-DO.md` 中“不做订阅”条款 |
| C | 纯买断 + 限次 | 一次性买断 | 备选 | 结构最简单，但重度用户成本不可控 |

**推荐结论**：采用方案 A。它在保留原产品“一次购买、无订阅”核心卖点的同时，把 Convert to Word 从“买断后无限制”改为“基础额度 + 按量 Top-up”，既能给用户试用额度，又能防止后端成本亏穿。

---

## 2. 套餐矩阵

### 2.1 方案 A：Freemium + 买断 + 按量 Top-up（推荐）

| 维度 | Free | Full Editor（买断） | 按量 Top-up |
|---|---|---|---|
| 价格 | $0 | $19 Launch Special（标准价 $29 锚点） | $0.50/次 或 $5/10 次 |
| 购买方式 | 无需购买 | 一次性买断，无需订阅 | 账户内购买 credits |
| Remove / Merge / Compress / Sign | ✅ 可用 | ✅ 可用 | — |
| Convert to Word | 3 次/30 天 免费试用 | 10 次/月 包含额度 | 超出额度后按量计费 |
| 文件大小/页数 | 50 MB / 200 页 | 50 MB / 200 页 | 50 MB / 200 页 |
| 设备 | 浏览器 | 最多 5 台个人设备 | 同授权设备 |
| 更新 | 免费工具更新 | 当前主版本 v1.x 更新 | — |
| 退款 | — | 14 天无理由 | 未使用 credits 14 天内可退；已使用不可退；处理费不退还 |
| 转化路径 | 入口 → 试用 → 触发 Paywall | 购买后获得额度 → 高用量触发 Top-up | 在工具页内直接购买 credits |

**说明：**
- `$19` 为当前 Launch Special 价；标准价 `$29` 仅作为 strikethrough 原价锚点出现在 `/pricing`。
- 免费 4 工具标注为 `Currently free`，并附带 `fair-use limits`；不承诺 `unlimited` 或 `free forever`。
- Convert to Word 试用额度为 **3 次/30 天**（基于浏览器 fingerprint + IP 复合限制），具体见第 3 节。
- 买断后包含 **10 次/月** Convert to Word；超出后按 `$0.50/次` 或 `$5/10 次` 购买 credits。

### 2.2 方案 B：纯订阅 SaaS（备选）

| 维度 | Free | Pro | Business |
|---|---|---|---|
| 价格 | $0 | $9/月（年付 $72）或 $12/月 | $19/月 |
| Remove / Merge / Compress / Sign | ✅ | ✅ | ✅ |
| Convert to Word | 3 次/30 天 | 100 次/月 | 500 次/月 |
| 设备 | 浏览器 | 最多 5 台 | 最多 10 台 |
| 退款 | — | 14 天内按比例 [待确认] | 14 天内按比例 [待确认] |

**适用场景**：如果后续验证用户愿意接受订阅，或希望建立 MRR（月度经常性收入）。

**风险**：直接违反当前 `MVP-NOT-DO.md` §2.3 “不做订阅/月费模式”；必须修订 PRD 与 NOT-DO 后才能实施。同时品牌目前主打 “no subscription”，切换订阅会削弱差异化。

### 2.3 方案 C：纯买断 + 限次（备选）

| 维度 | Free | Full Editor（买断） |
|---|---|---|
| 价格 | $0 | $19 Launch Special（标准价 $29） |
| Convert to Word | 3 次/30 天 | 20 次/月（硬上限，无 Top-up） |
| 其他 | 同方案 A | 同方案 A |

**适用场景**：技术实现最简单，不需要 credits 系统；适合首版快速上线。

**风险**：20 次/月对重度用户可能不够，无法从他们身上获得额外收入；若用户实际平均使用接近上限，会亏穿。

---

## 3. Convert to Word 免费试用额度

### 3.1 推荐额度：3 次 / 30 天

**选择依据：**
- **能体验价值**：1 次 PDF 转换通常不足以让用户评估质量；3 次可以覆盖“试一份简单 PDF、一份复杂 PDF、再试一份”的完整决策过程。
- **不亏穿**：按单次成本中间值 $0.05 计算，3 次成本 ≈ $0.15/用户，可控；若全部免费用户都试用，成本也远低于单次获客预算。
- **激发购买**：3 次/30 天对每月有 2–5 份 PDF 转换需求的用户是“刚好够用又不够用”的阈值；用完后会自然触发购买。
- **公平使用**：不依赖账户系统，基于 `fingerprint + IP` 复合限制；同一设备/IP 在 30 天内只能获得 3 次免费转换。

### 3.2 免费试用额度对比

| 额度 | 单次成本 | 30 天成本/用户 | 体验充分度 | 购买压力 | 推荐度 |
|---|---|---|---|---|---|
| 1 次/ lifetime | $0.05 | $0.05 | 低 | 高 | 一般 |
| 3 次/30 天 | $0.15 | $0.15 | 高 | 中高 | ✅ 推荐 |
| 5 次/30 天 | $0.25 | $0.25 | 高 | 中 | 备选 |
| 3 次/ lifetime | $0.15 | $0.15 | 中 | 高 | 备选 |
| 10 次/30 天 | $0.50 | $0.50 | 过高 | 低 | 不推荐 |

### 3.3 技术实现建议

- 在浏览器端记录 `device_id`（fingerprint + IP hash）。
- 后端使用 KV（Cloudflare Workers KV / Upstash Redis）维护 `device_id → 本月已用次数`。
- 每次调用 `/api/convert` 时先检查配额；未授权时允许免费额度内请求。
- 免费额度用完后返回 `402 LICENSE_REQUIRED` 并展示 Paywall。
- 在 Convert to Word 页面明确显示：`You have X free conversions left this 30-day period.`

---

## 4. 成本与盈亏模型

### 4.1 单位成本假设（来自用户输入与公开定价）

| 成本项 | 估算值 | 来源/备注 |
|---|---|---|
| Convert to Word（Workers + WASM） | $0.01–$0.03/次 | 用户输入 |
| Convert to Word（第三方 API） | $0.02–$0.10/次 | 用户输入 |
| Convert to Word（自托管 VPS） | $5–$10/月 | 用户输入 |
| Creem 支付费率 | 3.9% + $0.40/笔 | Creem 公开定价 |
| Creem 退款损失 | $0.40/笔 + 3.9% 不退还 + 已消耗后端成本 | Creem 不退还处理费 |
| 免费 4 工具边际成本 | ≈ $0 | 客户端处理 |

**本报告采用单次 Convert to Word 综合成本 $0.05/次**（取 $0.01–$0.10 范围的中间值）作为基准，实际成本取决于最终采用 Workers + WASM、第三方 API 还是自托管方案 [待确认]。

### 4.2 方案 A 单位经济（每单 $19 Launch Special）

| 项目 | 金额 | 说明 |
|---|---|---|
| 售价 | $19.00 | Launch Special 价 |
| Creem 手续费 | -$1.14 | $19 × 3.9% + $0.40 |
| 到手收入 | $17.86 |  |
| 包含 Convert 成本 | -$0.50/月 | 10 次/月 × $0.05 |
| 固定成本分摊 | -$0.20/月 | $10 VPS ÷ 50 付费用户 [假设，待确认] |
| 退款损失 | -$0.06 | 按 5% 退款率，$1.14/单不退 |
| 30 天毛利贡献 | $17.10 | 未扣减获客/分析/邮件等成本 |
|| 按 6 个月平均生命周期估算毛利 | $13.60 | $17.86 - ($0.50+$0.20)×6 - $0.06 |

**关键假设（需上线后验证）：**
- 付费用户平均生命周期为 6 个月（买断后持续使用 6 个月）。
- 平均每月 Convert 使用 10 次以内（即不触发 Top-up）。
- 50 个付费用户可分摊 $10/月的 VPS 固定成本。

### 4.3 方案 A 月度盈亏模型（示例场景）

以下为用户数假设，仅用于说明成本结构；真实 DAU/转化率需上线后验证 [待确认]。

| 项目 | 数值 | 计算 |
|---|---|---|
| 月度免费用户 | 1,000 | 假设 |
| 月度付费转化 | 50 | 5% 转化率，假设 |
| 免费试用次数 | 300 | 1,000 × 10% 试用率 × 3 次 |
| 免费试用成本 | -$15 | 300 × $0.05 |
| 付费用户基础使用 | 400 | 50 × 8 次/月（平均） |
| 基础使用成本 | -$20 | 400 × $0.05 |
| 超出额度使用（Top-up） | 50 | 10 用户 × 5 次 |
| Top-up 收入 | +$25 | 50 × $0.50 |
| 买断收入 | +$950 | 50 × $19 |
| Creem 手续费 | -$57.00 | 50 笔 × ($19 × 3.9% + $0.40) |
| VPS 固定成本 | -$10 | 用户输入 |
| 退款损失 | -$2.85 | 5% × 50 × $1.14 |
|| **月度毛利估算** | **$870.15** | $950 + $25 - $15 - $20 - $57.00 - $10 - $2.85 |

**结论**：在“50 付费用户/月、平均 8 次 Convert、10% 用户额外 Top-up”的假设下，方案 A 月度毛利约 $870；毛利率约 87%。若实际使用频次或用户基数显著偏离，需重新校准。

### 4.4 方案 B 单位经济（订阅）

| 项目 | Pro $9/月 | 说明 |
|---|---|---|
| 月费 | $9.00 |  |
| Creem 手续费 | -$0.75 | $9 × 3.9% + $0.40 |
| 到手收入 | $8.25 |  |
| 100 次 Convert 成本 | -$5.00 | 100 × $0.05 |
| 固定成本分摊 | -$0.20 | 同方案 A |
| 退款/流失 | -$0.50 | 假设 6% 月流失 + 按比例退款 [待确认] |
| 月毛利贡献 | $2.55 |  |

**结论**：订阅方案每用户月毛利约 $2.55，需要较高月活和留存才能覆盖固定成本；适合长期 MRR 目标，但短期现金流不如买断方案。注意：当前 NOT-DO 禁止订阅，方案 B 仅作为对比，若要采用需先修订 NOT-DO。

### 4.5 方案 C 单位经济（纯买断 + 限次）

| 项目 | 金额 | 说明 |
|---|---|---|
| 售价 | $19.00 |  |
| Creem 手续费 | -$1.14 | $19 × 3.9% + $0.40 |
| 到手收入 | $17.86 |  |
| 20 次/月 Convert 成本 | -$1.00/月 | 20 × $0.05 |
| 固定成本分摊 | -$0.20/月 |  |
| 6 个月生命周期毛利 | $10.66 | $17.86 - ($1.00+$0.20)×6 |

**结论**：纯买断 + 限次毛利率低于方案 A，因为无法从重度用户获得额外收入；优点是技术实现最简单。

---

## 5. 定价页 / 结账页 / 工具页 paywall 文案建议

所有文案必须符合 `copy-freeze.md` 禁用词清单：禁止 `unlimited` / `free forever` / `no limits` / `lifetime updates` 等。

### 5.1 `/pricing` 页面文案

#### 卡片 1：Free
- **Name**：Free
- **Price**：$0
- **Price period**：No account needed
- **CTA**：Start free → `/remove-pages`
- **Features**：
  - Remove PDF pages
  - Merge PDFs
  - Compress PDFs
  - Sign PDFs
  - No watermark
  - Files stay in your browser by default
  - Fair-use limits: 50 MB / 200 pages / 10–20 tasks per hour

#### 卡片 2：Full Editor
- **Badge**：Most popular
- **Name**：Full Editor
- **Price**：$19
- **Original price anchor**：~~$29~~
- **Price period**：One-time payment. No subscription.
- **CTA**：Get Full Editor — $19 Launch Special → `/checkout`
- **Secondary text**：Launch price for a limited time. Standard price is $29.
- **Features**：
  - Everything in Free
  - Convert PDF to Word (10 conversions/month included)
  - Extra conversions: $0.50 each or $5 for 10
  - Use on up to 5 personal devices
  - Updates for the current major version
  - 14-day refund policy

#### 对比表

| Feature | Free | Full Editor |
|---|---|---|
| Remove / Merge / Compress / Sign | ✅ Included | ✅ Included |
| Convert PDF to Word | 3/30 days trial | ✅ Included (10/month) |
| Extra Convert to Word | — | $0.50 each or $5/10 |
| Max file size | 50 MB | 50 MB |
| Max pages per file | 200 | 200 |
| Devices | Browser only | Up to 5 devices |
| Price | $0 | **$19** ~~$29~~ |

#### 定价 FAQ
- **Q1**：Is the $19 price really a one-time payment?  
  **A**：Yes. The $19 Launch Special is a one-time purchase. There is no monthly subscription. The standard price is $29, so the launch price saves you $10.
- **Q2**：How many Convert to Word conversions do I get?  
  **A**：Free users can try 3 conversions per 30-day period. The Full Editor includes 10 conversions per month. Additional conversions are $0.50 each or $5 for 10.
- **Q3**：What happens when the launch period ends?  
  **A**：We will return to the standard price of $29. If you buy during the launch period, your license stays valid for the current major version at no extra cost.
- **Q4**：Can I get a refund?  
  **A**：Yes. We offer a 14-day refund policy. Contact us through the refund page or support email with your order information.
- **Q5**：What does “lifetime” mean?  
  **A**：Lifetime means the current major version of RemovePDFPages Full Editor (v1.x). It includes updates within that version. A future new product or platform may require a separate license.
- **Q6**：Why does Convert to Word need a server?  
  **A**：PDF to Word conversion is complex and currently runs on our backend. Your file is uploaded temporarily and deleted automatically within 1 hour.

### 5.2 `/checkout` 页面文案

- **H1**：Get the Full Editor
- **Subheadline**：Choose your license and complete your purchase securely through Creem.
- **Option A（默认）**：$19 Launch Special License — One-time. Save $10 during launch.
- **Option B**：$29 Standard License — One-time. Standard price.
- **Email field**：Email for your license key
- **Payment note**：Payments are processed by Creem. We do not store your card details.
- **Tax note**：Sales tax, VAT, and GST are calculated and collected automatically by Creem based on your location.
- **Refund note**：14-day refund policy. License valid for the current major version. Includes 10 Convert to Word conversions per month.
- **CTA**：Pay $19 — Unlock Full Editor

### 5.3 `/convert-to-word` 工具页 Paywall 文案

#### 未购买状态
- **Server Notice**：This tool uses a backend server to convert your PDF. Your file is uploaded temporarily and deleted automatically within 1 hour.
- **Free trial indicator**：You have X free conversions left this 30-day period.
- **Paywall Title**：This feature is part of the Full Editor
- **Paywall Body**：Convert PDF to Word is included with the Full Editor license. Free users get 3 conversions per 30 days; the Full Editor includes 10 per month, with extra conversions available as needed.
- **CTA**：Get Full Editor — $19 Launch Special → `/checkout`
- **Secondary**：See all features → `/pricing`

#### 已购买但额度用完
- **Notice**：You’ve used your 10 included conversions this month.
- **CTA**：Buy 10 more conversions for $5
- **Secondary**：See pricing → `/pricing`

### 5.4 首页 `/` 与博客 `/blog/*` CTA

- 统一 Primary CTA：`Get Full Editor — $19 Launch Special`
- 避免同时出现 `$29 Lifetime` 与 `$19 Launch Special` 两种默认口径。
- 博客中提及价格时，统一使用 `$19 Launch Special`；如需对比竞品，可用 `$29 standard price` 作为锚点。

---

## 6. 风险与合规

### 6.1 风险清单

| 风险等级 | 类型 | 位置 | 问题描述 | 引用标准 | 修复建议 |
|---|---|---|---|---|---|
| 🔴 高 | 买断后成本不可控 | 后端 Convert to Word | 若用户高频使用，10 次/月额度仍可能无法覆盖成本（取决于实际成本是否接近 $0.10/次） | 成本模型 | 严格按 Top-up 计费；上线后监控实际后端成本与使用频次 |
| 🔴 高 | 文案误导 | `/pricing` / `/convert-to-word` | 若未明确说明“10 次/月”限制，用户可能误解为买断后无限制 | 禁用词清单 | 所有文案必须写明“10 conversions/month included”和“extra $0.50 each” |
| 🔴 高 | 免费试用滥用 | `/convert-to-word` | 无账户系统，脚本可换 IP 刷免费额度 | 成本控制 | 使用 fingerprint + IP + rate limit；监控异常设备/IP 的转换行为 |
| 🟡 中 | 价格欺诈 / 误导性折扣 | `/pricing` | $29 与 $19 同时作为独立卡片售卖 | FTC Act §5 | 保持 `$29` 仅作为 strikethrough 原价，`$19` 作为当前价 |
| 🟡 中 | 退款成本 | `/checkout` | 14 天无理由退款，每退一单损失 $0.40 + 3.9% Creem 手续费 | Creem 政策 | 在 FAQ / refund 页明确退款条件；统计退款率，>10% 时重审定价 |
| 🟡 中 | 销售税 / VAT / GST | Creem | 全球销售需收税 | 各国销售税法规 | 上线前确认 Creem 已开启；Terms 中披露 Creem 自动计算并汇缴 |
| 🟡 中 | Lifetime 边界 | `/terms` | 买断用户可能期望永久无限制更新 | 合约法 | Terms 中明确 lifetime 指当前主版本 v1.x |
| 🟡 中 | 设备限制执行 | `/checkout` | 最多 5 台设备，但无账户系统 | 授权策略 | license key 激活记录设备指纹；超限需联系客服 |
| 🟡 中 | 订阅方案需修订 NOT-DO | 全局 | 方案 B 订阅模式违反当前 `MVP-NOT-DO.md` | 项目范围 | 若选择方案 B，必须先修订 PRD、NOT-DO、copy-freeze |
| 🟢 低 | 邮件送达 | `/success` | license key 邮件可能进垃圾邮件 | CAN-SPAM | 使用 Resend/Postmark；支持页面提供重发 |
| 🟢 低 | 分析工具隐私披露 | 全站 | 若启用 Google Analytics 需 Cookie 披露 | GDPR/CCPA | 选型后更新 Privacy |

### 6.2 合规要点

1. **不得使用 unlimited / free forever**：免费 4 工具文案使用 `Currently free` 和 `fair-use limits`。
2. **必须披露 Convert to Word 的数据流**：上传临时文件，1 小时内删除（已写入 `privacy` / `data-contract`）。
3. **必须披露额度限制**：买断用户需明确知道仅包含 10 次/月 Convert to Word，超出需额外付费。
4. **必须保持价格口径一致**：首页、博客、定价页、checkout 均以 `$19 Launch Special` 为主推。
5. **必须保留 14 天退款政策**：每退一单损失 $0.40 + 3.9% Creem 手续费；未使用 credits 14 天内可退，已使用不可退，处理费不退还。

---

## 7. 下游交接摘要

### 当前结论
- **状态**：[NEEDS_REVIEW]
- **一句话结论**：推荐方案 A（Freemium + 买断 + 按量 Top-up），保留一次性付费卖点，Convert to Word 提供 3 次/30 天免费试用，买断后含 10 次/月，超出按 $0.50/次或 $5/10 次计费；需后端实现配额与 credits 系统。

### 关键输入
- 项目：removepdfpages.net
- 当前阶段：03-pricing
- 上游资料：`docs/pricing-calibration.md`、`docs/PRD-v2.md`、`docs/MVP-NOT-DO.md`、`docs/data-contract.md`、`docs/compliance-report.md`、`docs/route-contract.json`、`docs/copy-freeze.md`

### 本阶段交付物
- 文件：`docs/pricing-calibration-v2.md`
- 核心判断：
  - 推荐方案 A：Freemium + 买断 + 按量 Top-up。
  - Convert to Word 免费试用额度：**3 次/30 天**。
  - Full Editor 买断：$19 Launch Special（标准价 $29 锚点），含 10 次/月 Convert to Word。
  - 超出额度：$0.50/次 或 $5/10 次。
  - 免费 4 工具保持 `Currently free` + fair-use 限制。
- 已确认项：
  - 竞品一次性/订阅价格均高于 $29；$29 在市场中属低价带。
  - 免费 4 工具客户端处理，边际成本 ≈ $0。
  - Convert to Word 后端成本区间 $0.01–$0.10/次。
- 待确认项：
  - 最终后端方案（Workers + WASM / 第三方 API / 自托管）及真实单次成本。
  - 用户实际平均生命周期、月转化率、平均使用频次。
  - 免费试用额度的技术实现（fingerprint + IP 复合限制）。
  - Creem 商户账户配置、webhook 测试、目标国家/产品类别是否支持。
  - $19 Launch Special 的截止日期或数量限制（战略决策，可无）。
  - 已确认：Top-up credits 退款政策（未使用 14 天内可退，已使用不可退，处理费不退还）。

### 质量门槛自检
- [x] 价格有竞品锚点和成本依据
- [x] 免费额度能体验价值但不亏穿（3 次/30 天 + 后端成本可控）
- [x] 没有“无限”或承诺过度（明确 10 次/月、fair-use limits）
- [x] CTA 与真实开通路径一致（$19 Launch Special 统一口径）
- [x] Convert to Word 免费试用额度有具体数字（3 次/30 天）
- [x] 至少 2 个套餐方案对比（A/B/C 三个方案）
- [x] 成本模型可支撑（单位毛利为正，依赖使用频次假设）
- [x] 文案口径与 copy-freeze 合规要求一致（无 unlimited / free forever）

### 风险
- **P0**：买断后若用户实际使用频次接近/超过 10 次/月且后端成本偏高，需确保 Top-up 机制能真正覆盖成本。
- **P1**：后端配额与 credits 系统需新增开发量；上线前需完成 fingerprint/IP 限制和防刷。
- **P1**：Creem 商户账户配置、销售税/VAT/GST 自动处理、退款率仍需确认。
- **P2**：邮件送达、分析工具隐私披露、Lifetime 边界需在前端/合规阶段落地。

### 给下游的最小必要信息
- 下一阶段：05 Copy Freeze（更新文案）+ 07 前端实现 + 后端配额/credits 实现。
- 必须读取：`docs/pricing-calibration-v2.md`、`docs/copy-freeze.md`、`docs/data-contract.md`、`docs/compliance-report.md`。
- 不能假设：
  - 不能假设买断后 Convert to Word 无限制；必须明确 10 次/月。
  - 不能假设 free 用户可以无限试用；必须限制 3 次/30 天。
  - 不能假设 $19 是永久价；它是 Launch Special。
- 建议：
  - 后端实现 `/api/convert` 配额校验和 `/api/credits/purchase` top-up 接口。
  - 前端在 `/convert-to-word` 展示剩余免费/包含额度，并在额度用完后展示 Top-up CTA。
  - 合规阶段在 Terms 中明确 Top-up credits 的退款政策。

---

[DONE] 定价校准 v2 已完成，等待审核。
