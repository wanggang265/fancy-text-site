# 10-seo 阶段验收报告 — RemovePDFPages

> 项目：removepdfpages.net  
> 目标市场：US / English  
> 阶段：10-seo（上游 09 QA 已 GO with residual issues）  
> 线上环境：https://removepdfpages.net  
> 仓库：/home/ubuntu/fancy-text-site  
> 报告生成时间：2026-08-04  
> 本地构建产物：dist/（Next.js static export, trailingSlash: false）  

---

## 1. 执行摘要

| 检查项 | 状态 | 说明 |
|---|---|---|
| 本地代码修复 | ✅ 完成 | 已修复 zhongshu Re-QA 发现的全部 SEO 配置类问题 |
| 本地构建 | ✅ 通过 | `npm run build` 通过，26 个路由静态导出 |
| 本地 dist 验证 | ✅ 通过 | 18 个 indexable 页面 title/description/canonical/OG/H1/schema 全部对齐 page-matrix |
| 线上环境验证 | ⚠️ 阻塞 | 线上仍为旧版本（Cloudflare HIT），新 header/OG/login 元数据未生效 |
| GSC / Bing 提交 | ⏸️ 未执行 | 需要站点所有权 / 第三方平台权限 |

**当前结论：[BLOCKED]** — 代码与本地构建已就绪，但生产部署和第三方平台操作未执行，需前端维护者与有权限的账户所有者完成。

---

## 2. Indexable 页面清单

`sitemap.ts` 输出 18 个 indexable URL，`robots.txt` 允许索引：`User-Agent: * Allow: /`。

| # | 路由 | 页面类型 | Title | H1 | Schema | 优先级 |
|---|---|---|---|---|---|---|
| 1 | `/` | Home | RemovePDFPages — Free PDF Tools & Full Editor | Free PDF Tools in Your Browser | WebSite | 1.0 |
| 2 | `/remove-pages` | Tool (free) | Remove PDF Pages Online \| RemovePDFPages | Remove PDF Pages Online | SoftwareApplication | 0.9 |
| 3 | `/merge` | Tool (free) | Merge PDFs Online \| RemovePDFPages | Merge PDFs Online | SoftwareApplication | 0.9 |
| 4 | `/compress` | Tool (free) | Compress PDF Online \| RemovePDFPages | Compress PDF Online | SoftwareApplication | 0.9 |
| 5 | `/sign` | Tool (free) | Sign PDF Online \| RemovePDFPages | Sign PDF Online | SoftwareApplication | 0.9 |
| 6 | `/convert-to-word` | Tool (paid) | Convert PDF to Word Online \| RemovePDFPages | Convert PDF to Word Online | SoftwareApplication | 0.9 |
| 7 | `/pricing` | Conversion | Pricing \| RemovePDFPages | Simple subscription pricing. One-time option available. | Product | 0.9 |
| 8 | `/faq` | Support | FAQ \| RemovePDFPages | Frequently Asked Questions | FAQPage | 0.7 |
| 9 | `/contact` | Support | Contact & Refund \| RemovePDFPages | Contact & Refund | ContactPage | 0.6 |
| 10 | `/blog` | Content | PDF Tools & Editing Tips \| RemovePDFPages Blog | RemovePDFPages Blog | Blog | 0.7 |
| 11 | `/blog/foxit-alternative` | Content | Foxit Alternatives to Consider in 2026 \| RemovePDFPages | Foxit Alternatives to Consider in 2026 | BlogPosting | 0.6 |
| 12 | `/blog/replace-image-in-pdf` | Content | How to Replace an Image in a PDF Without Adobe Acrobat \| RemovePDFPages | How to Replace an Image in a PDF Without Adobe Acrobat | BlogPosting | 0.6 |
| 13 | `/blog/one-time-payment-pdf-editor` | Content | One-Time Payment PDF Editors Compared \| RemovePDFPages | One-Time Payment PDF Editors Compared | BlogPosting | 0.6 |
| 14 | `/blog/no-subscription-pdf-editor` | Content | No-Subscription PDF Editors: Free, Budget, and One-Time-Pay Options \| RemovePDFPages | No-Subscription PDF Editors: Free, Budget, and One-Time-Pay Options | BlogPosting | 0.6 |
| 15 | `/privacy` | Legal | Privacy Policy - RemovePDFPages | Privacy Policy | WebPage | 0.4 |
| 16 | `/terms` | Legal | Terms of Service - RemovePDFPages | Terms of Service | WebPage | 0.4 |
| 17 | `/refund` | Legal | Refund Policy - RemovePDFPages | Refund Policy | WebPage | 0.4 |
| 18 | `/cookie-policy` | Legal | Cookie Policy - RemovePDFPages | Cookie Policy | WebPage | 0.4 |

