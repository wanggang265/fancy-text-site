# RemovePDFPages — Design Handoff v3

> 项目：removepdfpages.net  
> 仓库路径：/home/ubuntu/fancy-text-site  
> 阶段：06 design-freeze  
> 状态：[DONE]  
> 上游输入：docs/copy-freeze.md v3、docs/PRD-v3.md、docs/pricing-calibration-v3.md、docs/compliance-report.md v3、docs/page-matrix.md、docs/MVP-NOT-DO.md、project-control.md  
> 最后更新：2026-07-29  
> 输出路径：design-handoff-v3/

---

## 1. 设计目标

1. 去掉“通用 AI SaaS 模板”感：不用默认 Inter 做标题、不用紫色渐变、不做居中 Hero + 三卡片、不做统一圆角阴影。  
2. 严格对齐 copy-freeze v3：首屏 CTA、价格、合规文案、禁用词、Footer 法律链接均不可改动。  
3. 输出“真源”：前端可直接提取字体、颜色、间距、圆角、阴影、图标、状态类名。  
4. 覆盖 desktop / mobile 两种视图以及关键空/加载/错误/付费墙/已授权状态。

---

## 2. 设计决策

### 2.1 视觉方向

- **主色**：深靛蓝 `#3730A3`（不是常见的 `#4F46E5`），沉稳、文档感。  
- **强调色**：橄榄绿 `#65A30D`，用于“免费/成功/已解锁”状态，制造差异化。  
- **显示字体**：Space Grotesk（几何、略带怪诞，替代默认 Inter）。  
- **正文字体**：Plus Jakarta Sans（现代人文，避免全站 Inter）。  
- **等宽字体**：JetBrains Mono（license key、文件名、数据）。  
- **形状语言**：大卡片用 28px 大圆角，小徽章/标签用 0px 尖角，形成非对称张力。  
- **质感**：工具工作区使用 24px 点阵背景（`radial-gradient(circle, #E2E8F0 1px, transparent 1px)`），暗示“稿纸/工程图”。  
- **Hero 布局**：左文右图（工具预览卡向右边缘溢出），非居中对称。

### 2.2 与 v2 的关键差异

| 项 | v2 | v3 |
|---|---|---|
| 商业模式 | 买断 $19 为主 | 订阅月 $19 / 年 $99 为主，隐藏买断 $59 |
| 首页 Hero CTA | 指向 `/pricing` | 指向 `/remove-pages` 等免费工具入口 |
| 定价卡片 | 两列（Free / $19） | 三列（Free / Monthly $19 / Yearly $99）+ 隐藏 $59 |
| 字体 | Space Grotesk + Inter | Space Grotesk + Plus Jakarta Sans（正文不再默认 Inter） |
| 主色 | `#4F46E5` | `#3730A3` 深靛蓝 |
| 买断入口 | 主卡片 | 仅卡片下方和 checkout 第三选项 |
| 工具页 | 仅默认态 | 增加空/加载/错误/付费墙/已授权状态 |
| 签名页 | 免责声明文案 | 文案不变，视觉权重提升（横幅） |
| Convert-to-Word | 买断 Paywall | 增加免费额度、Top-up、1 小时 TTL 提示 |
| Footer | Legal 三链 | 四链：`/privacy` / `/terms` / `/refund` / `/cookie-policy` |

### 2.3 设计原则

1. **文案优先**：所有页面标题、H1、CTA、披露语句均复制自 copy-freeze v3。  
2. **价格透明**：`$19/month`、`$99/year`、`$59 one-time` 不可混淆；`$29` / `$149` 仅作为删除线原价锚点。  
3. **免费在前**：首页和工具页首先呈现免费价值，付费转化只出现在首页底部、`/pricing`、`/checkout`、`/convert-to-word` Paywall、博客 CTA。  
4. **状态显式**：loading、error、empty、paywall、authorized 都有独立视觉区块。  
5. **移动端不降级**：所有交互在移动端可用，导航变抽屉，定价卡片堆叠，工作区全宽。

