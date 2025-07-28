<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  let duration = 0.3;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ab-container",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: true,
    },
  });

  tl.to(
    ".scrollBox",
    {
      duration: duration,
      x: "-5%",
      ease: "linear",
    },
    0
  );

  tl.to(
    ".scrollItem2",
    {
      duration: duration,
      y: "0%",
      ease: "linear",
    },
    0
  );

  tl.to(
    ".scrollItem3",
    {
      duration: duration,
      y: "0%",
      ease: "linear",
    },
    0
  );
});
</script>

<template>
  <div class="ab-container">
    <div class="header">
      <img src="../../assets/images/favicon.png" class="logo" alt="" />
      <h1 class="title">专业的在线评测系统客户端应用程序</h1>
    </div>
    <div class="scrollBox">
      <section class="scrollItem scrollItem1"></section>
      <section class="scrollItem scrollItem2"></section>
      <section class="scrollItem scrollItem3"></section>
      <section class="scrollItem scrollItem4"></section>
    </div>
  </div>
</template>

<style scoped lang="less">
.ab-container {
  width: 100%;
  height: 80vh;
  background-color: red;
  padding-top: 5%;
  .header {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: green;
    gap: 1rem;
    margin-bottom: 1rem;
    .logo {
      width: 3rem;
      display: block;
    }
    .title {
      font-size: 2rem;
      color: var(--text-color);
    }
  }

  .scrollBox {
    width: 500%;
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 60%;
    flex-shrink: none;
    flex-grow: none;
    background-color: var(--bg-secondary-color);
    position: relative;
    transform: translateX(0);

    & .scrollItem {
      width: 40vw;
      height: 90%;
      background-color: red;
      border-radius: var(--border-radius);
    }

    .scrollItem1 {
    }

    .scrollItem2 {
      transform: translateY(50%);
      background-color: red;
    }

    .scrollItem3 {
      transform: translateY(-50%);
      width: 10vw !important;
    }
  }
}
</style>
