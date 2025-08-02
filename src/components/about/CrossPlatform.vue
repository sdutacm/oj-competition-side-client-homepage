<script setup></script>

<template>
  <div class="cp-container">
    <header class="title">
      <p>
        <div>
          探索
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="auto"
            viewBox="0 -960 960 960"
            width="auto"
            fill="#1f1f1f"
          >
            <path
              d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z"
            />
          </svg>
        </div>
        OJ 竞赛客户端
      </p>
    </header>
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
@import url(../../assets/css/inline-style.less);
.cp-container {
  width: 100%;
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
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    flex-wrap: nowrap;
    & div {
      .inline-style(
        var(--blue-bg-color),
        var(--blue-font-color),
      )
    }
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
