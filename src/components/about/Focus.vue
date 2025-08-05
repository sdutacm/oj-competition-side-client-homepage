<script setup>
import { onMounted } from "vue";
import { showHightLight } from "@/utils/showHighLight";

onMounted(() => {
  showHightLight("fc");
  const whiteRoute = document.querySelector(".w-d");
  let whiteRouteHide = false;
  const WhiteHeaderAndText = [...document.querySelectorAll(".w-h")];
  const WhiteRouteIndicators = document.querySelectorAll(
    ".white-route-indicator"
  );
  const whiteRouteDescription = document.querySelector(
    ".white-route-description"
  );
  whiteRoute.addEventListener("click", () => {
    if (whiteRouteHide) {
      WhiteHeaderAndText.forEach((item) => {
        item.classList.remove("header-text-fade");
      });
      WhiteRouteIndicators.forEach((item) => {
        item.classList.remove("white-route-indicator-fade");
      });
      setTimeout(() => {
        whiteRouteDescription.classList.remove("white-route-description-show");
      }, 100);
      whiteRouteHide = false;
    } else {
      whiteRouteDescription.classList.add("white-route-description-show");

      setTimeout(() => {
        WhiteHeaderAndText.forEach((item) => {
          item.classList.add("header-text-fade");
        });
        WhiteRouteIndicators.forEach((item) => {
          item.classList.add("white-route-indicator-fade");
        });
      }, 0);
      whiteRouteHide = true;
    }
  });
  const RedirectRoute = document.querySelector(".redirect-route");
  let redirectRouteHide = false;
  const ReidrectHeaderAndText = [...document.querySelectorAll(".r-h")];
  const RedirectFooter = document.querySelector(".r-f");
  const RedirectRouteDescription = document.querySelector(
    ".redirect-route-description"
  );
  RedirectRoute.addEventListener("click", () => {
    if (redirectRouteHide) {
      ReidrectHeaderAndText.forEach((item) => {
        item.classList.remove("header-text-fade");
      });
      RedirectFooter.classList.remove("white-route-indicator-fade");
      setTimeout(() => {
        RedirectRouteDescription.classList.remove(
          "white-route-description-show"
        );
      }, 100);
      redirectRouteHide = false;
    } else {
      setTimeout(() => {
        ReidrectHeaderAndText.forEach((item) => {
          item.classList.add("header-text-fade");
        });
        RedirectFooter.classList.add("white-route-indicator-fade");
      }, 100);
      RedirectRouteDescription.classList.add("white-route-description-show");
      redirectRouteHide = true;
    }
  });
});
</script>

