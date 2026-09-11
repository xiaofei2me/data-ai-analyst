export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const revenue = [1200, 1350, 1100, 1400, 1500, 1600, 1800, 2000, 1900, 2100, 2300, 2200]

export const cost = [700, 780, 650, 800, 850, 900, 1000, 1100, 1050, 1150, 1250, 1200]

export const profit = [35, 36, 34, 36, 37, 38, 39, 38, 37, 38, 39, 40]

export const brands = ['Series X', 'Series Y', 'Series Z']

export const brandR = {
  'Series X': [950, 1050, 800, 1100, 1200, 1300, 1450, 1600, 1500, 1700, 1850, 1750],
  'Series Y': [200, 250, 250, 250, 250, 250, 280, 300, 300, 300, 320, 320],
  'Series Z': [50, 50, 50, 50, 50, 50, 70, 100, 100, 100, 130, 130]
}

export const regions = ['North', 'East', 'South', 'West']

export const regR = {
  'North': [180, 200, 160, 210, 220, 240, 270, 300, 285, 310, 335, 330],
  'East': [90, 100, 80, 105, 110, 120, 135, 150, 145, 160, 175, 170],
  'South': [70, 80, 65, 85, 90, 100, 110, 120, 115, 125, 135, 130],
  'West': [40, 45, 35, 50, 50, 50, 50, 50, 50, 50, 50, 50]
}

export const channels = ['Online', 'Offline', 'Wholesale']

export const chnR = {
  'Online': [400, 450, 350, 470, 500, 540, 600, 670, 630, 700, 770, 730],
  'Offline': [500, 550, 470, 580, 620, 660, 730, 800, 770, 840, 900, 870],
  'Wholesale': [300, 350, 280, 350, 380, 400, 470, 530, 500, 560, 630, 600]
}

export const analyzes = [
  { id: 'a1', title: 'Q3 Sales Analysis', date: '2024-10-15', status: 'done', q: 'Analyze Q3 sales data' },
  { id: 'a2', title: 'Revenue by Region', date: '2024-10-14', status: 'done', q: 'Revenue distribution by region' },
  { id: 'a3', title: 'Brand Comparison', date: '2024-10-13', status: 'done', q: 'Compare brand performance' },
  { id: 'a4', title: 'Channel Analysis', date: '2024-10-12', status: 'done', q: 'Sales channel analysis' },
  { id: 'a5', title: 'Cost Structure', date: '2024-10-11', status: 'done', q: 'Cost breakdown analysis' }
]

export const reports = [
  { id: 'r1', title: 'Q3 Sales Performance Report', date: '2024-10-15', status: 'published', author: 'Admin' },
  { id: 'r2', title: 'Annual Revenue Forecast', date: '2024-10-14', status: 'draft', author: 'Admin' },
  { id: 'r3', title: 'Regional Market Analysis', date: '2024-10-13', status: 'published', author: 'Admin' }
]

export const templates = [
  { id: 't1', name: 'Sales Analysis', desc: 'Standard sales analysis template' },
  { id: 't2', name: 'Revenue Report', desc: 'Monthly revenue report template' },
  { id: 't3', name: 'Brand Comparison', desc: 'Brand performance comparison' },
  { id: 't4', name: 'Channel Analysis', desc: 'Sales channel breakdown' }
]

export const metrics = [
  { name: 'Revenue Growth', type: 'Calculated', expr: '(current - previous) / previous * 100', owner: 'Admin', status: 'active' },
  { name: 'Gross Margin', type: 'Calculated', expr: '(revenue - cost) / revenue * 100', owner: 'Admin', status: 'active' },
  { name: 'Customer Retention', type: 'Calculated', expr: 'returning_customers / total_customers * 100', owner: 'Admin', status: 'active' },
  { name: 'Avg Order Value', type: 'Calculated', expr: 'total_revenue / total_orders', owner: 'Admin', status: 'active' },
  { name: 'Conversion Rate', type: 'Calculated', expr: 'conversions / visitors * 100', owner: 'Admin', status: 'active' }
]

export const dimensions = [
  { name: 'Date', type: 'Time', source: 'fact_sales', owner: 'Admin', status: 'active' },
  { name: 'Region', type: 'Categorical', source: 'dim_region', owner: 'Admin', status: 'active' },
  { name: 'Brand', type: 'Categorical', source: 'dim_brand', owner: 'Admin', status: 'active' },
  { name: 'Channel', type: 'Categorical', source: 'dim_channel', owner: 'Admin', status: 'active' },
  { name: 'Product', type: 'Categorical', source: 'dim_product', owner: 'Admin', status: 'active' }
]

export const entities = [
  { name: 'Customer', type: 'Business', source: 'dim_customer', owner: 'Admin', status: 'active' },
  { name: 'Product', type: 'Business', source: 'dim_product', owner: 'Admin', status: 'active' },
  { name: 'Order', type: 'Transaction', source: 'fact_sales', owner: 'Admin', status: 'active' },
  { name: 'Invoice', type: 'Transaction', source: 'fact_invoices', owner: 'Admin', status: 'active' }
]

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

export const evalData = {
  accuracy: 94.2,
  precision: 92.8,
  recall: 91.5,
  f1: 92.1,
  latency: 145,
  throughput: 1250
}

export const monitorData = {
  uptime: 99.9,
  errors: 3,
  latency: 145,
  requests: 125000
}

