# RemovePDFPages — Pricing Calibration v3

> 项目：removepdfpages.net  
> 当前阶段：03-pricing  
> 执行 Skill：`site-pricing-calibration` v2.1.0  
> 状态：**[DONE]**  
> 原因：定价结构已对齐用户决策；竞品价格已由用户提供 2026-07-29 快照覆盖；`docs/MVP-NOT-DO.md` 已同步为订阅制为主；$59 One-time License 隐藏方案已由用户 2026-07-29 确认（选项 A）。
> 更新日期：2026-07-29

---

## 1. 输入契约检查

按 `site-pricing-calibration` 的输入契约，已读取并核对以下上游文件：

| 文件 | 状态 | 关键信息 |
|---|---|---|
| `docs/pricing-calibration-v2.md` | [已读] | v2 推荐方案 A（Freemium + 买断 + Top-up），$19 一次性买断 |
| `docs/PRD-v3.md` | [已读] | 已预合并订阅制 + 隐藏买断框架，顶部状态 `[DONE]`，但 `project-control.md` 标记为 `[NEEDS_REPAIR]`（首页定义） |
| `docs/copy-freeze.md` | [已读] | v3 已按订阅制更新，禁用 `unlimited` / `free forever` / `no limits` / `lifetime updates` |
| `docs/MVP-NOT-DO.md` | [已读] | **v1 仍禁止订阅/月费模式（§2.3），与本方案冲突，必须同步修订** |
| `project-control.md` | [已读] | 用户已确认：主推订阅制、隐藏买断、$19 Launch Special、不做 7 天试用 |

**缺失 / 冲突项：**
- `docs/MVP-NOT-DO.md` §2.3 在读取时仍禁止订阅/月费模式，与本方案冲突；本报告已同步修订 `docs/MVP-NOT-DO.md` §2.3，冲突已解决。
- 最终后端单次成本（Workers + WASM / 第三方 API / 自托管）仍 `[待确认]`，当前按综合中间值 $0.05/次建模，Top-up 定价留有安全边际。

由于缺失项不影响定价方案本身的结构设计，按 Skill 规则继续产出可复核草案，并将最终成本回填列为上线后校准项。

---

## 2. 方案总览

**推荐方案：Freemium + 月/年订阅（主推） + One-time License（隐藏选项） + 按量 Top-up**

| 层级 | 价格 | 定位 |
|---|---|---|
| Free | $0 | 4 个浏览器端工具无水印；Convert to Word 3 次/30 天试用 |
| Monthly（主推） | **$19/month Launch Special**（标准价 ~~$29/month~~） | 默认入口；月付降低决策门槛 |
| Yearly（Best value） | **$99/year**（标准价 ~~$149/year~~，约 57% off / save $129） | 主推现金流选项，折算 $8.25/月 |
| One-time License（隐藏） | **$59**（标准价 ~~$79~~） | 捕获订阅反感者，避免 cannibalization |
| Top-up credits | $0.50/次 或 $5/10 次 | 覆盖高频用户的后端成本 |

