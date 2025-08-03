<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let animations = [];

onMounted(async () => {
  await nextTick();

  // 刷新ScrollTrigger确保正确计算
  ScrollTrigger.refresh();

  setTimeout(() => {
    initScrollAnimations();
    initInteractiveFeatures();
  }, 200);
});

onUnmounted(() => {
  // 清理所有GSAP动画和ScrollTrigger实例
  animations.forEach((anim) => {
    if (anim.scrollTrigger) {
      anim.scrollTrigger.kill();
    }
    anim.kill();
  });
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // 清理所有observers
  if (window.devObservers) {
    window.devObservers.forEach((observer) => observer.disconnect());
    window.devObservers = null;
  }
});

function initScrollAnimations() {
  // 设置初始状态 - 使用更简单的变换

  gsap.set(".dev-section", {
    opacity: 0,
    y: 40,
  });

  gsap.set(".section-icon", {
    scale: 0.8,
    opacity: 0,
  });

  gsap.set(".feature-item", {
    opacity: 0,
    x: -15,
  });

  gsap.set(".step", {
    opacity: 0,
    y: 20,
  });

  gsap.set(".contribute-step", {
    opacity: 0,
    x: -20,
  });

  gsap.set(".tech-item", {
    opacity: 0,
    scale: 0.8,
  });

  // GitHub section - 使用Intersection Observer
  const githubObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("github-section")
        ) {
          const tl = gsap.timeline();
          tl.to(".github-section", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          })
            .to(
              ".github-section .section-icon",
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.2)",
              },
              "-=0.3"
            )
            .to(
              ".github-section .feature-item",
              {
                opacity: 1,
                x: 0,
                duration: 0.3,
                stagger: 0.08,
                ease: "power2.out",
              },
              "-=0.2"
            );
        }
      });
    },
    { threshold: 0.2 }
  );

  githubObserver.observe(document.querySelector(".github-section"));

  // CI/CD section - 使用Intersection Observer
  const cicdObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("cicd-section")
        ) {
          const tl = gsap.timeline();
          tl.to(".cicd-section", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          })
            .to(
              ".cicd-section .section-icon",
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.2)",
              },
              "-=0.3"
            )
            .to(
              ".step",
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.2"
            );
        }
      });
    },
    { threshold: 0.2 }
  );

  cicdObserver.observe(document.querySelector(".cicd-section"));

  // Contribute section - 使用Intersection Observer
  const contributeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.classList.contains("contribute-section")
        ) {
          const tl = gsap.timeline();
          tl.to(".contribute-section", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          })
            .to(
              ".contribute-section .section-icon",
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(1.2)",
              },
              "-=0.3"
            )
            .to(
              ".contribute-step",
              {
                opacity: 1,
                x: 0,
                duration: 0.3,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.2"
            )
            .to(
              ".tech-item",
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.05,
                ease: "back.out(1.2)",
              },
              "-=0.1"
            );
        }
      });
    },
    { threshold: 0.2 }
  );

  contributeObserver.observe(document.querySelector(".contribute-section"));

  // 简化鼠标跟随效果 - 使用节流
  document.querySelectorAll(".dev-section").forEach((section) => {
    let throttleTimer = null;

    section.addEventListener("mousemove", (e) => {
      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(section, {
          rotationY: x * 1,
          rotationX: y * -1,
          duration: 0.6,
          ease: "power1.out",
        });

        gsap.to(section.querySelector(".section-icon"), {
          x: x * 4,
          y: y * 4,
          duration: 0.6,
          ease: "ease",
        });

        throttleTimer = null;
      }, 16); // 约60fps
    });

    section.addEventListener("mouseleave", () => {
      gsap.to(section, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "ease",
      });

      gsap.to(section.querySelector(".section-icon"), {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  });
}

