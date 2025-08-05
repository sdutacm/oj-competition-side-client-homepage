<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted, nextTick, onBeforeUnmount } from "vue";
import DownloadButton from "../DownloadButton.vue";
import ImgDataUrl from "@/utils/imgDataUrl";

gsap.registerPlugin(ScrollTrigger);

let cleanupFunction = null;

onMounted(async () => {
  await nextTick();
  
  // 预热GPU合成层，减少首次滚动卡顿
  const warmupElements = document.querySelectorAll('.scrollBox, .scrollItem');
  warmupElements.forEach(el => {
    if (el instanceof HTMLElement) {
      // 强制创建合成层
      el.style.transform = 'translateZ(0)';
      el.style.willChange = 'transform';
      // 触发重绘
      el.offsetHeight;
    }
  });
  
  // 增加延迟，确保所有CSS样式都已应用，DOM完全稳定
  setTimeout(() => {
    cleanupFunction = initAnimations();
  }, 300); // 增加延迟时间，让GPU预热完成
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("*"); // 清理所有GSAP动画
  
  // 调用清理函数
  if (cleanupFunction) {
    cleanupFunction();
  }
});

function initAnimations() {
  const triggerEnd = "bottom top"; // 更长的滚动距离
  const triggerStart = "bottom 80%"; // 使用bottom触发，确保用户必须向下滚动才能触发

  // 根据屏幕尺寸计算合适的居中位置
  const getEntrancePosition = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      return "-35%"; // 极小屏幕需要更多左移
    } else if (screenWidth <= 1000) {
      return "-30%"; // 移动端需要更多左移来居中
    } else {
      return "-20%"; // 桌面端原有位置
    }
  };

  // 根据屏幕尺寸计算滚动动画的目标位置
  const getScrollPosition = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 480) {
      return "-55%"; // 极小屏幕
    } else if (screenWidth <= 1000) {
      return "-50%"; // 移动端
    } else {
      return "-40%"; // 桌面端原有位置
    }
  };

  // 预先设置所有元素的合成层，避免动画时的闪烁
  gsap.set(".scrollBox, .scrollItem", {
    force3D: true,
    opacity: 0,
    transformStyle: "preserve-3d",
    // 预热合成层，强制浏览器提前准备GPU资源
    willChange: "transform, opacity",
  });

  // 强制触发重绘，让浏览器提前准备合成层
  document.querySelector('.ab-container')?.offsetHeight;

  // 图片容器的初始状态 - 从屏幕左侧开始，图片在水平线上
  gsap.set(".scrollBox", { x: "-50%" }); // 初始位置在屏幕左侧
  gsap.set(".scrollItem", {
    y: 0, // 初始都在基础位置（由CSS的top控制）
    scale: 1,
    rotation: 0,
  });

  // 入场动画：纯粹的从左到右移动，同时图片逐渐错开
  const entranceTl = gsap.timeline(); // 移除延迟，立即开始

  // 整体从左向右移动
  entranceTl.to(
    ".scrollBox",
    {
      x: getEntrancePosition(), // 使用动态计算的位置
      duration: 0.5, // 减少到0.5秒
      opacity: 1,
      ease: "power2.out", // 改为power2.out，让动画更快结束
      force3D: true, // GPU加速
    },
    0
  );

  // 图片逐渐错开，使用stagger让它们有时间差，与整体移动同步
  entranceTl.to(
    ".scrollItem",
    {
      y: (index) => {
        const offsets = [-60, 80, -40, 70, -80, 50]; // 减少移动幅度，原来是[-60, 80, -40, 70, -80, 50]
        return offsets[index] || 0;
      },
      duration: 0.5, // 减少到0.5秒
      ease: "power2.out", // 改为power2.out，让动画更快结束
      stagger: 0.05, // 减少每个图片之间的延迟，原来是0.1
      opacity: 1, // 确保图片在入场时可见
      force3D: true, // GPU加速
    },
    0
  ); // 与整体移动同时开始，不再延迟

  // 滚动触发的主要动画 - 等待入场动画完成后才能触发
  setTimeout(() => {
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ab-container",
        start: triggerStart,
        end: triggerEnd,
        scrub: 1.5, // 减少scrub值，让动画更快响应滚动
        refreshPriority: -1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: false, // 禁用快速滚动结束，让动画自然进行
        preventOverlaps: true,
        normalizeScroll: false, // 禁用标准化滚动，让原生滚动行为控制
        snap: false, // 完全禁用snap
      },
    });

    // 向上滚动时：从当前位置继续向左移动
    mainTl.to(".scrollBox", {
      x: getScrollPosition(), // 使用动态计算的位置
      duration: 1.5, // 减少duration，让动画更快
      ease: "none", // 回到线性缓动，让scrub完全控制速度
      force3D: true,
      transformOrigin: "left center",
    });

    // 向上滚动时：图片从当前错开状态回到水平线
    mainTl.to(
      ".scrollItem",
      {
        y: 0, // 最终位置（水平线）
        duration: 1.5, // 减少duration，让动画更快
        ease: "none", // 回到线性缓动，让scrub完全控制速度
        force3D: true,
        stagger: 0, // 移除stagger，确保同步
      },
      0
    );

    // 延迟刷新ScrollTrigger，确保所有计算都是准确的
    setTimeout(() => {
      ScrollTrigger.refresh();
      
      // 预执行一次变换，让浏览器准备合成层
      gsap.set(".scrollBox", { x: getEntrancePosition() + 0.1 + "%" });
      gsap.set(".scrollBox", { x: getEntrancePosition() });
    }, 100);
    
    // 窗口大小变化时更新位置
    const handleResize = () => {
      // 重新设置当前位置
      gsap.set(".scrollBox", { x: getEntrancePosition() });
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    // 返回清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, 800); // 调整为0.5秒动画 + 0.05秒最后stagger + 缓冲时间

  // 不需要悬停效果动画，移除所有鼠标事件
  
  // 返回清理函数（现在主要用于ScrollTrigger的清理）
  return () => {
    // ScrollTrigger会在组件卸载时自动清理
  };
}
</script>

