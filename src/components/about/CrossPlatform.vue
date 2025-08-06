<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { showHightLight } from "@/utils/showHighLight";

gsap.registerPlugin(ScrollTrigger);

let animations = [];

onMounted(async () => {
  await nextTick();

  // 延迟等待DOM完全渲染和路由过渡完成
  setTimeout(() => {
    initObservers();
    initAnimations();
  }, 300);
});

function initObservers() {
  const oj3Logo = document.querySelector(".sdutoj3-img");
  const oj3Text = document.querySelector(".sdutoj3-text");
  const container = document.querySelector(".content");

  // 确保元素存在再创建 Observer
  if (!oj3Logo || !oj3Text || !container) {
    console.warn("Elements not found, retrying...");
    setTimeout(initObservers, 100);
    return;
  }

  const containerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          oj3Logo.classList.add("oj3ImgAnim");
          oj3Text.classList.add("oj3TextAnim");
        } else {
          oj3Logo.classList.remove("oj3ImgAnim");
          oj3Text.classList.remove("oj3TextAnim");
        }
      });
    },
    { threshold: 0.1 }
  );

  containerObserver.observe(container);

  // 保存 observer 引用以便清理
  animations.containerObserver = containerObserver;

  showHightLight("cp");
}

onUnmounted(() => {
  // 清理 IntersectionObserver
  if (animations.containerObserver) {
    animations.containerObserver.disconnect();
  }

  // 清理所有GSAP动画和ScrollTrigger实例
  animations.forEach((anim) => {
    if (anim && typeof anim === "object" && anim.scrollTrigger) {
      anim.scrollTrigger.kill();
    }
    if (anim && typeof anim.kill === "function") {
      anim.kill();
    }
  });
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // 清理粒子效果
  document.querySelectorAll(".burst-particle").forEach((particle) => {
    particle.remove();
  });
});

function initAnimations() {
  // 设置初始状态
  gsap.set(".oj-client", {
    scale: 1,
    opacity: 1,
    zIndex: 10,
  });

  // 平台图片初始状态 - 隐藏在OJ客户端背后
  gsap.set(".linux", {
    scale: 0.3,
    opacity: 0,
    x: 0,
    y: 0,
    rotation: 0,
    zIndex: 1,
  });

  gsap.set(".windows", {
    scale: 0.3,
    opacity: 0,
    x: 0,
    y: 0,
    rotation: 0,
    zIndex: 1,
  });

  gsap.set(".macos", {
    scale: 0.3,
    opacity: 0,
    x: 0,
    y: 0,
    rotation: 0,
    zIndex: 1,
  });

  // 创建滚动触发的动画
  const platformAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".cp-container",
      start: "top 70%",
      end: "bottom 30%",
      scrub: false,
      toggleActions: "play none none reverse", // 进入播放，离开反向播放
      onEnter: () => {
        playBurstAnimation();
      },
      onLeave: () => {
        reverseBurstAnimation();
      },
      onEnterBack: () => {
        playBurstAnimation();
      },
      onLeaveBack: () => {
        reverseBurstAnimation();
      },
    },
  });

  animations.push(platformAnimation);
}

function playBurstAnimation() {
  gsap.to(".oj-client", {
    scale: 1.05,
    duration: 0.15,
    ease: "ease",
    yoyo: true,
    repeat: 1,
  });

  // 平台图片迸发动画 - 同时播放，更丝滑
  gsap.to(".linux", {
    scale: 1,
    opacity: 1,
    x: "-100%",
    y: "-50%",
    rotation: -15,
    duration: 0.5,
    ease: "ease",
    delay: 0.05,
  });

  gsap.to(".windows", {
    scale: 1,
    opacity: 1,
    x: "100%",
    y: "-50%",
    rotation: 15,
    duration: 0.5,
    ease: "ease",
    delay: 0.1,
  });

  gsap.to(".macos", {
    scale: 1,
    opacity: 1,
    x: 0,
    y: "-100%",
    rotation: 0,
    duration: 0.5,
    ease: "ease",
    delay: 0.15,
  });

  // 添加粒子效果
  createBurstEffect();
}

function reverseBurstAnimation() {
  // 清理可能存在的粒子
  document.querySelectorAll(".burst-particle").forEach((particle) => {
    particle.remove();
  });

  // OJ客户端回到原始状态 - 更快速
  gsap.to(".oj-client", {
    scale: 1,
    duration: 0.2,
    ease: "ease",
  });

  // 平台图片回收动画 - 同时播放，更丝滑
  gsap.to(".macos", {
    scale: 0.3,
    opacity: 0,
    x: 0,
    y: 0,
    rotation: 0,
    duration: 0.4,
    ease: "ease",
    delay: 0,
  });

  gsap.to(".windows", {
    scale: 0.3,
    opacity: 0,
    x: 0,
    y: 0,
    rotation: 0,
    duration: 0.4,
    ease: "ease",
    delay: 0.05,
  });

  gsap.to(".linux", {
    scale: 0.3,
    opacity: 0,
    x: 0,
    y: 0,
    rotation: 0,
    duration: 0.4,
    ease: "ease",
    delay: 0.1,
  });
}

