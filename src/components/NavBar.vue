<template>
  <div class="nav-container">
    <router-link to="/" class="logo">
      <img src="@/assets/images/favicon.png" class="logo-img" alt="Logo" />
      <span class="logo-text">OJ Competition Side Client</span>
    </router-link>

    <!-- 桌面端菜单 -->
    <div class="links desktop-menu">
      <router-link class="link" to="/">下载</router-link>
      <router-link class="link" to="/about">功能</router-link>
      <a href="https://oj.sdutacm.cn/onlinejudge3/" class="link">更新</a>
      <a href="https://oj.sdutacm.cn/onlinejudge3/" class="link">官网</a>
      <a
        href="https://github.com/sdutacm/oj-competition-side-client/issues"
        class="link"
        >讨论</a
      >
    </div>

    <div class="tools desktop-menu">
      <div class="btn">
        <a
          href="https://github.com/sdutacm/oj-competition-side-client"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-color)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-github-icon lucide-github"
          >
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
            />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div>

      <div class="btn">
        <DownloadButton desc="下载" />
      </div>
    </div>

    <!-- 移动端下拉菜单 -->
    <div class="mobile-menu">
      <el-dropdown trigger="click" placement="bottom-end">
        <el-button type="text" class="mobile-menu-button">
          菜单
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/" class="mobile-link">下载</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/about" class="mobile-link">功能</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="https://oj.sdutacm.cn/onlinejudge3/" class="mobile-link"
                >更新</a
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <a href="https://oj.sdutacm.cn/onlinejudge3/" class="mobile-link"
                >官网</a
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <a
                href="https://github.com/sdutacm/oj-competition-side-client/issues"
                class="mobile-link"
                >讨论</a
              >
            </el-dropdown-item>
            <el-dropdown-item divided>
              <a
                href="https://github.com/sdutacm/oj-competition-side-client"
                target="_blank"
                class="mobile-link"
                >GitHub</a
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import DownloadButton from "./DownloadButton.vue";
import { ArrowDown } from "@element-plus/icons-vue";

onMounted(() => {
  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const container = document.querySelector(".nav-container");
    if (!container) return;

    if (scrollTop > 0) {
      container.style.backgroundColor = "var(--bg-secondary-color)";
      container.style.boxShadow = "var(--box-shadow)";
    } else {
      container.style.backgroundColor = "transparent";
      container.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", handleScroll);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>

<style scoped lang="less">
.nav-container {
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  max-width: 100vw;
  height: 6vh;
  border-radius: var(--border-radius);
  transition: background-color 0.5s ease, box-shadow 0.5s ease;
  overflow: hidden;
  z-index: 10;

  .logo {
    flex-basis: 30%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 1rem;
    user-select: none;
    cursor: pointer;
    padding-left: 1rem;

    &-img {
      width: 8%;
      display: block;
      -webkit-user-drag: none;
    }

    &-text {
      display: block;
      width: fit-content;
      height: fit-content;
      display: flex;
      align-items: center;
      justify-content: left;
      font-size: var(--text-medium-size);
      font-weight: 700;
      color: var(--text-color);
      transition: color 0.3s ease;
      &:hover {
        color: var(--oj-color);
      }
    }
  }

  .links {
    flex-basis: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .link {
      display: flex;
      flex-basis: 8%;
      height: 60%;
      justify-content: center;
      align-items: center;
      color: var(--text-nav-color);
      border-radius: 0.5rem;
      transition: background-color 0.5s ease;
      font-size: var(--text-medium-size);
      &:hover {
        background-color: var(--bg-nav-color);
      }
    }
  }

  .tools {
    flex-basis: 30%;
    height: 100%;
    display: flex;
    position: relative;
    justify-content: end;
    align-items: center;
    padding-right: 1rem;
    gap: 1rem;

    .btn {
      height: 70%;
      border-radius: var(--border-medium-radius);
      display: flex;
      user-select: none;
      justify-content: center;
      align-items: center;
      position: relative;

      a {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3;
        border-radius: var(--border-medium-radius);
        background-color: var(--bg-secondary-color);
      }

      &:nth-child(1) {
        flex-basis: 10%;
        background-color: var(--bg-secondary-color);
        font-size: var(--text-medium-size);
        font-weight: 700;
        cursor: pointer;
        color: var(--text-color);
      }

      &:nth-child(2) {
        flex-basis: 20%;
      }
    }
  }

  // 移动端下拉菜单
  .mobile-menu {
    display: none;
    padding-right: 1rem;

    .mobile-menu-button {
      color: var(--text-color) !important;
      font-size: var(--text-medium-size) !important;
      font-weight: 600 !important;
      font-family: inherit !important;
      border: none !important;
      box-shadow: none !important;
      background: none !important;
      padding: 0.5rem 1rem !important;
      border-radius: var(--border-small-radius) !important;
      transition: all 0.3s ease !important;

      &:hover {
        background-color: var(--bg-nav-color) !important;
        color: var(--oj-color) !important;
      }

      &:focus {
        outline: none !important;
        box-shadow: none !important;
      }
    }

    .mobile-link {
      color: var(--text-color);
      text-decoration: none;
      font-size: var(--text-medium-size);
      font-weight: 500;
      font-family: inherit;
      width: 100%;
      display: block;
      transition: color 0.3s ease;

      &:hover {
        color: var(--oj-color);
      }
    }
  }

  // 响应式设计
  @media (max-width: 760px) {
    .logo {
      flex-basis: auto;
      justify-content: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      padding-left: 0;

      &-text {
        font-size: calc(var(--text-medium-size) * 0.9);
      }
    }

    .desktop-menu {
      display: none;
    }

    .mobile-menu {
      display: flex;
    }
  }

  @media (max-width: 480px) {
    .logo {
      &-img {
        width: 12%;
      }

      &-text {
        font-size: calc(var(--text-medium-size) * 0.8);
      }
    }
  }
}

// Element Plus 下拉菜单样式覆盖
:deep(.el-dropdown-menu) {
  background-color: var(--bg-secondary-color) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: var(--border-radius) !important;
  box-shadow: var(--box-shadow) !important;
  padding: 0.5rem 0 !important;
  min-width: 160px !important;
  font-family: inherit !important;
}

:deep(.el-dropdown-menu__item) {
  color: var(--text-color) !important;
  font-size: var(--text-medium-size) !important;
  font-weight: 500 !important;
  font-family: inherit !important;
  padding: 0.75rem 1rem !important;
  transition: all 0.3s ease !important;
  border-radius: 0 !important;
  
  &:hover {
    background-color: var(--bg-nav-color) !important;
    color: var(--oj-color) !important;
  }

  &:first-child {
    border-top-left-radius: var(--border-radius) !important;
    border-top-right-radius: var(--border-radius) !important;
  }

  &:last-child {
    border-bottom-left-radius: var(--border-radius) !important;
    border-bottom-right-radius: var(--border-radius) !important;
  }

  &.is-divided {
    border-top: 1px solid var(--border-color) !important;
    margin-top: 0.25rem !important;
    padding-top: 1rem !important;
  }
}

:deep(.el-dropdown-menu__item--divided) {
  border-top: 1px solid var(--border-color) !important;
  margin-top: 0.25rem !important;
}
</style>
