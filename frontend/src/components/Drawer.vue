<template>
  <div class="drawer-ov" :class="{ show: isOpen }" @click="closeDrawer"></div>
  <div class="drawer" :class="{ open: isOpen }">
    <div class="drawer-hdr">
      <div class="drawer-t">{{ title }}</div>
      <button class="drawer-cls" @click="closeDrawer">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="drawer-bd" v-html="content"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDrawerStore } from '../stores/drawer'

const drawerStore = useDrawerStore()

const isOpen = computed(() => drawerStore.isOpen)
const title = computed(() => drawerStore.title)
const content = computed(() => drawerStore.content)

function closeDrawer() {
  drawerStore.closeDrawer()
}
</script>
