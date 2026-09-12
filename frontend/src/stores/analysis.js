import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STEP_KEYS = [
  'step_understanding',
  'step_analysis_plan',
  'step_semantic_resolution',
  'step_data_discovery',
  'step_trend_analysis',
  'step_driver_analysis',
  'step_root_cause',
  'step_validation',
  'step_insight_generation',
  'step_recommendation'
]

export const useAnalysisStore = defineStore('analysis', () => {
  const question = ref('')
  const steps = ref([])
  const currentIndex = ref(-1)
  let _timer = null

  function startAnalysis(q) {
    question.value = q
    steps.value = STEP_KEYS.map((key) => ({
      key,
      status: 'pending',
      detail: ''
    }))
    currentIndex.value = -1
  }

  const currentStep = computed(() => {
    if (currentIndex.value < 0 || currentIndex.value >= steps.value.length) return null
    return steps.value[currentIndex.value]
  })

  function runNext() {
    if (_timer) clearTimeout(_timer)
    const nextIdx = currentIndex.value + 1
    if (nextIdx >= steps.value.length) return

    currentIndex.value = nextIdx
    steps.value[nextIdx].status = 'running'

    const delay = 600 + Math.random() * 1400
    _timer = setTimeout(() => {
      steps.value[nextIdx].status = 'completed'
      steps.value[nextIdx].detail = 'Done'
      runNext()
    }, delay)
  }

  function fail() {
    if (_timer) clearTimeout(_timer)
    if (currentStep.value) {
      currentStep.value.status = 'failed'
    }
    for (let i = currentIndex.value + 1; i < steps.value.length; i++) {
      steps.value[i].status = 'cancelled'
    }
  }

  function reset() {
    if (_timer) clearTimeout(_timer)
    question.value = ''
    steps.value = []
    currentIndex.value = -1
  }

  return { question, steps, currentIndex, currentStep, startAnalysis, runNext, fail, reset }
})
