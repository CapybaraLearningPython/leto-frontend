import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const authStore = useAuthStore()

class axiosClient {
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 5000,
    })
    this.accessToken = ''
    this.refreshToken = ''
    this.initInterceptors()
  }

  initInterceptors() {
    this.instance.interceptors.request.use((config) => {
      this.accessToken = localStorage.getItem('ACCESS_TOKEN')
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`
      }

      return config
    })

    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },

      async (err) => {
        console.log('>>>>>', err.response)
        if (err.response?.data.detail == 'Access Token expired') {
          this.refreshToken = localStorage.getItem('REFRESH_TOKEN')
          const data = { refresh_token: this.refreshToken, user_id: authStore.user.id }
          const res = await this.instance.post(
            `/auth/update_access_token/${authStore.user.id}`,
            data,
          )

          this.accessToken = res.token
          localStorage.setItem('ACCESS_TOKEN', this.accessToken)
          console.log('🥳Access Token refreshed successfully!')
          const originalRequest = err.config
          originalRequest.headers.Authorization = `Bearer ${this.accessToken}`
          return this.instance(originalRequest)
        } else if (
          err.response?.data.detail == 'Refresh Token expired' ||
          (!authStore.isAuthenticated &&
            router.currentRoute.value.name != 'login' &&
            router.currentRoute.value.name != 'login_required')
        ) {
          authStore.clear()
          router.push({ name: 'login_required' })
          ElMessage.error('请先登录！')
        } else if (err.response?.data.detail == 'Code validation failed') {
          ElMessage.error('验证码不正确！')
        } else if (err.response?.data.detail == 'Foreign key constraint') {
          ElMessage.error('无法删除该商品，请先删除相关秒杀活动！')
        } else {
          ElMessage.error('内部错误，请稍后再试！')
        }

        return Promise.reject(err)
      },
    )
  }

  get(url, params = {}) {
    return this.instance.get(url, { params })
  }

  post(url, data) {
    return this.instance.post(url, data)
  }

  patch(url, data) {
    return this.instance.patch(url, data)
  }

  put(url, data) {
    return this.instance.put(url, data)
  }

  delete(url) {
    return this.instance.delete(url)
  }
}

export default new axiosClient()
