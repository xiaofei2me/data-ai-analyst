<template>
  <div id="toast" :style="{ display: visible ? 'block' : 'none' }">
    {{ message }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useToastStore } from '../stores/toast'

const toastStore = useToastStore()

const message = computed(() => toastStore.message)
const visible = computed(() => toastStore.visible)
</script>
