# Oliver 个人技术博客

Oliver 的个人技术博客，专注于锂离子电池工艺工程领域的知识分享。

## 网站部署

本网站是一个纯静态站点（HTML/CSS/JavaScript），无需构建步骤。通过 Cloudflare Pages 自动部署：

- **部署分支**: `main`
- **构建命令**: 无（留空）
- **输出目录**: `/`（根目录）
- **项目URL**: https://yebuyuan.pages.dev

每当 `main` 分支有新的提交推送时，Cloudflare Pages 会自动拉取最新代码并部署到生产环境。无需手动构建或配置，部署过程完全自动化。

## 技术栈

- 纯 HTML5 + CSS3
- 响应式设计，移动端友好
- 语义化标签，无障碍支持
- SVG favicon（内联，无需额外文件）
- 工业技术风格设计（石墨灰 / 铜 / 深蓝绿色调）

## 本地预览

使用任意静态文件服务器即可本地预览：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve

# 使用 PHP
php -S localhost:8000
```

然后在浏览器访问 `http://localhost:8000`

## 内容结构

```
/
├── index.html              # 首页
├── about.html              # 关于页面
├── notes.html              # 技术笔记索引
├── notes/                  # 技术笔记文章目录
│   ├── formation-current-strategy.html
│   ├── calendaring-density-porosity.html
│   └── coating-weight-control.html
├── styles.css              # 全站样式表
├── 404.html                # 404错误页面
└── README.md               # 本文件
```

## 版权声明

© 2026 Oliver。所有技术笔记内容基于公开的行业知识和通用工艺原理，仅供学习参考。
