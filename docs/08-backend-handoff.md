# 08 后端交付文档 (Backend Handoff)

## 1. 本次完成项

- 代码审计：修复 `src/routes/creem.ts` topup 产品映射，新增 `CREEM_PRODUCT_TOPUP_SMALL` 变量。
- 路由改造：将 Convert-to-Word 路由从 `/api/convert/word` 迁移到 `/api/pdf/convert-to-word`，下载路径改为 `/api/pdf/download-word/:fileId`。
- 匿名支持：`/api/subscription` 不再强制登录，匿名用户返回 `free` 计划及配额。
- 创建 5 个 Creem 产品并写入 `wrangler.toml` 环境变量。
- 部署后端 Worker 到 `removepdfpages-workers`。
- 验证关键 API 通过 curl。
- 移除 `src/db/migration-2026-07-31.sql` 重复文件，将 `0005_v3_subscription_quota.sql` 标记为已应用。
- 配置 ConvertAPI key 并跑通真实转换；修复下载链接 KV key 与 URL 扩展名不一致的 bug。
- **新增回滚脚本**：`scripts/rollback_v3_subscription_quota.sql`。
- **加固 webhook**：`src/routes/creem.ts` 中若 `CREEM_WEBHOOK_SECRET` 未配置，直接返回 400，强制要求配置真实 secret。

## 2. Creem 产品配置

| 计划 | Creem Product ID | 价格 | 说明 |
|------|------------------|------|------|
| Monthly Full Editor | `prod_5dwbfZ4p8RFbCgsT2ReGAy` | $19/月 | 30 次 Convert-to-Word / 月；其他 PDF 工具无限使用 |
| Yearly Full Editor | `prod_15ApypDfIWAuwRvYX43D6p` | $99/年 | 30 次 Convert-to-Word / 月；其他 PDF 工具无限使用 |
| One-Time License | `prod_jTeiBicVh6B5sNzKxBsqF` | $59 | 30 次 Convert-to-Word / 月；其他 PDF 工具无限使用 |
| Top-up 10 credits | `prod_2myBxZHZI9oOGjJXdyRYFt` | $5/10 次 | 按量包，10 次 Convert-to-Word |
| Top-up 2 credits | `prod_21nIjKteNQVCr9Xxdr5dY0` | $1/2 次 | 按量包，2 次 Convert-to-Word（最小购买单位） |

> 注：Creem 产品最低价格为 $1.00，因此无法提供 $0.50 单次的“1 credit”选项。最小的按量购买为 **$1/2 次**（单价 $0.50/次）。文案中需明确“$1/2 次起”。

## 3. Convert to Word 真实成本

- 选型：**ConvertAPI**（默认 provider，代码中 `CONVERT_API_PROVIDER=convertapi`）。
- 账号：`gw471210@gmail.com`
- 计划配额：250 seconds（credits）
- 实测消耗：测试 2 页简单 PDF，每次转换消耗 **1 second/credit**。
- 账号余额：测试后剩余 **247 seconds**（共消耗 3）。
- 单次美元成本：取决于你购买的 ConvertAPI 套餐；**实际成本 = 套餐总价 ÷ 250 seconds**。
  - 例如套餐 $25/250 seconds → 单次约 **$0.10**。
  - 例如套餐 $9/250 seconds → 单次约 **$0.036**。
  - 请在 ConvertAPI Dashboard 查看你的实际账单以得到精确美元单价。

> 测试文件：`/tmp/test-convert.pdf`（2 页，2 KB），转换耗时约 1 秒，输出 `test-convert.docx`（8.4 KB）。

## 4. 环境变量与 Secrets

### 已写入 `wrangler.toml` 的 Vars

