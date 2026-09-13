<template>
  <div class="ana-pg active">
    <div class="ana-left">
      <div class="ana-left-hdr">
        <h3>AI Data Analyst</h3>
        <button class="btn-new" @click="newAnalysis">
          <i class="fas fa-plus"></i> {{ m('new') }}
        </button>
      </div>
      <div class="ana-conv">
        <div class="usr-msg">
          <div class="usr-msg-b">{{ analysisStore.question || 'Analyze Q3 2024 sales data' }}</div>
        </div>
        <div class="ana-steps">
          <div class="ana-step exp" v-for="(step, index) in analysisStore.steps" :key="index">
            <div class="ana-step-hdr">
              <div class="ana-step-ico" :class="step.status">
                <i :class="{
                  'fas fa-check': step.status === 'completed',
                  'fas fa-spinner fa-spin': step.status === 'running',
                  'fas fa-clock': step.status === 'pending',
                  'fas fa-times': step.status === 'failed',
                  'fas fa-ban': step.status === 'cancelled'
                }"></i>
              </div>
              <div class="ana-step-lbl" :class="{ wait: step.status === 'pending' || step.status === 'cancelled' }">{{ m(step.key) }}</div>
              <span class="ana-step-exp"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="ana-step-det" v-if="step.detail" v-html="step.detail"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="ana-right" id="ana-canvas">
      <div class="cv-hdr">
        <div>
          <div class="cv-t">Q3 2024 Sales Analysis</div>
          <div class="cv-sub">
            <span>{{ m('revenue_growth') }}: 15%</span>
            <span class="dot"></span>
            <span>{{ m('orders_growth') }}: 12%</span>
            <span class="dot"></span>
            <span>{{ m('profit_change') }}: +2pp</span>
          </div>
        </div>
        <div class="cv-acts">
          <button class="cv-btn" @click="toast(m('export_csv'))"><i class="fas fa-download"></i> CSV</button>
          <button class="cv-btn" @click="toast(m('export_sql'))"><i class="fas fa-code"></i> SQL</button>
          <button class="cv-btn" @click="toast(m('share_analysis'))"><i class="fas fa-share-alt"></i> {{ m('share_btn') }}</button>
          <button class="cv-btn" @click="toast(m('save_to_fav'))"><i class="fas fa-star"></i></button>
          <button class="cv-btn pri" @click="genReport"><i class="fas fa-file-alt"></i> {{ m('create_report') }}</button>
        </div>
      </div>
      <div class="kpi-g">
        <div class="kpi-c">
          <div class="kpi-l">{{ m('revenue') }}</div>
          <div class="kpi-v">¥280M</div>
          <div class="kpi-ch pos"><i class="fas fa-arrow-up"></i> +15% YoY</div>
        </div>
        <div class="kpi-c">
          <div class="kpi-l">{{ m('orders') }}</div>
          <div class="kpi-v">45.2K</div>
          <div class="kpi-ch pos"><i class="fas fa-arrow-up"></i> +12% YoY</div>
        </div>
        <div class="kpi-c">
          <div class="kpi-l">{{ m('profit') }}</div>
          <div class="kpi-v">32%</div>
          <div class="kpi-ch pos"><i class="fas fa-arrow-up"></i> +2pp YoY</div>
        </div>
        <div class="kpi-c">
          <div class="kpi-l">{{ m('avg_order') }}</div>
          <div class="kpi-v">¥6,194</div>
          <div class="kpi-ch pos"><i class="fas fa-arrow-up"></i> +3% YoY</div>
        </div>
      </div>
      <div class="ins-blk">
        <h4><i class="fas fa-lightbulb"></i> {{ m('ai_insight') }}</h4>
        <p v-html="m('insight_body')"></p>
        <div class="ins-acts">
          <button class="ins-abtn" @click="openDrillDown">{{ m('view_detail') }}</button>
          <button class="ins-abtn" @click="toast(m('insight_related'))">{{ m('insight_related') }}</button>
        </div>
      </div>
      <div class="ch-blk">
        <div class="ch-blk-hdr">
          <div class="ch-blk-t">{{ m('brand_performance') }}</div>
          <div class="ch-blk-acts">
            <button class="ch-abtn"><i class="fas fa-expand"></i></button>
            <button class="ch-abtn"><i class="fas fa-ellipsis-v"></i></button>
          </div>
        </div>
        <div class="ch-ct">
          <div class="chart" ref="brandChart"></div>
        </div>
      </div>
      <div class="ch-blk">
        <div class="ch-blk-hdr">
          <div class="ch-blk-t">{{ m('region_distribution') }}</div>
          <div class="ch-blk-acts">
            <button class="ch-abtn"><i class="fas fa-expand"></i></button>
            <button class="ch-abtn"><i class="fas fa-ellipsis-v"></i></button>
          </div>
        </div>
        <div class="ch-ct">
          <div class="chart" ref="regionChart"></div>
        </div>
      </div>
      <div class="ch-blk">
        <div class="ch-blk-hdr">
          <div class="ch-blk-t">{{ m('revenue_trend') }}</div>
          <div class="ch-blk-acts">
            <button class="ch-abtn"><i class="fas fa-expand"></i></button>
            <button class="ch-abtn"><i class="fas fa-ellipsis-v"></i></button>
          </div>
        </div>
        <div class="ch-ct">
          <div class="chart" ref="trendChart"></div>
        </div>
      </div>
      <div class="ch-blk">
        <div class="ch-blk-hdr">
          <div class="ch-blk-t">{{ m('channel_breakdown') }}</div>
          <div class="ch-blk-acts">
            <button class="ch-abtn"><i class="fas fa-expand"></i></button>
            <button class="ch-abtn"><i class="fas fa-ellipsis-v"></i></button>
          </div>
        </div>
        <div class="ch-ct">
          <div class="chart" ref="channelChart"></div>
        </div>
      </div>
      <div class="sug-sec2">
        <div class="sug-t2">{{ m('follow_up') }}</div>
        <div class="sug-list">
          <div class="sug-q" @click="toast('Drilling down by brand...')">Brand breakdown</div>
          <div class="sug-q" @click="toast('Drilling down by region...')">Region comparison</div>
          <div class="sug-q" @click="toast('Drilling down by channel...')">Channel analysis</div>
        </div>
      </div>
      <div class="dd-view">
        <div class="dd-hdr">
          <h4>{{ m('drill_down_title') }}</h4>
        </div>
        <div class="dd-ct">
          <div class="dd-flow">
            <div class="dd-node" @click="toast('Drilling down by brand...')">
              <div class="dd-nbox">
                <div class="dd-nl">Brand</div>
                <div class="dd-nv">¥2.8M</div>
                <div class="dd-nc" style="color: var(--ok)">+15%</div>
              </div>
            </div>
            <div class="dd-arr"><i class="fas fa-arrow-right"></i></div>
            <div class="dd-node hl">
              <div class="dd-nbox">
                <div class="dd-nl">Region</div>
                <div class="dd-nv">¥1.8M</div>
                <div class="dd-nc" style="color: var(--ok)">+25%</div>
              </div>
            </div>
            <div class="dd-arr"><i class="fas fa-arrow-right"></i></div>
            <div class="dd-node" @click="toast('Drilling down by channel...')">
              <div class="dd-nbox">
                <div class="dd-nl">Channel</div>
                <div class="dd-nv">¥950K</div>
                <div class="dd-nc" style="color: var(--ok)">+12%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNavigation } from '../composables/useNavigation'
