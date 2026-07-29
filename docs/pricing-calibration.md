# RemovePDFPages — Pricing Calibration v1

> 项目：removepdfpages.net  
> 当前阶段：03-pricing  
> 审核范围：PRD-v1 / 页面矩阵 / 路由合约 / MVP-NOT-DO / 数据合约 / `/pricing` / `/checkout`  
> 状态：待合规与下游文案阶段复核  
> 更新日期：2026-07-21

---

## 1. 当前定价现状

### 1.1 已确认的价格表述

| 价格 | 出现位置 | 文案 | 状态 |
|---|---|---|---|
| **$29 lifetime** | `/pricing`（Full Editor 卡片） | `$29 one-time` | ✅ 存在，作为标准价 |
| **$29 lifetime** | `/pricing` compare 表格 | 未直接出现，但 Full Editor 列对应 $29 | ✅ 存在 |
| **$29 lifetime** | `/checkout`（Full Editor 单选） | `$29 / Standard lifetime license` | ✅ 存在，但非默认 |
| **$29 lifetime** | `/` home CTA | `Get Full Editor — $29` | ✅ 存在 |
| **$29 lifetime** | `/convert-to-word` | `One-time $29 unlock` | ✅ 存在 |
| **$29 lifetime** | `/blog/one-time-payment-pdf-editor` / `/blog/no-subscription-pdf-editor` | `Get Full Editor — $29 Lifetime` | ✅ 存在 |
| **$19 launch** | `/pricing`（Launch Special 卡片） | `$19 one-time / Launch Special / Limited time offer` | ✅ 存在 |
| **$19 launch** | `/checkout`（默认选中） | `Pay $19 — Unlock Full Editor` / `Launch Special License` | ✅ 存在，默认选项 |
| **$19 launch** | `/pricing` CTA | `Claim launch price` | ✅ 存在 |
| **$19 launch** | 路由合约 `route-contract.json` | `/checkout` cta: `Pay $19 / $29 — Unlock Full Editor` | ✅ 存在 |

### 1.2 关键观察

- **$19 与 $29 同时售卖**：`pricing` 页面同时展示 $29 和 $19 两个一次性付费选项，且功能描述完全相同（“All Full Editor features”）。这会导致用户直接选择低价，$29 卡片失去转化意义，并可能引发“原价歧视/价格欺诈”合规风险。
- **默认结账价低于首页 CTA**：首页主推 `$29`，但 `/checkout` 默认选中 `$19`，路径不一致。
- **$19 在 checkout 是默认选项**：用户从任何博客或工具页通过 `$29 Lifetime` CTA 进入，最终看到的支付金额是 $19，存在价格锚点错乱。

---

## 2. 成本假设模型

以下成本为基于公开定价和架构假设的估算，未上线前需用真实账单和 Stripe 费率复核。

| 成本项 | 假设 | 估算 |
|---|---|---|
| **Cloudflare Pages** | 静态站点托管 | 免费档足够 |
| **Cloudflare Workers** | 健康检查、license 校验、Stripe webhook、临时后端 fallback | 免费档 10 万次/天；超出后约 $0.50/百万请求 [待确认] |
| **Cloudflare R2 / 临时存储** | 后端 fallback 文件暂存，TTL 1 小时 | 约 $0.015/GB·月；低频访问几乎可忽略 |
| **后端 PDF 处理（WASM / 自托管）** | 免费 4 工具客户端处理；Convert to Word 必须后端或第三方 | 最低：$0（Workers + WASM）；若使用第三方 API：$0.02–$0.10/次 [待确认] |
| **后端 PDF 处理（VPS 备选）** | Hetzner / Vultr 小实例 | $5–$10/月 |
| **Stripe 支付费率** | 美国信用卡 | 2.9% + $0.30/笔 |
| **Stripe 退款手续费** | 退款不退回手续费 | $0.30/笔 损失 |
| **邮件发送（Resend）** | license key 邮件 + 客服 | 免费档 3,000 封/月；超出 $0.0009/封 |
| **域名** | removepdfpages.net | $10–$15/年 |
| **分析工具** | Plausible（隐私友好）或 Vercel Analytics | Plausible $9/月；Vercel Analytics 免费 [待确认] |
| **DMCA / 法律合规工具** | 可选 Termly / iubenda | 免费或 $10–$20/月 [待确认] |

### 2.1 单用户成本估算

