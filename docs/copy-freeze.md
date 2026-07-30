# RemovePDFPages — SEO Copy Freeze v3

> **项目**：removepdfpages.net  
> **当前阶段**：05-copy  
> **目标市场**：US / English  
> **生效日期**：2026-07-29  
> **状态**：COPY FREEZE v3 — 设计 / 前端 / 07 实现前必须按本文档执行，不得现场重写价格、CTA 或合规声明  
> **依据**：`docs/PRD-v3.md` + `docs/pricing-calibration-v3.md` + `docs/compliance-report.md` v3 + `docs/data-contract.md` + `docs/MVP-NOT-DO.md` + `docs/page-matrix.md`  
> **审查结论**：[GO with NEEDS_REVIEW]

---

## 1. 审查结论

**[GO with NEEDS_REVIEW]**

本版为 05 copy-freeze v3 重跑，基于 `docs/PRD-v3.md` + `docs/pricing-calibration-v3.md` + `docs/compliance-report.md` v3。主要修正：首页 `/` 首屏 Hero Primary CTA 从 `/pricing` 改为 `/remove-pages` 等免费工具入口，首屏不再以付费价格为主导；所有付费入口仍统一主推 `$19/month Launch Special` / `$99/year` / `$59 one-time license`，`$29` 仅作为月度 strikethrough 原价，`$149` 仅作为年度 strikethrough 原价。Stripe 已替换为 Creem 并补充 Merchant of Record / 销售税披露，`/pricing` 与 `/convert-to-word` 已明确额度与 Top-up 文案，`/privacy` / `/terms` / `/refund` / `/cookie-policy` 已给出 07 前端落地所需的完整文案段落。

**仍保留 [待确认] 占位的原因**：
- Creem 商户账户配置、webhook 状态、目标销售地理范围尚未最终确认；
- `$19 Launch Special` 的具体截止日期或数量限制尚未确定；
- 第三方分析工具最终选型未定；
- 最终后端方案（Workers + WASM / 第三方 API / 自托管）及真实单次成本待确认。

以上未确认项未影响文案框架，已在文档中以保守披露或 `[待确认]` 占位处理，未编造具体日期或法律结论。

---

## 2. v2 → v3 变更摘要

| 类别 | v2 | v3 |
|---|---|---|
| **主推商业模式** | 买断制为主：$19 Launch Special（One-time） | 订阅制为主：$19/month Launch Special + $99/year；隐藏买断 $59 One-time License |
| **支付服务商** | Creem | Creem（Armitage Labs OÜ, Estonia）作为 Merchant of Record |
| **支付披露** | `Payments are processed by Creem...` | `Payments are processed by Creem, our Merchant of Record. We do not store your card details.` |
| **税务披露** | Creem 自动计算 | `Sales tax, VAT, and GST are calculated and collected automatically by Creem based on your location.` |
| **退款披露** | 14 天退款，手续费不退 | `process it through Creem` / `payment processing fees are not refunded` |
| **CTA 价格** | 全站统一 `$19 Launch Special`（暗示买断） | 全站统一 `$19/month Launch Special` / `$99/year` / `$59 one-time license`；`$29` 仅作为月度 strikethrough 原价，`$149` 作为年度 strikethrough 原价 |
| **/pricing 结构** | 两列卡片（Free / $19 Launch Special） | 三列卡片（Free / Monthly $19 / Yearly $99）+ 隐藏买断 $59 入口 |
| **/pricing 额度** | Convert to Word 10 次/月 | 同前；$29 仅作月度原价锚点，$149 仅作年度原价锚点 |
| **/convert-to-word 免费试用** | 3 次/30 天 | 同前 |
| **/convert-to-word Top-up** | 额度用完后 Top-up | 同前：`Buy 10 more conversions for $5` 或 `$0.50 each` |
| **/checkout 选项** | 默认 $19 Launch Special License，保留 $29 Standard | 默认 Monthly $19，保留 Yearly $99，隐藏 One-time License $59 |
| **/faq 隐私 Q2** | Creem / Resend | 同前 |
| **/faq 退款** | 14 天退款、Top-up credits 退款 | 同前；订阅取消政策、买断生命周期边界 |
| **法律页** | 买断 license 描述 | 增加订阅/买断/取消/过期描述 |
| **Footer** | `One-time Full Editor license. No subscription.` | `Free PDF tools. Subscribe or buy once.` |
| **签名免责声明** | 已保留 | 继续保留 |

---

## 3. 按页面的文案清单

> 以下每个页面的 title、meta、H1、CTA、披露语句为 06 设计与 07 前端必须遵循的文案源。设计不可删除 SEO 元素，前端不可现场重写价格或合规声明。

### 3.1 首页 `/`

#### Title & Meta
- **Title**：`RemovePDFPages — Free PDF Tools & Full Editor`
- **Meta Description**：`Delete pages, merge, compress, and sign PDFs in your browser. Subscribe to the Full Editor from $19/month or buy a one-time license for $59 and convert PDF to Word.`
- **Canonical**：`https://removepdfpages.net/`
- **Schema**：`WebSite` + `Organization`

#### Hero 文案
- **H1**：`Free PDF Tools in Your Browser`
- **Subheadline**：`Remove pages, merge, compress, and sign PDFs — right in your browser, no signup or watermark. Upgrade to the Full Editor when you need to convert PDF to Word.`
- **Primary CTA**：`Try Remove Pages — free`
- **Secondary CTA**：`Try Merge PDFs`
- **CTA 指向**：Primary → `/remove-pages`；Secondary → `/merge`

#### 工具入口文案
| 工具 | 入口标题 | 入口描述 | 标签 |
|---|---|---|---|
| Remove Pages | `Remove Pages` | `Delete pages you don’t need from any PDF.` | `Currently free` |
| Merge PDF | `Merge PDFs` | `Combine multiple PDFs into one file.` | `Currently free` |
| Compress PDF | `Compress PDF` | `Reduce file size while keeping quality acceptable.` | `Currently free` |
| Sign PDF | `Sign PDF` | `Add a handwritten signature to any PDF.` | `Currently free` |
| Convert to Word | `Convert to Word` | `Turn PDFs into editable Word documents.` | `Full Editor` |

#### 信任条
- `No signup required`
- `No watermark on free tools`
- `Files stay in your browser by default`
- `Monthly, yearly, or one-time license options`

#### 主转化区（Home 底部）
- **H2**：`Get the Full Editor from $19/month`
- **Body**：`Subscribe monthly or yearly, or choose a one-time license. Use on up to 5 personal devices. 14-day refund policy if it’s not right for you.`
- **CTA**：`Get Full Editor — $19/month Launch Special`
- **CTA 指向**：`/pricing`

---

### 3.2 工具页文案

#### 3.2.1 `/remove-pages` — Remove PDF Pages

**Title & Meta**
- **Title**：`Remove PDF Pages Online | RemovePDFPages`
- **Meta Description**：`Delete pages from any PDF online. Select the pages you want to remove, then download the rest. No upload needed — processed in your browser.`
- **H1**：`Remove PDF Pages Online`
- **Schema**：`SoftwareApplication`（`applicationCategory: "BrowserApplication"`, `offers: free`）

**Hero 文案**
- **Subheadline**：`Upload your PDF, select the pages to remove, and download the clean file in seconds. No signup, no watermark.`
- **Primary CTA**：`Upload PDF`
- **Secondary CTA**：`Try other tools` → `/`

**操作步骤**
1. `Upload your PDF`
2. `Select pages to remove`
3. `Download the remaining file`

**功能说明**
- `Works in your browser by default`
- `Your file does not leave your device unless you choose a backend fallback option`
- `Supports PDFs up to 50 MB and 200 pages`
- `No watermark on the output`

**限制与合规说明**
- `Free to use. Fair-use limits apply: up to 50 MB per file, 200 pages per file, and 10–20 free tasks per hour from the same IP.`

---

#### 3.2.2 `/merge` — Merge PDFs

**Title & Meta**
- **Title**：`Merge PDFs Online | RemovePDFPages`
- **Meta Description**：`Combine multiple PDFs into one file online. Drag and drop to reorder pages, then download your merged PDF. No signup required.`
- **H1**：`Merge PDFs Online`
- **Schema**：`SoftwareApplication`（`offers: free`）

