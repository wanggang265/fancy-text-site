# RemovePDFPages — Page Matrix v3

> 本矩阵基于 `docs/copy-freeze.md` v3、`design-handoff-v3/DESIGN.md` v3、`docs/pricing-calibration-v3.md`。所有 indexable 页面均需满足：唯一主词、清晰 H1、单一 Primary CTA、对应 Schema、完整 canonical。法律页内容已在 04 compliance v3 冻结。
> 最后更新：2026-07-29  
> 依据：05 copy-freeze v3 / 06 design-freeze v3

---

## 总表

| Route | Segment | Title | H1 | Main Keyword | Meta Description | Primary CTA | Schema | Index |
|---|---|---|---|---|---|---|---|---|
| `/` | home | RemovePDFPages — Free PDF Tools & Full Editor | Free PDF Tools in Your Browser | free pdf tools | Delete pages, merge, compress, and sign PDFs in your browser. Subscribe to the Full Editor from $19/month or buy a one-time license for $59 and convert PDF to Word. | Try Remove Pages — free | WebSite + Organization | yes |
| `/remove-pages` | tool-free | Remove PDF Pages Online \| RemovePDFPages | Remove PDF Pages Online | remove pdf pages online | Delete pages from any PDF online. Select the pages you want to remove, then download the rest. No upload needed — processed in your browser. | Upload PDF | SoftwareApplication | yes |
| `/merge` | tool-free | Merge PDFs Online \| RemovePDFPages | Merge PDFs Online | merge pdf online | Combine multiple PDFs into one file online. Drag and drop to reorder pages, then download your merged PDF. No signup required. | Upload PDFs | SoftwareApplication | yes |
| `/compress` | tool-free | Compress PDF Online \| RemovePDFPages | Compress PDF Online | compress pdf online | Reduce PDF file size online. Choose a compression level, then download a smaller file. No signup, no watermark. | Upload PDF | SoftwareApplication | yes |
| `/sign` | tool-free | Sign PDF Online \| RemovePDFPages | Sign PDF Online | sign pdf online | Add a handwritten signature to any PDF online. Draw your signature, place it on the page, and download the signed file. No signup required. | Upload PDF | SoftwareApplication | yes |
| `/convert-to-word` | tool-paid | Convert PDF to Word Online \| RemovePDFPages | Convert PDF to Word Online | convert pdf to word | Convert PDFs to editable Word documents. Free users get 3 conversions per 30 days; paid plans include 10 per month. Files are deleted within 1 hour. | Get Full Editor — $19/month Launch Special | SoftwareApplication | yes |
| `/pricing` | conversion | Pricing \| RemovePDFPages | Simple subscription pricing. One-time option available. | pdf editor pricing | RemovePDFPages pricing: free PDF tools and the Full Editor from $19/month or $99/year. One-time license $59. 14-day refund policy. | Get Full Editor — $19/month Launch Special | Product | yes |
| `/faq` | support | FAQ \| RemovePDFPages | Frequently Asked Questions | pdf tools help | Find answers to common questions about RemovePDFPages free tools, subscriptions, and the one-time license. | Browse pricing | FAQPage | yes |
| `/contact` | support | Contact & Refund \| RemovePDFPages | Contact & Refund | removepdfpages support | Get in touch with RemovePDFPages for support, questions, or refund requests. | Send message | ContactPage | yes |
| `/checkout` | transaction | Checkout \| RemovePDFPages | Get the Full Editor | — | Complete your purchase of the RemovePDFPages Full Editor. Choose monthly, yearly, or a one-time license. Secure checkout through Creem. | Subscribe — $19/month | WebPage | no |
| `/success` | transaction | Thank You \| RemovePDFPages | Welcome to the Full Editor | — | Thank you for subscribing to RemovePDFPages Full Editor or purchasing a one-time license. | Convert PDF to Word | WebPage | no |
| `/privacy` | legal | Privacy Policy - RemovePDFPages | Privacy Policy | removepdfpages privacy | RemovePDFPages privacy policy: how we handle your files, subscription data, and payments. | Contact Support | WebPage | yes |
| `/terms` | legal | Terms of Service - RemovePDFPages | Terms of Service | removepdfpages terms | RemovePDFPages terms of service, subscription terms, license agreement, and acceptable use policy. | Contact Support | WebPage | yes |
| `/refund` | legal | Refund Policy - RemovePDFPages | Refund Policy | removepdfpages refund | RemovePDFPages refund policy: 14-day refund for subscriptions and one-time licenses. Unused top-up credits refundable within 14 days. | Request refund | WebPage | yes |
| `/cookie-policy` | legal | Cookie Policy - RemovePDFPages | Cookie Policy | removepdfpages cookie policy | RemovePDFPages cookie policy: what cookies and analytics we use and how to manage preferences. | Contact Support | WebPage | yes |
| `/blog` | content | PDF Tools & Editing Tips \| RemovePDFPages Blog | RemovePDFPages Blog | pdf tools blog | Read PDF tips, tool comparisons, and PDF editor guides on the RemovePDFPages blog. | Browse articles | Blog | yes |
| `/blog/foxit-alternative` | content | Foxit Alternatives to Consider in 2026 \| RemovePDFPages | Foxit Alternatives to Consider in 2026 | Foxit alternative | Looking for a Foxit alternative? Compare browser-based PDF tools and subscription-free options before you choose a plan. | Get Full Editor — $19/month Launch Special | BlogPosting | yes |
| `/blog/replace-image-in-pdf` | content | How to Replace an Image in a PDF Without Adobe Acrobat \| RemovePDFPages | How to Replace an Image in a PDF Without Adobe Acrobat | replace image in PDF | Learn how to replace an image in a PDF without Adobe Acrobat. Compare browser-based tools and one-time license options. | Get Full Editor — $19/month Launch Special | BlogPosting | yes |
| `/blog/one-time-payment-pdf-editor` | content | One-Time Payment PDF Editors Compared \| RemovePDFPages | One-Time Payment PDF Editors Compared | one-time payment PDF editor | Compare one-time payment PDF editors. See which tools let you buy once and avoid subscriptions, including the RemovePDFPages $59 one-time license. | Get Full Editor — $19/month Launch Special | BlogPosting | yes |
| `/blog/no-subscription-pdf-editor` | content | No-Subscription PDF Editors: Free, Budget, and One-Time-Pay Options \| RemovePDFPages | No-Subscription PDF Editors: Free, Budget, and One-Time-Pay Options | no subscription PDF editor | Discover no-subscription PDF editors — free browser tools, budget options, and one-time payment licenses. Compare features before you choose a subscription. | Get Full Editor — $19/month Launch Special | BlogPosting | yes |

