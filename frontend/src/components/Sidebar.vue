<template>
  <aside class="sidebar">
    <div class="s-logo">
      <i class="fas fa-chart-line"></i>
      <span>AI Data Analyst</span>
    </div>
    <div class="ws-switch">
      <div class="ws-btn" :class="{ active: workspace === 'biz' }" @click="switchWorkspace('biz')">
        <i class="fas fa-briefcase"></i> Business
      </div>
      <div class="ws-btn" :class="{ active: workspace === 'tech' }" @click="switchWorkspace('tech')">
        <i class="fas fa-code"></i> Technical
      </div>
    </div>
    <nav class="s-nav">
      <div v-for="section in navItems" :key="section.l" class="s-sec">
        <div class="s-label">{{ section.l }}</div>
        <div
          v-for="item in section.items"
          :key="item.id"
          class="s-item"
          :class="{ active: currentPage === item.id }"
          @click="navigateTo(item.id)"
        >
          <i :class="item.i"></i>
          <span>{{ m(item.t) }}</span>
          <span v-if="item.id === 'my-analyses'" class="badge">5</span>
        </div>
      </div>
    </nav>
    <div class="s-bottom">
      <div class="s-item" @click="navigateTo('platform')">
        <i class="fas fa-sitemap"></i>
        <span>{{ m('nav_platform') }}</span>
      </div>
      <div class="s-item" @click="navigateTo('settings')">
        <i class="fas fa-cog"></i>
        <span>{{ m('nav_settings') }}</span>
      </div>
      <div class="s-user">
        <div class="s-avatar">{{ settings.profile.avatar }}</div>
        <div class="s-user-info">
          <div class="s-user-name">{{ settings.profile.name }}</div>
          <div class="s-user-role">{{ m('role_admin') }}</div>
        </div>
        <button class="s-logout" @click="handleLogout" title="退出登录">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNavigation } from '../composables/useNavigation'
import { useSettingsStore } from '../stores/settings'
import { useAuthStore } from '../stores/auth'
import { useI18n } from '../composables/useI18n'
import { navBiz, navTech } from '../data'

const router = useRouter()
const { currentPage, workspace, navigateTo, switchWorkspace } = useNavigation()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()
const { m } = useI18n()

const settings = computed(() => settingsStore.settings)
const navItems = computed(() => workspace.value === 'biz' ? navBiz : navTech)

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>
