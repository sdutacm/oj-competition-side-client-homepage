<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted, onUnmounted, nextTick } from "vue";

gsap.registerPlugin(ScrollTrigger);

let mainTl, headerTL;

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    initAnimations();
  }, 0);
});

// 组件卸载时清理
onUnmounted(() => {
  if (mainTl) {
    mainTl.scrollTrigger?.kill();
    mainTl.kill();
  }
  if (headerTL) {
    headerTL.scrollTrigger?.kill();
    headerTL.kill();
  }
});

function initAnimations() {
  mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ct-container",
      start: "top 10%",
      end: "top -400%",
      scrub: 1,
      pin: ".ct-container",
      pinSpacing: true,
      anticipatePin: 0, // 减少预测导致的抖动
      refreshPriority: -1, // 降低刷新优先级
      pinReparent: false, // 防止重新父级化
      normalizeScroll: false, // 减少干扰
      ignoreMobileResize: true, // 忽略移动端尺寸变化
      onRefreshInit: () => {
        // 确保状态正确
        gsap.set(".ct-container", { clearProps: "transform" });
      }
    },
  });

  headerTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".ct-title",
      start: "top 10%",
      end: "top 15%",
      scrub: 1,
      refreshPriority: -1 // 保持一致的优先级
    },
  });

  headerTL.to(".ct-title", {
    duration: .5,
    opacity: 0,
    ease: "none", // 使用线性缓动，配合scrub更稳定
    force3D: true // 启用硬件加速
  });

  // 第一阶段：隐藏 header (10-15%)
  mainTl
    .to(".ct-content", {
      duration: 1,
      y: "-10%",
      ease: "none", // 线性缓动更稳定
      force3D: true
    })
    .to(".ct-content .img1", {
      duration: .5,
      scale: 2,
      ease: "none",
      force3D: true
    })
    .to(".ct-content .img1", {
      duration: 1,
      y: "-200%",
      ease: "none",
      force3D: true
    })
    .to(".ct-content-small .img2", {
      duration: 1,
      y: "-200%",
      ease: "none",
      force3D: true
    });
}
</script>

<template>
  <div class="ct-container">
    <header class="ct-title">随心定制，跟随系统主题</header>
    <div class="ct-content">
      <img src="../../assets/images/dark-home.png" class="img1" alt="" />
      <div class="ct-content-small">
        <img src="../../assets/images/dark-home.png" class="img2" alt="" />
        <img src="../../assets/images/light-home.png" class="img3" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.ct-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  left: 0;
  top: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: visible;
  contain: layout; /* 限制布局影响范围 */
  isolation: isolate; /* 创建新的堆叠上下文 */

  & .ct-title {
    width: 100%;
    height: 60px;
    min-height: 60px;
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    box-sizing: border-box;
  }

  & .ct-content {
    width: 800px;
    max-width: 100vw;
    height: calc(100vh - 60px);
    border-radius: var(--border-radius);
    position: relative;
    transform-origin: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    box-sizing: border-box;
    & .img1 {
      position: absolute;
      width: auto;
      height: 80%;
      display: block;
      object-fit: contain;
      backface-visibility: hidden;
      z-index: 3;
    }
    &-small {
      position: absolute;
      aspect-ratio: 16/9;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        display: block;
        &:nth-child(1) {
          z-index: 2;
        }
        &:nth-child(2) {
          z-index: 1;
        }
      }
    }
  }
}
</style>