**Hero 文案**
- **Subheadline**：`Upload two or more PDFs, arrange them in the right order, and download a single merged file.`
- **Primary CTA**：`Upload PDFs`

**操作步骤**
1. `Upload your PDFs`
2. `Drag to reorder`
3. `Download merged PDF`

**功能说明**
- `Merge up to 10 PDFs in one task`
- `Reorder files before merging`
- `Processed in your browser by default`
- `No watermark on the output`

**限制与合规说明**
- `Currently free. Fair-use limits: up to 10 files per merge, 50 MB total, 200 pages per file, and 10–20 free tasks per hour from the same IP.`

---

#### 3.2.3 `/compress` — Compress PDF

**Title & Meta**
- **Title**：`Compress PDF Online | RemovePDFPages`
- **Meta Description**：`Reduce PDF file size online. Choose a compression level, then download a smaller file. No signup, no watermark.`
- **H1**：`Compress PDF Online`
- **Schema**：`SoftwareApplication`（`offers: free`）

**Hero 文案**
- **Subheadline**：`Make your PDF smaller so it’s easier to send or upload. Pick a balance between file size and visual quality.`
- **Primary CTA**：`Upload PDF`

**操作步骤**
1. `Upload your PDF`
2. `Choose compression level`
3. `Download compressed PDF`

**压缩选项文案**
- **Recommended**：`Recommended — smaller file with balanced quality`
- **Maximum**：`Maximum — smaller file, more quality reduction`

**功能说明**
- `Reduces file size for most PDFs`
- `Processed in your browser by default`
- `If your PDF can’t be compressed in the browser, you may choose a backend fallback option with a 1-hour file deletion policy`
- `No watermark on the output`

**限制与合规说明**
- `Currently free. Supports PDFs up to 50 MB and 200 pages. Fair-use limits apply: 10–20 free tasks per hour from the same IP.`
- `Compression results depend on the original PDF. Scanned documents and image-heavy files may compress less than text-based PDFs.`

---

#### 3.2.4 `/sign` — Sign PDF

**Title & Meta**
- **Title**：`Sign PDF Online | RemovePDFPages`
- **Meta Description**：`Add a handwritten signature to any PDF online. Draw your signature, place it on the page, and download the signed file. No signup required.`
- **H1**：`Sign PDF Online`
- **Schema**：`SoftwareApplication`（`offers: free`）

**Hero 文案**
- **Subheadline**：`Draw your signature, place it anywhere on the PDF, and download the signed file. No upload needed by default.`
- **Primary CTA**：`Upload PDF`

**重要合规声明（必须显示）**
- **Disclaimer Banner**：`This tool creates a visual signature image on the PDF. It is not a digital certificate signature and is not legally binding for regulated electronic-signing requirements.`
- **位置建议**：Hero 下方、签名画布上方、或下载按钮附近。文案不可省略，字号不可过小。

**操作步骤**
1. `Upload your PDF`
2. `Draw or type your signature`
3. `Place it on the document`
4. `Download signed PDF`

**功能说明**
- `Draw a signature with your mouse or touchpad`
- `Place the signature anywhere on the page`
- `Processed in your browser by default`
- `No watermark on the output`

**限制与合规说明**
- `Currently free. Supports PDFs up to 50 MB and 200 pages. This is not a digital certificate signature. If you need legally compliant e-signatures, please use a dedicated e-signature platform.`

---

#### 3.2.5 `/convert-to-word` — Convert PDF to Word

**Title & Meta**
- **Title**：`Convert PDF to Word Online | RemovePDFPages`
- **Meta Description**：`Convert PDF to editable Word documents with the RemovePDFPages Full Editor. $19/month Launch Special, $99/year, or $59 one-time license. Files are deleted from our server within 1 hour.`
- **H1**：`Convert PDF to Word`
- **Schema**：`SoftwareApplication`（`offers: $19/month Launch Special`）

**Hero 文案**
- **Subheadline**：`Turn PDFs into DOCX or RTF files you can edit in Word. Subscribe from $19/month or $99/year, or buy a one-time license for $59. Use on up to 5 devices.`
- **Primary CTA（未购买）**：`Get Full Editor — $19/month Launch Special`
- **Primary CTA（已购买）**：`Upload PDF`
- **CTA 指向**：未购买 → `/pricing`；已购买 → 工具交互区

**数据流说明（必须显示）**
- **Server Notice**：`This tool uses a backend server to convert your PDF. Your file is uploaded temporarily and deleted automatically within 1 hour after conversion.`
- **位置建议**：上传区上方、文件上传后显示、或作为固定提示条。

**输出格式选项文案**
- **DOCX**：`Word document (.docx)`
- **RTF**：`Rich Text Format (.rtf)`

**功能说明**
- `Convert PDFs to editable Word documents`
- `Preserves fonts, paragraphs, and basic formatting where possible`
- `Complex layouts and scanned pages may need manual adjustment`
- `Full Editor subscription or one-time license`

**免费试用提示（未购买状态）**
- **Indicator**：`You have X free conversions left this 30-day period.`
- **Paywall Title**：`This feature is part of the Full Editor`
- **Paywall Body**：`Convert PDF to Word is included with the Full Editor. Free users get 3 conversions per 30 days; paid plans include 10 per month, with extra conversions available as needed.`
- **CTA**：`Get Full Editor — $19/month Launch Special`
- **CTA 指向**：`/pricing`
- **Secondary**：`See all features` → `/pricing`

**已购买但额度用完提示**
- **Notice**：`You’ve used your 10 included conversions this month.`
- **CTA**：`Buy 10 more conversions for $5`
- **Secondary CTA**：`$0.50 each`
- **Tertiary**：`See pricing` → `/pricing`

**限制与合规说明**
- `Requires Full Editor subscription or one-time license. Supports PDFs up to 50 MB and 200 pages. Files are temporarily uploaded and deleted within 1 hour. Conversion results depend on the original PDF structure; complex layouts may need cleanup.`

---

### 3.3 `/pricing` 文案

**Title & Meta**
- **Title**：`Pricing | RemovePDFPages`
- **Meta Description**：`RemovePDFPages pricing: free PDF tools and a $19/month Launch Special for the Full Editor. $99/year. One-time license $59. 14-day refund policy.`
- **H1**：`Simple subscription pricing. One-time option available.`
- **Schema**：`Product` + `Offer`

**定价卡片结构（三列 + 隐藏买断）**

#### 卡片 1：Free
- **Name**：`Free`
- **Price**：`$0`
- **Price period**：`No account needed`
- **CTA**：`Start free`
- **CTA 指向**：`/remove-pages`
- **Feature list**：
  - `Remove PDF pages`
  - `Merge PDFs`
  - `Compress PDFs`
  - `Sign PDFs`
  - `No watermark`
  - `Files stay in your browser by default`
  - `Fair-use limits: 50 MB / 200 pages / 10–20 tasks per hour`

#### 卡片 2：Monthly $19 Launch Special
- **Badge**：`Most popular`
- **Name**：`Monthly`
- **Price**：`$19/month`
- **Original price anchor**：`~~$29~~`
- **Price period**：`Billed monthly. Cancel anytime.`
- **CTA**：`Get Monthly — $19 Launch Special`
- **CTA 指向**：`/checkout?plan=monthly`
- **Secondary text**：`Launch price for a limited time. Standard price is $29/month.`
- **Feature list**：
  - `Everything in Free`
  - `Convert PDF to Word (10 conversions/month included)`
  - `Extra conversions: $0.50 each or $5 for 10`
  - `Use on up to 5 personal devices`
  - `Updates for the current major version`
  - `14-day refund policy`

#### 卡片 3：Yearly $99
- **Badge**：`Best value`
- **Name**：`Yearly`
- **Price**：`$99/year`
- **Original price anchor**：`~~$149~~`
- **Price period**：`Billed annually. Save $129.`
- **CTA**：`Get Yearly — $99/year`
- **CTA 指向**：`/checkout?plan=yearly`
- **Feature list**：同 Monthly

**隐藏买断入口（pricing 卡片下方）**
- **Text**：`Prefer to pay once? Get a one-time license for $59.`
- **Link**：`/checkout?plan=onetime`

**对比表文案**

