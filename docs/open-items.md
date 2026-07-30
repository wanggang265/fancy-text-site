# RemovePDFPages — Open Items Tracker

> 项目：removepdfpages.net  
> 最后更新：2026-07-29  
> 当前阻塞：06 design-freeze [DONE] — 等待 07 frontend 派工  
> 当前阶段：04 compliance [DONE]，05 copy-freeze 重跑 [DONE]，06 design-freeze [DONE]，07 frontend [IN_PROGRESS]  
> 维护者：zhongshu

---

## 当前阻塞

- 06 design-freeze 子 agent 被 session 中断，`design-handoff-v3/pages/` 存在两套重复目录：v3 短路径与旧长尾路径。已将 06 design 标记为 [BLOCKED]。
- 需清理旧目录并执行 copy-audit 后，才能进入 07 frontend。

---

## 已完成里程碑

- 04 compliance 重跑：`docs/compliance-report.md` v3 [DONE]
- 05 copy-freeze 重跑：`docs/copy-freeze.md` v3 [DONE]
- 06 design-freeze 子 agent 已输出：`design-handoff-v3/DESIGN.md` v3，但页面目录尚未清理和审计

## 已确认决策（必须落地到文档）

1. **商业模式**：混合（订阅制为主 + 隐藏一次性买断）。
2. **定价结构**：
   - 月付：$19/month Launch Special（原价 $29/month）
   - 年付：$99/year（原价 $149/year）
   - 买断：$59 One-time License（原价 $79），隐藏展示
   - Top-up：$5/10 conversions 或 $0.50 each
3. **支付服务商**：Creem（https://creem.io），不是 Stripe。
4. **Creem 手续费**：3.9% + $0.40/笔。
5. **国际销售**：全球开放（除禁售国），Creem 作为 MOR 自动处理 VAT/GST。
6. **$19 Launch Special 边界**：`Limited time. May end without notice.`。
7. **Credits 退款**：未使用 credits 14 天内可退；已使用不可退；支付处理费不退。
8. **试用模式**：Freemium 直接转化，不做 7 天免费试用。
9. **首页 CTA**：首屏 Primary CTA 指向免费工具入口，付费转化内容仅出现在首页底部及其他付费转化入口。

---

## 已更新文件

- `/home/ubuntu/fancy-text-site/docs/PRD-v3.md` — 已合并 pricing v3、补「决策变量」章节。
- `/home/ubuntu/fancy-text-site/docs/pricing-calibration-v3.md` — 已按用户 2026-07-29 竞品价格快照更新。
- `/home/ubuntu/fancy-text-site/docs/MVP-NOT-DO.md` — 已同步商业模式变更（订阅制为主）。
- `/home/ubuntu/fancy-text-site/docs/project-control.md` — 已更新阶段状态。
- `/home/ubuntu/fancy-text-site/docs/compliance-report.md` v3 — 04 compliance 重跑 [DONE]。
- `/home/ubuntu/fancy-text-site/docs/copy-freeze.md` v3 — 05 copy-freeze 重跑 [DONE]，首页 Hero CTA 指向免费工具入口，全站定价口径统一。

---

## 待更新文件

- `/home/ubuntu/fancy-text-site/design-handoff-v3/` — 06 design-freeze [DONE]，`docs/content-gap-report.md` v3 已完成。
- `docs/page-matrix.md` — v1 仍写旧买断制 CTA，需在 07 frontend 实现前同步为 v3（以 copy-freeze v3 为准）。
- `app/` — 07 frontend 待开始。

---

## 仍然待确认 / 需上线前回填

