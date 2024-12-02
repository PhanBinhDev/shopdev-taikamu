import { useQuery } from '@tanstack/react-query'
import { authApi } from '@/services/api/auth'

export const useRefreshToken = () => {
  return useQuery({
    queryKey: ['refresh-token'],
    queryFn: () => authApi.refreshToken(),
    enabled: false
  })
}