---

## 3. 页面清单

| # | 页面 | 路由 | 类型 | 本 handoff 文件 | 关键状态 |
|---|---|---|---|---|---|
| 1 | 首页 | `/` | 入口/SEO | `pages/home/` | 默认、首屏免费、底部付费转化 |
| 2 | Remove PDF Pages | `/remove-pages` | 免费工具 | `pages/remove-pages/` | 空态、上传中、处理中、预览、成功、错误 |
| 3 | Merge PDFs | `/merge` | 免费工具 | `pages/merge/` | 空态、上传中、排序、合并中、成功、错误 |
| 4 | Compress PDF | `/compress` | 免费工具 | `pages/compress/` | 空态、上传中、处理中、成功、错误 |
| 5 | Sign PDF | `/sign` | 免费工具 | `pages/sign/` | 空态、签名中、已放置、成功、错误 |
| 6 | Convert PDF to Word | `/convert-to-word` | 付费工具 | `pages/convert-to-word/` | 未购买（免费试用）、已购买/已订阅、额度用完 Top-up、后端提示 |
| 7 | Pricing | `/pricing` | 转化 | `pages/pricing/` | 默认三卡片 + 隐藏买断 |
| 8 | Checkout | `/checkout` | 交易 | `pages/checkout/` | 默认月付、空邮箱错误、支付失败 |
| 9 | Success | `/success` | 交易 | `pages/success/` | 一次性/订阅成功 |
| 10 | FAQ | `/faq` | 支持/SEO | `pages/faq/` | 默认折叠 |
| 11 | Contact & Refund | `/contact` | 支持 | `pages/contact/` | 默认、提交成功、提交错误 |
| 12 | Privacy Policy | `/privacy` | 法律 | `pages/privacy/` | 静态文本 |
| 13 | Terms of Service | `/terms` | 法律 | `pages/terms/` | 静态文本 |
| 14 | Refund Policy | `/refund` | 法律 | `pages/refund/` | 静态文本 |
| 15 | Cookie Policy | `/cookie-policy` | 法律 | `pages/cookie-policy/` | 静态文本 |
| 16 | Blog Index | `/blog` | 内容 | `pages/blog/` | 默认列表 |
| 17 | Foxit Alternative | `/blog/foxit-alternative` | 内容 | `pages/blog-foxit-alternative/` | 文章 |
| 18 | Replace Image in PDF | `/blog/replace-image-in-pdf` | 内容 | `pages/blog-replace-image-in-pdf/` | 文章 |
| 19 | One-Time Payment PDF Editor | `/blog/one-time-payment-pdf-editor` | 内容 | `pages/blog-one-time-payment-pdf-editor/` | 文章 |
| 20 | No-Subscription PDF Editor | `/blog/no-subscription-pdf-editor` | 内容 | `pages/blog-no-subscription-pdf-editor/` | 文章 |

---

## 4. 状态清单

| 状态 | 适用页面 | 视觉特征 | 类名前缀 |
|---|---|---|---|
| Empty | 工具页 | 虚线上传区 + 大图标 + 提示文案 | `.rpp-state-empty` |
| Uploading | 工具页 | 进度条 + 文件名 + 取消按钮 | `.rpp-state-uploading` |
| Processing | 工具页 | 半透遮罩 + spinner + 状态文字 | `.rpp-state-processing` |
| Preview | Remove/Merge/Sign | 工具专用交互区激活 | `.rpp-state-preview` |
| Success | 工具页/Contact/Success | 橄榄绿勾选 + 下载/下一步按钮 | `.rpp-state-success` |
| Error | 全局 | 红色左侧边框提示 + 重试/联系支持 | `.rpp-state-error` |
| Paywall | `/convert-to-word` | 靛蓝左侧边框横幅 + 锁图标 + 价格 CTA | `.rpp-state-paywall` |
| Authorized | `/convert-to-word` | 上传区可用 + 月度剩余额度 | `.rpp-state-authorized` |
| Quota-Exceeded | `/convert-to-word` | 黄色提示 + Top-up CTA | `.rpp-state-quota-exceeded` |
| Default | 所有页面 | 正常渲染 | — |
| Mobile Drawer | 所有页面 | 右侧滑出 300px 菜单 | `.rpp-mobile-drawer` |

