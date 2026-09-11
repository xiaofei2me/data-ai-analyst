<template>
  <div class="rpt-pg active">
    <div class="rpt-sb">
      <div class="rpt-sb-hdr">
        <h3>{{ m('rpt_outline') }}</h3>
      </div>
      <div class="rpt-outline">
        <div class="outl-item active" @click="scrollRpt(0)">{{ m('rpt_p1') }}</div>
        <div class="outl-item" @click="scrollRpt(1)">{{ m('rpt_p2') }}</div>
        <div class="outl-item" @click="scrollRpt(2)">{{ m('rpt_p3') }}</div>
        <div class="outl-item" @click="scrollRpt(3)">{{ m('rpt_p4') }}</div>
      </div>
    </div>
    <div class="rpt-ct">
      <div style="display: flex; justify-content: flex-end; gap: 6px; margin-bottom: 14px">
        <button class="cv-btn" @click="toast(m('export_pdf'))"><i class="fas fa-file-pdf"></i> PDF</button>
        <button class="cv-btn" @click="toast(m('export_ppt'))"><i class="fas fa-file-powerpoint"></i> PPT</button>
        <button class="cv-btn" @click="toast(m('export_excel'))"><i class="fas fa-file-excel"></i> Excel</button>
        <button class="cv-btn pri"><i class="fas fa-share-alt"></i> {{ m('share') }}</button>
      </div>
      <div class="rpt-editor" ref="editor">
        <h1 contenteditable="true">{{ m('rpt_title') }}</h1>
        <h2 contenteditable="true">{{ m('rpt_p1') }}</h2>
        <p contenteditable="true">{{ m('rpt_p1b') }}</p>
        <h2 contenteditable="true">{{ m('rpt_p2') }}</h2>
        <p contenteditable="true">{{ m('rpt_p2b') }}</p>
        <h2 contenteditable="true">{{ m('rpt_p3') }}</h2>
        <p contenteditable="true">{{ m('rpt_p3b') }}</p>
        <h2 contenteditable="true">{{ m('rpt_p4') }}</h2>
        <p contenteditable="true">{{ m('rpt_p4b') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToastStore } from '../stores/toast'
import { useI18n } from '../composables/useI18n'

const toastStore = useToastStore()
const { m } = useI18n()
const editor = ref(null)

function toast(msg) {
  toastStore.showToast(msg)
}

function scrollRpt(index) {
  if (editor.value) {
    const h2s = editor.value.querySelectorAll('h2')
    if (h2s[index]) {
      h2s[index].scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}
</script>
