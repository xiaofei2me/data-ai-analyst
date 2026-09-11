<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('data_tools_title') }}</div>
        <div class="lp-sub">{{ tools.length }} tools available</div>
      </div>
    </div>
    <div class="eval-g">
      <div v-for="t in tools" :key="t.name" class="eval-metric" style="cursor: pointer" @click="openDetail(t.name)">
        <div class="em-val" style="font-size: 22px; color: {{ t.color }}"><i :class="t.icon"></i></div>
        <div class="em-lbl">{{ t.name }}</div>
        <div style="font-size: 10px; color: var(--tx3); margin-top: 2px">{{ t.desc }}</div>
        <div style="font-size: 10px; color: var(--tx3); margin-top: 2px">{{ t.usage }} uses</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useDrawerStore } from '../stores/drawer'
import { useI18n } from '../composables/useI18n'
import DetailView from '../components/DetailView.vue'

const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const { m } = useI18n()

const tools = [
  { name: 'SQL Editor', desc: 'Write and execute SQL queries with syntax highlighting', icon: 'fas fa-code', color: 'var(--pri)', status: 'active', usage: 2341 },
  { name: 'Data Preview', desc: 'Preview data tables with pagination and filtering', icon: 'fas fa-table', color: 'var(--ok)', status: 'active', usage: 1876 },
  { name: 'Schema Inspector', desc: 'View table schemas, columns and relationships', icon: 'fas fa-sitemap', color: 'var(--inf)', status: 'active', usage: 945 },
  { name: 'Query Builder', desc: 'Build SQL queries visually with drag-and-drop', icon: 'fas fa-puzzle-piece', color: 'var(--pu)', status: 'active', usage: 678 },
  { name: 'Data Lineage', desc: 'Track data flow and transformations', icon: 'fas fa-project-diagram', color: 'var(--cy)', status: 'active', usage: 234 },
  { name: 'Export Tool', desc: 'Export data to CSV, JSON, or Excel formats', icon: 'fas fa-download', color: 'var(--wn)', status: 'active', usage: 1543 }
]

function toast(msg) {
  toastStore.showToast(msg)
}

function openDetail(name) {
  const item = tools.find(t => t.name === name)
  if (item) {
    drawerStore.openDrawer(item.name, DetailView, {
      title: item.name,
      fields: [
        { label: 'Description', value: item.desc },
        { label: 'Status', value: item.status === 'active' ? 'Active' : 'Inactive', badge: true, badgeType: item.status === 'active' ? 'ok' : 'wn' },
        { label: 'Usage Count', value: item.usage }
      ]
    })
  }
}
</script>
