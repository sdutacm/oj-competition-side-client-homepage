# SDUT OJ Competition Side Client Homepage

SDUT Online Judge 竞赛客户端官方主页，基于 Vue 3 + Vite 构建的现代化 Web 应用。

## ✨ 特性

- 🚀 Vue 3 + Vite - 快速开发和构建
- 🎨 Element Plus - 优雅的 UI 组件库
- 📱 响应式设计 - 完美适配各种设备
- 🎬 GSAP 动画 - 流畅的页面动画效果
- 📦 智能分包 - 优化的构建产物
- 🔧 完善的构建配置 - 开发和生产环境配置

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI 库**: Element Plus
- **动画库**: GSAP + ScrollTrigger
- **CSS 预处理器**: Less
- **状态管理**: Pinia
- **路由管理**: Vue Router

## 📋 环境要求

- Node.js >= 20.0.0
- npm >= 8.0.0

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建命令

```bash
# 生产环境构建
npm run build

# 生产环境构建（显式指定模式）
npm run build:prod

# 预发布环境构建
npm run build:staging

# 构建并分析打包体积
npm run build:analyze

# 清理构建产物
npm run clean

# 清理并重新构建
npm run build:clean
```

### 预览构建产物

```bash
npm run preview
```

## 📁 项目结构

```
src/
├── assets/          # 静态资源
│   ├── css/        # 样式文件
│   ├── images/     # 图片资源
│   └── video/      # 视频资源
├── components/      # 组件
│   ├── about/      # About 页面组件
│   └── ...         # 其他组件
├── pages/          # 页面组件
├── router/         # 路由配置
├── store/          # 状态管理
├── utils/          # 工具函数
└── main.js         # 应用入口
```

## 🔧 配置说明

### 环境变量

- `.env` - 通用环境变量
- `.env.production` - 生产环境变量
- `.env.analyze` - 分析模式环境变量

主要环境变量：
- `VITE_CDN_BASE_URL` - CDN 基础 URL
- `VITE_APP_VERSION` - 应用版本
- `VITE_HISTORICAL_VERSIONS` - 历史版本列表

### 构建优化

- **代码分割**: 按库和功能模块分包
- **资源分类**: 自动按类型分类静态资源
- **压缩优化**: 生产环境移除 console 和 debugger
- **Bundle 分析**: 支持可视化分析打包体积

## 📦 部署

构建完成后，`dist` 目录包含所有需要部署的文件。可以部署到任何静态文件服务器。

推荐部署配置：
- 启用 gzip 压缩
- 设置适当的缓存策略
- 配置 HTTPS

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

*© 2008-2025 SDUTACM. All rights reserved.*
