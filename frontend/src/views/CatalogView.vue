<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('data_catalog') }}</div>
        <div class="lp-sub">{{ m('data_sources') }}: {{ dataSources.length }} | {{ m('tables') }}: {{ tables.length }}</div>
      </div>
      <button class="btn-new" @click="toast(m('new'))"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div style="display: flex; gap: 8px; margin-bottom: 16px">
      <button class="cv-btn pri" @click="showTab('sources')"><i class="fas fa-database"></i> {{ m('data_sources') }}</button>
      <button class="cv-btn" @click="showTab('tables')"><i class="fas fa-table"></i> {{ m('tables') }}</button>
    </div>
    <div class="tbl-tw">
      <table class="tbl">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>{{ m('status') }}</th>
            <th>Tables</th>
            <th>{{ m('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in dataSources" :key="r.name">
            <td class="nc" @click="openDetail(r.name)">{{ r.name }}</td>
            <td>{{ r.type }}</td>
            <td><span class="sbadge" :class="r.status === 'active' ? 'ok' : 'wn'">{{ r.status === 'active' ? 'Active' : 'Inactive' }}</span></td>
            <td>{{ r.tables }}</td>
            <td class="tacts">
              <button class="tabtn" @click="toast(m('view_detail'))"><i class="fas fa-eye"></i></button>
              <button class="tabtn" @click="toast(m('edit'))"><i class="fas fa-edit"></i></button>
              <button class="tabtn" @click="toast(m('history'))"><i class="fas fa-history"></i></button>
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
import { dataSources, tables } from '../data'

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
  const item = dataSources.find(r => r.name === name)
  if (item) {
    drawerStore.openDrawer(item.name, `<div class="det-card"><h4>${item.name}</h4><div class="det-row"><span class="det-lbl">Type</span><span class="det-val">${item.type}</span></div><div class="det-row"><span class="det-lbl">Tables</span><span class="det-val">${item.tables}</span></div></div>`)
  }
}
</script>
