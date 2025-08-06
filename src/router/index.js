import { createWebHistory, createRouter } from "vue-router";
import { nextTick } from "vue";

// 使用懒加载来确保组件依赖正确加载
const Home = () => import("../pages/Home.vue");
const About = () => import("../pages/About.vue");

const routes = [
  {
    path: "/",
    component: Home,
    meta: { title: "首页" }
  },
  {
    path: "/about",
    component: About,
    meta: { title: "关于" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 添加路由守卫来确保组件正确加载
router.beforeEach(async (to, from, next) => {
  console.log(`路由切换: ${from?.path || 'null'} -> ${to.path}`)
  
  // 确保路由跳转时 DOM 已准备好
  await nextTick();
  
  // 如果是首次访问首页，稍等一下确保组件加载
  if (to.path === '/' && (!from || from.path === '/' || from.path === '')) {
    console.log('首次访问首页，等待组件加载...')
    // 稍等一下确保组件完全加载
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  next();
});

// 路由加载后的处理
router.afterEach(async (to, from) => {
  // 等待 DOM 更新
  await nextTick();
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title + ' - SDUT OJ 竞赛客户端';
  }
});

export default router;
