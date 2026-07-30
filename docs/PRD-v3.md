# RemovePDFPages — PRD v3 (5-tool suite)

> 版本：v3  
> 更新原因：合并 `docs/pricing-calibration-v3.md`（Freemium + 订阅制为主 + 隐藏一次性买断 $59 + 按量 Top-up），并切换支付/税务/退款服务商为 Creem  
> 项目：removepdfpages.net  
> 阶段：02-product  
> 目标市场：US / English（首发），国际销售全球开放  
> 状态：[DONE]  
> 最后更新：2026-07-29

---

## 1. 开始前检查 / Preflight

### 1.1 已读取输入
以下文件已按要求读取：
- `docs/precision-pdf-delivery-pack/README.md` — 原产品边界声明 [OK]
- `design-handoff-extract/route-mapping.json` — 11 个设计 handoff 路由 [OK]
- `design-handoff-extract/DESIGN.md` — 设计系统 v2 [OK]
- `10-frontend-realignment.md` — 前端已实现页面 [OK]
- `app/` 目录下所有 `page.tsx` [OK]
- `components/Header.tsx` / `components/Footer.tsx` — 导航与页脚 [OK]
- `public/sitemap.xml` — 已声明的 URL [OK]
- `project-control.md` — 当前项目状态与已确认决策 [OK]
- `docs/pricing-calibration-v3.md` — 定价与商业模式 v3（订阅制为主 + 隐藏买断） [OK]

### 1.2 缺失 / 待确认
以下信息已按阶段结论更新；公开发布前仍需补齐未确认项：
- `关键词机会报告与 SERP 竞品样本` [已补充：见 `docs/keyword-research-v1.md`；Blog 词优先采用 SEMRUSH，工具页优先采用 DataForSEO，Google SERP 以 Yahoo 代理获取]
- `博客关键词（Foxit alternative / replace image in PDF / one-time payment PDF editor / no subscription PDF editor）已由 SEMRUSH 验证，并计划新增 4 个 blog 页面
- `定价策略`已更新为 v3：主推订阅制月度 $19/month Launch Special（原价 $29/month）、年度 $99/year（原价 $149/year，约 57% off）；隐藏一次性买断 $59 One-time License（标准价 $79）[NEEDS_SOURCE_CHECK: 标准价]；全站 CTA 统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`]
- `退款政策`已更新为 v3：14 天无理由退款；订阅可随时取消；未使用 credits 14 天内可退，已使用不可退；支付处理费不退；支付/税务/退款由 Creem MOR 处理；待合规落地；引用：compliance-report.md v2 + pricing-calibration-v3.md]
- `数据流与文件处理架构`（免费 4 工具默认纯客户端处理；Convert to Word / 后端 fallback 临时上传，处理完成后 TTL 1 小时自动删除）[NEEDS_SOURCE_CHECK: 最终后端选型] [已确认：data-contract.md + compliance-report.md]
- `免费额度`（单文件 ≤50MB，≤200 页；每小时同 IP 10–20 次免费处理；Merge ≤10 文件）[已确认：pricing-calibration-v3.md]
- `Convert to Word 免费试用额度`（3 次/30 天）[已确认：pricing-calibration-v3.md]
- `Full Editor 包含 Convert to Word 额度`（10 次/月）[已确认：pricing-calibration-v3.md]
- `Top-up 价格`（$0.50/次 或 $5/10 次）[已确认：pricing-calibration-v3.md]
- `法律管辖地`（US 州法 / GDPR / CCPA 影响）[已确认：Terms 采用 Delaware 管辖，国际用户自负法律义务；等待 04 合规落地]
- `支付服务商`（Creem）[已确认：Armitage Labs OÜ，Merchant of Record；商户账户、订阅产品配置、webhook 仍待测试]
- `销售税/税务`：Creem 作为 MOR 自动计算并汇缴销售税/VAT/GST [已确认：compliance-report.md v2 + pricing-calibration-v3.md]
- `国际销售地理范围`（全球开放，美国首发）[已确认：pricing-calibration-v3.md + compliance-report.md v2]
- `$19 Launch Special 边界`（暂不公开具体日期/数量，文案为 `Limited time. May end without notice.`）[已确认：pricing-calibration-v3.md + compliance-report.md v2]
- `第三方分析工具选型`（待最终确认）：Plausible/GA4/Cloudflare Web Analytics（访问与来源）+ PostHog/Microsoft Clarity（用户行为漏斗/录屏/热力图）+ Google Search Console/Bing Webmaster Tools（SEO）+ Creem（业务与收入） [待最终确认：需在 05 Copy Freeze v3 前落定，以便更新 Privacy/Terms）]
- `最终后端方案`（Workers + WASM / 第三方 API / 自托管）及真实单次成本 [待确认]
- `用户实际平均生命周期、月转化率、平均使用频次` [待确认]
- `订阅到期后用户状态`（是否保留免费 3 次/30 天额度）[待确认：pricing-calibration-v3 建议到期后转为未购买状态，仅保留 3 次/30 天免费额度]

### 1.3 评估
关键决策输入已就绪，`pricing-calibration-v3.md` 已合并进本 PRD。未确认项已标记，后续阶段必须回填。

---

## 2. 决策日志

