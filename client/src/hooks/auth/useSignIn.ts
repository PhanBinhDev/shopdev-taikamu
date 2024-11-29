import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/services/api/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { SignInDTO } from '@/types/auth'
import { useToast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export const useSignIn = () => {
  const { setUser, setAccessToken } = useAuthStore()
  const { toast } = useToast()
  const location = useLocation()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (data: SignInDTO) => authApi.signIn(data),
    onSuccess: (response) => {
      const { user, tokens } = response.data.metadata ?? {}
      setUser(user)
      setAccessToken(tokens.accessToken)
      toast({
        title: 'Success',
        description: 'Logged in successfully'
      })
      console.log(location)
      navigate(location.state)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          title: 'Error',
          description: error.response?.data.message || 'Something went wrong',
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
