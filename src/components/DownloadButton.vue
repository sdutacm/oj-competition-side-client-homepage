<template>
  <button 
    ref="buttonRef"
    type="button" 
    class="dl-btn"
    :class="{ error: hasError }"
    @click="handleDownload" 
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :disabled="isDownloading || !hasValidDownloadUrl"
    :style="{
      '--mouse-x': mouseX + '%',
      '--mouse-y': mouseY + '%'
    }"
  >
    <!-- Windows SVG -->
    <svg
      class="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      v-if="currentPlatform === 'Windows' || currentPlatform === 'Windows 10'"
    >
      <path
        d="M426.285714 574.857143v372l-389.714285-53.714286v-318.285714h389.714285z m0-424.571429v376.571429H36.571429V204z m561.142857 424.571429v449.142857l-518.285714-71.428571v-377.714286h518.285714z m0-501.714286v453.714286H469.142857V144.571429z"
        p-id="9408"
      ></path>
    </svg>

    <!-- Linux SVG -->
    <svg
      class="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      v-else-if="currentPlatform === 'Linux'"
    >
      <path
        d="M896 837.12c0 20.48-24.746667 37.546667-82.986667 55.68-46.72 14.72-74.88 78.506667-133.546666 70.186667-45.866667-6.4-44.373333-33.28-72.96-43.733334-26.453333-9.6-157.44-12.16-192 21.76-43.093333 42.666667-134.826667 0.426667-166.613334-7.68-42.88-11.093333-108.8-19.2-117.546666-39.68-9.173333-21.333333 7.68-33.493333 14.293333-61.44 3.626667-15.573333-19.2-50.56-11.306667-68.053333 11.093333-24.32 48.853333-7.893333 67.2-18.346667 17.28-6.4 27.733333-24.106667 25.386667-42.24 7.893333 25.813333 3.626667 41.6-16 52.906667-24.32 13.866667-56.533333-1.706667-62.72 12.8-7.04 16.426667 17.706667 42.453333 12.8 67.2-5.76 29.226667-20.053333 36.053333-13.226667 50.346667 5.333333 11.52 73.813333 20.266667 111.146667 29.013333 30.933333 7.253333 110.506667 44.373333 140.8 3.413333 20.906667-28.586667-13.866667-84.693333-17.066667-90.453333a1027.413333 1027.413333 0 0 0-84.266666-120.746667c-43.306667-45.226667-53.333333-16-60.16-19.2-6.826667-3.2-9.6-43.733333 12.373333-76.586666 16.853333-25.173333 33.28-87.893333 53.973333-126.293334 9.173333-17.066667 81.28-105.813333 81.28-124.16-0.213333-69.76-57.813333-286.72 108.8-292.906666 142.933333-5.333333 157.653333 126.72 157.653334 161.706666-1.92 36.266667 3.2 72.533333 14.933333 106.666667 42.453333 110.293333 92.16 106.453333 131.2 229.12 35.413333 110.933333 10.026667 138.453333-1.706667 138.24-27.733333-0.64-27.733333 58.453333-80 49.28-34.346667-5.973333-34.346667-55.893333-57.173333-48.426667-17.28 5.76-17.706667 45.013333-10.24 69.546667 20.266667 66.133333-30.293333 136.746667 24.106667 160 49.066667 20.906667 78.506667-39.68 125.013333-54.826667 69.12-22.613333 83.84-33.493333 83.626667-46.08-0.213333-16.213333-29.44-17.706667-48-33.28a60.949333 60.949333 0 0 1-23.253334-51.2c0.213333-9.813333 2.773333-19.413333 7.893334-27.946666-0.213333 24.32 8.32 48 24.533333 66.133333 23.68 20.693333 53.76 18.56 53.76 49.28z m-221.226667-189.44c-3.413333-13.866667-2.773333-70.4-7.466666-90.453333-16.426667-68.693333-38.826667-81.92-38.826667-82.346667-11.733333-76.373333-49.706667-90.453333-49.706667-122.666667 0-15.36 6.613333-21.333333 6.613334-41.6 0-12.8-21.12-12.8-35.2-19.413333-9.813333-4.48-19.626667-8.746667-29.653334-13.013333-2.986667-5.973333-4.48-12.586667-4.266666-19.413334 0-2.773333 1.066667-32.64 24.533333-32.64 27.52 0 27.306667 33.066667 27.306667 33.066667 0 11.733333-5.12 13.226667-5.12 20.266667 0 3.84 4.693333 5.973333 8.533333 5.973333 7.466667 0 14.08-8.106667 15.146667-19.626667 2.773333-30.72-8.106667-66.986667-42.453334-69.76-48.213333-4.053333-47.573333 49.706667-44.8 74.24-11.733333-6.613333-25.813333-8.32-38.826666-4.48 0-33.28-6.826667-66.346667-30.506667-64.853333-23.68 1.706667-29.226667 28.8-29.226667 44.16 0 28.586667 11.946667 40.106667 14.72 41.386667 2.986667 1.28 7.466667-1.493333 9.386667-5.12 1.28-2.773333-1.28-4.053333-3.413333-4.053334-3.413333 0-12.373333-10.88-12.373334-23.893333 0-10.24 4.693333-25.386667 20.266667-25.386667 12.373333 0 18.986667 16.853333 19.413333 28.586667 0.213333 4.693333-0.213333 9.386667-1.066666 14.08-8.96 8.96-18.56 17.28-29.013334 24.32-6.613333 3.626667-18.346667 12.16-18.346666 21.333333-0.213333 2.986667 1.493333 5.973333 4.053333 7.253334 10.24 4.48 20.906667 29.013333 47.36 29.013333 36.693333 0 72.533333-10.24 103.68-29.653333 4.266667-6.186667 10.24-8.106667 13.226667-4.266667 4.266667 5.333333-2.346667 12.16-8.533334 13.44-30.933333 13.44-62.72 24.533333-95.36 33.066667-24.96 2.133333-33.706667-7.893333-34.346666-1.706667 10.24 12.8 25.386667 20.48 41.813333 21.12 31.146667-2.133333 59.733333-26.24 80-33.706667 8.106667-2.773333 11.093333-0.426667 11.946667 1.493334 0.853333 1.92 1.706667 7.253333-9.813334 11.52-31.573333 11.733333-73.173333 54.4-92.373333 54.4-27.733333 0-46.293333-53.12-55.253333-51.2-2.133333 0.426667 0 11.52-4.906667 25.386666-4.48 12.16-20.693333 37.973333-26.666667 55.253334-5.333333 13.653333-4.266667 28.8 2.773334 41.6a207.637333 207.637333 0 0 0-55.893334 146.773333c3.413333 46.293333-11.52 38.186667-11.52 38.186667 13.44 26.453333 33.066667 49.066667 57.173334 66.346666 27.946667 22.4 54.186667 46.933333 54.826666 60.8-1.28 8.32-4.693333 16-10.24 22.4 6.186667 9.173333 13.44 17.493333 21.76 24.96 23.253333 18.773333 53.973333 25.6 82.986667 17.92 34.346667-0.64 66.773333-16.426667 88.32-43.306666 8.746667-11.946667 33.706667-31.146667 28.373333-49.066667-7.253333-24.746667-8.106667-91.093333 34.986667-81.493333 0.213333-11.946667 7.04-22.826667 17.706667-28.16 0.213333-0.64-8.106667-2.133333-11.733334-17.066667z"
        p-id="10425"
      ></path>
      <path
        d="M500.693333 262.4c-1.28 0-2.986667-1.493333-4.693333-4.693333a8.064 8.064 0 0 0-7.893333-4.48c8.746667-1.493333 13.653333 0.426667 15.146666 5.12 0.64 1.493333 0 3.2-1.493333 3.626666-0.426667 0.426667-0.64 0.426667-1.066667 0.426667z m-38.826666-9.386667c-3.413333 0-6.4 1.92-7.893334 4.906667-4.266667 7.893333-6.826667 4.053333-6.826666 1.92 0.213333-8.746667 13.013333-6.826667 14.72-6.826667z"
        p-id="10426"
      ></path>
    </svg>

    <!-- macOS SVG -->
    <svg
      class="icon"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      v-else-if="currentPlatform === 'macOS'"
    >
      <path
        d="M928.768 750.592c-1.536 4.096-21.504 74.24-70.656 145.92-43.008 62.464-87.04 124.928-156.672 125.952-68.608 1.024-90.624-40.96-168.96-40.96s-102.912 39.936-167.936 41.984c-67.072 2.56-118.784-68.096-161.792-130.048C115.2 767.488 47.616 534.528 138.24 378.88c44.544-77.824 124.928-127.488 211.968-129.024 65.536-1.024 128.512 44.544 168.448 44.544 40.96 0 116.736-55.296 196.608-47.104 33.28 1.536 126.976 13.824 186.88 101.376-4.608 3.072-111.616 66.56-110.592 195.072 1.024 155.136 135.68 206.336 137.216 206.848m-266.24-586.24c35.84-44.032 59.904-104.448 53.248-164.352-51.2 2.048-114.176 34.304-151.04 77.824-32.768 37.888-61.952 99.328-53.76 158.72 56.832 3.072 115.712-30.208 151.552-72.192"
        p-id="11429"
      ></path>
    </svg>

    <!-- 默认下载图标 -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon"
      v-else
    >
      <path d="M12 17V3" />
      <path d="m6 11 6 6 6-6" />
      <path d="M19 21H5" />
    </svg>

    <span v-if="!isDownloading && !hasError">{{ buttonText }}</span>
    <span v-else-if="hasError" style="color: white;">{{ downloadProgress }}</span>
    <span v-else>{{ downloadProgress }}</span>
  </button>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useReleasesStore } from '@/store/useSimpleStore'

