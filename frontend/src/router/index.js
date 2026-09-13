import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { requiresAuth: true } },
  { path: '/analysis', name: 'analysis', component: () => import('../views/AnalysisView.vue'), meta: { requiresAuth: true } },
  { path: '/analysis/:id', name: 'analysis-detail', component: () => import('../views/AnalysisView.vue'), meta: { requiresAuth: true } },
  { path: '/my-analyses', name: 'my-analyses', component: () => import('../views/MyAnalysesView.vue'), meta: { requiresAuth: true } },
  { path: '/reports', name: 'reports', component: () => import('../views/ReportsView.vue'), meta: { requiresAuth: true } },
  { path: '/reports/:id', name: 'report-detail', component: () => import('../views/ReportView.vue'), meta: { requiresAuth: true } },
  { path: '/report', redirect: '/reports' },
  { path: '/templates', name: 'templates', component: () => import('../views/TemplatesView.vue'), meta: { requiresAuth: true } },
  { path: '/favorites', name: 'favorites', component: () => import('../views/FavoritesView.vue'), meta: { requiresAuth: true } },
  { path: '/platform', name: 'platform', component: () => import('../views/OverviewView.vue'), meta: { requiresAuth: true } },
  { path: '/semantic', name: 'semantic', component: () => import('../views/SemanticView.vue'), meta: { requiresAuth: true } },
  { path: '/semantic/:id', name: 'semantic-detail', component: () => import('../views/SemanticView.vue'), meta: { requiresAuth: true } },
  { path: '/catalog', name: 'catalog', component: () => import('../views/CatalogView.vue'), meta: { requiresAuth: true } },
  { path: '/catalog/:assetId', name: 'catalog-detail', component: () => import('../views/CatalogView.vue'), meta: { requiresAuth: true } },
  { path: '/knowledge', name: 'knowledge', component: () => import('../views/KnowledgeView.vue'), meta: { requiresAuth: true } },
  { path: '/agents', name: 'agents', component: () => import('../views/AgentsView.vue'), meta: { requiresAuth: true } },
  { path: '/agents/:id', name: 'agent-detail', component: () => import('../views/AgentsView.vue'), meta: { requiresAuth: true } },
  { path: '/skills', name: 'skills', component: () => import('../views/CapabilitiesView.vue'), meta: { requiresAuth: true } },
  { path: '/tools', name: 'tools', component: () => import('../views/DataToolsView.vue'), meta: { requiresAuth: true } },
  { path: '/models', name: 'models', component: () => import('../views/AiModelsView.vue'), meta: { requiresAuth: true } },
  { path: '/evaluation', name: 'evaluation', component: () => import('../views/EvaluationView.vue'), meta: { requiresAuth: true } },
  { path: '/operations', name: 'operations', component: () => import('../views/MonitoringView.vue'), meta: { requiresAuth: true } },
  { path: '/governance', name: 'governance', component: () => import('../views/PermissionsView.vue'), meta: { requiresAuth: true } },
  { path: '/settings', name: 'settings', component: () => import('../views/SettingsView.vue'), meta: { requiresAuth: true } },
  { path: '/prototype/login', name: 'prototype-login', component: () => import('../views/prototype/LoginPrototype.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