export const knowledge = [
  { title: 'Sales Analysis Guide', desc: 'How to analyze sales data effectively', type: 'doc' },
  { title: 'Revenue Metrics Definition', desc: 'Standard definitions for revenue metrics', type: 'doc' },
  { title: 'SQL Best Practices', desc: 'Best practices for writing SQL queries', type: 'guide' },
  { title: 'Data Quality Rules', desc: 'Rules for ensuring data quality', type: 'rule' }
]

export const dataSources = [
  { name: 'Sales Database', type: 'PostgreSQL', status: 'active', tables: 12 },
  { name: 'CRM System', type: 'MySQL', status: 'active', tables: 8 },
  { name: 'ERP System', type: 'SQL Server', status: 'active', tables: 15 },
  { name: 'Analytics Lake', type: 'S3/Parquet', status: 'active', tables: 25 }
]

export const tables = [
  { name: 'fact_sales', source: 'Sales Database', rows: '2.5M', cols: 12, status: 'active' },
  { name: 'dim_region', source: 'Sales Database', rows: '500', cols: 5, status: 'active' },
  { name: 'dim_brand', source: 'Sales Database', rows: '100', cols: 4, status: 'active' },
  { name: 'dim_channel', source: 'Sales Database', rows: '50', cols: 3, status: 'active' },
  { name: 'dim_product', source: 'Sales Database', rows: '1000', cols: 8, status: 'active' },
  { name: 'dim_customer', source: 'CRM System', rows: '50000', cols: 15, status: 'active' },
  { name: 'fact_invoices', source: 'ERP System', rows: '1.8M', cols: 10, status: 'active' }
]

export const defaultSettings = {
  profile: { name: 'Admin User', email: 'admin@company.com', role: 'Admin', avatar: 'AD' },
  appearance: { language: 'en', theme: 'light', workspace: 'biz', sidebarCollapsed: false, compactMode: false },
  dataSources: { autoRefresh: true, refreshInterval: '15', cacheEnabled: true, cacheTTL: '300', queryTimeout: '30', maxRows: '10000' },
  aiModels: { defaultModel: 'GPT-4', temperature: 70, maxTokens: '4096', streaming: true, autoOptimizeSql: true, contextWindow: '8' },
  notifications: { emailAlerts: true, desktopNotifications: false, analysisComplete: true, reportReady: true, systemErrors: true, weeklyDigest: false },
  apiKeys: { openaiKey: '', anthropicKey: '', customEndpoint: '' },
  security: { twoFactorAuth: true, sessionTimeout: '30', ipWhitelist: false, auditLogging: true, dataEncryption: true },
  dataRetention: { analysisHistory: '90', reportHistory: '365', auditLogs: '365', autoDeleteExpired: true },
  integrations: { slackNotifications: false, webhookUrl: '', emailReports: true, reportRecipients: 'admin@company.com' }
}

export const navBiz = [
  {
    l: 'Core',
    i: 'fas fa-layer-group',
    items: [
      { id: 'home', i: 'fas fa-home', t: 'nav_home' },
      { id: 'analysis', i: 'fas fa-chart-bar', t: 'nav_analysis' },
      { id: 'my-analyses', i: 'fas fa-folder', t: 'nav_my' },
      { id: 'reports', i: 'fas fa-file-alt', t: 'nav_reports' },
      { id: 'templates', i: 'fas fa-copy', t: 'nav_templates' },
      { id: 'favorites', i: 'fas fa-star', t: 'nav_favorites' }
    ]
  },
  {
    l: 'Data',
    i: 'fas fa-database',
    items: [
      { id: 'semantic', i: 'fas fa-cubes', t: 'nav_semantic' },
      { id: 'catalog', i: 'fas fa-th-list', t: 'nav_catalog' },
      { id: 'knowledge', i: 'fas fa-book', t: 'nav_knowledge' }
    ]
  }
]

export const navTech = [
  {
    l: 'AI',
    i: 'fas fa-robot',
    items: [
      { id: 'agents', i: 'fas fa-robot', t: 'nav_agents' },
      { id: 'capabilities', i: 'fas fa-cogs', t: 'nav_capabilities' },
      { id: 'data-tools', i: 'fas fa-tools', t: 'nav_data_tools' },
      { id: 'ai-models', i: 'fas fa-brain', t: 'nav_ai_models' },
      { id: 'evaluation', i: 'fas fa-chart-line', t: 'nav_evaluation' },
      { id: 'monitoring', i: 'fas fa-heartbeat', t: 'nav_monitoring' }
    ]
  },
  {
    l: 'System',
    i: 'fas fa-cog',
    items: [
      { id: 'permissions', i: 'fas fa-shield-alt', t: 'nav_permissions' }
    ]
  }
]

export const pageNames = {
  home: 'Home',
  analysis: 'Data Analysis',
  'my-analyses': 'My Analyses',
  reports: 'Reports',
  templates: 'Templates',
  favorites: 'Favorites',
  semantic: 'Semantic Layer',
  catalog: 'Data Catalog',
  knowledge: 'Knowledge Base',
  agents: 'AI Agents',
  capabilities: 'Capabilities',
  'data-tools': 'Data Tools',
  'ai-models': 'AI Models',
  evaluation: 'Evaluation',
  monitoring: 'Monitoring',
  permissions: 'Permissions',
  overview: 'Architecture',
  settings: 'Settings'
}
