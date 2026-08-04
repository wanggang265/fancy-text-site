# RemovePDFPages — Compliance Report v3

> 项目：removepdfpages.net  
> 当前阶段：04-compliance（基于 PRD v3 + pricing-calibration-v3.md，支付服务商 Creem）  
> 输入：docs/PRD-v3.md / docs/pricing-calibration-v3.md / docs/MVP-NOT-DO.md / docs/copy-freeze.md v3 / docs/data-contract.md v1 / project-control.md / docs/open-items.md / app/privacy/page.tsx / app/terms/page.tsx / app/refund/page.tsx  
> 状态：**[DONE]**  
> 更新日期：2026-07-29  
> 执行人：合规审查官（jiancha）

---

## 1. 审查结论

**结论：[DONE]**

订阅制为主（月度 $19 / 年度 $99）+ 隐藏一次性买断 $59 + Top-up credits 的商业模式与 `MVP-NOT-DO.md` v1（已同步）无冲突；数据流（免费 4 工具客户端处理、Convert to Word / 后端 fallback 临时上传 TTL 1 小时）与 Privacy 披露一致；Terms / Refund / Privacy / Cookie Policy 已按 v3 商业模式重新起草。

**仍保留 4 个 [待确认] 项，在 05 Copy Freeze v3 最终验收和 07 前端实现前需解决或回填：**

1. **退款窗口**：已由用户 2026-07-29 确认为 **14 天**；已同步 PRD 决策变量、`project-control.md` 。
2. **Creem 配置、目标销售国家/产品类别、webhook 测试状态** [待确认]。
3. **$19 Launch Special 具体截止日期或数量限制** [待确认]。
4. **第三方分析工具最终选型** [待确认]。
5. **最终后端方案（Workers + WASM / 第三方 API / 自托管）及真实单次成本** [待确认]。

> **免责声明**：本报告为合规审查辅助文档，不是法律意见。上线前建议由持有执业资格的律师最终审阅 Terms / Privacy / Refund / Cookie Policy 内容。

---

## 2. 上游输入一致性检查

| 输入 | 版本/状态 | 关键信息 | 一致性 |
|---|---|---|---|
| `docs/PRD-v3.md` | [DONE] | 订阅制为主 + 隐藏买断 $59；14 天退款；Creem MOR；5 台设备；30 次/月额度；Top-up | ✅ 已对齐 |
| `docs/pricing-calibration-v3.md` | [DONE] | 月 $19 / 年 $99 / 买断 $59；14 天退款；Top-up $5/10 或 $0.50/次 | ✅ 已对齐 |
| `docs/MVP-NOT-DO.md` | v1 已同步 | §2.3 商业模式改为订阅制为主 | ✅ 已对齐 |
| `docs/copy-freeze.md` | v3 | 已包含 Privacy/Terms/Refund/Cookie 文案段落，但首页 Primary CTA 指向 `/pricing` 与 PRD §8.1 冲突 | ⚠️ 05 copy-freeze 需修正 |
| `project-control.md` | 2026-07-29 | 已更新为「退款窗 14 天」 | ✅ 已对齐 |
| `docs/open-items.md` | 2026-07-29 | 04 compliance 已 [GO with NEEDS_REVIEW] | 已更新 |
| `app/privacy/page.tsx` | 2026-07-21 | 仍写 Stripe；未提 device_id/KV/订阅 | ❌ 待 07 替换 |
| `app/terms/page.tsx` | 2026-07-21 | 仍写买断 license；未提订阅/Top-up/销售税 | ❌ 待 07 替换 |
| `app/refund/page.tsx` | 2026-07-21 | 仍写 Stripe；未提 credits/订阅退款 | ❌ 待 07 替换 |
| `app/cookie-policy/page.tsx` | 不存在 | — | ❌ 需 07 新建 |

---

## 3. 数据清单

