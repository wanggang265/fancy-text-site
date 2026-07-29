# RemovePDFPages — Page Matrix v2 (Post-MVP Expansion)

> 项目：removepdfpages.net  
> 状态：Post-MVP / Launch 后扩展  
> 最后更新：2026-07-23  
> 维护者：zhongshu

---

## 说明

本矩阵包含 **MVP 之后** 需要补充的扩展页面。MVP 阶段只上线 11 个核心页面（见 `docs/page-matrix.md`）。

扩展页分为三类：
1. **工具长尾变体页**：同一功能的不同关键词入口
2. **场景/教程页**：How-to 型内容，承接信息型搜索
3. **博客内容页**：商业调查型 + 教程型文章

---

## 一、工具长尾变体页

基于 `docs/keyword-research-v1.md` 中每个工具的主词 2/3。

| 核心工具页 | 变体路由 | 目标关键词 | 搜索量 | CPC | 策略 |
|---|---|---|---|---|---|
| `/remove-pages` | `/delete-pages-from-pdf` | delete pages from pdf | 27,100 | $1.48 | 301 或 canonical 到 `/remove-pages`；若独立页面需独特 H1 |
| `/remove-pages` | `/remove-pages-from-pdf-online` | remove pages from pdf online | 1,000 | $1.40 | 长尾入口 |
| `/merge` | `/combine-pdf-files` | combine pdf files | 6,600 | $1.94 | 高价值变体，建议独立页 |
| `/merge` | `/merge-pdf-online` | merge pdf online | 2,900 | $1.11 | 长尾入口 |
| `/compress` | `/reduce-pdf-size` | reduce pdf size | 33,100 | $1.25 | 高价值变体，建议独立页 |
| `/compress` | `/compress-pdf-online` | compress pdf online | 3,600 | $1.44 | 长尾入口 |
| `/sign` | `/sign-pdf-online` | sign pdf online | 8,100 | $3.81 | 高 CPC，建议独立页 |
| `/sign` | `/electronic-signature-pdf` | electronic signature pdf | 2,900 | $5.20 | 高 CPC，建议独立页 |
| `/convert-to-word` | `/pdf-to-word-converter` | pdf to word converter | 60,500 | $2.04 | 最高优先级变体 |
| `/convert-to-word` | `/pdf-to-word-online` | pdf to word online | 590 | $1.52 | 长尾入口 |

**实现建议**：
- 高优先级（搜索量 > 10K 或 CPC > $3）：`/combine-pdf-files`、`/reduce-pdf-size`、`/pdf-to-word-converter`、`/sign-pdf-online`
- 低优先级可 301 到核心工具页
- 变体页复用核心工具页 UI，但 H1 / Title / Meta 按关键词定制

---

## 二、场景/教程页（How-to）

| 路由 | 标题/H1 | 目标关键词 | 类型 | 优先级 |
|---|---|---|---|---|
| `/how-to-delete-pages-from-pdf` | How to Delete Pages from a PDF (Free, No Sign-Up) | how to delete pages from pdf | Tutorial | P1 |
| `/how-to-merge-pdf-files` | How to Merge PDF Files Online for Free | how to merge pdf files | Tutorial | P1 |
| `/how-to-reduce-pdf-file-size` | How to Reduce PDF File Size Without Losing Quality | how to reduce pdf file size | Tutorial | P1 |
| `/how-to-sign-pdf-online` | How to Sign a PDF Online for Free | how to sign pdf online | Tutorial | P2 |
| `/how-to-convert-pdf-to-word` | How to Convert PDF to Word Online | how to convert pdf to word | Tutorial | P1 |

**实现建议**：
- 可以用 blog 文章模板实现，但放在根路由以承接工具型搜索
- 每页必须包含实际工具入口或回到核心工具页的 CTA

---

## 三、博客内容页

| 路由 | 标题/H1 | 目标关键词 | 类型 | 优先级 |
|---|---|---|---|---|
| `/blog` | RemovePDFPages Blog | pdf tools blog | Index | P1 |
| `/blog/foxit-alternative` | Foxit Alternatives to Consider in 2026 | Foxit alternative | Commercial Investigation | P1 |
| `/blog/replace-image-in-pdf` | How to Replace an Image in a PDF Without Adobe Acrobat | replace image in PDF | Tutorial | P2 |
| `/blog/one-time-payment-pdf-editor` | One-Time Payment PDF Editors Compared | one-time payment pdf editor | Commercial Investigation | P1 |
| `/blog/no-subscription-pdf-editor` | No-Subscription PDF Editors: Free and One-Time-Pay Options | no subscription pdf editor | Commercial Investigation | P1 |
| `/blog/reduce-pdf-file-size-without-losing-quality` | How to Reduce PDF File Size Without Losing Quality (5 Free Ways) | how to reduce pdf file size without losing quality | Tutorial | P2 |

**实现建议**：
- 静态页面（Next.js `generateStaticParams`）
- 统一 CTA：`Get Full Editor — $19 Launch Special` → `/pricing`
- 竞品对比文章必须加 `not affiliated with` 声明

---

## 四、总扩展优先级

### P1（上线后 30 天内）
1. `/pdf-to-word-converter`
2. `/combine-pdf-files`
3. `/reduce-pdf-size`
4. `/blog/one-time-payment-pdf-editor`
5. `/blog/no-subscription-pdf-editor`
6. `/blog/foxit-alternative`

### P2（上线后 60 天内）
1. `/sign-pdf-online`
2. `/delete-pages-from-pdf`
3. `/how-to-*` 教程系列
4. `/blog/replace-image-in-pdf`
5. `/blog/reduce-pdf-file-size-without-losing-quality`

### P3（上线后 90 天内）
1. 剩余长尾变体页
2. 更多教程/场景页
3. 竞品对比矩阵页

---

## 五、对 MVP 的影响

- **MVP 不阻塞**：这些页面不上线不影响核心转化路径。
- **但需预留路由结构**：Next.js `app/` 目录下应规划 `/blog/[slug]`、`/[tool-variant]` 等结构，避免后期重构。
- **Sitemap / robots.txt**：MVP 阶段不包含这些 URL，但上线后需批量添加。

---

## 六、与 MVP 文档的关系

- `docs/page-matrix.md`：MVP 11 页
- `docs/page-matrix-v2.md`：本文件，Post-MVP 扩展页
- `docs/content-roadmap.md`：上线后内容发布节奏
- `docs/copy-freeze.md`：MVP 文案；博客/扩展页文案可在需要时从 copy-freeze v2 中复用或另建 `copy-freeze-v2-post-mvp.md`
