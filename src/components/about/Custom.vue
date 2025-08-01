<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted, nextTick } from "vue";

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    initAnimations();
  }, 0);
});

function initAnimations() {
  // 创建主时间轴
  let mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ct-container",
      start: "top 10%",
      end: "top -400%",
      scrub: 1,
      pin: ".ct-container",
      pinSpacing: true,
      anticipatePin: 1,
      // 不再手动设置left/transform，交给ScrollTrigger自动还原
    },
  });

  let headerTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".ct-title",
      start: "top 10%",
      end: "top 15%",
      scrub: 1,
    },
  });

  headerTL.to(".ct-title", {
    duration: .5,
    opacity: 0,
    ease: "linear",
  });

  // 第一阶段：隐藏 header (10-15%)
  mainTl
    .to(".ct-content", {
      duration: 1,
      y: "-10%",
      ease: "linear",
    })
    .to(".ct-content .img1", {
      duration: .5,
      scale: 2,
      ease: "linear",
    })
    .to(".ct-content .img1", {
      duration: 1,
      y: "-200%",
      ease: "linear",
    })
    .to(".ct-content-small .img2", {
      duration: 1,
      y: "-200%",
      ease: "linear",
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
  will-change: transform;
  box-sizing: border-box;
  overflow: visible; // 防止pin时内容高度变化导致跳动

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
    will-change: transform, opacity; // 优化动画性能
    box-sizing: border-box;
  }

  & .ct-content {
    width: 800px;
    max-width: 100vw;
    height: calc(100vh - 60px);
    border-radius: var(--border-radius);
    position: relative;
    transform-origin: center center; // 设置缩放中心点
    will-change: transform; // 优化性能
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
      will-change: transform; // 优化动画性能
      backface-visibility: hidden; // 减少闪烁
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
