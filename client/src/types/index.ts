export interface IUser {
  id: string
  name: string
  email: string
  role: 'CUSTOMER' | 'SHOP_OWNER' | 'ADMIN'
  isActive: boolean
  imageUrl?: string
  phoneNumber?: string
  gender?: 'male' | 'female' | 'other'
  birthDate?: Date
}

export interface Banner {
  id: string
  imageUrl: string
  title: string
  link: string
  startDate: Date
  endDate: Date
  isActive: boolean
  order: number
}

export interface BannerSection {
  id: string
  name: string
  banners: Banner[]
}