| # | 决策 | 依据 | 影响 |
|---|---|---|---|
| 1 | 产品边界从单一功能扩展为 5 工具套件 | `project-control.md` 已确认决策 | 需更新 PRD、路由合约、数据合约 |
| 2 | 5 工具：Remove / Merge / Compress / Sign / Convert to Word | `project-control.md` + 设计 handoff | 定义用户任务与后端能力 |
| 3 | 恢复 `/privacy` / `/terms` / `/refund` | `project-control.md` + `10-frontend-realignment.md` | 路由合约 + 页面矩阵 + 合规阶段 |
| 4 | 商业模式从「$29 lifetime 一次性买断」升级为 v3 订阅制为主 + 隐藏一次性买断 | `docs/pricing-calibration-v3.md` | PRD、数据合约、定价页、checkout、工具页 Paywall 需同步 |
| 5 | 免费将 Remove / Merge / Compress / Sign 作为免费工具，Convert to Word 作为付费工具 | 设计页面的 Free / Paid / Pro badge | 定义数据流与授权逻辑 |
| 6 | 设计 handoff 的 11 个路由作为路由合约基础 | `route-mapping.json` | 路由合约必须与之一一对应 |
| 7 | 移除 `/workspace` | 该路由不在 design handoff 中，已被删除 | sitemap 与重导向需处理 |
| 8 | 增加 blog 内容矩阵 | `docs/keyword-research-v1.md` 提供 4 个 SEMRUSH 验证的 blog 主题 | 路由合约与页面矩阵需更新 |
| 9 | 定价策略：主推订阅制月度 $19/month Launch Special + 年度 $99/year，隐藏一次性买断 $59 One-time License；$29 仅作月度原价锚点，$149 仅作年度原价锚点 | `docs/pricing-calibration-v3.md` | 博客、定价页、工具页付费转化入口 CTA 统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`；首页 `/` 首屏 Primary CTA 指向 `/pricing`，Secondary CTA 指向免费工具入口 |
| 10 | 数据流与处理架构：免费 4 工具客户端处理；Convert to Word / 后端 fallback 临时上传，TTL 1 小时 | `docs/compliance-report.md` + `docs/data-contract.md` | Privacy / Terms 与实际数据流一致 |
| 11 | 退款、税务、授权：14 天退款，订阅可随时取消，Creem 作为 MOR 自动处理销售税/VAT/GST，最多 5 台设备，设备指纹 | `docs/compliance-report.md` v2 + `docs/pricing-calibration-v3.md` | `/refund`、`/terms` 已填充；Footer 链接需修正 |
| 12 | Convert to Word 引入免费试用额度与 Top-up credits | `docs/pricing-calibration-v3.md` | 后端需新增订阅状态校验、配额系统、credits 购买接口；前端需展示额度 |
| 13 | 订阅到期后状态：建议转为未购买状态，仅保留 3 次/30 天免费额度 | `docs/pricing-calibration-v3.md` | Terms 需明确订阅到期后的使用权限 |

---

## 3. 产品定位

### 3.1 一句话定位
RemovePDFPages 是面向美国个人用户与小团队的 **5 工具 PDF 套件**：免费在浏览器中完成删除页面、合并、压缩、签名；订阅 Full Editor（月度 $19/ 年度 $99）或选择一次性 $59 买断 license 即可解锁 PDF 转 Word 等高级编辑能力，并包含月度转换额度，超出后可按量购买 credits。

[依据：当前首页 H1、定价页、`project-control.md`、`pricing-calibration-v3.md`]

### 3.2 产品属性
- 站点类型：工具型 SaaS / Browser Utility
- 市场：US / English（首发），国际销售全球开放
- 商业模式：Freemium + 订阅制为主（月度 $19/年度 $99） + 隐藏一次性 $59 买断 + 按量 Top-up credits
- 支付与税务：由 Creem（Armitage Labs OÜ，爱沙尼亚）作为 Merchant of Record 处理收款、反欺诈与销售税/VAT/GST 自动汇缴
- 设备：响应式 Web（不含原生 App）
- 核心价值：无需注册、无水印、文件不上传（或明确的临时存储 TTL）

### 3.3 竞争差异化
1. 订阅或一次性付费可选，主推订阅（月度 $19/年度 $99），买断 $59 作为隐藏选项
2. 免费 4 个工具无水印
3. 客户端优先处理，强调隐私
4. 付费工具提供可预期的月度额度，超出后按量透明计费
5. 独特的 Design System v2（Space Grotesk + Olive），避免 SaaS 模板感
[依据：DESIGN.md + 定价页 + `pricing-calibration-v3.md`]

---

## 4. ICP（理想用户）

### 4.1 用户分类

| 用户群 | 画像 | 主要痛点 | 付费意愿 |
|---|---|---|---|
| A | 自由职业者 / 小企业主 | 经常处理合同、发票、报告 | 高（反感订阅） |
| B | 远程办公 / 行政人员 | 需要安全合并、签名文件 | 中 |
| C | 学生 / 教师 | 删除课件页面、压缩作业 | 低（价格敏感） |

### 4.2 主 ICP
**用户群 A：自由职业者与小企业主**
理由：PDF 处理需求高频且紧急；反感长期订阅，但接受低月费或一次性买断；$19/month 起步价与 $59 买断选项可同时满足此类用户；不想安装大型软件。
[依据：定价模式 + 工具属性]

---

## 5. 5 工具套件边界

### 5.1 工具清单

| 工具 | 路由 | 免费/付费 | 核心价值 |
|---|---|---|---|
| Remove Pages | `/remove-pages` | 免费 | 快速删除不需要的 PDF 页面 |
| Merge PDF | `/merge` | 免费 | 将多个 PDF 按指定顺序合并 |
| Compress PDF | `/compress` | 免费 | 减小文件体积，保持可接受质量 |
| Sign PDF | `/sign` | 免费 | 添加手绘签名，下载已签名 PDF |
| Convert PDF to Word | `/convert-to-word` | 付费（含免费试用额度） | 将 PDF 转为可编辑 Word 文档 |

[依据：`project-control.md` + design handoff + 页面免费/ paid badge]

### 5.2 付费层（Full Editor）
- **价格**：主推订阅制：月度 $19 Launch Special（原价 $29/month），年度 $99/year（原价 $149/year，约 57% off / save $129）；隐藏一次性买断 $59 One-time License（标准价 $79）
- **购买方式**：通过 Creem 订阅（月/年）或一次性买断；买断 license 主要用于当前主版本 RemovePDFPages Full Editor v1.x
- **支付与税务**：通过 Creem（Merchant of Record）处理收款；Creem 根据买家账单地址自动计算并汇缴适用的销售税/VAT/GST；商家（我们）负责产品交付、客服与退款请求
- **解锁功能**：Convert PDF to Word 与高级编辑占位功能
- **包含额度**：Convert to Word 10 次/月（订阅与买断均包含）
- **超出额度**：按量 Top-up，$0.50/次 或 $5/10 次；通过 credits 购买实现
- **设备限制**：最多 5 台个人设备；license key 激活时记录设备指纹
- **退款政策**：14 天无理由退款；每退一单损失 Creem 手续费（3.9% + $0.40），其中处理费不退还。未使用 credits 14 天内可退，已使用不可退；Creem 从给我们的 Payout 中扣除退款金额
- **Launch Special 边界**：`Limited time. May end without notice.`暂不公开截止日期或数量限制
- **CTA 统一**：首页 `/` 是工具入口页，不是付费转化入口；其首屏 Primary CTA 必须指向免费工具入口。博客 `/blog/*`、`/convert-to-word`、`/pricing`、`/checkout` 主推文案统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`；`$29` 仅作为月度原价锚点，`$149` 仅作为年度原价锚点。
- **转化路径**：首页 `/` 让用户发现并进入免费工具入口（如 `/remove-pages`、`/merge`、`/compress`、`/sign` 及含免费试用的 `/convert-to-word`）；免费工具入口引导用户使用 `Convert to Word` → 3 次免费试用 → 触发 Paywall → 订阅/买断 Full Editor → 获得 10 次/月额度 → 高用量触发 Top-up。

[依据：`docs/pricing-calibration-v3.md` + `docs/compliance-report.md` v2]

### 5.3 NOT-DO（详见 `docs/MVP-NOT-DO.md`）
- 不做 5 工具之外的 PDF 功能（OCR、转 Excel/PPT/JPG、拆分、旋转、填写表单等）
- 不做用户账户系统；授权以 license key + device_id 形式
- 不做云存储 / 历史文件 / 文件分享
- 订阅 / 月费模式已作为主推商业模式（月 $19/年 $99），一次性买断 $59 作为隐藏选项；Top-up credits 为按量一次性购买，不属于订阅
- 不做移动端原生 App
- 不做服务器端水印
- 不做证书级电子签名（仅手绘图片签名）

---

## 6. 用户任务（Jobs-to-be-Done）

### 6.1 Remove Pages
- **触发：**用户有一个 PDF，其中几页不需要。
- **步骤：** 上传 PDF → 缩略图预览 → 选择并删除不需要的页 → 点击 Remove → 下载剩余 PDF。
- **成功标准：** 下载的文件正常打开，已删除页不存在，且无水印。

### 6.2 Merge PDF
- **触发：** 用户有多个 PDF，希望合并成一个文件。
- **步骤：** 上传多个 PDF → 拖拽调整顺序 → 点击 Merge → 下载合并后的 PDF。
- **成功标准：** 文件顺序与用户设置一致，合并后的 PDF 正常打开。

### 6.3 Compress PDF
- **触发：** PDF 文件过大，无法发送或上传。
- **步骤：** 上传 PDF → 选择压缩级别（推荐/最大） → 点击 Compress → 下载压缩后的 PDF。
- **成功标准：** 文件体积显著减小，视觉质量仍可接受。

### 6.4 Sign PDF
- **触发：** 用户需要在 PDF 上签字后回传。
- **步骤：** 上传 PDF → 在画布上绘制签名 → 应用签名 → 下载已签名 PDF。
- **成功标准：** 签名出现在 PDF 上，文档可正常打开。

### 6.5 Convert PDF to Word
- **触发：** 用户需要编辑 PDF 内容，希望在 Word 中继续编辑。
- **步骤：**
  1. 上传 PDF → 选择 DOCX / RTF
  2. 后端检查 `device_id` 免费试用额度：
     - 若 30 天内已使用 < 3 次：允许免费转换，页面显示 `You have X free conversions left this 30-day period.`
     - 若免费额度已用完且未订阅/购买 Full Editor：展示 `$19/month Launch Special` / `$99/year` / `$59 one-time license` Paywall，CTA 指向 `/pricing`
  3. 若已订阅/购买 Full Editor：检查本月已用转换次数
     - 若本月已用 < 10 次：正常转换，页面显示本月剩余额度
     - 若本月已用 ≥ 10 次：展示 Top-up CTA（`Buy 10 more conversions for $5` 或 `$0.50 each`）
  4. 用户点击 Convert → 后端处理 → 下载 Word 文档
- **成功标准：** Word 文档可编辑，格式尽量保留。
- **CTA 统一：** 本页所有购买入口（Paywall、按钮、横幅）必须统一使用 `$19/month Launch Special` / `$99/year` / `$59 one-time license` 口径，与博客、定价页一致；首页 `/` 是工具入口页，其首屏 Primary CTA 必须指向免费工具入口。额度用完后统一使用 Top-up 价格 `$5/10 conversions` 或 `$0.50 each`。
- **Top-up 购买流程**：用户在 `/convert-to-word` 点击 Top-up → 调用 `/api/credits/purchase` 创建 Creem Checkout 会话 → 完成支付 → Creem webhook `checkout.completed` 触发 credits 到账 → 继续转换

---

## 7. Route Contract 摘要

完整路由合约见 `docs/route-contract.json`。
- 与 `design-handoff-extract/route-mapping.json` 的 11 个路由一一对应：`/` / `/remove-pages` / `/merge` / `/compress` / `/sign` / `/convert-to-word` / `/pricing` / `/faq` / `/contact` / `/checkout` / `/success`。
- 额外恢复 `/privacy` / `/terms` / `/refund`。
- `/workspace` 不在 design handoff 中，标记为废弃，应从 sitemap 删除或 301 到 `/`。
[依据：`route-mapping.json` + `project-control.md` + `public/sitemap.xml`]

---

## 8. Page Matrix 摘要

每个 indexable 页面的主词、H1、title、meta description、CTA、schema 见 `docs/page-matrix.md`。
[依据：当前 `app/` 页面 metadata + DESIGN.md 文案]

### 8.1 CTA 与价格口径统一（新增）
- 付费转化入口（`/blog/*`、`/convert-to-word`、`/pricing`、`/checkout`）主推文案统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`。
- 首页 `/` 首屏 Primary CTA 必须指向免费工具入口（例如 `/remove-pages`、`/merge`、`/compress`、`/sign` 或页面内工具锚点），不是付费转化入口。`$19 Launch Special` 只能出现在首页底部转化区、`/pricing`、`/checkout` 或 `/convert-to-word` Paywall 中。
- `/pricing` 页面主卡片区为 Free / Monthly $19 / Yearly $99；`$29` 仅作为月度 strikethrough 原价锚点，`$149` 仅作为年度 strikethrough 原价锚点；在页面下方以次级文案提供 `$59 one-time license` 选项。
- `/checkout` 默认选项为 Monthly $19 Launch Special，保留 Yearly $99 选项，并在 checkout 页面以第三选项或次级链接提供 One-time License $59。
- `/convert-to-word` 在免费额度用完后展示 `$19/month Launch Special` / `$99/year` / `$59 one-time license` Paywall，CTA 指向 `/pricing`；已购买/订阅用户额度用完后展示 Top-up CTA `$5/10 conversions` 或 `$0.50 each`。
- 博客文章中的价格提法必须与 `/pricing` 一致，禁止同时出现 `$19 one-time` 与 `$19/month` 两种默认口径。
- 所有文案避免 `unlimited`、`free forever`、`no limits`；免费工具使用 `currently free` + `fair-use limits`。

---

## 9. Data Contract 摘要

前端需要的后端能力、文件处理边界、API 端点、授权与支付事件见 `docs/data-contract.md`。
核心结论：
- 免费 4 工具默认纯客户端处理，文件不上传服务器。
- Convert to Word 必须后端处理；用户上传的 PDF 会被临时传输到服务器，处理完成后 1 小时内自动删除（TTL 1 小时）。
- 若免费工具客户端处理失败（如文件过大、格式复杂），可触发后端 fallback，同样适用 TTL 1 小时。
- 后端处理场景与当前 UI “No upload” 声明存在冲突，工具页面必须在触发后端 fallback 时明确告知用户。
- 文件处理边界：单文件 ≤50MB，≤200 页；每小时同 IP 10–20 次免费处理；Merge ≤10 文件。

### 9.1 新增 API 与配额机制（基于 pricing-calibration-v3）
- **`/api/convert`**：Convert to Word 后端处理端点
  - 请求前校验 `device_id` 、license key 状态及 subscription 状态（月/年/过期）
  - 未购买/订阅用户：检查 30 天免费试用额度（3 次/30 天），额度内允许请求，额外返回 `402 LICENSE_REQUIRED` 并触发 Paywall
  - 已订阅/已买断用户：检查本月已用转换次数（10 次/月），额度内正常处理，额外返回 `403 QUOTA_EXCEEDED` 并触发 Top-up CTA
  - 每次转换消耗 1 次额度；成功与失败分别定义错误码
- **`/api/subscription/purchase` / Creem checkout**：创建订阅或买断订单
  - 月度 / 年度 / 买断三个 plan，通过 Creem Checkout 创建订单
  - 支付成功后通过 Creem webhook `checkout.completed` / `subscription.created` 触发授权书写
- **`/api/credits/purchase`**：Top-up credits 购买端点
  - 创建 Creem Checkout 会话，销售单位为「10 conversions for $5」或「1 conversion for $0.50」
  - 支付成功后通过 Creem webhook `checkout.completed` 触发 credits 写入 license key 或 device_id 配额记录
  - 未使用 credits 退款政策已确认：14 天内未使用可退，已使用不可退，处理费不退还；Creem 从 Payout 中扣除退款金额
- **`device_id` / `license_key` / `subscription_id` 维护**
  - 在浏览器端生成并持久化 `device_id`（fingerprint + IP hash 复合）
  - 后端使用 KV（Cloudflare Workers KV / Upstash Redis）维护 `device_id / license_key → 本月已用次数/剩余 credits / subscription 状态及过期日期`
  - 免费额度与购买额度分开计算：免费 3 次/30 天不影响订阅/买断后的 10 次/月
  - 同一设备/IP 换浏览器或清除缓存可能被视为新 `device_id`，存在被刷风险；需配合 rate limit 与异常监控
- **配额状态端点**
  - 前端需获取当前 `device_id` 的免费试用剩余次数、已购 license / 订阅的月度剩余次数、当前 credits 余额
  - 建议新增 `/api/quota` 或合并到 `/api/convert` 的预检响应中
- **订阅续订/取消 webhook**
  - 需处理 Creem `subscription.renewed`、`subscription.cancelled`、`subscription.expired` 事件，更新 KV 中订阅状态

[依据：`docs/data-contract.md` + `docs/pricing-calibration-v3.md` + `docs/compliance-report.md`]

### 9.2 支付事件与授权实现要点
- 订阅订单和买断订单均通过 Creem `checkout.completed` 确认
- 订阅需额外处理 `subscription.created` / `subscription.renewed` / `subscription.cancelled` / `subscription.expired`
- 建议为每个 license / 订阅维护独立记录，并在必要时发送授权邮件（由 Resend/Postmark 处理）

---

## 10. MVP-NOT-DO 摘要

什么做、什么不做见 `docs/MVP-NOT-DO.md`。

### 10.1 上线前必须完成（MVP）
- 5 个工具页面可用
- 支付流程（月度/年度订阅结账、买断订单、Top-up credits 结账、成功页、license key / subscription 邮件）
- `/contact` + `/faq`
- `/privacy` + `/terms` + `/refund`
- Header / Footer 链接活着
- sitemap 与 robots.txt 更新
- `/api/convert` 配额校验、`/api/subscription/purchase` / 订阅 webhook 、`/api/credits/purchase` 接口
- `device_id` 生成与 KV 订阅/配额维护

### 10.2 明确不做（NOT-DO）
- 非 5 工具的 PDF 功能
- 用户账户与云存储
- 订阅 / 月费模式已作为主推（月 $19/年 $99），买断 $59 作为隐藏选项；Top-up credits 为按量一次性购买，不属于订阅
- 证书级签名
- 移动原生 App

---

## 11. 定价与合规决策摘要

> 本节合并 `docs/pricing-calibration-v3.md` 与 04 合规（`docs/compliance-report.md`）结论，作为 05 Copy Freeze v3 与 07 前端实现的事实源。

### 11.1 套餐矩阵

| 维度 | Free | Monthly | Yearly | One-time License | 按量 Top-up |
|---|---|---|---|---|---|
| 价格 | $0 | $19/month Launch Special（原价 $29） | $99/year（原价 $149） | $59（标准价 $79） | $0.50/次 或 $5/10 次 |
| 购买方式 | 无需购买 | 月度订阅，随时取消 | 年度订阅 | 一次性买断 | 账户内购买 credits |
| Remove / Merge / Compress / Sign | ✅ 可用 | ✅ 可用 | ✅ 可用 | ✅ 可用 | — |
| Convert to Word | 3 次/30 天 免费试用 | 10 次/月 包含额度 | 10 次/月 包含额度 | 10 次/月 包含额度 | 超出额度后按量计费 |
| 文件大小/页数 | 50 MB / 200 页 | 50 MB / 200 页 | 50 MB / 200 页 | 50 MB / 200 页 | 50 MB / 200 页 |
| 设备 | 浏览器 | 最多 5 台个人设备 | 最多 5 台个人设备 | 最多 5 台个人设备 | 同授权设备 |
| 更新 | 免费工具更新 | 当前主版本 v1.x | 当前主版本 v1.x | 当前主版本 v1.x | — |
| 退款 | — | 14 天无理由退款 | 14 天无理由退款 | 14 天无理由退款 | 未使用 credits 14 天内可退；已使用不可退；处理费不退还 |

### 11.2 定价策略

| 项目 | 决策 | 依据 |
|---|---|---|
| 月度标准价 | $29/month | pricing-calibration-v3：在竞品月付模式中属中低价位，作为月度原价锚点 |
| 年度标准价 | $149/year | pricing-calibration-v3：作为年度原价锚点，对应 57% off |
| MVP 月度主推价 | $19/month Launch Special | pricing-calibration-v3：MVP 限时价，提升转化 |
| MVP 年度主推价 | $99/year（save $129） | pricing-calibration-v3：年付降低决策 friction，提高预付现金流 |
|| 买断隐藏价 | $59 One-time License（标准价 $79） | pricing-calibration-v3：捕获订阅反感者，避免 cannibalization |
|| 价格展示 | `/pricing` 主卡片区：Free / Monthly $19 / Yearly $99；$29 作为月度 strikethrough 原价，$149 作为年度 strikethrough 原价；在页面下方以次级文案提供 $59 one-time license | 避免 $29/$19 同功能并列的误导性折扣风险；同时保留买断选项 |
|| 入口 CTA 统一 | 博客 `/blog/*`、`/convert-to-word`、`/pricing`、`/checkout` 主推 `$19 Launch Special` / `$99/year` / `$59 one-time license`；首页 `/` 首屏 Primary CTA 指向免费工具入口，`$19 Launch Special` 仅允许出现在首页底部转化区 | 统一全站价格口径，Freemium 直接转化 |
| 价格结构 | 订阅制为主（月 $19/年 $99） + 隐藏买断 $59 + 按量 Top-up credits | pricing-calibration-v3 + 已更新的 NOT-DO |
| 免费试用额度 | Convert to Word 3 次/30 天 | pricing-calibration-v3：足够体验、不亏穿 |
| 包含额度 | Full Editor 含 10 次/月 Convert to Word | pricing-calibration-v3：覆盖大多数用户基础需求 |
| 超出额度 | $0.50/次 或 $5/10 次 | pricing-calibration-v3：覆盖后端成本 |

### 11.3 免费额度与处理架构

| 项目 | 决策 | 依据 |
|---|---|---|
| 单文件大小 | ≤ 50 MB | pricing-calibration-v3 限制建议 |
| 单文件页数 | ≤ 200 页 | pricing-calibration-v3 限制建议 |
| 每小时同 IP 请求 | 10–20 次免费处理 | 防止脚本滥用（无账户系统） |
| 免费 4 工具 | 默认纯客户端处理，文件不上传 | compliance-report 数据流声明 |
| Convert to Word / 后端 fallback | 临时上传服务器，处理完成后 1 小时内自动删除 | compliance-report + data-contract |
| 输出文件 TTL | 1 小时（后端处理场景） | 降低存储成本，与隐私声明一致 |
| Convert to Word 免费试用 | 3 次/30 天，基于 device_id（fingerprint + IP） | pricing-calibration-v3 |
| Full Editor 包含额度 | 10 次/月 | pricing-calibration-v3 |
| Top-up 计费 | $0.50/次 或 $5/10 次 | pricing-calibration-v3 |

### 11.4 退款、税务与授权

| 项目 | 决策 | 依据 |
|---|---|---|
| 退款政策 | 14 天无理由退款 | compliance-report + refund page |
| 订阅取消 | 随时取消；当前订阅期结束前仍可使用 | 商业模式 |
| 退款成本 | 每退一单损失 Creem 手续费（3.9% + $0.40）；处理费不退还 | Creem 费率 |
| credits 退款 | 未使用 credits 14 天内可退；已使用不可退；处理费不退还 | compliance-report v2 |
| 销售税/VAT/GST | 全球销售地址适用的销售税、VAT、GST 由 Creem 在结账时自动计算并汇缴 | compliance-report v2 |
| 销售范围 | 全球开放，美国首发；国际用户自行承担适用法律与税务义务 | pricing-calibration-v3 + compliance-report v2 |
| Lifetime / One-time License 边界 | 指当前主版本 RemovePDFPages Full Editor v1.x | compliance-report |
| 订阅过期 | 订阅到期后转换为未购买状态，仅保留 3 次/30 天免费额度 | pricing-calibration-v3 |
| 设备限制 | 最多 5 台个人设备；激活时记录设备指纹 | compliance-report |

### 11.5 分析工具与隐私披露

- 分析工具方案（待最终确认）：Plausible/GA4/Cloudflare Web Analytics（访问与来源）+ PostHog/Microsoft Clarity（用户行为漏斗/录屏/热力图）+ Google Search Console/Bing Webmaster Tools（SEO）+ Creem（业务与收入）。
- Privacy 页面已预留披露位置；最终选型落定后必须在 05 Copy Freeze 前同步更新 Privacy 与 Terms。
- 若使用 Google Analytics / PostHog / Microsoft Clarity 等含 Cookie/第三方数据处理的工具，需加入 Cookie 披露并考虑 Cookie 同意模态（尤其是 EU/UK/California 用户）。
- 若使用 Plausible/Cloudflare Web Analytics，可以“无 Cookie”为卖点简化披露，但仍需在 Privacy 中说明数据接收方。

### 11.6 前端实现要求

- `/pricing` 页面主卡片区为：Free / Monthly $19 Launch Special / Yearly $99；$29 作为月度 strikethrough 原价，$149 作为年度 strikethrough 原价；在页面下方以次级文案提供 $59 one-time license 选项。
- `/checkout` 默认选项为 Monthly $19 Launch Special，保留 Yearly $99 选项；在 checkout 页面以第三选项或次级链接提供 One-time License $59；新增 Top-up 入口或跳转至 `/convert-to-word`。
- 付费转化入口 CTA 统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`，避免与 checkout 默认价格冲突；首页 `/` 首屏 Primary CTA 必须指向免费工具入口，`$19 Launch Special` 仅允许出现在首页底部转化区。
- 免费工具页面文案避免 `unlimited`、`free forever`、`no limits`；使用 `currently free`。
- 工具页面保持 “Your file stays in your browser” 仅适用于默认客户端处理；后端 fallback 需明确告知用户。
- Footer 法律链接必须指向 `/privacy`、`/terms`、`/refund`（当前指向 `/contact`，需修正）。
- `/convert-to-word` 页面需展示：免费试用剩余次数、已订阅/已买断 license 的月度剩余次数、额度用完后的 Top-up CTA（$5/10 conversions 或 $0.50 each）。
- 后端需支持订阅状态校验（月/年/过期）、订阅续订/取消 webhook 处理。

### 11.7 风险与合规

| 风险等级 | 类型 | 位置 | 问题描述 | 修复建议 |
|---|---|---|---|---|
| 🔴 高 | 文案误导：$19 一次性 vs 订阅 | 全站 | 用户可能误认为 $19 仍是一次性买断 | 所有文案明确 `$19/month`、`billed monthly`、`cancel anytime` |
| 🔴 高 | 订阅流失 | 全局 | 月付用户流失后无持续收入 | 主推年费 $99，提高预付现金流 |
| 🔴 高 | 后端成本不可控 | 后端 Convert to Word | 若用户高频使用，10 次/月额度可能无法覆盖成本 | 严格按 Top-up 计费；上线后监控实际后端成本与使用频次 |
| 🔴 高 | 文案误导 | `/pricing` / `/convert-to-word` | 若未明确说明“10 次/月”限制，用户可能误解为买断后无限制 | 所有文案必须写明“10 conversions/month included”和“extra $0.50 each” |
| 🔴 高 | 免费试用滥用 | `/convert-to-word` | 无账户系统，脚本可换 IP 刷免费额度 | 使用 fingerprint + IP + rate limit；监控异常 device_id 的转换行为 |
| 🟡 中 | 价格欺诈 / 误导性折扣 | `/pricing` | $29 与 $19 同时作为独立卡片售卖 | 保持 `$29` 仅作为月度 strikethrough 原价，`$149` 仅作为年度 strikethrough 原价；`$19` 作为当前月度价，`$99` 作为当前年度价 |
| 🟡 中 | Cannibalization | `/pricing` | 买断 $59 低于 6 个月月费，可能吸引本可订阅的用户 | 买断作为隐藏选项，不在主 CTA 展示；价格锚定高于 3 个月月费 |
| 🟡 中 | 退款成本 | `/checkout` / Refund | 14 天无理由退款，每退一单损失 $0.40 + 3.9% Creem 手续费 | 在 FAQ / refund 页明确退款条件；统计退款率，>10% 时重审定价 |
| 🟡 中 | 销售税 / VAT / GST | Creem | 全球销售需收税 | 上线前确认 Creem 已开启；Terms 中披露 Creem 自动计算并汇缴 |
| 🟡 中 | Lifetime / One-time License 边界 | `/terms` | 买断用户可能期望永久无限制更新 | Terms 中明确 one-time license / lifetime 指当前主版本 v1.x |
| 🟡 中 | 设备限制执行 | `/checkout` | 最多 5 台设备，但无账户系统 | license key / subscription 激活记录设备指纹；超限需联系客服 |
| 🟡 中 | 订阅 webhook 缺失 | 后端 | 若未处理 `subscription.cancelled` / `subscription.expired`，用户订阅到期后仍能使用 | 实现订阅续订/取消/过期 webhook 并定期校验 KV 状态 |
| 🟢 低 | 邮件送达 | `/success` | license key / subscription 邮件可能进垃圾邮件 | 使用 Resend/Postmark；支持页面提供重发 |
| 🟢 低 | 分析工具隐私披露 | 全站 | 若启用 Google Analytics 需 Cookie 披露 | 选型后更新 Privacy |

### 11.8 待确认项

- 分析工具最终选型（已给出待落定方案，需在 05 Copy Freeze 前完成最终确认） [待确认]
- 目标销售地理范围（全球开放已确认，但需在 Terms 中落地） [待确认]
- 最终后端方案（Workers + WASM / 第三方 API / 自托管）及真实单次成本 [待确认]
- 用户实际平均生命周期、月转化率、平均使用频次 [待确认]
- Creem 订阅产品配置（月度/年度/买断 plan）与 webhook 测试（`checkout.completed`、`subscription.created`、`subscription.renewed`、`subscription.cancelled`、`subscription.expired`） [待确认]
- 订阅到期后的账号与额度体验策略 [待最终确认：pricing-calibration-v3 建议到期后转为未购买状态，仅保留 3 次/30 天免费额度]

---

## 12. 合规与发布前确认项

涉及公开发布、支付、真实用户数据前，必须完成：
1. Creem 商户账户配置，尤其是订阅 plan / 买断 plan / 订阅相关 webhook [已确认：webhook 测试仍待完成]
2. 隐私政策 / 服务条款 / 退款政策内容定稿 [已确认：`app/privacy/page.tsx`、`app/terms/page.tsx`、`app/refund/page.tsx` 已生成；需根据 pricing-calibration-v3 更新订阅/买断/额度/Top-up 披露；compliance-report v2 已给出修改要求]
3. 数据留存与文件 TTL 政策（免费 4 工具客户端处理；Convert to Word / 后端 fallback 临时上传 ≤ 1 小时） [已确认]
4. Cookie / 分析工具披露 [待确认：分析工具选型未定]
5. 销售税/VAT/GST：Creem 作为 MOR 自动处理 [已确认：需确认 Creem 已开启并正确配置]
6. 文件处理安全审计（类型、大小、沙箱） [待确认：后端实现阶段验证]
7. 目标销售地理范围（全球开放，美国首发） [已确认：需在 Terms 中落地]
8. Convert to Word 免费试用额度与 Full Editor 包含额度的技术实现 [待确认]
9. Top-up credits 购买与退款政策 [已确认：compliance-report v2；需在 Terms / Refund 中落地]
10. Creem 支持的目标国家与产品类别 [待确认]
11. 订阅续订/取消/过期 webhook 与 KV 状态同步 [待确认]

---

## 13. 下游交接

### 下一阶段：05 Copy Freeze v3
- Owner：文案 agent
- 必需输入：本 PRD v3、`docs/pricing-calibration-v3.md`、`docs/page-matrix.md`、`docs/compliance-report.md` v2（含禁用词清单）
- 输出预期：SEO-Copy Freeze 文档 v3，覆盖所有 indexable 页面与博客文章
- 验收：所有文案符合禁用词清单；首页 `/` 首屏 Primary CTA 指向免费工具入口；`$19 Launch Special` 仅允许出现在首页底部转化区、其他付费转化入口；其他付费转化入口 CTA 统一为 `$19 Launch Special` / `$99/year` / `$59 one-time license`；免费工具文案使用 `currently free`；Convert to Word 额度/Top-up 文案与 PRD / pricing v3 一致

### 再下一阶段：07 前端实现 + 后端订阅/配额系统
- Owner：前端 / 后端开发
- 必需输入：本 PRD v3、`docs/pricing-calibration-v3.md`、design handoff v2、`docs/data-contract.md`、`docs/compliance-report.md` v2
- 输出预期：修复后的 `/pricing`（三列卡片：Free / Monthly / Yearly + 隐藏买断）、`/checkout`、工具页、`/convert-to-word` 额度展示与 Top-up CTA、`/api/convert` 配额校验、`/api/subscription/purchase` / 订阅 webhook、`/api/credits/purchase`、Footer 法律链接
- 验收：$29 仅作为月度 strikethrough 原价，$149 仅作为年度 strikethrough 原价；Footer `/privacy` `/terms` `/refund` 不 404；工具页处理逻辑与数据流一致；免费 3 次/30 天、包含 10 次/月、Top-up $5/10 次或 $0.50/次 均正确实现；订阅续订/取消/过期 webhook 正确处理

> 注：04 合规审查已完成（`docs/compliance-report.md` v2），本阶段结论已纳入 PRD v3、pricing-calibration-v3 与 data-contract.md 引用。

### 给下游的最小必要信息
- 不能假设 $19 Launch Special 是永久价；它是 MVP 限时首发价，文案为 `Limited time. May end without notice.`，未来可能切回 $29/month（月度）、$149/year（年度）
- 不能假设买断后 Convert to Word 无限制；必须明确 10 次/月，超出需 Top-up
- 不能假设 free 用户可以无限试用；必须限制 3 次/30 天
- 不能假设 Top-up credits 退款政策未定；已确认：未使用 14 天内可退，已使用不可退，处理费不退还；Creem 从 Payout 中扣除
- 不能假设 Convert to Word 可以纯客户端实现；必须按 TTL 1 小时的后端临时处理实现
- 不能假设分析工具已选型；Privacy 必须按最终选型更新
- 不能假设 Creem 已配置；需确认 Creem MOR、订阅 plan / 买断 plan / 销售税自动处理、目标国家/产品类别是否支持
- 不能假设所有工具页面的处理逻辑已实现；当前为静态外壳
- 不能假设国际销售法律义务已在 Terms 中落地；合规阶段已给出修改要求
- 不能假设订阅到期后用户自动买断；必须在 Terms 中明确订阅到期后的使用权限：pricing-calibration-v3 建议到期后转为未购买状态，仅保留 3 次/30 天免费额度

---

## 14. 验收清单

- [x] 5 个工具的用户任务清晰
- [x] 每个 indexable 页面有价值
- [x] NOT-DO 明确（已更新为订阅为主 + 隐藏买断）
- [x] Route Contract 与 design handoff 一致
- [x] 待确认项已列出，未擅自跳过
- [x] 博客内容矩阵已纳入 PRD、page-matrix、MVP-NOT-DO
- [x] 定价与商业模式已更新为 pricing-calibration-v3（订阅制为主：月 $19/年 $99，隐藏买断 $59）
- [x] Convert to Word 免费试用、包含额度、Top-up 流程已写入用户任务与 Data Contract
- [x] 价格、额度、CTA 与 `pricing-calibration-v3.md` 一致
- [x] 后端需支持订阅状态校验、订阅续订/取消/过期 webhook 已明确

---

## 15. 博客内容策略

### 15.1 目标
通过优质长尾/商业调查型内容，触达对订阅敏感、寻找低月费或一次性付费 PDF 工具的用户，并为工具页引流、建立域名权威。

### 15.2 主题矩阵

| 路由 | 目标主词 | 标题 | 搜索量 | CPC | 搜索意图 | 备注 |
|---|---|---|---|---|---|---|---|
| `/blog/foxit-alternative` | Foxit alternative | 6 Best Foxit Alternatives in 2026 (Free & Budget-Friendly) | 810 | $1.82 | Commercial Investigation | SEMRUSH，DataForSEO 低估，以 SEMRUSH 为准 |
| `/blog/replace-image-in-pdf` | replace image in PDF | How to Replace an Image in a PDF Without Adobe Acrobat | 280 | $1.31 | Informational / Tutorial | SEMRUSH，DataForSEO 低估，以 SEMRUSH 为准 |
| `/blog/one-time-payment-pdf-editor` | one-time payment pdf editor | Best One-Time Payment PDF Editors: Buy Once, Own Forever | 80 | $2.95 | Commercial Investigation | SEMRUSH，DataForSEO 低估，以 SEMRUSH 为准 |
| `/blog/no-subscription-pdf-editor` | no subscription pdf editor | No-Subscription PDF Editors: Free, Budget, & One-Time-Pay Options | 70 | $2.95 | Commercial Investigation | SEMRUSH，DataForSEO 低估，以 SEMRUSH 为准 |
| `/blog` | — | RemovePDFPages Blog | — | — | Navigation / Collection | 博客索引页，列出 4 篇文章 |

### 15.3 与工具页的关联
每篇 blog 文章必须包含至少一个回到对应工具页的 CTA：
- Foxit alternative / one-time payment / no subscription 文章 → 引导至 `/pricing`
- replace image in PDF 文章 → 引导至 `/remove-pages` 或 `/convert-to-word`
- reduce PDF size 教程 → 引导至 `/compress`

### 15.4 待确认
- 博客稿件是静态还是 CMS（MVP 建议静态页面）[NEEDS_DECISION]
- 文章上线时间表与负责人 [NEEDS_OWNER]
- 是否开启评论区或评分（MVP 建议不做，避免用户数据波及）

*本 PRD v3 已合并 `docs/pricing-calibration-v3.md`，形成待合规审查与 Copy Freeze v3 的产品定义；分析工具、税务配置、销售范围、credits 退款政策、订阅 webhook 确认后进入 v3 Freeze。*

[DONE] 定价与商业模式已按 `docs/pricing-calibration-v3.md` 更新；竞品价格已由用户提供 2026-07-29 快照覆盖；$59 One-time License 隐藏方案已由用户 2026-07-29 确认（选项 A）。

---

## 12. 决策变量（变更时只改这里）

|变量 | 当前值 | 影响文档 | 最后变更 |
|---|---|---|---|---|
| `pricing_model` | `subscription + hidden_lifetime` | pricing, copy-freeze, PRD, design, backend | 2026-07-29 |
| `launch_price_monthly` | `$19/month` | copy-freeze, pricing page, checkout, CTA | 2026-07-29 |
| `anchor_price_monthly` | `$29/month` | pricing page, checkout | 2026-07-29 |
| `launch_price_yearly` | `$99/year` | copy-freeze, pricing page, checkout, CTA | 2026-07-29 |
| `anchor_price_yearly` | `$149/year` | pricing page, checkout | 2026-07-29 |
| `launch_price_onetime` | `$59` | pricing page, checkout, hidden CTA | 2026-07-29 |
| `anchor_price_onetime` | `$79` | pricing page, checkout | 2026-07-29 |
| `free_trial_mode` | `freemium_direct` | copy-freeze, PRD, backend | 2026-07-29 |
| `convert_word_free_quota` | `3/30 days` | PRD, copy-freeze, backend | 2026-07-29 |
| `convert_word_paid_quota` | `10/month` | PRD, copy-freeze, backend | 2026-07-29 |
| `topup_credits` | `$5/10 conversions` | PRD, copy-freeze, backend, checkout | 2026-07-29 |
| `refund_window` | `14 days` | compliance, terms, refund page | 2026-07-29 |
| `payment_provider` | `Creem` | PRD, compliance, backend, checkout | 2026-07-29 |
| `tax_strategy` | `Creem Tax` | compliance, backend, checkout | 2026-07-29 |
| `device_limit` | `5 devices` | PRD, terms, backend | 2026-07-29 |
| `free_tool_limits` | `50 MB / 200 pages / 10-20 per hour per IP` | PRD, copy-freeze, backend | 2026-07-29 |

**变更流程：**
1. 修改本表。
2. 标注所有受影响文档。
3. 回退到最早受影响阶段，重新走闸。
4. 禁止 scattered patch（不在 PRD 以外的任何文档直接改变商业模式或定价）。