### Noindex / Disallow 页面

| 路由 | 状态 | robots.txt | 备注 |
|---|---|---|---|
| `/checkout` | noindex, nofollow | Disallow | 交易页，不上索引 |
| `/success` | noindex, nofollow | Disallow | 交易成功页，不上索引 |
| `/login` | noindex, nofollow | Disallow | 登录页，已修复并加入 Disallow |

---

## 3. robots.txt / sitemap.xml 状态

### robots.txt（由 `app/robots.ts` 生成）

```
User-Agent: *
Allow: /
Disallow: /checkout
Disallow: /success
Disallow: /login

Sitemap: https://removepdfpages.net/sitemap.xml
```

- ✅ 允许所有爬虫索引根域
- ✅ 禁止 `/checkout`、`/success`、`/login`
- ✅ 指向线上 sitemap

### sitemap.xml（由 `app/sitemap.ts` 生成）

- ✅ 包含 18 个 indexable URL
- ✅ 不包含 `/checkout`、`/success`、`/login`
- ✅ `lastModified` 统一为 2026-08-04
- ✅ 工具页/首页优先级 0.9–1.0，法律页 0.4，博客 0.6–0.7

### 线上验证

```bash
curl -sI https://removepdfpages.net/sitemap.xml  # HTTP/2 200
curl -sI https://removepdfpages.net/robots.txt    # HTTP/2 200
```

---

## 4. Schema / OG / Metadata 检查

### 4.1 结构化数据（JSON-LD）

| 页面 | Schema 类型 | 状态 |
|---|---|---|
| `/` | WebSite | ✅ |
| `/remove-pages`, `/merge`, `/compress`, `/sign` | SoftwareApplication + free Offer | ✅ |
| `/convert-to-word` | SoftwareApplication + paid Offer ($19/month) | ✅ |
| `/pricing` | Product + multiple Offers | ✅ |
| `/faq` | FAQPage (10+ Q&A) | ✅ |
| `/contact` | ContactPage | ✅ |
| `/blog` | Blog | ✅ |
| `/blog/*` | BlogPosting | ✅ |
| `/privacy`, `/terms`, `/refund`, `/cookie-policy` | WebPage | ✅ 已补 |
| `/checkout`, `/success` | WebPage (noindex) | ✅ |

### 4.2 Open Graph / Twitter Cards

- ✅ 每个 indexable 页面有唯一 `og:title`、`og:description`、`og:url`
- ✅ `og:type` 正确：首页 `website`，博客文章 `article`
- ✅ `og:image` 统一使用 `/og-home.png`（当前站点只有一张通用 OG 图）
- ✅ `twitter:card = summary_large_image`

### 4.3 Canonical / H1 / Title

- ✅ 每个 indexable 页面 `canonical` 与 `og:url` 一致，使用 `https://removepdfpages.net/{path}`（无尾部斜杠，与 `trailingSlash: false` 一致）
- ✅ 每个 indexable 页面有且仅有 1 个 `<h1>`，且与 page-matrix 一致
- ✅ `/faq` H1 已从 `Help & FAQs` 修正为 `Frequently Asked Questions`
- ✅ `/convert-to-word` H1 已从 `Convert PDF to Word` 修正为 `Convert PDF to Word Online`

### 4.4 Content-Type / charset

- ✅ 已在 `public/_headers` 为 `/*` 和 `/*.html` 添加 `Content-Type: text/html; charset=utf-8`
- ⚠️ 线上响应头仍为 `Content-Type: text/html`（无 charset），因 Cloudflare 缓存未刷新，待部署后 purge

---

## 5. 性能基础（未实测）

10-seo 阶段未运行 Lighthouse / WebPageTest。建议 11-launch 前补充：

1. 首页 `/` LCP < 2.5s（当前 hero 图片较大）
2. `/remove-pages` 等工具页 TTI（PDF.js worker 体积 ~1.2 MB）
3. 启用 `_next/static/*` 长期缓存（已在 `_headers` 配置 `public, max-age=31536000, immutable`）
4. 缺失图片压缩 / WebP 版本

---

## 6. GSC / Bing Webmaster 状态

| 平台 | 状态 | 说明 |
|---|---|---|
| Google Search Console | ⏸️ 未提交 | 需要 removepdfpages.net 站点所有权权限 |
| Bing Webmaster Tools | ⏸️ 未提交 | 需要 Microsoft 账号权限（1gw471210@gmail.com） |
| IndexNow | ⏸️ 未配置 | 建议部署后生成随机 key 并提交 sitemap URLs |