const props = defineProps({
  downloadUrl: {
    type: String,
    default: null, // 改为 null，避免默认 URL 导致问题
  },
  desc: {
    type: String,
    default: "下载",
  },
  platform: {
    type: String,
    default: "",
  },
});

// 使用 store 获取系统信息
const releasesStore = useReleasesStore()

// 下载状态
const isDownloading = ref(false)
const downloadProgress = ref('准备下载...')
const hasError = ref(false)

// 鼠标高光效果
const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)
const buttonRef = ref(null)

// 获取当前平台
const currentPlatform = computed(() => {
  return props.platform || releasesStore.platform || 'Unknown'
})

// 检查是否有有效的下载URL
const hasValidDownloadUrl = computed(() => {
  return props.downloadUrl && 
         props.downloadUrl.trim() !== '' && 
         props.downloadUrl !== 'https://oj.sdutacm.cn/onlinejudge3/' &&
         props.downloadUrl.startsWith('http')
})

// 按钮文字
const buttonText = computed(() => {
  // 如果明确传入了"下载"，就只显示"下载"
  if (props.desc === "下载") {
    return "下载"
  }
  
  // 如果传入了其他自定义描述，使用自定义描述
  if (props.desc && props.desc !== "下载") {
    return props.desc
  }
  
  // 否则使用智能生成的文字（当没有传入desc或desc为默认值时）
  const platform = currentPlatform.value
  const arch = releasesStore.architecture || 'x64'
  
  if (platform === 'macOS') {
    return `下载 macOS ${arch === 'arm64' ? 'Apple Silicon' : 'Intel'}`
  } else if (platform === 'Windows' || platform === 'Windows 10') {
    return `下载 Windows ${arch}`
  } else if (platform === 'Linux') {
    return `下载 Linux ${arch}`
  }
  
  return '下载'
})

