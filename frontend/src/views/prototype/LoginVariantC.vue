<template>
  <div class="login-c">
    <div class="login-c-card">
      <div class="login-c-header">
        <div class="login-c-logo">
          <i class="fas fa-chart-line"></i>
        </div>
        <h1>AI Data Analyst</h1>
        <p>Sign in to your workspace</p>
      </div>
      <div class="login-c-sso-main">
        <button class="login-c-sso-primary" @click="handleSSO('microsoft')">
          <i class="fab fa-microsoft"></i>
          <span>Sign in with Microsoft</span>
        </button>
      </div>
      <div class="login-c-alt-divider">
        <span>or use another provider</span>
      </div>
      <div class="login-c-sso-alt">
        <button class="login-c-sso-icon" @click="handleSSO('google')" title="Google">
          <i class="fab fa-google"></i>
        </button>
        <button class="login-c-sso-icon" @click="handleSSO('okta')" title="Okta">
          <i class="fas fa-shield-halved"></i>
        </button>
        <button class="login-c-sso-icon" @click="handleSSO('saml')" title="Enterprise SSO">
          <i class="fas fa-building"></i>
        </button>
        <button class="login-c-sso-icon" @click="handleSSO('github')" title="GitHub">
          <i class="fab fa-github"></i>
        </button>
      </div>
      <div class="login-c-footer">
        <div class="login-c-legal">
          <a href="#">Terms</a>
          <span>·</span>
          <a href="#">Privacy</a>
          <span>·</span>
          <a href="#">Help</a>
        </div>
      </div>
    </div>
    <div class="login-c-state">
      <h4>State</h4>
      <pre>{{ { ssoProvider, loading, error } }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ssoProvider = ref('')
const loading = ref(false)
const error = ref('')

function handleSSO(provider) {
  ssoProvider.value = provider
  loading.value = true
  error.value = ''
  setTimeout(() => {
    loading.value = false
    alert('SSO login initiated with: ' + provider)
  }, 1500)
}
</script>

<style scoped>
.login-c {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 20px;
}

.login-c-card {
  width: 100%;
  max-width: 360px;
  background: var(--sf);
  border: 1px solid var(--bd);
  border-radius: var(--rl);
  padding: 40px 32px;
  box-shadow: var(--shl);
}

.login-c-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-c-logo {
  width: 56px;
  height: 56px;
  background: var(--pri);
  border-radius: var(--rl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  margin: 0 auto 16px;
}

.login-c-header h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--tx);
  margin-bottom: 6px;
}

.login-c-header p {
  font-size: 14px;
  color: var(--tx2);
}

.login-c-sso-main {
  margin-bottom: 24px;
}

.login-c-sso-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  background: #00a4ef;
  color: #fff;
  border: none;
  border-radius: var(--rm);
  font-size: 14px;
  font-weight: 600;
  transition: var(--tr);
}

.login-c-sso-primary:hover {
  background: #0096d7;
}

.login-c-sso-primary i {
  font-size: 18px;
}

.login-c-alt-divider {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.login-c-alt-divider::before,
.login-c-alt-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--bd);
}

.login-c-alt-divider span {
  padding: 0 12px;
  font-size: 11px;
  color: var(--tx3);
  white-space: nowrap;
}

.login-c-sso-alt {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.login-c-sso-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  border: 1px solid var(--bd);
  border-radius: var(--rm);
  font-size: 20px;
  color: var(--tx2);
  transition: var(--tr);
}

.login-c-sso-icon:hover {
  border-color: var(--pri);
  color: var(--pri);
  background: var(--pril);
}

.login-c-sso-icon:nth-child(1) { color: #ea4335; }
.login-c-sso-icon:nth-child(2) { color: #007dc1; }
.login-c-sso-icon:nth-child(3) { color: var(--tx2); }
.login-c-sso-icon:nth-child(4) { color: #24292e; }

.login-c-sso-icon:hover {
  border-color: var(--pri);
}

.login-c-footer {
  margin-top: 32px;
  text-align: center;
}

.login-c-legal {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: var(--tx3);
}

.login-c-legal a {
  color: var(--tx2);
  text-decoration: none;
}

.login-c-legal a:hover {
  color: var(--pri);
  text-decoration: underline;
}

.login-c-state {
  position: fixed;
  bottom: 60px;
  right: 20px;
  background: var(--sf);
  border: 1px solid var(--bd);
  border-radius: var(--rm);
  padding: 12px 16px;
  font-size: 11px;
  max-width: 280px;
  box-shadow: var(--shm);
}

.login-c-state h4 {
  font-size: 11px;
  font-weight: 600;
  color: var(--tx2);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: .5px;
}

.login-c-state pre {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 10px;
  color: var(--tx);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
