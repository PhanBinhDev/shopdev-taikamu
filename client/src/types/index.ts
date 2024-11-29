export interface IUser {
  id: string
  name: string
  email: string
  role: 'CUSTOMER' | 'SHOP_OWNER' | 'ADMIN'
  isActive: boolean
  imageUrl: string
}