---

## 5. 设计系统变量

详见 `shared.css`。以下是核心摘要：

### 5.1 颜色

- `--rpp-brand-indigo-900: #1E1B4B` — Footer、深色表面
- `--rpp-brand-indigo-700: #4338CA` — hover
- `--rpp-brand-indigo-600: #3730A3` — 主按钮、链接、定价推荐边框
- `--rpp-brand-indigo-100: #E0E7FF` — 付费徽章背景
- `--rpp-accent-olive-700: #4D7C0F` — 深橄榄文本
- `--rpp-accent-olive-600: #65A30D` — 免费徽章、成功态
- `--rpp-accent-olive-100: #ECFCCB` — 免费徽章背景
- `--rpp-ink-900: #0F172A` — 主标题、正文
- `--rpp-ink-600: #475569` — 描述文字
- `--rpp-ink-200: #E2E8F0` — 边框、点阵
- `--rpp-error: #DC2626` — 错误
- `--rpp-amber-500: #F59E0B` — 警告/试用提示

### 5.2 字体

```css
--rpp-font-display: 'Space Grotesk', sans-serif;
--rpp-font-body: 'Plus Jakarta Sans', sans-serif;
--rpp-font-mono: 'JetBrains Mono', monospace;
```

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

### 5.3 字号（桌面端）

| Token | 大小 | 字重 | 用途 |
|---|---|---|---|
| `--rpp-display-xl` | 64px / 4rem | 700 | 首页 Hero H1 |
| `--rpp-display` | 48px / 3rem | 700 | 页面 H1 |
| `--rpp-heading-1` | 36px / 2.25rem | 700 | 章节 H2 |
| `--rpp-heading-2` | 28px / 1.75rem | 600 | 卡片标题 |
| `--rpp-heading-3` | 22px / 1.375rem | 600 | 子标题 |
| `--rpp-lead` | 18px / 1.125rem | 400 | Hero 副标题 |
| `--rpp-body` | 16px / 1rem | 400 | 正文 |
| `--rpp-body-sm` | 14px / 0.875rem | 400 | 说明、徽章 |
| `--rpp-label` | 12px / 0.75rem | 600 | 大写标签 |
| `--rpp-mono` | 14px / 0.875rem | 500 | license key、文件名 |

移动端响应式字号在 `shared.css` 媒体查询中定义。

### 5.4 间距

基础单位 4px：`--rpp-space-1` 到 `--rpp-space-32`（4px–128px）。  
容器最大宽度：1200px（`--rpp-container-max`）。  
工作区最大宽度：1080px（`--rpp-workspace-max`）。  
法律页最大宽度：720px（`--rpp-legal-max`）。

### 5.5 圆角

- `--rpp-radius-2xl: 28px` — Hero 工具卡、定价卡、工具工作区
- `--rpp-radius-xl: 20px` — 功能卡、法律页卡片
- `--rpp-radius-lg: 12px` — 下拉菜单、小面板
- `--rpp-radius-md: 8px` — 按钮、输入框、缩略图
- `--rpp-radius-sm: 4px` — 小按钮、单选卡
- `--rpp-radius-none: 0px` — 徽章、标签、小按钮

### 5.6 阴影

- `--rpp-shadow-sm: 0 1px 2px rgba(15,23,42,0.04)`
- `--rpp-shadow-md: 0 4px 12px rgba(15,23,42,0.06)`
- `--rpp-shadow-lg: 0 8px 24px rgba(15,23,42,0.08)`
- `--rpp-shadow-xl: 0 16px 40px rgba(15,23,42,0.10)`

