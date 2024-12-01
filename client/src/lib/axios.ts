import { authApi } from '@/services/api/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useDeviceStore } from '@/store/useDeviceStore'
import axios from 'axios'

export const baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // allows coookies
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (error: Error) => void
}> = []

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error as Error)
    } else {
      promise.resolve()
    }
  })
  failedQueue = []
}
// config request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { deviceId } = useDeviceStore.getState() // Lấy deviceId trực tiếp từ Zustand
    if (deviceId) {
      config.headers['X-Device-ID'] = deviceId
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// config response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const errorCode = error.response?.data?.code
    console.log({
      error,
      errorCode
    })
    switch (errorCode) {
      case 'TOKEN_EXPIRED':
        if (isRefreshing && !originalRequest._retry) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then(() => axiosInstance(originalRequest))
            .catch((err) => Promise.reject(err))
        }
        originalRequest._retry = true
        isRefreshing = true
        try {
          await authApi.refreshToken()
          processQueue()
          return axiosInstance(originalRequest)
        } catch (err) {
          processQueue(err)
          const { signOut } = useAuthStore.getState()
          await authApi.signOut()
          signOut()
          return Promise.reject(err)
        } finally {
          isRefreshing = false
        }
      case 'ACCESS_TOKEN_NOT_FOUND':
      case 'INVALID_TOKEN': {
        const { signOut } = useAuthStore.getState()
        await authApi.signOut()
        signOut()
        return Promise.reject(
          new Error('Authentication failed: Please log in again.')
        )
      }
      default:
        console.error('Unhandled error:', error)
        break
    }
    return Promise.reject(error)
  }
)
