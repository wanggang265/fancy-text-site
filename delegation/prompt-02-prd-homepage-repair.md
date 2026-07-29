# 委托提示词：02 PRD 首页修复

> 目标 bot：@jiagoushi777_bot
> 项目：removepdfpages.net
> 工作目录：/home/ubuntu/fancy-text-site
> 必须加载 skill：product-definition-prd
> 阶段：02 PRD [NEEDS_REPAIR] → 目标 [GO]

## 背景

当前 `docs/PRD-v3.md` 存在结构性错误：
- §5.2 把首页 `/` 划入"CTA 统一为 `$19 Launch Special`"
- 这导致 copy-freeze 把首页 Hero Primary CTA 写成 `Get Full Editor — $19 Launch Special` → `/checkout`
- 但同一段写的转化路径是"入口 → 3 次免费试用 → 触发 Paywall → 购买"，首页被错误地当成了销售入口

## 必须修改的内容

1. **§5.2 "CTA 统一"段落**
   - 把首页 `/` 从统一列表中移除
   - 明确说明：首页 `/` 是工具入口页，不是付费转化入口
   - `/blog/*`、`/convert-to-word`、`/pricing`、`/checkout` 的 CTA 统一规则保持不变

2. **§5.2 "转化路径"段落**
   - 写清楚"入口"指的是免费工具页（如 `/remove-pages`、 `/convert-to-word`）
   - 首页的角色是让用户发现并进入免费工具入口

3. **§8.1 "CTA 与价格口径统一"**
   - 把首页 `/` 从"所有付费转化入口统一 `$19 Launch Special`"中移除
   - 单独增加一条首页规则：
     > 首页 `/` 首屏 Primary CTA 必须指向免费工具入口（例如 `/remove-pages`、 `/merge`、 `/compress`、 `/sign` 或页面内工具锚点）。`$19 Launch Special` 只能出现在首页底部转化区、 `/pricing`、 `/checkout` 或 `/convert-to-word` Paywall 中。

4. **PRD 顶部状态**
   - 将 `> 状态：[NEEDS_REVIEW]` 改为 `> 状态：[DONE]`
   - 理由：本 PRD 其他部分已冻结，本次仅修复首页定义

5. **不要修改的内容**
   - 5 工具套件边界（Remove / Merge / Compress / Sign / Convert to Word）
   - 定价策略（$19 Launch Special、$29 锚点、Top-up credits）
   - 退款/税务/设备限制
   - 数据合约相关章节
   - 博客/扩展页规划

## 输出要求

- 直接修改 `/home/ubuntu/fancy-text-site/docs/PRD-v3.md`
- 不要生成新的 PRD 文件，就在原文件上 patch
- 修改完成后输出变更摘要（改了哪些段落、为什么）
- 状态标记为 `[GO]`
- 如果发现修改会引发其他章节矛盾，输出 `[BLOCKED]` 并说明原因

## 验收标准

- [ ] 首页 `/` 不再出现在"CTA 统一为 `$19 Launch Special`"列表中
- [ ] 转化路径中的"入口"明确为工具页，不是首页直接购买
- [ ] §8.1 有独立的"首页 `/`"规则，Primary CTA 指向免费工具入口
- [ ] PRD 顶部状态为 `[DONE]`
- [ ] 其他章节未被误改