- **免费用户**：客户端 4 工具成本 ≈ $0.0001（仅 Workers 健康检查/页面请求 + 边缘带宽），可忽略。
- **付费用户 Convert to Word（后端方案）**：
  - 若纯 Workers + WASM：$0.01–$0.03/次（CPU 时间 + 内存）。
  - 若第三方转换 API：$0.02–$0.10/次 [待确认]。
  - 若自托管后端：固定 $5–$10/月 + 近似 $0/次（边际低）。
- **支付净收入**：$19 订单扣除 Stripe 后 ≈ $17.95；$29 订单 ≈ $27.56。

### 2.2 盈亏关键变量

| 变量 | 说明 |
|---|---|
| 免费用户 DAU | 免费工具流量大，但客户端处理几乎零成本；成本可控 |
| 付费转化率 | 决定能否覆盖域名/分析/后端固定成本；按 $19 计需约 2–3 单/月覆盖基础开销 |
| 后端转换调用频次 | Convert to Word 用户购买后若高频使用，会吃掉毛利；需限制文件大小/页数/设备数 |
| 退款率 | 14 天无理由退款，按 5%–10% 计入毛利损耗；每退一单损失 $0.30 Stripe 费 + 已消耗后端成本 |
| 滥用/攻击 | 无账户系统，免费工具易被脚本刷；需 rate limit 与 file size 上限 |

---

## 3. 免费额度影响与限制建议

### 3.1 当前免费额度

- 免费工具：Remove Pages、Merge、Compress、Sign（4 个，不是 5 个；Convert to Word 是付费）。
- 无文件大小、页数、次数限制声明（仅在 data-contract 中建议 50MB / 200 页）。
- 无水印、无注册、无每日限额（PRD 与 NOT-DO 明确）。

### 3.2 是否会导致亏损？

**结论：在纯客户端处理、无后端 fallback 的前提下，不会亏损；但存在两个风险点：**

1. **Compress 实际可能需后端 fallback**：当前页面文案写“No upload / Your file stays in your browser”，如果压缩效果不佳、用户投诉，上线后可能被迫引入后端。后端压缩会显著改变成本模型。
2. **Convert to Word 的免费体验 / 预览**：如果未来增加“免费试转 1 页”或“预览低质量 DOCX”，每次调用都有后端成本。

### 3.3 限制建议（MVP 必须落地）

| 限制 | 建议值 | 原因 |
|---|---|---|
| 单文件大小 | ≤ 50 MB | 已在 data-contract 中定义，避免过大文件消耗内存/后端 |
| 单文件页数 | ≤ 200 页 | 控制客户端渲染与后端处理时间 |
| 每小时同 IP 请求 | 10–20 次免费处理 | 防止脚本滥用（无账户系统，需基于 IP 或 fingerprint） |
| 并发处理 | 1 个任务同时 | 避免浏览器崩溃，降低后端瞬时压力 |
| Merge 文件数 | ≤ 10 个 | 控制总大小与前端性能 |
| 输出文件 TTL | 1 小时（若后端 fallback） | 减少存储成本，与隐私声明一致 |
| 免费工具不含“无限制”承诺 | 文案中避免 unlimited、no limits | 降低被滥用和监管风险 |

### 3.4 免费额度安全结论

**安全，但前提：**
- 免费 4 工具保持纯客户端处理。
- 若引入后端 fallback，必须在 pricing 和 privacy 中同步说明。
- 必须加入基于 IP 的 rate limit，否则 50MB 文件反复上传会拖垮边缘性能。

---

## 4. 竞品锚点（PDF 工具）

以下价格为公开可得的主流模式，具体当前价格需在上线前手动验证。

| 竞品 | 模式 | 定价参考 | 与本产品对比 |
|---|---|---|---|
| **Adobe Acrobat Pro** | 订阅 | ~$19.99/月（年付）或 ~$239.88/年 [待确认] | 订阅制，价格远高于 $29 lifetime；本产品主打“无订阅”差异化 |
| **Foxit PDF Editor** | 订阅 + 永久 | 订阅 ~$12.99–$14.99/月；永久版 ~$159 [待确认] | 永久版价格约为本产品的 5–8 倍，$29 lifetime 锚点极低 |
| **Smallpdf** | 订阅 | ~$12/月（年付）或 ~$108/年 [待确认] | 无一次性买断，$29 仍具备吸引力 |
| **iLovePDF** | 订阅 + 免费限制 | 高级版 ~$7–$12/月；免费版有水印/文件限制 [待确认] | 本产品免费无水印是强卖点，但需警惕成本 |
| **PDFgear** | 免费 + 高级 | 个人免费；商用/高级版 ~$29.99/年或一次性 [待确认] | 免费对个人用户冲击较大；$29 lifetime 需强调“无功能阉割” |
| **Sejda** | 订阅 + 一次性 | 桌面版一次性 ~$63；网页版订阅 ~$8/月 [待确认] | $29 lifetime 仍低于 Sejda 一次性桌面价 |
| **PDFsam** | 一次性 | 增强版 ~€39 一次性 [待确认] | 功能范围不同，但一次性模式可支持 $29 定价 |

