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
