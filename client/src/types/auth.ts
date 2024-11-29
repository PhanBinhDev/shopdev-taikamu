// DTO interface
export interface SignInDTO {
  email: string
  password: string
}

export interface SignUpDTO extends SignInDTO {
  name: string
}
