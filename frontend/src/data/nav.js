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
      { id: 'skills', i: 'fas fa-cogs', t: 'nav_skills' },
      { id: 'tools', i: 'fas fa-tools', t: 'nav_tools' },
      { id: 'models', i: 'fas fa-brain', t: 'nav_models' },
      { id: 'evaluation', i: 'fas fa-chart-line', t: 'nav_evaluation' },
      { id: 'operations', i: 'fas fa-heartbeat', t: 'nav_operations' }
    ]
  },
  {
    l: 'System',
    i: 'fas fa-cog',
    items: [
      { id: 'governance', i: 'fas fa-shield-alt', t: 'nav_governance' }
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
  skills: 'Skills',
  tools: 'Tools',
  models: 'Models',
  evaluation: 'Evaluation',
  operations: 'Operations',
  governance: 'Governance',
  platform: 'Platform',
  settings: 'Settings'
}
