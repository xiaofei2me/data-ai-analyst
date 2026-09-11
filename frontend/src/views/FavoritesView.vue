<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('favorites_title') }}</div>
        <div class="lp-sub">2 items</div>
      </div>
    </div>
    <div class="tbl-tw">
      <table class="tbl">
        <thead>
          <tr>
            <th>{{ m('metric_name') }}</th>
            <th>Type</th>
            <th>{{ m('updated') }}</th>
            <th>{{ m('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="nc" @click="navTo('analysis')">Q3 Sales Analysis</td>
            <td>Analysis</td>
            <td>2024-10-15</td>
            <td class="tacts">
              <button class="tabtn" @click="navTo('analysis')"><i class="fas fa-eye"></i></button>
              <button class="tabtn" @click="toast('Removed from favorites')"><i class="fas fa-star"></i></button>
            </td>
          </tr>
          <tr>
            <td class="nc" @click="genReport()">Q3 Performance Report</td>
            <td>Report</td>
            <td>2024-10-14</td>
            <td class="tacts">
              <button class="tabtn" @click="genReport()"><i class="fas fa-eye"></i></button>
              <button class="tabtn" @click="toast('Removed from favorites')"><i class="fas fa-star"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useNavStore } from '../stores/nav'
import { useToastStore } from '../stores/toast'
import { useI18n } from '../composables/useI18n'

const router = useRouter()
const navStore = useNavStore()
const toastStore = useToastStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}

function navTo(page) {
  navStore.setPage(page)
  router.push({ name: page })
}

function genReport() {
  navStore.setPage('report')
  router.push({ name: 'report' })
}
</script>
