# RemovePDFPages — 07 Frontend Handoff

> 阶段：07-frontend  
> 项目：removepdfpages.net (fancy-text-site)  
> 负责 Agent：@chuangkoubot  
> 派工日期：2026-07-29  
> 上游阶段状态：06 design-freeze [DONE] / 05 copy-freeze [DONE] / 04 compliance [DONE] / 03 pricing [DONE] / 02 PRD [DONE]  
> 07 frontend 状态：[IN_PROGRESS]

---

## 1. 上游输入（必读）

| 文档 | 路径 | 说明 |
|---|---|---|
| 设计 Handoff v3 | `design-handoff-v3/DESIGN.md` | 设计系统、页面清单、状态清单、验收标准 |
| 设计源文件 | `design-handoff-v3/pages/*/{code.html,styles.css}` | 20 个页面的高保真 HTML/CSS |
| 共享样式 | `design-handoff-v3/shared.css` | 必须使用的设计 token |
| 路由映射 | `design-handoff-v3/route-mapping.json` | 20 个路由与文件对应 |
| 导航/Footer 规范 | `design-handoff-v3/navigation.md` | Header/Footer 结构 |
| 文案冻结 v3 | `docs/copy-freeze.md` v3 | Title / Meta / H1 / CTA / 合规声明不得现场改写 |
| 页面矩阵 v3 | `docs/page-matrix.md` v3 | 20 页路由、主词、Schema、Indexable |
| 合规报告 v3 | `docs/compliance-report.md` v3 | 法律页内容、禁用词、数据保留 |
| 定价报告 v3 | `docs/pricing-calibration-v3.md` | $19/$99/$59/$5 Top-up |
| PRD v3 | `docs/PRD-v3.md` | 决策变量、功能边界 |
| MVP 禁做 | `docs/MVP-NOT-DO.md` | 不能做的功能 |
| 设计 copy-audit | `docs/content-gap-report.md` v3 | 06 design 验收结论 |
| Next.js 警告 | `AGENTS.md` | 这个 Next.js 版本有破坏性变更，先读文档 |

---

## 2. 交叉约束（从 05/06 冻结整合）

| 约束类别 | 具体要求 | 不能走样 |
|---|---|---|
| **商业模式** | 订阅主 + 隐藏买断 | 不能再宣传 $19 买断 |
| **首页 Hero** | Primary CTA 指向 `/remove-pages` | 首屏不能以付费价格为主导 |
| **定价页** | 三列 Free / Monthly $19 / Yearly $99 + 隐藏 $59 | 不能只有两列，不能把 $59 买断和订阅卡片并列 |
| **价格口径** | `$19/month`, `$99/year`, `$59 one-time`, `$29`/`$149` 仅删除线 | 不能出现其他价格或模糊 "Launch Special" |
| **Convert to Word** | 3/30 天免费、10/月付费，Top-up $5/10，1h TTL | 不能删除额度/超时/后端提示 |
| **Sign** | 必须有免责声明横幅 | 不能省略或改字“not legally binding” |
| **Footer** | 四链：`/privacy` `/terms` `/refund` `/cookie-policy` | 不能用旧的三链 |
| **禁用词** | unlimited, free forever, no limits, lifetime updates, perfect, 100% accurate, guaranteed, official | 全站不得出现 |
| **支付/税务** | 显示 Creem MOR + "We do not store your card details" + 自动计算 sales tax | 不能写 Stripe、不能少披露 |
| **退款** | 14-day refund policy + 已使用 credits 不退 + 处理费不退 | 不能写 7 天或无条件退款 |
| **SEO** | 每 indexable 页有唯一 title/meta/canonical/schema；sitemap 只含 indexable；robots.txt 正确 | noindex 页不进 sitemap；title 不重复站点名 |

---

## 3. 页面路由清单（20 个）

1. `/` — home
2. `/remove-pages` — 免费工具
3. `/merge` — 免费工具
4. `/compress` — 免费工具
5. `/sign` — 免费工具
6. `/convert-to-word` — 付费工具
7. `/pricing` — 转化页
8. `/checkout` — noindex
9. `/success` — noindex
10. `/faq` — support
11. `/contact` — support
12. `/privacy` — legal
13. `/terms` — legal
14. `/refund` — legal
15. `/cookie-policy` — legal
16. `/blog` — content
17. `/blog/foxit-alternative` — content
18. `/blog/replace-image-in-pdf` — content
19. `/blog/one-time-payment-pdf-editor` — content
20. `/blog/no-subscription-pdf-editor` — content

