<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted, onUnmounted, nextTick } from "vue";
import { showHightLight } from "@/utils/showHighLight";

gsap.registerPlugin(ScrollTrigger);

let mainTl, headerTL;

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    showHightLight("ct");
    initAnimations();
  }, 0);
});

// 组件卸载时清理
onUnmounted(() => {
  if (mainTl) {
    mainTl.scrollTrigger?.kill();
    mainTl.kill();
  }
  if (headerTL) {
    headerTL.scrollTrigger?.kill();
    headerTL.kill();
  }
  // 清理所有ScrollTrigger实例
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});

function initAnimations() {
  // 设置初始状态
  gsap.set(".ct-content-mask p", {
    "--progress": "0%", // 初始进度为0
  });

  // 设置emoji初始状态 - 在图片中心位置
  gsap.set(".emoji-outer", {
    opacity: 0,
    scale: 0,
    x: 0,
    y: 0,
    rotation: 0,
  });

  // 设置后面元素的初始状态
  gsap.set(".ct-content-small", {
    opacity: 0, // 初始状态为隐藏
  });

  mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ct-container",
      start: "top top",
      end: "top -400%",
      scrub: 0.8,
      pin: ".ct-container",
      pinSpacing: true,
      anticipatePin: 1,
      refreshPriority: 0,
      pinReparent: false,
      normalizeScroll: true,
      ignoreMobileResize: true,
      invalidateOnRefresh: true,
      onRefreshInit: () => {
        gsap.set(".ct-container", { clearProps: "transform" });
      },
    },
  });

  // 创建一个对象来控制进度
  let progressObj = { value: 0 };

  // 主动画序列（包含emoji）
  mainTl
    .to(".ct-content", {
      duration: 1,
      y: "-10%",
      ease: "power2.out",
      force3D: true,
    })
    .to(
      ".ct-title",
      {
        duration: 0.5,
        opacity: 0,
        y: "100%",
        ease: "power2.out",
      },
      "-=1"
    ) // 与上一个动画同时开始
    .to(".ct-content .img1", {
      duration: 0.8,
      scale: 0.7,
      rotation: -5,
      x: 30,
      y: -20,
      ease: "power2.inOut",
      force3D: true,
    })
    .to(".ct-content .img1", {
      duration: 1.2,
      scale: 0.4,
      rotation: 15,
      x: -40,
      y: "-250%",
      opacity: 0.6,
      ease: "power2.inOut",
      force3D: true,
    })
    // img1向上移动时同时显示后面的元素
    .to(
      ".ct-content-small",
      {
        duration: 1.2, // 与img1移动时间同步
        opacity: 1,
        ease: "power2.out",
        force3D: true,
      },
      "-=1.2"
    ) // 与img1向上移动同时开始
    .to(
      ".ct-content-small .img2",
      {
        duration: 1,
        y: "-200%",
        ease: "power2.inOut",
        force3D: true,
      },
      "-=0.3"
    ) // 稍微调整重叠时间
    .to(
      progressObj,
      {
        duration: 1,
        value: 100,
        ease: "power2.inOut",
        onUpdate: function () {
          gsap.set(".ct-content-mask p", {
            "--progress": `${progressObj.value}%`,
          });
        },
      },
      "-=1"
    )
    // 添加emoji爆炸动画到主timeline
    .to(".emoji-outer", {
      duration: 0.3,
      opacity: 1,
      scale: 1,
      ease: "back.out(1.7)",
      stagger: 0.03,
      force3D: true,
    })
    .to(
      ".emoji-outer",
      {
        duration: 1.5,
        x: (index) => {
          const positions = [400, 350, -380, -420, 450, -300, 200, -480];
          return positions[index] || 200;
        },
        y: (index) => {
          const positions = [-250, 320, -300, 280, 100, 400, -420, -150];
          return positions[index] || -200;
        },
        rotation: (index) => {
          const rotations = [360, -360, 270, -270, 180, -180, 450, -450];
          return rotations[index] || 180;
        },
        ease: "power2.out",
        stagger: 0.03,
        force3D: true,
      },
      "-=0.2"
    )
    .to(
      ".emoji-outer",
      {
        duration: 0.8,
        opacity: 0,
        scale: 0.2,
        ease: "power2.in",
        stagger: 0.03,
      },
      "-=0.5"
    );
}
</script>

