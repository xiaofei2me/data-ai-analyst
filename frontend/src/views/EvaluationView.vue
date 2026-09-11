<template>
  <div class="lp">
    <div class="lp-hdr">
      <div>
        <div class="lp-t">{{ m('evaluation_title') }}</div>
        <div class="lp-sub">Model performance evaluation metrics</div>
      </div>
      <button class="btn-new" @click="toast('Run Evaluation')"><i class="fas fa-play"></i> Run Evaluation</button>
    </div>
    <div class="eval-g">
      <div class="eval-metric">
        <div class="em-val">{{ evalData.accuracy }}%</div>
        <div class="em-lbl">Accuracy</div>
        <div class="prog-bar"><div class="prog-fill" :style="{ width: evalData.accuracy + '%', background: 'var(--ok)' }"></div></div>
      </div>
      <div class="eval-metric">
        <div class="em-val">{{ evalData.precision }}%</div>
        <div class="em-lbl">Precision</div>
        <div class="prog-bar"><div class="prog-fill" :style="{ width: evalData.precision + '%', background: 'var(--pri)' }"></div></div>
      </div>
      <div class="eval-metric">
        <div class="em-val">{{ evalData.recall }}%</div>
        <div class="em-lbl">Recall</div>
        <div class="prog-bar"><div class="prog-fill" :style="{ width: evalData.recall + '%', background: 'var(--inf)' }"></div></div>
      </div>
      <div class="eval-metric">
        <div class="em-val">{{ evalData.f1 }}%</div>
        <div class="em-lbl">F1 Score</div>
        <div class="prog-bar"><div class="prog-fill" :style="{ width: evalData.f1 + '%', background: 'var(--pu)' }"></div></div>
      </div>
    </div>
    <div class="det-card">
      <h4>{{ m('model_perf') }}</h4>
      <div class="det-row"><span class="det-lbl">Avg Latency</span><span class="det-val">{{ evalData.latency }}ms</span></div>
      <div class="det-row"><span class="det-lbl">Throughput</span><span class="det-val">{{ evalData.throughput }} req/min</span></div>
      <div class="det-row"><span class="det-lbl">Error Rate</span><span class="det-val">0.3%</span></div>
      <div class="det-row"><span class="det-lbl">Uptime</span><span class="det-val">99.9%</span></div>
      <div class="det-row"><span class="det-lbl">Last Evaluated</span><span class="det-val">2024-10-15 14:30</span></div>
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
import { useI18n } from '../composables/useI18n'
import { evalData } from '../data'

const toastStore = useToastStore()
const { m } = useI18n()

function toast(msg) {
  toastStore.showToast(msg)
}
</script>