function initInteractiveFeatures() {
  // 代码复制功能
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const code = btn.previousElementSibling.textContent;
      try {
        await navigator.clipboard.writeText(code);

        // 添加复制成功动画
        gsap.to(btn, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });

        btn.textContent = "已复制!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "复制";
          btn.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("复制失败:", err);
      }
    });
  });

  // 技术栈项目悬停动画
  document.querySelectorAll(".tech-item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // 步骤数字脉冲动画 - 完全移除避免干扰滚动
  // 改为静态样式，不使用动画
}
</script>

<template>
  <div class="dev-container">
    <header class="dev-header">
      <h1>
        <div class="dev-header-dev">
          开发
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path
              d="M686-132 444-376q-20 8-40.5 12t-43.5 4q-100 0-170-70t-70-170q0-36 10-68.5t28-61.5l146 146 72-72-146-146q29-18 61.5-28t68.5-10q100 0 170 70t70 170q0 23-4 43.5T584-516l244 242q12 12 12 29t-12 29l-84 84q-12 12-29 12t-29-12Zm29-85 27-27-256-256q18-20 26-46.5t8-53.5q0-60-38.5-104.5T386-758l74 74q12 12 12 28t-12 28L332-500q-12 12-28 12t-28-12l-74-74q9 57 53.5 95.5T360-440q26 0 52-8t47-25l256 256ZM472-488Z"
            />
          </svg>
        </div>
        友好，快速集成
      </h1>
      <p>基于 Electron 构建的 SDUT OJ 竞赛客户端，提供完整的开发生态</p>
    </header>

    <main class="dev-main">
      <!-- GitHub 集成部分 -->
      <section class="github-section dev-section">
        <div class="section-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
            />
          </svg>
        </div>
        <div class="section-content">
          <h2>GitHub 集成</h2>
          <p>
            SDUT OJ 竞赛客户端项目托管在 GitHub 上，基于 Electron 构建的专业在线评测系统客户端，支持标准的 Git 工作流
          </p>
          <div class="code-block">
            <code
              >git clone
              https://github.com/sdutacm/oj-competition-side-client.git</code
            >
            <button class="copy-btn">复制</button>
          </div>
          <div class="features">
            <div class="feature-item">
              <span class="feature-icon">🔀</span>
              <span>分支管理</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📋</span>
              <span>Issue 跟踪</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🔍</span>
              <span>代码审查</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CI/CD 部分 -->
      <section class="cicd-section dev-section">
        <div class="section-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path
              d="M400-240v-80h240v80H400Zm-158 0L15-467l57-57 170 170 366-366 57 57-423 423Zm318-160v-80h240v80H560Zm160-160v-80h240v80H720Z"
            />
          </svg>
        </div>
        <div class="section-content">
          <h2>自动化构建</h2>
          <p>配置了完整的 Electron 应用构建流程，支持 Windows、macOS、Linux 多平台自动化打包和发布</p>
          <div class="pipeline-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>代码检查</h3>
                <p>Electron 应用代码质量检查</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>跨平台构建</h3>
                <p>Electron Builder 多平台构建</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>自动发布</h3>
                <p>GitHub Releases 自动发布分发</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 贡献指南部分 -->
      <section class="contribute-section dev-section">
        <div class="section-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path
              d="M360-240h220q17 0 31.5-8.5T632-272l84-196q2-5 3-10t1-10v-32q0-17-11.5-28.5T680-560H496l24-136q2-10-1-19t-10-16l-29-29-184 200q-8 8-12 18t-4 22v200q0 33 23.5 56.5T360-240ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
            />
          </svg>
        </div>
        <div class="section-content">
          <h2>快速贡献</h2>
          <p>简单的 Electron 应用开发流程，让每个人都能轻松参与 SDUT OJ 竞赛客户端项目贡献</p>
          <div class="contribute-steps">
            <div class="contribute-step">
              <span class="step-emoji">🍴</span>
              <div class="step-text">
                <h4>Fork 项目</h4>
                <p>从 sdutacm/oj-competition-side-client Fork 项目</p>
              </div>
            </div>
            <div class="contribute-step">
              <span class="step-emoji">💻</span>
              <div class="step-text">
                <h4>本地开发</h4>
                <div class="code-block">
                  <code>npm install && npm start</code>
                  <button class="copy-btn">复制</button>
                </div>
              </div>
            </div>
            <div class="contribute-step">
              <span class="step-emoji">🚀</span>
              <div class="step-text">
                <h4>提交 PR</h4>
                <p>向主仓库提交 Pull Request</p>
              </div>
            </div>
          </div>

          <div class="tech-stack">
            <h3>技术栈</h3>
            <div class="tech-items">
              <span class="tech-item">Electron</span>
              <span class="tech-item">Node.js</span>
              <span class="tech-item">Electron Builder</span>
              <span class="tech-item">GitHub Actions</span>
              <span class="tech-item">i18n</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped lang="less">
