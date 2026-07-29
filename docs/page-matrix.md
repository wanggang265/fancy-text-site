# RemovePDFPages — Page Matrix v1

> 本矩阵基于当前 `app/*.tsx` 的 `metadata` 导出与 `design-handoff-extract/DESIGN.md` 文案。所有 indexable 页面均需满足：唯一主词、清晰 H1、单一 CTA、对应 schema。法律页内容需合规阶段填充。

## 总表

| Route | Segment | Title | H1 | Main Keyword | Meta Description | CTA | Schema | Index |
|---|---|---|---|---|---|---|---|---|
| `/` | home | RemovePDFPages — Free PDF Tools. Full Editor for $19. | Free PDF Tools. Full Editor for One Price. | free pdf tools | Delete pages, merge, compress, and sign PDFs in your browser. Upgrade once to the Full Editor for $19 and convert PDF to Word without a subscription. | Get Full Editor — $19 Launch Special / Try Free Tools | WebSite | yes |
| `/remove-pages` | tool-free | Remove PDF Pages \| RemovePDFPages | Remove PDF Pages Online | remove pdf pages online | Delete pages from any PDF online for free. No upload, no watermark, no signup required. | Upload → Select pages → Download remaining PDF | SoftwareApplication | yes |
| `/merge` | tool-free | Merge PDFs Online \| RemovePDFPages | Merge PDFs Online | merge pdf online | Combine multiple PDFs into one online for free. No upload, no watermark, no signup. | Upload PDFs → Reorder → Download merged PDF | SoftwareApplication | yes |
| `/compress` | tool-free | Compress PDF Online \| RemovePDFPages | Compress PDF Online | compress pdf online | Reduce PDF file size online for free. No upload, no watermark, no signup required. | Upload → Choose level → Download compressed PDF | SoftwareApplication | yes |
| `/sign` | tool-free | Sign PDF Online \| RemovePDFPages | Sign PDF Online | sign pdf online | Sign PDFs online for free. No upload, no watermark, no signup required. | Upload → Draw signature → Download signed PDF | SoftwareApplication | yes |
| `/convert-to-word` | tool-paid | Convert PDF to Word Online \| RemovePDFPages | Convert PDF to Word | convert pdf to word | Convert PDF to editable Word documents with the RemovePDFPages Full Editor. One-time purchase, no subscription. Files are deleted from our server within 1 hour. | Get Full Editor — $19 Launch Special | SoftwareApplication | yes |
| `/pricing` | conversion | Pricing \| RemovePDFPages | Simple, one-time pricing | removepdfpages pricing | RemovePDFPages pricing: free PDF tools and a one-time $19 Launch Special for the Full Editor. No subscription. 14-day refund policy. | Get Full Editor — $19 Launch Special | Product | yes |
| `/faq` | support | FAQ \| RemovePDFPages | Help & FAQs | pdf tools help | Find answers to common questions about RemovePDFPages free tools and full editor license. | Contact Support | FAQPage | yes |
| `/contact` | support | Contact & Refund \| RemovePDFPages | Contact & Refund | removepdfpages support | Get in touch with RemovePDFPages for support, questions, or refund requests. | Send message / Request refund | ContactPage | yes |
| `/checkout` | transaction | Checkout \| RemovePDFPages | Get the Full Editor | — | Complete your purchase of the RemovePDFPages Full Editor license. One-time payment, no subscription. | Pay $19 — Unlock Full Editor | WebPage | no |
| `/success` | transaction | Thank You \| RemovePDFPages | Welcome to the Full Editor | — | Thank you for purchasing the RemovePDFPages full editor license. | Copy License Key / Go to Dashboard | WebPage | no |
| `/privacy` | legal | Privacy Policy - RemovePDFPages | Privacy Policy | removepdfpages privacy | RemovePDFPages privacy policy: how we handle your files and data. | Contact Support | WebPage | yes |
| `/terms` | legal | Terms of Service - RemovePDFPages | Terms of Service | removepdfpages terms | RemovePDFPages terms of service and license agreement. | Contact Support | WebPage | yes |
| `/refund` | legal | Refund Policy - RemovePDFPages | Refund Policy | removepdfpages refund | RemovePDFPages refund policy: 14-day no-questions-asked refund. | Request refund / Contact Support | WebPage | yes |

