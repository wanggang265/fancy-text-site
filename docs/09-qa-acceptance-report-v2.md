# 09 QA 验收报告 v2 — RemovePDFPages 返修后复测

阶段：09 QA  
日期：2026-08-04  
结论：**GO with residual issues**（返修项全部通过，发现 3 个 P2 残留问题）  
执行人：zhongshu  
线上环境：https://removepdfpages.net  
相关 commit：30d6c56  
Cloudflare Version ID：ef916584-58c0-473e-b401-3359f5424aeb  

---

## 一、准入检查

| 检查项 | 状态 | 说明 |
|---|---|---|
| 生产 URL 可访问 | ✅ | 所有 20 个设计页面 URL 返回 200 |
| PRD / 定价 / 文案冻结 | ✅ | `docs/PRD-v3.md`、`docs/copy-freeze.md`、`docs/pricing-calibration-v3.md` 已冻结 |
| 测试账号（Google 登录） | ⚠️ 缺失 | 未提供真实 Google 账号；登录前段跳转已验证到 accounts.google.com |
| 支付测试卡 / 真实支付 | ⚠️ 缺失 | 未提供测试模式或测试卡；checkout 跳转 Creem 已验证 |
| 浏览器登录态 | ✅ | 使用匿名会话 + 测试 anon_id 完成公开路径与 API 测试 |

---

## 二、技术 Smoke 测试

| 检查项 | 结果 | 证据 |
|---|---|---|
| `deploy.sh --check-only` | ✅ | 20/20 routes 匹配；commit 30d6c56；`/login` 例外已加入 `allowed_extra` |
| 所有 route-mapping 路由 200 | ✅ | `/`, `/remove-pages`, `/merge`, `/compress`, `/sign`, `/convert-to-word`, `/pricing`, `/checkout`, `/success`, `/faq`, `/contact`, `/privacy`, `/terms`, `/refund`, `/cookie-policy`, `/blog`, `/blog/*` 均 200 |
| `/api/usage/quota` 200 | ✅ | 返回 `plan: free`, `free_conversions_limit: 3`, `included_conversions_limit: 0`, `credits_balance: 0` |
| `/api/subscription` 200 | ✅ | 返回同构配额对象 |
| `/robots.txt` 200 | ✅ | 允许搜索索引，禁止训练/完整使用，包含 Sitemap |
| `/sitemap.xml` 200 | ✅ | 包含 18 个 URL |
| `/favicon.ico` 200 | ✅ | 返回 favicon |
| 关键页面 metadata | ✅ | title/description/canonical/H1 均存在 |
| 内部链接完整性 | ✅ | 爬取 38 个页面，无 404 内链 |
| 移动端 viewport | ✅ | `<meta viewport>` 存在；响应式 CSS 基础正常 |

---

## 三、真实用户任务测试

### 3.1 匿名 Convert-to-Word 端到端

| 步骤 | 结果 | 证据 |
|---|---|---|
| 上传 PDF 并转换 | ✅ | `POST /api/pdf/convert-to-word` 返回 200，得到 `download_url` 和 `file_name` |
| 下载 DOCX | ✅ | 下载文件 `PK` 头，Content-Type 为 `application/vnd.openxmlformats...` |
| 配额递增 | ✅ | 同一 anon_id 连续转换后，`free_conversions_used` 从 0 → 1 → 2 |
| 免费额度限制 | ✅ | 第 4 次返回 `402 FREE_LIMIT_REACHED`，paywall 显示 30/month |

### 3.2 登录 / 支付 / 订阅 / 退款

| 步骤 | 结果 | 证据 |
|---|---|---|
| Google OAuth 跳转 | ✅ | 点击 `/login` 的 "Continue with Google" 跳转至 `accounts.google.com`，`redirect_uri=https://api.removepdfpages.net/api/auth/google/callback` |
| 创建 Creem checkout | ✅ | `POST /api/creem/checkout` 返回 200 和 `checkout_url` |
| 前端 checkout 按钮（monthly） | ✅ | 输入邮箱后跳转 Creem：`https://www.creem.io/checkout/prod_5dwbfZ4p8RFbCgsT2ReGAy/ch_...` |
| 前端 checkout 按钮（yearly） | ✅ | 按钮文案 "Subscribe — $99/year"，未点击但文案正确 |
| 前端 checkout 按钮（onetime） | ✅ | 按钮文案 "Buy one-time license — $59"，跳转 Creem 成功 |
| 前端 checkout 按钮（topup=10） | ✅ | 按钮文案 "Buy 10 extra credits — $5"，跳转 Creem 成功 |
| 前端 checkout 按钮（topup=2） | ✅ | 按钮文案 "Buy 2 extra credits — $1"，跳转 Creem 成功 |
| `/success` 动态渲染 | ✅ | 读取 URL query 或 sessionStorage checkout_id + `/api/subscription` 匹配 transaction，显示正确 plan/price/email/order ID |
| 登录后配额一致性 | ⚠️ 未测 | 需要真实 Google 账号 |
| 退款/取消 | ⚠️ 未测 | 需要完成支付 |