### 5.7 点阵纹理

```css
background-image: radial-gradient(circle, #E2E8F0 1px, transparent 1px);
background-size: 24px 24px;
opacity: 0.6;
```

仅用于工具工作区、license key 卡、成功页卡片。

---

## 6. 组件清单

所有组件类名前缀 `rpp-`。

### 6.1 按钮

- `.rpp-btn-primary` — 深靛蓝填充，白字，8px 圆角，非 pill。
- `.rpp-btn-secondary` — 白底，1px 边框，靛蓝字。
- `.rpp-btn-tertiary` — 纯文本链接，悬停下划线。
- `.rpp-btn-small` — 导航/徽章旁小按钮，4px 圆角，小号字体。
- 状态：default / hover / active / focus / disabled。

### 6.2 徽章

- `.rpp-badge-free` — 橄榄绿 100 背景，尖角，16px 勾选图标。
- `.rpp-badge-paid` — 靛蓝 100 背景，尖角，16px 锁图标。
- `.rpp-badge-server` — 靛蓝 50 背景，尖角，16px 云图标。
- `.rpp-badge-popular` / `.rpp-badge-value` — 定价卡片顶部标签，尖角。

### 6.3 卡片

- `.rpp-card` — 白底，细边框，20px 圆角，默认阴影 sm。
- `.rpp-card-feature` — 功能入口卡，悬停上移 + 阴影 md。
- `.rpp-tool-card` — 工作区，28px 圆角，点阵背景，阴影 lg。
- `.rpp-pricing-card` — 定价卡，28px 圆角；推荐卡 2px 靛蓝边框 + 阴影 lg。
- `.rpp-radio-card` — checkout 单选计划卡，4px 圆角，选中时 2px 靛蓝边框。

### 6.4 导航与 Footer

- `.rpp-header` — 68px 高，白底，底部 1px 线，滚动后毛玻璃。
- `.rpp-nav-logo` — Space Grotesk 700，18px。
- `.rpp-nav-link` — 靛蓝 600，悬停下划线。
- `.rpp-mobile-drawer` — 右侧 300px，白底，阴影 xl，滑入动画。
- `.rpp-footer` — 靛蓝 900 背景，四列（Brand / Legal / Tools / Support），移动端单列。
- Footer 法律链接：`/privacy`、`/terms`、`/refund`、`/cookie-policy`。

### 6.5 上传区

- `.rpp-upload-zone` — 2px 虚线边框，20px 圆角，点阵背景。
- 状态：default / hover / active(drop) / error / disabled。
- 图标：48px 云上传。

### 6.6 付费墙与提示

- `.rpp-paywall` — 靛蓝左侧 4px 边框，靛蓝 50 背景，圆角 md（左侧尖）。
- `.rpp-notice-warning` — 琥珀 100 背景，左侧 4px 琥珀边框，用于签名免责声明。
- `.rpp-notice-info` — 靛蓝 50 背景，左侧 4px 靛蓝边框，用于 Convert 1 小时 TTL。
- `.rpp-notice-quota` — 琥珀 100 背景，用于 Top-up 提示。
- `.rpp-error-alert` — 红色左侧 4px 边框，红色浅背景。

### 6.7 表单

- `.rpp-input` — 1px 边框，4px 圆角，padding 12px 16px，focus 靛蓝 600 边框 + 2px 靛蓝 500 outline offset。
- `.rpp-select` — 与 input 同形。
- `.rpp-textarea` — 与 input 同形，min-height 120px。
- `.rpp-radio` — 隐藏原生 radio，用 `.rpp-radio-dot` 模拟，选中时靛蓝填充。
- `.rpp-accordion` — FAQ 折叠，底部 1px 线，展开时 chevron 旋转 180°。

### 6.8 特殊组件