import { useToastStore } from '../stores/toast'
import { useDrawerStore } from '../stores/drawer'
import { useAnalysisStore } from '../stores/analysis'
import { useI18n } from '../composables/useI18n'
import { brands, brandR, regions, regR, channels, chnR, months } from '../data'
import DetailView from '../components/DetailView.vue'
import { useCharts } from '../composables/useCharts'

const route = useRoute()
const { navigateTo } = useNavigation()
const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const analysisStore = useAnalysisStore()
const { m } = useI18n()

const brandChart = ref(null)
const regionChart = ref(null)
const trendChart = ref(null)
const channelChart = ref(null)

useCharts({ brandChart, regionChart, trendChart, channelChart }, {
  brandChart: {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: brands, axisLabel: { fontSize: 11 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 10, formatter: '¥{value}M' } },
    series: [{ type: 'bar', data: [{ value: 950, itemStyle: { color: '#4f6ef7' } }, { value: 850, itemStyle: { color: '#10b981' } }, { value: 600, itemStyle: { color: '#f59e0b' } }], barWidth: '40%', label: { show: true, position: 'top', fontSize: 10, formatter: '¥{c}M' } }]
  },
  regionChart: {
    tooltip: { trigger: 'item' },
    series: [{ type: 'pie', radius: ['35%', '65%'], center: ['50%', '50%'], data: [{ value: 180, name: 'North', itemStyle: { color: '#4f6ef7' } }, { value: 90, name: 'East', itemStyle: { color: '#10b981' } }, { value: 75, name: 'South', itemStyle: { color: '#f59e0b' } }, { value: 35, name: 'West', itemStyle: { color: '#ef4444' } }], label: { fontSize: 11, formatter: '{b}\n¥{c}M ({d}%)' }, emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.2)' } } }]
  },
  trendChart: {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Revenue', 'Cost'], top: 0, right: 0, textStyle: { fontSize: 11 } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: months, axisLabel: { fontSize: 10 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 10, formatter: '¥{value}M' } },
    series: [
      { name: 'Revenue', type: 'line', data: [1200, 1350, 1100, 1400, 1500, 1600, 1800, 2000, 1900, 2100, 2300, 2200], smooth: true, symbol: 'circle', symbolSize: 4, lineStyle: { width: 2.5, color: '#4f6ef7' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(79,110,247,0.15)' }, { offset: 1, color: 'rgba(79,110,247,0)' }] } }, itemStyle: { color: '#4f6ef7' } },
      { name: 'Cost', type: 'line', data: [700, 780, 650, 800, 850, 900, 1000, 1100, 1050, 1150, 1250, 1200], smooth: true, symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#f59e0b', type: 'dashed' }, itemStyle: { color: '#f59e0b' } }
    ]
  },
  channelChart: {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: channels, top: 0, right: 0, textStyle: { fontSize: 11 } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: { type: 'category', data: months, axisLabel: { fontSize: 10 } },
    yAxis: { type: 'value', axisLabel: { fontSize: 10, formatter: '¥{value}M' } },
    series: channels.map((c, i) => ({ name: c, type: 'bar', stack: 'total', data: chnR[c], itemStyle: { color: ['#4f6ef7', '#10b981', '#f59e0b'][i] } }))
  }
})

onMounted(async () => {
  const id = route.params.id
  if (id) {
    try {
      await analysisStore.loadAnalysis(id)
    } catch (error) {
      toast('Failed to load analysis')
    }
  } else {
    const q = route.query.q || ''
    if (q) {
      try {
        await analysisStore.createAnalysis({
          question: q,
          context: {
            market: { id: 'market_jp', name: 'Japan' },
            timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
            currency: 'JPY',
            comparison: { type: 'yoy', enabled: true },
            dimensions: ['brand', 'region', 'category']
          }
        })
        await analysisStore.runAnalysis()
      } catch (error) {
        toast('Failed to create analysis')
      }
    }
  }
})

watch(() => route.params.id, async (newId, oldId) => {
  if (newId && newId !== oldId) {
    try {
      await analysisStore.loadAnalysis(newId)
    } catch (error) {
      toast('Failed to load analysis')
    }
  }
})

onUnmounted(() => {
  analysisStore.clearAnalysis()
})

function toast(msg) {
  toastStore.showToast(msg)
}

function newAnalysis() {
  toast('Starting new analysis...')
}

function genReport() {
  navigateTo('report')
}

function openDrillDown() {
  drawerStore.openDrawer(m('drill_down_title'), DetailView, {
    title: m('drill_down_title'),
    fields: [
      { label: 'Region', value: 'North Region Breakdown' },
      { label: 'Revenue', value: '¥180M (Target: ¥120M)' },
      { label: 'Growth', value: '+15% YoY' },
      { label: 'Main Driver', value: 'Series X product line' }
    ]
  })
}
</script>
