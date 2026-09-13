export const ANALYSIS_STEPS = [
  {
    key: 'understanding',
    labelKey: 'analysis.steps.understanding',
    descriptionKey: 'analysis.stepDescriptions.understanding',
    icon: 'search',
    dependsOn: []
  },
  {
    key: 'analysis_plan',
    labelKey: 'analysis.steps.analysis_plan',
    descriptionKey: 'analysis.stepDescriptions.analysis_plan',
    icon: 'plan',
    dependsOn: ['understanding']
  },
  {
    key: 'semantic_resolution',
    labelKey: 'analysis.steps.semantic_resolution',
    descriptionKey: 'analysis.stepDescriptions.semantic_resolution',
    icon: 'semantic',
    dependsOn: ['analysis_plan']
  },
  {
    key: 'data_discovery',
    labelKey: 'analysis.steps.data_discovery',
    descriptionKey: 'analysis.stepDescriptions.data_discovery',
    icon: 'database',
    dependsOn: ['semantic_resolution']
  },
  {
    key: 'trend_analysis',
    labelKey: 'analysis.steps.trend_analysis',
    descriptionKey: 'analysis.stepDescriptions.trend_analysis',
    icon: 'trend',
    dependsOn: ['data_discovery']
  },
  {
    key: 'driver_analysis',
    labelKey: 'analysis.steps.driver_analysis',
    descriptionKey: 'analysis.stepDescriptions.driver_analysis',
    icon: 'driver',
    dependsOn: ['trend_analysis']
  },
  {
    key: 'root_cause_analysis',
    labelKey: 'analysis.steps.root_cause_analysis',
    descriptionKey: 'analysis.stepDescriptions.root_cause_analysis',
    icon: 'root-cause',
    dependsOn: ['driver_analysis']
  },
  {
    key: 'validation',
    labelKey: 'analysis.steps.validation',
    descriptionKey: 'analysis.stepDescriptions.validation',
    icon: 'check-circle',
    dependsOn: ['root_cause_analysis']
  },
  {
    key: 'insight_generation',
    labelKey: 'analysis.steps.insight_generation',
    descriptionKey: 'analysis.stepDescriptions.insight_generation',
    icon: 'lightbulb',
    dependsOn: ['validation']
  },
  {
    key: 'recommendation',
    labelKey: 'analysis.steps.recommendation',
    descriptionKey: 'analysis.stepDescriptions.recommendation',
    icon: 'recommendation',
    dependsOn: ['insight_generation']
  }
]

export function getStepByKey(key) {
  return ANALYSIS_STEPS.find(s => s.key === key)
}

export function getStepIndex(key) {
  return ANALYSIS_STEPS.findIndex(s => s.key === key)
}
