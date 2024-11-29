import { axiosInstance } from '@/lib/axios'
import { SignInDTO, SignUpDTO } from '@/types/auth'

export const authApi = {
  signIn: (data: SignInDTO) => axiosInstance.post('/auth/sign-in', data),
  signUp: (data: SignUpDTO) => axiosInstance.post('/user', data),
  refreshToken: () => axiosInstance.post('/auth/refresh-token'),
  signOut: () => axiosInstance.delete('/auth/sign-out'),
  me: () => axiosInstance.get('/auth/me')
}
