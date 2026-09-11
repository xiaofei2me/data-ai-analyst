<template>
  <div class="det-card">
    <h4>{{ title }}</h4>
    <div v-for="(field, index) in fields" :key="index" class="det-row">
      <span class="det-lbl">{{ field.label }}</span>
      <span class="det-val">
        <span v-if="field.badge" :class="['sbadge', field.badgeType]">{{ field.value }}</span>
        <template v-else>{{ field.value }}</template>
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  fields: { type: Array, required: true }
})
</script>