| 数据类型 | 来源 | 用途 | 保留期 | 披露位置 |
|---|---|---|---|---|
| PDF 文件（免费 4 工具） | 用户上传，浏览器本地处理 | 本地处理 | 不上传 | Privacy §2 |
| PDF 文件（Convert to Word / fallback） | 用户上传，临时服务器处理 | 后端转换 | ≤ 1 小时自动删除 | Privacy §2 / Terms §2 |
| `device_id`（浏览器 fingerprint + IP hash） | 浏览器 + 后端生成 | 免费试用额度、设备限制、配额 | 订阅/授权有效期内；免费试用结束后 30 天 | Privacy §3.5 |
| 免费试用次数 | KV 存储 | 限制 3 次/30 天 | 同上 | Privacy §3.5 |
| 月度 Convert 额度 / credits 余额 | KV 存储 | 订阅/买断配额管理 | 订阅有效期内；授权结束后 30 天 | Privacy §3.5 |
| 邮箱地址 | 用户输入 / Creem | 发送 license、客服、退款 | 客服与税务记录 ≥ 6 年或依法 | Privacy §3 / Terms §4.5 |
| IP 地址 | 网络请求 | 限流、反滥用 | 7 天 | Privacy §3 |
| 订单信息（Creem） | Creem 回调 | 交付、客服、税务 | 税务记录 ≥ 6 年或依法 | Privacy §4 / Terms §4.5 |
| 联系/退款表单 | 用户输入 | 客服、退款 | ≥ 6 个月 | Privacy §4.5 |
| 分析事件 | 待定（Plausible/GA4/CF Web Analytics/PostHog/Clarity） | 产品优化 | 依供应商 | Privacy §6 / Cookie Policy |

---

## 4. 第三方服务映射

| 服务 | 角色 | 共享数据 | 用户退出方式 | 披露位置 |
|---|---|---|---|---|
| **Creem** (Armitage Labs OÜ, Estonia) | Merchant of Record；支付、订阅管理、销售税/VAT/GST 自动计算、反欺诈 | 订单详情、邮箱、账单地址、支付信息（我们不存卡号） | 通过 support@removepdfpages.com 取消订阅/请求删除 | Privacy §4 / Terms §4.5 / Refund |
| **Resend** | 邮件发送（license key、收据、客服） | 邮箱、订单摘要 | 联系我们删除客服记录 | Privacy §4 |
| **Cloudflare** | 托管、CDN、边缘安全 | 访问日志、IP | 不适用 | Privacy §4 |
| **分析工具（待确认）** | 访问/行为分析 | 匿名或 Cookie 数据 | 依具体供应商；选型后补充 | Privacy §6 / Cookie Policy |

---

## 5. 风险分级

### P0 / 阻塞

| # | 类型 | 位置 | 问题描述 | 修复建议 | 状态 |
|---|---|---|---|---|---|
| 1 | 上游决策冲突 | 退款窗口 | 已由用户 2026-07-29 确认为 **14 天**；已同步 PRD 决策变量、`project-control.md` | 无需修复 | 已解决 |

### P1 / 高

| # | 类型 | 位置 | 问题描述 | 修复建议 |
|---|---|---|---|---|
| 1 | 支付服务商披露 | 全部法律页 | 当前 `app/privacy/page.tsx`、`app/refund/page.tsx` 仍写 Stripe | 07 前端按本报告 §7 替换为 Creem |
| 2 | 订阅/买断/Top-up 条款 | Terms | 当前 Terms 仅描述买断 license，未提订阅、自动续订、取消、额度 | 07 前端按本报告 §7.2 替换 |
| 3 | 销售税/国际销售 | Terms / Checkout | 需确认 Creem 是否已开启自动计税并明确地理范围 | 产品确认后回填 Terms §4.5 |
| 4 | device_id 隐私披露 | Privacy | 当前 Privacy 未披露 fingerprint + IP hash 及 KV 存储 | 07 前端按本报告 §7.1 替换 |
| 5 | 订阅 webhook 缺失 | 后端 | 若未处理 `subscription.cancelled` / `subscription.expired`，用户到期后仍能使用 | 08 后端实现 Creem webhook |
| 6 | 首页 Primary CTA | `docs/copy-freeze.md` v3 | 当前 copy-freeze v3 将首页 Primary CTA 指向 `/pricing`，与 PRD §8.1「必须指向免费工具入口」冲突 | 05 copy-freeze 重跑时修正：Primary CTA → 免费工具入口；付费 CTA 仅放首页底部 |

### P2 / 中