---

## 4. 技术栈与结构

- **框架**：Next.js App Router（必读 `AGENTS.md`，该版本有破坏性变更）
- **输出方式**：静态导出 `output: 'export'`
- **样式**：将 `design-handoff-v3/shared.css` 转为 CSS variables / Tailwind config / styled-components，保持设计 token 一致
- **图标**：Lucide React 或内联 SVG，不用 Material Symbols
- **工具库**：免费工具使用 `pdf-lib`浏览器端处理（不上传服务器）；Convert to Word 需后端，07 阶段可先用 mock 上传/状态
- **分析**：先预留分析事件代码，待分析工具选型确认后激活

---

## 5. 验收标准（不可降标）

- [ ] `npm run build` 通过，无 TypeScript/ESLint 错误
- [ ] `dist/` 或 `out/` 包含 20 个路对应的静态页面
- [ ] `dist/sitemap*.xml` 仅包含 indexable 页面（不含 `/checkout` `/success`）
- [ ] `dist/robots.txt` 存在
- [ ] 每个 indexable 页面：title / meta description / canonical / JSON-LD schema 正确
- [ ] 首页 Hero Primary CTA 指向 `/remove-pages`
- [ ] `/pricing` 三列卡片 + 隐藏 $59 买断
- [ ] `/convert-to-word` 额度 / Top-up / 1h TTL 提示
- [ ] `/sign` 免责声明横幅
- [ ] Footer 四链完整
- [ ] 移动端 375px 宽度无横向滚动、触控可用
- [ ] 全站禁用词 = 0
- [ ] git commit 提交，记录 commit SHA
- [ ] 部署到 Cloudflare Pages，`curl` 验证 `/` `/pricing` `/checkout` `/remove-pages` 200
- [ ] 输出 `07-frontend-handoff.md` 修改历史和下一步交接

---

## 6. 注意事项（先前教训）

1. **不要 stash 未提交文件后 deploy**—某些未追踪文件可能是 build 依赖，stash 后会报错。
2. **不要在线编写法律页内容**—使用 `docs/compliance-report.md` v3 和 `design-handoff-v3/pages/{privacy,terms,refund,cookie-policy}/code.html` 中的冻结文案。
3. **不要自创路径** — 严格使用 route-mapping.json 中的 20 个路径，不要多也不要少。
4. **不要把 noindex 页放进 sitemap**。
5. **不要在浏览器端实现 Convert to Word**—这个功能必须走后端，07 阶段可以 mock 状态和 UI，但不能写假的前端转换逻辑。
6. **deploy 前检查 HOME 和 token** — 如果当前会话 HOME 是 `/home/ubuntu/.hermes/profiles/.../home`，需要用 `HOME=/home/ubuntu` 运行 git/wrangler。
7. **模型选型** — 如果使用 OpenAI/GPT-4o，provider 应该是 `openrouter`，而不是 `openai`。

---

## 7. 交付物路径

- 代码：`/home/ubuntu/fancy-text-site/app/` 或 `/home/ubuntu/fancy-text-site/src/app/`
- 部署脚本：使用项目现有 `deploy.sh`
- 交接报告：`/home/ubuntu/fancy-text-site/docs/07-frontend-handoff.md`
- 拆建日志：保存为 `/home/ubuntu/fancy-text-site/docs/build-log-07.md`
- 验证结果：保存为 `/home/ubuntu/fancy-text-site/docs/frontend-qa-checklist.md`

---

## 8. 拒绝降标

以下任何一项未达到，07 frontend 不得标记 [DONE]：

1. build 失败或有未处理的 TypeScript/ESLint 错误
2. 缺少任何一个路径页面
3. sitemap 包含 noindex 页
4. 首页 Hero Primary CTA 不指向 `/remove-pages`
5. 定价页没有三列卡片（Free / Monthly / Yearly）
6. Convert to Word 缺少额度 / Top-up / 1h TTL 提示
7. Sign 缺少免责声明
8. Footer 不是四链（缺 cookie-policy）
9. 出现禁用词
10. 未部署或部署后 curl 验证失败

---

## 9. 回传要求

完成后请返回给 zhongshu（即此会话）：

```markdown
# 07-frontend 完成报告

## 状态
[DONE] / [BLOCKED] / [NEEDS_REVIEW]

## 完成项
- ...

## 依然存在的问题
- ...

## 验证结果
- build: 成功/失败
- 部署 URL: ...
- curl 200 检查: ...
- commit SHA: ...

## 交付物路径
- ...
```
