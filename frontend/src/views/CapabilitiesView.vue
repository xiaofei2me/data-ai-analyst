<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('agent_capabilities') }}</div>
        <div class="lp-sub">{{ capabilities.length }} capabilities | {{ capabilities.filter(c => c.status === 'active').length }} active</div>
      </div>
      <button class="btn-new" @click="toast(m('new'))"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div class="eval-g">
      <div v-for="c in capabilities" :key="c.name" class="eval-metric" style="cursor: pointer" @click="openDetail(c.name)">
        <div class="em-val" style="font-size: 22px; color: {{ c.color }}"><i :class="c.icon"></i></div>
        <div class="em-lbl">{{ c.name }}</div>
        <div style="font-size: 10px; color: var(--tx3); margin-top: 2px">{{ c.desc }}</div>
        <div style="font-size: 10px; color: var(--tx3); margin-top: 2px">{{ c.usage }} uses</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useDrawerStore } from '../stores/drawer'
import { useI18n } from '../composables/useI18n'

const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const { m } = useI18n()

const capabilities = [
  { name: 'Data Query', desc: 'Query data from multiple sources with optimized SQL', icon: 'fas fa-database', color: 'var(--pri)', agent: 'Data Analyst', status: 'active', usage: 892 },
  { name: 'Chart Generation', desc: 'Generate interactive ECharts visualizations', icon: 'fas fa-chart-bar', color: 'var(--ok)', agent: 'Data Analyst', status: 'active', usage: 756 },
  { name: 'Report Writing', desc: 'Create structured analysis reports with insights', icon: 'fas fa-file-alt', color: 'var(--inf)', agent: 'Report Generator', status: 'active', usage: 423 },
  { name: 'SQL Optimization', desc: 'Optimize SQL queries for better performance', icon: 'fas fa-bolt', color: 'var(--wn)', agent: 'SQL Optimizer', status: 'inactive', usage: 0 },
  { name: 'Natural Language', desc: 'Understand and process natural language queries', icon: 'fas fa-comment-dots', color: 'var(--pu)', agent: 'Data Analyst', status: 'active', usage: 1205 },
  { name: 'Anomaly Detection', desc: 'Detect anomalies and outliers in data', icon: 'fas fa-exclamation-triangle', color: 'var(--er)', agent: 'Data Analyst', status: 'active', usage: 189 }
]

function toast(msg) {
  toastStore.showToast(msg)
}

function openDetail(name) {
  const item = capabilities.find(c => c.name === name)
  if (item) {
    drawerStore.openDrawer(item.name, `<div class="det-card"><h4>${item.name}</h4><div class="det-row"><span class="det-lbl">Description</span><span class="det-val">${item.desc}</span></div><div class="det-row"><span class="det-lbl">Agent</span><span class="det-val">${item.agent}</span></div><div class="det-row"><span class="det-lbl">Status</span><span class="det-val">${item.status === 'active' ? 'Active' : 'Inactive'}</span></div><div class="det-row"><span class="det-lbl">Usage</span><span class="det-val">${item.usage}</span></div></div>`)
  }
}
</script>
