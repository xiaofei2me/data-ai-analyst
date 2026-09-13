import {
  createMockAnalysis,
  getMockAnalysis,
  listMockAnalyses,
  updateMockAnalysis
} from '../data/domain/analysis.js'
import { ANALYSIS_STEPS, getStepIndex } from '../data/domain/analysisSteps.js'

const STEP_DELAY_MS = 500

export const AnalysisErrorCode = {
  ANALYSIS_NOT_FOUND: 'ANALYSIS_NOT_FOUND',
  ANALYSIS_ALREADY_RUNNING: 'ANALYSIS_ALREADY_RUNNING',
  ANALYSIS_CANNOT_RUN: 'ANALYSIS_CANNOT_RUN',
  ANALYSIS_CANNOT_RETRY: 'ANALYSIS_CANNOT_RETRY',
  ANALYSIS_CANNOT_CANCEL: 'ANALYSIS_CANNOT_CANCEL',
  DRILLDOWN_INVALID_DIMENSION: 'DRILLDOWN_INVALID_DIMENSION'
}

export class AnalysisServiceError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'AnalysisServiceError'
    this.code = code
  }
}

function validateAnalysisExists(id) {
  const analysis = getMockAnalysis(id)
  if (!analysis) {
    throw new AnalysisServiceError(
      AnalysisErrorCode.ANALYSIS_NOT_FOUND,
      `Analysis not found: ${id}`
    )
  }
  return analysis
}

function validateCanRun(analysis) {
  if (analysis.status === 'running') {
    throw new AnalysisServiceError(
      AnalysisErrorCode.ANALYSIS_ALREADY_RUNNING,
      `Analysis ${analysis.id} is already running`
    )
  }
  if (analysis.status !== 'draft' && analysis.status !== 'failed') {
    throw new AnalysisServiceError(
      AnalysisErrorCode.ANALYSIS_CANNOT_RUN,
      `Analysis ${analysis.id} cannot be run in status: ${analysis.status}`
    )
  }
}

function validateCanRetry(analysis) {
  if (analysis.status !== 'failed') {
    throw new AnalysisServiceError(
      AnalysisErrorCode.ANALYSIS_CANNOT_RETRY,
      `Analysis ${analysis.id} can only be retried from failed status, current: ${analysis.status}`
    )
  }
}

function validateCanCancel(analysis) {
  if (analysis.status !== 'running') {
    throw new AnalysisServiceError(
      AnalysisErrorCode.ANALYSIS_CANNOT_CANCEL,
      `Analysis ${analysis.id} can only be cancelled from running status, current: ${analysis.status}`
    )
  }
}

