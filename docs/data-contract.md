# RemovePDFPages — Data Contract v1

> 本文档定义前端需要的后端能力、数据流、文件边界、事件埋点与错误码。请在后端实现前将本文档与 PRD、页面矩阵一起凍结。

## 1. 处理架构决策

### 1.1 总体策略
- **默认路径**：免费 4 个工具（Remove / Merge / Compress / Sign）使用客户端处理（浏览器内 PDF-lib / Canvas）。
- **兑底路径**＜当文件过大/格式复杂导致客户端失败时，弹窗提示或使用后端 fallback。
- **触发阈值**：单文件 > 50 MB 或 > 200 页时，给出“文件过大”提示，暂不自动切换到后端。
- **失败降级**：处理失败时保留用户选择（页面、文件列表、签名画布），显示可操作错误信息。

### 1.2 与 UI 文案的冲突
- **Compress** 和 **Convert to Word** 的当前 UI 文案写“Your file stays in your browser” / “No upload”。
- **但 Convert to Word 在客户端可靠实现难度高，Compress 的高质量压缩也通常需后端 Ghostscript 类工具**。
- **决策点**：必须在后端实现前决策：
  1. 方案 A：全部客户端处理，修改隐私声明。
  2. 方案 B：保持“No upload”声明，但 Convert to Word 使用 WASM / 第三方客户端库（功能可能受限）。
  3. 方案 C：采用后端处理，并更新隐私声明，明确写出存储 TTL 与删除策略。
- **当前状态**：`[待确认]` — 需技术实现与合规阶段联合决策。

## 2. 文件处理边界

| 项目 | 边界 | 说明 |
|---|---|---|
| 支持格式 | `application/pdf` | 仅接受 PDF；其他格式拒绝并给出明确错误码 `FILE_TYPE_INVALID` |
| 单文件大小 | ≤ 50 MB | 基于当前 UI 文案冻结；可根据定价/成本调整 `MAX_FILE_SIZE` |
| Merge 总大小 | ≤ 50 MB | 同上；超限时报 `MERGE_TOTAL_SIZE_EXCEEDED` |
| 单文件页数 | ≤ 200 页 | `[待确认]` — 客户端性能与实际需求需测试 |
| 存储 | 不落盘 | 本地处理时不上传；后端 fallback 时临时存储 TTL 不超过 1 小时 |
| 隐私 | 无水印 | 输出文件不添加第三方水印 |
| 文件名 | 保留原名 + 后缀 | 如 `document_final_compressed.pdf` |

## 3. API Endpoints

### 3.1 健康检查
- `GET /api/health`
- Response: `{ "status": "ok", "version": "v1" }`

### 3.2 工具处理（后端 fallback）
如果采用后端处理，提供统一端点：

- `POST /api/process`
- Content-Type: `multipart/form-data`
- Fields:
  - `operation`: `remove` | `merge` | `compress` | `sign`
  - `files`: PDF file(s)
  - `params`: JSON string, e.g.:
    - `remove`: `{ "pagesToRemove": [2, 5] }`
    - `merge`: `{ "order": ["file-2", "file-1"] }`
    - `compress`: `{ "level": "recommended" | "maximum" }`
    - `sign`: `{ "signatureImageBase64": "...", "page": 1, "x": 100, "y": 100 }`
- Response:
  - Success: `{ "ok": true, "downloadUrl": "...", "expiresAt": "...", "fileName": "..." }`
  - Error: `{ "ok": false, "errorCode": "...", "message": "..." }`

### 3.3 Convert to Word
- `POST /api/convert`
- Content-Type: `multipart/form-data`
- Fields:
  - `file`: PDF file
  - `outputFormat`: `docx` | `rtf`
  - `keepFormatting`: boolean
- Response:
  - Success: `{ "ok": true, "downloadUrl": "...", "expiresAt": "...", "fileName": "..." }`
  - Error: `{ "ok": false, "errorCode": "...", "message": "..." }`
- **Authorization**: 必须检验有效 license key；未授权返回 `LICENSE_REQUIRED`.

### 3.4 License 校验
- `POST /api/license/validate`
- Body: `{ "key": "REMPDF-XXXX-XXXX-XXXX" }`
- Response:
  - Success: `{ "ok": true, "valid": true, "maxDevices": 5, "activatedDevices": 1 }`
  - Error: `{ "ok": false, "errorCode": "LICENSE_INVALID" | "DEVICE_LIMIT_EXCEEDED" }`

