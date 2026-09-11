<template>
  <component :is="currentComponent" />
  <PrototypeSwitcher :variants="variants" :current="variant" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PrototypeSwitcher from '@/components/PrototypeSwitcher.vue'
import LoginVariantA from './LoginVariantA.vue'
import LoginVariantB from './LoginVariantB.vue'
import LoginVariantC from './LoginVariantC.vue'

const route = useRoute()

const variants = {
  A: { name: 'Centered SSO', component: LoginVariantA },
  B: { name: 'Split Layout', component: LoginVariantB },
  C: { name: 'Minimal SSO', component: LoginVariantC }
}

const variant = computed(() => {
  const v = route.query.variant
  return variants[v] ? v : 'A'
})

const currentComponent = computed(() => variants[variant.value].component)
</script>
