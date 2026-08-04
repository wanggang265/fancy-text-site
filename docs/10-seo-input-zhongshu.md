# 10 SEO 输入 — zhongshu Re-QA 线上检查摘要

> 本文件由 zhongshu 在 09 QA 复测阶段生成，作为 10 SEO agent 的输入之一。  
> 生成时间：2026-08-04  
> 对应 commit：frontend `30d6c56`；project-control `adc1c3e`  
> 线上环境：https://removepdfpages.net

---

## 一、项目基础信息

| 项目 | 值 |
|---|---|
| 域名 | https://removepdfpages.net |
| 当前阶段 | 10-seo（09 QA 已 GO with residual issues） |
| 目标市场 | US / English |
| 商业模式 | Freemium + 订阅（$19/month、$99/year）+ 隐藏一次性买断 $59 + Top-up credits |
| 可索引页面数 | 18（见 sitemap） |
| noindex 页面 | `/checkout`, `/success`（robots.txt 已 disallow） |
| 当前问题数 | 5 个 SEO 配置类问题 + 1 个 GSC 待确认项 |

---

## 二、已验证状态

### 2.1 Sitemap / robots.txt

- `sitemap.xml`：200，包含 18 个 URL，均为 indexable 页面；不含 `/checkout`、`/success`、`/login`。
- `robots.txt`：200，允许搜索索引，禁止 AI 训练爬虫，禁止 `/checkout`、`/success`；未禁止 `/login`。
- 所有 sitemap URL 已 curl 验证返回 200。

### 2.2 页面矩阵 SEO 元数据检查

| Route | Title | H1 | Description | Canonical | Schema | Index | 备注 |
|---|---|---|---|---|---|---|---|
| `/` | RemovePDFPages — Free PDF Tools & Full Editor | Free PDF Tools in Your Browser | ✅ 唯一 | ✅ / | ✅ WebSite | yes | em dash 因缺少 charset 显示乱码 |
| `/remove-pages` | Remove PDF Pages Online \| RemovePDFPages | Remove PDF Pages Online | ✅ | ✅ | ✅ SoftwareApplication | yes | 无异常 |
| `/merge` | Merge PDFs Online \| RemovePDFPages | Merge PDFs Online | ✅ | ✅ | ✅ SoftwareApplication | yes | 无异常 |
| `/compress` | Compress PDF Online \| RemovePDFPages | Compress PDF Online | ✅ | ✅ | ✅ SoftwareApplication | yes | 无异常 |
| `/sign` | Sign PDF Online \| RemovePDFPages | Sign PDF Online | ✅ | ✅ | ✅ SoftwareApplication | yes | 无异常 |
| `/convert-to-word` | Convert PDF to Word Online \| RemovePDFPages | Convert PDF to Word | ✅ | ✅ | ✅ SoftwareApplication | yes | H1 与 page-matrix 要求不一致 |
| `/pricing` | Pricing \| RemovePDFPages | Simple subscription pricing... | ✅ | ✅ | ✅ Product | yes | 无异常 |
| `/faq` | FAQ \| RemovePDFPages | Help & FAQs | ✅ | ✅ | ✅ FAQPage | yes | 无异常 |
| `/contact` | Contact & Refund \| RemovePDFPages | Contact & Refund | ✅ | ✅ | ✅ ContactPage | yes | 无异常 |
| `/blog` | PDF Tools & Editing Tips \| RemovePDFPages Blog | RemovePDFPages Blog | ✅ | ✅ | ✅ Blog | yes | 无异常 |
| `/blog/foxit-alternative` | ✅ | ✅ | ✅ | ✅ | ✅ BlogPosting | yes | 无异常 |
| `/blog/replace-image-in-pdf` | ✅ | ✅ | ✅ | ✅ | ✅ BlogPosting | yes | 无异常 |
| `/blog/one-time-payment-pdf-editor` | ✅ | ✅ | ✅ | ✅ | ✅ BlogPosting | yes | 无异常 |
| `/blog/no-subscription-pdf-editor` | ✅ | ✅ | ✅ | ✅ | ✅ BlogPosting | yes | 无异常 |
| `/privacy` | Privacy Policy - RemovePDFPages | Privacy Policy | ✅ | ✅ | ❌ 无 schema | yes | 建议补 WebPage |
| `/terms` | Terms of Service - RemovePDFPages | Terms of Service | ✅ | ✅ | ❌ 无 schema | yes | 建议补 WebPage |
| `/refund` | Refund Policy - RemovePDFPages | Refund Policy | ✅ | ✅ | ❌ 无 schema | yes | 建议补 WebPage |
| `/cookie-policy` | Cookie Policy - RemovePDFPages | Cookie Policy | ✅ | ✅ | ❌ 无 schema | yes | 建议补 WebPage |
| `/checkout` | Checkout \| RemovePDFPages | Get the Full Editor | ✅ | ✅ | ✅ WebPage | noindex | robots.txt 已禁止 |
| `/success` | Thank You \| RemovePDFPages | Welcome to the Full Editor | ✅ | ✅ | ✅ WebPage | noindex | robots.txt 已禁止 |
| `/login` | 与首页完全相同 | 无 H1 | 与首页完全相同 | 指向首页 `/` | 无 | noindex: False | **严重问题** |

### 2.3 Schema 样例

首页 `WebSite`：
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RemovePDFPages",
  "url": "https://removepdfpages.net/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://removepdfpages.net/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

工具页 `SoftwareApplication` 示例：
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "RemovePDFPages Remove Pages",
  "applicationCategory": "BrowserApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