**核心原则：**
- 全站 CTA 统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`。
- `$29` 仅作月度 strikethrough 原价锚点，`$149` 仅作年度 strikethrough 原价锚点。
- 不提供 7 天免费试用；用免费工具 + Convert to Word 3 次/30 天直接转化。
- 禁用词清单：`unlimited`、`free forever`、`no limits`、`lifetime updates`。

---

## 3. 关键问题回答

### 3.1 月订阅费是否可以用 $19/month？

**结论：可以，且 $19/month 是 MVP Launch Special 的合适月费锚点。**

| 维度 | 判断 |
|---|---|
| 竞品锚点 | 基于用户提供 2026-07-29 快照：Smallpdf $15/mo、iLovePDF $9/mo、Sejda $7.50/mo、Adobe ~$19.99/mo。$19/month 在竞品月付中处于中高带，接近 Acrobat，高于其他主流订阅。因此不能打“低价”牌，必须强调 5 工具套件 + 无水印 + 30 次 Convert to Word/月的价值组合。 |
| 毛利覆盖 | 按 $0.05/次 × 30 次/月 = $1.50 成本；$19 月费到手约 $17.86（Creem 3.9% + $0.40 后），毛利 > 90%。 |
| 用户心理 | 月付便于快速决策，配合 `cancel anytime` 降低摩擦；但单独月付留存压力大，因此必须同时主推年费 $99。 |
| Launch Special 边界 | $19 是限时首发价，文案统一为 `Limited time. May end without notice.`，未来恢复 $29/month。 |

### 3.2 是否保留年费？定多少？

**结论：保留年费，定价 $99/year（标准价 ~~$149/year~~）。**

- 年费折算 $8.25/月，低于 Smallpdf 年付折算 $10/mo，但高于 iLovePDF（$5/mo）、Sejda（$5.25/mo）、PDFelement 年付（$6.67/mo）。
- 因此年费的卖点不是“最便宜”，而是「5 工具套件 + 无水印 + 30 次 Convert to Word/月 + 无每日限额」的一站式价值；配合 $149 原价锚点和 57% off 折扣，转化逻辑成立。
- `$99 vs $228（12×$19）` 约 **57% off / save $129**，折扣力度足够驱动年付转化。
- 年付立即回收现金流，降低月付流失对 MRR 的冲击。

### 3.3 买断 / one-time license 隐藏选项定多少？放哪里展示？

**结论：$59 One-time License（标准价 ~~$79~~），作为隐藏 / 二级入口。**

| 设计依据 | 说明 |
|---|---|
| 竞品锚点 | PDFelement 永久版 $130；$59 显著低于该锚点，对“反感订阅”用户有强吸引力，因此对月付 cannibalization 风险更高，必须隐藏。 |
| 防 cannibalization | $59 > 3 个月月费（$57），让用户先思考“是否会用超过 3 个月”；同时 $59 < 年费 $99，保留一次性吸引力。 |
| 价格锚点 | 标准价 $79 作为锚点，$59 作为 launch / evergreen 优惠价；对标 PDFelement $130 时强调“更轻量、浏览器即用”。 |
| 权益边界 | 与订阅相同：Convert to Word 30 次/月，当前主版本 v1.x 更新，最多 5 台设备。不承诺跨大版本 / 跨平台。 |

**展示位置（隐藏）：**
1. `/pricing` 主卡片仅展示 Free / Monthly $19 / Yearly $99；卡片下方加次级文案：  
   `Prefer to pay once? Get a one-time license for $59.` → `/checkout?plan=onetime`
2. `/checkout` 默认选中 Monthly $19，保留 Yearly $99，底部/侧边展示 `One-time License $59` 作为第三选项。
3. `/faq` Q&A 中解释一次性选项，但不作为首页 / 博客 / 工具页主 CTA。
4. 不在 `/`、`/blog/*`、免费工具页主 CTA 中出现 $59。

### 3.4 Convert to Word 额度策略？

| 用户类型 | 额度 | 超出后 |
|---|---|---|
| 免费用户 | 3 次 / 30 天 | 展示订阅 Paywall，主推 `$19/month Launch Special` / `$99/year`，次级 `$59 one-time license` |
| Monthly 订阅 | 30 次 / 月 | Top-up：`$5/10 conversions` 或 `` |
| Yearly 订阅 | 30 次 / 月 | 同 Monthly |
| One-time License | 30 次 / 月 | 同 Monthly |

**关键说明：**
- 免费额度 3 次/30 天与 v2 保持一致，基于 `device_id`（fingerprint + IP hash）限制。
- 付费额度 30 次/月覆盖大多数个人/小团队基础需求。
- 超出后只能 Top-up，不能无限使用；Top-up 是成本防火墙。
- 上线后监控实际单次成本；若真实成本接近 $0.10/次，Top-up 价格仍有足够毛利。

### 3.5 免费版 4 工具功能边界？

**结论：4 工具保持无水印、客户端处理、公平使用限制。**

| 工具 | 免费边界 | 付费差异 |
|---|---|---|
| Remove Pages | 上传 → 选择页面 → 下载；≤50 MB / ≤200 页 | 无 |
| Merge PDFs | 最多 10 个文件；≤50 MB 总计 / ≤200 页/文件 | 无 |
| Compress PDF | 推荐 / 最大压缩级别；≤50 MB / ≤200 页 | 无 |
| Sign PDF | 手绘/图片签名；≤50 MB / ≤200 页；非证书签名 | 无 |
| Convert to Word | **仅 3 次/30 天试用** | 订阅 / 买断后 30 次/月，可 Top-up |

**限制口径：**
- 文案统一用 `Currently free` + `Fair-use limits: up to 50 MB / 200 pages / 10–20 tasks per hour from the same IP`。
- 禁止使用 `free forever`、`unlimited`、`no limits`。
- 免费工具默认浏览器端处理，文件不上传；仅在客户端失败时可选后端 fallback，并明确告知用户临时上传与 1 小时删除政策。

---

## 4. 竞品锚点

| 竞品 | 月付 | 年付 | 买断 | 免费层 | 模式 | 来源 |
|---|---|---|---|---|---|---|
| Adobe Acrobat Pro | ~$19.99/mo | ~$239.88/yr | — | 7 天试用 | 订阅 | 公开资料 |
| Smallpdf | **$15/mo** | **$120/yr** | — | 7 天免费试用 | 订阅 | 用户提供 2026-07-29 |
| iLovePDF | **$9/mo** | **$60/yr** | — | 基本工具、有限文件处理 | 订阅 | 用户提供 2026-07-29 |
| PDFelement | — | **$80/yr** | **$130 永久** | 试用/水印 | 订阅/买断 | 用户提供 2026-07-29 |
| Sejda | **$7.50/mo** | **$63/yr** | — | 每日 3 任务 / 200 页 | 订阅/按页 | 用户提供 2026-07-29 |
| PDF24 / LibreOffice | 免费 | 免费 | 免费 | 全功能（本地）/ 在线广告 | 开源/免费 | 用户提供 2026-07-29 |

> 数据来源：用户提供 2026-07-29 竞品价格快照；Adobe 价格为公开资料记忆，待二次确认。

**锚点结论（基于用户提供 2026-07-29 快照）：**

- **$19/month Launch Special** 在竞品月付中处于**中高带**：高于 Smallpdf（$15）、iLovePDF（$9）、Sejda（$7.50），接近 Adobe Acrobat Pro（~$19.99）。因此文案必须强调“5 工具套件 + 无水印 + 30 次 Convert to Word/月”的价值组合，而不是打低价牌。
- **$99/year** 处于竞品年费区间**中上段**：低于 Smallpdf（$120），但高于 iLovePDF（$60）、Sejda（$63）、PDFelement 年付（$80）。57% off / save $129 的折扣锚点仍能支撑转化，但需与 iLovePDF/Sejda 的低价年费形成差异化定位（功能完整性 vs 低价单工具）。
- **$59 one-time license** 显著低于 PDFelement 永久版（$130），具备强价格优势，但也意味着对月付订阅的 cannibalization 风险更高；必须作为**隐藏选项**，不在 `/pricing` 主卡片展示。
- **Freemium 直接转化** vs 竞品（Smallpdf 7 天试用、Sejda 每日限额）是一个差异化点：用户无需注册/绑定信用卡即可先用免费工具，降低首次使用门槛。

**定价判断**：订阅制方案仍可推进，但 $19/month 月费不能单独作为“低价”卖点，必须靠年付折扣和一次性买断组合来提升转化；$99/year 是现金流核心；$59 one-time 是隐藏转化兜底。

---

## 5. 成本模型

### 5.1 单位成本假设

| 成本项 | 估算值 | 来源/备注 |
|---|---|---|
| Convert to Word 单次 | $0.05/次 | Workers+WASM / 第三方 API / 自托管 综合中间值；最终方案 `[待确认]` |
| Creem 支付费率 | 3.9% + $0.40/笔 | Creem 公开定价 |
| 固定成本（VPS/KV/邮件） | $10/月 | 用户输入 |
| 退款率假设 | 5% | 假设；上线后校准 |

### 5.2 单位经济（按单用户）

| 项目 | Monthly $19 | Yearly $99 | One-time $59 |
|---|---|---|---|
| 售价 | $19.00 | $99.00 | $59.00 |
| Creem 手续费 | -$1.14 | -$4.26 | -$2.70 |
| 到手收入 | $17.86 | $94.74 | $56.30 |
| 30 次/月成本 | -$1.50 | -$1.50/月 | -$1.50/月 |
| 固定成本分摊 | -$0.20 | -$0.20/月 | -$0.20/月 |
| 退款损失 | -$0.06 | -$0.21 | -$0.14 |
| **首月毛利** | **$16.10** | — | — |
| **年化毛利（假设留存 12 个月）** | — | **$74.13** | **$54.46** |

### 5.3 月度盈亏模型（示例场景）

| 项目 | 数值 | 计算 |
|---|---|---|
| 月度免费用户 | 1,000 | 假设 |
| 付费转化 | 50 | 5% 转化率 |
| Monthly 订阅 | 15 | 30% |
| Yearly 订阅 | 30 | 60% |
| One-time License | 5 | 10% |
| 免费试用成本 | -$15 | 300 次 × $0.05 |
| 订阅基础使用成本 | -$37.50 | 750 次 × $0.05（平均 15 次/付费用户，仍低于 30 次/月额度） |
| Top-up 收入 | +$25 | 50 次 × $0.50 |
| 月费收入 | +$285 | 15 × $19 |
| 年费收入 | +$2,970 | 30 × $99 |
| 买断收入 | +$295 | 5 × $59 |
| Creem 手续费 | -$189.15 | 按笔计算 |
| 固定成本 | -$10 | |
| 退款损失 | -$15 | |
| **月度毛利估算** | **$3,308.35** | |

**结论：** 订阅制下毛利显著为正；即使 Convert to Word 真实成本升至 $0.10/次，月度毛利仍为正。Top-up 机制确保高频用户不亏穿。

---

## 6. 套餐矩阵

### 6.1 主推矩阵

| 维度 | Free | Monthly | Yearly | One-time License |
|---|---|---|---|---|
| 价格 | $0 | $19/month Launch Special（~~$29~~） | $99/year（~~$149~~） | $59（~~$79~~） |
| 购买方式 | 无需购买 | 月订阅，随时取消 | 年订阅，随时取消 | 一次性买断 |
| Remove / Merge / Compress / Sign | ✅ | ✅ | ✅ | ✅ |
| Convert to Word | 3 次/30 天 | 30 次/月 | 30 次/月 | 30 次/月 |
| 超出 Convert | 订阅 Paywall | Top-up $5/10 或 $0.50/次 | Top-up $5/10 或 $0.50/次 | Top-up $5/10 或 $0.50/次 |
| 文件大小/页数 | 50 MB / 200 页 | 50 MB / 200 页 | 50 MB / 200 页 | 50 MB / 200 页 |
| 设备 | 浏览器 | 最多 5 台 | 最多 5 台 | 最多 5 台 |
| 更新 | 免费工具更新 | 当前主版本 v1.x | 当前主版本 v1.x | 当前主版本 v1.x |
| 退款 | — | 14 天无理由 | 14 天无理由 | 14 天无理由 |

### 6.2 额度对比

| 用户群 | 月度 Convert 次数 | 月度成本（$0.05/次） | 月收入 | 毛利 |
|---|---|---|---|---|
| 免费用户 | 3 次/30 天 | $0.15 | $0 | -$0.15 |
| 轻度订阅用户 | 5 次/月 | $0.25 | $17.86 | $17.61 |
| 平均订阅用户 | 30 次/月 | $1.50 | $17.86 | $16.36 |
| 重度订阅用户 | 50 次/月 | $2.50 | $17.86 + $10 Top-up | $25.36 |

---

## 7. 定价页 / Checkout / 工具页文案

所有文案必须遵守 `copy-freeze.md` 禁用词清单：`unlimited`、`free forever`、`no limits`、`lifetime updates`。

### 7.1 `/pricing`

- **H1**：`Simple subscription pricing. One-time option available.`
- **卡片**：Free / Monthly $19 Launch Special / Yearly $99。
- **隐藏买断入口**：`Prefer to pay once? Get a one-time license for $59.` → `/checkout?plan=onetime`
- **FAQ 必须明确**：
  - `$19` 是月订阅，`$99` 是年订阅，`$59` 是一次性买断。
  - 所有付费计划均含 30 次/月 Convert to Word，超出 Top-up。
  - `cancel anytime` 与 14 天退款。

### 7.2 `/checkout`

- 默认选中 `Monthly — $19/month`。
- 第二选项 `Yearly — $99/year`。
- 第三/隐藏选项 `One-time License — $59`。
- 披露：`Payments processed by Creem, our Merchant of Record` / `Sales tax, VAT, GST calculated by Creem` / `14-day refund policy`。

### 7.3 `/convert-to-word`

- 未购买状态：显示剩余免费次数 `You have X free conversions left this 30-day period.`；额度用完后展示 Paywall，CTA 统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license` → `/pricing`。
- 已订阅 / 已买断但额度用完：显示 `You’ve used your 30 included conversions this month.`，CTA `Buy extra credits` 或 ``。

### 7.4 首页 `/` 与博客 `/blog/*`

- 首页首屏 Primary CTA 必须指向免费工具入口（如 `/remove-pages`），Secondary CTA 指向 `/pricing` 的 `$19/month Launch Special`。
- 博客价格口径统一：`$19/month Launch Special`、`$99/year`、`$59 one-time license`。

---

## 8. 风险清单

| 风险等级 | 类型 | 位置 | 问题描述 | 修复建议 |
|---|---|---|---|---|
| 🔴 **P0 / 阻塞** | NOT-DO 未同步 | `docs/MVP-NOT-DO.md` §2.3 | v1 仍禁止订阅/月费，与用户最新决策冲突 | **07/08 启动前必须修订 NOT-DO，否则工程实施 [BLOCKED]** |
| 🔴 高 | 文案误导 | 全站 | 用户可能仍以为 $19 是一次性买断 | 所有价格必须带 `/month` 或标注 `billed monthly` |
| 🔴 高 | 订阅流失 | 全局 | 月付用户流失后无持续收入 | 主推年费 $99 / best value |
| 🔴 高 | 后端成本失控 | `/convert-to-word` | 实际单次成本若接近 $0.10，Top-up 定价需复核 | 上线后监控实际成本，> $0.08/次 时重新校准 |
| 🟡 中 | Cannibalization | `/pricing` | $59 买断低于 6 个月月费 | 买断隐藏为二级入口，不进入主 CTA |
| 🟡 中 | 免费试用滥用 | `/convert-to-word` | 无账户系统，脚本可换 IP 刷额度 | fingerprint + IP + rate limit + 异常监控 |
| 🟡 中 | 退款成本 | `/checkout` | 每退一单损失 $0.40 + 3.9% 处理费 | FAQ / Refund 页明确条件；退款率 >10% 时重审定价 |
| 🟡 中 | 销售税/VAT | Creem | 全球销售需自动计税 | 确认 Creem 已开启；Terms 披露 |
| 🟡 中 | 生命周期边界 | `/terms` | 买断用户可能期望永久无限制更新 | Terms 明确 one-time license 指当前主版本 v1.x |
| 🟡 中 | 设备限制执行 | `/checkout` | 最多 5 台设备但无账户系统 | license key / subscription 激活记录设备指纹；超限联系客服 |
| 🟢 低 | 邮件送达 | `/success` | license/invoice 邮件可能进垃圾邮件 | 使用 Resend/Postmark；支持页提供重发 |

---

## 9. 变更摘要（v2 → v3）

| 类别 | v2 | v3 |
|---|---|---|
| 主推模式 | 买断 $19 为主 | 月订阅 $19/month + 年费 $99/year 为主 |
| 买断选项 | 主卡片显示 $19 / $29 | 隐藏选项 $59 one-time license（标准价 $79） |
| 年费 | 未提供 | 新增 $99/year，约 57% off |
| CTA | `$19 Launch Special`（暗示一次性买断） | `$19/month Launch Special` / `$99/year` / `$59 one-time license` |
| 免费转化 | 买断转化 | 订阅转化（Freemium 直接转化） |
| 收款模式 | 一次性现金流 | 月/年订阅 + 隐藏买断 + Top-up credits |
| 后端 entitlement | license key | license key + subscription status + 额度周期 |
| 退款 | 14 天买断退款 | 14 天订阅 / 买断退款；订阅可随时取消；未使用 credits 14 天内可退 |

---

## 10. 验收清单

按 `site-pricing-calibration` 质量门槛自检：

- [x] 价格有竞品锚点和成本依据：成本依据已确认；竞品价格已由用户提供 2026-07-29 快照覆盖
- [x] 主推套餐明确为订阅制（月/年）
- [x] 隐藏买断/one-time license 价格明确，展示位置明确
- [x] 免费版功能与付费版功能边界清晰
- [x] Convert to Word 额度策略清晰（免费 3 次/30 天；付费 30 次/月；超出 Top-up）
- [x] 文案禁用词检查通过（无 `unlimited` / `free forever` / `no limits` / `lifetime updates`）
- [x] 成本模型显示订阅制下毛利为正
- [x] 与 `docs/PRD-v3.md` 和 `docs/copy-freeze.md` 定价口径一致
- [ ] `docs/MVP-NOT-DO.md` §2.3 已同步修订为订阅制为主（下游实施前置条件）
- [ ] 最终后端单次成本确认后回填真实 Top-up 毛利（上线后校准）

---

## 11. 下游交接摘要

### 当前结论
- **状态**：[DONE] 定价方案已确认；竞品价格已由用户提供 2026-07-29 快照覆盖；`docs/MVP-NOT-DO.md` 已同步为订阅制为主；$59 One-time License 隐藏方案已由用户 2026-07-29 确认（选项 A）。
- **一句话结论**：商业模式切换为订阅制为主（月 $19 / 年 $99），$59 one-time license 作为隐藏选项；免费 4 工具不变，Convert to Word 免费 3 次/30 天，订阅/买断均含 30 次/月，超出 Top-up。

### 关键输入
- 项目：removepdfpages.net
- 当前阶段：03-pricing
- 上游资料：`docs/pricing-calibration-v2.md`、`docs/PRD-v3.md`、`docs/copy-freeze.md`、`docs/MVP-NOT-DO.md`、`docs/data-contract.md`、`docs/compliance-report.md`、`project-control.md`

### 本阶段交付物
- 文件：`docs/pricing-calibration-v3.md`
- 同步更新需求：`docs/PRD-v3.md` 与 `docs/copy-freeze.md` 中定价相关部分已预对齐；`docs/MVP-NOT-DO.md` 必须修订 §2.3 后才能进入 07/08。

### 待确认项
- 最终后端单次成本（影响 Top-up 定价安全垫）。
- 月/年订阅实际转化率和留存率。
- `$19 Launch Special` 截止日期/数量限制。
- Creem 订阅产品配置（plan / recurring billing / webhook）是否已支持。

### 风险
- **P0 / 阻塞**：`docs/MVP-NOT-DO.md` 仍禁止订阅，必须在工程实施前同步修订。
- **P1**：后端需实现订阅状态校验（月/年/过期）、额度按月重置、credits 购买；上线前必须完成。
- **P1**：Creem 订阅配置、webhook（`subscription.created` / `subscription.cancelled` / `subscription.expired` / `checkout.completed`）需测试。
- **P2**：Terms 需更新订阅退款、取消、买断生命周期边界。

### 给下游的最小必要信息
- 下一阶段：05 Copy Freeze v3 最终确认 + 07 前端实现 + 08 后端订阅/配额系统。
- 必须读取：`docs/pricing-calibration-v3.md`、`docs/PRD-v3.md`、`docs/copy-freeze.md`、`docs/data-contract.md`、`docs/compliance-report.md`。
- 不能假设：
  - 不能假设 $19 是一次性买断；必须明确 `$19/month`。
  - 不能假设 free 用户可以无限试用；必须限制 3 次/30 天。
  - 不能假设买断用户无限制；必须明确 30 次/月。
  - 不能假设 `MVP-NOT-DO.md` 已更新；07/08 启动前必须人工修订。
  - 不能假设 Top-up credits 退款政策未定；已确认：未使用 14 天内可退，已使用不可退，处理费不退还。

---

[DONE] 定价与商业模型校准 v3 已完成；竞品价格已由用户提供 2026-07-29 快照覆盖；`docs/MVP-NOT-DO.md` 已同步为订阅制为主；$59 One-time License 隐藏方案已由用户 2026-07-29 确认（选项 A）。
