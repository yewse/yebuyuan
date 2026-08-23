# Oliver 个人技术博客

Oliver 的个人技术博客，专注于锂离子电池工艺工程领域的知识分享。明亮高科技风格，配色灵感来自锂电池实验室：锂银白、铜箔橙、电解液青。

## 🚀 网站部署

**部署地址**: https://0liver.pages.dev  
**部署分支**: `main`  
**构建命令**: `npm run build`  
**输出目录**: `_site`

本网站使用 Eleventy 静态站点生成器 + Decap CMS 内容管理系统。推送到 `main` 分支后，Cloudflare Pages 会自动构建和部署。

**⚠️ 部署后必须配置**: 在 Cloudflare Pages 设置中添加环境变量 `GITHUB_CLIENT_ID` 和 `GITHUB_CLIENT_SECRET`（从 https://github.com/settings/developers 创建 OAuth App，callback URL 设为 `https://0liver.pages.dev/api/auth`）

## ✍️ 如何发布新文章

### 方法一：通过 Web 管理界面（推荐）

1. **访问管理后台**: 打开 https://0liver.pages.dev/admin/
2. **使用 GitHub 账号登录**: 点击"Login with GitHub"
3. **创建新文章**: 点击"技术笔记" → "New 技术笔记"
4. **填写文章信息**:
   - 标题：文章标题
   - 发布日期：选择日期
   - 摘要：文章简短摘要（显示在列表页）
   - 标签：添加相关标签（可选）
   - 内容：使用Markdown编写文章正文
5. **保存并发布**: 点击"Publish" → "Publish now"

文章会自动提交到GitHub仓库的 `src/posts/` 目录，触发Cloudflare Pages自动部署。

### 方法二：直接在 GitHub 创建文件

1. 在GitHub上打开仓库 `yewse/yebuyuan`
2. 进入 `src/posts/` 目录
3. 点击 "Add file" → "Create new file"
4. 文件名格式：`your-post-title.md`
5. 文件内容格式：

```markdown
---
title: 你的文章标题
date: 2026-08-23
summary: 文章摘要，一两句话描述文章内容
tags:
  - 标签一
  - 标签二
layout: post
---

文章正文使用Markdown格式编写...

## 章节标题

内容段落...
```

6. 点击 "Commit changes" 提交文件
7. 等待几分钟，Cloudflare Pages 自动部署完成

### 方法三：本地开发

```bash
# 克隆仓库
git clone https://github.com/yewse/yebuyuan.git
cd yebuyuan

# 安装依赖
npm install

# 本地预览
npm run serve
# 访问 http://localhost:8080

# 构建生产版本
npm run build
```

## 🔐 配置 GitHub OAuth（首次设置）

管理后台使用GitHub OAuth进行身份验证。首次部署需要配置：

### 1. 创建 GitHub OAuth App

1. 访问 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写信息：
   - **Application name**: Oliver Blog CMS
   - **Homepage URL**: `https://0liver.pages.dev`
   - **Authorization callback URL**: `https://0liver.pages.dev/api/auth`
4. 点击 "Register application"
5. 记下 **Client ID** 和生成 **Client Secret**

### 2. 配置 Cloudflare Pages 环境变量

1. 登录 Cloudflare Dashboard
2. 进入 Pages → 选择 `0liver` 项目
3. 进入 Settings → Environment variables
4. 添加以下变量（Production 和 Preview 都要添加）：
   - `GITHUB_CLIENT_ID`: 你的GitHub OAuth Client ID
   - `GITHUB_CLIENT_SECRET`: 你的GitHub OAuth Client Secret
5. 保存后重新部署

### 3. 测试登录

1. 访问 https://0liver.pages.dev/admin/
2. 点击 "Login with GitHub"
3. 授权后即可使用CMS管理文章

## 🎨 技术栈

- **静态站点生成**: [Eleventy](https://www.11ty.dev/) (11ty)
- **内容管理**: [Decap CMS](https://decapcms.org/) (前身 Netlify CMS)
- **样式**: 纯CSS，明亮高科技风格
- **特效**: Canvas 锂离子能量线动画
- **部署**: Cloudflare Pages
- **认证**: GitHub OAuth + Cloudflare Pages Functions

## 📁 项目结构

```
/
├── src/
│   ├── posts/              # Markdown文章目录
│   │   ├── *.md           # 文章文件
│   ├── _includes/          # 模板文件
│   │   ├── base.njk       # 基础布局
│   │   └── post.njk       # 文章页模板
│   ├── admin/              # CMS管理界面
│   │   ├── index.html     # CMS入口
│   │   └── config.yml     # CMS配置
│   ├── styles.css          # 全站样式
│   ├── index.njk           # 首页
│   ├── about.njk           # 关于页
│   ├── notes.njk           # 笔记列表页
│   └── 404.njk             # 404页面
├── functions/
│   └── api/
│       └── auth.js         # GitHub OAuth处理函数
├── .eleventy.js            # Eleventy配置
├── package.json            # Node.js依赖
└── README.md               # 本文件
```

## 🎨 设计特色

- **明亮实验室美学**: 锂银白背景 + 铜箔橙 + 电解液青绿配色
- **高科技视觉**: 网格背景 + 粒子连线动画
- **精致排版**: 优化的中英文字体配对，舒适的阅读尺度
- **交互细节**: 渐变hover效果，流畅的过渡动画
- **响应式设计**: 移动端完美适配

## 📝 Markdown 语法支持

文章支持标准Markdown语法：

- 标题 `## H2` `### H3`
- 列表 `-` 或 `1.`
- 粗体 `**文本**`
- 代码 `` `code` `` 或 ` ```语言 `
- 引用 `> 引用文本`
- 链接 `[文本](URL)`

## 版权声明

© 2026 Oliver。所有技术笔记内容基于公开的行业知识和通用工艺原理，仅供学习参考。
