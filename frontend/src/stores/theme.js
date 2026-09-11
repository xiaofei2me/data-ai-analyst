import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('ada_theme') || 'light')

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme()
    localStorage.setItem('ada_theme', theme.value)
  }

  function applyTheme() {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  function init() {
    applyTheme()
  }

  return { theme, toggleTheme, init }
})