## 各页详细说明

### `/` Home
- **定位**：站点主入口，承担整体 SEO 信号与品牌转化。
- **主词**：`free pdf tools`（竞争词，可扩展 `pdf editor`、`pdf page remover`）。
- **Title**：`RemovePDFPages — Free PDF Tools. Full Editor for $19.`
- **H1**：`Free PDF Tools. Full Editor for One Price.`
- **CTA 优先级**：
  1. Primary: `Get Full Editor — $19 Launch Special`（指向 `/checkout`）
  2. Secondary: `Try Free Tools`（指向 `/remove-pages`）
- **Schema**：`WebSite` + `Organization`（后续可补充 `SoftwareApplication`）。
- **Canonical**：`https://removepdfpages.net/`
- **内链**：顶部 Tools 下拉、Footer 工具列表、Pricing、FAQ、Contact。
- **注意**：当前页面 Hero 与工具页内容不重复，符合 canonical 策略。

### `/remove-pages`
- **定位**：免费入口工具，也是原产品核心功能。
- **主词**：`remove pdf pages online`。
- **H1**：`Remove PDF Pages Online`。
- **CTA**：`Remove selected pages`（橄榄绿主按钮） + `Download remaining PDF`（次级按钮）。
- **Schema**：`SoftwareApplication`，属性：`applicationCategory: "BrowserApplication"`，`offers: free`。
- **素材**：需上传区占位图、示例缩略图。
- **依赖**：`pdf-lib`（前端）处理 PDF 页删除。

### `/merge`
- **定位**：免费多文件合并工具。
- **Title**：`Merge PDFs Online | RemovePDFPages`
- **主词**：`merge pdf online`。
- **H1**：`Merge PDFs Online`。
- **CTA**：`Merge PDFs` + `Download merged PDF`。
- **交互**：拖拽排序、删除单文件。
- **Schema**：`SoftwareApplication`。
- **依赖**：`pdf-lib` 前端合并。

### `/compress`
- **定位**：免费 PDF 压缩工具。
- **主词**：`compress pdf online`。
- **H1**：`Compress PDF Online`。
- **CTA**：`Compress PDF` + `Download compressed PDF`。
- **选项**：推荐压缩 / 最大压缩。
- **Schema**：`SoftwareApplication`。
- **风险**：前端压缩能力有限，可能需后端 fallback；与 UI 文案 "no upload" 冲突，需在产品/技术阶段决策。见 `data-contract.md`。

### `/sign`
- **定位**：免费电子签名工具。
- **Title**：`Sign PDF Online | RemovePDFPages`
- **主词**：`sign pdf online`。
- **H1**：`Sign PDF Online`。
- **CTA**：`Apply signature` + `Download signed PDF`。
- **限制**：仅支持手绘图片签名，不做证书签名或审计日志。
- **Schema**：`SoftwareApplication`。
- **依赖**：Canvas 签名 + `pdf-lib` 将签名图片嵌入 PDF。

### `/convert-to-word`
- **定位**：付费工具页，Full Editor 的核心卖点之一。
- **主词**：`convert pdf to word`。
- **Title**：`Convert PDF to Word Online | RemovePDFPages`
- **H1**：`Convert PDF to Word`。
- **CTA**：未授权时 `Get Full Editor — $19 Launch Special`（指向 `/checkout`）；已授权后 `Upload PDF` / `Convert to Word` / `Download DOCX`。
- **选项**：输出格式 `DOCX` / `RTF`；`Keep formatting (experimental)`。
- **Schema**：`SoftwareApplication`，`offers: $19 Launch Special`。
- **风险**：客户端 DOCX 转换非常困难，需后端处理；文件临时上传并在 1 小时内自动删除。见 `data-contract.md`。

