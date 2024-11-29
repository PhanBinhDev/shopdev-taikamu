import { useAuthStore } from '@/store/useAuthStore'

export const useAuth = () => {
  const { user, accessToken, signOut } = useAuthStore()
  return { user, isAuthenticated: !!accessToken, signOut }
}
