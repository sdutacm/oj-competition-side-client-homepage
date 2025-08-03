// 简化版本的 store，避免复杂依赖
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useReleasesStore = defineStore('releases', () => {
  const newVersion = ref(import.meta.env.VITE_APP_VERSION || '1.2.0')
  const platform = ref('Linux')
  const architecture = ref('x64')
  const cdnBaseUrl = ref(import.meta.env.VITE_CDN_BASE_URL || 'https://cdn.sdutacm.cn/oj-competition-side-client')
  
  // 计算属性：完整的平台信息
  const platformInfo = computed(() => {
    return `${platform.value} (${architecture.value})`
  })
  
  // 计算属性：推荐的下载格式
  const downloadFormat = computed(() => {
    const platformLower = platform.value.toLowerCase()
    const arch = architecture.value
    
    if (platformLower.includes('windows')) {
      return `.exe (${arch})`
    } else if (platformLower.includes('macos')) {
      return `.dmg (${arch})`
    } else {
      return `.AppImage (${arch})`
    }
  })

  // 计算属性：生成下载链接
  const downloadUrl = computed(() => {
    const version = newVersion.value
    const platformLower = platform.value.toLowerCase()
    const arch = architecture.value
    
    // 基础URL模式
    const baseUrl = `${cdnBaseUrl.value}/release/v${version}`
    
    if (platformLower.includes('macos')) {
      // Mac系统: SDUTOJCompetitionSideClient_mac_x64_0.0.1.dmg
      const macArch = arch === 'arm64' ? 'arm64' : 'x64'
      return `${baseUrl}/SDUTOJCompetitionSideClient_mac_${macArch}_${version}.dmg`
    } 
    else if (platformLower.includes('linux')) {
      // Linux系统: SDUTOJCompetitionSideClient_linux_x86_64_0.0.1.AppImage
      const linuxArch = arch === 'arm64' ? 'arm64' : 'x86_64'
      return `${baseUrl}/SDUTOJCompetitionSideClient_linux_${linuxArch}_${version}.AppImage`
    } 
    else if (platformLower.includes('windows')) {
      // Windows系统: 注意路径中有额外的 oj-competition-side-client
      const windowsType = 'installer' // 默认使用installer版本，也可以是portable
      const baseUrlWindows = `${cdnBaseUrl.value}/oj-competition-side-client/release/v${version}`
      return `${baseUrlWindows}/SDUTOJCompetitionSideClient_windows_${windowsType}_${arch}_${version}.exe`
    }
    
    // 默认返回Linux版本
    return `${baseUrl}/SDUTOJCompetitionSideClient_linux_x86_64_${version}.AppImage`
  })

  // 计算属性：获取所有平台的下载链接
  const allDownloadUrls = computed(() => {
    const version = newVersion.value
    const baseUrl = `${cdnBaseUrl.value}/release/v${version}`
    const baseUrlWindows = `${cdnBaseUrl.value}/oj-competition-side-client/release/v${version}`
    
    return {
      mac: {
        x64: `${baseUrl}/SDUTOJCompetitionSideClient_mac_x64_${version}.dmg`,
        arm64: `${baseUrl}/SDUTOJCompetitionSideClient_mac_arm64_${version}.dmg`
      },
      linux: {
        x64: `${baseUrl}/SDUTOJCompetitionSideClient_linux_x86_64_${version}.AppImage`,
        arm64: `${baseUrl}/SDUTOJCompetitionSideClient_linux_arm64_${version}.AppImage`
      },
      windows: {
        x64: {
          installer: `${baseUrlWindows}/SDUTOJCompetitionSideClient_windows_installer_x64_${version}.exe`,
          portable: `${baseUrlWindows}/SDUTOJCompetitionSideClient_windows_portable_x64_${version}.exe`
        },
        arm64: {
          installer: `${baseUrlWindows}/SDUTOJCompetitionSideClient_windows_installer_arm64_${version}.exe`,
          portable: `${baseUrlWindows}/SDUTOJCompetitionSideClient_windows_portable_arm64_${version}.exe`
        }
      }
    }
  })
  
  // 使用现代 API 进行更精确的检测
  async function detectSystemAdvanced() {
    const userAgent = navigator.userAgent
    
    // 检测操作系统
    if (/Windows NT 10\.0/.test(userAgent)) {
      platform.value = 'Windows 10'
    } else if (/Windows/.test(userAgent)) {
      platform.value = 'Windows'
    } else if (/Macintosh/.test(userAgent)) {
      platform.value = 'macOS'
    } else if (/Linux/.test(userAgent)) {
      platform.value = 'Linux'
    }
    
    // 尝试使用现代 API 获取架构信息
    let detectedArch = null
    
    try {
      // 尝试使用 navigator.userAgentData (Chrome 90+)
      if ('userAgentData' in navigator && navigator.userAgentData.getHighEntropyValues) {
        const uaData = await navigator.userAgentData.getHighEntropyValues(['architecture', 'platform'])
        if (uaData.architecture) {
          console.log('Modern API detected architecture:', uaData.architecture)
          switch (uaData.architecture.toLowerCase()) {
            case 'arm':
            case 'arm64':
              detectedArch = 'arm64'
              break
            case 'x86':
              detectedArch = 'x86'
              break
            case 'x86_64':
            case 'x64':
              detectedArch = 'x64'
              break
          }
        }
      }
    } catch (error) {
      console.log('Modern API not available:', error.message)
    }
    
    // 如果现代 API 检测到了架构，使用它
    if (detectedArch) {
      architecture.value = detectedArch
    } else {
      // 回退到传统检测方法
      if (/Macintosh/.test(userAgent)) {
        // 对于 macOS，检测是否为 Apple Silicon
        if (!/Intel/.test(userAgent)) {
          architecture.value = 'arm64'
        } else {
          architecture.value = 'x64'
        }
      } else if (/ARM|aarch64/.test(userAgent)) {
        architecture.value = 'arm64'
      } else if (/x86_64|Win64|WOW64|x64/.test(userAgent)) {
        architecture.value = 'x64'
      } else if (/i[3-6]86|x86/.test(userAgent)) {
        architecture.value = 'x86'
      } else {
        architecture.value = 'x64'
      }
    }
    
    console.log('Advanced system detection:', {
      platform: platform.value,
      architecture: architecture.value,
      downloadUrl: downloadUrl.value,
      userAgent: userAgent,
      isIntel: /Intel/.test(userAgent),
      isMac: /Macintosh/.test(userAgent),
      detectedByModernAPI: !!detectedArch
    })
  }
  
  function detectSystem() {
    const userAgent = navigator.userAgent
    
    // 检测操作系统
    if (/Windows NT 10\.0/.test(userAgent)) {
      platform.value = 'Windows 10'
    } else if (/Windows/.test(userAgent)) {
      platform.value = 'Windows'
    } else if (/Macintosh/.test(userAgent)) {
      platform.value = 'macOS'
    } else if (/Linux/.test(userAgent)) {
      platform.value = 'Linux'
    }
    
    // 更精确的架构检测
    // 对于 macOS，优先检测 Apple Silicon
    if (/Macintosh/.test(userAgent)) {
      // 检测 Apple Silicon
      if (!/Intel/.test(userAgent)) {
        // 现代 Mac 如果不包含 Intel，很可能是 Apple Silicon
        architecture.value = 'arm64'
      } else {
        // 包含 Intel 的是 Intel Mac
        architecture.value = 'x64'
      }
    } 
    // 其他平台的架构检测
    else if (/ARM|aarch64/.test(userAgent)) {
      architecture.value = 'arm64'
    } else if (/x86_64|Win64|WOW64|x64/.test(userAgent)) {
      architecture.value = 'x64'
    } else if (/i[3-6]86|x86/.test(userAgent)) {
      architecture.value = 'x86'
    } else {
      // 默认设为 x64
      architecture.value = 'x64'
    }
    
    console.log('System detected:', {
      platform: platform.value,
      architecture: architecture.value,
      downloadUrl: downloadUrl.value,
      userAgent: userAgent,
      isIntel: /Intel/.test(userAgent),
      isMac: /Macintosh/.test(userAgent)
    })
  }

  // 手动设置平台和架构（用于测试或用户手动选择）
  function setPlatform(newPlatform, newArch) {
    platform.value = newPlatform
    architecture.value = newArch
  }
  
  return {
    newVersion,
    platform,
    architecture,
    platformInfo,
    downloadFormat,
    downloadUrl,
    allDownloadUrls,
    detectSystem,
    detectSystemAdvanced,
    setPlatform
  }
})
