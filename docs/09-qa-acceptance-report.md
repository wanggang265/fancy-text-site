# 09 QA 验收报告 — RemovePDFPages

阶段：09 QA  
日期：2026-08-04  
结论：**NO-GO**（存在 P0 阻塞项，需返修后复测）  
执行人：zhongshu（使用 `student-site-qa-acceptance` v2.3.0）  
线上环境：https://removepdfpages.net  

---

## 一、准入检查

| 检查项 | 状态 | 说明 |
|---|---|---|
| 生产 URL 可访问 | ✅ | 所有 20 个设计页面 URL 返回 200 |
| PRD / 定价 / 文案冻结 | ✅ | `docs/PRD-v3.md`、`docs/copy-freeze.md`、`docs/pricing-calibration-v3.md` 已冻结 |
| 测试账号（Google 登录） | ⚠️ 缺失 | 未提供真实 Google 账号；登录前段跳转已验证到 accounts.google.com |
| 支付测试卡 / 真实支付 | ⚠️ 缺失 | 未提供测试模式或测试卡；由于 checkout 按钮无效，无法继续 |
| 浏览器登录态 | ✅ | 使用匿名会话 + 测试 anon_id 完成公开路径与 API 测试 |

---

## 二、技术 Smoke 测试

| 检查项 | 结果 | 证据 |
|---|---|---|
| 所有 route-mapping 路由 200 | ✅ | `/`, `/remove-pages`, `/merge`, `/compress`, `/sign`, `/convert-to-word`, `/pricing`, `/checkout`, `/success`, `/faq`, `/contact`, `/privacy`, `/terms`, `/refund`, `/cookie-policy`, `/blog`, `/blog/*` 均 200 |
| `/api/usage/quota` 200 | ✅ | 返回 `plan: free`, `free_conversions_limit: 3`, `included_conversions_limit: 0`, `credits_balance: 0` |
| `/api/subscription` 200 | ✅ | 返回同构配额对象 |
| `/robots.txt` 200 | ✅ | 允许搜索索引，禁止训练/完整使用，包含 Sitemap |
| `/sitemap.xml` 200 | ✅ | 包含 18 个 URL，时间戳 2026-08-04T09:51:04.335Z |
| `/favicon.ico` 200 | ✅ | 返回 favicon |
| 关键页面 metadata | ✅ | title/description/canonical/H1 均存在 |
| 内部链接完整性 | ✅ | 爬取 38 个页面，无 404 内链 |
| 移动端 viewport | ✅ | `<meta viewport>` 存在；响应式 CSS 基础正常 |

### 发现的问题

- `deploy.sh --check-only` **失败**：`app/login` 在实际代码中，但 `design-handoff-v4/route-mapping.json` 中没有 `/login` 路由。这会导致下一次通过 `deploy.sh` 部署时被闸口拦截。见返修项 #P1-5。

---

## 三、真实用户任务测试

### 3.1 匿名 Convert-to-Word 端到端

| 步骤 | 结果 | 证据 |
|---|---|---|
| 上传 PDF 并转换 | ✅ | `POST /api/pdf/convert-to-word` 返回 200，得到 `download_url` 和 `file_name` |
| 下载 DOCX | ✅ | 下载文件 `PK` 头，Content-Type 为 `application/vnd.openxmlformats...`，大小 13,857 bytes |
| 配额递增 | ✅ | 同一 anon_id 连续转换后，`free_conversions_used` 从 0 → 1 → 2 |
| 免费额度限制 | ✅ | 第 4 次返回 `402 FREE_LIMIT_REACHED`，提示升级或等待 30 天 |

### 3.2 登录 / 支付 / 订阅 / 退款

| 步骤 | 结果 | 证据 |
|---|---|---|
| Google OAuth 跳转 | ✅ | 点击 `/login` 的 "Continue with Google" 跳转至 `accounts.google.com`，`redirect_uri=https://api.removepdfpages.net/api/auth/google/callback` |
| 创建 Creem checkout | ✅ | `POST /api/creem/checkout` {plan: monthly, email: test_qa@example.com} 返回 200 和 `checkout_url` |
| **前端 checkout 按钮** | ❌ **P0** | `/checkout` 页面按钮为纯静态 `<button>`，无 `onClick`、无 `form`、无 fetch 调用。点击后无网络请求、无跳转。用户无法进入 Creem 支付。 |
| 支付成功回调 | ⚠️ 未测 | 因前端无法创建 checkout，无法进入支付成功路径 |
| `/success` 动态化 | ❌ **P1** | 页面仍为占位符：`[plan price]`, `[user email]`, `[Creem order ID]`, `REMPDF-XXXX-XXXX-XXXX` |
| 登录后配额一致性 | ⚠️ 未测 | 需要真实 Google 账号 |
| 退款/取消 | ⚠️ 未测 | 需要完成支付 |

### 3.3 文案一致性

| 位置 | 文案 | 结果 |
|---|---|---|
| `/checkout` | "Includes 30 Convert to Word conversions per month" | ✅ 已修复 |
| `/pricing` FAQ | "It includes the same 30 Convert to Word conversions per month" | ✅ 已修复 |
| `/convert-to-word` 工具内 paywall | "paid plans include 10 per month" | ❌ **P0** 应为 30 |
| 其他 `/pricing` 文案 | 30/month included | ✅ 一致 |

---

## 四、P0 / P1 / P2 列表

