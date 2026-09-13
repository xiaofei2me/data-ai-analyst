import { ANALYSIS_STEPS } from './analysisSteps'

const DEFAULT_CONTEXT = {
  market: { id: 'market_jp', name: 'Japan' },
  timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
  currency: 'JPY',
  comparison: { type: 'yoy', enabled: true },
  dimensions: ['brand', 'region', 'category']
}

const DEFAULT_REFERENCES = {
  metricIds: ['metric_net_sales'],
  semanticModelIds: ['semantic_sales_analytics'],
  businessRuleIds: ['rule_japan_sales_v2'],
  dataAssetIds: ['data_asset_sales_fact'],
  agentId: 'agent_data_analyst',
  skillIds: ['skill_trend_analysis', 'skill_root_cause'],
  toolIds: ['tool_execute_sql', 'tool_validate_sql']
}

function createStepsFromDefinitions(status = 'pending') {
  return ANALYSIS_STEPS.map(step => ({
    key: step.key,
    status,
    dependsOn: [...step.dependsOn],
    startedAt: null,
    completedAt: null,
    duration: null,
    error: null
  }))
}

function createCompletedSteps(upToIndex) {
  const steps = createStepsFromDefinitions('pending')
  const now = '2026-03-15T10:00:00Z'

  for (let i = 0; i <= upToIndex; i++) {
    steps[i].status = 'completed'
    steps[i].startedAt = `2026-03-15T${String(9 + Math.floor(i / 2)).padStart(2, '0')}:${String(i * 6).padStart(2, '0')}:00Z`
    steps[i].completedAt = `2026-03-15T${String(9 + Math.floor((i + 1) / 2)).padStart(2, '0')}:${String((i + 1) * 6).padStart(2, '0')}:00Z`
    steps[i].duration = 300 + i * 50
  }

  return steps
}