<template>
  <div class="fc-container">
    <header class="fc-header">
      为您提供更加
      <div class="fc-header-focus">
        <span class="highlight fc-highlight">专注</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#1f1f1f"
        >
          <path
            d="M440-42v-80q-125-14-214.5-103.5T122-440H42v-80h80q14-125 103.5-214.5T440-838v-80h80v80q125 14 214.5 103.5T838-520h80v80h-80q-14 125-103.5 214.5T520-122v80h-80Zm40-158q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-120q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0-80Z"
          />
        </svg>
      </div>
      的比赛环境
    </header>
    <div class="fc-content">
      <div class="fc-content-desc w-d" style="color: #fff">
        <header class="fc-content-desc-header w-h">路由白名单拦截</header>
        <div class="fc-content-desc-text w-h">
          <p>
            我们采取白名单拦截机制，让您更加专注于比赛内容，避免被无关页面干扰。
          </p>
        </div>
        <div class="fc-content-desc-footer white-route w-c">
          <div class="white-route-container">
            <div class="white-route-indicator">✅ https://www.example.com</div>
            <div class="white-route-indicator">✅ https://www.example.com</div>
            <div class="white-route-indicator white-route-indicator-large">
              <p>🚫 https://www.example.com</p>
              <img src="../../assets/images/cursor.png" alt="" />
            </div>
          </div>
        </div>
        <div class="white-route-description">
          <header class="white-route-description-header">
            <div class="white-route-description-header-title">
              比赛模式已开启，请专心答题！
            </div>
            <div class="white-route-description-header-subtitle">
              <div class="white-route-description-header-subtitle-text">
                访问限制：https://www.example.com
              </div>
              <div class="white-route-description-header-subtitle-text">
                限制说明：该域名不在允许访问范围
              </div>
            </div>
            <div class="white-route-description-header-divider">
              专注比赛才能发挥更佳水平！
            </div>
            <div class="white-route-description-header-button">
              了解，继续答题！
            </div>
          </header>
          <main class="white-route-description-main">
            <p>
              当用户点击了非白名单链接时，将会触发弹窗拦截机制，用户可以简单地点击确认按钮来关闭弹窗，避免被无关页面干扰。
            </p>
          </main>
        </div>
      </div>
      <div class="fc-content-desc redirect-route" style="color: #000">
        <header class="fc-content-desc-header r-h">重定向拦截</header>
        <div class="fc-content-desc-text r-h">
          <p>拦截非法的重定向跳转，但您仍可以在合法页面尽情探索！</p>
        </div>
        <div class="fc-content-desc-footer redirect-route r-f">
          <div class="redirect-route-container">
            <div class="redirect-route-container-indicator">
              🚫 https://www.example.com
            </div>
            <div class="redirect-route-container-indicator">
              ✅ https://www.example.com
            </div>
            <img
              src="../../assets/images/redirect.png"
              class="redirect-route-container-icon"
              alt=""
            />
          </div>
        </div>
        <div class="redirect-route-description">
          <header class="redirect-route-description-header">
            <div class="redirect-route-description-header-title">
              <div class="red"></div>
              <div class="yellow"></div>
              <div class="green"></div>
            </div>
            <div class="redirect-route-description-header-content">
              <main class="redirect-route-description-header-content-main">
                <header
                  class="redirect-route-description-header-content-main-title"
                >
                  页面重定向被拦截，保护你的比赛环境！
                </header>
                <div
                  class="redirect-route-description-header-content-main-subtitle"
                >
                  <p>
                    检测到页面发生重定向，目标网站：oj.sdutacm.cn 已被系统拦截！
                  </p>
                  <p>原因：非法重定向拦截，已自动回退主页。</p>
                </div>
                <aside
                  class="redirect-route-description-header-content-main-aside"
                >
                  <p>比赛期间请勿访问非指定网站，祝你取得好成绩！</p>
                </aside>
                <div
                  class="redirect-route-description-header-content-main-button"
                >
                  <p>收到，加油比赛！</p>
                </div>
              </main>
            </div>
          </header>
          <main class="redirect-route-description-main">
            <p>
              当选手不小心触发了重定向的网页后，不用担心，我们仍然会为你拦截非法的重定向跳转，但是会保留跳转之前的合法连接，您可以尽情浏览任何在白名单内的网页！
            </p>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url(../../assets/css/inline-style.less);

.redirect-route-description {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  transform: translateY(5rem);
  opacity: 0;
  transition: all 0.5s ease;
  &-header {
    width: 60%;
    height: 50%;
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    background-color: var(--bg-primary-color);
    @media screen and (max-width: 1024px) {
      width: 90%;
    }

    @media screen and (max-width: 640px) {
      width: 90%;
      height: 70%;
    }

    &::after {
      content: "😲";
      position: absolute;
      right: 0;
      top: 0;
      font-size: 3rem;
      transform: translateX(50%);
    }
    &-title {
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 0.2rem;
      padding-left: 0.5rem;
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
      & div {
        height: 40%;
        aspect-ratio: 1;
        border-radius: 50%;
        &.red {
          background-color: #ff5f57;
        }
        &.yellow {
          background-color: #f3bc2e;
        }
        &.green {
          background-color: #28c840;
        }
      }
    }

    &-content {
      width: 100%;
      height: 90%;
      display: flex;
      justify-content: center;
      align-items: center;

      &-main {
        width: 80%;
        aspect-ratio: 4/3;
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        @media screen and (max-width: 1024px) {
          width: 70%;
          height: 70%;
        }
        &-title {
          width: 100%;
          height: 20%;
          display: flex;
          justify-content: start;
          align-items: center;
          font-size: var(--text-medium-size);

          @media screen and (max-width: 1024px) {
            font-size: var(--text-large-size);
          }

          @media screen and (max-width: 640px) {
            height: fit-content;
            font-size: calc(var(--text-small-size));
          }
        }

        &-subtitle {
          width: 100%;
          height: 40%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          @media screen and (max-width: 640px) {
            height: fit-content;
          
          }
          & p {
            width: 100%;
            height: fit-content;
            display: flex;
            justify-content: start;
            font-size: var(--text-small-size);

            @media screen and (max-width: 640px) {
              font-size: calc(var(--text-small-size) - 2px);
            }
          }
        }

        &-aside {
          width: 100%;
          height: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: var(--text-small-size);

          @media screen and (max-width: 640px) {
            height: fit-content;
            font-size: calc(var(--text-small-size) );
          }
        }

        &-button {
          width: 70%;
          height: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--blue-font-color);
          color: #fff;
          font-size: var(--text-small-size);
          border-radius: 3rem;
          margin-top: 1rem;

          @media screen and (max-width: 640px) {
            height: fit-content;
            padding: 0.5rem 1rem;
            font-size: calc(var(--text-small-size) - 2px);
          }
        }
      }
    }
  }

  &-main {
    width: 60%;
    height: fit-content;
    line-height: 1.5;
    color: #000;
    font-size: var(--text-medium-size);

    @media screen and (max-width: 640px) {
      width: 90%;
      height: fit-content;
      font-size: calc(var(--text-small-size) - 2px);
    }
  }
}

