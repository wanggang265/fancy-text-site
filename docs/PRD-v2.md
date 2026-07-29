# RemovePDFPages — PRD v2 (5-tool suite)

> 项目：removepdfpages.net  
> 阶段：02-product  
> 目标市场：US / English  
> 状态：v2 草案，已合并 03 定价与 04 合规决策；待 05 copy 与 07 前端实现  
> 最后更新：2026-07-21

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

### 1.2 缺失 / 待确认
以下信息已按阶段结论更新；公开发布前仍需补齐未确认项：
- 关键词机会报告与 SERP 竞品样本 [已补充：见 `docs/keyword-research-v1.md`；Blog 词优先采用 SEMRUSH，工具页优先采用 DataForSEO，Google SERP 以 Yahoo 代理获取]
- 博客关键词（Foxit alternative / replace image in PDF / one-time payment PDF editor / no subscription PDF editor）已由 SEMRUSH 验证，并计划新增 4 个 blog 页面
- 定价策略（$29 标准 lifetime 价锚点，MVP 主推 $19 Launch Special） [已确认：pricing-calibration.md]
- 退款政策（14 天无理由退款，每退一单损失 Stripe $0.30 手续费） [已确认：compliance-report.md]
- 数据流与文件处理架构（免费 4 工具默认纯客户端处理；Convert to Word / 后端 fallback 临时上传，处理完成后 TTL 1 小时自动删除） [已确认：data-contract.md + compliance-report.md]
- 免费额度（单文件 ≤50MB，≤200 页；每小时同 IP 10–20 次免费处理；Merge ≤10 文件） [已确认：pricing-calibration.md]
- 法律管辖地（US 州法 / GDPR / CCPA 影响） [待确认：美国/英语首发，国际销售范围未定]
- 支付服务商（Stripe） [已确认：商户账户与 webhook 配置仍待测试]
- Stripe Tax 配置 / 美国销售税自动计算 [待确认]
- 第三方分析工具选型（Google Analytics / Plausible / Vercel Analytics） [待确认]
- 目标销售地理范围（美国首发 vs 国际） [待确认]

### 1.3 评估
关键决策输入已就绪，03 定价与 04 合规结论已合并进本 PRD。未确认项已标记，后续阶段必须回填。

---

## 2. 决策日志

| # | 决策 | 依据 | 影响 |
|---|---|---|---|
| 1 | 产品边界从单一功能扩展为 5 工具套件 | `project-control.md` 已确认决策 | 需更新 PRD、路由合约、数据合约 |
| 2 | 5 工具：Remove / Merge / Compress / Sign / Convert to Word | `project-control.md` + 设计 handoff | 定义用户任务与后端能力 |
| 3 | 恢复 `/privacy` / `/terms` / `/refund` | `project-control.md` + `10-frontend-realignment.md` | 路由合约 + 页面矩阵 + 合规阶段 |
| 4 | 定价保留 $29 lifetime，待定价 agent 审核 | 当前 `/pricing` / `/checkout` | PRD 中作为初步假设，未最终确定 |
| 5 | 免费将 Remove / Merge / Compress / Sign 作为免费工具，Convert to Word 作为付费工具 | 设计页面的 Free / Paid / Pro badge | 定义数据流与授权逻辑 |
| 6 | 设计 handoff 的 11 个路由作为路由合约基础 | `route-mapping.json` | 路由合约必须与之一一对应 |
| 7 | 移除 `/workspace` | 该路由不在 design handoff 中，已被删除 | sitemap 与重定向需处理 |
| 8 | 增加 blog 内容矩阵 | `docs/keyword-research-v1.md` 提供 4 个 SEMRUSH 验证的 blog 主题 | 路由合约与页面矩阵需更新 |
| 9 | 定价策略：$29 标准价锚点，MVP 主推 $19 Launch Special | `docs/pricing-calibration.md` | 首页、定价、博客、工具页 CTA 必须统一 |
| 10 | 数据流与处理架构：免费 4 工具客户端处理；Convert to Word / 后端 fallback 临时上传，TTL 1 小时 | `docs/compliance-report.md` + `docs/data-contract.md` | Privacy / Terms 与实际数据流一致 |
| 11 | 退款、税务、授权：14 天退款，Stripe Tax，最多 5 台设备，设备指纹 | `docs/compliance-report.md` | `/refund`、`/terms` 已填充；Footer 链接需修正 |

---

## 3. 产品定位

### 3.1 一句话定位
RemovePDFPages 是面向美国个人用户与小团队的 **5 工具 PDF 套件**：免费在浏览器中完成删除页面、合并、压缩、签名，购买一次终身授权即可解锁 PDF 转 Word 等高级编辑能力。
[依据：当前首页 H1、定价页、`project-control.md`]

