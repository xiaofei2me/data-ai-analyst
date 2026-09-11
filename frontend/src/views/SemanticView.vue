<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('semantic_layer') }}</div>
        <div class="lp-sub">{{ m('metrics') }}: {{ metrics.length }} | {{ m('dimensions') }}: {{ dimensions.length }} | {{ m('entities') }}: {{ entities.length }}</div>
      </div>
      <button class="btn-new" @click="toast(m('new'))"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div style="display: flex; gap: 8px; margin-bottom: 16px">
      <button class="cv-btn pri" @click="showTab('metrics')"><i class="fas fa-calculator"></i> {{ m('metrics') }}</button>
      <button class="cv-btn" @click="showTab('dimensions')"><i class="fas fa-ruler"></i> {{ m('dimensions') }}</button>
      <button class="cv-btn" @click="showTab('entities')"><i class="fas fa-cube"></i> {{ m('entities') }}</button>
      <button class="cv-btn" @click="showTab('rules')"><i class="fas fa-sliders-h"></i> {{ m('rules') }}</button>
    </div>
    <div class="tbl-tw">
      <table class="tbl">
        <thead>
          <tr>
            <th>{{ m('metric_name') }}</th>
            <th>Type</th>
            <th>Expression</th>
            <th>{{ m('owner') }}</th>
            <th>{{ m('status') }}</th>
            <th>{{ m('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in metrics" :key="r.name">
            <td class="nc" @click="openDetail(r.name)">{{ r.name }}</td>
            <td>{{ r.type }}</td>
            <td style="font-family: monospace; font-size: 11px">{{ r.expr }}</td>
            <td>{{ r.owner }}</td>
            <td><span class="sbadge ok">Active</span></td>
            <td class="tacts">
              <button class="tabtn" @click="openDetail(r.name)"><i class="fas fa-eye"></i></button>
              <button class="tabtn" @click="toast(m('edit'))"><i class="fas fa-edit"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useDrawerStore } from '../stores/drawer'
import { useI18n } from '../composables/useI18n'
import { metrics, dimensions, entities } from '../data'
import DetailView from '../components/DetailView.vue'

const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}

function showTab(tab) {
  toast(`Showing ${tab}`)
}

function openDetail(name) {
  const item = metrics.find(r => r.name === name)
  if (item) {
    drawerStore.openDrawer(item.name, DetailView, {
      title: item.name,
      fields: [
        { label: 'Type', value: item.type },
        { label: 'Expression', value: item.expr },
        { label: 'Owner', value: item.owner }
      ]
    })
  }
}
</script>
