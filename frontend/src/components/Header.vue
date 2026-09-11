<template>
  <header class="hdr">
    <div class="hdr-bc">
      <span>AI Data Analyst</span>
      <i class="fas fa-chevron-right" style="font-size: 8px"></i>
      <span class="cur">{{ breadcrumb }}</span>
    </div>
    <div class="hdr-sp"></div>
    <div class="hdr-search" @click="openSearch">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search..." readonly>
      <span class="kbd">⌘K</span>
    </div>
    <div class="hdr-acts">
      <button class="lang-btn" @click="toggleLang">{{ currentLang === 'en' ? 'EN' : 'ZH' }}</button>
      <button class="theme-btn" @click="themeStore.toggleTheme()">
        <i :class="themeStore.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </button>
      <button class="hdr-btn">
        <i class="fas fa-bell"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useNavigation } from '../composables/useNavigation'
import { useThemeStore } from '../stores/theme'
import { useSearchStore } from '../stores/search'
import { useI18n } from '../composables/useI18n'

const { breadcrumb } = useNavigation()
const themeStore = useThemeStore()
const searchStore = useSearchStore()
const { m, currentLang, setLang } = useI18n()

function toggleLang() {
  const newLang = currentLang.value === 'en' ? 'zh' : 'en'
  setLang(newLang)
}

function openSearch() {
  searchStore.openSearch()
}
</script>