### `/pricing`
- **定位**：转化页，解释免费/付费差异。
- **Title**：`Pricing | RemovePDFPages`
- **主词**：`removepdfpages pricing`（品牌词）+ `pdf editor lifetime`。
- **H1**：`Simple, one-time pricing`。
- **CTA**：`Get Full Editor — $19 Launch Special`（指向 `/checkout`）。
- **Schema**：`Product` + `Offer`（Free / $19 Launch Special 两列卡片）。
- **注意**：`$29` 仅作为 strikethrough 原价锚点，不出现在独立购买卡片中。

### `/faq`
- **定位**：支持/SEO 内容页，降低客服压力。
- **Title**：`FAQ | RemovePDFPages`
- **主词**：`pdf tools help` / 长尾问答词。
- **H1**：`Help & FAQs`。
- **CTA**：`Contact us` / `Request a refund`。
- **Schema**：`FAQPage`（每个 FAQ 项使用 `Question`/`Answer`）。
- **锚点**：`#using-tool`、`#privacy`、`#pricing`、`#refunds`、`#contact`。

### `/contact`
- **定位**：客服与退款入口。
- **Title**：`Contact & Refund | RemovePDFPages`
- **主词**：品牌支持词。
- **H1**：`Contact & Refund`。
- **CTA**：`Send message`（表单）+ `Request refund`。
- **表单字段**：Name、Email、Subject（Support/Refund/Business/Other）、Message。
- **Schema**：`ContactPage`。
- **联系邮箱**：`support@removepdfpages.com`（当前页面已写）。

### `/checkout` — noindex
- **定位**：支付转化页，不进入 SEO。
- **Title**：`Checkout | RemovePDFPages`
- **H1**：`Get the Full Editor`。
- **CTA**：`Pay $19 — Unlock Full Editor`。
- **Schema**：`WebPage`（不做电商 CheckoutPage 以避免 Schema 错误）。
- **注意**：当前页面表单是前端占位，真实支付需 Stripe 集成。

### `/success` — noindex
- **定位**：支付成功与 license key 展示页。
- **Title**：`Thank You | RemovePDFPages`
- **H1**：`Welcome to the Full Editor`。
- **CTA**：`Copy License Key` / `Go to Dashboard` / `Convert PDF to Word`。
- **Schema**：`WebPage`。
- **注意**：license key 当前为占位符 `REMPDF-XXXX-XXXX-XXXX`；需后端真实生成。

### `/privacy` / `/terms` / `/refund`
- **定位**：法律合规页。
- **状态**：当前代码缺失，需恢复。内容在合规阶段（04）定稿。
- **Schema**：`WebPage`。
- **Footer 链接**：Footer 当前指向 `/contact`，需修正为这些真实路由。
- **/refund**：可与 `/contact` 的 refund section 区分；/refund 为独立政策页，/contact 为操作入口，避免完全重复。

---

## 博客/内容页矩阵

主词、搜索量、CPC 来源于 `docs/keyword-research-v1.md`；主词优先采用 SEMRUSH，部分词 DataForSEO 低估，以 SEMRUSH 为准。