- `.rpp-page-grid` — Remove 页面缩略图网格，4 列桌面，3 列平板，2 列手机。
- `.rpp-page-thumb` — A4 比例（1:√2），白底，阴影 sm，选中态 ring + 叠加层。
- `.rpp-signature-canvas` — 1px 边框，点阵背景，最小 200×120px。
- `.rpp-comparison-table` — 白底卡片，表头靛蓝 50 背景，行 hover 靛蓝 50/10。
- `.rpp-license-key` — JetBrains Mono，灰色边框，复制按钮。
- `.rpp-progress-bar` — 4px 高，靛蓝填充，浅灰轨道。
- `.rpp-spinner` — 24px 靛蓝圆环动画。

---

## 7. 响应式规则

| 元素 | 桌面 | 平板 (≤1024) | 移动 (≤768) | 小屏 (≤480) |
|---|---|---|---|---|
| 导航 | 水平，全部链接 | 水平，简化 | 汉堡抽屉 | 汉堡抽屉 |
| Hero | 左文右图，图向右溢出 | 堆叠 | 堆叠，文字在上 | 堆叠 |
| 工具卡网格 | 4 列 | 2 列 | 1 列 | 1 列 |
| 定价卡 | 3 列等宽 | 3 列 / 堆叠 | 堆叠，推荐卡置顶 | 堆叠 |
| Checkout | 单选区 + 右侧摘要 | 堆叠 | 堆叠 | 堆叠 |
| 工具工作区 | 1080px 居中 | 全宽 | 全宽，内边距 16px | 全宽 |
| Footer | 4 列 | 2 列 | 1 列 | 1 列 |
| 法律页 | 720px 居中 | 全宽 | 全宽 | 全宽 |

---

## 8. 资产清单

| 资产 | 类型 | 规格 | 位置 | 用途 | 备注 |
|---|---|---|---|---|---|
| Favicon | PNG/ICO | 32×32 | `assets/favicon-32x32.png` / `assets/favicon.ico` | 全站 | 沿用现有 |
| Apple Touch Icon | PNG | 180×180 | `assets/apple-touch-icon.png` | 全站 | 沿用现有 |
| OG Home | PNG | 1200×630 | `assets/og-home.png` | 首页 Open Graph | 建议替换为 v3 不对称构图 |
| Hero 抽象插图 | PNG/SVG | 约 600×500 | `assets/hero-illustration-v3.svg` | 首页 Hero 右侧 | 新设计：浏览器窗口 + PDF 页面 + 橄榄绿勾选 |
| 工具页空态插图 | SVG | 96×96 | 内联 | 上传区 | 可复用 Lucide cloud-upload |
| 功能图标 | SVG | 20–24px | 内联 | 卡片/按钮 | 使用 Lucide 风格：FileX、Merge、Minimize、PenTool、FileType、Lock、Check 等 |
| 博客文章封面 | 可选 | 1200×630 | 未包含 | 博客 hero | 可用抽象色块替代 |

**新图标要求**：前端使用 Lucide React 或内联 SVG，保持 24px 默认、20px 中、16px 小、48px 上传区。所有装饰图标加 `aria-hidden="true"`。

---

## 9. 前端 Handoff 注意事项

1. **字体**：必须加载 Space Grotesk + Plus Jakarta Sans + JetBrains Mono，不要只加载 Inter。  
2. **颜色**：不要引入新的紫色渐变；主色固定为 `#3730A3`，成功/免费态固定为 `#65A30D`。  
3. **Hero**：首页 Hero 必须左对齐，右侧工具预览卡可向右边缘溢出；不要居中两段式。  
4. **按钮**：主按钮 8px 圆角，非 pill；小按钮/徽章 0px 或 4px 圆角。  
5. **定价**：`/pricing` 必须三列：`Free`、`Monthly $19`、`Yearly $99`；`$59 one-time` 仅作为卡片下方次级链接。  
6. **Checkout**：默认选中 `Monthly — $19/month`，第三选项为 `One-time License — $59`。  
7. **Convert to Word**：必须展示：
   - 未购买：`You have X free conversions left this 30-day period.` 和 Paywall。  
   - 已购买：上传区 + 本月剩余额度。  
   - 额度用完：`You’ve used your 10 included conversions this month.` + Top-up CTA。  
   - 始终显示：后端 1 小时 TTL 提示。  