### 3.2 产品属性
- 站点类型：工具型 SaaS / Browser Utility
- 市场：US / English（首发）
- 商业模式：免费工具 + 一次性 lifetime 付费授权
- 设备：响应式 Web（不含原生 App）
- 核心价值：无需注册、无水印、文件不上传（或明确的临时存储 TTL）

### 3.3 竞争差异化
1. 一次性付费，没有订阅
2. 免费 4 个工具无水印
3. 客户端优先处理，强调隐私
4. 独特的 Design System v2（Space Grotesk + Olive），避免 SaaS 模板感
[依据：DESIGN.md + 定价页]

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
理由：PDF 处理需求高频且紧急；对一次性 $29 买断的接受度远高于订阅；不想安装大型软件。
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
| Convert PDF to Word | `/convert-to-word` | 付费 | 将 PDF 转为可编辑 Word 文档 |

[依据：`project-control.md` + design handoff + 页面免费/ paid badge]

### 5.2 付费层（Full Editor）
- 标准价 $29 lifetime，MVP 主推 $19 Launch Special（限时首发价）
- `/pricing` 页面重构为两列卡片：Free / $19 Launch Special，$29 作为 strikethrough 原价锚点
- 首页 `/`、博客 `/blog/*`、`/convert-to-word`、`/checkout` 入口 CTA 统一为 `$19 Launch Special`
- 解锁 Convert PDF to Word
- 同时包含页面已展示的高级编辑功能：直接编辑文字、替换图片（可作为 MVP 中的占位符，完整实现放在 Post-MVP）
- 最多 5 台个人设备；license 激活时记录设备指纹
- 14 天无理由退款；每退一单损失 Stripe $0.30 手续费
- Lifetime 指当前主版本 RemovePDFPages Full Editor v1.x
[依据：`docs/pricing-calibration.md` + `docs/compliance-report.md`]

### 5.3 NOT-DO（筛要，详见 `docs/MVP-NOT-DO.md`）
- 不做 5 工具之外的 PDF 功能（OCR、转 Excel/PPT/JPG、拆分、旋转、填写表单等）
- 不做用户账户系统；授权以 license key 形式
- 不做云存储 / 历史文件 / 文件分享
- 不做订阅 / 月费模式
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
- **步骤：** 上传 PDF → 选择 DOCX / RTF → 若未授权，展示 $19 Launch Special Paywall → 购买 Full Editor → 点击 Convert → 下载 Word 文档。
- **成功标准：** Word 文档可编辑，格式尽量保留。
- **CTA 统一：** 本页所有购买入口（Paywall、按钮、横幅）必须统一使用 `$19 Launch Special`，与首页、博客、定价页口径一致。

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
- 所有付费转化入口（`/` 首页、`/blog/*`、`/convert-to-word`、`/pricing`）主推文案统一为 `$19 Launch Special`。
- `/pricing` 页面中 `$29` 仅作为 strikethrough 原价锚点，不作为独立购买卡片。
- `/checkout` 默认选项保持 `$19 Launch Special`，与入口 CTA 一致；保留 `$29 Standard` 选项作为 fallback。
- 博客文章中的价格提法必须与 `/pricing` 一致，禁止同时出现 `$29 Lifetime` 与 `$19 Launch Special` 两种默认口径。

---

## 9. Data Contract 摘要

前端需要的后端能力、文件处理边界、API 端点、授权与支付事件见 `docs/data-contract.md`。
核心结论：
- 免费 4 工具默认纯客户端处理，文件不上传服务器。
- Convert to Word 必须后端处理；用户上传的 PDF 会被临时传输到服务器，处理完成后 1 小时内自动删除（TTL 1 小时）。
- 若免费工具客户端处理失败（如文件过大、格式复杂），可触发后端 fallback，同样适用 TTL 1 小时。
- 后端处理场景与当前 UI “No upload” 声明存在冲突，工具页面必须在触发后端 fallback 时明确告知用户。
- 文件处理边界：单文件 ≤50MB，≤200 页；每小时同 IP 10–20 次免费处理；Merge ≤10 文件。
[依据：`docs/data-contract.md` + `docs/pricing-calibration.md` + `docs/compliance-report.md`]

---

## 10. MVP-NOT-DO 摘要

什么做、什么不做见 `docs/MVP-NOT-DO.md`。

### 上线前必须完成（MVP）
- 5 个工具页面可用
- 支付流程（结账、成功、license key 邮件）
- `/contact` + `/faq`
- `/privacy` + `/terms` + `/refund`
- Header / Footer 链接活着
- sitemap 与 robots.txt 更新