| # | 类型 | 位置 | 问题描述 | 修复建议 |
|---|---|---|---|---|
| 1 | 分析工具选型 | Privacy / Cookie | 未确定 GA4/Plausible/PostHog/Clarity | 选型后更新 Privacy §6 和 Cookie Policy |
| 2 | Launch Special 边界 | Pricing / Terms | 无具体截止日期或数量限制 | 保守披露 `limited time, may end without notice` |
| 3 | 后端单次成本 | 成本模型 | 影响 Top-up 定价安全垫 | 08 后端确认后回填 |
| 4 | 订阅到期状态 | Terms | 是否保留免费 3 次/30 天额度 | 产品确认后回填 Terms §3 |
| 5 | 数据契约过时 | `docs/data-contract.md` v1 | 仍写 Stripe / 旧授权模型 | 08 后端启动前需重跑或同步 |
| 6 | 页面矩阵过时 | `docs/page-matrix.md` v1 | 仍写买断制 / Stripe | 05/06/07 阶段需同步更新 |

### P3 / 低

| # | 类型 | 位置 | 问题描述 | 修复建议 |
|---|---|---|---|---|
| 1 | 邮件送达 | /success | license/收据邮件可能进垃圾邮件 | 使用 Resend；支持页提供重发 |
| 2 | Footer 法律链接 | Footer | 当前指向 `/contact` | 07 改为 `/privacy` `/terms` `/refund` `/cookie-policy` |
| 3 | Sitemap 过期 | `public/sitemap.xml` | 仍包含 `/workspace` | 07/10 阶段移除或 301 |

---

## 6. 法律页 Route Contract

| 路由 | 页面 | 索引 | 备注 |
|---|---|---|---|
| `/privacy` | Privacy Policy | yes | 必须存在；07 按本报告 §7.1 替换内容 |
| `/terms` | Terms of Service | yes | 必须存在；07 按本报告 §7.2 替换内容 |
| `/refund` | Refund Policy | yes | 必须存在；07 按本报告 §7.3 替换内容 |
| `/cookie-policy` | Cookie Policy | yes | **新增**；07 按本报告 §7.4 新建 |
| `/contact` | Contact & Refund | yes | 退款操作入口；保留现有表单结构 |
| `/faq` | Help & FAQs | yes | 含定价/退款/税务/设备/订阅 FAQ |

**Footer 必须链接**：`/privacy`、`/terms`、`/refund`、`/cookie-policy`。