| Route | Segment | Title | H1 | Main Keyword | Meta Description | CTA | Schema | Index |
|---|---|---|---|---|---|---|---|---|
| `/blog` | content | PDF Tools & Editing Tips Blog \| RemovePDFPages | RemovePDFPages Blog | pdf tools blog | Read PDF tips, tool comparisons, and one-time payment PDF editor guides on the RemovePDFPages blog. | Browse articles | Blog | yes |
| `/blog/foxit-alternative` | content | Foxit Alternatives to Consider in 2026 \| RemovePDFPages | Foxit Alternatives to Consider in 2026 | Foxit alternative | Looking for a Foxit alternative? Compare browser-based PDF tools and one-time payment editors before you choose a subscription. | Get Full Editor — $19 Launch Special | BlogPosting | yes |
| `/blog/replace-image-in-pdf` | content | How to Replace an Image in a PDF Without Adobe Acrobat \| RemovePDFPages | How to Replace an Image in a PDF Without Adobe Acrobat | replace image in PDF | Learn how to replace an image in a PDF without Adobe Acrobat. Compare methods and browser-based tools that let you edit PDFs without a subscription. | Try Remove Pages Tool / Try Full Editor — $19 Launch Special | BlogPosting | yes |
| `/blog/one-time-payment-pdf-editor` | content | One-Time Payment PDF Editors Compared \| RemovePDFPages | One-Time Payment PDF Editors Compared | one-time payment PDF editor | Compare one-time payment PDF editors. See which tools let you buy once and avoid subscriptions, including the RemovePDFPages $19 Launch Special. | Get Full Editor — $19 Launch Special | BlogPosting | yes |
| `/blog/no-subscription-pdf-editor` | content | No-Subscription PDF Editors: Free and One-Time-Pay Options \| RemovePDFPages | No-Subscription PDF Editors: Free and One-Time-Pay Options | no subscription PDF editor | Discover no-subscription PDF editors — free browser tools and one-time payment options. Compare features before you choose a monthly plan. | Get Full Editor — $19 Launch Special | BlogPosting | yes |

### `/blog`
- **定位**：博客索引页，连接 4 篇文章并分发内容信号。
- **主词**：`pdf tools blog`（品牌/导航词）。
- **H1**：`RemovePDFPages Blog`。
- **CTA**：浏览文章列表，底部引导至 `/pricing`。
- **Schema**：`Blog`。
- **重要**：需与 `/sitemap.xml` 保持一致，动态路由必须在静态导出时给出 `generateStaticParams`。

### `/blog/foxit-alternative`
- **定位**：商业调查型文章，吸引对订阅敏感的 PDF 用户。
- **主词**：`Foxit alternative` (SEMRUSH: 810, CPC $1.82)。
- **H1**：`Foxit Alternatives to Consider in 2026`。
- **CTA**：`Get Full Editor — $19 Launch Special`（指向 `/pricing`），次级 CTA `Try free PDF tools`（指向 `/remove-pages`）。
- **Schema**：`BlogPosting`，属性 `author` / `datePublished` / `publisher` 必填。
- **竞品参考**：alternativeto.net, pcworld.com, thebusinessdive.com (来源：Yahoo SERP 代理)。

### `/blog/replace-image-in-pdf`
- **定位**：教程型内容，触达想修改 PDF 图片但不想购买 Adobe 的用户。
- **主词**：`replace image in PDF` (SEMRUSH: 280, CPC $1.31)。
- **Title**：`How to Replace an Image in a PDF Without Adobe Acrobat | RemovePDFPages`
- **H1**：`How to Replace an Image in a PDF Without Adobe Acrobat`。
- **Meta Description**：`Learn how to replace an image in a PDF without Adobe Acrobat. Compare methods and browser-based tools that let you edit PDFs without a subscription.`
- **CTA**：结尾引导至 `/remove-pages` 作为轻量试用入口；后续完整编辑器上线后切换到 `/convert-to-word`。
- **Schema**：`BlogPosting`。
- **竞品参考**：pdffiller.com, helpx.adobe.com, pdfspot.co (来源：Yahoo SERP 代理)。

