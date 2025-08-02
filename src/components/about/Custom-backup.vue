<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted, onUnmounted, nextTick } from "vue";

gsap.registerPlugin(ScrollTrigger);

let mainTl, headerTL;

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
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
});

function initAnimations() {
  // 设置初始状态
  gsap.set(".ct-content-mask p", {
    "--progress": "0%" // 初始进度为0
  });

  // 设置emoji初始状态 - 在图片中心位置
  gsap.set(".emoji-outer", {
    opacity: 0,
    scale: 0
  });

  mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ct-container",
      start: "top 10%",
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

  headerTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".ct-title",
      start: "top 10%",
      end: "top 15%",
      scrub: 0.5,
      refreshPriority: 0,
    },
  });

  headerTL.to(".ct-title", {
    duration: 0.5,
    opacity: 0,
    ease: "power2.out",
    force3D: true,
  });

  // 创建一个对象来控制进度
  let progressObj = { value: 0 };

  // 主动画序列
  mainTl
    .to(".ct-content", {
      duration: 1,
      y: "-10%",
      ease: "power2.out",
      force3D: true,
    })
    .to(".ct-content .img1", {
      duration: 0.5,
      scale: 2,
      ease: "power2.inOut",
      force3D: true,
    })
    .to(".ct-content .img1", {
      duration: 1,
      y: "-200%",
      ease: "power2.inOut",
      force3D: true,
    })
    .to(".ct-content-small .img2", {
      duration: 1,
      y: "-200%",
      ease: "power2.inOut",
      force3D: true,
    })
    .to(progressObj, {
      duration: 1,
      value: 100,
      ease: "power2.inOut",
      onUpdate: function() {
        gsap.set(".ct-content-mask p", {
          "--progress": `${progressObj.value}%`
        });
      }
    }, "-=1")
    // 添加emoji爆炸动画，跟随滚动
    .to(".emoji-outer", {
      duration: 0.5,
      opacity: 1,
      scale: 1,
      ease: "back.out(1.7)",
      stagger: 0.05, // 错开出现时间
      force3D: true,
    })
    .to(".emoji-outer", {
      duration: 1.5,
      motionPath: {
        path: function(index) {
          // 计算每个emoji的迸发方向
          const angles = [0, 45, 90, 135, 180, 225, 270, 315]; // 8个方向
          const angle = angles[index % 8];
          const radian = (angle * Math.PI) / 180;
          const distance = 200 + Math.random() * 100; // 随机距离
          
          const targetX = Math.cos(radian) * distance;
          const targetY = Math.sin(radian) * distance;
          
          return `M0,0 Q${targetX/2},${targetY/2} ${targetX},${targetY}`;
        }
      },
      rotation: "360_short",
      ease: "power2.out",
      stagger: 0.05,
      force3D: true,
    }, "-=0.3")
    .to(".emoji-outer", {
      duration: 0.5,
      opacity: 0,
      scale: 0.5,
      ease: "power2.in",
      stagger: 0.05,
    }, "-=0.5");
}
</script>

<template>
  <div class="ct-container">
    <header class="ct-title">随心定制，跟随系统主题</header>
    <div class="ct-content">
      <img src="../../assets/images/dark-home.png" class="img1" alt="" />
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
  
  & p {
    margin: 0;
    background: linear-gradient(to right, #000 0%, #000 var(--progress, 0%), #fff var(--progress, 0%), #fff 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    --progress: 0%;
  }
}

/* Emoji 外围容器 - 覆盖整个视口 */
.emoji-outer-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10; /* 在所有元素之上 */
}

.emoji-outer {
  position: absolute;
  font-size: 2.5rem;
  opacity: 0;
  transform: scale(0);
  will-change: transform, opacity;
  
  /* 初始位置在屏幕中心（图片中心位置） */
  top: 50%;
  left: 50%;
  transform-origin: center center;
}

.ct-container {
  width: 100vw;
  height: 100vh;
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

  & .ct-title {
    width: 100%;
    height: 60px;
    min-height: 60px;
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    box-sizing: border-box;
    will-change: opacity;
  }

  & .ct-content {
    width: 800px;
    max-width: 100vw;
    height: calc(100vh - 60px);
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
</style>
