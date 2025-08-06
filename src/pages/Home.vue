<script setup>
import { onMounted, ref, nextTick } from 'vue';
import DownloadButton from "@/components/DownloadButton.vue";
import Release from "@/components/Release.vue";
import Footer from "@/components/Footer.vue";
import { useReleasesStore } from "@/store/useSimpleStore";

// 使用简化的 store
const releasesStore = useReleasesStore();

// 系统检测状态
const isSystemDetecting = ref(false);

// 读取环境变量
const appName = import.meta.env.VITE_APP_NAME || "SDUT OJ 竞赛客户端";

onMounted(async () => {
  // 等待 DOM 完全挂载和渲染
  await nextTick();
  
  console.log('Home 组件已挂载，开始后台系统检测...');
  
  // 系统检测立即开始，但不阻塞渲染
  setTimeout(async () => {
    isSystemDetecting.value = true;
    
    // 如果已经有检测结果，不需要重新检测
    const savedPlatform = localStorage.getItem('detectedPlatform');
    const savedArchitecture = localStorage.getItem('detectedArchitecture');
    
    if (!savedPlatform || !savedArchitecture) {
      console.log('开始系统检测...');
      
      try {
        await releasesStore.detectSystemAdvanced();
        console.log('=== 使用现代 API 检测完成 ===');
      } catch (error) {
        console.log('现代 API 检测失败，使用传统方法:', error);
        releasesStore.detectSystem();
      }
    } else {
      console.log('使用缓存的系统检测结果');
      releasesStore.platform = savedPlatform;
      releasesStore.architecture = savedArchitecture;
    }
    
    isSystemDetecting.value = false;
    
    console.log('最终检测结果:');
    console.log('平台:', releasesStore.platform);
    console.log('架构:', releasesStore.architecture);
    console.log('下载格式:', releasesStore.downloadFormat);
  }, 0); // 立即执行，但在下一个事件循环
});
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="content-mask">
        <div class="content-mask-real"></div>
        <img
          src="../assets/images/light-home.png"
          class="light-home"
          id="light-home"
          alt=""
        />
        <img
          src="../assets/images/dark-home.png"
          class="light-home"
          id="dark-home"
          alt=""
        />
      </div>
      <div class="content-main">
        <img src="../assets/images/favicon.png" class="logo" alt="" />
        <h1>下载 {{ appName }}</h1>
        <div class="btn">
          <DownloadButton 
            :desc="`下载 for ${releasesStore.platform}`" 
            :download-url="releasesStore.downloadUrl"
            :platform="releasesStore.platform"
          />
        </div>
        <aside class="desc">版本 {{ releasesStore.newVersion }} for {{ releasesStore.downloadFormat }}</aside>
      </div>
    </div>
    <div class="release-container">
      <div class="release-container-title">功能概览 ✨</div>
      <div class="release-container-desc">
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon">
            <img src="../assets/images/function/oses.avif" alt="" />
          </div>
          <div class="release-container-desc-box-info">
            <p>跨平台桌面应用支持</p>
            <small
              >借助 Electron 实现 Windows、macOS 与 Linux
              的一体化部署与无缝运行</small
            >
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon">
            <img src="../assets/images/function/ui.png" id="dark-home" alt="" />
            <img
              src="../assets/images/function/ui-light.png"
              id="light-home"
              alt=""
            />
          </div>
          <div class="release-container-desc-box-info">
            <p>统一现代化 UI 体验</p>
            <small>采用现代设计风格，带来简洁一致且响应灵敏的用户界面。</small>
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon">
            <img src="../assets/images/function/whiteroute-light.png" id="light-home" alt="" />
            <img src="../assets/images/function/whiteroute-dark.png" id="dark-home" alt="" />
          </div>
          <div class="release-container-desc-box-info">
            <p>可配置白名单机制</p>
            <small>灵活配置访问白名单，全面控制外部链接与资源加载权限。</small>
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon">
            <img src="../assets/images/function/navigate-light.png" id="light-home" alt="" />
            <img src="../assets/images/function/navigate.png" id="dark-home" alt="">
          </div>
          <div class="release-container-desc-box-info">
            <p>强大且易用的导航系统</p>
            <small
              >支持多层级导航、历史记录与高亮状态，助力用户高效操作。</small
            >
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon">
            <img id="light-home" src="../assets/images/function/safe-light.png" alt="" />
            <img id="dark-home" src="../assets/images/function/safe-dark.png" alt="" />
          </div>
          <div class="release-container-desc-box-info">
            <p>隐私与数据安全保障</p>
            <small>内建隐私保护逻辑，有效防止敏感数据泄露与非法访问。</small>
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon">
            <img src="../assets/images/function/develop-light.png" id="light-home" alt="" />
            <img src="../assets/images/function/develop-dark.png" id="dark-home" alt="" />
          </div>
          <div class="release-container-desc-box-info">
            <p>开发者友好与快速集成</p>
            <small>模块化架构与清晰文档，助力快速上手与定制化开发。</small>
          </div>
        </div>
      </div>
      <header>所有版本 📦</header>
      <Release />
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0rem;
  background-color: var(--bg-primary-color);

  & .content {
    width: 100%;
    aspect-ratio: 3/1;
    @media screen and (max-width: 1024px) {
      aspect-ratio: 3/2;
    }
    
    @media screen and (max-width: 640px) {
      aspect-ratio: 4/3; // 更小屏幕使用更高的比例
    }
    
    @media screen and (max-width: 480px) {
      aspect-ratio: 1/1; // 极小屏幕使用正方形比例
    }

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;

    &-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: var(--bg-secondary-color);
      &-real {
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--mask-color);
        z-index: 2;
        backdrop-filter: blur(1px);
      }
      & .light-home {
        position: absolute;
        width: 80%;
        z-index: 1;
        transform: translateY(40%);

        @media screen and (max-width: 1000px) {
          width: 90%;
        }

        @media screen and (max-width: 640px) {
          width: 95%;
        }

        @media screen and (max-width: 480px) {
          width: 100%;
        }
      }
    }

    &-main {
      width: 50%;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      z-index: 4;
      
      @media screen and (max-width: 1000px) {
        width: 80%;
        height: 85%;
        gap: 0.8rem;
      }
      
      @media screen and (max-width: 640px) {
        width: 90%;
        height: 80%;
        gap: 0.6rem;
      }
      
      @media screen and (max-width: 480px) {
        width: 95%;
        height: 75%;
        gap: 0.5rem;
      }

      & .logo {
        display: block;
        width: 15%;
        
        @media screen and (max-width: 1000px) {
          width: 20%;
        }
        
        @media screen and (max-width: 640px) {
          width: 25%;
        }
        
        @media screen and (max-width: 480px) {
          width: 30%;
        }
      }

      & h1 {
        font-size: 3rem;
        color: var(--text-color);
        font-weight: 800;
        text-align: center;

        @media screen and (max-width: 1024px) {
          // font-size: 2.5rem;
          white-space: nowrap;
        }
        
        @media screen and (max-width: 640px) {
          font-size: var(--text-medium-size);
        }
        
        @media screen and (max-width: 480px) {
          font-size: calc(var(--text-large-size) * 0.9);
        }
      }

      & .btn {
        width: auto; // 改为自适应宽度
        height: auto; // 改为自适应高度
        min-width: fit-content; // 确保至少适应内容
        position: relative;
        display: flex; // 添加flex布局
        justify-content: center; // 居中对齐
        &-info {
          position: absolute;
          width: 70%;
          height: 70%;
          transform: translate(-30%, -100%) rotate(-5deg);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--text-nav-color);
        }
      }

      & .desc {
        width: 100%;
        height: 2rem;
        font-size: var(--text-small-size);
        color: var(--text-nav-color);
        text-align: center;
        
        @media screen and (max-width: 640px) {
          font-size: calc(var(--text-small-size) * 0.9);
          height: auto;
          padding: 0.5rem;
        }
        
        @media screen and (max-width: 480px) {
          font-size: calc(var(--text-small-size) * 0.8);
          padding: 0.3rem;
        }
      }
    }
  }
}