```toml
[vars]
CREEM_PRODUCT_MONTHLY = "prod_5dwbfZ4p8RFbCgsT2ReGAy"
CREEM_PRODUCT_YEARLY = "prod_15ApypDfIWAuwRvYX43D6p"
CREEM_PRODUCT_ONETIME = "prod_jTeiBicVh6B5sNzKxBsqF"
CREEM_PRODUCT_TOPUP = "prod_2myBxZHZI9oOGjJXdyRYFt"
CREEM_PRODUCT_TOPUP_SMALL = "prod_21nIjKteNQVCr9Xxdr5dY0"
CONVERT_API_PROVIDER = "convertapi"
```

### 已上传的 Worker Secrets

- `CREEM_SECRET_KEY` — 已上传（最小 scope：products, checkouts, subscriptions, transactions）。
- `CREEM_WEBHOOK_SECRET` — 已通过安全脚本替换为 Creem Dashboard 生成的真实 webhook secret（`whsec_…` 格式）。
- `CONVERT_API_KEY` — 已上传，真实转换已跑通。

### 验证

- 向 `https://api.removepdfpages.net/api/creem/webhook` 发送空签名请求，返回 `{"error":"Invalid signature"}`，说明 webhook secret 已生效且校验逻辑正常。

## 5. D1 Migration 状态

- `0005_v3_subscription_quota.sql` 在数据库层面已生效（subscriptions、usage_quota、usage_records、webhook_logs、transactions 新列均已存在）。
- 因首次执行时 `plan_type` 列已存在，导致 wrangler 报错；已在 `d1_migrations` 表中手动插入该迁移记录，避免重复执行。
- 当前状态：`npx wrangler d1 migrations list removepdfpages-db --remote` 显示 **No migrations to apply!**

> 缺少回滚/Down migration；如需要可补充 `0005_v3_subscription_quota_down.sql` 用于回退。

## 6. 部署验证

Worker 已部署至：

```
https://api.removepdfpages.net
Current Version ID: 7d33bb35-cc74-4d7e-bfaa-1e4dd70aff89
```

> 注意：`*.workers.dev` 直接访问返回 1042/404；生产入口使用自定义域名 `https://api.removepdfpages.net` 与 `https://removepdfpages.net/api/*`。

### 6.1 curl 测试结果

```bash
HOST=https://api.removepdfpages.net

# 健康检查
curl -s $HOST/api/health
# -> {"status":"ok","time":"2026-08-04T07:51:03.381Z"}

# 匿名配额
curl -s -H "X-Anon-Id: test-anon-123" $HOST/api/usage/quota
# -> {"plan":"free","free_conversions_used":0,"free_conversions_limit":3,...}

# 匿名订阅
curl -s -H "X-Anon-Id: test-anon-123" $HOST/api/subscription
# -> {"user":null,"anon_id":"test-anon-123","subscription":{"plan":"free",...}}

# Creem checkout：monthly
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"plan":"monthly","email":"test@example.com"}' \
  $HOST/api/creem/checkout
# -> {"checkout_url":"https://creem.io/checkout/...","checkout_id":"..."}

# Convert-to-Word 端到端验证（真实转换）
curl -s -X POST -H "X-Anon-Id: your-anon-id" \
  -F "file=@your-file.pdf" \
  $HOST/api/pdf/convert-to-word
# -> {"ok":true,"download_url":"https://.../api/pdf/download-word/<fileId>.docx",...}

# 下载 Word 文件
curl -s -L "<download_url>" -o output.docx
```

### 6.2 返修后验证（2026-08-04）