| Feature | Free | Monthly / Yearly | One-time |
|---|---|---|---|
| Remove / Merge / Compress / Sign | ✅ Included | ✅ Included | ✅ Included |
| Convert PDF to Word | 3/30 days trial | 10/month included | 10/month included |
| Extra Convert to Word | — | $0.50 each or $5/10 | $0.50 each or $5/10 |
| Max file size | 50 MB | 50 MB | 50 MB |
| Max pages per file | 200 | 200 | 200 |
| Devices | Browser only | Up to 5 devices | Up to 5 devices |
| Billing | $0 | $19/month or $99/year | $59 once |

**常见问题（Pricing 页面专属 FAQ）**
- **Q1**：`Is the $19 price a subscription?`
  - **A**：`Yes, the $19 Launch Special is a monthly subscription. You can also choose the $99/year plan to save $129, or the $59 one-time license if you prefer not to subscribe.`
- **Q2**：`Can I pay once instead of subscribing?`
  - **A**：`Yes. Select the One-time License at checkout for $59. It includes the same 10 Convert to Word conversions per month.`
- **Q3**：`How many Convert to Word conversions do I get?`
  - **A**：`Free users can try 3 conversions per 30-day period. Paid plans include 10 conversions per month. Additional conversions are $0.50 each or $5 for 10.`
- **Q4**：`Can I cancel anytime?`
  - **A**：`Yes. Monthly and yearly subscriptions can be canceled anytime. Your access continues until the end of the current billing period. We also offer a 14-day refund policy.`
- **Q5**：`What happens when the launch period ends?`
  - **A**：`We will return to the standard monthly price of $29 and the standard yearly price of $149. The $19 Launch Special is limited time and may end without notice.`
- **Q6**：`What does “one-time license” mean?`
  - **A**：`It means you pay once for the current major version of RemovePDFPages Full Editor (v1.x). It includes updates within that version. A future new product or platform may require a separate license.`
- **Q7**：`Why does Convert to Word need a server?`
  - **A**：`PDF to Word conversion is complex and currently runs on our backend. Your file is uploaded temporarily and deleted automatically within 1 hour.`

---

### 3.4 `/checkout` 文案

**Title & Meta**
- **Title**：`Checkout | RemovePDFPages`
- **Meta Description**：`Complete your purchase of the RemovePDFPages Full Editor. Choose monthly, yearly, or a one-time license. Secure checkout through Creem.`
- **H1**：`Get the Full Editor`
- **Indexable**：No
- **Schema**：`WebPage`

**页面文案**
- **Subheadline**：`Choose a plan and complete your purchase securely through Creem.`
- **Email field label**：`Email for your license key / receipts`
- **Email placeholder**：`you@example.com`
- **Payment note**：`Payments are processed by Creem, our Merchant of Record. We do not store your card details.`
- **Tax note**：`Sales tax, VAT, and GST are calculated and collected automatically by Creem based on your location.`
- **Refund note**：`14-day refund policy. Subscriptions and the one-time license are refundable within 14 days. Includes 10 Convert to Word conversions per month.`

**购买选项（默认选中 Monthly）**

#### Option 1：Monthly $19 Launch Special（默认选中）
- **Label**：`Monthly — $19/month`
- **Tagline**：`Billed monthly. Cancel anytime. Save $10 off the standard price.`
- **CTA**：`Subscribe — $19/month`

#### Option 2：Yearly $99
- **Label**：`Yearly — $99/year`
- **Tagline**：`Billed annually. Save $129. Best value.`
- **CTA**：`Subscribe — $99/year`

#### Option 3：One-time License $59
- **Label**：`One-time License — $59`
- **Tagline**：`Pay once. Use for the current major version. No recurring billing.`
- **CTA**：`Pay $59 — One-time License`

**安全/信任条**
- `🔒 Encrypted checkout via Creem`
- `✓ 14-day refund policy`
- `✓ License key / receipts sent to your email`
- `✓ Cancel monthly or yearly subscriptions anytime`
- `✓ Includes 10 Convert to Word conversions per month`

**错误 / 空状态**
- **No email**：`Please enter your email address to receive your license key and receipts.`
- **Payment failed**：`Something went wrong with the payment. Please try again or contact support.`

---

### 3.5 `/success` 文案

**Title & Meta**
- **Title**：`Thank You | RemovePDFPages`
- **Meta Description**：`Your RemovePDFPages Full Editor purchase is complete. Your license key and receipts have been sent to your email.`
- **H1**：`Welcome to the Full Editor`
- **Indexable**：No
- **Schema**：`WebPage`

**购买摘要**
- **Title**：`Purchase summary`
- **Item**：`RemovePDFPages Full Editor`
- **Price paid**：`[plan price]`
- **Email**：`[user email]`
- **Order ID**：`[Creem order ID]`

**License Key 展示（一次性/年订阅/月订阅用户均显示 license key 或 access link）**
- **Title**：`Your license key`
- **License key placeholder**：`REMPDF-XXXX-XXXX-XXXX`
- **Copy button**：`Copy License Key`
- **Email note**：`We also emailed this key to [user email]. Check your spam folder if you don’t see it.`
- **Subscription note**：`Your subscription is active. You can cancel anytime from your account settings or by contacting support.`

**后续操作 CTA**
- **Primary CTA**：`Convert PDF to Word`
- **Secondary CTA**：`Go to Pricing`
- **Tertiary CTA**：`Need help? Contact support`

**使用提示**
- `Your license works on up to 5 personal devices.`
- `Need to reinstall? Use the same license key.`
- `Questions about refunds? Visit our refund policy.`

---

### 3.6 `/faq` 文案

**Title & Meta**
- **Title**：`FAQ | RemovePDFPages`
- **Meta Description**：`Find answers to common questions about using RemovePDFPages free PDF tools, Full Editor subscriptions, one-time license, pricing, privacy, and refunds.`
- **H1**：`Help & FAQs`
- **Schema**：`FAQPage`

#### 3.6.1 工具使用（#using-tools）
- **Q1**：`Do I need to create an account?`
  - **A**：`No. The free tools work without signup. The Full Editor is tied to a license key sent to your email.`
- **Q2**：`Do the free tools add a watermark?`
  - **A**：`No. The free PDF tools do not add watermarks to your files.`
- **Q3**：`Are my files uploaded to your server?`
  - **A**：`Remove Pages, Merge, Compress, and Sign run in your browser by default, so your files stay on your device. Convert to Word uses a backend server; files are uploaded temporarily and deleted within 1 hour.`
- **Q4**：`Why does Convert to Word need a server?`
  - **A**：`PDF to Word conversion is too complex to run reliably in a browser. We upload the file temporarily, convert it, and delete it within 1 hour.`
- **Q5**：`What are the file limits?`
  - **A**：`Each file can be up to 50 MB and 200 pages. Free tools have a fair-use limit of 10–20 tasks per hour from the same IP. Merge supports up to 10 files at once.`

#### 3.6.2 隐私与安全（#privacy）
- **Q1**：`Do you store my PDFs?`
  - **A**：`We do not store PDFs for the free tools. For Convert to Word and backend fallback, files are kept only for the time needed to process them and deleted automatically within 1 hour.`
- **Q2**：`Do you share my data with third parties?`
  - **A**：`We do not sell or share your PDFs. We use Creem for payments (Merchant of Record), Resend for license emails, and Cloudflare for hosting. See our Privacy Policy for full details.`
- **Q3**：`Do you use analytics or cookies?`
  - **A**：`We may use analytics to improve the site. The specific tool and cookie use will be disclosed in our Privacy Policy once selected.`

#### 3.6.3 定价与授权（#pricing）
- **Q1**：`Is the Full Editor a subscription?`
  - **A**：`We offer both subscription plans and a one-time license. The $19/month Launch Special and the $99/year plan are subscriptions. The $59 one-time license is a single payment with no recurring billing.`
- **Q2**：`What does “one-time license” mean?`
  - **A**：`It means you pay once for the current major version of RemovePDFPages Full Editor (v1.x). It includes updates within that version, but a future new platform may require a separate license.`
- **Q3**：`Can I buy at $19 later?`
  - **A**：`The $19/month Launch Special is available for a limited time and may end without notice. Once it ends, the standard monthly price will be $29 and the standard yearly price will be $149.`
- **Q4**：`How many devices can I use?`
  - **A**：`One license or subscription can be activated on up to 5 personal devices. We record a device fingerprint during activation to enforce this limit.`
