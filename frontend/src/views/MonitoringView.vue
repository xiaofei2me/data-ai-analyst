<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('monitoring_title') }}</div>
        <div class="lp-sub">System health and performance monitoring</div>
      </div>
      <button class="btn-new" @click="toast('Refresh')"><i class="fas fa-sync"></i> Refresh</button>
    </div>
    <div class="eval-g">
      <div class="eval-metric">
        <div class="em-val" style="color: var(--ok)">{{ monitorData.uptime }}%</div>
        <div class="em-lbl">Uptime</div>
        <div class="prog-bar"><div class="prog-fill" :style="{ width: monitorData.uptime + '%', background: 'var(--ok)' }"></div></div>
      </div>
      <div class="eval-metric">
        <div class="em-val" style="color: var(--er)">{{ monitorData.errors }}</div>
        <div class="em-lbl">Active Issues</div>
      </div>
      <div class="eval-metric">
        <div class="em-val">{{ monitorData.latency }}ms</div>
        <div class="em-lbl">Avg Latency</div>
      </div>
      <div class="eval-metric">
        <div class="em-val">{{ (monitorData.requests / 1000).toFixed(0) }}K</div>
        <div class="em-lbl">Total Requests</div>
      </div>
    </div>
    <div class="det-card">
      <h4>{{ m('system_status') }}</h4>
      <div class="det-row"><span class="det-lbl">API Gateway</span><span class="det-val"><span class="sbadge ok">Healthy</span></span></div>
      <div class="det-row"><span class="det-lbl">Database</span><span class="det-val"><span class="sbadge ok">Healthy</span></span></div>
      <div class="det-row"><span class="det-lbl">AI Engine</span><span class="det-val"><span class="sbadge ok">Healthy</span></span></div>
      <div class="det-row"><span class="det-lbl">Cache</span><span class="det-val"><span class="sbadge wn">Warning</span></span></div>
      <div class="det-row"><span class="det-lbl">Message Queue</span><span class="det-val"><span class="sbadge ok">Healthy</span></span></div>
      <div class="det-row"><span class="det-lbl">Search Engine</span><span class="det-val"><span class="sbadge ok">Healthy</span></span></div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useI18n } from '../composables/useI18n'
import { monitorData } from '../data'

const toastStore = useToastStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}
</script>
