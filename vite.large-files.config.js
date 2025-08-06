/**
 * 大文件处理配置
 * 专门用于处理包含 base64 数据的大文件
 */

export const largeFileConfig = {
  // 大文件的识别模式
  patterns: [
    'imgDataUrl',
    'base64',
    'data:image',
    'data:video',
    'data:audio'
  ],
  
  // 大文件的分包策略
  chunkStrategy: {
    // 每个大文件单独分包
    individual: true,
    // 大文件的命名规则
    naming: 'base64-data-[hash]',
    // 是否启用压缩
    compress: true,
  },
  
  // 大文件的处理建议
  recommendations: {
    // 建议的最大文件大小 (MB)
    maxSizeMB: 5,
    // 建议使用的替代方案
    alternatives: [
      '考虑使用图片 CDN 服务',
      '使用 WebP 格式减少文件大小',
      '实现懒加载机制',
      '使用动态导入 (dynamic import)',
      '考虑将大图片移至 public 目录'
    ]
  },
  
  // 开发环境的优化
  development: {
    // 开发时跳过大文件处理
    skipLargeFiles: false,
    // 显示大文件警告
    showWarnings: true,
  },
  
  // 生产环境的优化
  production: {
    // 生产时启用最大压缩
    maxCompression: true,
    // 分离大文件到单独的 chunk
    separateChunks: true,
  }
}

/**
 * 检查文件是否为大数据文件
 * @param {string} id - 文件路径
 * @returns {boolean}
 */
export function isLargeDataFile(id) {
  return largeFileConfig.patterns.some(pattern => 
    id.includes(pattern)
  )
}

/**
 * 获取大文件的 chunk 名称
 * @param {string} id - 文件路径
 * @returns {string}
 */
export function getLargeFileChunkName(id) {
  // 提取文件名作为 chunk 名称的一部分
  const fileName = id.split('/').pop().split('.')[0]
  return `base64-data-${fileName}`
}

export default largeFileConfig
