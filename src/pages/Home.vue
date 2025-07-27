<script setup>
import DownloadButton from "@/components/DownloadButton.vue";
import Release from "@/components/Release.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="content-mask">
        <div class="content-mask-real"></div>
        <img src="../assets/images/light-home.png" class="light-home" alt="" />
      </div>
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
      <div class="release-container-title">功能概览 ✨</div>
      <div class="release-container-desc">
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon">
            <img src="../assets/images/function/oses.avif" alt="">
          </div>
          <div class="release-container-desc-box-info">
            <p>跨平台桌面应用支持</p>
            <small
              >借助 Electron 实现 Windows、macOS 与 Linux
              的一体化部署与无缝运行</small
            >
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon">
            <img src="../assets/images/function/ui.png" alt="">
          </div>
          <div class="release-container-desc-box-info">
            <p>统一现代化 UI 体验</p>
            <small>采用现代设计风格，带来简洁一致且响应灵敏的用户界面。</small>
            </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon"></div>
          <div class="release-container-desc-box-info">
            <p>可配置白名单机制</p>
            <small>灵活配置访问白名单，全面控制外部链接与资源加载权限。</small>
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon"></div>
          <div class="release-container-desc-box-info">
            <p>强大且易用的导航系统</p>
            <small>支持多层级导航、历史记录与高亮状态，助力用户高效操作。</small>
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon"></div>
          <div class="release-container-desc-box-info">
            <p>隐私与数据安全保障</p>
            <small>内建隐私保护逻辑，有效防止敏感数据泄露与非法访问。</small>
          </div>
        </div>
        <div class="release-container-desc-box">
          <div class="release-container-desc-box-icon"></div>
          <div class="release-container-desc-box-info">
            <p>开发者友好与快速集成</p>
            <small>模块化架构与清晰文档，助力快速上手与定制化开发。</small>
          </div>
        </div>
      </div>
      <header>所有版本 📦</header>
      <Release />
    </div>
    <Footer />
  </div>
</template>

<style scoped lang="less">
.container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 0rem;
  background-color: var(--bg-primary-color);

  & .content {
    width: 100%;
    aspect-ratio: 3/1;
    @media screen and (max-width: 768px) {
      aspect-ratio: 3/2;
    }

    // height: 50% !important;
    // aspect-ratio: 3/1;
    // background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;

    &-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: var(--bg-secondary-color);
      &-real {
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--mask-color);
        z-index: 2;
        backdrop-filter: blur(1px);
      }
      & .light-home {
        position: absolute;
        width: 80%;
        z-index: 1;
        transform: translateY(40%);
        mix-blend-mode: multiply;
      }
    }

    &-main {
      width: 50%;
      height: 90%;
      // background-color: green;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      z-index: 4;

      & .logo {
        display: block;
        width: 15%;
      }

      & h1 {
        font-size: var(--text-large-size);
        color: var(--text-color);
        font-weight: 800;
      }

      & .btn {
        width: 20%;
        height: 3rem;
        position: relative;
        &-info {
          position: absolute;
          width: 70%;
          height: 70%;
          transform: translate(-30%, -100%) rotate(-5deg);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--text-nav-color);
          & .success {
          }
        }
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
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: var(--bg-primary-color);
  &-title {
    width: 60%;
    height: 4rem;
    // background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-large-size);
    font-weight: 700;
    margin-top: 1rem;
    color: var(--text-color);
  }
  &-desc {
    width: 60%;
    aspect-ratio: 5/2;
    // background-color: red;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin-top: 2rem;
    &-box {
      border-radius: var(--border-radius);
      overflow: hidden;
      background-color: var(--bg-secondary-color);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &:hover {
        .release-container-desc-box-icon {
          & img {
            transform: scale(1.1);
          }
        }
      }

      &-icon {
        width: 100%;
        height: 60%;
        overflow: hidden;
        & img {
          width: 100%;
          height: 100%;
          // width: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
      }

      &-info {
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: column;
        & p {
          width: 100%;
          height: 30%;
          font-size: var(--text-medium-size);
          color: var(--text-color);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        & small {
          width: 100%;
          height: 70%;
          padding-left: 1rem;
          padding-right: 1rem;
          font-size: var(--text-small-size);
          color: var(--text-secondary-color);
        }
      }
      &:nth-child(1) {
        grid-area: 1 / 1 / 2 / 2;
      }
      &:nth-child(2) {
        grid-area: 1 / 2 / 2 / 3;
      }
      &:nth-child(3) {
        grid-area: 1 / 3 / 2 / 4;
      }
      &:nth-child(4) {
        grid-area: 2 / 1 / 3 / 2;
      }
      &:nth-child(5) {
        grid-area: 2 / 2 / 3 / 3;
      }
      &:nth-child(6) {
        grid-area: 2 / 3 / 3 / 4;
      }
    }
    // height;
  }

  & header {
    width: 60%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-large-size);
    font-weight: bold;
    color: var(--text-color);
    margin-top: 3rem;
  }
}
</style>