function createStepsSnapshot() {
  return ANALYSIS_STEPS.map(step => ({
    key: step.key,
    status: 'pending',
    dependsOn: [...step.dependsOn],
    startedAt: null,
    completedAt: null,
    duration: null,
    error: null
  }))
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function runMockRunner(analysisId) {
  const analysis = getMockAnalysis(analysisId)
  if (!analysis || analysis.status !== 'running') return

  const steps = [...analysis.steps]
  const startTime = Date.now()
  const traceSteps = []
  const traceToolCalls = []

  for (let i = 0; i < steps.length; i++) {
    const currentAnalysis = getMockAnalysis(analysisId)
    if (!currentAnalysis || currentAnalysis.status === 'cancelled') {
      for (let j = i; j < steps.length; j++) {
        steps[j].status = 'cancelled'
      }
      updateMockAnalysis(analysisId, {
        steps,
        currentStep: null
      })
      return
    }

    steps[i].status = 'running'
    steps[i].startedAt = new Date().toISOString()
    updateMockAnalysis(analysisId, {
      steps,
      currentStep: steps[i].key
    })

    traceSteps.push({
      stepKey: steps[i].key,
      startedAt: steps[i].startedAt,
      toolCalls: []
    })

    await delay(STEP_DELAY_MS)

    const afterDelayAnalysis = getMockAnalysis(analysisId)
    if (!afterDelayAnalysis || afterDelayAnalysis.status === 'cancelled') {
      for (let j = i; j < steps.length; j++) {
        steps[j].status = 'cancelled'
      }
      updateMockAnalysis(analysisId, {
        steps,
        currentStep: null
      })
      return
    }

    steps[i].status = 'completed'
    steps[i].completedAt = new Date().toISOString()
    steps[i].duration = STEP_DELAY_MS

    if (traceSteps[i]) {
      traceSteps[i].completedAt = steps[i].completedAt
    }

    updateMockAnalysis(analysisId, {
      steps,
      currentStep: i < steps.length - 1 ? steps[i + 1].key : null
    })
  }

  const completedSteps = steps.filter(s => s.status === 'completed').length
  const allCompleted = completedSteps === steps.length

  if (allCompleted) {
    const result = createMockResult(analysis)
    const evidence = createMockEvidence(analysis, traceSteps, traceToolCalls)

    updateMockAnalysis(analysisId, {
      status: 'completed',
      currentStep: null,
      result,
      evidence,
      error: null
    })
  }
}

function createMockResult(analysis) {
  return {
    summary: {
      title: `Analysis: ${analysis.question.substring(0, 50)}...`,
      conclusion: 'Mock analysis completed successfully.',
      period: '2026 Full Year',
      status: 'completed'
    },
    kpis: [
      { id: 'kpi_mock', label: 'Mock KPI', value: 100, unit: 'units', format: 'number', yoy: 5.0 }
    ],
    trend: [
      { period: '2026-01', value: 100, comparisonValue: 95, yoy: 5.3 }
    ],
    drivers: [
      { dimension: 'market', value: 'Japan', contribution: 100, yoy: 5.0, impact: 5.0, rank: 1, explanation: 'Mock driver explanation.' }
    ],
    rootCause: [
      { level: 0, dimension: 'market', value: 'Japan', change: 5.0, contribution: 100 }
    ],
    insights: [
      { id: 'insight_mock', type: 'driver', title: 'Mock Insight', description: 'Mock insight description.', impact: 'medium', evidenceIds: ['metric_mock'] }
    ],
    recommendations: [
      { id: 'rec_mock', priority: 'medium', title: 'Mock Recommendation', description: 'Mock recommendation description.', expectedImpact: 'Mock impact' }
    ],
    validation: {
      status: 'passed',
      metricValidation: { status: 'passed', checkedAt: new Date().toISOString() },
      businessRuleValidation: { status: 'passed', checkedAt: new Date().toISOString() },
      dataQuality: { status: 'passed', completeness: 100, accuracy: 100, freshness: 100 },
      resultValidation: { status: 'passed', confidence: 1.0, checkedAt: new Date().toISOString() }
    }
  }
}

function createMockEvidence(analysis, traceSteps, traceToolCalls) {
  const startedAt = traceSteps.length > 0 ? traceSteps[0].startedAt : new Date().toISOString()
  const completedAt = traceSteps.length > 0 ? traceSteps[traceSteps.length - 1].completedAt : new Date().toISOString()

  return {
    metricSnapshot: {
      id: 'metric_mock',
      name: 'Mock Metric',
      definition: 'Mock metric definition',
      aggregation: 'sum',
      currency: 'USD',
      version: '1.0'
    },
    semanticModelSnapshot: {
      id: 'semantic_mock',
      name: 'Mock Semantic Model',
      version: '1.0'
    },
    businessRuleSnapshots: [
      {
        id: 'rule_mock',
        name: 'Mock Business Rule',
        version: '1.0',
        expression: 'mockExpression = mockValue'
      }
    ],
    dataAssetSnapshot: {
      id: 'data_asset_mock',
      name: 'Mock Data Asset',
      table: 'mock_table',
      version: '1.0'
    },
    executionSnapshot: {
      agentId: 'agent_mock_analyst',
      agentVersion: '1.0.0',
      steps: traceSteps.map(s => s.stepKey),
      toolCalls: traceToolCalls,
      startedAt,
      completedAt,
      trace: {
        steps: traceSteps,
        toolCalls: traceToolCalls
      }
    }
  }
}

export async function createAnalysis(payload) {
  const { question, context } = payload

  const analysis = createMockAnalysis({
    question,
    context
  })

  updateMockAnalysis(analysis.id, analysis)

  return getMockAnalysis(analysis.id)
}

export function getAnalysis(id) {
  return getMockAnalysis(id)
}

export function listAnalyses() {
  return listMockAnalyses()
}

export async function runAnalysis(id) {
  const analysis = validateAnalysisExists(id)
  validateCanRun(analysis)

  const steps = createStepsSnapshot()
  updateMockAnalysis(id, {
    status: 'running',
    currentStep: steps[0].key,
    steps,
    result: null,
    evidence: null,
    error: null
  })

  runMockRunner(id)

  return getMockAnalysis(id)
}

export async function retryAnalysis(id) {
  const analysis = validateAnalysisExists(id)
  validateCanRetry(analysis)

  const steps = createStepsSnapshot()
  updateMockAnalysis(id, {
    status: 'running',
    currentStep: steps[0].key,
    steps,
    result: null,
    evidence: null,
    reportId: null,
    error: null
  })

  runMockRunner(id)

  return getMockAnalysis(id)
}

export async function cancelAnalysis(id) {
  const analysis = validateAnalysisExists(id)
  validateCanCancel(analysis)

  const steps = analysis.steps.map(step => {
    if (step.status === 'pending' || step.status === 'running') {
      return { ...step, status: 'cancelled' }
    }
    return step
  })

  updateMockAnalysis(id, {
    status: 'cancelled',
    currentStep: null,
    steps
  })

  return getMockAnalysis(id)
}

export function getAnalysisResult(id) {
  const analysis = validateAnalysisExists(id)
  return analysis.result
}

export function drillDown(id, dimension, value) {
  const analysis = validateAnalysisExists(id)

  if (!analysis.result) {
    return null
  }

  const validDimensions = ['market', 'brand', 'region', 'category']
  if (!validDimensions.includes(dimension)) {
    throw new AnalysisServiceError(
      AnalysisErrorCode.DRILLDOWN_INVALID_DIMENSION,
      `Invalid dimension: ${dimension}. Valid dimensions: ${validDimensions.join(', ')}`
    )
  }

  const filteredDrivers = analysis.result.drivers.filter(
    d => d.dimension === dimension && d.value === value
  )

  const breadcrumbs = [
    { dimension: 'market', value: 'Japan' },
    { dimension, value }
  ]

  return {
    analysisId: id,
    dimension,
    value,
    breadcrumbs,
    kpis: analysis.result.kpis,
    trend: analysis.result.trend,
    drivers: filteredDrivers.length > 0 ? filteredDrivers : analysis.result.drivers,
    insights: analysis.result.insights
  }
}

export function getEvidence(id) {
  const analysis = validateAnalysisExists(id)
  return analysis.evidence
}

export function getTrace(id) {
  const analysis = validateAnalysisExists(id)

  if (!analysis.evidence || !analysis.evidence.executionSnapshot) {
    return null
  }

  return analysis.evidence.executionSnapshot.trace
}

export function generateReport(id) {
  const analysis = validateAnalysisExists(id)

  const reportId = `report_${analysis.id}_${Date.now()}`
  updateMockAnalysis(id, {
    reportId
  })

  return reportId
}
