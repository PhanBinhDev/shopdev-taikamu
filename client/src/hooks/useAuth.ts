import { authApi } from '@/services/api/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useEffect } from 'react'
import { useSignOut } from './auth/useSignOut'
export const useAuth = () => {
  const { user, setUser } = useAuthStore()
  const { mutate: signOut } = useSignOut()
  const isAuthenticated = !!user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          // Chỉ gọi API khi người dùng đã đăng nhập
          const res = await authApi.me()
          const userData = res.data.metadata.user
          setUser(userData) // Cập nhật thông tin người dùng
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchUserData()
  }, [isAuthenticated, setUser])

  return { user, isAuthenticated, signOut }
}
