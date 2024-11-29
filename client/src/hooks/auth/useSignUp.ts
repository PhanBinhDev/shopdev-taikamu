import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/services/api/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { SignUpDTO } from '@/types/auth'
import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'

export const useSignUp = () => {
  const { setUser, setAccessToken } = useAuthStore()
  const { toast } = useToast()
  return useMutation({
    mutationFn: (data: SignUpDTO) => authApi.signUp(data),
    onSuccess: (response) => {
      const { user, accessToken } = response.data
      setUser(user)
      setAccessToken(accessToken)
      toast({
        title: 'Success',
        description: 'Signed in successfully'
      })
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          title: 'Error',
          description:
            error.response?.data.error.message || 'Sonething went wrong',
          variant: 'destructive'
        })
      }
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      })
    }
  })
}