const JAPAN_SALES_RESULT = {
  summary: {
    title: 'Japan 2026 Sales Analysis',
    conclusion: 'Japan net sales declined 8.7% YoY in 2026, primarily driven by declines in Brand A, Tokyo region, and Category X.',
    period: '2026 Full Year',
    status: 'completed'
  },
  kpis: [
    { id: 'kpi_net_sales', label: 'Net Sales', value: 128600000, unit: 'JPY', format: 'currency', yoy: -8.7 },
    { id: 'kpi_yoy', label: 'YoY Change', value: -8.7, unit: '%', format: 'percent' },
    { id: 'kpi_main_driver', label: 'Main Driver', value: 'Brand A', format: 'text', impact: -18.2 },
    { id: 'kpi_data_quality', label: 'Data Quality', value: 99.8, unit: '%', format: 'percent' }
  ],
  trend: [
    { period: '2026-01', value: 10200000, comparisonValue: 11500000, yoy: -11.3 },
    { period: '2026-02', value: 9800000, comparisonValue: 10800000, yoy: -9.3 },
    { period: '2026-03', value: 11500000, comparisonValue: 12200000, yoy: -5.7 },
    { period: '2026-04', value: 10800000, comparisonValue: 11800000, yoy: -8.5 },
    { period: '2026-05', value: 11200000, comparisonValue: 12100000, yoy: -7.4 },
    { period: '2026-06', value: 10500000, comparisonValue: 11600000, yoy: -9.5 },
    { period: '2026-07', value: 10000000, comparisonValue: 11000000, yoy: -9.1 },
    { period: '2026-08', value: 9800000, comparisonValue: 10900000, yoy: -10.1 },
    { period: '2026-09', value: 11000000, comparisonValue: 11900000, yoy: -7.6 },
    { period: '2026-10', value: 11500000, comparisonValue: 12500000, yoy: -8.0 },
    { period: '2026-11', value: 11800000, comparisonValue: 12800000, yoy: -7.8 },
    { period: '2026-12', value: 10500000, comparisonValue: 11900000, yoy: -11.8 }
  ],
  drivers: [
    { dimension: 'brand', value: 'Brand A', contribution: -18.2, yoy: -18.2, impact: -4.5, rank: 1, explanation: 'Brand A experienced significant decline across all regions, with Tokyo showing the largest drop.' },
    { dimension: 'region', value: 'Tokyo', contribution: -15.6, yoy: -15.6, impact: -3.8, rank: 2, explanation: 'Tokyo region declined 15.6% YoY, primarily due to Brand A underperformance.' },
    { dimension: 'category', value: 'Category X', contribution: -13.4, yoy: -13.4, impact: -2.1, rank: 3, explanation: 'Category X showed the steepest decline among all product categories.' },
    { dimension: 'brand', value: 'Brand B', contribution: 18.0, yoy: 18.0, impact: 2.8, rank: 4, explanation: 'Brand B growth partially offset overall decline, especially in Osaka region.' },
    { dimension: 'region', value: 'Osaka', contribution: 12.4, yoy: 12.4, impact: 1.5, rank: 5, explanation: 'Osaka region showed strong growth, driven by Brand B and Category Y expansion.' }
  ],
  rootCause: [
    { level: 0, dimension: 'market', value: 'Japan', change: -8.7, contribution: 100 },
    { level: 1, dimension: 'brand', value: 'Brand A', change: -18.2, contribution: 52 },
    { level: 2, dimension: 'region', value: 'Tokyo', change: -15.6, contribution: 44 },
    { level: 3, dimension: 'category', value: 'Category X', change: -13.4, contribution: 35 }
  ],
  insights: [
    { id: 'insight_001', type: 'driver', title: 'Brand A is the Largest Negative Driver', description: 'Brand A declined 18.2% YoY, contributing 52% of the total sales decline. The decline is consistent across all regions.', impact: 'high', evidenceIds: ['metric_net_sales', 'data_asset_sales_fact'] },
    { id: 'insight_002', type: 'region', title: 'Tokyo Region Underperforms', description: 'Tokyo declined 15.6% YoY, accounting for 44% of the total decline. Brand A in Tokyo shows the steepest drop.', impact: 'high', evidenceIds: ['semantic_sales_analytics'] },
    { id: 'insight_003', type: 'growth', title: 'Brand B Growth Offsets Decline', description: 'Brand B grew 18.0% YoY, partially offsetting the overall decline. Osaka region shows strongest growth.', impact: 'medium', evidenceIds: ['metric_net_sales'] }
  ],
  recommendations: [
    { id: 'rec_001', priority: 'high', title: 'Restore Brand A in Tokyo', description: 'Prioritize recovery strategy for Brand A in Tokyo region. Investigate competitive factors and customer preferences.', expectedImpact: 'Recover 3-5% of total decline' },
    { id: 'rec_002', priority: 'high', title: 'Analyze Category X Decline', description: 'Deep dive into Category X to understand root causes. Consider market trends, pricing, and product mix factors.', expectedImpact: 'Identify actionable improvement areas' },
    { id: 'rec_003', priority: 'medium', title: 'Replicate Brand B Success', description: 'Study Brand B growth strategies in Osaka and apply learnings to other regions and brands.', expectedImpact: 'Accelerate growth in underperforming areas' }
  ],
  validation: {
    status: 'passed',
    metricValidation: { status: 'passed', checkedAt: '2026-03-15T12:00:00Z' },
    businessRuleValidation: { status: 'passed', checkedAt: '2026-03-15T12:00:00Z' },
    dataQuality: { status: 'warning', completeness: 99.8, accuracy: 98.9, freshness: 99.5 },
    resultValidation: { status: 'passed', confidence: 0.94, checkedAt: '2026-03-15T12:00:00Z' }
  }
}

const JAPAN_SALES_EVIDENCE = {
  metricSnapshot: { id: 'metric_net_sales', name: 'Net Sales', definition: 'Total revenue after deductions', aggregation: 'sum', currency: 'JPY', version: '2.1' },
  semanticModelSnapshot: { id: 'semantic_sales_analytics', name: 'Sales Analytics Model', version: '3.0' },
  businessRuleSnapshots: [{ id: 'rule_japan_sales_v2', name: 'Japan Sales Calculation v2', version: '2.0', expression: 'netSales = grossSales - returns - discounts' }],
  dataAssetSnapshot: { id: 'data_asset_sales_fact', name: 'Sales Fact Table', table: 'fact_sales', version: '1.5' },
  executionSnapshot: { agentId: 'agent_data_analyst', agentVersion: '1.2.0', skillIds: ['skill_trend_analysis', 'skill_root_cause'], toolIds: ['tool_execute_sql', 'tool_validate_sql'], executedAt: '2026-03-15T09:00:00Z' }
}

