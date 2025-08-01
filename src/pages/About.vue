<script setup>
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import { onBeforeUnmount } from 'vue';
import AboutIndex from '@/components/about/AboutIndex.vue';
import CrossPlatform from '@/components/about/CrossPlatform.vue';
import Custom from '@/components/about/Custom.vue';
import Expand from '@/components/about/Expand.vue';
import Safe from '@/components/about/Safe.vue';

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

</script>

<template>
  <main class="container">
    <section class="container-section">
      <AboutIndex />
    </section>
    <section class="container-section">
      <CrossPlatform />
    </section>
    <section class="container-section">
      <Custom />
    </section>
    <section class="container-section">
      <Expand />
    </section>
    <section class="container-section">
      <Safe />
    </section>
  </main>
</template>


<style scoped lang="less">
.container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  & section {
    width: 100%;
    height: auto;
    background-color: var(--bg-primary-color);
    position: relative;
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