.release-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: var(--bg-primary-color);
  &-title {
    width: 60%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-large-size);
    font-weight: 700;
    margin-top: 1rem;
    color: var(--text-color);
    
    // 移动端适配
    @media screen and (max-width: 1000px) {
      width: 90%;
      height: 3rem;
      font-size: var(--text-large-size);
      margin-top: 2rem;
    }
    
    // 平板适配
    @media screen and (min-width: 1001px) and (max-width: 1024px) {
      width: 80%;
      font-size: var(--text-large-size);
    }
  }
  &-desc {
    width: 60%;
    aspect-ratio: 5/2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
    margin-top: 2rem;
    
    // 移动端适配
    @media screen and (max-width: 1000px) {
      width: 90%;
      aspect-ratio: auto;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(6, auto);
      grid-column-gap: 0;
      grid-row-gap: 1.5rem;
      margin-top: 1.5rem;
    }
    
    // 平板适配
    @media screen and (min-width: 1001px) and (max-width: 1024px) {
      width: 80%;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-column-gap: 1.5rem;
      grid-row-gap: 1.5rem;
    }
    &-box {
      border-radius: 20px;
      overflow: hidden;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.02) 50%,
        rgba(255, 255, 255, 0.08) 100%
      );
      backdrop-filter: blur(20px) saturate(150%);
      -webkit-backdrop-filter: blur(20px) saturate(150%);
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        0 2px 8px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        inset 0 -1px 0 rgba(255, 255, 255, 0.1);
      user-select: none;
      cursor: pointer;
      position: relative;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      
      // 移动端适配
      @media screen and (max-width: 1000px) {
        flex-direction: row;
        height: 120px;
        padding: 1rem;
        border-radius: 15px;
        
        // 移动端悬停效果调整
        &:hover {
          transform: translateY(-2px);
        }
      }
      
      // 平板适配
      @media screen and (min-width: 1001px) and (max-width: 1024px) {
        border-radius: 18px;
        
        &:hover {
          transform: translateY(-3px);
        }
      }
      
      // 边缘散射效果
      &::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 25%,
          rgba(255, 255, 255, 0.08) 50%,
          rgba(255, 255, 255, 0.03) 75%,
          rgba(255, 255, 255, 0.1) 100%
        );
        border-radius: 22px;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
        filter: blur(4px);
      }
      
      // 顶部高光
      &::after {
        content: '';
        position: absolute;
        top: 0;
        height: 40%;
        width: 100%;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(255, 255, 255, 0.1) 30%,
          transparent 100%
        );
        border-radius: 20px 20px 0 0;
        pointer-events: none;
        z-index: 1;
      }
      &:hover {
        transform: translateY(-4px);
        box-shadow: 
          0 16px 48px rgba(0, 0, 0, 0.15),
          0 8px 16px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.4),
          inset 0 -1px 0 rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        
        // 激活边缘散射
        &::before {
          opacity: 1;
        }
        
        .release-container-desc-box-icon {
          // 激活液态玻璃效果
          &::before {
            opacity: 1;
          }
          
          // 激活高光散射
          &::after {
            opacity: 0.8;
          }
          
          & img {
            transform: scale(1.03);
            filter: brightness(1.08) contrast(1.05) saturate(1.15);
          }
        }
      }

      &-icon {
        width: 100%;
        height: 60%;
        overflow: hidden;
        position: relative;
        
        // 移动端适配
        @media screen and (max-width: 1000px) {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          border-radius: 12px;
        }
        
        // 平板适配
        @media screen and (min-width: 1001px) and (max-width: 1024px) {
          border-radius: 12px;
        }
        
        // 主要液态玻璃层
        &::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.05) 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.05) 75%,
            rgba(255, 255, 255, 0.15) 100%
          );
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
          filter: blur(1px);
        }
        
        // 高光散射效果
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.08) 40%,
            rgba(255, 255, 255, 0.02) 70%,
            transparent 100%
          );
          border-radius: 15px 15px 0 0;
          z-index: 3;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
          pointer-events: none;
        }
        
        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
          position: relative;
          z-index: 1;
          
          // 移动端适配
          @media screen and (max-width: 1000px) {
            border-radius: 12px;
          }
        }
      }

      &-info {
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;
        padding: 0.5rem;
        
        // 移动端适配
        @media screen and (max-width: 1000px) {
          width: calc(100% - 80px);
          height: auto;
          padding: 0 0 0 1rem;
          justify-content: center;
        }
        
        // 平板适配
        @media screen and (min-width: 1001px) and (max-width: 1024px) {
          padding: 0.8rem;
        }
        
        & p {
          width: 100%;
          height: 30%;
          font-size: var(--text-medium-size);
          color: var(--text-color);
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          
          // 移动端适配
          @media screen and (max-width: 1000px) {
            height: auto;
            font-size: var(--text-medium-size);
            justify-content: flex-start;
            align-items: flex-start;
            margin-bottom: 0.3rem;
            line-height: 1.2;
          }
          
          // 平板适配
          @media screen and (min-width: 1001px) and (max-width: 1024px) {
            font-size: var(--text-medium-size);
          }
        }
        & small {
          width: 100%;
          height: 70%;
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: var(--text-small-size);
          color: var(--text-secondary-color);
          line-height: 1.4;
          text-align: center;
          display: flex;
          align-items: center;
          
          // 移动端适配
          @media screen and (max-width: 1000px) {
            height: auto;
            padding: 0;
            font-size: var(--text-small-size);
            text-align: left;
            align-items: flex-start;
            line-height: 1.3;
          }
          
          // 平板适配
          @media screen and (min-width: 1001px) and (max-width: 1024px) {
            padding: 0.5rem;
            font-size: var(--text-small-size);
          }
        }
      }
      &:nth-child(1) {
        grid-area: 1 / 1 / 2 / 2;
        
        @media screen and (max-width: 1000px) {
          grid-area: 1 / 1 / 2 / 2;
        }
        
        @media screen and (min-width: 1001px) and (max-width: 1024px) {
          grid-area: 1 / 1 / 2 / 2;
        }
      }
      &:nth-child(2) {
        grid-area: 1 / 2 / 2 / 3;
        
        @media screen and (max-width: 1000px) {
          grid-area: 2 / 1 / 3 / 2;
        }
        
        @media screen and (min-width: 1001px) and (max-width: 1024px) {
          grid-area: 1 / 2 / 2 / 3;
        }
      }
      &:nth-child(3) {
        grid-area: 1 / 3 / 2 / 4;
        
        @media screen and (max-width: 1000px) {
          grid-area: 3 / 1 / 4 / 2;
        }
        
        @media screen and (min-width: 1001px) and (max-width: 1024px) {
          grid-area: 2 / 1 / 3 / 2;
        }
      }
      &:nth-child(4) {
        grid-area: 2 / 1 / 3 / 2;
        
        @media screen and (max-width: 1000px) {
          grid-area: 4 / 1 / 5 / 2;
        }
        
        @media screen and (min-width: 1001px) and (max-width: 1024px) {
          grid-area: 2 / 2 / 3 / 3;
        }
      }
      &:nth-child(5) {
        grid-area: 2 / 2 / 3 / 3;
        
        @media screen and (max-width: 1000px) {
          grid-area: 5 / 1 / 6 / 2;
        }
        
        @media screen and (min-width: 1001px) and (max-width: 1024px) {
          grid-area: 3 / 1 / 4 / 2;
        }
      }
      &:nth-child(6) {
        grid-area: 2 / 3 / 3 / 4;
        
        @media screen and (max-width: 1000px) {
          grid-area: 6 / 1 / 7 / 2;
        }
        
        @media screen and (min-width: 1001px) and (max-width: 1024px) {
          grid-area: 3 / 2 / 4 / 3;
        }
      }
    }
    // height;
  }

  & header {
    width: 60%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-large-size);
    font-weight: bold;
    color: var(--text-color);
    margin-top: 3rem;
    
    // 移动端适配
    @media screen and (max-width: 1000px) {
      width: 90%;
      font-size: var(--text-large-size);
      margin-top: 2rem;
    }
    
    // 平板适配
    @media screen and (min-width: 1001px) and (max-width: 1024px) {
      width: 80%;
      font-size: var(--text-large-size);
      margin-top: 2.5rem;
    }
  }
}
</style>