@import url(../../assets/css/inline-style.less);
.dev-container {
  width: 100vw;
  min-height: 100vh;
  position: relative;
  left: 0;
  top: 0;
  margin: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    135deg,
    var(--bg-primary-color) 0%,
    var(--bg-secondary-color) 100%
  );
  scroll-behavior: auto;
  transform: translateZ(0);
  -webkit-overflow-scrolling: touch;
}

.dev-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  will-change: transform, opacity;
  transform: translateZ(0);

  &-dev {
    .inline-style(
        var(--green-bg-color),
        var(--green-font-color)
    );
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 1.2rem;
    color: var(--text-secondary-color);
    max-width: 600px;
  }
}

.dev-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.dev-section {
  display: flex;
  gap: 2rem;
  padding: 3rem;
  background: var(--bg-secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  opacity: 0;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform, opacity;
  transform: translateZ(0);

  &:hover {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease;
  }
}

.section-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--green-bg-color);

  svg {
    width: 40px;
    height: 40px;
    color: var(--blue-font-color);
  }
}

.section-content {
  flex: 1;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: var(--text-secondary-color);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
}

.code-block {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: var(--border-small-radius);
  border-left: 4px solid var(--blue-font-color);
  margin: 1rem 0;

  code {
    flex: 1;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 0.9rem;
    color: #2d3748;
    background: none;
  }
}

.copy-btn {
  padding: 0.5rem 1rem;
  background: var(--blue-font-color);
  color: white;
  border: none;
  border-radius: var(--border-small-radius);
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: var(--green-font-color);
    transform: scale(1.05);
  }

  &.copied {
    background: var(--green-font-color);
  }
}

.features {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--blue-bg-color);
  border-radius: var(--border-small-radius);
  color: var(--blue-font-color);
  font-weight: 500;

  .feature-icon {
    font-size: 1.2rem;
  }
}

.pipeline-steps {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      var(--green-bg-color),
      var(--yellow-bg-color)
    );
    color: var(--green-font-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .step-content {
    h3 {
      font-size: 1.2rem;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 0.9rem;
      color: var(--text-secondary-color);
      margin: 0;
    }
  }
}

.contribute-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.contribute-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .step-emoji {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .step-text {
    flex: 1;

    h4 {
      font-size: 1.2rem;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      font-size: 1rem;
    }
  }
}

.tech-stack {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border-color);

  h3 {
    font-size: 1.3rem;
    color: var(--text-color);
    margin-bottom: 1rem;
  }
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tech-item {
  padding: 0.5rem 1rem;
  background: linear-gradient(
    135deg,
    var(--pink-bg-color),
    var(--yellow-bg-color)
  );
  color: var(--pink-font-color);
  border-radius: var(--border-small-radius);
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dev-header h1 {
    font-size: 2rem;
  }

  .dev-main {
    padding: 1rem;
    gap: 2rem;
  }

  .dev-section {
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
  }

  .section-icon {
    width: 60px;
    height: 60px;
    align-self: center;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  .pipeline-steps {
    flex-direction: column;
    gap: 1rem;
  }

  .features {
    flex-direction: column;
    gap: 1rem;
  }

  .code-block {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
}
</style>
