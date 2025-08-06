# GitHub Actions 自动部署配置

## 概述

本项目使用 GitHub Actions 实现自动构建和部署到腾讯云 COS，支持 CDN 加速访问。

## 配置文件

### 工作流文件
`.github/workflows/ci.yml`

### 主要特性
- ✅ 自动检测 Node.js 版本 (18)
- ✅ 智能缓存 npm 依赖
- ✅ 构建信息展示
- ✅ 仅在 master 分支推送时部署
- ✅ Pull Request 时构建测试
- ✅ 部署成功通知

## 部署配置

### 目标路径
- **CDN URL**: `https://cdn.sdutacm.cn/oj-competition-side-client/homepage`
- **COS 上传路径**: `oj-competition-side-client/homepage`
- **本地构建路径**: `./dist/`

### GitHub Secrets 配置

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `COS_SECRET_ID` | 腾讯云 COS SecretId | `AKIDxxxxxxxxxxxxx` |
| `COS_SECRET_KEY` | 腾讯云 COS SecretKey | `xxxxxxxxxxxxxxxxx` |
| `COS_BUCKET` | COS 存储桶名称 | `your-bucket-name` |
| `COS_REGION` | COS 存储桶地区 | `ap-beijing` |

## 工作流程

### 触发条件
1. **Push 到 master 分支**: 构建 + 部署
2. **Pull Request**: 仅构建测试

### 执行步骤
1. **检出代码**: 获取最新代码和子模块
2. **设置环境**: 安装 Node.js 18 + npm 缓存
3. **安装依赖**: `npm ci` (更快的安装方式)
4. **构建项目**: `npm run build`
5. **显示信息**: 展示构建大小和内容
6. **上传部署**: (仅 master 分支) 上传到 COS
7. **成功通知**: 显示部署完成信息

## 本地测试

### 构建测试
```bash
# 安装依赖
npm ci

# 构建项目
npm run build

# 检查构建结果
ls -la dist/
du -sh dist/

# 本地预览构建结果
npm run preview
```

### 配置验证
```bash
# 验证路由配置
echo "Base path: /oj-competition-side-client/"

# 验证构建路径
npm run build
grep -r "oj-competition-side-client" dist/
```

## 部署状态检查

### GitHub Actions 页面
- 访问: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
- 查看最新构建状态和日志

### 部署结果验证
- 访问: `https://cdn.sdutacm.cn/oj-competition-side-client/homepage`
- 检查文件上传: COS 控制台查看 `oj-competition-side-client/homepage` 目录

## 故障排除

### 常见问题

1. **构建失败 - 依赖问题**
   ```bash
   # 本地测试
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **上传失败 - COS 权限**
   - 检查 COS Secrets 配置是否正确
   - 确认 COS 存储桶权限设置

3. **路径访问 404**
   - 验证 base 路径配置: `/oj-competition-side-client/`
   - 检查 COS 上传路径: `oj-competition-side-client/homepage`

### 调试技巧

1. **查看构建日志**
   - GitHub Actions → 点击工作流 → 查看详细步骤日志

2. **本地模拟 CI 环境**
   ```bash
   # 使用相同的构建命令
   npm ci
   npm run build
   
   # 检查生成的文件路径
   find dist/ -name "*.html" -exec grep -l "oj-competition-side-client" {} \;
   ```

3. **验证部署路径**
   ```bash
   # 检查生成的 index.html 中的路径引用
   cat dist/index.html | grep -E "(href|src)="
   ```

## 高级配置

### 环境变量
```yaml
env:
  CDN_URL: https://cdn.sdutacm.cn/oj-competition-side-client/homepage
  NODE_ENV: production
```

### 条件部署
```yaml
# 仅在 master 分支且为 push 事件时部署
if: github.ref == 'refs/heads/master' && github.event_name == 'push'
```

### 构建缓存优化
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 18
    cache: 'npm'  # 自动缓存 node_modules
```

## 安全注意事项

1. **Secrets 管理**: 不要在代码中硬编码敏感信息
2. **权限最小化**: COS 权限仅授予必要的存储桶操作权限
3. **分支保护**: 建议设置 master 分支保护规则
4. **审核流程**: 重要变更通过 Pull Request 审核
