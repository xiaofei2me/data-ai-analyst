import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  const title = ref('')
  const content = ref('')
  const isOpen = ref(false)

  function openDrawer(titleText, contentHtml) {
    title.value = titleText
    content.value = contentHtml
    isOpen.value = true
  }

  function closeDrawer() {
    isOpen.value = false
  }

  return { title, content, isOpen, openDrawer, closeDrawer }
})