<template>
  <div class="ab-container">
    <div class="header">
      <img src="../../assets/images/favicon.png" class="logo" alt="" />
      <h1 class="title">专业的在线评测系统客户端应用程序</h1>
      <router-link to="/" class="header-button">
        <span>获取 SDUT OJ 竞赛客户端</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
        </svg>
      </router-link>
      <small class="header-small">适用于 macOS 11 或更高版本</small>
    </div>

    <div class="scrollBox">
      <!-- 所有图片都使用绝对定位 -->
      <section class="scrollItem scrollItem0">
        <img :src="ImgDataUrl.aboutImgDataUrl.scrollItem0" alt="应用截图1" />
      </section>

      <section class="scrollItem scrollItem1">
        <img :src="ImgDataUrl.aboutImgDataUrl.scrollItem1" alt="应用截图2" />
      </section>

      <section class="scrollItem scrollItem2">
        <img :src="ImgDataUrl.aboutImgDataUrl.scrollItem2" alt="应用截图3" />
      </section>

      <section class="scrollItem scrollItem3">
        <img :src="ImgDataUrl.aboutImgDataUrl.scrollItem3" alt="应用截图4" />
      </section>

      <section class="scrollItem scrollItem4">
        <img :src="ImgDataUrl.aboutImgDataUrl.scrollItem4" alt="应用截图5" />
      </section>

      <section class="scrollItem scrollItem5">
        <img :src="ImgDataUrl.aboutImgDataUrl.scrollItem5" alt="应用截图6" />
      </section>
    </div>
  </div>
</template>