**Header/Footer 其他合规要求**：
- 首页 `/` 首屏 Primary CTA 必须指向免费工具入口（PRD §8.1）。
- 付费转化入口 CTA 统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`。
- 工具页 / Footer 必须包含 `RemovePDFPages is a standalone tool and is not affiliated with Adobe, Foxit, or any other PDF software company.` 声明。

---

## 7. 法律页草稿（供 07 前端替换）

### 7.1 `/privacy` — Privacy Policy

**页面元信息**
- **Title**：`Privacy Policy - RemovePDFPages`
- **Meta Description**：`RemovePDFPages privacy policy: how we handle your files, device data, and order information.`
- **H1**：`Privacy Policy`
- **Last updated**：`July 29, 2026`

**1. Overview**  
RemovePDFPages operates removepdfpages.net. This Privacy Policy explains how we handle information when you use our free PDF tools and the Full Editor subscription or one-time license.

**2. Files and PDFs**  
- **Free tools:** By default, Remove Pages, Merge, Compress, and Sign process your files entirely in your browser. Your PDFs are not uploaded to our servers.  
- **Convert PDF to Word:** This feature requires server-side processing. Your file is uploaded temporarily and deleted automatically within 1 hour.

**3. Data we collect**  
- Device identifier (browser fingerprint + IP hash) for free trial and device-limit enforcement.  
- Convert to Word usage counts and credit balances stored in our KV database.  
- Email address at checkout and in contact/refund forms.  
- IP address for rate limiting and abuse prevention (retained up to 7 days).  
- Billing address, payment details, and order details processed by Creem, our Merchant of Record. We do not store full card numbers.  
- Subscription status, renewal dates, and cancellation requests processed by Creem. We store a subscription status flag to enforce Convert to Word quotas and access.

**3.5. Device Identifier & Quota Storage**  
To enforce free trial limits and license device limits without requiring user accounts, we generate a device identifier (`device_id`) based on a combination of browser characteristics and a one-way hash of your IP address. This identifier is stored in our key-value (KV) database along with your free trial usage count, monthly Convert to Word quota, and any purchased top-up credits. The device_id is not tied to your name, email, or PDF content. We retain this quota data for the duration of your active subscription or license, or for 30 days after the free trial period ends if you do not purchase.

**4. Third parties**  
We use Creem (Armitage Labs OÜ, Estonia) as our Merchant of Record (MOR). Creem processes payments, automatically calculates and remits applicable sales tax/VAT/GST based on the buyer's billing address, and handles fraud prevention. Creem also manages subscription billing, renewals, and cancellations. We do not store full card numbers. Creem shares order details with us so we can deliver the license key and provide support.

We use Resend for license emails and Cloudflare for hosting. We do not sell your data or use your PDFs for training or advertising.

`[待确认：第三方分析工具选型确定后，在此补充具体 provider、Cookie 使用情况、opt-out 方式。]`

**4.5. Data Retention**  
- Free-tool PDFs: never uploaded.  
- Backend-processed PDFs (Convert to Word / fallback): deleted within 1 hour.  
- Checkout email and order data: retained for customer service and tax record purposes for at least 6 years or as required by law. Order data is shared with Creem, our Merchant of Record, for tax and compliance purposes.  
- Device identifier and quota data: retained while subscription or license is active, or 30 days after free trial ends.  
- Subscription status and renewal dates: retained while the subscription is active, and for 30 days after cancellation or expiration.  
- Contact form submissions: retained for at least 6 months.  
- Analytics data: retention depends on the selected analytics provider `[待确认]`.

**5. Your rights**  
You can contact us to access, update, or delete your checkout email and contact records by emailing support@removepdfpages.com. Because we do not store free-tool PDFs, there is no PDF content to delete. Device identifiers and quota data are automatically deleted after subscription cancellation, license expiration, or free trial expiry.

**6. Analytics / Cookie Disclosure**  
We may use analytics to understand how the site is used. The specific provider, whether it uses cookies, and how to opt out will be disclosed here once the provider is selected. Until then, no third-party analytics cookies are placed without this notice being updated. See also our [Cookie Policy](/cookie-policy).

---

### 7.2 `/terms` — Terms of Service

**页面元信息**
- **Title**：`Terms of Service - RemovePDFPages`
- **Meta Description**：`RemovePDFPages terms of service, license agreement, subscription terms, and usage policies.`
- **H1**：`Terms of Service`
- **Last updated**：`July 29, 2026`

**1. Acceptance**  
By accessing or using RemovePDFPages, you agree to these Terms of Service. If you do not agree, do not use the Service.

**2. Description of the Service**  
RemovePDFPages provides browser-based PDF tools. The free tools (Remove Pages, Merge, Compress, Sign) are processed locally in your browser by default. Convert PDF to Word and optional backend fallback processing require temporary server-side upload and are deleted within 1 hour. The Full Editor is available as a monthly subscription ($19/month Launch Special, standard $29/month), an annual subscription ($99/year, standard $149/year), or a one-time license ($59, standard $79) for the current major version (v1.x). All paid plans include 30 Convert to Word conversions per calendar month. Additional conversions may be purchased as top-up credits at  or $5 for 10. Free users may try Convert to Word up to 3 times per 30-day period.

**3. Full Editor Subscription & License**  
The Full Editor is offered as a monthly subscription, an annual subscription, or a one-time license. Subscriptions bill automatically until canceled. You may cancel anytime; cancellation takes effect at the end of the current billing period. The one-time license is a single payment for the current major version of RemovePDFPages (v1.x). It includes updates within v1.x but does not guarantee updates for a future major version or new platform. All paid plans may be activated on up to 5 personal devices; we record a device fingerprint at activation to enforce this limit. You may not share, resell, or redistribute your license key. The license is non-transferable except where required by law.

`[待确认：订阅到期后是否保留免费 3 次/30 天额度，由产品确认后回填。]`

**3.5. Top-Up Credits**  
Top-up credits are sold in packs of 2 conversions ($1) or 10 conversions ($5). The minimum purchase is $1/2 credits. Credits are non-transferable and expire only upon use or license/subscription revocation. Unused credits may be refunded within 14 days of purchase if requested; used credits are not refundable. Creem processing fees are not refunded on any refund.

**3.6. Pricing Changes**  
The $19/month Launch Special and $99/year Launch Special are limited-time introductory prices. We may end the launch period at any time and return to the standard prices of $29/month and $149/year without prior notice. Prices displayed at checkout at the time of purchase are the prices that apply to that purchase. `[待确认：具体截止日期或数量限制由产品确认后回填。]`

**4. Acceptable Use**  
You agree not to use the service to process unlawful, harmful, infringing, or otherwise objectionable content. You may not attempt to circumvent free trial limits, device limits, or rate limits. We may suspend or revoke a license or subscription for violations.

**4.5. Sales Tax & Geographic Scope**  
All prices are shown in USD. For purchases in the United States, applicable state and local sales tax will be calculated and collected automatically by Creem at checkout. International purchases may be subject to VAT or other local taxes; the buyer is responsible for compliance with local laws. The service is primarily offered to users in the United States; access from other jurisdictions does not create a local presence or obligation beyond these Terms. `[待确认：若开放国际销售，需补充 VAT 和管辖地条款。]`

**5. Refunds**  
Full Editor subscriptions and one-time licenses are eligible for a full refund within 14 days of purchase, no questions asked, by contacting support@removepdfpages.com or through the refund form. Creem processing fees are not refundable. We reserve the right to refuse refunds in cases of abuse, fraud, license redistribution, or after the 14-day window. Top-up credits are refundable only if unused and requested within 14 days of purchase; used credits are not refundable.

**6. Governing Law / Dispute Resolution**  
These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any dispute shall be resolved in the state or federal courts located in Delaware.

**7. Disclaimer & Limitation of Liability**  
The service is provided “as is” and “as available” without warranties of any kind. PDF conversion, compression, and signing results depend on the input file; we do not guarantee perfect output. In no event shall our liability exceed the amount you paid for the service in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.

---

### 7.3 `/refund` — Refund Policy

**页面元信息**
- **Title**：`Refund Policy - RemovePDFPages`
- **Meta Description**：`RemovePDFPages refund policy: 14-day refund for Full Editor subscriptions, one-time licenses, and unused top-up credits.`
- **H1**：`Refund Policy`
- **Last updated**：`July 29, 2026`

**1. Refund Eligibility**  
RemovePDFPages offers a 14-day, no-questions-asked refund for all Full Editor subscriptions and one-time licenses. If you are not satisfied, you may request a full refund within 14 days of your purchase date.

**1.5. Top-Up Credits Refund**  
Top-up credits ("2 conversions for $1" or "10 conversions for $5") are refundable only if they have not been used and the refund is requested within 14 days of purchase. Once a credit has been consumed for a conversion, it is not refundable. Refunds for unused credits are processed through Creem and may take 5–10 business days to appear on your statement. Creem processing fees are not refunded.

**2. How to Request a Refund**  
Submit your request through our [Contact page](/contact) or by emailing support@removepdfpages.com. Include your Creem order ID and the email address used during checkout.

**3. Processing Time**  
Refunds are processed through Creem and usually appear within 5–10 business days, depending on your bank.

**4. Exceptions**  
We reserve the right to deny refunds in cases of abuse, fraud, license key redistribution, or after the 14-day window. Refunds of subscriptions or licenses will revoke the associated license key and any unused top-up credits. Creem payment processing fees are not returned by Creem; we absorb this cost on every refund.

---

### 7.4 `/cookie-policy` — Cookie Policy（新增）

**页面元信息**
- **Title**：`Cookie Policy - RemovePDFPages`
- **Meta Description**：`RemovePDFPages cookie policy: how we use cookies and similar technologies.`
- **H1**：`Cookie Policy`
- **Last updated**：`July 29, 2026`

**1. What are cookies**  
Cookies are small text files placed on your device by websites you visit.

**2. How we use cookies**  
We do not currently use third-party analytics or advertising cookies. We may use essential cookies required for the service to function, such as security and rate limiting. If we add analytics cookies in the future, we will update this policy and, where required by law (e.g., EU/UK/California), obtain your consent before placing non-essential cookies.

**3. Third-party cookies**  
We do not currently allow third-party advertising cookies. Any future analytics provider will be listed here once selected.

**4. Managing cookies**  
You can manage or delete cookies through your browser settings. For more information, visit the help pages of your browser.

**5. Changes**  
We may update this Cookie Policy from time to time. The latest version will be posted at this page with the updated date.

---

## 8. 全站禁用词 / 高风险表达清单

### 8.1 全站禁用

| 禁词/表达 | 风险 | 处理方式 |
|---|---|---|
| `official` | 品牌侵权/误导 | 禁用 |
| `guaranteed` | 无法保证效果 | 禁用，改为“we aim to” / “designed to” |
| `100% accurate` / `perfect` | 转换/压缩无法完美 | 禁用 |
| `free forever` | 商业模式可能变更 | 禁用，改为“currently free” |
| `unlimited` / `no limits` | 免费额度有限制 | 禁用，必须明确限制 |
| `lifetime updates` | 未定义主版本范围 | 禁用，改为“updates for the current major version” |
| `AI-powered` | 未使用 AI | 禁用 |
| `open source` | 若不是开源 | 禁用 |
| `legal signature` / `legally binding` | 仅手绘签名 | 禁用 |
| `best` / `top` | 博客竞品对比绝对化 | 禁用 |
| `full editor forever` | Lifetime 边界不清 | 禁用 |
| `compress any file` / `unlimited compression` | 有 50MB/200页限制 | 禁用 |
| `perfect conversion` / `100% formatting` | 转换不可能完美 | 禁用 |
| `Adobe alternative` / `Foxit alternative` 作为主标题 | 可能引发品牌纠纷 | 博客标题改为“Alternatives to Consider”，正文加“not affiliated with”声明 |

### 8.2 页面特定禁用

- `/sign`：`legally binding`, `e-signature compliant`, `digital certificate signature`
- `/convert-to-word`：`perfect conversion`, `100% formatting`, `exact same layout`
- `/compress`：`compress any file`, `unlimited compression`, `lossless always`
- `/pricing`：`lifetime updates`, `unlimited conversions`, `free forever`, `$19 one-time`

### 8.3 必须出现的披露语句

以下语句必须在对应页面或全站文案中出现，05 Copy Freeze v3 / 07 前端实现必须纳入：

| 位置 | 必须出现的披露语句 | 原因 |
|---|---|---|
| `/pricing` 卡片 / 对比表 | `Convert PDF to Word: 30 conversions/month included` | 避免买断后无限制误解 |
| `/pricing` 卡片 / 对比表 | `Extra conversions: $1/2 credits or $5/10 credits` | 明确 Top-up 价格 |
| `/pricing` 卡片 | `Launch price for a limited time. Standard price is $29/month.` | 明确限时首发价 |
| `/pricing` 卡片 | `Use on up to 5 personal devices` | 设备限制披露 |
| `/convert-to-word`（未购买） | `You have X free conversions left this 30-day period.` | 免费试用额度 |
| `/convert-to-word`（未购买） | `Free users get 3 conversions per 30 days. Full Editor includes 30 per month.` | 额度对比 |
| `/convert-to-word`（已购买，额度用完） | `You’ve used your 30 included conversions this month. Buy 10 more for $5 or .` | Top-up 触发 |
| `/convert-to-word` 数据流提示 | `This tool uses a backend server. Your file is uploaded temporarily and deleted automatically within 1 hour.` | 隐私披露 |
| `/checkout` | `Payments processed by Creem, our Merchant of Record. We do not store your card details.` | 支付安全 |
| `/checkout` | `Sales tax, VAT, and GST are calculated and collected automatically by Creem based on your location.` | 销售税披露 |
| `/checkout` | `14-day refund policy. Subscriptions and the one-time license are refundable within 14 days.` | 退款披露（若最终改为 7 天需同步替换） |
| `/checkout` | `Includes 30 Convert to Word conversions per month.` | 额度披露 |
| `/faq` / 定价区 | `One-time license means the current major version of RemovePDFPages Full Editor (v1.x).` | Lifetime 边界 |
| `/faq` / 退款区 | `Creem does not refund payment processing fees. We absorb this cost on every refund.` | 退款成本披露 |
| `/refund` | `Top-up credits are refundable only if unused and requested within 14 days.` | credits 退款（若最终改为 7 天需同步替换） |
| 工具页 / Footer | `RemovePDFPages is a standalone tool and is not affiliated with Adobe, Foxit, or any other PDF software company.` | 避免品牌侵权暗示 |
| 免费工具页面 | `Currently free. Fair-use limits: 50 MB / 200 pages / 10–20 tasks per hour from the same IP.` | 公平使用限制 |
| `/sign` | `This tool creates a visual signature image on the PDF. It is not a digital certificate signature and is not legally binding for regulated electronic-signing requirements.` | 签名法律效力免责声明 |
| `/convert-to-word` | `Conversion results depend on the original PDF structure; complex layouts may need cleanup.` | 避免“完美转换”承诺 |
| `/compress` | `Compression results depend on the original PDF. Scanned documents and image-heavy files may compress less than text-based PDFs.` | 避免效果承诺 |
| 首页 / 定价 | `No signup required` / `No watermark on free tools` / `Monthly, yearly, or one-time license options` | 信任条 |

---

## 9. QA 合规验收点

### 9.1 法律页内容

- [ ] `/privacy` 内容与本报告 §7.1 一致，特别包含：
  - [ ] 免费 4 工具不上传
  - [ ] Convert to Word / fallback 临时上传并 1 小时删除
  - [ ] device_id 生成与 KV 配额存储披露
  - [ ] Creem 作为 MOR 披露
  - [ ] 数据保留期
- [ ] `/terms` 内容与本报告 §7.2 一致，特别包含：
  - [ ] 订阅 + 买断 + Top-up 模式
  - [ ] 自动续订 + 随时取消
  - [ ] 30 次/月额度 + 3 次/30 天免费试用
  - [ ] 5 台设备限制
  - [ ] 14 天退款（或用户确认后的 7 天）
  - [ ] 销售税/地理范围
  - [ ] Delaware 管辖
- [ ] `/refund` 内容与本报告 §7.3 一致，特别包含：
  - [ ] 14 天退款（或用户确认后的 7 天）
  - [ ] Top-up credits 退款规则
  - [ ] Creem 处理费不退
- [ ] `/cookie-policy` 内容与本报告 §7.4 一致，新增页面
- [ ] 所有法律页 Last updated 日期一致（建议 2026-07-29 或更晚）

### 9.2 站点范围

- [ ] Footer 法律链接指向 `/privacy`、`/terms`、`/refund`、`/cookie-policy`
- [ ] 全站无禁用词（扫描清单 §8.1）
- [ ] `/pricing` 无 $29 独立购买卡片；$29 仅作为 Monthly 原价锚点，$149 仅作为 Yearly 原价锚点
- [ ] 首页 `/` 首屏 Primary CTA 指向免费工具入口（PRD §8.1）
- [ ] 付费转化入口 CTA 统一为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`
- [ ] `/checkout` 展示 Monthly / Yearly / One-time 三个选项，默认 Monthly
- [ ] `/convert-to-word` 展示免费试用额度、Top-up CTA、1 小时 TTL 提示
- [ ] `/sign` 显示“not a digital certificate signature”免责声明
- [ ] 工具页和 Footer 包含“not affiliated with Adobe/Foxit”声明

