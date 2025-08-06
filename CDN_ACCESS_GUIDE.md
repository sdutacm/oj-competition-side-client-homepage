# CDN 访问指南

## 🌐 正确访问方式

由于 CDN 服务器配置限制，请使用以下 URL 访问：

**✅ 推荐访问地址：**
```
https://cdn.sdutacm.cn/oj-competition-side-client/index.html
```

**❌ 目前有问题的地址：**
```
https://cdn.sdutacm.cn/oj-competition-side-client/
```

## 🔧 问题说明

1. **目录访问问题**：CDN 服务器没有配置默认文档（index.html），访问目录会下载空文件
2. **刷新问题**：由于 SPA 路由特性，刷新页面时需要服务器支持

## 🚀 解决方案

### 临时解决方案（用户）
- 始终通过 `/index.html` 访问
- 避免在地址栏直接修改 URL 后回车
- 使用页面内的导航按钮进行页面跳转

### 永久解决方案（服务器管理员）
需要在 CDN/服务器配置以下规则：

1. **默认文档设置**：
   ```
   DirectoryIndex index.html
   ```

2. **SPA 重写规则**（Apache）：
   ```apache
   <Directory "/path/to/oj-competition-side-client">
       RewriteEngine On
       RewriteBase /oj-competition-side-client/
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /oj-competition-side-client/index.html [L]
   </Directory>
   ```

3. **SPA 重写规则**（Nginx）：
   ```nginx
   location /oj-competition-side-client/ {
       alias /path/to/dist/;
       try_files $uri $uri/ /oj-competition-side-client/index.html;
       index index.html;
   }
   ```

## 📱 使用建议

1. **书签收藏**：请收藏 `https://cdn.sdutacm.cn/oj-competition-side-client/index.html`
2. **分享链接**：分享给他人时使用完整的 index.html 链接
3. **页面导航**：使用页面内的按钮和链接进行导航，避免手动修改地址栏

## 🔮 未来改进

我们正在与服务器管理员协调，配置正确的服务器规则，届时将支持：
- ✅ 直接访问目录 URL
- ✅ 页面刷新正常工作
- ✅ 前端路由完全兼容
