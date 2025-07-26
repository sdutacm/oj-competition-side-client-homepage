<template>
  <div class="container">
    <div class="content">
      <div class="content-main">
        <img src="../assets/images/favicon.png" class="logo" alt="" />
        <h1>下载 SDUT OJ 竞赛客户端</h1>
        <div class="btn">
          <DownloadButton desc="下载 for Linux" />
        </div>
        <aside class="desc">版本 1.2 for .AppImage (x64)</aside>
      </div>
    </div>
    <div class="release-container">
      <header>所有版本</header>
      <Release />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import DownloadButton from "@/components/DownloadButton.vue";
import Release from "@/components/Release.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 8rem;

  & .content {
    width: 100%;
    aspect-ratio: 4/1;
    // background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    &-main {
      width: 50%;
      height: 80%;
      // background-color: green;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;

      & .logo {
        display: block;
        width: 15%;
      }

      & h1 {
        font-size: var(--text-large-size);
        font-weight: 800;
      }

      & .btn {
        width: 20%;
        height: 3rem;
        background-color: black;
        // background-color: var(--bg-secondary-color);
        border-radius: 0.5rem;
        cursor: pointer;
      }

      & .desc {
        width: 100%;
        // background-color: black;
        height: 2rem;
        font-size: var(--text-small-size);
        color: var(--text-nav-color);
        text-align: center;
      }
    }
  }
}

.release-container {
  width: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  & header {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: var(--text-large-size);
    font-weight: bold;
    color: var(--text-color);
  }
}
</style>