<style scoped lang="less">
.ab-container {
  width: 100%;
  height: 85vh;
  padding-top: 5%;
  overflow: visible;
  z-index: 2;
  position: relative;

  // 防止布局偏移和优化渲染
  contain: layout style;
  transform: translateZ(0);
  backface-visibility: hidden;

  // 优化滚动性能
  scroll-behavior: auto;
  -webkit-overflow-scrolling: touch;

  .header {
    width: 100vw;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    gap: 1rem;
    margin-bottom: 1rem;
    z-index: 3;
    position: relative;

    &-small {
      font-size: var(--text-small-size);
      color: var(--text-secondary-color);
      font-weight: 200;
      opacity: 0;
      animation: logoFadeIn 0.5s ease forwards;
      animation-delay: 0.6s;
    }

    // 确保header在动画期间保持稳定的高度
    min-height: 300px; // 设置最小高度，防止内容跳动

    &-button {
      --font-color: var(--text-color);
      width: fit-content;
      height: fit-content;
      opacity: 0;
      animation: logo 0.5s ease forwards;
      animation-delay: 0.4s;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--font-color);
      position: relative;
      font-size: var(--text-large-size);
      transition: color 0.3s ease;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 0.1rem;
        background-color: var(--font-color);
        transform: translateY(100%);
        transition: background-color 0.3s ease;
      }

      &:hover {
        --font-color: var(--oj-color);
      }

      & svg {
        height: var(--text-large-size);
        fill: var(--font-color);
        transition: fill 0.3s ease;
      }
    }

    .logo {
      width: 4rem;
      display: block;
      opacity: 0;
      transform: translateY(0rem); // 移除初始偏移，避免布局偏移
      animation: logoFadeIn 0.5s ease forwards;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
    }

    .title {
      font-size: 3rem;
      color: var(--text-color);
      opacity: 0;
      transform: translateY(0rem); // 移除初始偏移，避免布局偏移
      animation: logoFadeIn 0.5s ease forwards;
      animation-delay: 0.2s;
      text-align: center;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      user-select: none;
    }

    @keyframes logoFadeIn {
      from {
        opacity: 0;
        transform: translateY(1rem) scale(0.95); // 使用更小的偏移和缩放，减少布局影响
      }
      to {
        opacity: 1;
        transform: translateY(0rem) scale(1);
      }
    }

    // 保留原有的logo动画名称以兼容header-button
    @keyframes logo {
      from {
        opacity: 0;
        transform: translateY(0rem) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0rem) scale(1);
      }
    }
  }

  .scrollBox {
    width: 100%;
    height: 400px;
    position: relative;
    z-index: 2;
    overflow: visible;
    will-change: transform;

    // 优化合成层，减少闪烁
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;

    .scrollItem {
      position: absolute;
      top: 120px; // 调整到更高的位置，原来是200px
      flex-shrink: 0;
      border-radius: var(--border-radius, 12px);
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      opacity: 0;
      background: linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.05)
      );
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);

      // 优化合成层设置，减少闪烁
      will-change: transform;
      transform: translateZ(0);
      backface-visibility: hidden;

      // 禁用子像素渲染，减少抖动
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      &:hover {
        box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;

        // 优化图片渲染，减少闪烁
        transform: translateZ(0);
        backface-visibility: hidden;
        image-rendering: -webkit-optimize-contrast;

        &:hover {
          transform: translateZ(0) scale(1.02); // 保持合成层一致性
        }
      }
    }

    // 根据实际图片尺寸调整比例 - 增大尺寸
    .scrollItem0 {
      aspect-ratio: 2000/1200 !important; // dark-enter.png 实际比例 1.67:1
      height: 400px !important;
      width: auto !important;
    }

    // light-enter.png 有相同的比例 - 增大尺寸
    .scrollItem1 {
      aspect-ratio: 1000/600 !important; // 实际图片比例 1.67:1
      height: 400px !important;
      width: auto !important;
    }

    .scrollItem2,
    .scrollItem3 {
      aspect-ratio: 1552/1012 !important; // 实际图片比例 1.53:1
      height: 400px !important;
      width: auto !important;
    }

    .scrollItem5 {
      aspect-ratio: 1440/900 !important; // 实际图片比例 1.6:1
      height: 400px !important;
      width: auto !important;
    }

    // scrollItem4 是竖屏 - 使用实际比例，增大尺寸
    .scrollItem4 {
      aspect-ratio: 500/580 !important; // 实际图片比例 0.86:1
      height: 450px !important;
      width: auto !important;
    }

    // 所有图片的绝对定位 - 重新计算精确间距
    .scrollItem0 {
      left: 0px;
      z-index: 10;
    }

    .scrollItem1 {
      left: 685px; // 667px宽度 + 18px间距
      z-index: 10;
    }

    .scrollItem2 {
      left: 1370px; // 685 + 667 + 18px间距
      z-index: 10;
    }

    .scrollItem3 {
      left: 2001px; // 1370 + 613 + 18px间距
      z-index: 10;
    }

    .scrollItem4 {
      left: 2632px; // 2001 + 613 + 18px间距
      z-index: 10;
    }

    .scrollItem5 {
      left: 3038px; // 2632 + 388 + 18px间距
      z-index: 10;
    }
  }

  // 响应式设计
  @media (max-width: 1000px) {
    .header .title {
      font-size: 1.5rem;
      padding: 0 1rem;
    }

    .scrollBox {
      .scrollItem {
        height: 250px !important; // 进一步减小图片高度避免遮挡
      }

      .scrollItem4 {
        height: 280px !important; // 也相应减小
      }

      // 调整间距以适应小屏幕 - 减少间距，从18px改为12px
      .scrollItem0 {
        left: 0px;
      }
      .scrollItem1 {
        left: 429px; // 减少间距
      }
      .scrollItem2 {
        left: 858px; // 减少间距
      }
      .scrollItem3 {
        left: 1253px; // 减少间距
      }
      .scrollItem4 {
        left: 1648px; // 减少间距
      }
      .scrollItem5 {
        left: 1906px; // 减少间距
      }
    }
  }

  @media (max-width: 480px) {
    .header .title {
      font-size: 1.2rem;
    }

    .scrollBox {
      .scrollItem {
        height: 200px !important; // 在超小屏幕上进一步减小
      }

      .scrollItem4 {
        height: 220px !important; // 相应减小
      }

      // 进一步减小间距 - 从12px改为8px间距
      .scrollItem0 {
        left: 0px;
      }
      .scrollItem1 {
        left: 341px; // 减少间距
      }
      .scrollItem2 {
        left: 682px; // 减少间距
      }
      .scrollItem3 {
        left: 997px; // 减少间距
      }
      .scrollItem4 {
        left: 1312px; // 减少间距
      }
      .scrollItem5 {
        left: 1518px; // 减少间距
      }
    }
  }
}
</style>
