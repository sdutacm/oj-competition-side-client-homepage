<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted, nextTick, onBeforeUnmount, setTransitionHooks } from "vue";

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
  // 等待DOM完全渲染
  await nextTick();
  setTimeout(() => {
    initAnimations();
  }, 0);
});



function initAnimations() {
  let duration = 1;
  let triggerEnd = "bottom center";
  let triggerStart = "top top";

  // 刷新ScrollTrigger以重新计算位置
  ScrollTrigger.refresh();

  gsap.set(".scrollBox", { x: "10%" });
  gsap.set(".scrollItem2", { y: "30%" });
  gsap.set(".scrollItem3", { y: "-30%" });

  let boxTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ab-container",
      start: triggerStart,
      end: triggerEnd,
      scrub: 1,
      refreshPriority: -1, // 确保在其他ScrollTrigger之后刷新
    },
  });

  let scrollItem2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ab-container",
      start: triggerStart,
      end: triggerEnd,
      scrub: 1,
      refreshPriority: -1,
    },
  });

  let scrollItem3Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ab-container",
      start: triggerStart,
      end: triggerEnd,
      scrub: 1,
      refreshPriority: -1,
    },
  });

  boxTl.to(
    ".scrollBox",
    {
      duration: duration,
      x: "-15%",
      ease: "linear",
    },
    0
  );

  scrollItem2Tl.to(
    ".scrollItem2",
    {
      duration: duration,
      y: "0%",
      ease: "linear",
    },
    0
  );

  scrollItem3Tl.to(
    ".scrollItem3",
    {
      duration: duration,
      y: "0%",
      ease: "linear",
    },
    0
  );
}
</script>

<template>
  <div class="ab-container">
    <div class="header">
      <img src="../../assets/images/favicon.png" class="logo" alt="" />
      <h1 class="title">专业的在线评测系统客户端应用程序</h1>
    </div>
    <div class="scrollBox">
      <section class="scrollItem scrollItem0"></section>
      <section class="scrollItem scrollItem1"></section>
      <section class="scrollItem scrollItem2"></section>
      <section class="scrollItem scrollItem3"></section>
      <section class="scrollItem scrollItem4"></section>
      <section class="scrollItem scrollItem5"></section>
    </div>
  </div>
</template>

<style scoped lang="less">
.ab-container {
  width: 100%;
  height: 80vh;
  padding-top: 5%;
  overflow: visible;
  .header {
    width: 100vw;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: blod;
    gap: 1rem;
    margin-bottom: 1rem;
    .logo {
      width: 3rem;
      display: block;
      opacity: 0;
      transform: translateY(3rem);
      animation: logo 1s ease-in-out forwards;
    }
    .title {
      font-size: 2rem;
      color: var(--text-color);
      opacity: 0;
      transform: translateY(3rem);
      animation: logo 1s ease-in-out forwards;
      animation-delay: 0.5s;
    }

    @keyframes logo {
      from {
        opacity: 0;
        transform: translateY(3rem);
      }
      to {
        opacity: 1;
        transform: translateY(0rem);
      }
    }
  }

  .scrollBox {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 60%;
    position: relative;
    overflow: visible;

    & .scrollItem {
      height: 100%;

      aspect-ratio: 16/9;
      background-color: red;
      border-radius: var(--border-radius);
      overflow: hidden;
      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--border-radius);
      }
    }

    .scrollItem3 {
      width: 15vw !important;
      aspect-ratio: 9/16;
    }

    .scrollItem0 {
      position: absolute;
      left: 0;
      transform: translateX(calc(-100% - 1rem));
    }

    .scrollItem5 {
      position: absolute;
      right: 0;
      transform: translateX(calc(100% + 1rem));
    }
  }
}
</style>
