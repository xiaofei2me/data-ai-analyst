import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  async function loginWithAzure() {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))

    const mockUser = {
      id: 'usr_001',
      name: '张明',
      email: 'zhangming@company.com',
      avatar: null,
      role: 'admin',
      department: '数据分析部',
      loginTime: new Date().toISOString()
    }

    user.value = mockUser
    localStorage.setItem('auth_user', JSON.stringify(mockUser))
    loading.value = false
    return mockUser
  }

  function logout() {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  return { user, loading, isAuthenticated, loginWithAzure, logout }
})
