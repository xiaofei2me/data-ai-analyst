import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref('')
  const visible = ref(false)
  let timer = null

  function showToast(msg) {
    message.value = msg
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, 2500)
  }

  return { message, visible, showToast }
})
