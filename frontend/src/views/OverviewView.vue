<template>
  <div class="ov-ct">
    <div class="ov-t">{{ m('platform_overview') }}</div>
    <div class="ov-sub">System architecture and component overview</div>
    <div class="ov-diagram">
      <div class="ov-label">{{ m('layer_ui') }}</div>
      <div class="ov-layer">
        <div class="ov-node hl">Home</div>
        <div class="ov-node">Analysis</div>
        <div class="ov-node">Report</div>
        <div class="ov-node">Settings</div>
      </div>
      <div class="ov-arrow"><i class="fas fa-arrow-down"></i></div>
      <div class="ov-label">{{ m('layer_ai') }}</div>
      <div class="ov-layer">
        <div class="ov-node hl">Planning</div>
        <div class="ov-node">Execution</div>
        <div class="ov-node">Learning</div>
      </div>
      <div class="ov-arrow"><i class="fas fa-arrow-down"></i></div>
      <div class="ov-label">{{ m('layer_data') }}</div>
      <div class="ov-layer">
        <div class="ov-node">Source</div>
        <div class="ov-node">Storage</div>
        <div class="ov-node">Governance</div>
      </div>
      <div class="ov-arrow"><i class="fas fa-arrow-down"></i></div>
      <div class="ov-label">{{ m('layer_infra') }}</div>
      <div class="ov-layer">
        <div class="ov-node">Compute</div>
        <div class="ov-node">Security</div>
        <div class="ov-node">Monitoring</div>
      </div>
    </div>
    <div class="det-card">
      <h4>{{ m('model_info') }}</h4>
      <div class="det-row"><span class="det-lbl">Platform</span><span class="det-val">AI Data Analyst v1.0</span></div>
      <div class="det-row"><span class="det-lbl">{{ m('model_version') }}</span><span class="det-val">2.4.1</span></div>
      <div class="det-row"><span class="det-lbl">{{ m('model_update') }}</span><span class="det-val">2024-10-15</span></div>
      <div class="det-row"><span class="det-lbl">{{ m('data_sources_count') }}</span><span class="det-val">4</span></div>
      <div class="det-row"><span class="det-lbl">{{ m('tables_count') }}</span><span class="det-val">7</span></div>
      <div class="det-row"><span class="det-lbl">{{ m('metrics_count') }}</span><span class="det-val">5</span></div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '../composables/useI18n'

const { m } = useI18n()
</script>
