<template>
  <div class="login-a">
    <div class="login-a-card">
      <div class="login-a-logo">
        <div class="login-a-logo-icon">
          <i class="fas fa-chart-line"></i>
        </div>
        <span>AI Data Analyst</span>
      </div>
      <h1>Welcome back</h1>
      <p>Sign in with your organization account</p>
      <div class="login-a-sso-list">
        <button class="login-a-sso-btn" @click="handleSSO('microsoft')">
          <i class="fab fa-microsoft"></i>
          <span>Continue with Microsoft</span>
        </button>
        <button class="login-a-sso-btn" @click="handleSSO('google')">
          <i class="fab fa-google"></i>
          <span>Continue with Google</span>
        </button>
        <button class="login-a-sso-btn" @click="handleSSO('okta')">
          <i class="fas fa-shield-halved"></i>
          <span>Continue with Okta</span>
        </button>
        <button class="login-a-sso-btn" @click="handleSSO('saml')">
          <i class="fas fa-building"></i>
          <span>Enterprise SSO (SAML)</span>
        </button>
      </div>
      <div class="login-a-footer">
        <p>By signing in, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a></p>
      </div>
    </div>
    <div class="login-a-state">
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
.login-a {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  padding: 20px;
  position: relative;
}

.login-a-card {
  width: 100%;
  max-width: 400px;
  background: var(--sf);
  border: 1px solid var(--bd);
  border-radius: var(--rl);
  padding: 40px;
  box-shadow: var(--shl);
}

.login-a-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
}

.login-a-logo-icon {
  width: 36px;
  height: 36px;
  background: var(--pri);
  border-radius: var(--rm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
}

.login-a-logo span {
  font-size: 16px;
  font-weight: 700;
  color: var(--tx);
}

.login-a-card h1 {
  font-size: 24px;
  font-weight: 700;
  color: var(--tx);
  margin-bottom: 8px;
}

.login-a-card > p {
  font-size: 14px;
  color: var(--tx2);
  margin-bottom: 28px;
}

.login-a-sso-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-a-sso-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: var(--bg);
  border: 1px solid var(--bd);
  border-radius: var(--rm);
  font-size: 14px;
  font-weight: 500;
  color: var(--tx);
  transition: var(--tr);
}

.login-a-sso-btn:hover {
  border-color: var(--pri);
  background: var(--pril);
}

.login-a-sso-btn:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.login-a-sso-btn i {
  width: 20px;
  text-align: center;
  font-size: 16px;
}

.login-a-sso-btn:nth-child(1) i { color: #00a4ef; }
.login-a-sso-btn:nth-child(2) i { color: #ea4335; }
.login-a-sso-btn:nth-child(3) i { color: #007dc1; }
.login-a-sso-btn:nth-child(4) i { color: var(--tx2); }

.login-a-footer {
  margin-top: 32px;
  text-align: center;
}

.login-a-footer p {
  font-size: 12px;
  color: var(--tx3);
  line-height: 1.6;
}

.login-a-footer a {
  color: var(--pri);
  text-decoration: none;
}

.login-a-footer a:hover {
  text-decoration: underline;
}

.login-a-state {
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

.login-a-state h4 {
  font-size: 11px;
  font-weight: 600;
  color: var(--tx2);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: .5px;
}

.login-a-state pre {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 10px;
  color: var(--tx);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
