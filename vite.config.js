import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 是否为生产环境
  const isProduction = mode === 'production'
  
  const plugins = [
    vue({
      // Vue 插件配置
      script: {
        defineModel: true,
        propsDestructure: true
      }
    })
  ]
  
  // 生产环境添加压缩插件
  if (isProduction) {
    plugins.push(
      // Gzip 压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      // Brotli 压缩
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'brotliCompress',
        ext: '.br',
      })
    )
  }
  
  // 在分析模式下添加打包分析插件
  if (mode === 'analyze') {
    plugins.push(
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap' // 'treemap' | 'sunburst' | 'network'
      })
    )
  }

  return {
    plugins,
    base: '/oj-competition-side-client/homepage/',
    experimental: {
      renderBuiltUrl(filename) {
        let cdnUrl = process.env.CDN_URL || '/oj-competition-side-client/homepage/';
        if (!cdnUrl.endsWith('/')) {
          cdnUrl += '/';
        }
        return `${cdnUrl}${filename}`;
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // 确保 vue 正确解析到打包好的文件
        'vue': 'vue/dist/vue.esm-bundler.js',
        // 添加更多别名确保正确解析
        'vue/dist/vue.esm-bundler.js': 'vue/dist/vue.esm-bundler.js'
      },
    },
    server: {
      host: '0.0.0.0', // 允许外部访问
      port: 5173,      // 指定端口
      open: false,     // 不自动打开浏览器
      cors: true,      // 允许跨域
      hmr: {
        overlay: true  // 显示错误覆盖层
      }
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
      open: false,
      cors: true,
      // 确保预览时也使用正确的 base 路径
      base: '/oj-competition-side-client/'
    },
    build: {
      // 输出目录
      outDir: 'dist',
      // 静态资源目录
      assetsDir: 'assets',
      // 生成 sourcemap
      sourcemap: mode === 'development',
      // 消除打包大小限制 - 针对包含大量 base64 数据的项目
      chunkSizeWarningLimit: 10000, // 提高到 10MB，因为 base64 数据会很大
      // 启用/禁用 minification，或指定使用哪种 minification
      minify: mode === 'development' ? false : 'terser',
      // terser 配置
      terserOptions: {
        compress: {
          // 生产环境移除 console
          drop_console: isProduction,
          drop_debugger: isProduction,
          // 移除无用代码
          pure_funcs: isProduction ? ['console.log', 'console.info', 'console.debug'] : [],
        },
      },
      // ESBuild 配置
      target: 'es2020',
      // 确保没有外部依赖
      rollupOptions: {
        // 设置更高的警告阈值，因为有大的 base64 数据文件
        onwarn(warning, warn) {
          // 忽略大文件警告，特别是包含 base64 数据的文件
          if (warning.code === 'BUNDLE_IS_LARGER_THAN_RECOMMENDED') {
            return
          }
          warn(warning)
        },
        // 确保依赖的正确加载顺序 - 不使用外部依赖
        external: [],
        output: {
          // 确保模块间的依赖顺序
          inlineDynamicImports: false,
          // 强制生成 ES 模块格式
          format: 'es',
          // 确保所有依赖都被打包，不留下裸模块名
          paths: {},
          // 静态资源分类打包
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            let extType = info[info.length - 1];
            // 字体文件
            if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name)) {
              extType = 'fonts';
            }
            // 图片文件
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
              extType = 'images';
            }
            // 视频文件
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
              extType = 'media';
            }
            // CSS 文件
            if (/\.css$/.test(assetInfo.name)) {
              extType = 'css';
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          // 分包策略 - 使用混合形式确保正确的加载顺序
          manualChunks(id) {
            // 核心库使用对象形式确保顺序
            if (id.includes('node_modules/vue/') && !id.includes('vue-router')) {
              return 'vue-core'
            }
            if (id.includes('node_modules/vue-router/') || id.includes('node_modules/pinia/')) {
              return 'vue-ecosystem'
            }
            if (id.includes('node_modules/element-plus/')) {
              return 'element-plus'
            }
            if (id.includes('node_modules/gsap/')) {
              return 'gsap'
            }
            
            // 处理其他第三方库
            if (id.includes('node_modules/')) {
              return 'vendor'
            }
            
            // 包含大量 base64 数据的文件单独分包
            if (id.includes('imgDataUrl') || id.includes('base64')) {
              return 'base64-data'
            }
            
            // 组件分包
            if (id.includes('/src/components/')) {
              if (id.includes('/src/components/about/')) {
                return 'about-components'
              }
              return 'components'
            }
            
            // 页面分包
            if (id.includes('/src/pages/')) {
              return 'pages'
            }
            
            // 工具函数分包 - 但排除大数据文件
            if (id.includes('/src/utils/') && !id.includes('imgDataUrl') && !id.includes('base64')) {
              return 'utils'
            }
          },
        },
      },
            // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 资源加载优化
      assetsInlineLimit: 4096,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: true,
      // 启用/禁用 brotli 压缩大小报告
      brotliSize: false,
    },
    // CSS 配置
    css: {
      // 开启 CSS sourcemap
      devSourcemap: mode === 'development',
      // CSS 预处理器配置
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
          // 全局变量文件
          additionalData: `@import "@/assets/css/default.less";`,
        },
      },
    },
    // 定义全局常量替换
    define: {
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: mode === 'development',
      // 注入环境变量
      'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production'),
    },
    // 优化依赖预构建
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'element-plus',
        'gsap',
        'gsap/ScrollTrigger',
      ],
      exclude: [
        // 排除不需要预构建的依赖
      ],
      // 强制预构建某些依赖
      force: mode === 'development',
      // 确保依赖的正确预构建
      esbuildOptions: {
        target: 'es2020'
      }
    },
  }
})
