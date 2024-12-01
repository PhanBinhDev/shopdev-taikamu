import { UserRole } from '@prisma/client'

export interface IUserDTO {
  name: string
  email: string
  password: string
  role: UserRole
  imageUrl?: string
}

export interface IUpdateProfileDTO {
  name?: string
  email?: string
  password?: string
  role?: UserRole
  imageUrl?: string
  phoneNumber?: string
  gender?: string
  birthDate?: Date
  isActive?: boolean
}