### 明确不做（NOT-DO）
- 非 5 工具的 PDF 功能
- 用户账户与云存储
- 订阅 / 月费
- 证书级签名
- 移动原生 App

---

## 11. 定价与合规决策摘要

> 本节合并 03 定价审核（`docs/pricing-calibration.md`）与 04 合规（`docs/compliance-report.md`）结论，作为 05 Copy Freeze 与 07 前端实现的事实源。

### 11.1 定价策略

| 项目 | 决策 | 依据 |
|---|---|---|
| 标准价 | $29 lifetime | pricing-calibration：$29 在竞品一次性/年付模式中属低价带，保留为标准价锚点 |
| MVP 主推价 | $19 Launch Special | pricing-calibration：MVP 阶段默认售价，提升转化 |
| 价格展示 | `/pricing` 两列卡片：Free / $19 Launch Special；$29 作为 strikethrough 原价 | 避免 $29/$19 同功能并列的误导性折扣风险 |
| 入口 CTA 统一 | 首页 `/`、博客 `/blog/*`、`/convert-to-word`、checkout 主推 `$19 Launch Special` | 修复首页 $29 与 checkout 默认 $19 的价格锚点错乱 |
| 价格结构 | 不做订阅；仅一次性 lifetime | `project-control.md` + NOT-DO |

### 11.2 免费额度与处理架构

| 项目 | 决策 | 依据 |
|---|---|---|
| 单文件大小 | ≤ 50 MB | pricing-calibration 限制建议 |
| 单文件页数 | ≤ 200 页 | pricing-calibration 限制建议 |
| 每小时同 IP 请求 | 10–20 次免费处理 | 防止脚本滥用（无账户系统） |
| Merge 文件数 | ≤ 10 个 | 控制总大小与前端性能 |
| 免费 4 工具 | 默认纯客户端处理，文件不上传 | compliance-report 数据流声明 |
| Convert to Word / 后端 fallback | 临时上传服务器，处理完成后 1 小时内自动删除 | compliance-report + data-contract |
| 输出文件 TTL | 1 小时（后端处理场景） | 降低存储成本，与隐私声明一致 |

### 11.3 退款、税务与授权

| 项目 | 决策 | 依据 |
|---|---|---|
| 退款政策 | 14 天无理由退款 | compliance-report + refund page |
| 退款成本 | 每退一单损失 Stripe $0.30 手续费 | Stripe 费率 |
| 销售税 | 美国销售税由 Stripe Tax 自动计算并收取 | compliance-report |
| 销售范围 | 上线初期建议仅美国/北美；国际销售待确认 | pricing-calibration 风险清单 |
| Lifetime 边界 | 指当前主版本 RemovePDFPages Full Editor v1.x | compliance-report |
| 设备限制 | 最多 5 台个人设备；激活时记录设备指纹 | compliance-report |

### 11.4 分析工具与隐私披露

- 分析工具最终选型未确定（候选：Google Analytics / Plausible / Vercel Analytics）。
- Privacy 页面已预留披露位置；选型确定后必须同步更新 Privacy 与 Terms。
- 若使用 Google Analytics，需加入 Cookie 披露并考虑 Cookie 同意模态。

### 11.5 前端实现要求

- `/pricing` 页面必须重构为两列卡片：Free / $19 Launch Special，$29 作为 strikethrough 原价。
- 所有入口 CTA 统一为 `$19 Launch Special`，避免与 checkout 默认价格冲突。
- 免费工具页面文案避免 `unlimited`、`free forever`、`no limits`；使用 `currently free`。
- 工具页面保持 “Your file stays in your browser” 仅适用于默认客户端处理；后端 fallback 需明确告知用户。
- Footer 法律链接必须指向 `/privacy`、`/terms`、`/refund`（当前指向 `/contact`，需修正）。

### 11.6 待确认项

- 分析工具最终选型 [待确认]
- Stripe Tax / Avalara 是否已配置 [待确认]
- 目标销售地理范围（仅美国 vs 国际） [待确认]
- $19 Launch Special 的截止日期或数量限制 [待确认]

## 12. 合规与发布前确认项

涉及公开发布、支付、真实用户数据前，必须完成：
1. Stripe 商户账户配置 [已确认：webhook 测试仍待完成]
2. 隐私政策 / 服务条款 / 退款政策内容定稿 [已确认：`app/privacy/page.tsx`、`app/terms/page.tsx`、`app/refund/page.tsx` 已生成]
3. 数据留存与文件 TTL 政策（免费 4 工具客户端处理；Convert to Word / 后端 fallback 临时上传 ≤ 1 小时） [已确认]
4. Cookie / 分析工具披露 [待确认：分析工具选型未定]
5. Stripe Tax / 销售税设置 [待确认]
6. 文件处理安全审计（类型、大小、沙箱） [待确认：后端实现阶段验证]
7. 目标销售地理范围（美国首发 vs 国际） [待确认]

