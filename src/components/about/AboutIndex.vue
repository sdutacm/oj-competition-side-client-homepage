<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted, nextTick, onBeforeUnmount } from "vue";
import DownloadButton from "../DownloadButton.vue";

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
  await nextTick();
  // 增加延迟，确保所有CSS样式都已应用，DOM完全稳定
  setTimeout(() => {
    initAnimations();
  }, 200); // 增加延迟时间
});

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf("*"); // 清理所有GSAP动画
});

function initAnimations() {
  const triggerEnd = "bottom top"; // 更长的滚动距离
  const triggerStart = "bottom 80%"; // 使用bottom触发，确保用户必须向下滚动才能触发

  // 预先设置所有元素的合成层，避免动画时的闪烁
  gsap.set(".scrollBox, .scrollItem", { 
    force3D: true,
    transformStyle: "preserve-3d"
  });

  // 图片容器的初始状态 - 从屏幕左侧开始，图片在水平线上
  gsap.set(".scrollBox", { x: "-50%" }); // 初始位置在屏幕左侧
  gsap.set(".scrollItem", { 
    y: 0, // 初始都在基础位置（由CSS的top控制）
    scale: 1,
    opacity: 1,
    rotation: 0
  });

  // 入场动画：纯粹的从左到右移动，同时图片逐渐错开
  const entranceTl = gsap.timeline(); // 移除延迟，立即开始
  
  // 整体从左向右移动
  entranceTl.to(".scrollBox", {
    x: "-25%", // 调整位置让6张图片的中心对齐屏幕中心
    duration: 0.8, // 缩短duration，让水平移动更快
    ease: "power2.out", // 改为power2.out，让动画更快结束
    force3D: true // GPU加速
  }, 0);

  // 图片逐渐错开，使用stagger让它们有时间差，与整体移动同步
  entranceTl.to(".scrollItem", {
    y: (index) => {
      const offsets = [-30, 40, -20, 35, -40, 25]; // 减少移动幅度，原来是[-60, 80, -40, 70, -80, 50]
      return offsets[index] || 0;
    },
    duration: 0.8, // 与整体移动保持相同时长，缩短时间
    ease: "power2.out", // 改为power2.out，让动画更快结束
    stagger: 0.05, // 减少每个图片之间的延迟，原来是0.1
    force3D: true // GPU加速
  }, 0); // 与整体移动同时开始，不再延迟

  // 滚动触发的主要动画 - 等待入场动画完成后才能触发
  setTimeout(() => {
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ab-container",
        start: triggerStart,
        end: triggerEnd,
        scrub: 1.5, // 增加scrub值，让动画更平滑，减少闪烁
        refreshPriority: -1,
        invalidateOnRefresh: true,
        anticipatePin: 1, // 优化固定元素的性能
        fastScrollEnd: true, // 快速滚动时优化性能
        preventOverlaps: true, // 防止动画重叠
      },
    });

    // 向上滚动时：从当前位置继续向左移动，优化GPU加速
    mainTl.to(".scrollBox", {
      x: "-30%", // 最终位置（向左移动）
      duration: 1,
      ease: "none",
      force3D: true,
      transformOrigin: "left center", // 明确变换原点
    });

    // 向上滚动时：图片从当前错开状态回到水平线，使用统一的动画
    mainTl.to(".scrollItem", {
      y: 0, // 最终位置（水平线）
      duration: 1,
      ease: "none",
      force3D: true,
      stagger: 0, // 同时进行，避免异步导致的闪烁
    }, 0);
    
    // 延迟刷新ScrollTrigger，确保所有计算都是准确的
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, 1200); // 减少等待时间，因为入场动画现在只需要0.8秒+stagger延迟

  // 不需要悬停效果动画，移除所有鼠标事件
}
</script>

