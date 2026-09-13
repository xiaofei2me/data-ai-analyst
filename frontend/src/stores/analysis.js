import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  createAnalysis as createAnalysisService,
  getAnalysis,
  runAnalysis as runAnalysisService,
  retryAnalysis as retryAnalysisService,
  cancelAnalysis as cancelAnalysisService,
  getAnalysisResult,
  drillDown as drillDownService,
  getEvidence,
  getTrace,
  generateReport as generateReportService,
  AnalysisServiceError
} from '../services/analysisService'

/**
 * @typedef {import('../services/analysisService').Analysis} Analysis
 * @typedef {import('../services/analysisService').AnalysisResult} AnalysisResult
 * @typedef {import('../services/analysisService').DrillDownResult} DrillDownResult
 * @typedef {import('../services/analysisService').Evidence} Evidence
 * @typedef {import('../services/analysisService').Trace} Trace
 */

/**
 * @typedef {Object} AnalysisError
 * @property {string} code
 * @property {string} message
 */

/**
 * @typedef {Object} DrillDownPathItem
 * @property {string} dimension
 * @property {string} value
 */

const STORAGE_KEY = 'currentAnalysisId'
const POLL_INTERVAL_MS = 400

function normalizeAnalysisError(error) {
  if (error instanceof AnalysisServiceError) {
    return { code: error.code, message: error.message }
  }
  return { code: 'UNKNOWN_ERROR', message: error?.message || 'An unknown error occurred' }
}