Pricing `Product`：包含 Full Editor 产品、多个 Offer（$19/month、$99/year、$59 one-time）。

FAQ `FAQPage`：包含 10+ 问答对，覆盖价格、退款、账户、设备、Convert to Word 额度等。

---

## 三、已发现的 SEO 问题（需 10 SEO 处理）

### P1 — 建议修复后再提交 GSC

1. **Content-Type 响应头缺少 `charset=utf-8`**
   - 现象：`curl -I https://removepdfpages.net/` 返回 `Content-Type: text/html`，无 charset。
   - 后果：标题和描述中的 em dash（—）在某些解析器中被显示为乱码（如 `RemovePDFPages â Free PDF Tools`）。
   - 修复建议：在 Cloudflare Workers 或 Pages 配置中追加 `; charset=utf-8`。
   - 影响范围：全站所有 HTML 页面。

2. **OG 标签全局复用首页内容**
   - 现象：`/pricing`、`/blog/foxit-alternative` 等所有检查页面的 `og:title`、`og:description`、`og:image` 均与首页相同。
   - 后果：社交分享和外部引用时无法准确展示页面内容，影响 CTR 和品牌一致性。
   - 修复建议：为每个页面生成唯一的 OG title / description / image，或至少使用各页面的 title/description 作为 fallback。
   - 检查页面：所有 indexable 页面（工具页、博客、法律页等）。

3. **`/login` 页面 SEO 配置错误**
   - 现象：
     - title 和 description 与首页完全相同；
     - canonical 指向 `https://removepdfpages.net`（首页）；
     - 无 `<h1>`；
     - 未设置 `noindex`。
   - 后果：可能造成重复内容，稀释首页权重，且登录页本不应被索引。
   - 修复建议：
     - 添加 `<meta name="robots" content="noindex, nofollow">`；
     - 移除 canonical 或改为 self-canonical；
     - 设置独立的 title（如 `Sign In | RemovePDFPages`），或至少与首页不同；
     - 添加 `<h1>Sign In</h1>` 或类似标题。
   - 同时建议将 `/login` 加入 `robots.txt` 的 `Disallow` 列表。

### P2 — 优化项

4. **法律页面缺少 Schema.org 结构化数据**
   - 现象：`/privacy`、`/terms`、`/refund`、`/cookie-policy` 无 JSON-LD。
   - 建议：补充 `WebPage` 或 `LegalService` schema，至少包含 `name`、`url`、`description`。

5. **`/convert-to-word` H1 与 page-matrix 不一致**
   - 当前 H1：`Convert PDF to Word`
   - page-matrix 要求：`Convert PDF to Word Online`
   - 建议：统一为 page-matrix 版本，或确认文案 freeze 已更新。

6. **首页 `WebSite` schema 的 `SearchAction` 指向 `/search`**
   - 当前站内无 `/search` 页面，可能产生 404 内部链接风险。
   - 建议：移除 `potentialAction` 或实现搜索页。

---

## 四、待确认项（需用户或权限）

### 7. Google Search Console / Bing Webmaster Tools
- 状态：未知是否已完成站点验证和 sitemap 提交。
- 需要：GSC 和 Bing Webmaster 的访问权限或已验证的站点所有权。
- 建议：如 10 SEO agent 有权限，提交 `https://removepdfpages.net/sitemap.xml` 并请求索引核心页面（`/`, `/remove-pages`, `/merge`, `/compress`, `/convert-to-word`, `/pricing`, `/faq`, `/blog/foxit-alternative`）。
- 如无权限，输出 `[BLOCKED]` 并列出需要用户完成的步骤。

---

## 五、关键词与内容建议（来自 keyword-research-v1.md）

高优先级工具页关键词：
- `/merge`：`merge pdf`（165K vol）、`combine pdf files`（6.6K）
- `/compress`：`compress pdf`（135K vol）、`reduce pdf size`（33.1K）
- `/convert-to-word`：`convert pdf to word`（90.5K vol）、`pdf to word converter`（60.5K）
- `/remove-pages`：`remove pdf pages`（27.1K vol）
- `/sign`：`sign pdf`（14.8K vol，CPC 高）

博客内容关键词：
- `/blog/foxit-alternative`：Foxit alternative（810 vol）
- `/blog/replace-image-in-pdf`：replace image in PDF（280 vol）
- `/blog/one-time-payment-pdf-editor`：one-time payment PDF editor（80 vol）
- `/blog/no-subscription-pdf-editor`：no subscription PDF editor（70 vol）

当前页面矩阵和标题已基本覆盖这些关键词，10 SEO 阶段重点应放在技术 SEO、GSC 提交和 AI 可引用结构优化。

---

## 六、给 10 SEO agent 的输出要求

1. 读取本文件和 `docs/page-matrix.md`、`docs/keyword-research-v1.md`。
2. 按 `seo-launch-workflow` 完成页面矩阵对账、indexability、技术 SEO、GSC 提交、GEO/AEO 检查。
3. 修复 P1 问题（charset、OG 标签、/login noindex）。
4. 可选优化 P2（法律页 schema、H1 对齐、SearchAction）。
5. 输出 `docs/10-seo-report.md`，包含：
   - 当前结论（[DONE] / [BLOCKED] / [NEEDS_REVIEW]）
   - 已修复项与未修复项
   - GSC / Bing 提交状态
   - 下游交接摘要
6. 任何涉及生产部署或第三方平台（GSC）的操作，先列确认项，不要擅自执行。
