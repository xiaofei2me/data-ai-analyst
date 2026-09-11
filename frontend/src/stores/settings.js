import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { defaultSettings } from '../data'

export const useSettingsStore = defineStore('settings', () => {
  const settings = reactive(JSON.parse(JSON.stringify(defaultSettings)))

  function loadSettings() {
    try {
      const raw = localStorage.getItem('ada_settings')
      if (raw) {
        const parsed = JSON.parse(raw)
        Object.assign(settings, parsed)
      }
    } catch (e) {
      console.error('Failed to load settings:', e)
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem('ada_settings', JSON.stringify(settings))
    } catch (e) {
      console.error('Failed to save settings:', e)
    }
  }

  function getSetting(path) {
    return path.split('.').reduce((o, k) => o && o[k], settings)
  }

  function setSetting(path, val) {
    const keys = path.split('.')
    const last = keys.pop()
    const target = keys.reduce((o, k) => o[k], settings)
    target[last] = val
    saveSettings()
  }

  function init() {
    loadSettings()
  }

  return { settings, loadSettings, saveSettings, getSetting, setSetting, init }
})
