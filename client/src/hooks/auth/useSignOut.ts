import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/services/api/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useToast } from '@/hooks/useToast'

export const useSignOut = () => {
  const { signOut } = useAuthStore()
  const navigate = useNavigate()
  const { toast } = useToast()

  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Logged out successfully'
      })
      signOut()
      navigate('/auth')
    }
  })
}
