import { describe, it, expect, beforeEach } from 'vitest'
import { createAnalysis, getAnalysis, listAnalyses } from '../services/analysisService'

describe('Analysis Creation', () => {
  let initialAnalysesCount

  beforeEach(() => {
    initialAnalysesCount = listAnalyses().length
  })

  it('createAnalysis() should return non-null Analysis', async () => {
    const analysis = await createAnalysis({
      question: 'Test question',
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    expect(analysis).not.toBeNull()
    expect(analysis).toBeDefined()
  })

  it('returned Analysis should have valid id', async () => {
    const analysis = await createAnalysis({
      question: 'Test question',
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    expect(analysis.id).toBeDefined()
    expect(analysis.id).not.toBeNull()
    expect(analysis.id).not.toBe('')
  })

  it('returned Analysis id should not conflict with fixed fixtures', async () => {
    const analysis = await createAnalysis({
      question: 'Test question',
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    const fixedFixtureIds = [
      'analysis_japan_sales_2026',
      'analysis_japan_sales_running',
      'analysis_japan_sales_draft',
      'analysis_japan_sales_failed'
    ]

    expect(fixedFixtureIds).not.toContain(analysis.id)
  })

  it('question should be saved correctly', async () => {
    const testQuestion = 'Analyze Japan 2026 sales'
    const analysis = await createAnalysis({
      question: testQuestion,
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    expect(analysis.question).toBe(testQuestion)
  })

  it('context should be saved correctly', async () => {
    const testContext = {
      market: { id: 'market_jp', name: 'Japan' },
      timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
      currency: 'JPY',
      comparison: { type: 'yoy', enabled: true },
      dimensions: ['brand', 'region', 'category']
    }

    const analysis = await createAnalysis({
      question: 'Test question',
      context: testContext
    })

    expect(analysis.context).toEqual(testContext)
  })

  it('getAnalysis(id) should be able to retrieve the created Analysis', async () => {
    const analysis = await createAnalysis({
      question: 'Test question',
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    const retrievedAnalysis = getAnalysis(analysis.id)

    expect(retrievedAnalysis).not.toBeNull()
    expect(retrievedAnalysis.id).toBe(analysis.id)
    expect(retrievedAnalysis.question).toBe(analysis.question)
  })

  it('consecutive creations should have different IDs', async () => {
    const analysis1 = await createAnalysis({
      question: 'Test question 1',
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    const analysis2 = await createAnalysis({
      question: 'Test question 2',
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    expect(analysis1.id).not.toBe(analysis2.id)
  })

  it('fixed fixtures should still exist after creation', async () => {
    await createAnalysis({
      question: 'Test question',
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    const analyses = listAnalyses()

    expect(analyses.find(a => a.id === 'analysis_japan_sales_2026')).toBeDefined()
    expect(analyses.find(a => a.id === 'analysis_japan_sales_running')).toBeDefined()
    expect(analyses.find(a => a.id === 'analysis_japan_sales_draft')).toBeDefined()
    expect(analyses.find(a => a.id === 'analysis_japan_sales_failed')).toBeDefined()
  })

  it('should not produce duplicate fixtures', async () => {
    await createAnalysis({
      question: 'Test question',
      context: {
        market: { id: 'market_jp', name: 'Japan' },
        timeRange: { start: '2026-01-01', end: '2026-12-31', granularity: 'month' },
        currency: 'JPY',
        comparison: { type: 'yoy', enabled: true },
        dimensions: ['brand', 'region', 'category']
      }
    })

    const analyses = listAnalyses()
    const fixedFixtureIds = [
      'analysis_japan_sales_2026',
      'analysis_japan_sales_running',
      'analysis_japan_sales_draft',
      'analysis_japan_sales_failed'
    ]

    fixedFixtureIds.forEach(id => {
      const count = analyses.filter(a => a.id === id).length
      expect(count).toBe(1)
    })
  })
})