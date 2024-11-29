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

// config request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
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
    if (error) {
      if (error.response?.status === 401) {
        // handle refresh token
      }
    }
    return Promise.reject(error)
  }
)
