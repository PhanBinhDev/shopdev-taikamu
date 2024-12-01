import { axiosInstance } from '@/lib/axios'
import { UpdateProfileDTO } from '@/types/user'

export const userApi = {
  updateProfile: (data: UpdateProfileDTO) =>
    axiosInstance.put('/user/profile', data)
}