### 3.5 支付
- `POST /api/checkout/create-session`
- Body: `{ "plan": "launch" | "full", "email": "..." }`
- Response: `{ "ok": true, "sessionId": "...", "url": "https://checkout.stripe.com/..." }`
- `POST /api/webhooks/stripe`
- Stripe webhook 处理订单完成，生成 license key 并发邮件。
- **备注**：当前 checkout 页面是前端占位表单；真实 Stripe 集成需测试后再上线。

### 3.6 联系/退款
- `POST /api/contact`
- Body: `{ "name", "email", "subject", "message" }`
- Response: `{ "ok": true, "ticketId": "..." }`
- 实际可使用邮件转发服务（如 Formspree / AWS SES / Resend），避免直接维护 SMTP。

## 4. 订单与 License 状态

| 状态 | 前端展示 | 后端处理 |
|---|---|---|
| Unknown | 骨架屏 + 禁用 CTA | 初始化时 `/api/license/validate` 返回前开始检查 |
| Unlicensed | 付费工具显示 Paywall | 尝试支付前缓存 |
| Licensed | 显示 Download / action | 每次使用付费功能时校验 key |
| Error | 错误 alert | Retry 或联系 support |

## 5. 埋点事件（前端）

必须包含的事件（匿名）：

| 事件 | 触发时机 | 维度 |
|---|---|---|
| `page_view` | 页面加载 | route, device, utm_source |
| `tool_started` | 用户点击上传区 | route, file_size_bucket, device |
| `file_uploaded` | 文件已选中 | route, file_size, page_count |
| `tool_process_clicked` | 点击核心操作（Remove/Merge/Compress/Sign/Convert） | route, operation |
| `tool_success` | 处理成功 | route, operation, processing_time_ms, file_size_bucket |
| `file_downloaded` | 点击下载 | route, operation |
| `tool_error` | 处理失败 | route, operation, error_code |
| `paywall_shown` | 付费工具出现 paywall | route |
| `checkout_started` | 进入 `/checkout` | plan, route, utm_source |
| `purchase_success` | Stripe webhook 或 `/success` 页面 | plan, amount, currency |
| `license_validated` | 输入有效 license | route |
| `contact_submitted` | 提交联系表单 | subject |

## 6. 错误码

| 错误码 | HTTP | 含义 | 前端处理 |
|---|---|---|---|
| `FILE_TYPE_INVALID` | 400 | 非 PDF 文件 | 显示 "Only PDF files are supported" |
| `FILE_SIZE_EXCEEDED` | 413 | 单文件超过 50 MB | 显示 "Max 50 MB per file" |
| `MERGE_TOTAL_SIZE_EXCEEDED` | 413 | Merge 总大小超限 | 显示 "Total size must be under 50 MB" |
| `PROCESSING_FAILED` | 500 | 处理引擎异常 | 保留选择，显示 retry |
| `LICENSE_REQUIRED` | 402 | 未购买却调用付费功能 | 弹出 Paywall / 跳转 checkout |
| `LICENSE_INVALID` | 403 | License key 无效 | 提示输入正确 key |
| `DEVICE_LIMIT_EXCEEDED` | 403 | 超过 5 台设备 | 显示设备上限说明 |
| `CHECKOUT_FAILED` | 500 | 支付会话创建失败 | 显示重试或联系 support |
| `RATE_LIMITED` | 429 | 接口频率限制 | 延迟后重试 |

## 7. 安全与合规

- 所有上传文件必须进行类型校验（魔法字字节 + MIME），防止上传非 PDF 日志文件。
- 后端处理应在独立临时容器/沙箱中运行，处理完成后立即清理。
- License key 库应加密存储，不存储明文。
- 不存储用户 PDF 内容，不将文件用于模型训练。
- 隐私政策必须与实际数据流一致：如果采用后端处理，必须放弃“No upload”声明或明确写出存储时间。

## 8. 待确认事项

1. **处理架构**：免费工具是否纯客户端？Compress / Convert to Word 是否需后端 fallback？`[待确认]`
2. **文件大小与页数上限**：当前 50 MB / 200 页是否合理？`[待确认]`
3. **后端存储 TTL**：如果有后端处理，临时存储多长时间？建议 1 小时。`[待确认]`
4. **支付与税务**：Stripe 账户、退款流程、税率。`[待确认]`
5. **分析工具**：使用 Plausible / Vercel Analytics / Google Analytics？影响隐私政策披露。`[待确认]`
