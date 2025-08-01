<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const whiteRoute = document.querySelector(".w-d");
  let whiteRouteHide = false;
  const WhiteHeaderAndText = [...document.querySelectorAll(".w-h")];
  const WhiteRouteIndicators = document.querySelectorAll(
    ".white-route-indicator"
  );
  whiteRoute.addEventListener("click", () => {
    if (whiteRouteHide) {
      WhiteHeaderAndText.forEach((item) => {
        item.classList.remove("header-text-fade");
      });
      WhiteRouteIndicators.forEach((item) => {
        item.classList.remove("white-route-indicator-fade");
      });
      whiteRouteHide = false;
    } else {
      WhiteHeaderAndText.forEach((item) => {
        item.classList.add("header-text-fade");
      });
        WhiteRouteIndicators.forEach((item) => {
            item.classList.add("white-route-indicator-fade");
        });
      whiteRouteHide = true;
    }
  });
});
</script>

<template>
  <div class="sf-container">
    <header class="sf-header">为您提供更加专注的比赛环境</header>
    <div class="sf-content">
      <div class="sf-content-desc w-d">
        <header class="sf-content-desc-header w-h">路由白名单拦截</header>
        <div class="sf-content-desc-text w-h">
          <p>
            我们采取白名单拦截机制，让您更加专注于比赛内容，避免被无关页面干扰。
          </p>
        </div>
        <div class="sf-content-desc-footer white-route w-c">
          <div class="white-route-container">
            <div class="white-route-indicator">✅ https://www.example.com</div>
            <div class="white-route-indicator">✅ https://www.example.com</div>
            <div class="white-route-indicator white-route-indicator-large">
              <p>https://www.example.com</p>
              <img src="../../assets/images/cursor.png" alt="" />
            </div>
          </div>
          <div class="white-route-footer white-route">
            <div class="white-route-header"></div>
            <div class="white-route-desc"></div>
        </div>
        </div>
      </div>
      <div class="sf-content-desc">
        <header class="sf-content-desc-header">重定向拦截</header>
        <div class="sf-content-desc-text">
          <p>拦截非法的重定向跳转，但您仍可以在合法页面尽情探索！</p>
        </div>
        <div class="sf-content-desc-footer redirect-route"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.white-route {
  position: relative;
  color: #000;
  -webkit-user-drag: none;
  &-container {
    width: 100%;
    position: absolute;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding-left: 3rem;
    gap: 1rem;
  }

  &-indicator {
    width: 55%;
    aspect-ratio: 4/1;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);
    transition: all 0.5s ease;
    &:nth-child(1) {
      transition-delay: 0.2s;
    }
    &:nth-child(2) {
      transition-delay: 0.1s;
    }
    &-large {
      width: 60%;
      aspect-ratio: 3/1;
      position: absolute;
      top: 45%;
      left: 30%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

      & img {
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 20%;
        transform: translate(20%, 50%) scale(1);
        transform-origin: center center;
        transition: transform 0.5s ease;
      }

      &::before {
        content: "🤫";
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: fit-content;
        height: fit-content;
        font-size: 3rem;
        transform: translate(-40%, 30%) rotate(-10deg);
        transform-origin: center center;
    }
    }
  }
}

.header-text-fade {
  opacity: 0;
  transform: translateY(-5rem);
}

.white-route-indicator-fade {
  opacity: 0;
  transform: translateY(10rem);
}

.sf-container {
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-primary-color);
}

.sf-header {
  width: 100%;
  height: 10%;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sf-content {
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  &-desc {
    height: 90%;
    aspect-ratio: 1;
    padding: 1rem;
    user-select: none;
    cursor: pointer;
    overflow: hidden;

    &:nth-child(1) {
      color: var(--bg-primary-color);
      background-color: var(--blue-font-color);

      &:hover {
        .white-route-indicator-large img{
            transform: translate(20%, 50%) scale(1.2);
        }
      }
    }

    &:nth-child(2) {
      color: var(--text-color);
      background-color: var(--blue-bg-color);
    }
    border-radius: var(--border-radius);

    &-header {
      font-size: var(--text-medium-size);
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: start;
      align-items: center;
      transition: all 0.5s ease;
    }

    &-text {
      font-size: var(--text-large-size);
      width: 100%;
      height: 30%;
      line-height: 1.5;
      font-weight: 700;
      transition: all 0.5s ease;
      transition-delay: 0.1s;
    }

    &-footer {
      width: 100%;
      height: 60%;
      display: flex;
      // background-color: red;
    }
  }
}
</style>