function persistAnalysisId(id) {
  try {
    if (id) {
      localStorage.setItem(STORAGE_KEY, id)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage unavailable or quota exceeded
  }
}

function loadPersistedAnalysisId() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export const useAnalysisStore = defineStore('analysis', () => {
  const _analysis = ref(null)
  const _isHydrating = ref(false)
  const _loading = ref(false)
  const _isPolling = ref(false)
  let _pollTimer = null

  const error = ref(null)
  const drillDownPath = ref(/** @type {DrillDownPathItem[]} */ ([]))
  const drillDownResult = ref(/** @type {DrillDownResult | null} */ (null))

  const currentAnalysis = computed(() => _analysis.value)
  const question = computed(() => _analysis.value?.question || '')
  const steps = computed(() => _analysis.value?.steps || [])

  const isLoading = computed(() => _loading.value || _isHydrating.value)

  const isRunning = computed(() => _analysis.value?.status === 'running')
  const isCompleted = computed(() => _analysis.value?.status === 'completed')
  const isFailed = computed(() => _analysis.value?.status === 'failed')
  const isCancelled = computed(() => _analysis.value?.status === 'cancelled')
  const hasResult = computed(() => _analysis.value?.result !== null && _analysis.value?.result !== undefined)
  const canDrillDown = computed(() => isCompleted.value && hasResult.value)
  const canGenerateReport = computed(() => isCompleted.value && !_analysis.value?.reportId)

  function hydrateFromAnalysis(analysis) {
    _analysis.value = analysis
    if (analysis) {
      persistAnalysisId(analysis.id)
    } else {
      persistAnalysisId(null)
    }
  }

  function startPolling() {
    if (_pollTimer) {
      clearInterval(_pollTimer)
    }
    _isPolling.value = true

    _pollTimer = setInterval(async () => {
      if (!_analysis.value?.id) {
        stopPolling()
        return
      }

      try {
        const latest = getAnalysis(_analysis.value.id)
        if (!latest) {
          stopPolling()
          return
        }

        hydrateFromAnalysis(latest)

        if (['completed', 'failed', 'cancelled'].includes(latest.status)) {
          stopPolling()
        }
      } catch {
        stopPolling()
      }
    }, POLL_INTERVAL_MS)
  }

  function stopPolling() {
    if (_pollTimer) {
      clearInterval(_pollTimer)
      _pollTimer = null
    }
    _isPolling.value = false
  }

  async function loadAnalysis(id) {
    error.value = null
    _loading.value = true

    try {
      const analysis = getAnalysis(id)
      if (!analysis) {
        error.value = { code: 'ANALYSIS_NOT_FOUND', message: `Analysis not found: ${id}` }
        persistAnalysisId(null)
        throw new Error(error.value.message)
      }
      hydrateFromAnalysis(analysis)
      drillDownPath.value = []
      drillDownResult.value = null
      return analysis
    } catch (err) {
      if (!error.value) {
        error.value = normalizeAnalysisError(err)
      }
      throw err
    } finally {
      _loading.value = false
    }
  }

  async function createAnalysis(data) {
    error.value = null
    _loading.value = true

    try {
      const analysis = await createAnalysisService(data)
      hydrateFromAnalysis(analysis)
      drillDownPath.value = []
      drillDownResult.value = null
      return analysis
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      throw err
    } finally {
      _loading.value = false
    }
  }

  async function runAnalysis() {
    if (!_analysis.value?.id) {
      throw new Error('No analysis loaded')
    }

    try {
      const analysis = await runAnalysisService(_analysis.value.id)
      hydrateFromAnalysis(analysis)
      error.value = null
      startPolling()
      return analysis
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      throw err
    }
  }

  async function retryAnalysis() {
    if (!_analysis.value?.id) {
      throw new Error('No analysis loaded')
    }

    try {
      const analysis = await retryAnalysisService(_analysis.value.id)
      hydrateFromAnalysis(analysis)
      error.value = null
      startPolling()
      return analysis
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      throw err
    }
  }

  async function cancelAnalysis() {
    if (!_analysis.value?.id) {
      throw new Error('No analysis loaded')
    }

    try {
      const analysis = await cancelAnalysisService(_analysis.value.id)
      hydrateFromAnalysis(analysis)
      error.value = null
      stopPolling()
      return analysis
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      throw err
    }
  }

  async function loadResult() {
    if (!_analysis.value?.id) {
      return null
    }

    try {
      const result = getAnalysisResult(_analysis.value.id)
      if (_analysis.value) {
        _analysis.value = { ..._analysis.value, result }
      }
      return result
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      return null
    }
  }

  async function drillDown(dimension, value) {
    if (!_analysis.value?.id) {
      throw new Error('No analysis loaded')
    }

    try {
      const result = drillDownService(_analysis.value.id, dimension, value)
      drillDownResult.value = result

      const exists = drillDownPath.value.some(
        item => item.dimension === dimension && item.value === value
      )
      if (!exists) {
        drillDownPath.value = [...drillDownPath.value, { dimension, value }]
      }

      return result
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      throw err
    }
  }

  function goBackToLevel(index) {
    if (index < 0 || index >= drillDownPath.value.length) {
      return
    }
    drillDownPath.value = drillDownPath.value.slice(0, index)
    if (drillDownPath.value.length === 0) {
      drillDownResult.value = null
    }
  }

  function resetDrillDown() {
    drillDownPath.value = []
    drillDownResult.value = null
  }

  async function loadEvidence() {
    if (!_analysis.value?.id) {
      return null
    }

    try {
      const evidence = getEvidence(_analysis.value.id)
      if (_analysis.value) {
        _analysis.value = { ..._analysis.value, evidence }
      }
      return evidence
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      return null
    }
  }

  async function loadTrace() {
    if (!_analysis.value?.id) {
      return null
    }

    try {
      const trace = getTrace(_analysis.value.id)
      if (_analysis.value) {
        _analysis.value = { ..._analysis.value, trace }
      }
      return trace
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      return null
    }
  }

  async function generateReport() {
    if (!_analysis.value?.id) {
      throw new Error('No analysis loaded')
    }

    try {
      const reportId = generateReportService(_analysis.value.id)
      if (_analysis.value) {
        _analysis.value = { ..._analysis.value, reportId }
      }
      error.value = null
      return reportId
    } catch (err) {
      error.value = normalizeAnalysisError(err)
      throw err
    }
  }

  function clearError() {
    error.value = null
  }

  function clearAnalysis() {
    stopPolling()
    _analysis.value = null
    error.value = null
    drillDownPath.value = []
    drillDownResult.value = null
    persistAnalysisId(null)
  }

  function initHydration() {
    const savedId = loadPersistedAnalysisId()
    if (!savedId) {
      return
    }

    _isHydrating.value = true
    loadAnalysis(savedId).finally(() => {
      _isHydrating.value = false
    })
  }

  initHydration()

  return {
    currentAnalysis,
    question,
    steps,
    drillDownPath,
    drillDownResult,
    error,

    isLoading,
    isRunning,
    isCompleted,
    isFailed,
    isCancelled,
    hasResult,
    canDrillDown,
    canGenerateReport,

    loadAnalysis,
    createAnalysis,
    runAnalysis,
    retryAnalysis,
    cancelAnalysis,
    loadResult,
    drillDown,
    goBackToLevel,
    resetDrillDown,
    loadEvidence,
    loadTrace,
    generateReport,
    clearError,
    clearAnalysis
  }
})
