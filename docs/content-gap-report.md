# RemovePDFPages — Content Gap / Design Handoff Copy Audit v3

> 项目：removepdfpages.net  
> 审计对象：`design-handoff-v3/`  
> 上游冻结：`docs/copy-freeze.md` v3, `docs/PRD-v3.md`, `docs/compliance-report.md` v3, `docs/pricing-calibration-v3.md`  
> 审计方：zhongshu 总控  
> 日期：2026-07-29  
> 结论：**[GO] — 无 content gap，无 P0/P1 结构问题**

---

## 1. 审计结论

### 1.1 机械完整性

| 检查项 | 要求 | 实际 | 结果 |
|---|---|---|---|
| 路由数量 | 20 个 | 20 个 | ✅ |
| 页面文件 | 每个路由有 code.html | 所有 20 个路径均有 code.html | ✅ |
| 共享样式 | 每页引用 shared.css | 所有 20 页面均链接 ../shared.css | ✅ |
| Footer 法律链接 | 四链 /privacy /terms /refund /cookie-policy | 所有页面均包含 | ✅ |
| 顶部导航 | 按 navigation.md | 一致 | ✅ |

### 1.2 结构问题

| 检查项 | 标准 | 结果 |
|---|---|---|
| 首页 Hero CTA | Primary CTA 指向免费工具入口 `/remove-pages` | ✅ |
| 首页付费转化位置 | 仅出现在首页底部 | ✅ |
| 定价卡片 | `/pricing` 三列 Free / Monthly $19 / Yearly $99 + 隐藏 $59 | ✅ |
| 支付服务商 | 显示 Creem Merchant of Record | ✅ |
| Convert to Word | 显示 3/30 天免费额度、10/month、Top-up $5/10、1h TTL | ✅ |
| 签名免责声明 | 显示 not a digital certificate signature / not legally binding | ✅ |
| 禁用词 | 不出现 unlimited/free forever/no limits/lifetime updates/perfect/100% accurate/guaranteed/official | ✅ |
| 价格口径 | `$19/month`, `$99/year`, `$59 one-time`, `$29`/`$149` 仅作删除线 | ✅ |
| 退款政策 | 14-day refund, Creem processing fees not refunded | ✅ |

---

## 2. 已解决问题

| 页面 | 问题 | 修复方式 |
|---|---|---|
| `/merge` | 缺少 "Upload two or more PDFs" | 子 agent 补入 hero 副标题 |
| `/compress` | 缺少 "Choose compression level" / "Processed in your browser by default" | 子 agent 补入 |
| `/sign` | 缺少 "not legally binding" 完整短语 | 子 agent 更新免责声明横幅 |
| `/convert-to-word` | H1 不是 "Online" / 缺少 "10 included conversions" / "1-hour" | 子 agent 重写 H1 和额度区块 |
| `/terms` | 含禁用词 "perfect" | zhongshu 总控直接修改为 "error-free" |
| 页面目录 | 存在旧长尾路径（带 `-removepdfpages` 后缀） | zhongshu 总控删除旧目录，保留 v3 短路径 |
| 缺失页面 | 13 个页面未生成 | 子 agent @moyun3212bot 补全 |

---

## 3. 仍保留的待填回项

以下项不影响 06 design-freeze [DONE]，但需在 07/08/09 阶段回填：

1. **Creem 商户配置** — 07 frontend/checkout 实现前需确认 webhook / 产品类别 / 目标国家。
2. **$19 Launch Special 截止日期** — 当前保守披露 "may end without notice"。
3. **分析工具选型** — Privacy/Cookie Policy 已预留占位，需在 07 frontend 前确认（如 Plausible/GA4 + PostHog/MS Clarity）。
4. **后端方案** — Workers + WASM / 第三方 API / 自托管，实时成本待 08 backend 回填。
5. **图片资产** — 博客封面图、OG 图建议上线前替换，当前不阻塞设计冻结。

---

## 4. 验收标准

- [x] 路由数量 = 20
- [x] 每个路由有 code.html
- [x] 每个页面链接 shared.css
- [x] 首页 Hero Primary CTA 指向 `/remove-pages`
- [x] `/pricing` 三列 + 隐藏 $59
- [x] `/convert-to-word` 额度 / Top-up / 1h TTL
- [x] `/sign` 免责声明
- [x] Footer 四法律链接
- [x] 禁用词清单 = 0
- [x] 价格口径统一
- [x] 退款窗 14 天

---

## 5. 建议

06 design-freeze v3 已达到硬门槛要求，建议 zhongshu 总控将 06 design 标记为 `[DONE]`，07 frontend 进入 `[IN_PROGRESS]`。

在 07 frontend 开始前，应将本 audit 报告、DESIGN.md v3、copy-freeze v3、route-mapping.json 作为 handoff 输入给 07 frontend agent（`@chuangkoubot`）。
