# Content Gap Report Template

## 审计目标

对比上游冻结文件与下游交付物，发现**机械缺失**和**结构性错误**。  
结构问题 > 0 时，下游阶段必须 `[BLOCKED]`。

---

## 审计输入

- 上游冻结文件：
  - `docs/PRD-v{版本}.md`
  - `docs/pricing-calibration-v{版本}.md`
  - `docs/copy-freeze.md`
  - `docs/MVP-NOT-DO.md`
- 下游交付物：
  - 本次审计对象（如 `design-handoff-v3/`、`app/` 目录等）

---

## 检查项

### A. 页面矩阵完整性（机械检查）

| 页面 | 上游要求 | 下游实际 | 状态 |
|---|---|---|---|
| / | 必须有 | | |
| /remove-pages | 必须有 | | |
| /merge | 必须有 | | |
| /compress | 必须有 | | |
| /sign | 必须有 | | |
| /convert-to-word | 必须有 | | |
| /pricing | 必须有 | | |
| /checkout | 必须有 | | |
| /success | 必须有 | | |
| /faq | 必须有 | | |
| /contact | 必须有 | | |
| /privacy | 必须有 | | |
| /terms | 必须有 | | |
| /refund | 必须有 | | |

状态：✅ 存在 / ❌ 缺失 / ⚠️ 部分

---

### B. 首页首屏结构检查（关键）

| 检查项 | 上游要求 | 下游实际 | 状态 |
|---|---|---|---|
| Hero 区主标题是否描述"免费 PDF 工具" | 是 | | |
| Hero 区副标题是否引导用户试用工具 | 是 | | |
| **Primary CTA 是否指向免费工具入口** | **必须指向 `/remove-pages`、`/merge`、`/compress`、`/sign` 或工具锚点** | | |
| Hero 区是否直接展示 `$19 Launch Special` 价格 | 禁止出现在首屏 | | |
| Hero 区是否直接出现 "Buy Now / Get Full Editor" 购买按钮 | 禁止出现在首屏 | | |
| 首页是否包含 5 个工具入口卡片 | 必须有 | | |
| `$19 Launch Special` 出现位置 | 仅允许底部转化区 | | |

**任意一项为 ❌，即为结构问题。**

---

### C. 价格口径统一性检查

| 检查项 | 上游要求 | 下游实际 | 状态 |
|---|---|---|---|
| 全站主推价格 | `$19 Launch Special` | | |
| `$29` 是否作为删除线原价锚点 | 是 | | |
| 是否出现 `$29` 作为当前价 | 禁止 | | |
| 是否出现其他价格口径 | 禁止 | | |
| 是否使用禁用词（unlimited / free forever / no limits / lifetime updates） | 禁止 | | |

---

### D. FAQ 数量一致性

| 来源 | 数量 | 列表 |
|---|---|---|
| copy-freeze 定义 | | |
| design handoff 实际 | | |
| 前端实际 | | |

**数量不一致 = 机械缺失。**

---

### E. Footer 链接完整性

| 必须包含 | 状态 |
|---|---|
| /pricing | |
| /faq | |
| /contact | |
| /blog | |
| /privacy | |
| /terms | |
| /refund | |

**禁用项（来自 MVP-NOT-DO）：**

| 禁用页面 | 是否出现 | 状态 |
|---|---|---|
| /split | 禁止 | |
| /edit | 禁止 | |
| /annotate | 禁止 | |
| /ocr | 禁止 | |
| /convert-to-jpg | 禁止 | |
| 其他未在 page-matrix 中定义的页面 | 禁止 | |

---

### F. 工具页结构检查

| 页面 | 是否包含文件上传区 | 是否包含操作按钮 | 是否包含 browser-default 数据流说明 |
|---|---|---|---|
| /remove-pages | | | |
| /merge | | | |
| /compress | | | |
| /sign | | | |
| /convert-to-word | | | |

---

### G. Schema / SEO 检查

| 页面 | WebSite schema | Organization schema | SoftwareApplication schema | FAQPage schema |
|---|---|---|---|---|
| / | | | N/A | N/A |
| /faq | N/A | N/A | N/A | |
| 工具页 | N/A | N/A | | N/A |

---

## 问题汇总

### 结构问题（> 0 则 [BLOCKED]）

| # | 问题 | 位置 | 严重程度 |
|---|---|---|---|
| 1 | | | P0 / P1 / P2 |

### 机械缺失

| # | 缺失项 | 上游来源 | 严重程度 |
|---|---|---|---|
| 1 | | | P0 / P1 / P2 |

### 建议改进（不阻塞）

| # | 建议 | 位置 |
|---|---|---|
| 1 | | |

---

## 判定

- 结构问题数：
- 机械缺失数：
- 建议数：

**结论**：[GO] / [BLOCKED] / [NEEDS_REVIEW]

**阻塞原因**（如 [BLOCKED]）：

---

## 审计人

- 审计 Agent：
- 审计时间：
- 对应下游交付物版本：