<template>
  <div class="ct-container">
    <header class="ct-title">
      随心
      <div class="ct-title-custom">
        <span class="highlight ct-highlight">定制</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            class="p"
            d="M440-80q-33 0-56.5-23.5T360-160v-160H240q-33 0-56.5-23.5T160-400v-280q0-66 47-113t113-47h480v440q0 33-23.5 56.5T720-320H600v160q0 33-23.5 56.5T520-80h-80ZM240-560h480v-200h-40v160h-80v-160h-40v80h-80v-80H320q-33 0-56.5 23.5T240-680v120Zm0 160h480v-80H240v80Zm0 0v-80 80Z"
          />
        </svg>
      </div>
      ，跟随系统主题
    </header>
    <div class="ct-content">
      <img src="../../assets/images/dark-enter.png" class="img1" alt="" />
      <div class="ct-content-small">
        <img src="../../assets/images/dark-home.png" class="img2" alt="" />
        <img src="../../assets/images/light-home.png" class="img3" alt="" />
        <div class="ct-content-mask">
          <p>SDUT OJ Competition Side Client</p>
        </div>
      </div>
      <!-- Emoji 外围容器 - 在图片外部 -->
      <div class="emoji-outer-container">
        <span class="emoji-outer emoji-outer-1">🎉</span>
        <span class="emoji-outer emoji-outer-2">✅</span>
        <span class="emoji-outer emoji-outer-3">🎊</span>
        <span class="emoji-outer emoji-outer-4">✨</span>
        <span class="emoji-outer emoji-outer-5">🌟</span>
        <span class="emoji-outer emoji-outer-6">🎯</span>
        <span class="emoji-outer emoji-outer-7">💫</span>
        <span class="emoji-outer emoji-outer-8">🔥</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../assets/css/inline-style.less);
.ct-content-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 4rem;
  z-index: 4;
  text-align: center;

  & p {
    margin: 0;
    background: linear-gradient(
      to right,
      #000 0%,
      #000 var(--progress, 0%),
      #fff var(--progress, 0%),
      #fff 100%
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    --progress: 0%;
  }
}

.emoji-outer-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 20;
}

.emoji-outer {
  position: absolute;
  font-size: 3rem;
  opacity: 0;
  transform: scale(0);
  will-change: transform, opacity;

  top: 50%;
  left: 50%;
  transform-origin: center center;
  margin-left: -1.5rem;
  margin-top: -1.5rem;
}

.ct-container {
  width: 100vw;
  height: 90vh;
  position: relative;
  left: 0;
  top: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: visible;
  contain: layout style;
  isolation: isolate;
  will-change: transform;
  margin-top: 3rem !important;

  & .ct-title {
    width: 100%;
    height: 100px;
    min-height: 60px;
    font-size: 3rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    box-sizing: border-box;
    will-change: opacity;

    &-custom {
      .inline-style(
        var(--pink-bg-color),
        var(--pink-font-color),
      );
    }
  }

  & .ct-content {
    width: 800px;
    max-width: 100vw;
    height: calc(100vh - 100px);
    border-radius: var(--border-radius);
    position: relative;
    transform-origin: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    box-sizing: border-box;
    will-change: transform;

    & .img1 {
      position: absolute;
      width: auto;
      height: 80%;
      display: block;
      object-fit: contain;
      backface-visibility: hidden;
      z-index: 5;
      will-change: transform;
    }
    &-small {
      position: absolute;
      aspect-ratio: 16/9;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        display: block;
        backface-visibility: hidden;
        will-change: transform;
        &:nth-child(1) {
          z-index: 2;
        }
        &:nth-child(2) {
          z-index: 1;
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .ct-container {
    height: auto;
    min-height: 80vh;
    padding: 1rem;
    
    .ct-title {
      font-size: 3rem;
      height: auto;
      text-align: center;
      padding: 1rem 0;
    }
    
    .ct-content {
      width: 100%;
      height: 50vh;
      
      .img1 {
        height: 100%;
      }
      
      &-small {
        height: 100%;
      }
      
      &-mask {
        font-size: 2rem;
      }
    }
    
    .emoji-outer {
      font-size: 2rem;
    }
  }
}

@media (max-width: 640px) {
  .ct-container {
    padding: 0.5rem;
    
    .ct-title {
      flex-wrap: wrap;
    }
    
    .ct-content {
      width: 95%;
      height: 40vh;
      
      .img1 {
        height: 60%;
      }
      
      &-small {
        height: 60%;
      }
      
      &-mask {
        font-size: 1.2rem;
        
        p {
          text-align: center;
          line-height: 1.2;
        }
      }
    }
    
    .emoji-outer {
      font-size: 1.5rem;
    }
  }
}
</style>
