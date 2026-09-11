<template>
  <div v-if="isLoginRoute" class="login-wrapper">
    <router-view />
    <Toast />
    <Drawer />
    <SearchModal />
  </div>
  <div v-else class="app">
    <Sidebar />
    <div class="main">
      <Header />
      <div class="content">
        <router-view />
      </div>
    </div>
    <Toast />
    <Drawer />
    <SearchModal />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Toast from './components/Toast.vue'
import Drawer from './components/Drawer.vue'
import SearchModal from './components/SearchModal.vue'
import { useThemeStore } from './stores/theme'
import { useSettingsStore } from './stores/settings'

const route = useRoute()
const themeStore = useThemeStore()
const settingsStore = useSettingsStore()

const isLoginRoute = computed(() => route.path === '/login')

onMounted(() => {
  themeStore.init()
  settingsStore.init()
})
</script>