### P0 — 阻塞上线（必须先修，修完复测）

1. **`/checkout` 按钮无法完成购买**
   - 现象：选择 plan、输入邮箱后点击按钮无反应；浏览器无网络请求、无 JS 错误，页面不跳转。
   - 根因：`app/checkout/page.tsx` 是纯静态 HTML，未调用后端 `/api/creem/checkout` 创建 checkout session，也未重定向到 Creem。
   - 复现：访问 `https://removepdfpages.net/checkout?plan=monthly` → 输入邮箱 → 点击 "Subscribe — $19/month"。
   - 修复要求：改为 Client Component，读取 radio 状态、email、query 参数（plan/topup），POST 到 `/api/creem/checkout`，成功后 `window.location.href = checkout_url`。

2. **`ConvertToWordTool` paywall 文案仍是 10 次/月**
   - 位置：`components/ConvertToWordTool.tsx` 第 227 行
   - 原文："paid plans include 10 per month"
   - 应为："paid plans include 30 per month"
   - 这是 copy-freeze 遗漏，属于 P0 因为直接影响用户对购买价值的理解。

### P1 — 进入 SEO 前必须完成

3. **`/success` 页面动态化**
   - 当前为占位符：`[plan price]`, `[user email]`, `[Creem order ID]`, `REMPDF-XXXX-XXXX-XXXX`。
   - 需要从 Creem callback/session 或后端 transaction 读取真实数据渲染。

4. **`/checkout` 按钮文案随 plan 变化**
   - 当前无论选 monthly/yearly/onetime 都显示 "Subscribe — $19/month"。
   - 期望：monthly → "Subscribe — $19/month"; yearly → "Subscribe — $99/year"; onetime → "Buy one-time license — $59"; topup → "Buy extra credits — $X"。

5. **`/checkout` 增加 topup 入口处理**
   - 当前 `/checkout?topup=10` 与常规 checkout UI 完全相同，无 topup 选项。
   - 后端 `/api/creem/checkout` 支持 topup 参数（见 `08-backend-handoff.md`），前端需要识别 `?topup=10`/`?topup=2` 等参数并展示对应购买按钮。

6. **`deploy.sh` design handoff 闸口失败**
   - 现象：`./deploy.sh --check-only` 失败，因为 `app/login` 不在 `design-handoff-v4/route-mapping.json` 中。
   - 影响：无法通过 deploy.sh 再次部署。
   - 修复方案二选一：
     - a) 在 `design-handoff-v4/route-mapping.json` 和 design handoff pages 中补充 `/login`（noindex 类型）；
     - b) 在 `deploy.sh` 的 diff 脚本中排除 noindex/support 页面（如 `/login`），但需与单事实源约定保持一致。

### P2 — 上线前尽量完成

7. 登录后 `/api/usage/quota` 字段名一致性：后端 `convertToWord` 返回 `free_used/paid_used/credits`，而 `getQuota` 返回 `free_conversions_used/included_conversions_used/credits_balance`。前端 `refreshQuota` 会重新拉取，不影响显示，但建议统一。
8. 大文件 / 多页 PDF 转换超时和错误提示验证。
9. 分析工具选型与 `privacy`/`terms`/`cookie-policy` 文案一致。
10. 订阅到期后自动降级为 free plan 验证（需等待或构造到期数据）。

---

## 五、无法自动验证项（需要用户配合）

以下项目因缺少真实账号/测试环境，本次 QA 未覆盖：

- 真实 Google OAuth 登录回调及登录态保持。
- 登录用户购买 monthly/yearly/onetime 后，webhook 是否正确激活订阅、`/api/subscription` 是否正确显示。
- 支付成功后 `/success` 真实数据渲染。
- topup credits 购买后 `credits_balance` 增加。
- 取消订阅后 `is_cancelled` 状态正确。
- 退款后 credits/订阅状态 revoked。
- 文件 1 小时后自动删除（需等待）。

---

## 六、结论与下一步

- **当前结论：NO-GO**
- **必须返修后复测的 P0**：
  1. 修复 `/checkout` 购买按钮，使其真正调用 `/api/creem/checkout` 并重定向到 Creem。
  2. 修复 `components/ConvertToWordTool.tsx` 中 "10 per month" 为 "30 per month"。
- **返修责任人**：前端实现者（07 frontend / 08 backend 返修）需完成 checkout 购买逻辑；文案错误由文案/前端角色同步修复。
- **复测条件**：P0 修复并重新部署后，zhongshu 执行 Re-QA；P1 项可在 P0 通过后并行推进，但必须在进入 SEO 阶段前完成。

---

## 七、附件

- 复现命令：
  ```bash
  curl -s https://removepdfpages.net/checkout | grep -o "Subscribe" | head -1
  # 浏览器访问 /checkout 选择 plan 输入邮箱后点击按钮，无网络请求
  ```
- 后端 API 可用性验证：
  ```bash
  curl -s -X POST https://removepdfpages.net/api/creem/checkout \
    -H "Content-Type: application/json" \
    -d '{"plan":"monthly","email":"test_qa@example.com"}'
  # -> {"checkout_url":"https://creem.io/checkout/...","checkout_id":"..."}
  ```
- Convert-to-Word 免费额度验证：
  ```bash
  # 同一 anon_id 连续 4 次 POST /api/pdf/convert-to-word 上传 PDF
  # 第 4 次返回 402 FREE_LIMIT_REACHED
  ```
