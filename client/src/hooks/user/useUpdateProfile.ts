import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/useToast'
import { AxiosError } from 'axios'
import { userApi } from '@/services/api/user'
import { UpdateProfileDTO } from '@/types/user'
import { useAuthStore } from '@/store/useAuthStore'

export const useUpdateProfile = () => {
  const { setUser } = useAuthStore()
  const { toast } = useToast()
  return useMutation({
    mutationFn: (data: UpdateProfileDTO) => userApi.updateProfile(data),
    onSuccess: (response) => {
      const { user } = response.data.metadata
      setUser(user)
      toast({
        title: 'Success',
        description: 'Cập nhập thông tin thành công'
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