function createBurstEffect() {
  document.querySelectorAll(".burst-particle").forEach((particle) => {
    particle.remove();
  });

  const container = document.querySelector(".footer");
  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.className = "burst-particle";
    particle.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, #4285f4, transparent);
      border-radius: 50%;
      pointer-events: none;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 15;
    `;
    container.appendChild(particle);

    // 随机方向的爆发动画 - 更快速和丝滑
    const angle = (i / 8) * Math.PI * 2;
    const distance = 80 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    gsap.fromTo(
      particle,
      {
        scale: 0,
        opacity: 1,
      },
      {
        x: x,
        y: y,
        opacity: 0,
        scale: 1.5,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.02,
        onComplete: () => {
          if (particle.parentNode) {
            particle.remove();
          }
        },
      }
    );
  }
}
</script>

<template>
  <div class="cp-container">
    <header class="title">
      <div class="title-cross">
        <span class="highlight cp-highlight">探索</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#1f1f1f"
        >
          <path
            d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm0-320Z"
          />
        </svg>
      </div>
      OJ 竞赛客户端
    </header>
    <div class="content">
      <section class="section">
        <header class="tag">跨平台兼容</header>
        <div class="desc">
          <p>
            基于 Electron 框架和 electron-builder 构建，同时支持 Windows、macOS
            和 Linux 系统，确保用户在不同平台上都能获得一致的体验。
          </p>
        </div>
        <footer class="footer footer-left">
          <img src="../../assets/images/favicon.png" class="oj-client" alt="" />
          <img src="../../assets/images/linux.png" class="linux" alt="" />
          <img src="../../assets/images/Windows.png" class="windows" alt="" />
          <img src="../../assets/images/macos.png" class="macos" alt="" />
        </footer>
      </section>
      <section class="section">
        <header class="tag">极致体验</header>
        <div class="desc">
          <p>
            基于 SDUT Online Judge 3
            的强大技术力支撑，提供流畅的用户体验和极高的响应速度。
          </p>
        </div>
        <footer class="footer">
          <p class="sdutoj3-text">SDUT Online Judge 3</p>
          <img
            src="../../assets/images/sdutoj3.ico"
            class="sdutoj3-img"
            alt=""
          />
        </footer>
      </section>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../assets/css/inline-style.less);

.oj3TextAnim {
  opacity: 1 !important;
  transform: translateY(-200%);
}

.oj3ImgAnim {
  opacity: 1 !important;
  transform: translateY(100%) scale(2.5);
}

.cp-container {
  width: 100%;
  height: 70vh;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 10rem;

  @media screen and (min-width: 1024px) and (max-height: 1000px) {
    margin-top: 30rem;
  }

  @media screen and (max-width: 480px) {
    margin-top: 20rem !important;
  }

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
    flex-wrap: wrap;
    &-cross {
      .inline-style(
        var(--blue-bg-color),
        var(--blue-font-color),
      );
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
      height: 80%;
      aspect-ratio: 4/3;
      border-radius: 2rem;
      overflow: hidden;

      @media screen and (min-width: 1024px) and (max-height: 1000px) {
         height: 100%;  
      }

      & .tag {
        width: 100%;
        height: 20%;
        display: flex;
        padding-left: 2rem;
        font-size: 2rem;
        font-weight: bold;
        justify-content: start;
        align-items: center;
      }

      & .desc {
        width: 100%;
        height: 30%;
        padding-left: 2rem;
        padding-right: 2rem;

        @media screen and (min-width: 1024px) {
          font-size: calc(var(--text-medium-size) * 1.3);
        }
      }
      & .footer {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: visible;

        &-left {
          align-items: end;

          @media screen and (max-width: 640px) {
            align-items: center;
          }
        }

        & img {
          width: 5rem;
          height: auto;
          position: absolute;
          transition: transform 0.2s ease;
          will-change: transform;

          @media screen and (max-width: 1000px) and (min-height: 1000px) {
            width: 6rem !important;
          }
        }

        & p {
          position: absolute;
          font-weight: bold;
          font-size: 1.5rem;
          color: var(--text-color);
        }

        .oj-client {
          z-index: 2;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }

        .linux {
          z-index: 1;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .windows {
          z-index: 1;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .macos {
          z-index: 1;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .sdutoj3-img {
          opacity: 0;
          transform-origin: center center;
          transition: all 0.5s ease;
          z-index: 6;
          filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
        }

        .sdutoj3-text {
          opacity: 0;
          z-index: 5;
          font-size: 1.5rem;
          white-space: nowrap;
          color: #000;
          transition: transform 0.5s ease, color 0.5s ease;
        }
      }

      &:nth-child(1) {
        background-color: #e8f0fe;
      }

      &:nth-child(2) {
        background-color: #fef7e0;
      }
    }
  }

  // 爆发粒子样式
  .burst-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
}

/* 响应式设计 */
@media (max-width: 1000px) {
  .cp-container {
    height: auto;
    min-height: 70vh;
    margin-top: 2rem;
    padding: 1rem;

    .title {
      height: auto;
      font-size: 3rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .content {
      flex-direction: column;
      height: auto;
      gap: 2rem;

      .section {
        width: 90%;
        height: auto;
        min-height: 300px;

        .tag {
          padding-left: 1rem;
          font-size: 1.5rem;
          height: auto;
          padding-top: 1rem;
          padding-bottom: 0.5rem;
        }

        .desc {
          padding: 0 1rem;

          p {
            font-size: var(--text-large-size);
            line-height: 1.5;
          }
        }

        .footer {
          height: 200px;

          img {
            width: 3rem;
          }

          p {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}

@media (max-width: 640px) and (min-height: 1000px) {
  .cp-container {
    padding: 0.5rem;
    margin-top: 10rem;
    .title {
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }

    .content {
      gap: 1rem;

      .section {
        width: 95%;
        min-height: 250px;
        border-radius: 1rem;

        .tag {
          font-size: 1.2rem;
          padding: 0.5rem;
          
        }

        .desc {
          padding: 0 0.5rem;

          p {
            font-size: var(--text-medium-size);
          }
        }

        .footer {
          // height: 150px;

          img {
            width: 10rem;
          }

          p {
            font-size: 1rem;
          }
        }
      }
    }
  }
}
</style>
