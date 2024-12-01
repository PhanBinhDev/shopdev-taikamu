import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/services/api/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { AxiosResponse } from 'axios'

export const useRefreshToken = () => {
  // const {} = useAuthStore()

  return useQuery({
    queryKey: ['refresh-token'],
    queryFn: () => authApi.refreshToken(),
    enabled: false
  })
}