---

## 13. 下游交接

### 下一阶段：05 Copy Freeze
- Owner：文案 agent（copy 阶段 owner）
- 必需输入：本 PRD、`docs/page-matrix.md`、`docs/compliance-report.md`（含禁用词清单）
- 输出预期：SEO-Copy Freeze 文档，覆盖所有 indexable 页面与博客文章
- 验收：所有文案符合禁用词清单；CTA 价格统一为 `$19 Launch Special`；免费工具文案使用 `currently free`

### 再下一阶段：07 前端修复
- Owner：前端开发
- 必需输入：本 PRD、design handoff v2、`app/privacy/page.tsx`、`app/terms/page.tsx`、`app/refund/page.tsx`
- 输出预期：修复后的 `/pricing`（两列卡片）、`/checkout`、工具页、Footer 法律链接
- 验收：$29 仅作为 strikethrough 原价；Footer `/privacy` `/terms` `/refund` 不 404；工具页处理逻辑与数据流一致

### 给下游的最小必要信息
- 不能假设 $19 Launch Special 是永久价；它是 MVP 限时首发价，未来可能切回 $29
- 不能假设 Convert to Word 可以纯客户端实现；必须按 TTL 1 小时的后端临时处理实现
- 不能假设分析工具已选型；Privacy 必须按最终选型更新
- 不能假设 Stripe Tax 已配置；税务合规需上线前确认
- 不能假设所有工具页面的处理逻辑已实现；当前为静态外壳

---

## 14. 验收清单

- [x] 5 个工具的用户任务清晰
- [x] 每个 indexable 页面有价值
- [x] NOT-DO 明确
- [x] Route Contract 与 design handoff 一致
- [x] 待确认项已列出，未擅自跳过
- [x] 博客内容矩阵已纳入 PRD、page-matrix、MVP-NOT-DO

---

## 15. 博客内容策略

### 15.1 目标
通过优质长尾/商业调查型内容，触达对订阅敏感、寻找一次性付费 PDF 工具的用户，并为工具页引流、建立域名权威。

### 15.2 主题矩阵

| 路由 | 目标主词 | 标题 | 搜索量 | CPC | 搜索意图 | 备注 |
|---|---|---|---|---|---|---|
| `/blog/foxit-alternative` | Foxit alternative | 6 Best Foxit Alternatives in 2026 (Free & Budget-Friendly) | 810 | $1.82 | Commercial Investigation | SEMRUSH，DataForSEO 低估，以 SEMRUSH 为准 |
| `/blog/replace-image-in-pdf` | replace image in PDF | How to Replace an Image in a PDF Without Adobe Acrobat | 280 | $1.31 | Informational / Tutorial | SEMRUSH，DataForSEO 低估，以 SEMRUSH 为准 |
| `/blog/one-time-payment-pdf-editor` | one-time payment PDF editor | Best One-Time Payment PDF Editors: Buy Once, Own Forever | 80 | $2.95 | Commercial Investigation | SEMRUSH，DataForSEO 低估，以 SEMRUSH 为准 |
| `/blog/no-subscription-pdf-editor` | no subscription PDF editor | No-Subscription PDF Editors: Best Free & One-Time-Pay Options | 70 | $2.95 | Commercial Investigation | SEMRUSH，DataForSEO 低估，以 SEMRUSH 为准 |
| `/blog` | — | RemovePDFPages Blog | — | — | Navigation / Collection | 博客索引页，列出 4 篇文章 |

### 15.3 与工具页的关联
每篇 blog 文章必须包含至少一个回到对应工具页的 CTA：
- Foxit alternative / one-time payment / no subscription 文章 → 引导至 `/pricing`
- replace image in PDF 文章 → 引导至 `/remove-pages` 或 `/convert-to-word` （等待完整编辑器上线）
- reduce PDF size 教程 → 引导至 `/compress`

### 15.4 待确认
- 博客稿件是静态还是 CMS（MVP 建议静态页面）[NEEDS_DECISION]
- 文章上线时间表与负责人 [NEEDS_OWNER]
- 是否开启评论区或评分（MVP 建议不做，避免用户数据波及）

*本 PRD v2 已合并 03 定价与 04 合规结论，形成待 Copy Freeze 的产品定义；分析工具、税务配置、销售范围确认后进入 v2 Freeze。*
