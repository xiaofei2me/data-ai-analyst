<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('my_analyses') }}</div>
        <div class="lp-sub">{{ analyzes.length }} analyses</div>
      </div>
      <button class="btn-new" @click="navTo('home')"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div class="tbl-tw">
      <input class="tbl-search" :placeholder="m('search') + '...'" @input="filterTable($event.target.value)">
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
          <tr v-for="a in analyzes" :key="a.id">
            <td class="nc" @click="navTo('analysis')">{{ a.title }}</td>
            <td>Admin</td>
            <td>{{ a.date }}</td>
            <td><span class="sbadge ok">Done</span></td>
            <td class="tacts">
              <button class="tabtn" @click="navTo('analysis')"><i class="fas fa-eye"></i></button>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNavStore } from '../stores/nav'
import { useToastStore } from '../stores/toast'
import { useI18n } from '../composables/useI18n'
import { analyzes } from '../data'

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

function filterTable(q) {
  // Simple filter implementation
}
</script>
