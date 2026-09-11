import { onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

export function useCharts(chartRefs, options = {}) {
  const instances = new Map()

  function initChart(key, ref, option) {
    if (ref.value) {
      const chart = echarts.init(ref.value)
      chart.setOption(option)
      instances.set(key, chart)
    }
  }

  function handleResize() {
    instances.forEach(chart => chart?.resize())
  }

  function disposeAll() {
    instances.forEach(chart => chart?.dispose())
    instances.clear()
  }

  onMounted(() => {
    setTimeout(() => {
      Object.entries(chartRefs).forEach(([key, ref]) => {
        if (options[key]) {
          initChart(key, ref, options[key])
        }
      })
      window.addEventListener('resize', handleResize)
    }, 100)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    disposeAll()
  })

  return { instances, initChart, handleResize, disposeAll }
}
