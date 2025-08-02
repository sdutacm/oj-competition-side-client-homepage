<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted, onUnmounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

let mainTimeline;

onMounted(() => {
  // 设置初始状态，只设置一次
  gsap.set(".sf-content", { 
    x: "22.6%", 
    scale: 1.1,
    force3D: true
  });
  gsap.set(".sf-content-desc", { 
    opacity: 0,
    force3D: true
  });
  gsap.set(".sf-content-desc-footer", { 
    y: "100%",
    force3D: true
  });
  gsap.set(".cookie", { 
    left: "50%", 
    top: "5%",
    opacity: 1,
    force3D: true
  });
  gsap.set(".storage", { 
    left: "10%", 
    top: "50%",
    opacity: 1,
    force3D: true
  });
  gsap.set(".logout", { 
    right: "10%", 
    bottom: "10%",
    opacity: 1,
    force3D: true
  });
  gsap.set(".sf-content-desc-footer-bg-main-text", { 
    opacity: 0,
    force3D: true
  });

  // 创建主时间轴，平衡抖动和布局问题
  mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".sf-container",
      start: "top 30%",
      end: "top -150%",
      scrub: 1,
      pin: ".sf-container",
      pinSpacing: true, // 改回true，保持正常布局
      anticipatePin: 0, // 保持0，减少预测导致的抖动
      normalizeScroll: false,
      ignoreMobileResize: true,
      pinReparent: false,
      refreshPriority: -1, // 降低刷新优先级
      onRefreshInit: () => {
        // 在刷新初始化时确保状态正确
        gsap.set(".sf-container", { clearProps: "transform" });
      }
    },
  });

  // 使用更稳定的动画配置
  mainTimeline
    .to(".sf-content-desc", {
      duration: 1.2,
      opacity: 1,
      ease: "none", // 改回none，配合scrub更稳定
      force3D: true
    }, 0)
    .to(".sf-content", {
      duration: 1.2,
      x: "0%",
      scale: 1,
      ease: "none", // 改回none，减少抖动
      force3D: true
    }, 0)
    .to(".sf-content-desc-footer", {
      duration: 0.8,
      y: "0%",
      ease: "none",
      force3D: true
    }, 0.6)
    .to(".cookie", {
      duration: 0.6,
      opacity: 0,
      left: "50%",
      top: "0%",
      ease: "none",
      force3D: true
    }, 1.2)
    .to(".storage", {
      duration: 0.6,
      opacity: 0,
      left: "0%",
      top: "50%",
      ease: "none",
      force3D: true
    }, 1.4)
    .to(".logout", {
      duration: 0.6,
      opacity: 0,
      right: "0%",
      bottom: "0%",
      ease: "none",
      force3D: true
    }, 1.6)
    .to(".sf-content-desc-footer-bg-main-text", {
      duration: 0.6,
      opacity: 1,
      ease: "none",
      force3D: true
    }, 1.8);
});

// 组件卸载时清理
onUnmounted(() => {
  if (mainTimeline) {
    mainTimeline.scrollTrigger?.kill();
    mainTimeline.kill();
  }
});
</script>

<template>
  <div class="sf-container">
    <header class="sf-header">
      <p>我们注重保护您的隐私</p>
    </header>
    <div class="sf-content">
      <div class="sf-content-media">
        <video
          src="../../assets/video/safe.mov"
          autoplay
          loop
          muted
          class="sf-content-media-video"
        ></video>
      </div>
      <div class="sf-content-desc">
        <header class="sf-content-desc-header">
          <p>重置你的应用</p>
        </header>
        <div class="sf-content-desc-content">
          <p>
            我们重视你的隐私和数据安全
            🛡，当比赛结束之后，点击右上角的系统重置按钮，我们会清空本地的所有数据，并且会为您同步登出
            🤗
          </p>
        </div>
        <footer class="sf-content-desc-footer">
          <div class="sf-content-desc-footer-bg">
            <header class="sf-content-desc-footer-bg-header">
              <div class="red"></div>
              <div class="yellow"></div>
              <div class="green"></div>
            </header>
            <main class="sf-content-desc-footer-bg-main">
              <div class="sf-content-desc-footer-bg-main-text">
                🤤系统从未如此通畅～
              </div>
              <div class="sf-content-desc-footer-bg-main-icon cookie">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="auto"
                  viewBox="0 -960 960 960"
                  width="auto"
                  fill="#1f1f1f"
                >
                  <path
                    d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25 17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"
                  />
                </svg>
              </div>
              <div class="sf-content-desc-footer-bg-main-icon storage">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="auto"
                  viewBox="0 -960 960 960"
                  width="auto"
                  fill="#1f1f1f"
                >
                  <path
                    d="M120-160v-160h720v160H120Zm80-40h80v-80h-80v80Zm-80-440v-160h720v160H120Zm80-40h80v-80h-80v80Zm-80 280v-160h720v160H120Zm80-40h80v-80h-80v80Z"
                  />
                </svg>
              </div>
              <div class="sf-content-desc-footer-bg-main-icon logout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="auto"
                  viewBox="0 -960 960 960"
                  width="auto"
                  fill="#1f1f1f"
                >
                  <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
                  />
                </svg>
              </div>
            </main>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.sf-content {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  padding-top: 2rem;

  &-media {
    width: 40%;
    aspect-ratio: 16/9;

    &-video {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      object-fit: cover;
      box-shadow: var(--box-shadow);
    }
  }
  &-desc {
    width: 40%;
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: var(--border-radius);
    background-color: var(--yellow-font-color);
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    padding-right: 1rem;
    &-header {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: var(--text-medium-size);
      color: var(--text-secondary-color);
    }

    &-content {
      width: 100%;
      height: 30%;
      display: flex;
      justify-content: start;
      color: var(--text-color);
      line-height: 1.5;
      font-weight: bold;
      font-size: var(--text-large-size);
    }

    &-footer {
      width: 100%;
      height: 50%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: end;

      &-bg {
        width: 60%;
        height: 90%;
        background-color: var(--text-color);
        display: flex;
        flex-direction: column;
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
        box-shadow: var(--box-shadow);

        &-header {
          width: 100%;
          height: 20%;
          display: flex;
          justify-content: start;
          align-items: center;
          padding-left: 0.5rem;
          gap: 0.5rem;

          & .red {
            width: 0.5rem;
            aspect-ratio: 1;
            background-color: red;
            border-radius: 50%;
          }

          & .yellow {
            width: 0.5rem;
            aspect-ratio: 1;
            background-color: yellow;
            border-radius: 50%;
          }
          & .green {
            width: 0.5rem;
            aspect-ratio: 1;
            background-color: green;
            border-radius: 50%;
          }
        }

        &-main {
          width: 100%;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          &-text {
            font-size: var(--text-large-size);
            width: fit-content;
            height: fit-content;
            position: relative;
            color: var(--bg-primary-color);
          }
          &-icon {
            width: 2rem;
            aspect-ratio: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            border-radius: 50%;

            & svg {
              fill: var(--bg-primary-color);
              width: 90% !important;
            }
          }
        }
      }
    }
  }
}

.sf-header {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-color);
}

.sf-container {
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
  position: relative;
  z-index: 1;
  contain: layout; /* 限制布局影响范围 */
  isolation: isolate; /* 创建新的堆叠上下文 */
}
</style>
