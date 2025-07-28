<script setup></script>

<template>
  <div class="cp-container">
    <section class="cp-info"></section>
    <section class="cp-features"></section>
  </div>
</template>

<style scoped lang="less">
.cp-container {
  width: 80%;
  height: 100vh;
  background-color: green;
  position: relative;
    display: flex;
    
  & section {
    width: 50%;
    height: 100%;
    background-color: blue;
  }
//   background-color: var(--bg-primary-color);
}
</style>
