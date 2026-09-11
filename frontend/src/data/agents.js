export const agents = [
  { name: 'Data Analyst', desc: 'Analyzes data and generates insights', status: 'active', skills: ['Data Query', 'Chart Generation'] },
  { name: 'Report Generator', desc: 'Creates structured analysis reports', status: 'active', skills: ['Report Writing', 'Template Management'] },
  { name: 'SQL Optimizer', desc: 'Optimizes SQL queries for performance', status: 'inactive', skills: ['SQL Optimization'] },
  { name: 'Data Validator', desc: 'Validates data quality and consistency', status: 'active', skills: ['Data Validation', 'Anomaly Detection'] }
]

export const skills = [
  { name: 'Data Query', desc: 'Query data from multiple sources', agent: 'Data Analyst', status: 'active' },
  { name: 'Chart Generation', desc: 'Generate interactive visualizations', agent: 'Data Analyst', status: 'active' },
  { name: 'Report Writing', desc: 'Create structured analysis reports', agent: 'Report Generator', status: 'active' },
  { name: 'SQL Optimization', desc: 'Optimize SQL queries', agent: 'SQL Optimizer', status: 'inactive' },
  { name: 'Data Validation', desc: 'Validate data quality', agent: 'Data Validator', status: 'active' },
  { name: 'Anomaly Detection', desc: 'Detect anomalies in data', agent: 'Data Validator', status: 'active' }
]

export const models = [
  { name: 'GPT-4', type: 'LLM', status: 'active', accuracy: 95, latency: 120, updated: '2024-10-15' },
  { name: 'Claude-3', type: 'LLM', status: 'active', accuracy: 93, latency: 150, updated: '2024-10-14' },
  { name: 'SQL-Gen-v2', type: 'Fine-tuned', status: 'active', accuracy: 89, latency: 80, updated: '2024-10-13' },
  { name: 'Insight-Engine', type: 'Custom', status: 'training', accuracy: 85, latency: 200, updated: '2024-10-12' }
]