### 4.1 锚点结论

- **$29 lifetime 在竞品中属于极低价格带**，尤其对于包含 Convert to Word 的套件而言。
- **$19 launch 更像“促销获客价”**，低于大多数竞品的一次性/年付价格，转化吸引力强。
- **风险**：定价过低可能让用户质疑质量，也可能导致 Lifetime 用户后续消耗后端成本无法收回。

---

## 5. 套餐矩阵建议

### 5.1 当前套餐结构问题

当前 `/pricing` 为三列卡片：

| 套餐 | 价格 | 问题 |
|---|---|---|
| Free | $0 | 合理，但与 Full Editor 之间缺少“试用/低价入口” |
| Full Editor | $29 | 与 Launch Special 功能完全相同，价格更高，无转化理由 |
| Launch Special | $19 | 实际是默认结账价；与 Full Editor 并列会拉低标准价感知 |

### 5.2 推荐方案 A：保留 $29 lifetime，但重构展示（推荐）

| 套餐 | 价格 | 定位 | 文案方向 |
|---|---|---|---|
| Free | $0 | 体验 4 个基础工具 | “Free PDF tools. No signup.” |
| Launch Special | **$19** | 限时首发价（MVP 阶段主推） | “Launch Special — $19 one-time” |
| Full Editor | ~~$29~~ $29 | 标准 lifetime 价；作为对照锚点 | “Standard price $29. Lock in $19 today.” |

**推荐理由：**
- 用 $29 作为原价锚点，$19 作为当前价，转化路径一致。
- 未来可随时结束 launch 优惠，回到 $29 而不破坏定价体系。
- 符合 NOT-DO 中“不做订阅”的商业模式。

### 5.3 推荐方案 B：直接 $29 lifetime，删除 $19

- 如果成本模型或毛利率要求更严格，可以直接 $29。
- 但首页、博客、定价页都需统一，checkout 默认 $29。
- 转化吸引力下降，但单客利润更高。

### 5.4 推荐方案 C：提高标准价至 $39–$49，保留 $19/$29 launch

- 竞品一次性 PDF 编辑器通常在 $60–$160，$29 偏低。
- 若 Convert to Word 后端成本较高，可考虑 $39–$49 lifetime。
- 但 MVP 阶段不建议激进涨价，容易超出现有用户预期。

---

## 6. CTA 与开通路径一致性

### 6.1 当前路径检查

| 位置 | CTA 文案 | 指向金额 | 是否一致 |
|---|---|---|---|
| `/` home | `Get Full Editor — $29` | 期望 $29 | ⚠️ 与 checkout 默认 $19 不一致 |
| `/pricing` Full Editor | `Get full editor` | $29 | ✅ 与自身一致 |
| `/pricing` Launch Special | `Claim launch price` | $19 | ✅ 与自身一致 |
| `/pricing` metadata | `$29 full editor license` | $29 | ✅ |
| `/checkout` 默认 | `Pay $19 — Unlock Full Editor` | $19 | ⚠️ 与首页 $29 CTA 冲突 |
| `/checkout` 选项 | `Full Editor $29` | $29 | ✅ |
| `/success` | 展示 license key | 与价格无关 | ✅ 概念一致，但当前为占位符 |
| 博客 | `Get Full Editor — $29 Lifetime` | $29 | ⚠️ 进 checkout 后默认 $19 |

### 6.2 核心问题

**首页和博客用 $29 做 CTA，但 checkout 默认收 $19。** 这会导致：
- 价格锚点混乱：用户以为要买 $29，结果只需 $19。
- 潜在合规风险：可能被理解为“虚假原价”或“误导性折扣”。
- 若 $29 是标准 lifetime，$19 是限时优惠，必须明确说明 $19 是“限时 launch 价”，并给出截止日期或条件。