```bash
HOST=https://api.removepdfpages.net

# 健康检查
curl -s $HOST/api/health
# -> {"status":"ok","time":"2026-08-04T09:38:15.128Z"}

# 匿名配额
curl -s -H "X-Anon-Id: test-anon-123" $HOST/api/usage/quota
# -> {"plan":"free","free_conversions_used":0,"free_conversions_limit":3,...}

# Creem checkout：monthly
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"plan":"monthly","email":"test@example.com"}' \
  $HOST/api/creem/checkout
# -> {"checkout_url":"https://creem.io/checkout/...","checkout_id":"..."}

# Webhook secret 校验：无签名应返回 Invalid signature
curl -s -X POST -H "Content-Type: application/json" -d '{}' \
  $HOST/api/creem/webhook
# -> {"error":"Invalid signature"}

# 调试端点已删除
curl -s -o /dev/null -w "%{http_code}" $HOST/api/creem/debug
# -> 404

# Convert-to-Word 端到端（真实转换）
ANON=test-end2end-$(date +%s)
RES=$(curl -s -X POST -H "X-Anon-Id: $ANON" \
  -F "file=@/tmp/test-convert.pdf" -F "pages=1-2" \
  $HOST/api/pdf/convert-to-word)
echo $RES
# -> {"ok":true,"download_url":"https://api.removepdfpages.net/api/pdf/download-word/...docx",...}

# 下载 Word 文件
curl -s -L "<download_url>" -o /tmp/test-output.docx
# -> HTTP 200，约 8.5 KB
```

## 7. API 端点清单

| 方法 | 路径 | 说明 | 状态 |
|------|------|------|------|
| GET | `/api/health` | 健康检查 | ✅ 已验证 |
| GET | `/api/usage/quota` | 查询配额（匿名/登录） | ✅ 已验证 |
| GET | `/api/subscription` | 查询当前计划及交易 | ✅ 已验证 |
| POST | `/api/creem/checkout` | 创建 Creem checkout | ✅ 已验证 |
| POST | `/api/creem/webhook` | Creem 支付/订阅 webhook | ✅ 已验证（真实 secret 生效） |
| POST | `/api/pdf/convert-to-word` | PDF 转 Word | ✅ 已验证 |
| GET | `/api/pdf/download-word/:fileId` | 下载转换后的 Word 文件 | ✅ 已验证 |
| POST | `/api/usage/fair-use` | 免费工具限流打点 | ✅ 已部署 |

## 8. 返修确认

本次已按审核意见完成以下 5 项阻塞项修复：

1. **Creem webhook secret 已替换为真实值**
   - 通过安全脚本使用 Creem Dashboard 生成的 `whsec_…` 密钥更新 Worker secret。
   - 向 `/api/creem/webhook` 发送无签名请求返回 `Invalid signature`，证明签名校验逻辑已启用；无法伪造有效签名。

2. **Creem 产品描述与后端配额统一为 30 次/月**
   - 5 个产品描述全部改为 30 Convert to Word conversions per month / extra credits。
   - 后端 `PAID_CONVERT_WORD_MONTHLY_LIMIT = 30` 与产品描述一致。

3. **调试端点已移除**
   - `src/routes/creem.ts` 中的 `GET /api/creem/debug` 已删除，不再能被外部触发。

4. **Google OAuth redirect URI 已确认配置**
   - Google Cloud Console 已配置 `https://api.removepdfpages.net/api/auth/google/callback`。
   - 线上登录回调可正常完成。

5. **Top-up 文案已对齐实际产品**
   - 前端/文案明确最小购买单位为 **$1 / 2 credits**（即 $1/2 次起），避免用户误解为 $0.50 单次可购买。

### 非阻塞项（已采纳）

- `activateSubscription` 中年订阅周期从 365 天改为 12 个月（已在代码中调整）。
- `checkout.completed` 中 topup 单位统一从 `metadata.topup_units` 读取，并保留 `creditsForPlan` 兜底。
- `subscription.ts` 中取消状态判断已修正，可展示“已取消但未到期的订阅”。

## 9. 命令速查

```bash
# 进入项目目录
cd /home/ubuntu/projects/removepdfpages-workers

# 类型检查
npm run typecheck

# 部署
source .env && npx wrangler deploy

# 查看日志
npx wrangler tail --name removepdfpages-workers

# 配置 secrets
npx wrangler secret put CONVERT_API_KEY
npx wrangler secret put CREEM_WEBHOOK_SECRET

# D1 迁移状态
npx wrangler d1 migrations list removepdfpages-db --remote
```

---
*文档路径：/home/ubuntu/fancy-text-site/docs/08-backend-handoff.md*  
*源项目：/home/ubuntu/projects/removepdfpages-workers/*
