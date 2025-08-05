/**
 * 智能下载链接生成器
 * 根据平台、架构、版本和文件类型自动生成下载链接
 */

// 平台配置
const PLATFORM_CONFIG = {
  Windows: {
    architectures: ['x64', 'arm64'],
    fileTypes: [
      { type: 'portable', extension: 'exe', label: 'portable' },
      { type: 'installer', extension: 'exe', label: 'installer' }
    ],
    pathSuffix: '/release'
  },
  macOS: {
    architectures: ['x64', 'arm64'],
    fileTypes: [
      { type: '', extension: 'dmg', label: 'dmg' }
    ],
    pathSuffix: '/release'
  },
  Linux: {
    architectures: ['x86_64', 'arm64'],
    fileTypes: [
      { type: '', extension: 'AppImage', label: 'AppImage' }
    ],
    pathSuffix: '/release'
  }
}

// 架构显示名称映射
const ARCH_DISPLAY_NAMES = {
  Windows: {
    x64: 'x64',
    arm64: 'arm64'
  },
  macOS: {
    x64: 'x64',
    arm64: 'arm64'
  },
  Linux: {
    x86_64: 'x64',
    arm64: 'arm64'
  }
}

/**
 * 生成下载URL
 * @param {string} platform - 平台名称 (Windows, macOS, Linux)
 * @param {string} architecture - 架构 (x64, arm64, x86_64)
 * @param {string} version - 版本号 (如: 0.0.1)
 * @param {string} fileType - 文件类型 (portable, installer, 或空字符串)
 * @returns {string} 完整的下载URL
 */
function generateDownloadUrl(platform, architecture, version, fileType = '') {
  const cdnBaseUrl = import.meta.env.VITE_CDN_BASE_URL || 'https://cdn.sdutacm.cn/oj-competition-side-client'
  const filePrefix = import.meta.env.VITE_APP_FILE_PREFIX || 'SDUTOJCompetitionSideClient'
  
  const config = PLATFORM_CONFIG[platform]
  if (!config) {
    throw new Error(`Unsupported platform: ${platform}`)
  }
  
  // 构建路径
  const basePath = `${cdnBaseUrl}${config.pathSuffix}/v${version}`
  
  // 平台名称映射 - 修复 macOS 文件名格式
  const platformNames = {
    'Windows': 'windows',
    'macOS': 'macos',  // 修改这里：从 macos 改为 mac
    'Linux': 'linux'
  }
  
  // 构建文件名
  let fileName = `${filePrefix}_${platformNames[platform] || platform.toLowerCase()}`
  
  if (fileType) {
    fileName += `_${fileType}`
  }
  
  fileName += `_${architecture}`
  
  fileName += `_${version}`
  
  const fileTypeConfig = config.fileTypes.find(ft => ft.type === fileType)
  if (!fileTypeConfig) {
    throw new Error(`Unsupported file type: ${fileType} for platform: ${platform}`)
  }
  
  fileName += `.${fileTypeConfig.extension}`
  
  return `${basePath}/${fileName}`
}

/**
 * 生成平台的所有下载选项
 * @param {string} platform - 平台名称
 * @param {string} version - 版本号
 * @returns {Array} 下载选项数组
 */
function generatePlatformDownloads(platform, version) {
  const config = PLATFORM_CONFIG[platform]
  if (!config) {
    return []
  }
  
  const downloads = []
  
  // 遍历所有架构
  for (const arch of config.architectures) {
    // 遍历所有文件类型
    for (const fileType of config.fileTypes) {
      const archDisplayName = ARCH_DISPLAY_NAMES[platform][arch] || arch
      const fileTypeLabel = fileType.label
      
      // 生成标题
      let title = `${platform}(${archDisplayName})`
      if (fileType.type) {
        title += `(${fileTypeLabel})`
      } else {
        title += `(${fileTypeLabel})`
      }
      
      // 生成URL
      const url = generateDownloadUrl(platform, arch, version, fileType.type)
      
      downloads.push({
        title,
        url,
        platform,
        architecture: arch,
        fileType: fileType.type,
        extension: fileType.extension
      })
    }
  }
  
  return downloads
}

/**
 * 获取所有版本的所有平台下载链接
 * @returns {Object} 按版本和平台组织的下载链接
 */
function getAllDownloads() {
  const versions = (import.meta.env.VITE_HISTORICAL_VERSIONS || '0.0.2,0.0.1').split(',')
  const platforms = Object.keys(PLATFORM_CONFIG)
  
  const result = {}
  
  for (const version of versions) {
    result[version] = {}
    for (const platform of platforms) {
      result[version][platform] = generatePlatformDownloads(platform, version.trim())
    }
  }
  
  return result
}

/**
 * 获取特定版本的所有平台下载链接
 * @param {string} version - 版本号
 * @returns {Object} 按平台组织的下载链接
 */
function getVersionDownloads(version) {
  const platforms = Object.keys(PLATFORM_CONFIG)
  const result = {}
  
  for (const platform of platforms) {
    result[platform] = generatePlatformDownloads(platform, version)
  }
  
  return result
}

/**
 * 获取所有版本列表
 * @returns {Array} 版本列表，最新版本在前
 */
function getVersions() {
  return (import.meta.env.VITE_HISTORICAL_VERSIONS || '0.0.2,0.0.1').split(',').map(v => v.trim())
}

export {
  generateDownloadUrl,
  generatePlatformDownloads,
  getAllDownloads,
  getVersionDownloads,
  getVersions,
  PLATFORM_CONFIG,
  ARCH_DISPLAY_NAMES
}
