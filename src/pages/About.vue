<script setup>
import AboutIndex from '@/components/about/AboutIndex.vue';
import CrossPlatform from '@/components/about/CrossPlatform.vue';
import Custom from '@/components/about/Custom.vue';
import Expand from '@/components/about/Expand.vue';
import Focus from '@/components/about/Focus.vue';
import Safe from '@/components/about/Safe.vue';
import Development from '@/components/about/Development.vue';

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
      <Focus />
    </section>
    <section class="container-section">
      <Safe />
    </section>
    <section class="container-section">
      <Development />
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
