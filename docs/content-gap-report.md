# RemovePDFPages — 06 Design Handoff Copy-Audit Report

> 审计对象：`design-handoff-extract/`  
> 文案事实源：`docs/copy-freeze.md` v2  
> PRD：`docs/PRD-v3.md`  
> 合规源：`docs/compliance-report.md` v2  
> 审计日期：2026-07-28

## 结论

**缺陷数：0**  
**06 design [GO]**

## 覆盖路由（14 页）

| Route | 目录 | 状态 |
|---|---|---|
| `/` | `index` | ✅ |
| `/remove-pages` | `remove-pages` | ✅ |
| `/merge` | `merge` | ✅ |
| `/compress` | `compress` | ✅ |
| `/sign` | `sign` | ✅ |
| `/convert-to-word` | `convert-to-word` | ✅ |
| `/pricing` | `pricing` | ✅ |
| `/checkout` | `checkout` | ✅ |
| `/success` | `success` | ✅ |
| `/faq` | `faq` | ✅ |
| `/contact` | `contact` | ✅ |
| `/privacy` | `privacy` | ✅ |
| `/terms` | `terms` | ✅ |
| `/refund` | `refund` | ✅ |

## 审计维度

1. **Title / H1**：每页 title 与 h1 与 copy-freeze v2 一致。
2. **$19 Launch Special 统一**：所有付费入口均使用 "$19 Launch Special"。
3. **$29 使用**：仅在 `/pricing`、 `/` 作为删除线原价锚点出现；`/checkout` 保留 copy-freeze 允许的 `$29 Standard License` fallback 选项。
4. **Footer 法律三链**：所有页面 footer 均包含 `/privacy`、`/terms`、`/refund`。
5. **Schema**：
   - `/`：WebSite + Organization
   - 工具页（5 页）：SoftwareApplication
   - `/pricing`：Product + Offer
   - `/faq`：FAQPage
   - `/checkout`、`/success`、`/contact`、`/privacy`、`/terms`、`/refund`：WebPage
6. **合规声明**：
   - `/sign`：包含签名免责声明
   - `/convert-to-word`：包含 1 小时删除说明
   - `/remove-pages`、`/merge`、`/compress`：包含 browser-default 数据流说明
7. **禁用词**：未发现 `official`、`guaranteed`、`100% accurate`、`free forever`、`unlimited`、`no limits`、`lifetime updates`、`AI-powered`、`open source`、`best/top PDF editor` 等禁用词。
8. **交付物完整性**：每页均包含 `code.html`、`styles.css`、`screen.png`、`screen-mobile.png`。

## 备注

- 设计源：Stitch project `RemovePDFPages v2`（`11812267784191647130`），通过 MCP `edit_screens` 修正文案与 schema。
- `/privacy`、`/terms`、`/refund` 为本次新增合规页，使用与现有设计系统一致的模板生成。
- 仍有 `[待确认]` 项保留在 `docs/copy-freeze.md` v2，不影响 06 → 07 交接，但需在上线前由产品/运营回填。

## 状态

| 阶段 | 状态 |
|---|---|
| 02 PRD | DONE |
| 03 pricing | DONE |
| 04 compliance | DONE |
| 05 copy | DONE |
| **06 design** | **DONE** |
| 07 frontend | READY |