### 6.3 建议统一口径

| 页面 | 推荐 CTA |
|---|---|
| `/` home | `Get Full Editor — $19 launch price` 或 `Get Full Editor — $29 $19 launch` |
| `/pricing` | 主推 `Launch Special — $19`；用 $29 作为 strikethrough 原价 |
| `/checkout` | 默认 `Launch Special $19`；保留 `Full Editor $29` 选项 |
| `/success` | 显示已购金额 + license key：`License key for $19 Launch Special` |
| 博客 | 统一为 `$19 launch` 或 `$29 lifetime` 二选一；建议统一为 `$19 Launch Special` |

---

## 7. 明确建议

### 7.1 $29 lifetime 是否保留？

**推荐：保留 $29 lifetime，但不再作为默认购买价。**

- $29 作为**标准 lifetime 价格锚点**保留。
- MVP 阶段**默认销售价为 $19 launch special**。
- 在 `/pricing` 页面中，$29 应以“原价”或“标准价”展示，$19 作为“当前限时价”主推。
- 当 launch 期结束，可直接切回 $29，无需改文案结构。

### 7.2 是否建议修改 `/pricing` 或 `/checkout`？

**建议修改 `/pricing` 页面。**

具体变更清单：

| 位置 | 当前 | 建议 | 优先级 |
|---|---|---|---|
| `/pricing` 卡片结构 | 三列：Free / $29 / $19 | 改为两列：Free / $19 Launch Special，$29 作为 strikethrough 原价 | 高 |
| `/pricing` Full Editor 卡片 | `$29 one-time` 为推荐 | 取消独立卡片，或改为“Standard price $29 — lock in $19” | 高 |
| `/pricing` CTA | `Claim launch price` | `Get Launch Special — $19` | 高 |
| `/pricing` FAQ | “14-day no-questions-asked refund” | 补充 launch 优惠有效期，例如 “Available until [date]” | 中 |
| `/pricing` 对比表 | 两列 Free / Full Editor | 保留，但 Full Editor 价格写 `$19 launch (reg. $29)` | 中 |
| `/checkout` 默认选项 | `$19 Launch Special` | 保持默认 $19，但需确认与入口 CTA 一致 | 中 |
| `/checkout` 文案 | `Lifetime updates (Major & Minor)` | 需明确“current major version”以限制 Lifetime 边界 | 高 |
| `/checkout` 安全标 | `Encrypted / Stripe checkout / 14-day refund` | 保留；建议增加“License key sent by email” | 低 |
| `/success` | 仅展示 license key | 增加购买摘要：`Launch Special $19 · License key` | 中 |
| 首页 `/` | `Get Full Editor — $29` | 改为 `Get Full Editor — $19 Launch Special` | 高 |
| 博客 `/blog/*` | `$29 Lifetime` | 统一为 `$19 Launch Special` 或 `$29 Lifetime` 二选一 | 高 |

### 7.3 免费额度是否安全？

**安全，但有条件：**
- 免费 4 工具保持纯客户端，不调用后端。
- 明确文件上限（50MB / 200页 / 每小时同IP限10-20次）。
- 若上线后 Compress 或 Convert to Word 需要后端，必须重新校准并可能引入限制或调整价格。

---

## 8. 风险清单

