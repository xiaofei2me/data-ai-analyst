<template>
  <div class="login-page">
    <div class="login-left">
      <div class="login-brand">
        <div class="login-brand-icon">
          <i class="fas fa-chart-line"></i>
        </div>
        <span>AI Data Analyst</span>
      </div>
      <div class="login-hero">
        <h1>企业智能<br>数据分析平台</h1>
        <p>让业务用户通过自然语言直接向企业数据提问，AI 自动完成从问题理解到洞察生成的全流程。</p>
        <div class="login-flow">
          <div class="login-flow-item">
            <i class="fas fa-comments"></i>
            <span>自然语言提问</span>
          </div>
          <div class="login-flow-arrow"><i class="fas fa-arrow-right"></i></div>
          <div class="login-flow-item">
            <i class="fas fa-brain"></i>
            <span>AI 语义理解</span>
          </div>
          <div class="login-flow-arrow"><i class="fas fa-arrow-right"></i></div>
          <div class="login-flow-item">
            <i class="fas fa-database"></i>
            <span>数据查询执行</span>
          </div>
          <div class="login-flow-arrow"><i class="fas fa-arrow-right"></i></div>
          <div class="login-flow-item">
            <i class="fas fa-chart-pie"></i>
            <span>智能洞察报告</span>
          </div>
        </div>
      </div>
      <div class="login-footer">
        © 2026 企业智能数据分析平台
      </div>
    </div>
    <div class="login-right">
      <div class="login-card">
        <div class="login-card-logo">
          <div class="login-card-icon">
            <i class="fas fa-chart-line"></i>
          </div>
        </div>
        <h2>欢迎回来</h2>
        <p class="login-card-sub">使用企业账户登录以继续</p>
        <button class="login-sso-btn" @click="handleLogin" :disabled="auth.loading">
          <i class="fab fa-microsoft"></i>
          <span>{{ auth.loading ? '正在连接...' : '使用 Azure AD 登录' }}</span>
        </button>
        <div class="login-card-divider">
          <span>安全登录</span>
        </div>
        <div class="login-card-features">
          <div class="login-card-feature">
            <i class="fas fa-shield-halved"></i>
            <span>企业级安全认证</span>
          </div>
          <div class="login-card-feature">
            <i class="fas fa-lock"></i>
            <span>数据加密传输</span>
          </div>
          <div class="login-card-feature">
            <i class="fas fa-user-shield"></i>
            <span>统一身份管理</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

async function handleLogin() {
  try {
    await auth.loginWithAzure()
    router.push('/')
  } catch (e) {
    console.error('Login failed:', e)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
}

.login-left {
  flex: 1.1;
  background: var(--pri);
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 40px 48px;
  position: relative;
  overflow: hidden;
}

.login-left::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,255,255,.08) 0%, transparent 70%);
  pointer-events: none;
}

.login-left::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,.05) 0%, transparent 70%);
  pointer-events: none;
}

.login-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: auto;
  position: relative;
  z-index: 1;
}

.login-brand-icon {
  width: 44px;
  height: 44px;
  background: rgba(255,255,255,.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.login-brand span {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -.3px;
}

.login-hero {
  margin-bottom: auto;
  position: relative;
  z-index: 1;
}

.login-hero h1 {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 20px;
  letter-spacing: -1px;
}

.login-hero p {
  font-size: 15px;
  opacity: .8;
  line-height: 1.7;
  max-width: 420px;
  margin-bottom: 40px;
}

.login-flow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.login-flow-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255,255,255,.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
}

.login-flow-item i {
  font-size: 14px;
  opacity: .9;
}

.login-flow-arrow {
  opacity: .4;
  font-size: 10px;
}

.login-footer {
  font-size: 12px;
  opacity: .4;
  position: relative;
  z-index: 1;
}

.login-right {
  flex: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: var(--sf);
}

.login-card {
  width: 100%;
  max-width: 340px;
}

.login-card-logo {
  display: none;
  margin-bottom: 24px;
}

.login-card-icon {
  width: 52px;
  height: 52px;
  background: var(--pri);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 22px;
}

.login-card h2 {
  font-size: 26px;
  font-weight: 700;
  color: var(--tx);
  margin-bottom: 8px;
}

.login-card-sub {
  font-size: 14px;
  color: var(--tx2);
  margin-bottom: 32px;
}

.login-sso-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 15px 20px;
  background: #00a4ef;
  color: #fff;
  border: none;
  border-radius: var(--rm);
  font-size: 15px;
  font-weight: 600;
  transition: var(--tr);
  box-shadow: 0 4px 12px rgba(0, 164, 239, .3);
}

.login-sso-btn:hover:not(:disabled) {
  background: #0096d7;
  box-shadow: 0 6px 16px rgba(0, 164, 239, .4);
  transform: translateY(-1px);
}

.login-sso-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-sso-btn:disabled {
  opacity: .7;
  cursor: not-allowed;
}

.login-sso-btn i {
  font-size: 20px;
}

.login-card-divider {
  display: flex;
  align-items: center;
  margin: 28px 0 20px;
}

.login-card-divider::before,
.login-card-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--bd);
}

.login-card-divider span {
  padding: 0 14px;
  font-size: 11px;
  color: var(--tx3);
  text-transform: uppercase;
  letter-spacing: .5px;
}

.login-card-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.login-card-feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bg);
  border-radius: var(--rm);
}

.login-card-feature i {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pril);
  border-radius: var(--rs);
  color: var(--pri);
  font-size: 14px;
}

.login-card-feature span {
  font-size: 13px;
  color: var(--tx2);
  font-weight: 500;
}

@media (max-width: 900px) {
  .login-left {
    display: none;
  }

  .login-card-logo {
    display: block;
  }
}
</style>