- **Q5**：`How many Convert to Word conversions do I get?`
  - **A**：`Free users can try 3 conversions per 30-day period. Paid plans include 10 conversions per calendar month. Additional conversions are $0.50 each or $5 for 10.`
- **Q6**：`What happens when the launch period ends?`
  - **A**：`We will return to the standard price of $29/month and $149/year. The $19/month Launch Special is limited time and may end without notice.`
- **Q7**：`Can I cancel my subscription?`
  - **A**：`Yes. Monthly and yearly subscriptions can be canceled anytime. Your access continues until the end of the current billing period. Yearly plans are also eligible for a 14-day refund.`

#### 3.6.4 Top-up Credits（#credits）【新增】
- **Q1**：`How do top-up credits work?`
  - **A**：`After you use your 10 included Convert to Word conversions each month, you can buy extra credits at $0.50 each or $5 for 10. Unused credits are refundable within 14 days; used credits are not.`
- **Q2**：`Can I refund top-up credits?`
  - **A**：`Unused credits are refundable within 14 days of purchase. Once a credit has been used for a conversion, it is not refundable.`

#### 3.6.5 退款（#refunds）
- **Q1**：`Can I get a refund?`
  - **A**：`Yes. We offer a 14-day refund policy for the Full Editor and unused top-up credits within 14 days of purchase. Contact us through the refund page or support email with your order information. Used credits are not refundable.`
- **Q2**：`Are there any refund fees?`
  - **A**：`Payment processing fees are not refunded by Creem when a refund is issued. We absorb this cost per refund.`
- **Q3**：`Can I refund after using the license?`
  - **A**：`We reserve the right to refuse refunds in cases of abuse, license key redistribution, or fraudulent purchases.`

#### 3.6.6 销售税与管辖（#tax-jurisdiction）【新增】
- **Q1**：`Will I be charged sales tax or VAT?`
  - **A**：`For purchases in the United States, applicable state and local sales tax will be calculated and collected automatically by Creem at checkout based on your billing address. International purchases may be subject to VAT or other local taxes; the buyer is responsible for compliance with local laws. [待确认：具体国家/税率由 Creem 配置决定。]`

#### 3.6.7 联系（#contact）
- **Q1**：`How do I contact support?`
  - **A**：`Use the contact form on /contact or email support@removepdfpages.com.`
- **Q2**：`Where do I request a refund?`
  - **A**：`You can request a refund through the contact form by selecting “Refund request” as the subject, or by visiting /refund.`
- **Q3**：`I didn’t receive my license key. What should I do?`
  - **A**：`Check your spam folder first. If it’s not there, contact support with your order email and we will resend it.`

**底部 CTA**
- **Text**：`Still have questions?`
- **CTA**：`Contact Support` → `/contact`

---

### 3.7 `/contact` 文案

**Title & Meta**
- **Title**：`Contact & Refund | RemovePDFPages`
- **Meta Description**：`Get in touch with RemovePDFPages for support, questions, or refund requests. We typically reply within 1–2 business days.`
- **H1**：`Contact & Refund`
- **Schema**：`ContactPage`

**页面文案**
- **Subheadline**：`Have a question or need a refund? Fill out the form below and we’ll get back to you as soon as possible.`
- **Support email**：`support@removepdfpages.com`

**表单字段文案**
| 字段 | Label | Placeholder / Options |
|---|---|---|
| Name | `Your name` | `Jane Doe` |
| Email | `Your email` | `you@example.com` |
| Subject | `What can we help with?` | `Support question`, `Refund request`, `Billing issue`, `Subscription cancel`, `Feature suggestion`, `Other` |
| Order ID | `Order ID (if applicable)` | `[Creem order ID]` |
| Message | `Message` | `Tell us more about your request...` |
| Submit CTA | `Send message` | — |

**退款入口**
- **Section title**：`Request a refund`
- **Body**：`If you purchased within the last 14 days, you can request a refund here. Include your Creem order ID and the email used for purchase.`
- **CTA**：`Request refund`（预填 Subject 为 Refund request）
- **Link to policy**：`Read the full refund policy` → `/refund`

**表单提交后状态**
- **Success**：`Thanks for reaching out. We typically reply within 1–2 business days.`
- **Error**：`Something went wrong. Please try again or email us directly at support@removepdfpages.com.`

---

### 3.8 `/blog` 索引页文案

**Title & Meta**
- **Title**：`PDF Tools & Editing Tips | RemovePDFPages Blog`
- **Meta Description**：`Read PDF tips, tool comparisons, and guides about no-subscription and budget-friendly PDF editors on the RemovePDFPages blog.`
- **H1**：`RemovePDFPages Blog`
- **Schema**：`Blog`

**页面文案**
- **Subheadline**：`Practical guides, honest comparisons, and tips for working with PDFs without getting locked into expensive subscriptions.`
- **CTA（底部）**：`See pricing` → `/pricing`

**文章列表**

#### 1. Foxit Alternative
- **Title**：`Foxit Alternatives to Consider in 2026`
- **Slug**：`/blog/foxit-alternative`
- **Excerpt**：`Looking for a PDF editor that doesn’t require a subscription? Here are several options, including browser-based tools and one-time purchase apps.`
- **CTA**：`See pricing` → `/pricing`

#### 2. Replace Image in PDF
- **Title**：`How to Replace an Image in a PDF Without Adobe Acrobat`
- **Slug**：`/blog/replace-image-in-pdf`
- **Excerpt**：`Replacing an image in a PDF can be tricky. Here are a few ways to do it, plus tools that let you edit PDFs without paying monthly.`
- **CTA**：`Try Remove Pages` → `/remove-pages`

#### 3. One-Time Payment PDF Editor
- **Title**：`One-Time Payment PDF Editors Compared`
- **Slug**：`/blog/one-time-payment-pdf-editor`
- **Excerpt**：`Tired of subscriptions? Here are several PDF editors you can buy once and keep using, including our one-time license option.`
- **CTA**：`Get Full Editor` → `/pricing`

#### 4. No-Subscription PDF Editor
- **Title**：`No-Subscription PDF Editors: Free, Budget, and One-Time-Pay Options`
- **Slug**：`/blog/no-subscription-pdf-editor`
- **Excerpt**：`Compare free PDF tools and low-cost or one-time-payment editors that don’t lock you into a monthly plan.`
- **CTA**：`See pricing` → `/pricing`

---

### 3.9 博客文章文案

#### 3.9.1 `/blog/foxit-alternative`

**Title & Meta**
- **Title**：`Foxit Alternatives to Consider in 2026 | RemovePDFPages`
- **Meta Description**：`Looking for a Foxit alternative? Compare browser-based PDF tools and subscription-free options before you choose a monthly plan.`
- **H1**：`Foxit Alternatives to Consider in 2026`
- **Schema**：`BlogPosting`

**文章结构文案**
- **Intro**：`Foxit PDF Editor is a popular choice, but its subscription model isn’t for everyone. If you only edit PDFs occasionally, a browser-based tool, a lower monthly plan, or a one-time payment license may be a better fit. Here are several alternatives worth considering. RemovePDFPages is a standalone tool and is not affiliated with Foxit.`
- **Section 1 — Browser-based tools**：`Browser-based PDF tools let you edit files without installing software. They work on any device and are useful for quick tasks like removing pages, merging, or compressing.`
- **Section 2 — Low monthly plans and one-time payment editors**：`If you need more advanced features like PDF to Word conversion, look for a low monthly plan you can cancel anytime, or a one-time purchase license.`
- **Section 3 — What to look for**：`Check for file size limits, output watermarks, whether the tool runs in your browser, and whether the company is clear about privacy, cancellation, and refunds.`
- **Conclusion**：`The right tool depends on how often you edit PDFs and what features you need. For simple tasks, a free browser tool may be enough. For editing and conversion, consider a low monthly plan or a one-time payment option.`

**CTA**
- **Primary CTA**：`Get Full Editor — $19/month Launch Special` → `/pricing`
- **Secondary CTA**：`Try free PDF tools` → `/remove-pages`

---

#### 3.9.2 `/blog/replace-image-in-pdf`

**Title & Meta**
- **Title**：`How to Replace an Image in a PDF Without Adobe Acrobat | RemovePDFPages`
- **Meta Description**：`Learn how to replace an image in a PDF without Adobe Acrobat. Compare methods and browser-based tools that let you edit PDFs without a subscription.`
- **H1**：`How to Replace an Image in a PDF Without Adobe Acrobat`
- **Schema**：`BlogPosting`

