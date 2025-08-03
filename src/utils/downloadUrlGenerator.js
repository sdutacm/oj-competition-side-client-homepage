// 下载链接生成工具函数和测试用例
export class DownloadUrlGenerator {
  constructor(version = '0.0.1', cdnBaseUrl = 'https://cdn.sdutacm.cn/oj-competition-side-client') {
    this.version = version;
    this.cdnBaseUrl = cdnBaseUrl;
  }

  // 生成Mac下载链接
  generateMacUrl(architecture = 'x64') {
    const arch = architecture === 'arm64' ? 'arm64' : 'x64';
    return `${this.cdnBaseUrl}/release/v${this.version}/SDUTOJCompetitionSideClient_mac_${arch}_${this.version}.dmg`;
  }

  // 生成Linux下载链接
  generateLinuxUrl(architecture = 'x64') {
    const arch = architecture === 'arm64' ? 'arm64' : 'x86_64';
    return `${this.cdnBaseUrl}/release/v${this.version}/SDUTOJCompetitionSideClient_linux_${arch}_${this.version}.AppImage`;
  }

  // 生成Windows下载链接
  generateWindowsUrl(architecture = 'x64', type = 'installer') {
    const validType = ['installer', 'portable'].includes(type) ? type : 'installer';
    return `${this.cdnBaseUrl}/oj-competition-side-client/release/v${this.version}/SDUTOJCompetitionSideClient_windows_${validType}_${architecture}_${this.version}.exe`;
  }

  // 根据平台和架构自动生成
  generateUrl(platform, architecture = 'x64', windowsType = 'installer') {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes('mac') || platformLower.includes('darwin')) {
      return this.generateMacUrl(architecture);
    } else if (platformLower.includes('linux')) {
      return this.generateLinuxUrl(architecture);
    } else if (platformLower.includes('windows') || platformLower.includes('win')) {
      return this.generateWindowsUrl(architecture, windowsType);
    }
    
    // 默认返回Linux x64
    return this.generateLinuxUrl('x64');
  }

  // 获取所有平台的下载链接
  getAllUrls() {
    return {
      mac: {
        x64: this.generateMacUrl('x64'),
        arm64: this.generateMacUrl('arm64')
      },
      linux: {
        x64: this.generateLinuxUrl('x64'),
        arm64: this.generateLinuxUrl('arm64')
      },
      windows: {
        x64: {
          installer: this.generateWindowsUrl('x64', 'installer'),
          portable: this.generateWindowsUrl('x64', 'portable')
        },
        arm64: {
          installer: this.generateWindowsUrl('arm64', 'installer'),
          portable: this.generateWindowsUrl('arm64', 'portable')
        }
      }
    };
  }
}

// 测试用例
export function testDownloadUrls() {
  const generator = new DownloadUrlGenerator('0.0.1');
  
  console.log('=== 下载链接生成测试 ===');
  
  // 测试Mac链接
  console.log('Mac x64:', generator.generateMacUrl('x64'));
  console.log('Mac arm64:', generator.generateMacUrl('arm64'));
  
  // 测试Linux链接
  console.log('Linux x64:', generator.generateLinuxUrl('x64'));
  console.log('Linux arm64:', generator.generateLinuxUrl('arm64'));
  
  // 测试Windows链接
  console.log('Windows x64 installer:', generator.generateWindowsUrl('x64', 'installer'));
  console.log('Windows x64 portable:', generator.generateWindowsUrl('x64', 'portable'));
  console.log('Windows arm64 installer:', generator.generateWindowsUrl('arm64', 'installer'));
  console.log('Windows arm64 portable:', generator.generateWindowsUrl('arm64', 'portable'));
  
  // 测试自动生成
  console.log('Auto - macOS arm64:', generator.generateUrl('macOS', 'arm64'));
  console.log('Auto - Linux x64:', generator.generateUrl('Linux', 'x64'));
  console.log('Auto - Windows x64:', generator.generateUrl('Windows', 'x64'));
  
  return generator.getAllUrls();
}

// 验证URL格式是否正确
export function validateUrl(url, expectedPattern) {
  const regex = new RegExp(expectedPattern);
  return regex.test(url);
}

// 在浏览器控制台中运行测试
if (typeof window !== 'undefined') {
  window.testDownloadUrls = testDownloadUrls;
  window.DownloadUrlGenerator = DownloadUrlGenerator;
}
