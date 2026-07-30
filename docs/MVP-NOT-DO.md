# RemovePDFPages — MVP / NOT-DO v1

> 本文档定义首版上线的范围（MVP）与明确不做的事项（NOT-DO）。越界功能必须经过新一轮 PRD 修订和 stage gate 审批，不能直接开发。

## 1. MVP 范围（什么做）

### 1.1 工具页面（5 个）
- [ ] **Remove Pages** (`/remove-pages`)
  - 上传 PDF 并展示页面缩略图
  - 选择并删除页面
  - 下载剩余 PDF
- [ ] **Merge PDF** (`/merge`)
  - 上传多个 PDF
  - 拖拽排序
  - 下载合并后的 PDF
- [ ] **Compress PDF** (`/compress`)
  - 上传 PDF
  - 选择压缩级别（推荐/最大）
  - 下载压缩后的 PDF
- [ ] **Sign PDF** (`/sign`)
  - 上传 PDF
  - Canvas 绘制签名
  - 应用签名并下载
- [ ] **Convert PDF to Word** (`/convert-to-word`)
  - 上传 PDF
  - 选择 DOCX / RTF
  - 已购买 Full Editor 后转换并下载
  - 未授权时展示 Paywall

### 1.2 转化与购买流程
- [ ] `/pricing` 价格页（免费/付费功能对比表）
- [ ] `/checkout` 结账页（与 Stripe 会话对接）
- [ ] `/success` 购买成功页（展示 license key）
- [ ] license key 生成与邮件发送

### 1.3 支持与法律
- [ ] `/contact` 联系与退款表单
- [ ] `/faq` 常见问题（含 5 类问题）
- [ ] `/privacy` 隐私政策（需 04 合规填充内容）
- [ ] `/terms` 服务条款（需 04 合规填充内容）
- [ ] `/refund` 退款政策（需 04 合规填充内容）
- [ ] Footer 中 Legal 链接指向正确路由

### 1.4 站点基础
- [ ] 统一 Header / Footer 组件（已有，但链接需修正）
- [ ] 响应式布局与 Design System v2 一致
- [ ] 基础错误提示（文件类型、大小、处理失败）
- [ ] 埋点基础（必要事件清单见 `data-contract.md`）
- [ ] sitemap.xml 与 robots.txt 更新（删除 `/workspace`）

### 1.5 内容/博客页（P1 SEO）
依据 `docs/keyword-research-v1.md` 新增 4 篇 SEMRUSH 验证的博客文章，与 1 个索引页，用于长尾/商业调查流量引导。
- [ ] `/blog` 博客索引页
- [ ] `/blog/foxit-alternative` — 6 Best Foxit Alternatives in 2026
- [ ] `/blog/replace-image-in-pdf` — How to Replace an Image in a PDF Without Adobe Acrobat
- [ ] `/blog/one-time-payment-pdf-editor` — Best One-Time Payment PDF Editors
- [ ] `/blog/no-subscription-pdf-editor` — No-Subscription PDF Editors
- **限制**：MVP 使用静态页面；文章内容与价格提法必须与 `/pricing` 一致；每篇文章必须至少包含一个回到 `/pricing` 或对应工具页的 CTA。

## 2. NOT-DO（明确不做）

### 2.1 产品范围
- **不做** 第 6 个工具以外的 PDF 功能（包括但不限于：OCR、旋转页面、拆分 PDF、PDF 转 Excel/PPT/JPG、填写表单域、添加页码、批量处理文件夹）。
- **不做** 超出 5 工具的完整 PDF 编辑器功能（直接编辑文字、替换图片）的全量实现。UI 可以告知这些是 Full Editor 的一部分，但首版开发应以 Convert to Word 为主，文字/图片编辑可以是展示占位符。
- **不做** AI 自动识别、智能压缩、智能文档分析。

### 2.2 账户与存储
- **不做** 用户注册/登录系统；唯一身份认证方式是 license key。
- **不做** 云端文件存储、历史记录、已处理文件的再下载。
- **不做** 文件分享链接、公共预览、协同编辑。
- **不做** 移动端原生 App 或桌面端应用安装包（网页版即为 MVP）。
- **不做** 博客评论区、用户生成内容（UGC）或博客 CMS；MVP 使用静态页面。

### 2.3 商业模式
- 收费模式以**订阅制为主**（月度 $19/month、年度 $99/year），一次性 $59 One-time License 作为隐藏选项；Top-up credits 为按量一次性购买，不属于订阅。
- **不做** 广告、联盟营销、付费升级弹窗（除了付费工具的内联 Paywall）。
- **不做** 免费版水印；免费 4 工具的功能边界以 fair-use 限制为准（50 MB / 200 页 / 同 IP 每小时 10–20 次）。
- **不做** 企业团队 seat 管理、多用户授权。

### 2.4 签名与合规
- **不做** 数字证书签名（PKI / AATL / PAdES）、签名审计日志、身份验证。
- **不做** 法律客户自定义合同、电子签署平台级别的合规。
- **不做** 对用户内容的内容审核。

### 2.5 数据与隐私
- **不做** 收集用户姓名、年龄、性别、地址等不必要 PII。
- **不做** 将用户上传的 PDF 用于 AI 训练、第三方共享、验证幻觉等。
- **不做** 第三方 tracking cookie（如 Google Ads retargeting）除非在隐私政策中明确披露。
- **不做** 科平日志中记录原始 PDF 文件内容。

## 3. 上线后方可考虑（Post-MVP）

- 文字编辑与图片替换功能的完整实现
- PDF 转 Excel / JPG / PPT
- 文件历史记录（仅存储在本地浏览器）
- 模板库、批量操作
- 默认语言切换
- 桌面端应用包

## 4. 决策依据

- **5 工具边界**：`project-control.md` 已确认决策、`design-handoff-extract/route-mapping.json` 对应 5 个工具页面。
- **不做 6+ 工具**：避免首版失焦，保持站点与品牌一致性。
- **商业模式**：订阅制为主（月 $19/年 $99），$59 One-time License 作为隐藏选项，Top-up credits 为按量一次性购买。
- **不做云存储**：页面文案与 FAQ 声称文件不上传，必须与后端架构一致；若后端 fallback 则需更新隐私声明。
- **不做账户系统**：计费与购买流程以 license key / subscription 为主轴，符合当前页面设计。

## 5. 验收标准

- [ ] 页面矩阵中 5 个工具页面已全部实现
- [ ] 付费工具的 Paywall 与授权校验工作正常
- [ ] `/checkout` + `/success` + license key 邮件流程通
- [ ] `/privacy` / `/terms` / `/refund` 内容定稿并可访问
- [ ] Footer 与 Header 所有链接活着
- [ ] 没有 `/workspace` 404 或 301 处理正确
- [ ] sitemap.xml 和 robots.txt 与路由合约一致
- [ ] 博客页面（`/blog`、4 篇文章）已上线并包含回到 `/pricing` 或对应工具页的 CTA