### 待执行操作（需权限 / 用户确认）

1. 登录 GSC，添加属性 `https://removepdfpages.net`（推荐 DNS 验证）
2. 提交 sitemap：`https://removepdfpages.net/sitemap.xml`
3. 请求索引核心页面：`/`, `/remove-pages`, `/merge`, `/compress`, `/convert-to-word`, `/pricing`, `/faq`, `/blog/foxit-alternative`
4. 登录 Bing Webmaster Tools，完成站点验证
5. 生成 IndexNow key，部署 `{key}.txt` 到根目录，调用 IndexNow API 批量提交 18 个 URL

---

## 7. GEO / AEO 建议

1. **FAQPage 已就位**：`/faq` 包含 10+ 问答，可直接被 Google AI Overviews / Bing Chat 引用。建议上线后监控 GSC「查询」中带有 question 词根的点击。
2. **BlogPosting schema 已就位**：4 篇博客文章均标记 `BlogPosting`，适合作为长尾答案来源。
3. **HowTo schema 待补充**：工具页当前使用 `SoftwareApplication`，后续可为 `/remove-pages`、`/merge`、`/compress`、`/sign` 增加 `HowTo` 步骤结构化数据，提升 AI snippet 引用率。
4. **Answer 段落优化**：工具页 Features 列表已使用清晰步骤，但缺少显式的 step-by-step 段落。建议在 11-launch 后为每个工具页补充 3–5 步操作说明。
5. **本地化**：当前仅英文，无 hreflang。若未来扩展市场，再补充 `hreflang`。

---

## 8. 问题清单与修复状态

### P1 — 已修复（代码层面），待部署生效

| # | 问题 | 修复方式 | 文件 | 状态 |
|---|---|---|---|---|
| 1 | Content-Type 缺少 `charset=utf-8` | 在 `public/_headers` 为 `/*` 和 `/*.html` 追加 `; charset=utf-8` | `public/_headers` | ✅ 代码修复，待部署/purge |
| 2 | 全站 OG 标签复用首页内容 | 新增 `lib/seo.ts`，为每个页面生成独立 metadata/OG/Twitter | `lib/seo.ts`, 全部 `app/**/page.tsx` | ✅ 代码修复，待部署 |
| 3 | `/login` title/description 与首页相同、canonical 指向首页、无 H1、未 noindex | 新增 `app/login/layout.tsx` 使用 `buildNoIndexMetadata`；`robots.ts` 加入 `/login` Disallow；`LoginModal` 标题改为 `h2`；`/login` 页面增加 `sr-only` H1 | `app/login/layout.tsx`, `app/login/page.tsx`, `app/robots.ts`, `components/LoginModal.tsx` | ✅ 代码修复，待部署 |

### P2 — 已修复或确认

| # | 问题 | 修复方式 | 文件 | 状态 |
|---|---|---|---|---|
| 4 | 法律页面缺少 JSON-LD schema | 为 `/privacy`、`/terms`、`/refund`、`/cookie-policy` 添加 `WebPage` schema via `StructuredData` 组件 | `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/refund/page.tsx`, `app/cookie-policy/page.tsx` | ✅ 已修复 |
| 5 | `/convert-to-word` H1 与 page-matrix 不一致 | H1 从 `Convert PDF to Word` 改为 `Convert PDF to Word Online` | `app/convert-to-word/page.tsx` | ✅ 已修复 |
| 6 | 首页 `WebSite` schema `SearchAction` 指向 `/search` | 当前代码已无 `potentialAction`，schema 仅含 `name` 和 `url` | `app/page.tsx` | ✅ 不存在 |
| 7 | `/faq` H1 与 page-matrix 不一致 | H1 从 `Help & FAQs` 改为 `Frequently Asked Questions` | `app/faq/page.tsx` | ✅ 已修复 |

### P2 — 残留 / 不属于 SEO 阶段职责

| # | 问题 | 说明 | 建议处理阶段 |
|---|---|---|---|
| 8 | `app/privacy/page.tsx` / `app/refund/page.tsx` 存在 pre-existing lint errors（unescaped quotes） | 法律页正文引号未转义；内容未在本次 SEO 阶段修改 | 11-launch 前端返修 |
| 9 | `app/checkout/CheckoutForm.tsx`、`app/success/SuccessContent.tsx`、GoogleSignInButton 等 lint errors | 与 09 QA 残留 P2 问题一致 | 11-launch 前端返修 |
| 10 | `/success` license key 占位符、文案准确性 | 09 QA 残留 P2 #7/#8 | 11-launch 前端/后端返修 |
| 11 | 分析工具选型与隐私文案一致 | PRD / 09 QA 残留 P2 #12 | 11-launch 产品与合规 |
| 12 | 线上 Cloudflare 缓存未刷新 | 导致新 header / OG / login metadata 未生效 | 需部署后 purge cache |

