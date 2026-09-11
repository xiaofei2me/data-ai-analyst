<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('reports_title') }}</div>
        <div class="lp-sub">{{ reports.length }} reports</div>
      </div>
      <button class="btn-new" @click="genReport"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div class="tbl-tw">
      <input class="tbl-search" :placeholder="m('search') + '...'">
      <table class="tbl">
        <thead>
          <tr>
            <th>{{ m('metric_name') }}</th>
            <th>{{ m('owner') }}</th>
            <th>{{ m('updated') }}</th>
            <th>{{ m('status') }}</th>
            <th>{{ m('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reports" :key="r.id">
            <td class="nc" @click="genReport">{{ r.title }}</td>
            <td>{{ r.author }}</td>
            <td>{{ r.date }}</td>
            <td><span class="sbadge" :class="r.status === 'published' ? 'ok' : 'wn'">{{ r.status === 'published' ? 'Published' : 'Draft' }}</span></td>
            <td class="tacts">
              <button class="tabtn" @click="genReport"><i class="fas fa-eye"></i></button>
              <button class="tabtn" @click="toast(m('export'))"><i class="fas fa-download"></i></button>
              <button class="tabtn" @click="toast(m('share'))"><i class="fas fa-share"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useNavigation } from '../composables/useNavigation'
import { useToastStore } from '../stores/toast'
import { useI18n } from '../composables/useI18n'
import { reports } from '../data'

const { navigateTo } = useNavigation()
const toastStore = useToastStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}

function genReport() {
  navigateTo('report')
}
</script>
