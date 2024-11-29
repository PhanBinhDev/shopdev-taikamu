import * as z from 'zod'

export const signInSchema = z.object({
  email: z.string().email({
    message: 'Email không hợp lệ'
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu tối thiểu 6 ký tự'
  })
})

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: 'Tên tối thiểu 2 ký tự'
  }),
  email: z.string().email({
    message: 'Email không hợp lệ'
  }),
  password: z.string().min(6, {
    message: 'Mật khẩu tối thiểu 6 ký tự'
  })
})