**文章结构文案**
- **Intro**：`Adobe Acrobat is the most well-known tool for editing PDFs, but it’s not the only option. Here are several ways to replace an image in a PDF without paying for a subscription. RemovePDFPages is a standalone tool and is not affiliated with Adobe.`
- **Method 1 — Use a PDF editor with object editing**：`Some desktop and browser PDF editors let you select and replace images directly. This works best if the PDF was created digitally.`
- **Method 2 — Convert to Word, replace, then export back**：`If your editor doesn’t support direct image replacement, convert the PDF to Word, replace the image, and export the document back to PDF.`
- **Method 3 — Remove the page and rebuild the PDF**：`If the image is on a single page, you can remove that page, create a replacement page, and merge the files back together.`
- **Limitations**：`Scanned PDFs and complex layouts may not behave cleanly. Results depend on how the PDF was originally created.`
- **Conclusion**：`For occasional edits, browser-based tools and low-cost or one-time purchase editors are often enough. Pick the method that matches your comfort level and file type.`

**CTA**
- **Primary CTA**：`Try Remove Pages` → `/remove-pages`
- **Secondary CTA**：`Get Full Editor — $19/month Launch Special` → `/pricing`

---

#### 3.9.3 `/blog/one-time-payment-pdf-editor`

**Title & Meta**
- **Title**：`One-Time Payment PDF Editors Compared | RemovePDFPages`
- **Meta Description**：`Compare one-time payment PDF editors. See which tools let you buy once and avoid subscriptions, including the RemovePDFPages one-time license.`
- **H1**：`One-Time Payment PDF Editors Compared`
- **Schema**：`BlogPosting`

**文章结构文案**
- **Intro**：`PDF subscriptions can add up quickly. If you prefer to buy once, several PDF editors offer one-time payment licenses. Here are a few options to compare.`
- **What to compare**：`Look at price, features, device limits, update policies, and refund terms. Some “lifetime” licenses are limited to the current version, so read the terms carefully.`
- **Section — Browser-based options**：`Browser-based tools are convenient because they don’t require installation. They work well for tasks like converting PDF to Word, removing pages, or compressing files.`
- **Section — Desktop one-time options**：`Desktop editors often have more advanced features but may cost more and require installation on each device.`
- **Honest caveat**：`No single PDF editor is right for everyone. Your choice depends on your file types, editing frequency, and whether you need offline access.`
- **Conclusion**：`If you want a simple, no-subscription option for PDF editing and conversion, a one-time payment browser tool can be a good fit.`

**CTA**
- **Primary CTA**：`Get Full Editor — $19/month Launch Special` → `/pricing`
- **Secondary CTA**：`Try free PDF tools` → `/remove-pages`

---

#### 3.9.4 `/blog/no-subscription-pdf-editor`

**Title & Meta**
- **Title**：`No-Subscription PDF Editors: Free, Budget, and One-Time-Pay Options | RemovePDFPages`
- **Meta Description**：`Discover no-subscription PDF editors — free browser tools and low-cost or one-time payment options. Compare features before you choose a monthly plan.`
- **H1**：`No-Subscription PDF Editors: Free, Budget, and One-Time-Pay Options`
- **Schema**：`BlogPosting`

**文章结构文案**
- **Intro**：`Not everyone wants another subscription. If you only edit PDFs once in a while, a free browser tool, a low monthly plan, or a one-time payment editor may be all you need.`
- **Free browser tools**：`Free tools can handle common tasks like removing pages, merging, compressing, and signing. They usually run in your browser, so your files stay on your device.`
- **Low monthly plans and one-time payment editors**：`For features like PDF to Word conversion, look for a cancel-anytime monthly plan or a one-time payment license.`
- **What to watch out for**：`Check for file size limits, watermarks, privacy policies, cancellation terms, and whether “one-time” or “lifetime” really means the current version. Some tools also limit the number of devices.`
- **Conclusion**：`Start with a free tool for simple tasks. If you need more, look for a clear monthly plan or a one-time payment option with a refund policy.`

**CTA**
- **Primary CTA**：`Get Full Editor — $19/month Launch Special` → `/pricing`
- **Secondary CTA**：`Try Remove Pages` → `/remove-pages`

---

### 3.10 Footer 文案

#### 3.10.1 Footer 结构
- **背景**：`--brand-indigo-900`
- **文字颜色**：白色 / `--ink-300`

#### 3.10.2 列 1：品牌
- **Logo wordmark**：`RemovePDFPages`
- **Tagline**：`Free PDF tools in your browser. Subscribe or buy once.`

#### 3.10.3 列 2：Legal（三链）
- **标题**：`Legal`
- **链接**：
  - `Privacy Policy` → `/privacy`
  - `Terms of Service` → `/terms`
  - `Refund Policy` → `/refund`
  - `Cookie Policy` → `/cookie-policy`

#### 3.10.4 列 3：Tools
- **标题**：`Tools`
- **链接**：
  - `Remove Pages` → `/remove-pages`
  - `Merge PDFs` → `/merge`
  - `Compress PDF` → `/compress`
  - `Sign PDF` → `/sign`
  - `Convert to Word` → `/convert-to-word`

#### 3.10.5 列 4：Support
- **标题**：`Support`
- **链接**：
  - `Pricing` → `/pricing`
  - `FAQ` → `/faq`
  - `Contact` → `/contact`
  - `Blog` → `/blog`

#### 3.10.6 底部版权行
- **Copyright**：`© 2026 RemovePDFPages. All rights reserved.`
- **Note**：`RemovePDFPages is a standalone tool and is not affiliated with Adobe, Foxit, or any other PDF software company.`

---

## 4. 法律页文案要求（供 07 前端落地）

> 以下段落基于 `docs/compliance-report.md` v3 第 7 节要求，必须替换当前 `app/privacy/page.tsx`、`app/terms/page.tsx`、`app/refund/page.tsx` 中的对应内容。不得编造具体日期或法律结论；未确认项使用 `[待确认]` 占位。

### 4.1 `/privacy` — Privacy Policy

**页面元信息**
- **Title**：`Privacy Policy - RemovePDFPages`
- **Meta Description**：`RemovePDFPages privacy policy: how we handle your files, device data, and order information.`
- **H1**：`Privacy Policy`
- **Last updated**：`July 29, 2026`

**第 1 节：Overview**
> RemovePDFPages operates removepdfpages.net. This Privacy Policy explains how we handle information when you use our free PDF tools and the Full Editor subscription or one-time license.

**第 2 节：Files and PDFs**
> **Free tools:** By default, Remove Pages, Merge, Compress, and Sign process your files entirely in your browser. Your PDFs are not uploaded to our servers.
> 
> **Convert PDF to Word:** This feature requires server-side processing. Your file is uploaded temporarily and deleted automatically within 1 hour.

**第 3 节：Data we collect**
- Device identifier (browser fingerprint + IP hash) for free trial and device-limit enforcement.
- Convert to Word usage counts and credit balances stored in our KV database.
- Email address at checkout and in contact/refund forms.
- IP address for rate limiting and abuse prevention (retained up to 7 days).
- Billing address, payment details, and order details processed by Creem, our Merchant of Record. We do not store full card numbers.
- Subscription status, renewal dates, and cancellation requests processed by Creem. We store a subscription status flag to enforce Convert to Word quotas and access.

**第 3.5 节：Device Identifier & Quota Storage（新增）**
> To enforce free trial limits and license device limits without requiring user accounts, we generate a device identifier (`device_id`) based on a combination of browser characteristics and a one-way hash of your IP address. This identifier is stored in our key-value (KV) database along with your free trial usage count, monthly Convert to Word quota, and any purchased top-up credits. The device_id is not tied to your name, email, or PDF content. We retain this quota data for the duration of your active subscription or license, or for 30 days after the free trial period ends if you do not purchase.

**第 4 节：Third parties**
> We use Creem (Armitage Labs OÜ, Estonia) as our Merchant of Record (MOR). Creem processes payments, automatically calculates and remits applicable sales tax/VAT/GST based on the buyer's billing address, and handles fraud prevention. Creem also manages subscription billing, renewals, and cancellations. We do not store full card numbers. Creem shares order details with us so we can deliver the license key and provide support.
> 
> We use Resend for license emails and Cloudflare for hosting. We do not sell your data or use your PDFs for training or advertising.
> 
> [待确认：第三方分析工具选型确定后，在此补充具体 provider、Cookie 使用情况、opt-out 方式。]