// 鼠标移动处理
function handleMouseMove(event) {
  if (!buttonRef.value) return
  
  const rect = buttonRef.value.getBoundingClientRect()
  mouseX.value = ((event.clientX - rect.left) / rect.width) * 100
  mouseY.value = ((event.clientY - rect.top) / rect.height) * 100
}

function handleMouseEnter() {
  isHovering.value = true
}

function handleMouseLeave() {
  isHovering.value = false
}

// 直接下载函数
async function handleDownload(event) {
  // 基本的事件阻止
  event.preventDefault()
  
  console.log('=== 下载按钮点击事件 ===')
  console.log('下载 URL:', props.downloadUrl)
  
  // 使用计算属性进行检查
  if (!hasValidDownloadUrl.value || isDownloading.value) {
    console.log('没有有效的下载URL或正在下载中')
    return
  }

  try {
    isDownloading.value = true
    hasError.value = false
    downloadProgress.value = '检查文件...'

    // 先检查文件是否存在
    try {
      const response = await fetch(props.downloadUrl, { method: 'HEAD' })
      console.log('文件检查结果:', response.status)
      
      if (!response.ok) {
        throw new Error(`文件不存在 (${response.status})`)
      }
    } catch (fetchError) {
      console.error('文件检查失败:', fetchError)
      hasError.value = true
      downloadProgress.value = '下载失败'
      
      setTimeout(() => {
        isDownloading.value = false
        hasError.value = false
        downloadProgress.value = '准备下载...'
      }, 3000)
      return
    }

    downloadProgress.value = '开始下载...'

    // 获取文件名
    const url = new URL(props.downloadUrl)
    const fileName = url.pathname.split('/').pop() || 'download'
    
    console.log('开始下载:', fileName)

    // 创建下载链接
    const link = document.createElement('a')
    link.href = props.downloadUrl
    link.download = fileName
    link.style.display = 'none'
    
    // 添加到 DOM，触发下载，然后清理
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    downloadProgress.value = '下载已开始'
    console.log('下载触发完成')
    
    // 重置状态
    setTimeout(() => {
      isDownloading.value = false
      downloadProgress.value = '准备下载...'
    }, 2000)

  } catch (error) {
    console.error('下载失败:', error)
    hasError.value = true
    downloadProgress.value = '下载失败'
    
    setTimeout(() => {
      isDownloading.value = false
      hasError.value = false
      downloadProgress.value = '准备下载...'
    }, 3000)
  }
}