.redirect-route-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #000;
  @media screen {
    @media (max-width: 640px) {
      height: 20rem;
    }
  }
  &-icon {
    position: absolute;
    width: 20%;
    left: 10%;
    top: 5%;
    transition: transform 0.5s ease;
    transform-origin: center center;
  }

  &-indicator {
    width: 60%;
    height: 25%;
    position: absolute;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-size: 14px;
    @media screen and (max-width: 1024px) {
      width: 50%;
      height: fit-content;
      padding-top: 2rem;
      padding-bottom: 2rem;
    }

    @media (max-width: 640px) {
      width: fit-content;
      height: fit-content !important;
      padding: 1rem;
      font-size: var(--text-small-size);
    }

    &:nth-child(1) {
      background-color: white;
      transform: translate(-10%, 20%) scale(1);
      z-index: 1;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      transition: all 0.5s ease;

      @media screen and (max-width: 1024px) {
        transform: translate(-10%, 300%) scale(1) !important;
      }


      @media (max-width: 640px) {
        transform: translate(-5%, 20%) scale(1) !important;
        background-color: white !important;
        background: white !important;
        z-index: 10 !important;
      }

      &::after {
        content: "😵‍💫";
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 3rem;
        transform: translate(20%, 50%) rotate(10deg);

        @media (max-width: 640px) {
          font-size: 24px !important;
        }
      }
    }

    &:nth-child(2) {
      background-color: rgba(227, 227, 227, 0.837);
      background: rgba(227, 227, 227, 0.837);
      transform: translate(10%, -50%);

      @media  screen and (max-width: 1024px) {
        transform: translate(10%, 200%) scale(1) !important;        
      }

      @media (max-width: 640px) {
        background-color: rgba(227, 227, 227, 0.837) !important;
      }
    }
  }
}

