<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('templates_title') }}</div>
        <div class="lp-sub">{{ templates.length }} templates</div>
      </div>
      <button class="btn-new" @click="toast(m('new'))"><i class="fas fa-plus"></i> {{ m('new') }}</button>
    </div>
    <div class="tbl-tw">
      <table class="tbl">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>{{ m('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in templates" :key="t.id">
            <td class="nc" @click="toast(m('view_detail'))">{{ t.name }}</td>
            <td>{{ t.desc }}</td>
            <td class="tacts">
              <button class="tabtn" @click="toast(m('view_detail'))"><i class="fas fa-eye"></i></button>
              <button class="tabtn" @click="toast(m('edit'))"><i class="fas fa-edit"></i></button>
              <button class="tabtn" @click="toast(m('duplicate'))"><i class="fas fa-copy"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useI18n } from '../composables/useI18n'
import { templates } from '../data'

const toastStore = useToastStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}
</script>