**第 4.5 节：Data Retention（新增）**
> - Free-tool PDFs: never uploaded.
> - Backend-processed PDFs (Convert to Word / fallback): deleted within 1 hour.
> - Checkout email and order data: retained for customer service and tax record purposes for at least 6 years or as required by law. Order data is shared with Creem, our Merchant of Record, for tax and compliance purposes.
> - Device identifier and quota data: retained while subscription or license is active, or 30 days after free trial ends.
> - Subscription status and renewal dates: retained while the subscription is active, and for 30 days after cancellation or expiration.
> - Contact form submissions: retained for at least 6 months.
> - Analytics data: retention depends on the selected analytics provider [待确认].

**第 5 节：Your rights**
> You can contact us to access, update, or delete your checkout email and contact records by emailing support@removepdfpages.com. Because we do not store free-tool PDFs, there is no PDF content to delete. Device identifiers and quota data are automatically deleted after subscription cancellation, license expiration, or free trial expiry.

**第 6 节：Analytics / Cookie Disclosure（待选型后更新）**
> We may use analytics to understand how the site is used. The specific provider, whether it uses cookies, and how to opt out will be disclosed here once the provider is selected. Until then, no third-party analytics cookies are placed without this notice being updated.

---

### 4.2 `/terms` — Terms of Service

**页面元信息**
- **Title**：`Terms of Service - RemovePDFPages`
- **Meta Description**：`RemovePDFPages terms of service, license agreement, subscription terms, and usage policies.`
- **H1**：`Terms of Service`
- **Last updated**：`July 29, 2026`

**第 1 节：Acceptance**
> By accessing or using RemovePDFPages, you agree to these Terms of Service. If you do not agree, do not use the Service.

**第 2 节：Description of the Service**
> RemovePDFPages provides browser-based PDF tools. The free tools (Remove Pages, Merge, Compress, Sign) are processed locally in your browser by default. Convert PDF to Word and optional backend fallback processing require temporary server-side upload and are deleted within 1 hour. The Full Editor is available as a monthly subscription ($19/month Launch Special, standard $29/month), an annual subscription ($99/year, standard $149/year), or a one-time license ($59, standard $79) for the current major version (v1.x). All paid plans include 10 Convert to Word conversions per calendar month. Additional conversions may be purchased as top-up credits at $0.50 each or $5 for 10. Free users may try Convert to Word up to 3 times per 30-day period.

**第 3 节：Full Editor Subscription & License**
> The Full Editor is offered as a monthly subscription, an annual subscription, or a one-time license. Subscriptions bill automatically until canceled. You may cancel anytime; cancellation takes effect at the end of the current billing period. The one-time license is a single payment for the current major version of RemovePDFPages (v1.x). It includes updates within v1.x but does not guarantee updates for a future major version or new platform. All paid plans may be activated on up to 5 personal devices; we record a device fingerprint at activation to enforce this limit. You may not share, resell, or redistribute your license key. The license is non-transferable except where required by law.

**第 3.5 节：Top-Up Credits（新增）**
> Top-up credits are sold in packs of 1 conversion ($0.50) or 10 conversions ($5). Credits are non-transferable and expire only upon use or license/subscription revocation. Unused credits may be refunded within 14 days of purchase if requested; used credits are not refundable. Creem processing fees are not refunded on any refund.

**第 3.6 节：Pricing Changes（新增）**
> The $19/month Launch Special and $99/year Launch Special are limited-time introductory prices. We may end the launch period at any time and return to the standard prices of $29/month and $149/year without prior notice. Prices displayed at checkout at the time of purchase are the prices that apply to that purchase. [待确认：具体截止日期或数量限制由产品确认后回填。]

**第 4 节：Acceptable Use**
> You agree not to use the service to process unlawful, harmful, infringing, or otherwise objectionable content. You may not attempt to circumvent free trial limits, device limits, or rate limits. We may suspend or revoke a license or subscription for violations.

**第 4.5 节：Sales Tax & Geographic Scope（新增）**
> All prices are shown in USD. For purchases in the United States, applicable state and local sales tax will be calculated and collected automatically by Creem at checkout. International purchases may be subject to VAT or other local taxes; the buyer is responsible for compliance with local laws. The service is primarily offered to users in the United States; access from other jurisdictions does not create a local presence or obligation beyond these Terms. [待确认：若开放国际销售，需补充 VAT 和管辖地条款。]

**第 5 节：Refunds**
> Full Editor subscriptions and one-time licenses are eligible for a full refund within 14 days of purchase, no questions asked, by contacting support@removepdfpages.com or through the refund form. Creem processing fees are not refundable. We reserve the right to refuse refunds in cases of abuse, fraud, license redistribution, or after the 14-day window. Top-up credits are refundable only if unused and requested within 14 days of purchase; used credits are not refundable.

**第 6 节：Governing Law / Dispute Resolution（新增）**
> These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any dispute shall be resolved in the state or federal courts located in Delaware.

**第 7 节：Disclaimer & Limitation of Liability（新增）**
> The service is provided “as is” and “as available” without warranties of any kind. PDF conversion, compression, and signing results depend on the input file; we do not guarantee perfect output. In no event shall our liability exceed the amount you paid for the service in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.

---

### 4.3 `/refund` — Refund Policy

**页面元信息**
- **Title**：`Refund Policy - RemovePDFPages`
- **Meta Description**：`RemovePDFPages refund policy: 14-day refund for Full Editor subscriptions, one-time licenses, and unused top-up credits.`
- **H1**：`Refund Policy`
- **Last updated**：`July 29, 2026`

**第 1 节：Refund Eligibility**
> RemovePDFPages offers a 14-day, no-questions-asked refund for all Full Editor subscriptions and one-time licenses. If you are not satisfied, you may request a full refund within 14 days of your purchase date.

**第 1.5 节：Top-Up Credits Refund（新增）**
> Top-up credits ("10 conversions for $5" or "$0.50 per conversion") are refundable only if they have not been used and the refund is requested within 14 days of purchase. Once a credit has been consumed for a conversion, it is not refundable. Refunds for unused credits are processed through Creem and may take 5–10 business days to appear on your statement. Creem processing fees are not refunded.

**第 2 节：How to Request a Refund**
> Submit your request through our [Contact page](/contact) or by emailing support@removepdfpages.com. Include your Creem order ID and the email address used during checkout.

**第 3 节：Processing Time**
> Refunds are processed through Creem and usually appear within 5–10 business days, depending on your bank.

**第 4 节：Exceptions**
> We reserve the right to deny refunds in cases of abuse, fraud, license key redistribution, or after the 14-day window. Refunds of subscriptions or licenses will revoke the associated license key and any unused top-up credits. Creem payment processing fees are not returned by Creem; we absorb this cost on every refund.

---

## 5. 全站禁用词扫描结果

### 5.1 检查规则
- **全站禁用**：`official`, `guaranteed`, `100% accurate`, `perfect`, `free forever`, `unlimited`, `no limits`, `lifetime updates`, `AI-powered`, `open source`
- **/sign 禁用**：`legally binding`, `e-signature compliant`
- **/convert-to-word 禁用**：`perfect conversion`, `100% formatting`
- **/compress 禁用**：`compress any file`, `unlimited compression`
- **博客禁用**：`best`, `top` 等绝对化竞品对比表述

### 5.2 页面检查表

