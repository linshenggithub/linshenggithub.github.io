# Ma Yi 的算法手记

基于 Hexo + Fluid 的个人主页与技术博客，包含项目、研究、学习笔记和关于页面。

## 内容边界

- `source/_posts/` 只放经过确认、允许公开的文章。
- `source/_drafts/` 用于尚未公开的草稿，默认不会构建。
- 不要把本地原始笔记目录直接复制、链接或同步到仓库。
- CSDN 迁移文章应保留原始发布日期、来源链接和重新整理说明。
- 发布前检查手机号、邮箱、证件、密钥、内网地址、公司内部信息和私人记录。

## 本地使用

```bash
pnpm install
pnpm run server
```

构建静态网站：

```bash
pnpm run build
```

生成结果位于 `public/`。

## GitHub Pages

项目已经包含 `.github/workflows/pages.yml`。建议创建仓库
`linshenggithub.github.io`，将本站源码推送到 `main` 分支，然后在仓库的
`Settings > Pages` 中将发布源设为 `GitHub Actions`。

当前 `_config.yml` 已按 `https://linshenggithub.github.io` 配置。若使用其他
仓库名，需要同时把站点 URL 改为带仓库路径的地址。
