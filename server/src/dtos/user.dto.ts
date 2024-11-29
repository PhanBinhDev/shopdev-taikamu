import { UserRole } from '@prisma/client'

export interface IUserDTO {
  name: string
  email: string
  password: string
  role: UserRole
  imageUrl?: string
}