| 风险等级 | 类型 | 位置 | 问题描述 | 引用/标准 | 修复建议 |
|---|---|---|---|---|---|
| 🔴 高 | 价格欺诈 / 误导性折扣 | `/pricing` / `/checkout` | $29 与 $19 同时作为独立卡片售卖，功能相同，可能构成虚假原价 | FTC 反欺骗性定价 / 州 AG 消费者保护法 | 将 $29 作为 strikethrough 原价，$19 作为当前价；明确标注 launch 优惠有效期 |
| 🔴 高 | 价格口径不一致 | `/` home → `/checkout` | 首页 CTA 是 $29，结账默认 $19 | 一致性要求 | 统一入口文案为 $19 launch 或 `$29 → $19` |
| 🟡 中 | 退款成本 | `/checkout` / `/refund` | 14 天无理由退款，每退一单损失 $0.30 Stripe 手续费 + 后端成本 | Stripe 政策 | 在 FAQ / refund 页明确退款条件；统计退款率，>10% 时重审定价 |
| 🟡 中 | 销售税 / 州税 | Stripe 税务设置 | 美国部分州要求对软件销售征收销售税；未配置会导致税务合规风险 | 各州销售税法规 | 在 Stripe 中启用 Tax 或 Avalara；在 Terms 中说明用户需自行承担适用税费 |
| 🟡 中 | 欧盟/英国 VAT | 国际支付 | 若接受欧洲用户，需收取 VAT 并申报 | EU VAT / UK VAT MOSS | 上线初期限制仅美国/北美，或在 Stripe Tax 中开启 VAT 计算 |
| 🟡 中 | Lifetime 边界模糊 | `/pricing` / `/checkout` | 文案写“Lifetime updates”，但未定义主版本范围 | 服务条款 | 在 Terms 中写明 lifetime 指当前主要版本，重大重构/新平台可能需重新授权 |
| 🟡 中 | 设备限制执行 | `/checkout` / `/success` | 声明最多 5 台设备，但当前无账户系统，license key 泄露无法控制 | 授权策略 | license key 激活需记录设备指纹；超限需引导联系客服 |
| 🟡 中 | 免费工具滥用 | 4 个免费工具 | 无注册、无 rate limit，易被脚本刷 | 成本控制 | 增加 IP rate limit、文件大小/页数上限、前端指纹校验 |
| 🟢 低 | 邮件送达 | `/success` | license key 通过邮件发送，可能进入垃圾邮件 | CAN-SPAM | 使用 Resend / Postmark 等可投递性高的服务；支持页面提供“重发 license” |
| 🟢 低 | 分析工具隐私披露 | 全站 | 若使用 Google Analytics，需在隐私政策披露 Cookie | GDPR / CCPA | 在 04 合规阶段确认分析工具选型并写入隐私政策 |

---

## 9. 下游交接摘要

### 当前结论
- **状态**：[NEEDS_REVIEW]
- **一句话结论**：$29 lifetime 应保留为标准价锚点，MVP 阶段主推 $19 Launch Special；`/pricing` 页面需要重构，避免 $29/$19 同功能并列；CTA 口径必须统一。

### 关键输入
- 项目：removepdfpages.net
- 当前阶段：03-pricing
- 上游资料：`docs/PRD-v1.md`、`docs/page-matrix.md`、`docs/route-contract.json`、`docs/MVP-NOT-DO.md`、`docs/data-contract.md`、`app/pricing/page.tsx`、`app/checkout/page.tsx`

### 本阶段交付物
- 文件：`docs/pricing-calibration.md`
- 核心判断：
  - 保留 $29 lifetime 作为原价锚点。
  - MVP 默认售价为 $19 Launch Special。
  - 必须修改 `/pricing` 页面，避免同功能双价卡片。
  - 免费额度安全，前提是纯客户端 + 文件/rate 限制。
- 已确认项：竞品一次性/订阅价格均高于 $29；$29 在市场中属低价。
- 待确认项：
  - 具体后端 PDF 处理方案（WASM / 第三方 API / 自托管）。
  - 真实 Stripe 账户费率、税务设置、销售税州覆盖。
  - 分析工具最终选型（Plausible / Vercel / Google）。
  - $19 launch 优惠的具体截止日期或数量限制。

### 质量门槛自检
- [x] 价格有竞品锚点和成本依据
- [x] 免费额度能体验价值但不亏穿（需 rate limit + 文件上限）
- [ ] 没有“无限”或承诺过度 —— 当前页面未写 unlimited，但需明确限制
- [ ] CTA 与真实开通路径一致 —— 需修改首页和博客价格口径

### 风险
- **P0**：$29/$19 同功能并列可能构成误导性定价；结账默认价与入口 CTA 不一致。
- **P1**：后端处理方案未定，Convert to Word 成本会显著影响毛利；退款与税务设置未配置。
- **P2**：Lifetime 边界、设备限制、邮件送达、分析工具隐私披露。

### 给下游的最小必要信息
- 下一阶段：04 合规（法律页填充）。
- 必须读取：`docs/pricing-calibration.md`、`docs/PRD-v1.md`、`docs/data-contract.md`。
- 不能假设：$29 是默认销售价；$19 是永久价；免费工具无限制。
- 建议：合规阶段在 Terms 中写明 lifetime 边界、退款条件、销售税/设备限制；在 Privacy 中根据后端处理方案更新数据流。
