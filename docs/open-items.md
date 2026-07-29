# RemovePDFPages — Open Items Tracker

> 项目：removepdfpages.net  
> 最后更新：2026-07-23  
> 当前阶段：04 合规已更新 → 等待 02-product PRD/pricing 同步更新  
> 维护者：zhongshu

---

## 当前阻塞

| 任务 | 负责 | 状态 | 阻塞下游 |
|---|---|---|---|
| 更新 PRD-v3.md：Stripe → Creem | @jiagoushi777_bot | 已派活，待回复 | 05 Copy Freeze v2 |
| 更新 pricing-calibration-v2.md：手续费 + 毛利率 | @jiagoushi777_bot | 已派活，待回复 | 05 Copy Freeze v2 |
| 复核 PRD/pricing 与 compliance 一致性 | @jiancha_claw_bot / zhongshu | 等待 PRD 更新后 | 05 Copy Freeze v2 |

---

## 已确认决策（必须落地到文档）

1. **支付服务商**：Creem（https://creem.io），不是 Stripe。
2. **Creem 手续费**：3.9% + $0.40/笔。
3. **国际销售**：全球开放（除禁售国），Creem 作为 MOR 自动处理 VAT/GST。
4. **$19 Launch Special 边界**：`Limited time. May end without notice.`（暂不公开具体日期/数量）。
5. **Credits 退款**：未使用 credits 14 天内可退；已使用不可退；支付处理费不退。

---

## 已更新文件

- `/home/ubuntu/fancy-text-site/docs/compliance-report.md` — 已切换为 Creem 披露（v2 更新）。

## 待更新文件

- `/home/ubuntu/fancy-text-site/docs/PRD-v3.md`
- `/home/ubuntu/fancy-text-site/docs/pricing-calibration-v2.md`

---

## 仍然待确认 / 需上线前回填

| # | 项 | 负责方 | 阻塞等级 | 当前状态 |
|---|---|---|---|---|
| 1 | Creem 商户账户配置（ webhook、产品类别、目标国家支持） | 开发/运营 | P0 | 待 07 实现前确认 |
| 2 | 最终后端方案（Workers + WASM / 第三方 API / 自托管）及真实单次成本 | @jishi555_bot | P1 | 待 07 阶段 |
| 3 | 分析工具最终选型 | 产品/运营 | P2 | 已倾向：Plausible/GA4/Cloudflare Web Analytics + PostHog/MS Clarity + GSC/BWT + Creem |
| 4 | 用户实际平均生命周期、月转化率、平均使用频次 | 运营/数据 | P2 | 上线后回填 |
| 5 | $19 Launch Special 具体截止日期/数量限制 | 产品/运营 | P1 | 当前保守披露：may end without notice |

---

## 进入 05 Copy Freeze v2 的前提

- [ ] @jiagoushi777_bot 完成 PRD-v3.md 更新并回复 `[GO]`
- [ ] @jiagoushi777_bot 完成 pricing-calibration-v2.md 更新并回复 `[GO]`
- [ ] zhongshu 快速审计 PRD/pricing/compliance 三份文件一致性
- [ ] 无重大冲突后，zhongshu 发出 05 Copy Freeze v2 委托提示

---

## 给 05 Copy Freeze v2 的预提示

05 阶段必须：
1. 统一 CTA 为 `$19 Launch Special`；`$29` 仅作 strikethrough。
2. 落地 compliance-report v2 第 5.1 节所有强制披露语句。
3. 处理第 5.2 节禁用词清单。
4. 对未确认项保留 `[待确认]` 占位。
5. 输出 `docs/copy-freeze.md` v2。