---

## 9. 验收清单自检

| # | 检查项 | 结果 | 证据 |
|---|---|---|---|
| 1 | 所有 indexable 页面唯一 title / description / canonical | ✅ | 本地 dist 解析，18/18 一致 |
| 2 | 所有 indexable 页面唯一 OG title / description / url | ✅ | 本地 dist 解析 |
| 3 | 所有 indexable 页面有且仅有一个 H1，且与 page-matrix 一致 | ✅ | 本地 dist 解析，包括 `/faq` 与 `/convert-to-word` 修正后 |
| 4 | 所有 indexable 页面有对应 JSON-LD schema | ✅ | 本地 dist 解析 |
| 5 | `/checkout`、`/success`、`/login` noindex 且 robots.txt Disallow | ✅ | `app/robots.ts` + 页面 robots meta |
| 6 | `sitemap.xml` 只包含 indexable 页面 | ✅ | 18 个 URL |
| 7 | `robots.txt` 指向正确 sitemap | ✅ | `https://removepdfpages.net/sitemap.xml` |
| 8 | `_headers` 已配置 `text/html; charset=utf-8` | ✅ | `public/_headers` |
| 9 | `npm run build` 通过 | ✅ | 构建成功，26 个静态页面 |
| 10 | 未引入新的 lint errors | ✅ | `lib/seo.ts` 空 interface 已修复；其余 lint errors 均为 pre-existing |
| 11 | 未修改业务逻辑 / 支付流程 / 定价数字 | ✅ | 仅修改 metadata、schema、headers、H1、login 元数据 |
| 12 | GSC / Bing 已提交 | ⏸️ | 需要权限，未执行 |

---

## 10. 下游交接摘要

### 10.1 必须完成的阻塞项（进入 11-launch 前）

1. **生产部署 + 缓存刷新**
   - Owner：前端维护者
   - 操作：`git push` / `deploy.sh` 部署到 Cloudflare Worker；然后在 Cloudflare Dashboard 执行 Purge Everything
   - 验证：`curl -I https://removepdfpages.net/` 应返回 `Content-Type: text/html; charset=utf-8`；`curl -I https://removepdfpages.net/login` 应返回 robots noindex 相关 meta（HTML 中 `<meta name="robots" content="noindex, nofollow">`）

2. **GSC / Bing Webmaster / IndexNow**
   - Owner：有站点所有权的用户或运营
   - 操作：
     - GSC 验证站点 → 提交 sitemap → 请求索引 8 个核心 URL
     - Bing Webmaster 验证站点 → 提交 sitemap
     - 生成 IndexNow key，部署 `{key}.txt` 到根目录，调用 API 提交 18 个 URL
   - 验证：GSC「站点地图」显示成功抓取；Bing 显示已提交

### 10.2 建议带入 11-launch 的 P2

- 修复 pre-existing lint errors（法律页引号转义、checkout/success 组件）
- 替换 `/success` 硬编码 license key 占位符
- 修正 `/success` 文案（subscription vs onetime vs topup）
- 确定分析工具并同步 Privacy/Terms/Cookie Policy
- 大文件 / 多页 PDF 转换超时验证
- 订阅到期降级验证

### 10.3 本阶段产出文件

- `lib/seo.ts` — SEO metadata 构建工具
- `app/login/layout.tsx` — login noindex metadata
- `public/_headers` — charset 响应头
- `app/sitemap.ts` — 动态 sitemap
- `app/robots.ts` — 动态 robots.txt
- 各页面 `page.tsx` 已接入 `buildMetadata` / `StructuredData`
- `docs/10-seo-report.md` — 本报告

---

## 11. 结论

**[BLOCKED]**

10-seo 阶段所有代码层面修复已完成并通过本地构建验证。当前被阻塞的原因：

1. **生产部署与 Cloudflare 缓存刷新未执行** — 线上环境仍为旧版本，新 header、OG 标签、`/login` noindex 等未生效。
2. **GSC / Bing Webmaster / IndexNow 提交未执行** — 需要站点所有权或第三方平台登录权限。

进入 11-launch 前，必须由前端维护者完成部署并 purge 缓存，由有权限的用户完成 GSC/Bing 提交。
