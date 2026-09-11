import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDrawerStore = defineStore('drawer', () => {
  const title = ref('')
  const component = ref(null)
  const props = ref({})
  const isOpen = ref(false)

  function openDrawer(titleText, componentRef, propsData = {}) {
    title.value = titleText
    component.value = componentRef
    props.value = propsData
    isOpen.value = true
  }

  function closeDrawer() {
    isOpen.value = false
    component.value = null
    props.value = {}
  }

  return { title, component, props, isOpen, openDrawer, closeDrawer }
})
