import { computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { LANG } from '../data/i18n'

export function useI18n() {
  const settingsStore = useSettingsStore()

  const currentLang = computed(() => settingsStore.settings.appearance.language)

  function m(key) {
    const lang = currentLang.value
    return (LANG[lang] && LANG[lang][key]) || LANG.en[key] || key
  }

  function setLang(lang) {
    settingsStore.setSetting('appearance.language', lang)
  }

  return { m, currentLang, setLang }
}
