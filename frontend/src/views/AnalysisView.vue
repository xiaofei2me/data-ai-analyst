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
          <div class="usr-msg-b">Analyze Q3 2024 sales data</div>
        </div>
        <div class="ana-steps">
          <div class="ana-step exp" v-for="(step, index) in steps" :key="index">
            <div class="ana-step-hdr">
              <div class="ana-step-ico" :class="step.status">
                <i :class="step.status === 'done' ? 'fas fa-check' : step.status === 'run' ? 'fas fa-spinner' : 'fas fa-clock'"></i>
              </div>
              <div class="ana-step-lbl" :class="{ wait: step.status === 'wait' }">{{ step.label }}</div>
              <span class="ana-step-exp"><i class="fas fa-chevron-down"></i></span>
            </div>
            <div class="ana-step-det" v-html="step.detail"></div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNavStore } from '../stores/nav'
import { useToastStore } from '../stores/toast'
import { useDrawerStore } from '../stores/drawer'
import { useI18n } from '../composables/useI18n'
import { brands, brandR, regions, regR, channels, chnR, months } from '../data'
import * as echarts from 'echarts'

const router = useRouter()
const navStore = useNavStore()
const toastStore = useToastStore()
const drawerStore = useDrawerStore()
const { m } = useI18n()

const brandChart = ref(null)
const regionChart = ref(null)
const trendChart = ref(null)
const channelChart = ref(null)

let brandChartInstance = null
let regionChartInstance = null
let trendChartInstance = null
let channelChartInstance = null

const steps = [
  { label: m('step_schema'), status: 'done', detail: 'Table: <b>fact_sales</b> | Columns: 12 | Rows: 2.5M<br>Detected: Date, Region, Brand, Channel, Amount, Cost, Orders' },
  { label: m('step_generate'), status: 'done', detail: '<div class="sql-blk">SELECT month, SUM(revenue) as revenue, SUM(cost) as cost, (SUM(revenue)-SUM(cost))/SUM(revenue)*100 as profit_rate FROM fact_sales WHERE quarter=\'Q3\' GROUP BY month ORDER BY month</div>' },
  { label: m('step_execute'), status: 'done', detail: 'Executed in 1.2s | 3 rows returned | 100% match' },
  { label: m('step_insight'), status: 'done', detail: 'Generated 3 key insights with 95% confidence' },
  { label: m('step_visualization'), status: 'done', detail: 'Created 4 interactive charts' },
  { label: m('step_drill'), status: 'done', detail: 'Drill-down available for: Brand, Region, Channel' },
  { label: m('step_recommendations'), status: 'done', detail: '5 actionable recommendations generated' },
  { label: m('step_summary'), status: 'done', detail: 'Report summary ready for review' }
]

function toast(msg) {
  toastStore.showToast(msg)
}

function newAnalysis() {
  toast('Starting new analysis...')
}

function genReport() {
  navStore.setPage('report')
  router.push({ name: 'report' })
}

function openDrillDown() {
  drawerStore.openDrawer(m('drill_down_title'), '<div class="dd-ct"><h4>North Region Breakdown</h4><p>Revenue: ¥180M (Target: ¥120M)</p><p>Growth: +15% YoY</p><p>Main Driver: Series X product line</p></div>')
}

function initCharts() {
  if (brandChart.value) {
    brandChartInstance = echarts.init(brandChart.value)
    brandChartInstance.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: brands, axisLabel: { fontSize: 11 } },
      yAxis: { type: 'value', axisLabel: { fontSize: 10, formatter: '¥{value}M' } },
      series: [{ type: 'bar', data: [{ value: 950, itemStyle: { color: '#4f6ef7' } }, { value: 850, itemStyle: { color: '#10b981' } }, { value: 600, itemStyle: { color: '#f59e0b' } }], barWidth: '40%', label: { show: true, position: 'top', fontSize: 10, formatter: '¥{c}M' } }]
    })
  }

  if (regionChart.value) {
    regionChartInstance = echarts.init(regionChart.value)
    regionChartInstance.setOption({
      tooltip: { trigger: 'item' },
      series: [{ type: 'pie', radius: ['35%', '65%'], center: ['50%', '50%'], data: [{ value: 180, name: 'North', itemStyle: { color: '#4f6ef7' } }, { value: 90, name: 'East', itemStyle: { color: '#10b981' } }, { value: 75, name: 'South', itemStyle: { color: '#f59e0b' } }, { value: 35, name: 'West', itemStyle: { color: '#ef4444' } }], label: { fontSize: 11, formatter: '{b}\n¥{c}M ({d}%)' }, emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.2)' } } }]
    })
  }

  if (trendChart.value) {
    trendChartInstance = echarts.init(trendChart.value)
    trendChartInstance.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['Revenue', 'Cost'], top: 0, right: 0, textStyle: { fontSize: 11 } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: months, axisLabel: { fontSize: 10 } },
      yAxis: { type: 'value', axisLabel: { fontSize: 10, formatter: '¥{value}M' } },
      series: [
        { name: 'Revenue', type: 'line', data: [1200, 1350, 1100, 1400, 1500, 1600, 1800, 2000, 1900, 2100, 2300, 2200], smooth: true, symbol: 'circle', symbolSize: 4, lineStyle: { width: 2.5, color: '#4f6ef7' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(79,110,247,0.15)' }, { offset: 1, color: 'rgba(79,110,247,0)' }] } }, itemStyle: { color: '#4f6ef7' } },
        { name: 'Cost', type: 'line', data: [700, 780, 650, 800, 850, 900, 1000, 1100, 1050, 1150, 1250, 1200], smooth: true, symbol: 'circle', symbolSize: 4, lineStyle: { width: 2, color: '#f59e0b', type: 'dashed' }, itemStyle: { color: '#f59e0b' } }
      ]
    })
  }

  if (channelChart.value) {
    channelChartInstance = echarts.init(channelChart.value)
    channelChartInstance.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { data: channels, top: 0, right: 0, textStyle: { fontSize: 11 } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'category', data: months, axisLabel: { fontSize: 10 } },
      yAxis: { type: 'value', axisLabel: { fontSize: 10, formatter: '¥{value}M' } },
      series: channels.map((c, i) => ({ name: c, type: 'bar', stack: 'total', data: chnR[c], itemStyle: { color: ['#4f6ef7', '#10b981', '#f59e0b'][i] } }))
    })
  }

  window.addEventListener('resize', handleResize)
}

function handleResize() {
  brandChartInstance?.resize()
  regionChartInstance?.resize()
  trendChartInstance?.resize()
  channelChartInstance?.resize()
}

onMounted(() => {
  setTimeout(initCharts, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  brandChartInstance?.dispose()
  regionChartInstance?.dispose()
  trendChartInstance?.dispose()
  channelChartInstance?.dispose()
})
</script>