### 9.3 后端/集成

- [ ] Creem 商户账户、订阅/买断 plan、webhook 已配置并测试
- [ ] `/api/convert` 配额校验实现（3 次/30 天免费、30 次/月付费、已用 credits）
- [ ] `/api/subscription/purchase` / `/api/credits/purchase` 实现
- [ ] 订阅续订/取消/过期 webhook 处理
- [ ] 临时文件 TTL 1 小时删除
- [ ] `device_id` 生成与 KV 配额存储实现

---

## 10. 待确认项汇总

| # | 待确认项 | 负责方 | 建议 | 阻塞等级 |
|---|---|---|---|---|
| 1 | 退款窗口：7 天 vs 14 天 | 用户/产品 | 本报告按 14 天起草；如改为 7 天需修改 PRD 决策变量并重新冻结 | P0 |
| 2 | Creem 订阅产品配置、目标销售国家、webhook 状态 | 开发/运营 | 必须在美国/国际销售时自动计税 | P0 |
| 3 | $19 Launch Special 具体截止日期/数量限制 | 产品/运营 | 保守披露 `may end without notice` | P1 |
| 4 | 第三方分析工具最终选型 | 产品/开发 | 选型后立即更新 Privacy/Cookie Policy | P2 |
| 5 | 最终后端方案及真实单次成本 | 开发 | 影响成本模型与盈亏监控 | P1 |
| 6 | 订阅到期后用户状态（是否保留免费 3 次/30 天额度） | 产品 | 建议保留；需 Terms 确认 | P2 |
| 7 | 首页 Primary CTA 指向免费工具入口 vs `/pricing` | 产品/文案 | 按 PRD §8.1 应指向免费工具；05 copy-freeze 需修正 | P1 |

