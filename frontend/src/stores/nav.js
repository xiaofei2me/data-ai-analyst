import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pageNames } from '../data'

export const useNavStore = defineStore('nav', () => {
  const currentPage = ref('home')
  const workspace = ref('biz')
  const breadcrumb = ref('Home')

  function setPage(pageId) {
    currentPage.value = pageId
    breadcrumb.value = pageNames[pageId] || pageId
  }

  function setWorkspace(ws) {
    workspace.value = ws
  }

  return { currentPage, workspace, breadcrumb, setPage, setWorkspace }
})
