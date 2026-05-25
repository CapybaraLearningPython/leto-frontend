import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const USER_KEY = 'USER_KEY'
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(JSON.parse(localStorage.getItem(USER_KEY)) || null)
  const accessToken = ref(localStorage.getItem(ACCESS_TOKEN_KEY) || '')
  const refreshToken = ref(localStorage.getItem(REFRESH_TOKEN_KEY) || '')
  const isAuthenticated = computed(() => {
    return !!localStorage.getItem('ACCESS_TOKEN')
  })

  const setUser = (user_) => {
    user.value = user_
    localStorage.setItem(USER_KEY, JSON.stringify(user_))
  }

  const setAccessToken = (token) => {
    accessToken.value = token
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  }

  const setRefreshToken = (token) => {
    refreshToken.value = token
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  }

  const clear = () => {
    user.value = null
    accessToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    setUser,
    setAccessToken,
    setRefreshToken,
    clear,
  }
})
