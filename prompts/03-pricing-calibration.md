你现在执行 ShipSolo 做站流水线的「定价与商业模型校准」阶段（03-pricing）。

项目：removepdfpages.net（本地仓库 `/home/ubuntu/fancy-text-site`）
当前阶段：03-pricing
目标市场：US / English

上游输入：
1. 必读 `/home/ubuntu/fancy-text-site/docs/PRD-v1.md` — 等待 02-PRD 完成后读取
2. 必读 `/home/ubuntu/fancy-text-site/docs/page-matrix.md` — 等待 02-PRD 完成后读取
3. 必读 `/home/ubuntu/fancy-text-site/app/pricing/page.tsx` — 当前定价页
4. 必读 `/home/ubuntu/fancy-text-site/design-handoff-extract/route-mapping.json` — 页面路由

当前决策：
- 定价初步为 $29 lifetime
- 需要你审核这个定价是否合理

请严格按 `shipsolo:site-pricing-calibration` skill 执行：
1. 先执行「开始前检查 / Preflight」和「输入契约」，缺关键资料就输出 [BLOCKED]，不要猜。
2. 分析竞品：RemovePDFPages 的直接竞品和替代方案定价。
3. 计算成本：免费用户日成本、付费用户边际成本、异常滥用风险。
4. 审核套餐：Free / Pro / Lifetime 是否合理，$29 lifetime 是否会亏损。
5. 输出定价校准报告：成本假设表、套餐矩阵、修改建议。
6. 每个重要判断都写依据；没有依据就标 [待确认]。
7. 涉及公开发布、支付、真实用户数据时，先列确认项，不要擅自执行。
8. 最后一行只能是：[DONE] / [BLOCKED] / [NEEDS_REVIEW]。

需要产出的交付物：
- `/home/ubuntu/fancy-text-site/docs/pricing-calibration.md`
- 定价页修改建议（如有）

验收清单：
- [ ] $29 lifetime 有成本依据
- [ ] 免费额度不会亏穿
- [ ] 没有“无限”或过度承诺
- [ ] CTA 与真实开通路径一致

交付后请回复 zhongshu，不要直接进入下一阶段。

注意：本阶段依赖 02-PRD 的输出，请在 02-PRD 完成后开始。
