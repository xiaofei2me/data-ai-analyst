import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useNavStore } from '../stores/nav'
import { useSettingsStore } from '../stores/settings'

export function useNavigation() {
  const router = useRouter()
  const route = useRoute()
  const navStore = useNavStore()
  const settingsStore = useSettingsStore()

  const currentPage = computed(() => navStore.currentPage)
  const workspace = computed(() => navStore.workspace)
  const breadcrumb = computed(() => navStore.breadcrumb)

  function navigateTo(pageId, params) {
    navStore.setPage(pageId)
    router.push({ name: pageId, query: params })
  }

  function switchWorkspace(ws) {
    navStore.setWorkspace(ws)
    settingsStore.setSetting('appearance.workspace', ws)
  }

  return { currentPage, workspace, breadcrumb, navigateTo, switchWorkspace }
}
