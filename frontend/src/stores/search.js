import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const isOpen = ref(false)
  const query = ref('')

  function openSearch() {
    isOpen.value = true
    query.value = ''
  }

  function closeSearch() {
    isOpen.value = false
  }

  function setQuery(q) {
    query.value = q
  }

  return { isOpen, query, openSearch, closeSearch, setQuery }
})