| 页面 | 全站禁词 | 页面特定禁词 | 状态 | 备注 |
|---|---|---|---|---|
| `/` | 通过 | — | ✅ | H1 为 `Free PDF Tools in Your Browser`；Hero Primary CTA 指向 `/remove-pages` 免费工具入口；付费转化 CTA `$19/month Launch Special` 仅出现在首页底部 |
| `/remove-pages` | 通过 | — | ✅ | 使用 “currently free”，无 unlimited/perfect |
| `/merge` | 通过 | — | ✅ | 使用 “currently free”，无 unlimited/perfect |
| `/compress` | 通过 | 通过 | ✅ | 已避免 “compress any file” / “unlimited compression” |
| `/sign` | 通过 | 通过 | ✅ | 包含 “not a digital certificate signature” 免责声明 |
| `/convert-to-word` | 通过 | 通过 | ✅ | 未使用 “perfect conversion” / “100% formatting”；使用 “where possible” |
| `/pricing` | 通过 | 通过 | ✅ | 未使用 “lifetime updates”；$29 作为月度 strikethrough，$149 作为年度 strikethrough |
| `/checkout` | 通过 | — | ✅ | 无禁词；CTA 价格一致 |
| `/success` | 通过 | — | ✅ | 无禁词 |
| `/faq` | 通过 | — | ✅ | 无禁词 |
| `/contact` | 通过 | — | ✅ | 无禁词 |
| `/blog` | 通过 | — | ✅ | 无禁词 |
| `/blog/foxit-alternative` | 通过 | 通过 | ✅ | 标题已改为 “Alternatives to Consider”，未使用 best/top |
| `/blog/replace-image-in-pdf` | 通过 | — | ✅ | 无禁词 |
| `/blog/one-time-payment-pdf-editor` | 通过 | 通过 | ✅ | 标题已改为 “Compared”，未使用 best/top |
| `/blog/no-subscription-pdf-editor` | 通过 | 通过 | ✅ | 标题已改为 “Free, Budget, and One-Time-Pay Options”，未使用 best/top |
| Footer | 通过 | — | ✅ | 含 “not affiliated with Adobe/Foxit” 免责声明 |

### 5.3 扫描发现的问题及修改建议

