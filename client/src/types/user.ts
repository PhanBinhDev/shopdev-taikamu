// DTO interface
export interface UpdateProfileDTO {
  fullName?: string
  phoneNumber?: string
  gender?: 'male' | 'female' | 'other'
  birthDate?: Date | undefined
}
