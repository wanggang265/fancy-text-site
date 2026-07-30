# RemovePDFPages — Design Handoff v4

> 项目：removepdfpages.net  
> 仓库路径：/home/ubuntu/fancy-text-site  
> 阶段：06 design-freeze (revised)  
> 状态：DONE  
> 上游输入：docs/copy-freeze.md v3、docs/PRD-v3.md、docs/pricing-calibration-v3.md、docs/compliance-report.md v3、docs/page-matrix-v2.md、docs/route-contract.json、docs/content-gap-report.md  
> 最后更新：2026-07-30  
> 输出路径：design-handoff-v4/  
> 方法：Stitch workflow — 以 design-handoff-v3 为输入包，保留所有文案，升级视觉系统。

---

## 1. 设计目标

解决 v3 视觉审计中的核心问题：

1. 工具页不再“白板”，引入点阵稿纸纹理、标尺边、品牌色块与微动效。  
2. 首页增加原创 Hero 插画（浏览器窗口、PDF 页面、剪刀、荧光笔、几何色块），避免“居中 Hero + 三卡片”的通用 SaaS 套路。  
3. 配色从“白+黑+靛蓝按钮”改为更鲜明的“暖色标记笔 + 深墨 + 橄榄成功色”。  
4. 字体使用 `Bricolage Grotesque`（Display）+ `Plus Jakarta Sans`（Body）+ `JetBrains Mono`（数据），避免默认 Inter。  
5. 所有文案、价格、CTA、合规声明均保留自 copy-freeze v3，未做改动。  
6. 覆盖 desktop / mobile 视图以及关键空/加载/错误/付费墙/已授权/成功状态。

---

## 2. 与 v3 的关键差异

| 项 | v3 | v4 |
|---|---|---|
| 视觉方向 | 简洁靛蓝 SaaS | 暖色标记笔 + 深墨 “Paper Workshop” |
| 主按钮色 | #3346a7 靛蓝 | #FF5722  marker 橙 |
| 显示字体 | system-ui / Space Grotesk | Bricolage Grotesque |
| 正文字体 | system-ui / Plus Jakarta Sans | Plus Jakarta Sans |
| Hero 视觉 | 抽象浏览器卡片 | 原创 SVG 插画 + 浮动色块 |
| 工具工作区 | 白底细边框 | 点阵稿纸背景 + 标尺边 + 深阴影 |
| 徽章 | pill | 贴纸式尖角 + 微倾斜 |
| 定价卡 | 靛蓝边框 | marker 色强调 + 悬浮微动效 |
| 微动效 | 基本 hover | 浮动、按钮按压、卡片悬浮、spinner |
| 文案 | copy-freeze v3 | 完全一致，未改动 |

---

## 3. 页面清单

所有 20 个页面均输出在 `pages/<route>/` 中：

| # | 页面 | 路由 | 文件 | 关键状态 |
|---|---|---|---|---|
| 1 | 首页 | `/` | `pages/home/` | 默认、首屏免费、底部付费转化 |
| 2 | Remove PDF Pages | `/remove-pages` | `pages/remove-pages/` | 空态、上传中、处理中、预览、成功、错误 |
| 3 | Merge PDFs | `/merge` | `pages/merge/` | 空态、上传中、排序、合并中、成功、错误 |
| 4 | Compress PDF | `/compress` | `pages/compress/` | 空态、上传中、处理中、成功、错误 |
| 5 | Sign PDF | `/sign` | `pages/sign/` | 空态、签名中、已放置、成功、错误 |
| 6 | Convert PDF to Word | `/convert-to-word` | `pages/convert-to-word/` | 未购买/已购买/额度用完/Top-up |
| 7 | Pricing | `/pricing` | `pages/pricing/` | 默认三卡片 + 隐藏买断 |
| 8 | Checkout | `/checkout` | `pages/checkout/` | 默认月付、空邮箱、支付失败 |
| 9 | Success | `/success` | `pages/success/` | 一次性/订阅成功 |
| 10 | FAQ | `/faq` | `pages/faq/` | 默认折叠 |
| 11 | Contact & Refund | `/contact` | `pages/contact/` | 默认、提交成功、提交错误 |
| 12 | Privacy Policy | `/privacy` | `pages/privacy/` | 静态文本 |
| 13 | Terms of Service | `/terms` | `pages/terms/` | 静态文本 |
| 14 | Refund Policy | `/refund` | `pages/refund/` | 静态文本 |
| 15 | Cookie Policy | `/cookie-policy` | `pages/cookie-policy/` | 静态文本 |
| 16 | Blog Index | `/blog` | `pages/blog/` | 默认列表 |
| 17 | Foxit Alternative | `/blog/foxit-alternative` | `pages/blog-foxit-alternative/` | 文章 |
| 18 | Replace Image in PDF | `/blog/replace-image-in-pdf` | `pages/blog-replace-image-in-pdf/` | 文章 |
| 19 | One-Time Payment PDF Editor | `/blog/one-time-payment-pdf-editor` | `pages/blog-one-time-payment-pdf-editor/` | 文章 |
| 20 | No-Subscription PDF Editor | `/blog/no-subscription-pdf-editor` | `pages/blog-no-subscription-pdf-editor/` | 文章 |