export function createMockAnalysis(data = {}) {
  const now = new Date().toISOString()

  return {
    id: data.id || 'analysis_new',
    question: data.question || '',

    status: data.status || 'draft',
    currentStep: data.currentStep || null,
    steps: data.steps || createStepsFromDefinitions('pending'),

    context: data.context || { ...DEFAULT_CONTEXT },
    references: data.references || { ...DEFAULT_REFERENCES },

    result: data.result || null,
    evidence: data.evidence || null,

    reportId: data.reportId || null,

    createdAt: data.createdAt || now,
    updatedAt: data.updatedAt || now,

    error: data.error || null
  }
}

export function createJapanSalesAnalysis(overrides = {}) {
  const base = {
    id: 'analysis_japan_sales_2026',
    question: 'Analyze Japan 2026 sales performance and identify key drivers of decline',
    status: 'completed',
    currentStep: null,
    steps: createCompletedSteps(9),
    context: { ...DEFAULT_CONTEXT },
    references: { ...DEFAULT_REFERENCES },
    result: { ...JAPAN_SALES_RESULT },
    evidence: { ...JAPAN_SALES_EVIDENCE },
    reportId: 'report_japan_sales_2026',
    createdAt: '2026-03-15T09:00:00Z',
    updatedAt: '2026-03-15T12:00:00Z',
    error: null
  }

  return { ...base, ...overrides }
}

const mockAnalyses = [
  createJapanSalesAnalysis({
    id: 'analysis_japan_sales_2026',
    status: 'completed'
  }),

  createJapanSalesAnalysis({
    id: 'analysis_japan_sales_running',
    status: 'running',
    currentStep: 'data_discovery',
    steps: (() => {
      const steps = createStepsFromDefinitions('pending')
      const runningIdx = 3

      for (let i = 0; i < runningIdx; i++) {
        steps[i].status = 'completed'
        steps[i].startedAt = `2026-03-15T${String(9 + Math.floor(i / 2)).padStart(2, '0')}:00:00Z`
        steps[i].completedAt = `2026-03-15T${String(9 + Math.floor((i + 1) / 2)).padStart(2, '0')}:00:00Z`
        steps[i].duration = 300 + i * 50
      }

      steps[runningIdx].status = 'running'
      steps[runningIdx].startedAt = '2026-03-15T11:00:00Z'

      return steps
    })(),
    result: null,
    evidence: null,
    reportId: null,
    createdAt: '2026-03-15T09:00:00Z',
    updatedAt: '2026-03-15T11:00:00Z'
  }),

  createJapanSalesAnalysis({
    id: 'analysis_japan_sales_draft',
    status: 'draft',
    currentStep: null,
    steps: createStepsFromDefinitions('pending'),
    result: null,
    evidence: null,
    reportId: null,
    createdAt: '2026-03-15T08:00:00Z',
    updatedAt: '2026-03-15T08:00:00Z'
  }),

  createJapanSalesAnalysis({
    id: 'analysis_japan_sales_failed',
    status: 'failed',
    currentStep: 'semantic_resolution',
    steps: (() => {
      const steps = createStepsFromDefinitions('pending')

      for (let i = 0; i < 2; i++) {
        steps[i].status = 'completed'
        steps[i].startedAt = `2026-03-15T${String(9 + i)}:00:00Z`
        steps[i].completedAt = `2026-03-15T${String(9 + i)}:30:00Z`
        steps[i].duration = 1800
      }

      steps[2].status = 'failed'
      steps[2].startedAt = '2026-03-15T11:00:00Z'
      steps[2].error = { code: 'SEMANTIC_RESOLUTION_FAILED', message: 'Failed to resolve sales metric business definition' }

      for (let i = 3; i < steps.length; i++) {
        steps[i].status = 'cancelled'
      }

      return steps
    })(),
    result: null,
    evidence: null,
    reportId: null,
    createdAt: '2026-03-15T09:00:00Z',
    updatedAt: '2026-03-15T11:30:00Z',
    error: { code: 'SEMANTIC_RESOLUTION_FAILED', message: 'Failed to resolve sales metric business definition', step: 'semantic_resolution', occurredAt: '2026-03-15T11:30:00Z' }
  })
]

export function getMockAnalysis(id) {
  return mockAnalyses.find(a => a.id === id) || null
}

export function listMockAnalyses() {
  return [...mockAnalyses]
}

export function updateMockAnalysis(id, patch) {
  const index = mockAnalyses.findIndex(a => a.id === id)
  if (index === -1) return null

  mockAnalyses[index] = { ...mockAnalyses[index], ...patch, updatedAt: new Date().toISOString() }
  return mockAnalyses[index]
}