| # | 项 | 负责方 | 阻塞等级 | 当前状态 | 说明 |
|---|---|---|---|---|---|
| 1 | 退款窗口 | 用户/产品 | P0 | 已确认并修正：14 天 | PRD-v3 / pricing v3 / compliance-report v3 / Refund 页 / project-control.md 均已统一为 14 天（2026-07-29 同步） |
| 2 | Creem 商户账户配置（webhook、产品类别、目标国家支持） | 开发/运营 | P0 | 待 07 实现前确认 | 合规报告 v3 已披露 Creem MOR / 税务 |
| 3 | 最终后端方案（Workers + WASM / 第三方 API / 自托管）及真实单次成本 | @jishi555_bot | P1 | 待 07 阶段 | 合规报告 v3 已披露 TTL 1 小时 / 数据流 |
| 4 | 分析工具最终选型 | 产品/运营 | P2 | 已倾向：Plausible/GA4/Cloudflare Web Analytics + PostHog/MS Clarity + GSC/BWT + Creem | Privacy/Cookie Policy 待更新；05 copy-freeze v3 已预留占位 |
| 5 | 用户实际平均生命周期、月转化率、平均使用频次 | 运营/数据 | P2 | 上线后回填 | 不影响法律页 |
| 6 | $19 Launch Special 具体截止日期/数量限制 | 产品/运营 | P1 | 当前保守披露：may end without notice | 合规报告 v3 已披露 |
| 7 | $59 One-time License cannibalization 风险是否接受 | 用户/产品 | P1 | 已接受 | 已作为隐藏选项，符合 pricing v3 策略 |
| 8 | 订阅到期后用户状态（是否保留免费 3 次/30 天额度） | 产品 | P2 | 建议保留 | Terms 待回填 |

---

## 进入 04 compliance 的前提

- [x] 03 pricing v3 已出
- [x] 商业模式已确认为混合
- [x] PRD-v3 已补「决策变量」章节
- [x] zhongshu 审核并确认 03 pricing v3 [DONE]
- [x] @jiancha_claw_bot 完成 04 compliance 重跑（状态 [DONE]）

---

## 给 04 compliance 的预提示

以下已在 compliance-report.md v3 中落地：

1. 重新评估了订阅制 + 隐藏买断在各洲销售下的合规性。
2. 更新了 Terms / Privacy / Refund / Cookie Policy 页披露（订阅续订/取消、买断边界、设备限制、退款窗）。
3. 确认了 Creem 作为 MOR 的税务披露。
4. 更新了禁用词清单：unlimited / free forever / no limits / lifetime updates 等。
5. 输出了 `docs/compliance-report.md` v3，状态 [GO with NEEDS_REVIEW]。

**主要未决项**：04 compliance 阶段退款窗口 7 天 vs 14 天冲突已由用户 2026-07-29 确认为 14 天；尚待确认项为 Creem 商户配置、分析工具选型、后端方案及成本。

---

## 05 Copy Freeze v3 输出

05 copy-freeze 重跑已完成：
1. 统一 CTA 为 `$19/month Launch Special` / `$99/year` / `$59 one-time license`；`$29` 仅作 strikethrough。
2. 首页 `/` 首屏 Primary CTA 指向 `/remove-pages` 等免费工具入口；付费转化内容仅出现在首页底部及 `/pricing` / `/checkout` / `/convert-to-word` / `/blog/*`。
3. 落地 compliance-report v3 所有强制揭露语句。
4. 处理禁用词清单（unlimited / free forever / no limits / lifetime updates 等）。
5. 未确认项保留 `[NEEDS_SOURCE_CHECK]` / `[待确认]` 占位，未编造价格或承诺。
6. 输出 `docs/copy-freeze.md` v3，状态 [GO with NEEDS_REVIEW]。

---

## 给 06 design-freeze 的预提示

06 设计阶段必须以 `docs/copy-freeze.md` v3 为准，重点：
1. 首页 Hero 首屏 Primary CTA 指向免费工具入口（如 `/remove-pages`），不得显示付费价格主导。
2. `/pricing` 三列卡片：Free / Monthly $19 / Yearly $99，隐藏买断 $59 放在卡片下方。
3. `/convert-to-word` 展示免费试用额度、Top-up CTA、后端 1 小时 TTL 提示。
4. `/sign` 显示“not a digital certificate signature”免责声明。
5. Footer Legal 指向 `/privacy` / `/terms` / `/refund` / `/cookie-policy`。
6. 全站无禁用词，价格口径统一。
