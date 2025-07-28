<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // 创建主时间轴
  let mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ct-container",
      start: "top 10%", // 当容器顶部距离视口顶部 5% 时开始固定
      end: "top -400%", // 增加足够的滚动距离来完成动画
      scrub: 1,
      pin: true, // 固定当前容器，这会推动下面的元素
      pinSpacing: true,
    },
  });

  // 第一阶段：隐藏 header (10-15%)
  mainTl
    .to(".ct-title", {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "linear",
    })
    .to(".ct-content", {
      duration: 1,
      y: "-10%",
      ease: "linear",
    })
    .to(".ct-content img:nth-child(1)", {
      duration: 2,
      scale: 1.3,
      ease: "linear",
    })
    .to(".ct-content img:nth-child(1)", {
      duration: 3,
      y: "-200%",
      ease: "linear",
    })
    .to(".ct-content img:nth-child(2)", {
      duration: 3,
      y: "-200%",
      ease: "linear",
    });
});
</script>

<template>
  <div class="ct-container">
    <header class="ct-title">随心定制，跟随系统主题</header>
    <div class="ct-content">
      <img src="../../assets/images/dark-home.png" alt="" />
      <img src="../../assets/images/dark-home.png" alt="" />
      <img src="../../assets/images/light-home.png" alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
.ct-container {
  width: 100%;
  height: 100vh; // 恢复到正常高度，因为我们使用pin来固定
  position: relative;
  display: flex;
  flex-direction: column;
  will-change: transform; // 优化性能

  & .ct-title {
    width: 100%;
    height: 10%;
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    will-change: transform, opacity; // 优化动画性能
  }

  & .ct-content {
    width: 100%;
    height: 90vh;
    border-radius: var(--border-radius);
    position: relative;
    transform-origin: center center; // 设置缩放中心点
    will-change: transform; // 优化性能
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      position: absolute;
      //   width: 50%;
      width: auto;
      height: 80%;
      object-fit: contain;
      will-change: transform; // 优化动画性能
      backface-visibility: hidden; // 减少闪烁

      &:nth-child(1) {
        z-index: 2;
      }
      &:nth-child(2) {
        z-index: 1;
      }
      &:nth-child(3) {
        z-index: 0;
      }
    }
  }
}
</style>