### `/blog/one-time-payment-pdf-editor`
- **定位**：商业调查型文章，精准匹配本产品的 `$19 Launch Special` 一次性付费模式。
- **主词**：`one-time payment PDF editor` (SEMRUSH: 80, CPC $2.95)。
- **H1**：`One-Time Payment PDF Editors Compared`。
- **CTA**：`Get Full Editor — $19 Launch Special`（指向 `/pricing`），次级 CTA `Try free PDF tools`（指向 `/remove-pages`）。
- **Schema**：`BlogPosting`。
- **竞品参考**：updf.com, pcworld.com, trywithus.com (来源：Yahoo SERP 代理)。

### `/blog/no-subscription-pdf-editor`
- **定位**：精准匹配反订阅、寻找一次性购买选项的用户。
- **主词**：`no subscription PDF editor` (SEMRUSH: 70, CPC $2.95)。
- **H1**：`No-Subscription PDF Editors: Free and One-Time-Pay Options`。
- **CTA**：`Get Full Editor — $19 Launch Special`（指向 `/pricing`），次级 CTA `Try Remove Pages`（指向 `/remove-pages`）。
- **Schema**：`BlogPosting`。
- **竞品参考**：pdfedit.com, docfly.com, sejda.com (来源：Yahoo SERP 代理)。

---

## SEO 备注（基于 keyword-research-v1.md）

下表为 5 个工具页的高价值主词与建议 H1。当前 `route-contract.json` 与 `page-matrix.md` 总表保留设计 handoff 的 H1，下发给前端时可选择性应用这些建议。

| 路由 | 当前 H1 | SEO 建议 H1 | 高价值主词（Vol / CPC） | 备注 |
|---|---|---|---|---|
| `/remove-pages` | Remove PDF Pages Online | Remove PDF Pages Online – Free & No Sign-Up | `remove pdf pages` (27,100 / $1.48), `delete pages from pdf` (27,100 / $1.48) | 主词量级高，建议拥有 "free & no sign-up" 差异化卖点 |
| `/merge` | Merge PDFs Online | Merge PDF Files Online – Free PDF Combiner | `merge pdf` (165,000 / $0.86), `combine pdf files` (6,600 / $1.94), `merge pdf online` (2,900 / $1.11) | 搜索量最大的工具页，建议强化 "combine" 同义词 |
| `/compress` | Compress PDF Online | Compress PDF – Reduce File Size Without Losing Quality | `compress pdf` (135,000 / $1.02), `reduce pdf size` (33,100 / $1.25), `compress pdf online` (3,600 / $1.44) | 可优化 "reduce pdf size" 长尾，突出高质量压缩 |
| `/sign` | Sign PDF Online | Sign PDF Online Free – Add Signature in Seconds | `sign pdf` (14,800 / $3.36), `sign pdf online` (8,100 / $3.81), `electronic signature pdf` (2,900 / $5.20) | CPC 极高，建议突出 "free" 与 "seconds" |
| `/convert-to-word` | Convert PDF to Word | Convert PDF to Word Online – Free DOCX Converter | `convert pdf to word` (90,500 / $2.70), `pdf to word converter` (60,500 / $2.04), `pdf to word online` (590 / $1.52) | 量级大且付费转化高，建议 Title/H1 不要仅使用品牌名 |

待确认：
- Google SERP 数据以 Yahoo 代理获取，实际 Google 结果可能存在差异，建议上线前手动验证 5 个工具页的实际排名 [NEEDS_SOURCE_CHECK]。
- 建议 H1 是否覆盖当前设计 H1，需前端阶段评估导航宽度与品牌一致性后确认 [NEEDS_DECISION]。

## 下一步
- 03 定价：确认 `$19 Launch Special` 是否保留，并按此统一首页、pricing、checkout 的 CTA 价格；同时确认博客文章中的价格提法与pricing一致。
- 04 合规：填充 `/privacy`、`/terms`、`/refund` 内容，并修正 Footer 链接。
- 08 后端：按 `data-contract.md` 实现文件处理与授权校验。
- 09 内容：制定博客文章上线计划，确认是静态页面还是 CMS，并为每篇文章写第一稿。
