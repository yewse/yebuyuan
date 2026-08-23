# Cloudflare Pages 设置指南

## 📋 构建配置

在 Cloudflare Pages 项目设置中，配置如下：

### Build settings
- **Framework preset**: None
- **Build command**: `npm run build`
- **Build output directory**: `_site`
- **Root directory**: `/` (保持默认)
- **Node version**: 18 or later

### Environment variables（Production 和 Preview 都要添加）

需要配置以下环境变量：

```
GITHUB_CLIENT_ID = your_github_oauth_client_id
GITHUB_CLIENT_SECRET = your_github_oauth_client_secret
```

## 🔑 GitHub OAuth App 创建步骤

1. 访问 https://github.com/settings/developers
2. 点击 "OAuth Apps" → "New OAuth App"
3. 填写信息：
   - **Application name**: `Oliver Blog CMS`
   - **Homepage URL**: `https://0liver.pages.dev`
   - **Authorization callback URL**: `https://0liver.pages.dev/api/auth`
4. 创建后，复制 **Client ID** 和生成 **Client Secret**
5. 在 Cloudflare Pages 环境变量中填入这两个值

## ✅ 验证部署

部署成功后，访问以下链接验证：

- **网站首页**: https://0liver.pages.dev
- **管理后台**: https://0liver.pages.dev/admin
- **笔记列表**: https://0liver.pages.dev/notes

## 🔐 首次登录 CMS

1. 访问 https://0liver.pages.dev/admin
2. 点击 "Login with GitHub"
3. 授权 GitHub OAuth App
4. 登录成功后即可管理文章

## 📝 发布文章流程

1. 在 /admin 界面点击 "技术笔记" → "New 技术笔记"
2. 填写标题、日期、摘要、标签和正文
3. 点击 "Publish" → "Publish now"
4. 文章会自动提交到 GitHub 仓库
5. Cloudflare Pages 自动检测提交并重新构建部署
6. 几分钟后文章即可在网站上看到

## 🐛 故障排查

### 构建失败
- 检查 Node 版本是否 ≥ 18
- 检查构建命令是否为 `npm run build`
- 查看构建日志中的错误信息

### CMS 登录失败
- 检查 GitHub OAuth App 的 callback URL 是否正确
- 检查 Cloudflare 环境变量是否正确配置
- 在浏览器开发者工具的 Console 中查看错误信息

### 文章不显示
- 检查 Markdown 文件的 front matter 格式是否正确
- 确认 `layout: post` 字段存在
- 重新触发构建（推送一个空提交或在 Cloudflare 手动触发）