.white-route-description {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  left: 0;
  top: 0;
  gap: 2rem;
  opacity: 0;
  transform: translateY(5rem);
  transition: all 0.5s ease;

  @media screen and (max-width: 640px) {
    gap: 1rem;
  }

  &-header {
    width: 60%;
    height: 50%;
    background-color: var(--blue-bg-color);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-left: 1rem;

    @media screen and (max-width: 640px) {
      width: 90%;
    }
    &-title {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: start;
      align-items: center;
      font-weight: 700;
      color: #fff;
      font-size: var(--text-medium-size);
    }

    &-subtitle {
      width: 100%;
      height: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media screen and (max-width: 640px) {
        height: fit-content;
        font-size: var(--text-small-size);
      }
      &-text {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: start;
        color: #fff;
        font-size: var(--text-small-size);
      }
    }

    &-divider {
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: var(--text-small-size);
      color: #fff;
    }

    &-button {
      width: 70%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--blue-font-color);
      color: #fff;
      font-size: var(--text-small-size);
      border-radius: 3rem;
      margin-top: 2rem;

      @media screen and (max-width: 640px) {
        height: fit-content;
        margin: 1rem;
        padding: 0.5rem 0;
      }
    }
  }

  &-main {
    width: 65%;
    height: fit-content;
    font-size: var(--text-medium-size);
    line-height: 1.5;

    @media screen and (max-width: 640px) {
      width: 90%;
      font-size: var(--text-small-size);
      line-height: 1.4;
    }
  }
}

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

    @media screen and (min-width: 1024px) and (max-height: 1000px) {
      height: 30rem;
      
    }
    @media screen and (max-width: 640px) {
      height: 15rem;
    }
  }

  &-indicator {
    width: fit-content;
    height: fit-content;
    padding: 1rem;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius);

    @media screen and (min-width: 1024px) and (max-height: 1000px) {
      width: 60%;
      height: 20%;
    }

    transition: all 0.5s ease;
    &:nth-child(1) {
      transition-delay: 0.2s;
    }
    &:nth-child(2) {
      transition-delay: 0.1s;
    }
    &-large {
      position: absolute;
      top: 45%;
      left: 30%;
      padding: 1rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

      @media screen and (min-width: 1024px) and (max-height: 1000px) {
        top: 40% !important;
        left: 20%;
      }
      white-space: nowrap;

      @media screen and (max-width: 640px) {
        left: 20%;
        top: 65% !important;
      }

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

.white-route-description-show {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.fc-container {
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-primary-color);
  margin-bottom: 5rem;
}

.fc-header {
  width: 100%;
  height: 10%;
  font-size: 3rem;
  font-weight: 700;
  display: flex;
  color: var(--text-color);
  justify-content: center;
  align-items: center;

  &-focus {
    .inline-style(
      var(--blue-bg-color),
      var(--blue-font-color)
    );
  }
}

.fc-header-show {
  transform: translateY(0) !important;
  opacity: 1 !important;
}

.fc-content {
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  &-desc {
    height: 90%;
    aspect-ratio: 1;
    padding: 1.5rem;
    user-select: none;
    cursor: pointer;
    position: relative;

    &:nth-child(1) {
      color: var(--bg-primary-color);
      background-color: var(--blue-font-color);

      &:hover {
        .white-route-indicator-large img {
          transform: translate(20%, 50%) scale(1.2);
        }
      }
    }

    &:nth-child(2) {
      color: var(--text-color);
      background-color: var(--blue-bg-color);

      @media screen and (max-width: 640px) {
        // margin-top: 2rem; 
        aspect-ratio: 2/2.5;       
      }

      &:hover {
        .redirect-route-container-icon {
          transform: rotate(-10deg) scale(1.1);
        }

        .redirect-route-container {
          &-indicator:nth-child(1) {
            transform: scale(1.1) translate(-10%, 20%);
          }
        }
      }
    }
    border-radius: var(--border-radius);

    &-header {
      font-size: var(--text-medium-size);
      width: 100%;
      height: 15%; // 增加header高度
      display: flex;
      justify-content: start;
      align-items: center;
      transition: all 0.5s ease;
    }

    &-text {
      // background-color: red;
      font-size: var(--text-large-size);
      width: 100%;
      height: 35%; 
      line-height: 1.5; 
      font-weight: 700;
      transition: all 0.5s ease;
      transition-delay: 0.1s;
      display: flex;
      align-items: flex-start; // 文字从顶部开始
    }

    &-footer {
      width: 100%;
      height: 50%; // 减少footer高度给文字更多空间
      display: flex;
      transition: all 0.5s ease;
    }
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .white-route-indicator-large {
    top: 100%;
  }

  .fc-container {
    height: auto;
    min-height: 50vh;
    flex-direction: column;
    margin-bottom: 4rem;
    padding: 2rem 1rem;
  }

  .fc-header {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
  }

  .fc-content {
    width: 95%;
    gap: 1.5rem;
    flex-direction: column; // 确保垂直排列

    &-desc {
      width: 90%;
      aspect-ratio: 4/3;
      padding: 1rem;

      &-header {
        font-size: var(--text-medium-size);
        height: auto;
        padding: 0.5rem 0;
      }

      &-text {
        font-size: var(--text-large-size);
        height: auto;
        margin-bottom: 1rem;
        line-height: 1.4;
      }

      &-footer {
        height: auto;
        min-height: 200px; // 增加最小高度，原来是180px
      }
    }
  }
}

@media (max-width: 640px) {
  .fc-container {
    padding: 1rem 0.5rem;
    margin-bottom: 2rem;
  }

  .fc-header {
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .fc-content {
    width: 98%;
    gap: 1rem;

    &-desc {
      width: 95%;
      aspect-ratio: 1/1;
      padding: 0.8rem;

      &-header {
        font-size: var(--text-small-size);
        padding: 0.3rem 0;
      }

      &-text {
        font-size: var(--text-medium-size);
        margin-bottom: 0.5rem;
        line-height: 1.3;
      }

      &-footer {
        min-height: 180px;
      }
    }
  }
}
</style>
