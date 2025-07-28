<script setup>
import AboutIndex from '@/components/about/AboutIndex.vue';
import CrossPlatform from '@/components/about/CrossPlatform.vue';
import Custom from '@/components/about/Custom.vue';
</script>

<template>
  <div class="container">
    <section>
      <AboutIndex />
    </section>
    <section>
      <CrossPlatform />
    </section>
    <section>
      <Custom />
    </section>
    <section>
      <CrossPlatform/>
    </section>
  </div>
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
    overflow: visible;
  }
}
</style>
