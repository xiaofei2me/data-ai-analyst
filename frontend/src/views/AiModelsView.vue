<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('ai_models_title') }}</div>
        <div class="lp-sub">{{ models.length }} models | {{ models.filter(m => m.status === 'active').length }} active</div>
      </div>
      <button class="btn-new" @click="toast(m('new'))"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div class="eval-g">
      <div class="eval-metric">
        <div class="em-val" style="font-size: 22px">{{ models.length }}</div>
        <div class="em-lbl">Total Models</div>
      </div>
      <div class="eval-metric">
        <div class="em-val" style="font-size: 22px; color: var(--ok)">{{ models.filter(m => m.status === 'active').length }}</div>
        <div class="em-lbl">Active</div>
      </div>
      <div class="eval-metric">
        <div class="em-val" style="font-size: 22px; color: var(--wn)">{{ models.filter(m => m.status === 'training').length }}</div>
        <div class="em-lbl">Training</div>
      </div>
      <div class="eval-metric">
        <div class="em-val" style="font-size: 22px">{{ Math.round(models.reduce((a, m) => a + m.accuracy, 0) / models.length) }}%</div>
        <div class="em-lbl">Avg Accuracy</div>
      </div>
    </div>
    <div class="det-card">
      <h4>{{ m('model_info') }}</h4>
      <div class="tbl-tw">
        <table class="tbl">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>{{ m('status') }}</th>
              <th>Accuracy</th>
              <th>Latency</th>
              <th>Last Updated</th>
              <th>{{ m('actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in models" :key="r.name">
              <td class="nc" @click="openDetail(r.name)">{{ r.name }}</td>
              <td>{{ r.type }}</td>
              <td><span class="sbadge" :class="r.status === 'active' ? 'ok' : r.status === 'training' ? 'wn' : 'err'">{{ r.status === 'active' ? 'Active' : r.status === 'training' ? 'Training' : 'Inactive' }}</span></td>
              <td>{{ r.accuracy }}%</td>
              <td>{{ r.latency }}ms</td>
              <td>{{ r.updated }}</td>
              <td class="tacts">
                <button class="tabtn" @click="openDetail(r.name)"><i class="fas fa-eye"></i></button>
                <button class="tabtn" @click="toast(m('edit'))"><i class="fas fa-edit"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useDrawerStore } from '../stores/drawer'
import { useI18n } from '../composables/useI18n'
import { models } from '../data'
import DetailView from '../components/DetailView.vue'

const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}

function openDetail(name) {
  const item = models.find(r => r.name === name)
  if (item) {
    drawerStore.openDrawer(item.name, DetailView, {
      title: item.name,
      fields: [
        { label: 'Type', value: item.type },
        { label: 'Accuracy', value: item.accuracy + '%' },
        { label: 'Status', value: item.status === 'active' ? 'Active' : item.status === 'training' ? 'Training' : 'Inactive', badge: true, badgeType: item.status === 'active' ? 'ok' : item.status === 'training' ? 'wn' : 'err' },
        { label: 'Latency', value: item.latency + 'ms' },
        { label: 'Last Updated', value: item.updated }
      ]
    })
  }
}
</script>
