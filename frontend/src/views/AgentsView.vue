<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('ai_agents') }}</div>
        <div class="lp-sub">{{ agents.length }} agents | {{ agents.filter(a => a.status === 'active').length }} active</div>
      </div>
      <button class="btn-new" @click="toast(m('new'))"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div class="eval-g">
      <div class="eval-metric">
        <div class="em-val" style="font-size: 22px">{{ agents.length }}</div>
        <div class="em-lbl">{{ m('agents_count') }}</div>
      </div>
      <div class="eval-metric">
        <div class="em-val" style="font-size: 22px; color: var(--ok)">{{ agents.filter(a => a.status === 'active').length }}</div>
        <div class="em-lbl">Active</div>
      </div>
      <div class="eval-metric">
        <div class="em-val" style="font-size: 22px; color: var(--wn)">{{ agents.filter(a => a.status === 'inactive').length }}</div>
        <div class="em-lbl">Inactive</div>
      </div>
      <div class="eval-metric">
        <div class="em-val" style="font-size: 22px">{{ skills.length }}</div>
        <div class="em-lbl">{{ m('agent_skills') }}</div>
      </div>
    </div>
    <div class="det-card">
      <h4>{{ m('agent_overview') }}</h4>
      <div class="flow-ct">
        <div class="flow-node hl" @click="openDetail('Data Analyst')">Data Analyst</div>
        <div class="flow-arrow"><i class="fas fa-arrow-down"></i></div>
        <div class="flow-node" @click="openDetail('Report Generator')">Report Generator</div>
        <div class="flow-arrow"><i class="fas fa-arrow-down"></i></div>
        <div class="flow-node" @click="openDetail('SQL Optimizer')">SQL Optimizer</div>
        <div class="flow-arrow"><i class="fas fa-arrow-down"></i></div>
        <div class="flow-node" @click="openDetail('Data Validator')">Data Validator</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useDrawerStore } from '../stores/drawer'
import { useI18n } from '../composables/useI18n'
import { agents, skills } from '../data'

const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}

function openDetail(name) {
  const item = agents.find(a => a.name === name)
  if (item) {
    drawerStore.openDrawer(item.name, `<div class="det-card"><h4>${item.name}</h4><div class="det-row"><span class="det-lbl">Status</span><span class="det-val"><span class="sbadge ${item.status === 'active' ? 'ok' : 'wn'}">${item.status === 'active' ? 'Active' : 'Inactive'}</span></span></div><div class="det-row"><span class="det-lbl">Description</span><span class="det-val">${item.desc}</span></div><div class="det-row"><span class="det-lbl">Skills</span><span class="det-val">${item.skills.join(', ')}</span></div></div>`)
  }
}
</script>
