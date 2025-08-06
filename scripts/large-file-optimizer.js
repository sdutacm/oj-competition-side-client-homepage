/**
 * 大文件优化工具
 * 用于处理包含大量 base64 数据的文件
 */

/**
 * Base64 数据优化选项
 */
export const base64OptimizationOptions = {
  // 图片质量设置
  imageQuality: {
    high: 0.9,      // 高质量 (90%)
    medium: 0.7,    // 中等质量 (70%)
    low: 0.5,       // 低质量 (50%)
    compressed: 0.3 // 高压缩 (30%)
  },
  
  // 图片格式建议
  formatRecommendations: {
    '.png': 'WebP (减少 25-35% 体积)',
    '.jpg': 'WebP (减少 25-35% 体积)',
    '.jpeg': 'WebP (减少 25-35% 体积)',
    '.gif': 'WebP 或保持 GIF (动图)',
    '.svg': '保持 SVG (矢量图)',
  },
  
  // 分割策略
  chunkingStrategy: {
    // 单个文件的最大大小 (KB)
    maxFileSize: 500,
    // 是否启用懒加载
    enableLazyLoading: true,
    // 是否使用动态导入
    useDynamicImport: true,
  }
}

/**
 * 检查 base64 数据的大小
 * @param {string} base64String - Base64 字符串
 * @returns {object} 大小信息
 */
export function analyzeBase64Size(base64String) {
  // 去除 data URL 前缀
  const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '')
  
  // 计算原始大小
  const sizeInBytes = (base64Data.length * 3) / 4
  const sizeInKB = Math.round(sizeInBytes / 1024)
  const sizeInMB = Math.round(sizeInBytes / 1024 / 1024 * 100) / 100
  
  return {
    bytes: sizeInBytes,
    kb: sizeInKB,
    mb: sizeInMB,
    isLarge: sizeInKB > 100, // 大于 100KB 算大文件
    recommendation: getSizeRecommendation(sizeInKB)
  }
}

/**
 * 获取大小优化建议
 * @param {number} sizeInKB - 文件大小 (KB)
 * @returns {string} 优化建议
 */
function getSizeRecommendation(sizeInKB) {
  if (sizeInKB > 1000) {
    return '建议使用 CDN 或外部图片链接'
  } else if (sizeInKB > 500) {
    return '建议压缩图片质量或转换为 WebP 格式'
  } else if (sizeInKB > 100) {
    return '考虑使用懒加载'
  } else {
    return '大小合适，可以保持 base64 格式'
  }
}

/**
 * 生成懒加载的代码示例
 * @param {string} imageName - 图片名称
 * @returns {string} 代码示例
 */
export function generateLazyLoadExample(imageName) {
  return `
// 懒加载 ${imageName}
const ${imageName}Lazy = ref(null)

const load${imageName} = async () => {
  if (!${imageName}Lazy.value) {
    const { default: imageData } = await import('./imgDataUrl/${imageName}.js')
    ${imageName}Lazy.value = imageData
  }
  return ${imageName}Lazy.value
}

// 在需要时调用
onMounted(async () => {
  await load${imageName}()
})
`
}

/**
 * 生成动态导入的代码示例
 * @param {string} fileName - 文件名
 * @returns {string} 代码示例
 */
export function generateDynamicImportExample(fileName) {
  return `
// 动态导入 ${fileName}
export const ${fileName}Module = () => import('./${fileName}.js')

// 使用时
const { default: ${fileName}Data } = await ${fileName}Module()
`
}

/**
 * 文件分割建议
 */
export const fileSplittingAdvice = {
  strategies: [
    {
      name: '按功能分割',
      description: '将不同功能的图片分到不同文件中',
      example: 'icons.js, backgrounds.js, avatars.js'
    },
    {
      name: '按页面分割',
      description: '将每个页面的图片单独打包',
      example: 'home-images.js, about-images.js, contact-images.js'
    },
    {
      name: '按大小分割',
      description: '将大图片和小图片分开',
      example: 'large-images.js (>100KB), small-images.js (<100KB)'
    },
    {
      name: '按加载优先级分割',
      description: '关键图片和非关键图片分开',
      example: 'critical-images.js (首屏), lazy-images.js (懒加载)'
    }
  ],
  
  implementation: {
    // Vite 配置示例
    viteConfig: `
// vite.config.js 中的分包配置
manualChunks: (id) => {
  // 大文件单独分包
  if (id.includes('large-images') || id.includes('backgrounds')) {
    return 'large-images'
  }
  // 小图标分包
  if (id.includes('icons') || id.includes('small-images')) {
    return 'icons'
  }
  // 其他 base64 数据
  if (id.includes('imgDataUrl')) {
    return 'base64-data'
  }
}`,
    
    // 使用示例
    usage: `
// 按需导入
import { iconData } from './icons.js'           // 小文件，立即加载
const { backgroundData } = await import('./backgrounds.js')  // 大文件，懒加载
`
  }
}

export default {
  base64OptimizationOptions,
  analyzeBase64Size,
  generateLazyLoadExample,
  generateDynamicImportExample,
  fileSplittingAdvice
}
