     1|# RemovePDFPages — Compliance Report v2
     2|
     3|> 项目：removepdfpages.net  
     4|> 当前阶段：04-compliance（基于 PRD v3 + pricing-calibration-v2.md 方案 A，支付服务商切换为 Creem）  
     5|> 输入：PRD-v3.md / pricing-calibration-v2.md / data-contract.md / MVP-NOT-DO.md / compliance-report.md（v1） / copy-freeze.md / app/privacy/page.tsx / app/terms/page.tsx / app/refund/page.tsx  
     6|> 状态：[GO with NEEDS_REVIEW]  
     7|> 更新日期：2026-07-23（v2.1，Creem MOR 更新）  
     8|> 执行人：合规审查官（jiancha）
     9|
    10|---
    11|
    12|## 1. 审查结论
    13|
    14|**结论：[GO with NEEDS_REVIEW]**
    15|
    16|方案 A（Freemium + lifetime 买断 + 按量 Top-up credits）在商业模式上**不违反** `MVP-NOT-DO.md` 中「不做订阅/月费模式」的条款；核心数据流（免费 4 工具客户端处理、Convert to Word / 后端 fallback 临时上传 TTL 1 小时）与现有 Privacy 披露一致；Lifetime 边界（v1.x）和设备限制（5 台）已在 Terms 中披露。
    17|
    18|**但存在 4 个 P0/P1 级待确认/待修改项，必须在 05 Copy Freeze v2 和 07 前端实现前完成：**
    19|
    20|1. **Terms 必须新增套餐、额度、销售税、销售地理范围、credits 退款、device_id 等披露**（当前 Terms 未覆盖 PRD v3 方案 A 的关键商业条款）。
    21|2. **Refund 必须新增 Top-up credits 退款政策**（当前 Refund 只覆盖 Full Editor 14 天退款）。
    22|3. **Privacy 必须新增 device_id / browser fingerprint + IP hash 及 KV 配额存储的披露**（当前 Privacy 只提到 IP，未提 device_id 或 KV）。
    23|4. **Creem 配置、目标销售地理范围、$19 Launch Special 截止日期/数量限制、分析工具选型** 仍为 [待确认]，需产品/运营在上线前回填。
    24|
    25|在以上法律页修改完成并再次复核前，结论保持 `[GO with NEEDS_REVIEW]`。
    26|
    27|> **免责声明**：本报告为合规审查辅助文档，不是法律意见。上线前建议由持有执业资格的律师最终审阅 Terms / Privacy / Refund 内容。
    28|
    29|---
    30|
    31|## 2. 确认项清单
    32|
    33|| 优先级 | 确认项 | 当前状态 | 期望结论 / 建议披露 | 阻塞影响 |
    34||---|---|---|---|---|
    35|| P0 | Top-up credits 退款政策 | ⚠️ [待确认] | **推荐方案**：未使用的 credits 可在购买后 14 天内申请退款；已使用的 credits 不可退款；Creem 手续费不退，由用户承担。必须在 Refund 和 Terms 中新增独立条款。 | 若不上线前确定，05/07 无法正确实现 credits 购买/退款逻辑，存在消费者保护争议。 |
    36|| P0 | Terms / Refund 额度披露 | ❌ 未充分披露 | Terms 必须写明：Full Editor 包含 10 次/月 Convert to Word；免费试用为 3 次/30 天；超出额度按 $0.50/次或 $5/10 次计费。Refund 必须明确 credits 退款政策。 | 未披露额度限制会导致“买断后无限制”的误导性期望，违反 FTC 消费者保护规则。 |
    37|| P0 | Creem 配置 | ⚠️ [待确认] | Terms 必须披露：美国销售税由 Creem 在购买时自动计算并收取；国际用户可能需自行承担 VAT。需确认 Creem 已开启并配置正确。 | 若未配置税务却收费，可能被各州税务机关追责；若未披露，用户投诉风险高。 |
    38|| P1 | `device_id` 隐私披露 | ❌ 未披露 | Privacy 必须新增：为限制免费试用额度和设备数量，系统会生成基于浏览器指纹 + IP hash 的 `device_id`，并存储在 KV 中，关联免费试用次数/月度额度/已购 credits。保留期：license 有效期内或免费试用期结束后 30 天。 | 未披露 device_id 采集和存储可能违反 GDPR / CCPA 的透明度要求。 |
    39|| P1 | 销售地理范围 | ⚠️ [待确认] | **推荐**：Terms 限制服务面向美国用户首发；国际用户自行承担适用法律和税务义务。若开放国际销售，需补充 VAT 和管辖地条款。 | 影响管辖地条款、Creem 配置、Privacy 中 Cookie 同意模态是否必要。 |
    40|| P1 | $19 Launch Special 边界 | ⚠️ [待确认] | Terms 和 Pricing 必须披露：$19 是限时首发价（Launch Special），可能在无通知的情况下结束并恢复 $29 标准价。具体截止日期或数量限制需产品确认。 | 若宣传“限时”却无边界，可能构成误导性 scarcity claim。 |
    41|| P2 | 分析工具最终选型 | ⚠️ [待确认] | Privacy 已预留披露位置；选型确定后必须立即更新 Privacy 与 Terms 的第三方服务列表。若使用 Google Analytics，需加入 Cookie 披露和（面向欧盟用户的）同意模态。 | 上线后切换分析工具未更新 Privacy，可能触发隐私合规风险。 |
    42|
    43|**维度判定表**
    44|
    45|| 维度 | 判定 | 说明 |
    46||---|---|---|
    47|| 方案 A 商业模式 | ✅ | 不违反 `MVP-NOT-DO.md`「不做订阅」条款；Top-up 为一次性 credits 购买。 |
    48|| 数据流一致性 | ✅ | 免费 4 工具客户端处理、Convert to Word 后端 TTL 1 小时与 Privacy 披露一致。 |
    49|| 定价/额度披露 | ⚠️ | Terms / Privacy 尚未充分披露额度、device_id、销售税等关键信息。 |
    50|| 退款政策 | ⚠️ | Full Editor 14 天退款已披露；Top-up credits 退款政策待定。 |
    51|| 第三方服务披露 | ⚠️ | Creem / Resend / Cloudflare 已披露；分析工具、Creem 状态待确认。 |
    52|
    53|---
    54|
    55|## 3. 必须修改的法律页面段落
    56|
    57|### 3.1 `app/privacy/page.tsx`（必须新增/修改）
    58|
    59|当前 Privacy 页面缺少 `device_id`、KV 存储、数据保留期、分析工具选型后更新等披露。建议按以下结构新增/修改：
    60|
    61|#### 新增第 3.5 节：Device Identifier & Quota Storage
    62|
    63|```text
    64|To enforce free trial limits and license device limits without requiring user accounts, we generate a device identifier (`device_id`) based on a combination of browser characteristics and a one-way hash of your IP address. This identifier is stored in our key-value (KV) database along with your free trial usage count, monthly Convert to Word quota, and any purchased top-up credits. The device_id is not tied to your name, email, or PDF content. We retain this quota data for the duration of your active license, or for 30 days after the free trial period ends if you do not purchase.
    65|```
    66|
    67|#### 修改第 3 节“Data we collect”
    68|
    69|增加：
    70|
    71|```text
    72|- Device identifier (browser fingerprint + IP hash) for free trial and device-limit enforcement.
    73|- Convert to Word usage counts and credit balances stored in our KV database.
    74|- Email address at checkout and in contact/refund forms.
    75|- IP address for rate limiting and abuse prevention (retained up to 7 days).
    76|```
    77|
    78|#### 新增第 4.5 节：Data Retention
    79|
    80|```text
    81|- Free-tool PDFs: never uploaded.
    82|- Backend-processed PDFs (Convert to Word / fallback): deleted within 1 hour.
    83|- Checkout email and order data: retained for customer service and tax record purposes for at least 6 years or as required by law. Order data is shared with Creem, our Merchant of Record, for tax and compliance purposes.
    84|- Device identifier and quota data: retained while license is active, or 30 days after free trial ends.
    85|- Contact form submissions: retained for at least 6 months.
    86|- Analytics data: retention depends on the selected analytics provider (to be disclosed once finalized).
    87|```
    88|
    89|#### 修改第 4 节“Third parties”
    90|
    91|增加 Creem 披露：
    92|
    93|```text
    94|We use Creem (Armitage Labs OÜ, Estonia) as our Merchant of Record (MOR). Creem processes payments, automatically calculates and remits applicable sales tax/VAT/GST based on the buyer's billing address, and handles fraud prevention. We do not store full card numbers. Creem shares order details with us so we can deliver the license key and provide support.
    95|```
    96|
    97|#### 新增第 6 节：Analytics / Cookie Disclosure（待选型后更新）
    98|
    99|```text
   100|We may use analytics to understand how the site is used. The specific provider, whether it uses cookies, and how to opt out will be disclosed here once the provider is selected. Until then, no third-party analytics cookies are placed without this notice being updated.
   101|```
   102|
   103|#### 修改第 5 节“Your rights”
   104|
   105|增加：
   106|
   107|```text
   108|Because we do not require accounts, you can request deletion of your checkout email and contact records by emailing support@removepdfpages.com. Device identifiers and quota data are automatically deleted after license expiration or free trial expiry.
   109|```
   110|
   111|---
   112|
   113|### 3.2 `app/terms/page.tsx`（必须新增/修改）
   114|
   115|当前 Terms 未覆盖方案 A 的套餐、额度、销售税、销售范围、credits、责任限制等。建议新增以下章节：
   116|
   117|#### 修改第 2 节“Description of the Service”
   118|
   119|```text
   120|RemovePDFPages provides browser-based PDF tools. The free tools (Remove Pages, Merge, Compress, Sign) are processed locally in your browser by default. Convert PDF to Word and optional backend fallback processing require temporary server-side upload and are deleted within 1 hour. The Full Editor is a one-time license for the current major version (v1.x) and includes 10 Convert to Word conversions per calendar month. Additional conversions may be purchased as top-up credits at $0.50 each or $5 for 10 conversions. Free users may try Convert to Word up to 3 times per 30-day period.
   121|```
   122|
   123|#### 修改第 3 节“Full Editor License”
   124|
   125|```text
   126|The Full Editor license is a one-time purchase for the current major version of RemovePDFPages (v1.x). It includes updates within v1.x but does not guarantee updates for a future major version or new platform. The license may be activated on up to 5 personal devices; we record a device fingerprint at activation to enforce this limit. You may not share, resell, or redistribute your license key. The license is non-transferable except where required by law.
   127|```
   128|
   129|#### 新增第 3.5 节：Top-Up Credits
   130|
   131|```text
   132|Top-up credits are sold in packs of 1 conversion ($0.50) or 10 conversions ($5). Credits are non-transferable and expire only upon use or license revocation. Unused credits may be refunded within 14 days of purchase if requested; used credits are not refundable. Creem processing fees are not refunded on any refund.
   133|```
   134|
   135|#### 新增第 3.6 节：Pricing Changes
   136|
   137|```text
   138|The $19 Launch Special is a limited-time introductory price. We may end the launch period at any time and return to the standard price of $29 without prior notice. Prices displayed at checkout at the time of purchase are the prices that apply to that purchase.
   139|```
   140|
   141|#### 新增第 4.5 节：Sales Tax & Geographic Scope
   142|
   143|```text
   144|All prices are shown in USD. For purchases in the United States, applicable state and local sales tax will be calculated and collected automatically by Creem at checkout. International purchases may be subject to VAT or other local taxes; the buyer is responsible for compliance with local laws. The service is primarily offered to users in the United States; access from other jurisdictions does not create a local presence or obligation beyond these Terms.
   145|```
   146|
   147|#### 修改第 5 节“Refunds”
   148|
   149|```text
   150|Full Editor purchases are eligible for a full refund within 14 days of purchase, no questions asked, by contacting support@removepdfpages.com or through the refund form. Creem processing fees are not refundable. We reserve the right to refuse refunds in cases of abuse, fraud, license redistribution, or after the 14-day window. Top-up credits are refundable only if unused and requested within 14 days of purchase; used credits are not refundable.
   151|```
   152|
   153|#### 新增第 6 节：Acceptable Use & Prohibited Content（保持原有内容并扩展）
   154|
   155|```text
   156|You agree not to use the service to process unlawful, harmful, infringing, or otherwise objectionable content. You may not attempt to circumvent free trial limits, device limits, or rate limits. We may suspend or revoke a license for violations.
   157|```
   158|
   159|#### 新增第 7 节：Governing Law / Dispute Resolution
   160|
   161|```text
   162|These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law principles. Any dispute shall be resolved in the state or federal courts located in Delaware.
   163|```
   164|
   165|#### 新增第 8 节：Disclaimer & Limitation of Liability
   166|
   167|```text
   168|The service is provided “as is” and “as available” without warranties of any kind. PDF conversion, compression, and signing results depend on the input file; we do not guarantee perfect output. In no event shall our liability exceed the amount you paid for the service in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
   169|```
   170|
   171|---
   172|
   173|### 3.3 `app/refund/page.tsx`（必须新增/修改）
   174|
   175|当前 Refund 页面只覆盖 Full Editor 14 天退款。需要新增 Top-up credits 退款条款：
   176|
   177|#### 新增第 1.5 节：Top-Up Credits Refund
   178|
   179|```text
   180|Top-up credits ("10 conversions for $5" or "$0.50 per conversion") are refundable only if they have not been used and the refund is requested within 14 days of purchase. Once a credit has been consumed for a conversion, it is not refundable. Refunds for unused credits are processed through Creem and may take 5–10 business days to appear on your statement. Creem processing fees are not refunded.
   181|```
   182|
   183|#### 修改第 4 节“Exceptions”
   184|
   185|```text
   186|We reserve the right to deny refunds in cases of abuse, fraud, license key redistribution, or after the 14-day window. Refunds of Full Editor licenses will revoke the associated license key and any unused top-up credits. Creem payment processing fees (3.9% + $0.40 per transaction) are not returned by Creem; we absorb this cost on every refund.
   187|```
   188|
   189|---
   190|
   191|## 4. 风险清单更新（与 PRD v3 §11.7 对齐）
   192|
   193|| 风险等级 | 类型 | 位置 | 问题描述 | 引用标准 | 修复建议 | 状态 |
   194||---|---|---|---|---|---|---|
   195|| 🔴 高 | 买断后成本不可控 | 后端 Convert to Word | 若用户高频使用，10 次/月额度可能无法覆盖成本 | 成本模型 | 严格按 Top-up 计费；上线后监控实际后端成本与使用频次；定价低于成本时触发重审 | 需 07 监控 |
   196|| 🔴 高 | 文案误导 / 未披露额度 | `/pricing` / `/convert-to-word` / Terms | 若未明确说明“10 次/月”限制，用户可能误解为买断后无限制 | FTC Act §5 | 所有文案必须写明“10 conversions/month included”；Terms 必须披露额度 | 待 05/07 落地 |
   197|| 🔴 高 | 免费试用滥用 | `/convert-to-word` | 无账户系统，脚本可换 IP 刷免费额度 | 成本控制 | 使用 fingerprint + IP + rate limit；监控异常 device_id；Privacy 披露 device_id 采集 | 待 07 实现 |
   198|| 🔴 高 | 销售税披露不足 | Terms / Checkout | Creem 配置状态未确认，Terms 未披露销售税 | 各州销售税法规 | 确认 Creem 开启；Terms 新增“自动计算销售税”披露；Checkout 显示预估税费 | 待确认 |
   199|| 🟡 中 | 价格欺诈 / 误导性折扣 | `/pricing` | $29 与 $19 同时作为独立卡片售卖 | FTC Act §5 | 保持 `$29` 仅作为 strikethrough 原价，`$19` 作为当前价；copy-freeze 已合规 | 05/07 已要求 |
   200|| 🟡 中 | 退款成本 | `/checkout` / Refund | 14 天无理由退款，每退一单损失 $0.40 Creem 手续费 | Creem 政策 | 在 FAQ / refund 页明确退款条件；监控退款率，>10% 时重审定价 | 已披露 |
   201|| 🟡 中 | Lifetime 边界 | `/terms` | 买断用户可能期望永久无限制更新 | 合约法 | Terms 已明确 lifetime 指当前主版本 v1.x；继续保留 | 已披露 |
   202|| 🟡 中 | 设备限制执行 | `/checkout` / Terms | 最多 5 台设备，但无账户系统 | 授权策略 | license key 激活记录设备指纹；Terms 已披露；超限需联系客服 | 已披露，待 07 实现 |
   203|| 🟡 中 | 订阅方案需修订 NOT-DO | 全局 | 方案 B 订阅模式违反当前 `MVP-NOT-DO.md` | 项目范围 | 当前采用方案 A，不涉及订阅；若未来考虑方案 B，必须先修订 PRD、NOT-DO、copy-freeze | 当前无风险 |
   204|| 🟡 中 | credits 退款政策 | Terms / Refund | 未使用 credits 是否可退未定 | 消费者保护 | 本报告推荐：未使用 credits 14 天内可退；已使用不可退；需写入 Terms / Refund | 待确认 |
   205|| 🟡 中 | device_id 隐私披露 | Privacy | 当前 Privacy 未披露 browser fingerprint + IP hash 及 KV 存储 | GDPR / CCPA | Privacy 新增 device_id 说明、用途、保留期 | 待 05/07 落地 |
   206|| 🟡 中 | 管辖地 / 国际销售 | Terms | 未限制销售地理范围和管辖法律 | 冲突法 | Terms 新增 Delaware 管辖、美国首发、国际用户自负法律义务 | 待确认 |
   207|| 🟡 中 | $19 Launch Special 边界 | Pricing / Terms / Checkout | 缺少截止日期或数量限制 | FTC 反误导 | 披露“limited time, may end without notice”；产品确认具体边界后回填 | 待确认 |
   208|| 🟢 低 | 邮件送达 | `/success` | license key 邮件可能进垃圾邮件 | CAN-SPAM | 使用 Resend/Postmark；支持页面提供重发 | 已计划 |
   209|| 🟢 低 | 分析工具隐私披露 | 全站 | 若启用 Google Analytics 需 Cookie 披露 | GDPR/CCPA/ePrivacy | 选型后更新 Privacy；必要时加入 Cookie 同意模态 | 待确认 |
   210|| 🟢 低 | 后端 fallback 与用户预期冲突 | 免费工具页面 | 页面文案说“files stay in browser”，但 fallback 会临时上传 | 消费者保护 / 隐私 | 触发后端 fallback 时明确弹窗告知用户并适用 1 小时 TTL | 已要求 |
   211|| 🟢 低 | 签名法律效力 | `/sign` | 手绘签名不是数字证书签名 | 各州电子签署法 | `/sign` 页面已包含免责声明；copy-freeze 已合规 | 已处理 |
   212|| 🟢 低 | Footer 法律链接 | `Footer.tsx` | 指向 /contact 而非 /privacy /terms /refund | 导航一致性 | 07 前端阶段必须修正 Footer 链接 | 待 07 落地 |
   213|
   214|---
   215|
   216|## 5. 给 05 Copy Freeze v2 的禁用词与强制披露要求
   217|
   218|### 5.1 必须出现的披露语句（不可省略）
   219|
   220|以下语句必须在对应页面或全站文案中出现，05 Copy Freeze v2 必须纳入：
   221|
   222|| 位置 | 必须出现的披露语句 | 原因 |
   223||---|---|---|
   224|| `/pricing` 卡片 / 对比表 | `Convert PDF to Word: 10 conversions/month included` | 避免买断后无限制误解 |
   225|| `/pricing` 卡片 / 对比表 | `Extra conversions: $0.50 each or $5 for 10` | 明确 Top-up 价格 |
   226|| `/pricing` 卡片 | `Launch price for a limited time. Standard price is $29.` | 明确限时首发价 |
   227|| `/pricing` 卡片 | `One-time payment. No subscription.` | 符合 NOT-DO 和卖点 |
   228|| `/pricing` 卡片 | `Use on up to 5 personal devices` | 设备限制披露 |
   229|| `/convert-to-word`（未购买） | `You have X free conversions left this 30-day period.` | 免费试用额度 |
   230|| `/convert-to-word`（未购买） | `Free users get 3 conversions per 30 days. Full Editor includes 10 per month.` | 额度对比 |
   231|| `/convert-to-word`（已购买，额度用完） | `You've used your 10 included conversions this month. Buy 10 more for $5 or $0.50 each.` | Top-up 触发 |
   232|| `/convert-to-word` 数据流提示 | `This tool uses a backend server. Your file is uploaded temporarily and deleted automatically within 1 hour.` | 隐私披露 |
   233|| `/checkout` | `14-day refund policy. License valid for the current major version.` | 退款 + Lifetime 边界 |
   234|| `/checkout` | `Payments processed by Creem, our Merchant of Record. We do not store your card details.` | 支付安全 |
   235|| `/checkout` | `Applicable sales tax, VAT, or GST will be calculated at checkout based on your billing address and remitted by Creem.` | 销售税披露 |
   236|| `/faq` / 定价区 | `Lifetime means the current major version of RemovePDFPages Full Editor (v1.x).` | Lifetime 边界 |
   237|| `/faq` / 退款区 | `Creem does not refund payment processing fees. We absorb a $0.40 fee per refund.` | 退款成本披露 |
   238|| `/refund` | `Top-up credits are refundable only if unused and requested within 14 days.` | credits 退款 |
   239|| 工具页 / Footer | `RemovePDFPages is a standalone tool and is not affiliated with Adobe, Foxit, or any other PDF software company.` | 避免品牌侵权暗示 |
   240|| 免费工具页面 | `Currently free. Fair-use limits: 50 MB / 200 pages / 10–20 tasks per hour from the same IP.` | 公平使用限制 |
   241|| `/sign` | `This is a visual signature image, not a digital certificate signature, and is not legally binding for regulated e-signing requirements.` | 签名法律效力免责声明 |
   242|| `/convert-to-word` | `Conversion results depend on the original PDF structure; complex layouts may need cleanup.` | 避免“完美转换”承诺 |
   243|| `/compress` | `Compression results depend on the original PDF. Scanned documents and image-heavy files may compress less than text-based PDFs.` | 避免效果承诺 |
   244|| 首页 / 定价 | `No signup required` / `No watermark on free tools` / `One-time payment, no subscription` | 信任条 |
   245|
   246|### 5.2 全站禁用词（继续执行）
   247|
   248|| 禁词 | 风险 | 处理方式 |
   249||---|---|---|
   250|| `official` | 品牌侵权/误导 | 禁用 |
   251|| `guaranteed` | 无法保证效果 | 禁用，改为“we aim to” / “designed to” |
   252|| `100% accurate` / `perfect` | 转换/压缩无法完美 | 禁用 |
   253|| `free forever` | 商业模式可能变更 | 禁用，改为“currently free” |
   254|| `unlimited` / `no limits` | 免费额度有限制 | 禁用，必须明确限制 |
   255|| `lifetime updates` | 未定义主版本范围 | 禁用，改为“updates for the current major version” |
   256|| `AI-powered` | 未使用 AI | 禁用 |
   257|| `open source` | 若不是开源 | 禁用 |
   258|| `legal signature` / `legally binding` | 仅手绘签名 | 禁用 |
   259|| `Adobe alternative` / `Foxit alternative` 作为主标题 | 可能引发品牌纠纷 | 博客标题已改为“Alternatives to Consider”，正文中若出现需加“not affiliated with”声明 |
   260|| `best` / `top` | 博客竞品对比绝对化 | 禁用 |
   261|| `full editor forever` | Lifetime 边界不清 | 禁用 |
   262|| `compress any file` / `unlimited compression` | 有 50MB/200页限制 | 禁用 |
   263|| `perfect conversion` / `100% formatting` | 转换不可能完美 | 禁用 |
   264|
   265|### 5.3 05 Copy Freeze v2 必须更新的页面
   266|
   267|05 Copy Freeze v2 需在 v1 基础上新增或修订以下页面文案：
   268|
   269|1. **`/pricing`**：确保 Full Editor 卡片包含 `10 conversions/month included`、`extra $0.50 each or $5/10`、`limited time launch price`、`up to 5 devices`。
   270|2. **`/convert-to-word`**：免费试用提示、额度用完提示、Top-up CTA 文案必须准确。
   271|3. **`/checkout`**：退款条款需包含 credits 退款；销售税披露（确认 Creem 后）。
   272|4. **`/faq`**：新增/更新关于 credits 退款、销售税、$19 Launch Special 边界的 FAQ。
   273|5. **`/terms`**（虽然由 04 合规输出内容，但 Copy Freeze 需确保前端展示不遗漏）：核对所有新增条款文案。
   274|6. **`/privacy`**：确保 device_id、KV 存储、数据保留期等文案在前端完整展示。
   275|7. **博客文章**：在介绍 Convert to Word 时，不得暗示买断后无限制；CTA 统一为 `$19 Launch Special`。
   276|
   277|---
   278|
   279|## 6. 下游交接：05 Copy Freeze v2 输入与验收标准
   280|
   281|### 6.1 必须读取的输入
   282|
   283|05 Copy Freeze v2 必须基于以下文件：
   284|
   285|- `docs/PRD-v3.md`（方案 A、额度、转化路径、CTA 统一要求）
   286|- `docs/pricing-calibration-v2.md`（价格、套餐、文案建议）
   287|- `docs/compliance-report.md` v2（本报告，含披露语句、禁用词、风险清单）
   288|- `docs/copy-freeze.md` v1（现有文案基础）
   289|- `docs/data-contract.md`（数据流、文件边界、API 错误码）
   290|- `docs/MVP-NOT-DO.md`（范围约束、不做订阅）
   291|- `app/privacy/page.tsx` / `app/terms/page.tsx` / `app/refund/page.tsx`（法律页当前内容，需按本报告修改）
   292|
   293|### 6.2 输出预期
   294|
   295|- 更新 `docs/copy-freeze.md` 为 v2，包含：
   296|  - 所有页面文案中必须出现的披露语句（第 5.1 节）。
   297|  - 与 PRD v3 一致的额度、价格、CTA 文案。
   298|  - 新增 `/privacy` / `/terms` / `/refund` 文案修改要求，而不是只由 07 前端修改代码。
   299|  - 新增关于 credits 退款、$19 Launch Special 边界、销售税的 FAQ 文案。
   300|  - 确认全站禁用词检查结果。
   301|
   302|### 6.3 验收标准
   303|
   304|05 Copy Freeze v2 通过前必须满足：
   305|
   306|- [ ] 所有付费入口 CTA 统一为 `$19 Launch Special`；$29 仅作为 strikethrough 原价。
   307|- [ ] `/pricing` 明确展示 `10 conversions/month included`、`extra $0.50 each or $5/10`、`limited time launch price`、`up to 5 devices`。
   308|- [ ] `/convert-to-word` 明确展示 `3 free conversions per 30 days`（未购买）和 `10 conversions/month included`（已购买）以及 Top-up CTA。
   309|- [ ] 所有文案避免 `unlimited` / `free forever` / `no limits` / `lifetime updates` / `perfect` / `100% accurate`。
   310|- [ ] `/sign` 保留 “not a digital certificate signature” 免责声明。
   311|- [ ] 工具页文案与数据流一致：免费工具默认本地处理；Convert to Word 后端临时上传并 1 小时删除。
   312|- [ ] FAQ 中新增关于 credits 退款、销售税、$19 Launch Special 边界、Lifetime 定义的回答。
   313|- [ ] Footer 法律链接指向 `/privacy` / `/terms` / `/refund`。
   314|- [ ] 博客标题不宣称 `best` / `top`；CTA 统一为 `$19 Launch Special`。
   315|- [ ] 未确认的 5 项（credits 退款、Creem、销售范围、Launch Special 边界、分析工具）在 Copy Freeze 中保留 `[待确认]` 占位或保守披露。
   316|
   317|---
   318|
   319|## 7. 待确认项汇总（必须上线前回填）
   320|
   321|| # | 待确认项 | 负责方 | 建议 | 阻塞等级 |
   322||---|---|---|---|---|
   323|| 1 | Top-up credits 退款政策（未使用 credits 是否可退） | 产品/运营 | 未使用 14 天内可退；已使用不可退 | P0 |
   324|| 2 | Creem 是否已配置 | 财务/开发 | 必须在美国销售时自动计算销售税 | P0 |
   325|| 3 | 目标销售地理范围（仅美国 vs 国际） | 产品/运营 | 建议美国首发，国际自负税务义务 | P1 |
   326|| 4 | $19 Launch Special 截止日期或数量限制 | 产品/运营 | 披露“limited time, may end without notice”；有具体日期后回填 | P1 |
   327|| 5 | 分析工具最终选型（Google Analytics / Plausible / Vercel Analytics） | 产品/开发 | 选型后立即更新 Privacy 与 Terms | P2 |
   328|| 6 | 最终后端方案（Workers + WASM / 第三方 API / 自托管）及真实单次成本 | 开发 | 影响成本模型与盈亏监控 | P1（技术） |
   329|| 7 | 用户实际平均生命周期、月转化率、平均使用频次 | 运营/数据 | 影响定价校准与成本模型 | P2（商业） |
   330|
   331|---
   332|
   333|## 8. 质量门槛自检
   334|
   335|- [x] 法律页与实际数据收集一致（免费工具本地处理；Convert to Word 后端 TTL 1 小时）。
   336|- [x] 第三方服务（Creem、Resend、Cloudflare）已映射。
   337|- [x] 方案 A 不违反 `MVP-NOT-DO.md`「不做订阅」条款。
   338|- [ ] Terms 尚未完全披露额度、销售税、销售范围、credits 退款、device_id（已给出修改要求，待前端实现）。
   339|- [ ] Refund 尚未披露 Top-up credits 退款政策（已给出修改要求）。
   340|- [ ] Privacy 尚未披露 device_id、KV 存储、数据保留期（已给出修改要求）。
   341|- [ ] Footer 法律链接尚未修正（已留给 07 前端）。
   342|- [ ] Creem 配置、销售地理范围、$19 Launch Special 边界、分析工具选型仍 [待确认]。
   343|
   344|---
   345|
   346|## 9. 下游交接摘要
   347|
   348|### 当前结论
   349|- **状态**：[GO with NEEDS_REVIEW]
   350|- **一句话结论**：方案 A 商业模式合规；法律页需按本报告修改额度、退款、销售税、device_id、Lifetime 边界等披露；4 个 P0/P1 项完成后可转 [GO]。
   351|
   352|### 本阶段交付物
   353|- 文件：`docs/compliance-report.md`（v2，本文件）
   354|- 核心判断：
   355|  - 方案 A 不违反 `MVP-NOT-DO.md`「不做订阅」约束。
   356|  - Terms / Refund / Privacy 需要新增具体条款以匹配 PRD v3 方案 A。
   357|  - 7 个确认项中 4 个仍需产品/运营回填，不能编造。
   358|- 已确认项：
   359|  - 数据流（免费 4 工具本地处理；Convert to Word 后端 TTL 1 小时）。
   360|  - 买断后 Lifetime 边界为 v1.x。
   361|  - 设备限制为 5 台。
   362|  - Full Editor 14 天退款政策。
   363|- 待确认项：见第 7 节。
   364|
   365|### 风险
   366|- **P0**：Terms / Refund / Privacy 未按本报告修改前，存在消费者保护、税务、隐私披露不足的合规风险。
   367|- **P1**：Creem 配置、销售地理范围、Launch Special 边界待确认。
   368|- **P2**：分析工具选型、博客发布计划、邮件送达。
   369|
   370|### 给下游的最小必要信息
   371|- **下一阶段**：05 Copy Freeze v2
   372|- **必须读取**：`docs/PRD-v3.md`、`docs/compliance-report.md` v2、`docs/pricing-calibration-v2.md`、`docs/copy-freeze.md` v1、`docs/data-contract.md`、`docs/MVP-NOT-DO.md`
   373|- **不能假设**：
   374|  - 不能假设法律页当前内容已足够；必须按本报告新增/修改。
   375|  - 不能假设 credits 退款政策已确定；Copy Freeze 必须保留保守披露或待确认占位。
   376|  - 不能假设 Creem 已配置；税务披露需待确认后更新。
   377|  - 不能假设 device_id 隐私披露已存在；Privacy 必须新增。
   378|- **建议 05 Copy Freeze v2 启动 Prompt**：
   379|
   380|```text
   381|请执行 05 Copy Freeze v2。输入：docs/PRD-v3.md + docs/compliance-report.md v2 + docs/pricing-calibration-v2.md + docs/copy-freeze.md v1 + docs/data-contract.md + docs/MVP-NOT-DO.md。要求：
   382|1. 统一所有付费入口 CTA 为 $19 Launch Special；$29 仅作 strikethrough 原价。
   383|2. 在 /pricing、/convert-to-word、/faq 中强制出现 compliance-report v2 第 5.1 节的披露语句。
   384|3. 更新 /privacy /terms /refund 文案要求，确保 device_id、额度、销售税、credits 退款、Lifetime 边界已披露。
   385|4. 全站禁用词检查必须包含 compliance-report v2 第 5.2 节清单。
   386|5. 未确认项保留 [待确认] 占位，不要编造具体日期或法律结论。
   387|6. 输出 docs/copy-freeze.md v2，并给出 [GO] / [GO with NEEDS_REVIEW] / [BLOCKED] 结论。
   388|```
   389|
   390|### 给 07 前端实现的最小必要信息
   391|- 必须按本报告第 3 节修改 `app/privacy/page.tsx`、`app/terms/page.tsx`、`app/refund/page.tsx`。
   392|- `/convert-to-word` 必须展示：免费试用剩余次数、已购 license 月度剩余次数、额度用完后的 Top-up CTA（$5/10 conversions 或 $0.50 each）。
   393|- Footer 法律链接必须修正为 `/privacy`、`/terms`、`/refund`。
   394|- 工具页触发后端 fallback 时必须明确弹窗告知用户并适用 1 小时 TTL。
   395|- `/api/convert` 必须实现配额校验（免费 3 次/30 天、已购 10 次/月、已用 credits）；`/api/credits/purchase` 必须实现 Top-up 购买。
   396|
   397|---
   398|
   399|**[DONE] Compliance Report v2 已完成。状态：[GO with NEEDS_REVIEW]。**
   400|