onMounted(() => {
  // 确保系统信息已检测 - 如果没有保存的检测结果，就重新检测
  const savedPlatform = localStorage.getItem('detectedPlatform')
  if (!savedPlatform || !releasesStore.platform) {
    releasesStore.detectSystem()
  }
})
</script>

<style scoped lang="less">
.dl-btn {
  appearance: none;
  border: none;
  width: 95%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  cursor: pointer;
  border-radius: var(--border-medium-radius);
  background-color: var(--text-color);
  user-select: none;
  transition: background-color 0.5s ease, box-shadow 0.5s ease, opacity 0.3s ease;
  position: relative;
  overflow: hidden;
  
  // 鼠标跟随高光效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle 120px at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 40%,
      rgba(255, 255, 255, 0.02) 70%,
      transparent 100%
    );
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    border-radius: var(--border-medium-radius);
    z-index: 1;
  }
  
  &:hover:not(:disabled) {
    background-color: var(--text-secondary-color);
    box-shadow: var(--box-shadow);
    
    &::before {
      opacity: 1;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background-color: var(--text-secondary-color);
  }

  &.error {
    background-color: #ff6b6b !important;
    transition: none !important;
    
    &:hover {
      background-color: #ff5252 !important;
    }
  }

  & .icon {
    fill: var(--bg-secondary-color);
    stroke: var(--bg-secondary-color);
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
  }

  &:hover:not(:disabled) .icon {
    transform: translateY(2px);
  }

  & span {
    color: var(--bg-secondary-color);
    font-size: var(--text-medium-size);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    position: relative;
    z-index: 2;
  }
}
</style>
