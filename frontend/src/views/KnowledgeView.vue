<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('knowledge_base') }}</div>
        <div class="lp-sub">{{ knowledge.length }} articles</div>
      </div>
      <button class="btn-new" @click="toast(m('new'))"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div class="tbl-tw">
      <table class="tbl">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th>{{ m('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="k in knowledge" :key="k.title">
            <td class="nc" @click="openDetail(k.title)">{{ k.title }}</td>
            <td>{{ k.desc }}</td>
            <td><span class="sbadge" :class="k.type === 'doc' ? 'ok' : 'run'">{{ k.type.toUpperCase() }}</span></td>
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
import { knowledge } from '../data'
import DetailView from '../components/DetailView.vue'

const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}

function openDetail(title) {
  const item = knowledge.find(k => k.title === title)
  if (item) {
    drawerStore.openDrawer(item.title, DetailView, {
      title: item.title,
      fields: [
        { label: 'Type', value: item.type },
        { label: 'Description', value: item.desc }
      ]
    })
  }
}
</script>