---

## 11. 下游交接摘要

### 当前结论
- **状态**：[GO with NEEDS_REVIEW]
- **一句话结论**：订阅制商业模式合规；法律页已按 v3 商业模式重新起草；主要阻塞为退款窗口 7 天 vs 14 天的上游冲突，以及 Creem 配置/销售地理范围等 [待确认] 项。

### 本阶段交付物
- 文件：`/home/ubuntu/fancy-text-site/docs/compliance-report.md` v3
- 核心判断：
  - 订阅制为主 + 隐藏买断 $59 与 `MVP-NOT-DO.md` v1 无冲突。
  - Terms / Privacy / Refund / Cookie Policy 已按 PRD v3 和 pricing v3 更新。
  - 退款窗口存在上游冲突，需用户确认。
- 已确认项：
  - 数据流（免费 4 工具本地处理；Convert to Word 后端 TTL 1 小时）。
  - 买断后 Lifetime 边界为 v1.x。
  - 设备限制为 5 台。
  - 14 天退款政策（待与 7 天冲突解决）。
  - Top-up credits 退款规则：未使用 14 天内可退，已使用不可退。
  - 法律页 route contract：新增 `/cookie-policy`。
- 待确认项：见第 10 节。

### 风险
- **P0**：退款窗口上游冲突；未解决前不能视为最终合规。
- **P1**：Creem 配置、销售税、销售地理范围待确认；当前法律页文案已按保守披露处理。
- **P1**：首页 Primary CTA 与 copy-freeze v3 冲突；05 copy-freeze 需按 PRD §8.1 修正。
- **P2**：分析工具选型、后端成本、订阅到期状态。
- **P2**：`docs/data-contract.md` v1 和 `docs/page-matrix.md` v1 仍写旧商业模式；08/05 阶段需同步。

