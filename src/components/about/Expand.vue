<script setup>
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  gsap.set(".ep-title-content header", { opacity: 0, y: -50 });
  gsap.set(".ep-title-content p", { opacity: 0, y: -50 });
  gsap.set(".ep-content-svgs-container:nth-child(1)", {
    opacity: 0,
    x: -350,
    y: 0,
  });
  gsap.set(".ep-content-svgs-container:nth-child(2)", {
    opacity: 0,
    x: 250,
    y: -150,
  });
  gsap.set(".ep-content-svgs-container:nth-child(3)", {
    opacity: 0,
    x: 0,
    y: -200,
  });
  gsap.set(".ep-content-svgs-container:nth-child(4)", {
    opacity: 0,
    x: 50,
    y: 150,
  });
  gsap.set(".ep-content-svgs-container:nth-child(5)", {
    opacity: 0,
    x: 250,
    y: 100,
  });

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ep-container",
      start: "top center",
      end: "bottom bottom",
      scrub: 1,
    },
  });

  let svgTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".ep-container",
      start: "top center",
      end: "top 70%",
      scrub: 1,
    },
  });

  tl.to(".ep-title-content header", {
    duration: 0.5,
    opacity: 1,
    y: 0,
    ease: "linear",
  }).to(".ep-title-content p", {
    duration: 0.5,
    opacity: 1,
    y: 0,
    ease: "linear",
  });

  svgTl.to(".ep-content-svgs-container:nth-child(1)", {
    duration: 0.5,
    opacity: 1,
    x: -400,
    y: -50,
    ease: "linear",
  });
  svgTl.to(
    ".ep-content-svgs-container:nth-child(2)",
    {
      duration: 0.5,
      opacity: 1,
      x: 300,
      y: -200,
      ease: "linear",
    },
    "<"
  );
  svgTl.to(
    ".ep-content-svgs-container:nth-child(3)",
    {
      duration: 0.5,
      opacity: 1,
      x: 0,
      y: -250,
      ease: "linear",
    },
    "<"
  );
  svgTl.to(
    ".ep-content-svgs-container:nth-child(4)",
    {
      duration: 0.5,
      opacity: 1,
      x: -100,
      y: 200,
      ease: "linear",
    },
    "<"
  );
  svgTl.to(
    ".ep-content-svgs-container:nth-child(5)",
    {
      duration: 0.5,
      opacity: 1,
      x: 300,
      y: 150,
      ease: "linear",
    },
    "<"
  );
});
</script>

<template>
  <div class="ep-container">
    <div class="ep-title">
      <div class="ep-title-content">
        <header>拓展您的体验</header>
        <p>
          我们定制了 Electron 应用默认的菜单栏和导航栏，更加贴合原生的浏览器设计，并且搭载了系统信息、系统重置按钮，让您拥有在浏览器一致的体验。
        </p>
      </div>
    </div>
    <div class="ep-content">
      <div class="ep-content-svgs">
        <div class="ep-content-svgs-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-arrow-left-icon lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </div>

        <div class="ep-content-svgs-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-arrow-right-icon lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>

        <div class="ep-content-svgs-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-rotate-cw-icon lucide-rotate-cw"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </div>
        <div class="ep-content-svgs-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-house-icon lucide-house"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path
              d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
            />
          </svg>
        </div>

        <div class="ep-content-svgs-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-info-icon lucide-info"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
      </div>
      <img src="../../assets/images/dark-home.png" alt="" />
    </div>
  </div>
</template>

<style scoped lang="less">
.ep-container {
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  & .ep-title {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    &-content {
      width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      padding: 2rem;
      position: relative;
      & header {
        font-size: 2rem;
        color: var(--text-color);
        font-weight: bold;
        transition: transform 0.5s linear, opacity 0.5s linear;
      }

      & p {
        font-size: var(--text-medium-size);
        color: var(--text-color);
        margin-top: 1rem;
        transition: transform 0.5s linear, opacity 0.5s linear;
      }
    }
  }

  & .ep-content {
    width: 50%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;

    &-svgs {
      width: 70%;
      aspect-ratio: 16/9;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;

      &-container {
        width: 4rem;
        aspect-ratio: 1/1;
        // background-color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;

        &:nth-child(1) {
          background-color: #aecbfa;
          & svg {
            stroke: #174ea6;
          }
        }
        &:nth-child(2) {
          background-color: #f6aea9;
          & svg {
            stroke: #e50eae;
          }
        }

        &:nth-child(3) {
          background-color: #fde293;
          & svg {
            stroke: #f9a800;
          }
        }
        &:nth-child(4) {
          background-color: #a8dba5;
          & svg {
            stroke: #0f9d58;
          }
        }
        &:nth-child(5) {
          background-color: #fefefe;
        }



        & svg {
          width: 50% !important;
          aspect-ratio: 1;
          stroke-width: 0.1rem;
        }
      }
    }

    & img {
      width: 70%;
      aspect-ratio: 16/9;
      object-fit: contain;
    }
  }
}
</style>