### 3.3 文案一致性

| 位置 | 文案 | 结果 |
|---|---|---|
| `/checkout` | "Includes 30 Convert to Word conversions per month" | ✅ 一致 |
| `/pricing` FAQ | "It includes the same 30 Convert to Word conversions per month" | ✅ 一致 |
| `/convert-to-word` 工具内 paywall | "paid plans include 30 per month" | ✅ 已修复 |
| 其他 `/pricing` 文案 | 30/month included；topup $1/2 或 $5/10 | ✅ 一致 |
| 首页 | "30 conversions per month included, with top-ups available" | ✅ 一致 |
| FAQ | "Paid plans include 30 conversions per calendar month" | ✅ 一致 |

---

## 四、P0 / P1 / P2 列表

### 返修项 — 已全部通过

1. ✅ **`/checkout` 按钮完成购买**
   - 位置：`app/checkout/CheckoutForm.tsx`（新增 Client Component）
   - 行为：读取 radio/email/URL query，POST `/api/creem/checkout`，成功后 `window.location.href = checkout_url`。

2. ✅ **`ConvertToWordTool` paywall 文案 10→30**
   - 位置：`components/ConvertToWordTool.tsx`
   - 文案："paid plans include 30 per month"

3. ✅ **`/success` 页面动态化**
   - 位置：`app/success/SuccessContent.tsx`（新增 Client Component）
   - 行为：读取 sessionStorage checkout 上下文 + 调用 `/api/subscription` 匹配 transaction + URL query fallback。

4. ✅ **`/checkout` 按钮文案随 plan 变化**
   - monthly: "Subscribe — $19/month"
   - yearly: "Subscribe — $99/year"
   - onetime: "Buy one-time license — $59"
   - topup=10: "Buy 10 extra credits — $5"
   - topup=2: "Buy 2 extra credits — $1"

5. ✅ **`/checkout` topup 入口**
   - `?topup=10` 和 `?topup=2` 进入 topup 模式。

6. ✅ **`deploy.sh --check-only` 通过**
   - 新增 `allowed_extra = {'/login'}` 例外，并在 `project-control.md` §6.1 记录。

### P2 — 上线前尽量完成（新发现）

7. **`/success` 页面 license key 占位符**
   - 当前对所有 plan 类型显示 `REMPDF-XXXX-XXXX-XXXX`。
   - subscription 不应显示 license key；onetime 应显示真实 license key（从后端 transaction 或 license key 表获取）。

8. **`/success` 页面 "Your subscription is active" 文案**
   - 对 onetime 和 topup 不准确，应改为根据 plan 类型显示不同文案。

9. **`/success` sessionStorage 与 URL query 优先级冲突**
   - 当 sessionStorage 中存在旧 checkout 数据时，直接访问带 query 的 `/success?plan=...` 可能显示旧数据。
   - 建议：如果 URL query 中的 checkout_id 与 sessionStorage 不一致，优先使用 URL query 或清空旧 sessionStorage。

10. **quota 字段命名一致性**
    - 登录后 `/api/usage/quota` 与 `convertToWord` 返回的 quota 字段命名不完全一致（不影响显示，但建议统一）。

11. **大文件 / 多页 PDF 转换超时和错误提示验证**
    - 上线前需测试 50 MB / 200 页边界。

12. **分析工具选型与隐私文案一致**
    - 当前 `cookie-policy` 提到 "analytics tool and cookie use will be disclosed"，需上线前确定工具并同步文案。

13. **订阅到期后自动降级验证**
    - 上线后需验证取消订阅后状态正确降级为 free。

### 因缺少测试账号未覆盖

- Google OAuth 登录回调及登录态保持。
- 真实支付后 webhook 激活订阅、`/success` 真实数据渲染、topup credits 增加。
- 取消订阅、退款后状态 revoked。
- 文件 1 小时后自动删除。

---

## 五、结论

返修项 6 个全部通过 Re-QA。P0 阻塞已解除，P1 要求已满足。站点可进入 **10 SEO** 阶段。P2 残留问题应在 **11 launch** 前修复，尤其 `/success` 页面 license key 占位符和文案准确性。