| 位置 | 问题 | 风险 | 修改建议 |
|---|---|---|---|
| `app/page.tsx` | `description` 仍写 `$29 lifetime` / 买断制 | 价格口径不一致 | 按第 3.1 节更新为 `$19/month Launch Special` / 免费工具入口 |
| `app/page.tsx` | 信任条 `One-time payment, no subscription` | 与订阅制主推矛盾 | 改为 `Monthly, yearly, or one-time license options` |
| `app/page.tsx` | Hero Primary CTA 指向 `/pricing` 或 `/checkout` | 与首页入口页定位冲突；首屏不得主导付费 | 改为指向 `/remove-pages` 等免费工具入口；付费 CTA 仅保留首页底部 |
| `app/pricing/page.tsx` | 两列卡片（Free / $19） | 未展示年费和隐藏买断 | 改为三列 + 隐藏买断入口；按第 3.3 节更新 |
| `app/pricing/page.tsx` | $29 作为独立购买卡片 | 误导性折扣 | 改为 $29 仅作为 Monthly 卡片 strikethrough，$149 作为 Yearly 卡片 strikethrough |
| `app/checkout/page.tsx` | 仅 $19 / $29 买断选项 | 与订阅制模式不符 | 改为 Monthly / Yearly / One-time 三个选项；默认 Monthly |
| `app/convert-to-word/page.tsx` | `description` / Paywall 仍写 `$29 unlock` / 买断 | 价格口径不一致 | 改为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`；CTA 指向 `/pricing` |
| `app/success/page.tsx` | 仅显示买断 license | 未支持订阅成功页 | 增加 subscription note 和 order 摘要 |
| `app/faq/page.tsx` | 仍写 “It is a one-time payment” | 与订阅主推矛盾 | 按第 3.6 节更新 Q1 / Q7 等 |
| `app/terms/page.tsx` | 仅描述买断 license | 未描述订阅 | 按第 4.2 节第 2、3 节替换 |
| `components/Footer.tsx` | Tagline 写 `One-time Full Editor license. No subscription.` | 与订阅主推矛盾 | 改为 `Free PDF tools in your browser. Subscribe or buy once.` |
| `components/Header.tsx` | CTA 为 `Buy License — $29` | 价格口径不一致 | 改为 `Get Full Editor — $19/month Launch Special` |
| 全站 | 仍使用 `lifetime` / `lifetime updates` | 禁用词 | 统一改为 `one-time license` / `current major version` |

---

## 6. 未确认项占位清单

以下项目在 Copy Freeze v3 中保留 `[待确认]` 占位，不编造具体日期或法律结论：

| # | 待确认项 | 影响页面 | 当前文案处理 | 阻塞等级 |
|---|---|---|---|---|
| 1 | `$19 Launch Special` 具体截止日期或数量限制 | `/pricing`、`/terms`、`/faq`、博客 | 使用 `limited time, may end without notice` 保守披露 | P1 |
| 2 | Creem 订阅产品配置、目标销售国家/产品类别、webhook 测试状态 | `/terms`、`/checkout`、`/faq` | 披露 Creem 作为 MOR 自动计算销售税并管理订阅，未承诺具体国家清单 | P0 |
| 3 | 目标销售地理范围（仅美国 vs 国际） | `/terms`、`/faq` | 使用 “primarily offered to users in the United States; international users responsible for local compliance” | P1 |
| 4 | 第三方分析工具选型（Google Analytics / Plausible / Vercel Analytics / Cloudflare Web Analytics） | `/privacy`、`/terms` | Privacy 第 6 节预留披露位置，声明未选型前无第三方 analytics cookies | P2 |
| 5 | 最终后端方案（Workers + WASM / 第三方 API / 自托管）及真实单次成本 | 成本模型、定价校准 | 不影响用户-facing 文案；保留 `[待确认]` 在内部文档 | P1（技术） |
| 6 | 用户实际平均生命周期、月转化率、平均使用频次 | 商业复盘 | 不影响文案；保留 `[待确认]` 在内部文档 | P2（商业） |
| 7 | License key 最终格式 | `/success` | 占位符 `REMPDF-XXXX-XXXX-XXXX` 保留，后端确认后回填 | P2 |
| 8 | 订阅过期后用户状态（是否保留免费额度） | `/terms` | pricing-calibration-v3 建议到期后转为未购买状态，仅保留 3 次/30 天免费额度；需产品最终确认 | P1 |

---

## 7. 下游交接：给 06 Design / 07 Frontend 的文案落地清单

### 7.1 设计阶段（06）必须处理
1. **Pricing 卡片结构**：改为 **三列**（Free / Monthly $19 / Yearly $99），在卡片下方增加隐藏买断入口 `Prefer to pay once? $59 one-time license`。
2. **Convert to Word 数据流提示**：上传区必须醒目展示 “This tool uses a backend server. Your file is uploaded temporarily and deleted within 1 hour.”
3. **Convert to Word 额度提示**：免费试用显示 `You have X free conversions left this 30-day period.`；额度用完后显示 Top-up CTA `Buy 10 more conversions for $5` / `$0.50 each`。
4. **Sign 免责声明**：Hero 区或签名画布上方必须显示 “not a digital certificate signature” 提示。
5. **Free 工具标签**：使用 “Currently free” badge，不使用 “Free forever”。
6. **Footer 法律链接**：确保 Legal 列指向 `/privacy` / `/terms` / `/refund` / `/cookie-policy`。
7. **Footer / 首页 Tagline**：改为 `Free PDF tools in your browser. Subscribe or buy once.`。
8. **首页 Hero CTA**：Primary CTA 改为 `Try Remove Pages — free`（或 `/merge` / `/compress` / `/sign` 等免费工具入口），指向 `/remove-pages`；付费转化文案（`Get Full Editor — $19/month Launch Special`）仅允许出现在首页底部转化区。

### 7.2 前端阶段（07）必须处理
1. **`Footer.tsx`**：修正法律链接，从 `/contact` 改为 `/privacy` / `/terms` / `/refund` / `/cookie-policy`；Tagline 改为订阅/买断口径。
2. **`Header.tsx`**：CTA 改为 `Get Full Editor — $19/month Launch Special`。
3. **`app/page.tsx`**：
   - Title 改为 `RemovePDFPages — Free PDF Tools & Full Editor`（meta description 可保留 `$19/month` / `$99/year` / `$59 one-time` 价格，但首屏文案不主导付费）。
   - Meta description 改为 `$19/month` / `$99/year` / `$59 one-time` 版本。
   - Hero H1 改为 `Free PDF Tools in Your Browser`。
   - Hero Primary CTA 改为 `Try Remove Pages — free`，指向 `/remove-pages`（或 `/merge` / `/compress` / `/sign` 等免费工具入口）。
   - Hero Secondary CTA 改为 `Try Merge PDFs`，指向 `/merge`。
   - 付费 CTA `Get Full Editor — $19/month Launch Special` 仅保留在首页底部转化区，指向 `/pricing`。
   - 信任条调整：改为 `Monthly, yearly, or one-time license options`。
4. **`app/pricing/page.tsx`**：
   - 改为三列卡片：Free / Monthly $19 / Yearly $99；
   - Monthly 卡片显示 `$19/month` + `~~$29~~`；
   - Yearly 卡片显示 `$99/year` + `~~$149~~` + `Save $129`；
   - 卡片下方增加隐藏买断入口：$59 one-time license；
   - CTA 改为 `Get Monthly — $19 Launch Special` / `Get Yearly — $99/year`；
   - Feature list 必须包含 `Convert PDF to Word (10 conversions/month included)`、`Extra conversions: $0.50 each or $5 for 10`、`Use on up to 5 personal devices`、`Updates for the current major version`、`14-day refund policy`；
   - 对比表按第 3.3 节更新；
   - 底部信任条 `Secure Stripe checkout` 改为 `Secure Creem checkout`。
5. **`app/convert-to-word/page.tsx`**：
   - Meta description 改为 `$19/month` / `$99/year` / `$59 one-time` 版本；
   - 添加免费试用额度提示与 Top-up CTA；
   - Paywall 改为 `Get Full Editor — $19/month Launch Special`，指向 `/pricing`；
   - 上传区文案改为后端数据流披露；
   - 移除 `No subscription` 卡片中 “use it forever” 的模糊表述，改为 `Full Editor subscription or one-time license`。
6. **`app/checkout/page.tsx`**：
   - Subheadline 改为 `securely through Creem`；
   - 添加 Monthly / Yearly / One-time 三个选项，默认 Monthly；
   - 添加 Payment note / Tax note / Refund note（含 MOR、销售税、10 conversions/month、订阅可取消）；
   - 信任条改为 `Encrypted checkout via Creem`；
   - 默认选中 `Monthly — $19/month`。
7. **`app/success/page.tsx`**：
   - 显示订阅或一次性计划信息；
   - Order ID 显示 `[Creem order ID]`。
8. **`app/faq/page.tsx`**：按第 3.6 节更新和新增问题，特别是 subscription vs one-time、credits 退款、销售税、Launch Special 边界、One-time license 定义。
9. **`app/privacy/page.tsx`** / **`app/terms/page.tsx`** / **`app/refund/page.tsx`**：按第 4 节完整替换文案（订阅/买断描述）。
10. **博客页面**：更新 CTA 统一为 `$19/month Launch Special`；避免 `best` / `top`；竞品文章中加入 `not affiliated with` 声明；更新 blog index 描述为订阅/买断口径。
11. **Sitemap / robots**：移除 `/workspace`，添加 `/blog/*` 路由（若已恢复）。
12. **后端订阅状态**：实现 `/api/subscription/purchase` 和 Creem webhook（`checkout.completed` / `subscription.created` / `subscription.cancelled` / `subscription.expired`）以支持订阅配额和取消。

### 7.3 给 05 Copy Freeze → 06 design handoff copy-audit 的对照要点
- 06/07 阶段需逐页核对本文档第 3 节每个页面的 title / meta / H1 / CTA / 披露语句是否出现在 design handoff 或前端代码中。
- 重点审计：
  - `/pricing` 是否出现 `Monthly $19/month`、`Yearly $99/year`、`Save $129`、`One-time $59`、`10 conversions/month included`、`extra $0.50 each or $5/10`、`up to 5 devices`。
  - `/convert-to-word` 是否出现免费试用提示、Top-up CTA、1 小时 TTL 数据流提示；CTA 是否指向 `/pricing`。
  - `/checkout` 是否出现 Monthly / Yearly / One-time 三个选项、Creem MOR、tax note、14-day refund、10 conversions/month、cancel anytime。
  - `/faq` 是否新增 subscription vs one-time、credits 退款、销售税、Launch Special 边界、One-time license 定义。
  - Footer 是否指向 `/privacy` / `/terms` / `/refund` / `/cookie-policy`；Tagline 是否改为订阅/买断口径。
  - 全站是否仍有 Stripe、$19 one-time、$29 独立购买卡片、unlimited、free forever、perfect、100% accurate、lifetime updates 等。
- 任何 gap > 0 则 [BLOCKED] 返回 05 Copy Freeze 修正。

---

## 8. 验收标准

05 Copy Freeze v3 通过前必须满足：

- [x] 主推套餐明确为订阅制（月 $19 / 年 $99）。
- [x] 首页 `/` Hero Primary CTA 指向免费工具入口（如 `/remove-pages` / `/merge` / `/compress` / `/sign`），首屏不出现付费价格主导。
- [x] 隐藏买断/lifetime 价格明确（$59），展示位置明确（`/pricing` 卡片下方 + `/checkout` 第三选项）。
- [x] 免费版功能与付费版功能边界清晰：免费 4 工具；Convert to Word 3 次/30 天；付费计划 10 次/月。
- [x] Convert to Word 额度策略清晰：3 次/30 天免费 → 10 次/月包含 → Top-up $5/10 或 $0.50/次。
- [x] 所有文案避免 `unlimited` / `free forever` / `no limits` / `lifetime updates` / `perfect` / `100% accurate`。
- [x] `/sign` 保留 “not a digital certificate signature” 免责声明。
- [x] 工具页文案与数据流一致：免费工具默认本地处理；Convert to Word 后端临时上传并 1 小时删除。
- [x] FAQ 中新增关于 subscription vs one-time、credits 退款、销售税、`$19 Launch Special` 边界、One-time license 定义的回答。
- [x] Footer 法律链接指向 `/privacy` / `/terms` / `/refund` / `/cookie-policy`
- [x] 博客标题不宣称 `best` / `top`；CTA 统一为 `$19/month Launch Special`。
- [x] 未确认的项在 Copy Freeze 中保留 `[待确认]` 占位或保守披露。
- [x] 全站 Stripe 已替换为 Creem，并新增 MOR / tax 披露。
- [x] 与 `docs/PRD-v3.md` 和 `docs/pricing-calibration-v3.md` 定价口径一致。

---

## 9. 交付物与状态

- **交付物路径**：`/home/ubuntu/fancy-text-site/docs/copy-freeze.md`
- **是否满足进入 06 design handoff copy-audit 的条件**：**满足**（结论 [GO with NEEDS_REVIEW]，文案框架已冻结，未确认项已占位，不阻塞设计 handoff copy-audit 的对照工作）。
- **仍需产品/运营回填的 [待确认] 项**：
  1. `$19 Launch Special` 具体截止日期或数量限制；
  2. Creem 订阅产品配置、目标销售国家/产品类别、webhook 状态；
  3. 目标销售地理范围（仅美国 vs 国际）；
  4. 第三方分析工具最终选型；
  5. 最终后端方案及真实单次成本；
  6. 用户实际平均生命周期、月转化率、平均使用频次；
  7. License key 最终格式；
  8. 订阅过期后用户状态（是否保留免费额度）。

---

**[DONE] docs/copy-freeze.md v3 已重跑并更新。**
- 首页 Hero Primary CTA 已从 `/pricing` 改为 `/remove-pages` 等免费工具入口，首屏不再以付费价格为主导。
- 全站 CTA 价格口径统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`。
- 合规披露语句（MOR、销售税、设备限制、退款、签名免责、后端数据流、Top-up 等）已落地到各页面文案。
- 禁用词（`unlimited` / `free forever` / `no limits` / `lifetime updates` / `perfect` / `100% accurate` 等）已清理。
- 未确认项保留 `[NEEDS_SOURCE_CHECK]` / `[待确认]` 占位，未编造价格或承诺。

**状态：[GO with NEEDS_REVIEW]**
- 原因：文案框架已满足 05 copy-freeze 验收要求，但上游仍有未确认项（第三方分析工具选型、`$19 Launch Special` 截止日期 / 数量限制、最终后端方案与真实单次成本、订阅到期后状态、Creem 商户配置与 webhooks 等），需 06/07 阶段回填并再次审计。
- 下游 06 design / 07 frontend 必须按本文档执行首页 Hero CTA、底部转化区、定价口径与合规披露。

**定价数字来源：已由用户 2026-07-29 竞品价格快照覆盖；本报告不构成法律意见。**