### 给下游的最小必要信息
- **下一阶段**：05 Copy Freeze v3（已有 v3 但需要基于本报告最终确认）/ 06 design / 07 frontend / 08 backend
- **必须读取**：`docs/compliance-report.md` v3、`docs/PRD-v3.md`、`docs/pricing-calibration-v3.md`、`docs/copy-freeze.md` v3、`docs/MVP-NOT-DO.md`、`docs/data-contract.md`
- **不能改动/不能假设**：
  - 不能假设当前 `app/privacy/page.tsx`、`app/terms/page.tsx`、`app/refund/page.tsx` 已足够；必须按本报告 §7 替换。
  - 不能假设 7 天退款已被确认；当前 PRD/定价/Refund 页均写 14 天。
  - 不能假设 Creem 已配置；税务披露需待确认后更新。
  - 不能假设 device_id 隐私披露已存在。
  - 不能假设 `/cookie-policy` 已存在；07 需新建。
  - 不能忽略首页 Primary CTA 冲突；05 copy-freeze 必须按 PRD §8.1 修正为指向免费工具入口。
- **建议 05/07 启动 Prompt**：见 `docs/copy-freeze.md` v3 第 7 节；特别注意按本报告 §7 替换法律页内容、新增 `/cookie-policy`、修正首页 Primary CTA。

---

**[DONE] Compliance Report v3 已完成。**
