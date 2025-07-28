<script setup></script>

<template>
  <div class="cp-container">
    <header class="title">探索 OJ 竞赛客户端</header>
    <div class="content">
      <section class="section">
        <header class="tag">极致体验</header>
        <div class="desc">
          <p>
            我们致力于为比赛选手提供无与伦比的使用体验，持续优化客户端性能和界面设计。
          </p>
        </div>
        <footer class="footer"></footer>
      </section>
      <section class="section">
        <header class="tag">性能保障</header>
        <div class="desc">
          <p>基于 Electron 框架和 Chrome 内核，确保应用程序的稳定性和性能。</p>
        </div>
        <footer class="footer"></footer>
      </section>
    </div>
  </div>
</template>

<style scoped lang="less">
.cp-container {
  width: 50%;
  height: 70vh;
  // background-color: green;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  & .title {
    position: relative;
    width: 100%;
    height: 20%;
    // background-color: white;
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
  }

  & .content {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    & .section {
      width: 45%;
      height: 100%;
      border-radius: 2rem;
      overflow: hidden;
      & .tag {
        width: 100%;
        height: 30%;
        // background-color: green;
        display: flex;
        padding: 2rem;
        font-size: 2rem;
        font-weight: bold;
        justify-content: start;
        align-items: flex-end;
      }

      & .desc {
        width: 100%;
        height: 30%;
        // background-color: blue;
        padding-left: 2rem;
        padding-right: 2rem;
      }
      & .footer {
        width: 100%;
        height: 50%;
        // background-color: yellow;
      }

      &:nth-child(1) {
        background-color: #e8f0fe;
      }

      &:nth-child(2) {
        background-color: #fef7e0;
      }
    }
  }
  //   background-color: var(--bg-primary-color);
}
</style>
