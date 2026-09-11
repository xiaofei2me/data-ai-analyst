<template>
  <div class="prototype-switcher">
    <button class="prototype-switcher-btn" @click="prev">
      <i class="fas fa-chevron-left"></i>
    </button>
    <span class="prototype-switcher-label">
      {{ current }} ({{ variants[current]?.name }})
    </span>
    <button class="prototype-switcher-btn" @click="next">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  variants: { type: Object, required: true },
  current: { type: String, default: 'A' }
})

const router = useRouter()
const route = useRoute()

const keys = computed(() => Object.keys(props.variants))

function setVariant(key) {
  router.replace({ query: { ...route.query, variant: key } })
}

function prev() {
  const idx = keys.value.indexOf(props.current)
  const prevIdx = (idx - 1 + keys.value.length) % keys.value.length
  setVariant(keys.value[prevIdx])
}

function next() {
  const idx = keys.value.indexOf(props.current)
  const nextIdx = (idx + 1) % keys.value.length
  setVariant(keys.value[nextIdx])
}
</script>

<style scoped>
.prototype-switcher {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, .15);
  border-radius: 999px;
  padding: 8px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, .4);
  z-index: 9999;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.prototype-switcher-btn {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, .1);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
  transition: all .15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prototype-switcher-btn:hover {
  background: var(--pri);
}

.prototype-switcher-label {
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  min-width: 100px;
  text-align: center;
}
</style>