8. **Sign**：必须显示“not a digital certificate signature”免责声明，横幅形式，位置在 Hero 下方。  
9. **Footer**：四链法律列：`Privacy Policy`、`Terms of Service`、`Refund Policy`、`Cookie Policy`。  
10. **禁用词**：全站不出现 `unlimited`、`free forever`、`no limits`、`lifetime updates`、`perfect`、`100% accurate`、`guaranteed`、`official`。  
11. **文案不可改**：所有 `title`、`meta description`、`H1`、`CTA` 文案已冻结，前端不可现场改写。  
12. **状态实现**：前端应通过 CSS 类切换或条件渲染实现状态清单中的状态，而非单页静态。  
13. **无障碍**：焦点环 2px `--rpp-brand-indigo-500` + 2px offset；工具区使用 `aria-live="polite"`；减少运动偏好禁用动画。  
14. **Next.js 注意**：项目 `AGENTS.md` 提醒 Next.js 版本可能有破坏性变更，实现前请阅读 `node_modules/next/dist/docs/` 相关章节。

---

## 10. 验收标准

- [x] 设计系统变量完整：颜色、字体、间距、圆角、阴影、图标。  
- [x] 所有 20 个页面均输出 HTML/CSS 文件。  
- [x] 首页 Hero Primary CTA 指向 `/remove-pages`，首屏不主导付费价格。  
- [x] `/pricing` 三列卡片 + 隐藏买断入口落位正确。  
- [x] `/convert-to-word` 展示免费额度、Top-up、1 小时 TTL 提示。  
- [x] `/sign` 展示“not a digital certificate signature”免责声明。  
- [x] Footer 法律链接指向 `/privacy` / `/terms` / `/refund` / `/cookie-policy`。  
- [x] 包含 desktop 和 mobile 视图说明及响应式断点。  
- [x] 包含主要状态：空态、加载态、错误态、付费墙、已授权。  
- [x] 全站无禁用词，价格口径统一。  
- [x] 视觉风格避免默认 Inter、紫色渐变、居中 Hero、统一圆角阴影。

---

## 11. 状态

**[DONE]**

- 本 design-handoff-v3 已按 copy-freeze v3 完成重制，所有 20 个页面、状态、设计系统、资产清单已输出。  
- zhongshu 总控已完成 content-gap / copy-audit，结论为 [GO]，无禁用词、无 P0/P1 结构偏差。  
- 未阻塞项：博客文章封面图、OG 图建议上线前替换，但可用占位色块先实现。  
- 上游未确认项（Creem 配置、$19 Launch Special 截止日期、分析工具、后端方案）不影响设计冻结，已在文案中以占位或保守披露处理。

---

## 12. Completion note

All 20 v3 pages are now present under `design-handoff-v3/pages/`. The 13 missing pages were created and the 7 existing pages were updated to link `shared.css` directly and to align header CTA copy with copy-freeze v3. Specific copy deviations resolved:
- `/merge`: hero subheadline now includes "Upload two or more PDFs".
- `/compress`: hero subheadline now includes "Choose compression level" and "Processed in your browser by default".
- `/sign`: disclaimer banner now uses the exact copy-freeze v3 phrase.
- `/convert-to-word`: H1 is now exactly "Convert PDF to Word Online" and includes "10 included conversions" and "1-hour temporary backend retention".
Header right CTA is "Try free" on home/tool pages and "Get Full Editor — $19/month" on info/legal pages. Footer links to `/privacy`, `/terms`, `/refund`, `/cookie-policy` are present on all pages.