# Content-Gap Audit Report — copy-freeze.md vs PRD-v3.md

> 审计 Agent：zhongshu-readonly  
> 审计日期：2026-07-29  
> 性质：最小流程验证（机制修复阶段，不推进真实建站）  
> 上游：/home/ubuntu/fancy-text-site/docs/PRD-v3.md  
> 下游：/home/ubuntu/fancy-text-site/docs/copy-freeze.md  

---

## 审计范围

对比 PRD-v3 与 copy-freeze.md，验证 copy-freeze 是否完整、准确地反映了 PRD-v3 的要求。

---

## 1. 结构问题（>0 则 [BLOCKED]）

### 1.1 首页 `/` 首屏 Primary CTA 结构错误

**PRD-v3 要求**（第 8.1 节 / 第 9 决策 / 第 11.6 节）：
- 首页 `/` 是工具入口页
- 首屏 Primary CTA **必须指向免费工具入口**（如 `/remove-pages` 或页面内工具锚点）
- `$19 Launch Special` 仅允许出现在首页**底部转化区**

**copy-freeze 3.1 实际规定**：
- H1：`Free PDF Tools. Full Editor from $19/month.`
- Subheadline 已含订阅/买断价格
- **Primary CTA**：`Get Full Editor — $19/month Launch Special` → `/pricing`
- **Secondary CTA**：`Try Free Tools` → `/remove-pages`

**判定**：Primary CTA 是购买按钮，且把 `$19/month Launch Special` 放在首屏，直接违反 PRD-v3 首页定位。属于结构性问题。

> 影响：进入 06/07 后，若按 copy-freeze 3.1 实现，首页会变成付费转化页而非工具入口页，与 PRD-v3 定义冲突。

---

## 2. 机械缺失

- 页面矩阵：PRD-v3 要求的所有页面在 copy-freeze 中均有对应文案。
- 路由覆盖：5 工具页 + `/pricing` + `/checkout` + `/success` + `/faq` + `/contact` + `/blog` 索引 + 4 篇博客 + `/privacy` + `/terms` + `/refund` + Footer 均存在。
- 无其他机械缺失项。

---

## 3. 建议改进

### 3.1 修复首页首屏 CTA 结构（阻塞项）

二选一：

- **方案 A**：交换 Primary / Secondary CTA
  - Primary：`Try Free Tools` → `/remove-pages`
  - Secondary：`Get Full Editor — $19/month Launch Special` → `/pricing`

- **方案 B**：Primary CTA 改为进入工具区锚点（如 `Start with free tools`），底部转化区保留 `Get Full Editor — $19/month Launch Special`。

同时建议评估 H1/Subheadline 中 `$19/month` 价格信息是否过早出现；PRD-v3 明确 `$19 Launch Special` 是底部转化区专属，首屏应以免费工具价值为主。

### 3.2 内部一致性

copy-freeze 第 5.3 节已指出 `app/page.tsx` 存在同样问题（Hero CTA 指向 `/checkout`），但第 3.1 节的文案规范本身仍未修正。建议让 copy-freeze 自身规范与 PRD-v3 一致，而非仅在下游代码扫描表中记录。

---

## 4. 其他检查项结论

| 检查项 | 结果 | 说明 |
|---|---|---|
| 页面矩阵 | ✅ 通过 | 所有 PRD-v3 页面均有 copy-freeze 对应节 |
| 首页首屏结构 | ❌ 失败 | Primary CTA 错误指向付费 |
| 价格口径 | ✅ 通过 | `$19/month` 主推，`$29` 仅删除线锚点，`$59` 隐藏买断 |
| FAQ 数量 | ✅ 通过 | PRD-v3 未指定数量，copy-freeze 内部一致 |
| 禁用项 NOT-DO | ✅ 通过 | 未出现 `/split` `/edit` `/annotate` `/ocr` 页面 |

---

## 5. 结论

**[BLOCKED]**

---

## 6. 阻塞原因

**首页 `/` 首屏 Primary CTA 结构错误**：copy-freeze 第 3.1 节将 `Get Full Editor — $19/month Launch Special` → `/pricing` 设为首屏主按钮，违反 PRD-v3 第 8.1 / 9 / 11.6 节关于首页作为工具入口页、首屏 Primary CTA 必须指向免费工具入口、`$19 Launch Special` 仅限底部转化区的硬性要求。

**修复后重新审计**：待 copy-freeze 第 3.1 节首页 Hero CTA 规范修正为免费工具入口优先，即可解除阻塞。

---

## 7. 机制验证记录

| 验证项 | 结果 |
|---|---|
| readonly profile 可正常读取文件 | ✅ |
| readonly profile 可输出结构化审计报告 | ✅ |
| 审计过程中未修改任何项目文件 | ✅（git status 与 mtime 均确认） |
| 结构性问题被正确识别并 [BLOCKED] | ✅ |