<template>
  <div class="ab-container">

    <div class="header">
      <img src="../../assets/images/favicon.png" class="logo" alt="" />
      <h1 class="title">专业的在线评测系统客户端应用程序</h1>
      <router-link to="/" class="header-button">
        <download-button desc="下载 SDUT OJ 竞赛客户端"/>
      </router-link>
    </div>
    
    <div class="scrollBox">
      <!-- 所有图片都使用绝对定位 -->
      <section class="scrollItem scrollItem0">
        <img src="../../assets/images/scrollItem1.png" alt="应用截图1">
      </section>
      
      <section class="scrollItem scrollItem1">
        <img src="../../assets/images/light-enter.png" alt="应用截图2">
      </section>
      
      <section class="scrollItem scrollItem2">
        <img src="../../assets/images/scrollItem2.png" alt="应用截图3">
      </section>
      
      <section class="scrollItem scrollItem3">
        <img src="../../assets/images/scrollItem5.png" alt="应用截图5">
      </section>
      
      <section class="scrollItem scrollItem4">
        <img src="../../assets/images/scrollItem4.png" alt="应用截图4">
      </section>
      
      <section class="scrollItem scrollItem5">
        <img src="../../assets/images/scrollItem1.png" alt="应用截图6">
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
    
    // 确保header在动画期间保持稳定的高度
    min-height: 300px; // 设置最小高度，防止内容跳动

    &-button {
      width: 20%;
      height: 20%;
      opacity: 0;
      animation: logo 1s ease-in-out forwards;
      animation-delay: 1s;
    }
    
    .logo {
      width: 3rem;
      display: block;
      opacity: 0;
      transform: translateY(0rem); // 移除初始偏移，避免布局偏移
      animation: logoFadeIn 1s ease-in-out forwards;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    }
    
    .title {
      font-size: 3rem;
      color: var(--text-color);
      opacity: 0;
      transform: translateY(0rem); // 移除初始偏移，避免布局偏移
      animation: logoFadeIn 1s ease-in-out forwards;
      animation-delay: 0.5s;
      text-align: center;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
      cursor: pointer;
      background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      
      // 优化合成层设置，减少闪烁
      will-change: transform;
      transform: translateZ(0);
      backface-visibility: hidden;
      
      // 禁用子像素渲染，减少抖动
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      
      &:hover {
        box-shadow: 0 12px 48px rgba(0,0,0,0.15);
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
    .scrollItem0, .scrollItem2, .scrollItem3, .scrollItem5 {
      aspect-ratio: 1552/1012 !important; // 实际图片比例 1.53:1
      height: 400px !important;
      width: auto !important;
    }
    
    // light-enter.png 有不同的比例 - 增大尺寸
    .scrollItem1 {
      aspect-ratio: 1000/600 !important; // 实际图片比例 1.67:1
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
      left: 630px; // 612px宽度 + 18px间距
      z-index: 10;
    }

    .scrollItem2 {
      left: 1315px; // 630 + 667 + 18px间距
      z-index: 10;
    }

    .scrollItem3 {
      left: 1945px; // 1315 + 612 + 18px间距
      z-index: 10;
    }

    .scrollItem4 {
      left: 2575px; // 1945 + 612 + 18px间距
      z-index: 10;
    }

    .scrollItem5 {
      left: 2980px; // 2575 + 387 + 18px间距 (scrollItem4实际宽度是387px)
      z-index: 10;
    }
  }
  
  // 响应式设计
  @media (max-width: 768px) {
    .header .title {
      font-size: 1.5rem;
      padding: 0 1rem;
    }
    
    .scrollBox {
      .scrollItem {
        height: 320px !important; // 在小屏幕上减小图片高度
      }
      
      .scrollItem4 {
        height: 360px !important;
      }
      
      // 调整间距以适应小屏幕 - 按比例缩小，保持18px间距比例
      .scrollItem0 { left: 0px; }
      .scrollItem1 { left: 475px; }
      .scrollItem2 { left: 950px; }
      .scrollItem3 { left: 1425px; }
      .scrollItem4 { left: 1900px; }
      .scrollItem5 { left: 2175px; }
    }
  }
  
  @media (max-width: 480px) {
    .header .title {
      font-size: 1.2rem;
    }
    
    .scrollBox {
      .scrollItem {
        height: 250px !important; // 在超小屏幕上进一步减小
      }
      
      .scrollItem4 {
        height: 280px !important;
      }
      
      // 进一步减小间距 - 按比例缩小，保持间距一致性
      .scrollItem0 { left: 0px; }
      .scrollItem1 { left: 330px; }
      .scrollItem2 { left: 660px; }
      .scrollItem3 { left: 990px; }
      .scrollItem4 { left: 1320px; }
      .scrollItem5 { left: 1550px; }
    }
  }
}
</style>
