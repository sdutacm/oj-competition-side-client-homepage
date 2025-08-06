/**
 * 系统检测工具函数
 */

// 检测操作系统
export function detectOS() {
  const userAgent = navigator.userAgent;
  
  if (/Windows NT 10\.0/.test(userAgent)) return "Windows 10";
  if (/Windows NT 6\.3/.test(userAgent)) return "Windows 8.1";
  if (/Windows NT 6\.2/.test(userAgent)) return "Windows 8";
  if (/Windows NT 6\.1/.test(userAgent)) return "Windows 7";
  if (/Macintosh/.test(userAgent)) return "macOS";
  if (/Linux/.test(userAgent)) return "Linux";
  
  return "Unknown";
}

// 检测系统架构
export function detectArchitecture() {
  const userAgent = navigator.userAgent;
  
  // 检测 ARM 架构
  if (/ARM/.test(userAgent) || /aarch64/.test(userAgent)) {
    return 'arm64';
  }
  
  // 检测 Apple Silicon (M1/M2/M3/M4)
  if (/Macintosh/.test(userAgent)) {
    // 检查是否包含 Intel 标识
    if (!/Intel/.test(userAgent)) {
      return 'arm64'; // 很可能是 Apple Silicon
    }
  }
  
  // 检测 x86_64/AMD64
  if (/x86_64|Win64|WOW64|x64/.test(userAgent)) {
    return 'x64';
  }
  
  // 检测 32位 x86
  if (/i[3-6]86|x86/.test(userAgent)) {
    return 'x86';
  }
  
  // 默认为 x64
  return 'x64';
}

// 使用现代 Web API 检测架构 (Chrome 90+)
export async function detectArchitectureModern() {
  try {
    if ('userAgentData' in navigator) {
      const uaData = await navigator.userAgentData.getHighEntropyValues([
        'architecture', 
        'platform',
        'platformVersion'
      ]);
      
      if (uaData.architecture) {
        switch (uaData.architecture.toLowerCase()) {
          case 'arm':
          case 'arm64':
            return 'arm64';
          case 'x86':
            return 'x86';
          case 'x86_64':
          case 'x64':
            return 'x64';
          default:
            return uaData.architecture;
        }
      }
    }
  } catch (error) {
    console.log('userAgentData not available:', error.message);
  }
  
  // 回退到传统方法
  return detectArchitecture();
}

// 获取完整的系统信息
export async function getSystemInfo() {
  const os = detectOS();
  const arch = await detectArchitectureModern();
  
  return {
    os,
    architecture: arch,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    languages: navigator.languages,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine
  };
}

// 获取推荐的下载格式
export function getRecommendedDownloadFormat(os, arch) {
  const osLower = os.toLowerCase();
  
  if (osLower.includes('windows')) {
    return `.exe (${arch})`;
  } else if (osLower.includes('macos')) {
    return `.dmg (${arch})`;
  } else if (osLower.includes('linux')) {
    return `.AppImage (${arch})`;
  }
  
  return `.tar.gz (${arch})`;
}
