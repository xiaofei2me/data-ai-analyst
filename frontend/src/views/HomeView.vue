<template>
  <div class="hm">
    <div class="hm-greet">{{ m('hello') }}</div>
    <div class="hm-sub">{{ m('welcome_msg') }}</div>
    <div class="ai-inp-c">
      <div class="ai-inp-box">
        <div class="ai-inp-row">
          <i class="fas fa-comment-dots ai-inp-icon"></i>
          <textarea
            class="ai-inp"
            v-model="inputText"
            rows="1"
            :placeholder="m('placeholder_input')"
            @keydown.enter.prevent="startAnalysis"
          ></textarea>
        </div>
        <div class="ai-inp-acts">
          <button class="ai-act" @click="toast(m('tab_upload'))"><i class="fas fa-upload"></i></button>
          <button class="ai-act" @click="toast(m('tab_database'))"><i class="fas fa-database"></i></button>
          <button class="ai-act" @click="toast(m('tab_sensor'))"><i class="fas fa-microchip"></i></button>
          <button class="ai-act" @click="toast(m('tab_erp'))"><i class="fas fa-industry"></i></button>
          <button class="ai-act" @click="toast(m('tab_crm'))"><i class="fas fa-address-book"></i></button>
          <button class="ai-act" @click="toast(m('tab_financial'))"><i class="fas fa-chart-pie"></i></button>
          <button class="ai-send" @click="startAnalysis">
            <i class="fas fa-paper-plane"></i> {{ m('submit') }}
          </button>
        </div>
      </div>
    </div>
    <div class="sug-sec">
      <div class="sug-t">{{ m('follow_q') }}</div>
      <div class="sug-grid">
        <div class="sug-item" @click="startAnalysisWith('Analyze revenue by region')">
          <i class="fas fa-chart-bar"></i> Revenue by Region
        </div>
        <div class="sug-item" @click="startAnalysisWith('Compare brand performance')">
          <i class="fas fa-chart-line"></i> Brand Comparison
        </div>
        <div class="sug-item" @click="startAnalysisWith('Analyze sales channel')">
          <i class="fas fa-chart-pie"></i> Channel Analysis
        </div>
        <div class="sug-item" @click="startAnalysisWith('Analyze cost structure')">
          <i class="fas fa-calculator"></i> Cost Analysis
        </div>
        <div class="sug-item" @click="startAnalysisWith('Revenue by month')">
          <i class="fas fa-calendar"></i> Monthly Trend
        </div>
        <div class="sug-item" @click="startAnalysisWith('Top products')">
          <i class="fas fa-trophy"></i> Top Products
        </div>
      </div>
    </div>
    <div class="insight-cards">
      <div class="insight-card" @click="startAnalysisWith('Analyze Q3 growth drivers')">
        <div class="ic-icon" style="background: var(--pribg); color: var(--pri)">
          <i class="fas fa-lightbulb"></i>
        </div>
        <div class="ic-text">
          <div class="ic-title">{{ m('insight_title') }}</div>
          <div class="ic-desc">{{ m('insight_body') }}</div>
        </div>
      </div>
    </div>
    <div class="rec-sec">
      <div class="rec-list">
        <div class="rec-item" @click="startAnalysisWith('Revenue by brand')">
          <i class="fas fa-chevron-right"></i> {{ m('insight_by_brand') }}
        </div>
        <div class="rec-item" @click="startAnalysisWith('Revenue by region')">
          <i class="fas fa-chevron-right"></i> {{ m('insight_by_region') }}
        </div>
        <div class="rec-item" @click="startAnalysisWith('Revenue by channel')">
          <i class="fas fa-chevron-right"></i> {{ m('insight_by_channel') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNavigation } from '../composables/useNavigation'
import { useToastStore } from '../stores/toast'
import { useI18n } from '../composables/useI18n'

const { navigateTo } = useNavigation()
const toastStore = useToastStore()
const { m } = useI18n()

const inputText = ref('')

function toast(msg) {
  toastStore.showToast(msg)
}

function startAnalysis() {
  if (inputText.value.trim()) {
    navigateTo('analysis', { q: inputText.value.trim() })
  } else {
    toast(m('placeholder_input'))
  }
}

function startAnalysisWith(q) {
  navigateTo('analysis', { q })
}
</script>
