#!/usr/bin/env node

/**
 * 构建分析脚本
 * 用于分析打包后的文件大小和组成
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function analyzeBundle() {
  const distPath = path.join(process.cwd(), 'dist')
  
  if (!fs.existsSync(distPath)) {
    console.log('❌ 构建目录不存在，请先运行 npm run build')
    return
  }
  
  console.log('📊 正在分析构建结果...\n')
  
  const results = {
    totalSize: 0,
    files: [],
    largeFiles: [],
    chunks: {}
  }
  
  function scanDirectory(dir, prefix = '') {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        scanDirectory(filePath, prefix + file + '/')
      } else {
        const fileSize = stat.size
        const relativeePath = prefix + file
        
        results.totalSize += fileSize
        results.files.push({
          path: relativeePath,
          size: fileSize,
          sizeKB: Math.round(fileSize / 1024),
          sizeMB: Math.round(fileSize / 1024 / 1024 * 100) / 100
        })
        
        // 标记大文件 (> 1MB)
        if (fileSize > 1024 * 1024) {
          results.largeFiles.push({
            path: relativeePath,
            size: fileSize,
            sizeMB: Math.round(fileSize / 1024 / 1024 * 100) / 100
          })
        }
        
        // 分析 chunk 类型
        if (file.includes('base64-data')) {
          results.chunks.base64 = (results.chunks.base64 || 0) + fileSize
        } else if (file.includes('vendor')) {
          results.chunks.vendor = (results.chunks.vendor || 0) + fileSize
        } else if (file.includes('components')) {
          results.chunks.components = (results.chunks.components || 0) + fileSize
        }
      }
    })
  }
  
  scanDirectory(distPath)
  
  // 输出分析结果
  console.log(`📦 总文件大小: ${Math.round(results.totalSize / 1024 / 1024 * 100) / 100} MB`)
  console.log(`📄 文件总数: ${results.files.length}`)
  console.log('')
  
  if (results.largeFiles.length > 0) {
    console.log('🚨 大文件 (> 1MB):')
    results.largeFiles
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .forEach(file => {
        console.log(`   ${file.path}: ${file.sizeMB} MB`)
      })
    console.log('')
  }
  
  console.log('📊 Chunk 分布:')
  Object.entries(results.chunks)
    .sort(([,a], [,b]) => b - a)
    .forEach(([type, size]) => {
      const sizeMB = Math.round(size / 1024 / 1024 * 100) / 100
      console.log(`   ${type}: ${sizeMB} MB`)
    })
  
  console.log('')
  console.log('💡 优化建议:')
  
  if (results.chunks.base64 && results.chunks.base64 > 5 * 1024 * 1024) {
    console.log('   • Base64 数据文件过大，考虑:')
    console.log('     - 使用图片 CDN 服务替代 base64')
    console.log('     - 实现图片懒加载')
    console.log('     - 压缩图片质量')
  }
  
  if (results.largeFiles.length > 3) {
    console.log('   • 存在多个大文件，考虑:')
    console.log('     - 启用更激进的代码分割')
    console.log('     - 使用动态导入 (dynamic import)')
  }
  
  console.log('   • 运行 `npm run build:analyze` 查看详细的打包分析')
  console.log('')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeBundle()
}

export default analyzeBundle