---

## 4. 设计系统摘要

### 4.1 颜色

- `--rpp-marker` #FF5722 — 主按钮、选中态、高亮、标签贴纸  
- `--rpp-marker-dark` #E64A19 — 按钮阴影 / hover  
- `--rpp-ink-900` #0f172a — 标题、正文、Footer 背景  
- `--rpp-olive` #65A30D — 免费、成功、勾选  
- `--rpp-amber` #F59E0B — 警告、Top-up、试用期  
- `--rpp-blue` #2563EB — 信息提示、链接辅助  
- `--rpp-red` #DC2626 — 错误  

### 4.2 字体

```css
--rpp-font-display: 'Bricolage Grotesque', 'Space Grotesk', sans-serif;
--rpp-font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
--rpp-font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### 4.3 纹理

- 点阵稿纸：`radial-gradient(circle, #cbd5e1 1px, transparent 1px)`，size 20px。用于 `.rpp-tool-card`、`.rpp-upload-zone`、`.rpp-sign-canvas`。  
- 标尺边：工具卡顶部 repeating-linear-gradient 刻度线 + 左侧 dashed 标尺。  
- 品牌色块：首页 Hero 插画两侧浮动几何色块（marker-light / olive-light），带 `rpp-float` 动画。  

### 4.4 微动效

- `.rpp-float`：Hero 色块 5–6s 上下浮动。  
- 按钮：hover `translateY(-2px)` + 阴影；active `translateY(1px)`。  
- 工具卡/定价卡：hover 悬浮 + 阴影加深。  
- 上传区：hover 上浮 + 边框色变化。  
- Spinner：0.8s 线性旋转。  

---

## 5. 前端 Handoff 注意事项

1. 字体必须从 Google Fonts 加载：`Bricolage Grotesque`（600/700/800）、`Plus Jakarta Sans`（400/500/600/700）、`JetBrains Mono`（400/500）。  
2. 颜色不可擅自改为默认靛蓝/紫色渐变；主 CTA 固定为 `#FF5722`。  
3. Hero 插画为内联 SVG，前端可直接复制或转为组件。  
4. 工具卡必须保留点阵稿纸纹理和标尺边；可降级为纯背景。  
5. 价格、CTA、合规文案与 copy-freeze v3 完全一致，禁止现场改写。  
6. Footer 四链法律链接：`/privacy`、`/terms`、`/refund`、`/cookie-policy`。  
7. 所有状态（empty/uploading/processing/preview/success/error/paywall/authorized/quota-exceeded）均已在对应页面中给出视觉参考。  
8. 全站禁用词与 v3 保持一致：无 `unlimited`、`free forever`、`no limits`、`lifetime updates`、`perfect`、`100% accurate`、`guaranteed`、`official`。  
9. 为 stitch 友好，页面结构与 v3 一致（`pages/<route>/code.html` + `styles.css` + `screen.png`），可被 `stitch-site-cli` 解析后转换为 Next.js 路由。  

---

## 6. 验收标准

- [x] 20 个页面均输出 HTML/CSS/Screenshot。  
- [x] `shared.css` 包含完整设计系统（颜色、字体、间距、圆角、阴影、纹理、动画、响应式）。  
- [x] 首页 Hero 使用原创 SVG 插画，非通用居中 Hero 模板。  
- [x] 工具页包含点阵纹理、标尺边、品牌色块。  
- [x] 所有 copy-freeze 文案、价格、CTA 未改动。  
- [x] 全站无禁用词。  
- [x] 包含 desktop 截图与 mobile 响应式规则。  
- [x] 状态覆盖：空态、上传中、处理中、成功、错误、付费墙、已授权、额度用完。  

---

## 7. 状态

**[DONE]**

design-handoff-v4 已按 Stitch 工作流从 design-handoff-v3 升级完成。视觉系统更 bold、更 distinctive，同时严格保留所有上游冻结文案。07 frontend 可解除阻塞，按本 handoff 实现。
