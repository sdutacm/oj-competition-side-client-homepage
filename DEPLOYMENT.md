# 部署指南

## 子目录部署配置

本项目已配置为子目录部署，base 路径为 `/oj-competition-side-client/`。

## 配置说明

### 1. Vite 配置 (vite.config.js)
```javascript
export default defineConfig({
  base: '/oj-competition-side-client/',
  // ... 其他配置
})
```

### 2. 路由配置 (src/router/index.js)
```javascript
const router = createRouter({
  history: createWebHistory('/oj-competition-side-client/'),
  routes
});
```

### 3. 静态资源配置 (index.html)
```html
<link rel="icon" href="./icon.ico" />
```

## 部署方式

### 1. 静态文件服务器部署

构建项目：
```bash
npm run build
```

将 `dist` 目录中的所有文件上传到服务器的 `/oj-competition-side-client/` 目录下。

### 2. Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 主站点根目录
    root /var/www/html;
    
    # 子目录应用配置
    location /oj-competition-side-client/ {
        alias /var/www/html/oj-competition-side-client/;
        try_files $uri $uri/ /oj-competition-side-client/index.html;
        
        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. Apache 配置示例

在 `/var/www/html/oj-competition-side-client/` 目录下创建 `.htaccess` 文件：

```apache
RewriteEngine On
RewriteBase /oj-competition-side-client/

# Handle Angular and Vue.js routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /oj-competition-side-client/index.html [L]

# 静态资源缓存
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/ico "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

### 4. GitHub Pages 部署

如果要部署到 GitHub Pages，确保仓库设置中的 base URL 与配置匹配：

1. 仓库设置 → Pages → Source 选择 GitHub Actions 或 Deploy from a branch
2. 如果使用 GitHub Actions，workflow 文件中设置：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 本地测试

### 开发环境
```bash
npm run dev
# 访问: http://localhost:5173/
```

### 生产环境预览
```bash
npm run build
npm run preview
# 访问: http://localhost:4173/oj-competition-side-client/
```

## GitHub Actions 自动部署

本项目已配置 GitHub Actions 自动部署到腾讯云 COS：

### 配置文件位置
`.github/workflows/ci.yml`

### 需要的 Secrets
在 GitHub 仓库设置中添加以下 Secrets：

- `COS_SECRET_ID`: 腾讯云 COS SecretId
- `COS_SECRET_KEY`: 腾讯云 COS SecretKey  
- `COS_BUCKET`: COS 存储桶名称
- `COS_REGION`: COS 存储桶地区

### 部署目标
- CDN URL: `https://cdn.sdutacm.cn/oj-competition-side-client/homepage`
- 上传路径: `oj-competition-side-client/homepage`

### 触发条件
- 推送到 `master` 分支时自动构建和部署
- Pull Request 时仅构建测试，不部署

## 注意事项

1. **相对路径**: 所有静态资源都使用相对路径，确保在子目录中正常访问
2. **路由配置**: Vue Router 使用 `createWebHistory('/oj-competition-side-client-homepage/')` 确保路由正确
3. **API 请求**: 如果有 API 请求，确保使用相对路径或完整的绝对路径
4. **CDN 配置**: 环境变量 `VITE_CDN_BASE_URL` 已配置为绝对路径，不受 base 路径影响

## 环境变量

项目中的重要环境变量：
- `VITE_CDN_BASE_URL`: CDN 基础 URL (已配置为绝对路径)
- `VITE_APP_VERSION`: 应用版本号
- `VITE_APP_NAME`: 应用名称

这些变量不受 base 路径影响，保持全局配置。
