你现在执行 ShipSolo 做站流水线的「产品定义与 PRD」阶段（02-product）。

项目：removepdfpages.net（本地仓库 `/home/ubuntu/fancy-text-site`）
当前阶段：02-product
目标市场：US / English

上游输入：
1. 必读 `/home/ubuntu/fancy-text-site/docs/precision-pdf-delivery-pack/README.md` — 原产品边界声明
2. 必读 `/home/ubuntu/fancy-text-site/design-handoff-extract/route-mapping.json` — 当前 design handoff 的 11 个路由
3. 必读 `/home/ubuntu/fancy-text-site/design-handoff-extract/DESIGN.md` — 设计系统
4. 必读 `/home/ubuntu/fancy-text-site/10-frontend-realignment.md` — 前端已实现的页面
5. 参考 `/home/ubuntu/fancy-text-site/app/` 目录下的页面

当前决策：
- 产品边界从 single-function PDF page remover 扩展为 5 工具套件
- 5 个工具为：Remove Pages / Merge PDF / Compress PDF / Sign PDF / Convert PDF to Word
- 定价初步为 $29 lifetime，待你完成 PRD 后由定价 agent 审核
- 需要恢复 /privacy /terms /refund 页面

请严格按 `shipsolo:product-definition-prd` skill 执行：
1. 先执行「开始前检查 / Preflight」和「输入契约」，缺关键资料就输出 [BLOCKED]，不要猜。
2. 更新 PRD：明确 5 工具套件边界、NOT-DO、用户任务。
3. 输出 Route Contract：与 design handoff 一致的 11 个路由。
4. 输出 Page Matrix：每个页面的主词、H1、title、meta、CTA、schema。
5. 输出 Data Contract：前端需要的后端能力（上传、处理、下载等）。
6. 输出 MVP-NOT-DO：什么做、什么不做。
7. 每个重要判断都写依据；没有依据就标 [待确认]。
8. 涉及公开发布、支付、真实用户数据时，先列确认项，不要擅自执行。
9. 最后一行只能是：[DONE] / [BLOCKED] / [NEEDS_REVIEW]。

需要产出的交付物：
- `/home/ubuntu/fancy-text-site/docs/PRD-v1.md`
- `/home/ubuntu/fancy-text-site/docs/route-contract.json`
- `/home/ubuntu/fancy-text-site/docs/page-matrix.md`
- `/home/ubuntu/fancy-text-site/docs/data-contract.md`
- `/home/ubuntu/fancy-text-site/docs/MVP-NOT-DO.md`

验收清单：
- [ ] 5 个工具的用户任务清晰
- [ ] 每个 indexable 页面有价值
- [ ] NOT-DO 明确
- [ ] Route Contract 与 design handoff 一致

交付后请回复 zhongshu，不要直接进入下一阶段。