---

## 统一约束（07 frontend 必须落地）

1. **商业模式**：订阅制为主（Monthly $19 / Yearly $99）+ 隐藏一次性买断 $59。任何页面不得暗示 $19 是买断价。
2. **价格口径**：
   - `$19/month Launch Special`（原价 $29/month 删除线）
   - `$99/year`（原价 $149/year 删除线）
   - `$59 one-time license`（原价 $79 删除线）
   - `$5/10 conversions` 或 `$0.50 each` Top-up
3. **首页 Hero**：Primary CTA 必须指向 `/remove-pages`（免费工具），付费转化区仅在首页底部、`/pricing`、`/checkout`、`/convert-to-word`、博客 CTA 出现。
4. **Footer 法律链接**：`/privacy` / `/terms` / `/refund` / `/cookie-policy`（四链）。
5. **禁用词**：全站不得出现 `unlimited`, `free forever`, `no limits`, `lifetime updates`, `perfect`, `100% accurate`, `guaranteed`, `official`。
6. **Convert to Word**：免费 3 次/30 天；订阅/买断用户 10 次/月；超出 Top-up；文件后端临时保留 1 小时后删除。
7. **Sign**：必须显示免责声明："not a digital certificate signature and is not legally binding for regulated electronic-signing requirements."。
8. **支付披露**：Payments processed by Creem, our Merchant of Record. We do not store your card details. Sales tax/VAT/GST collected by Creem.
9. **退款**：14-day refund policy；已使用 credits / 支付处理费不退。
10. **技术栈**：Next.js App Router，静态导出（`output: 'export'`），工具页使用 `pdf-lib` 浏览器端处理；Convert to Word 必须走后端但需明确 1 小时 TTL。
11. **Schema**：工具页 `SoftwareApplication`（offers free），pricing `Product` + `Offer`，FAQ `FAQPage`，博客 `BlogPosting`，首页 `WebSite` + `Organization`。
12. **SEO 统一要求**：
    - Title 不得重复站点名（避免 `RemovePDFPages ... | RemovePDFPages`）。
    - 每个 indexable 页面有唯一 `<meta name="description">` 和 `<link rel="canonical">`。
    - Sitemap 只包含 indexable 页面；`/checkout` 和 `/success` 为 `noindex`。

---

## 07 frontend 交接清单

- [ ] 读取 `design-handoff-v3/` 全部设计文件、shared.css、route-mapping.json、navigation.md
- [ ] 读取 `docs/copy-freeze.md` v3 和本 `page-matrix.md` v3
- [ ] 读取 `docs/compliance-report.md` v3 和 `docs/pricing-calibration-v3.md`
- [ ] 读取 `docs/MVP-NOT-DO.md` 和 `AGENTS.md`（Next.js 版本警告）
- [ ] 实现全部 20 个路由页面，包含正确 metadata、schema、canonical
- [ ] 生成 `sitemap.xml` 和 `robots.txt`（只包含 indexable 路由）
- [ ] `npm run build` 通过，`dist/` 包含所有页面
- [ ] 移动端 375px 宽度无横向滚动、触控可用
- [ ] 提交 commit，部署到 Cloudflare Pages，curl 验证关键页面 200
- [ ] 输出 `07-frontend-handoff.md` 和部署摘要

---

## 上游待回填（不阻塞 07 实现，但必须标记 [待确认]）

1. **Creem 商户配置**：`/checkout` 当前使用 Creem 占位或表单模拟，真实支付需确认 webhook / 产品 ID / 目标国家。
2. **$19 Launch Special 截止日期**：文案中保留 "may end without notice"。
3. **分析工具选型**：Privacy/Cookie Policy 已预留占位，需上线前确认。
4. **后端方案**：Convert to Word 后端实现由 08 backend 负责，07 frontend 可先使用 mock 上传/转换状态。
