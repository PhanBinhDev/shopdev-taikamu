import { IUser } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: Nullable<IUser>
  accessToken: Nullable<string>
  setUser: (user: IUser) => void
  setAccessToken: (token: string) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set((state) => ({ ...state, user })),
      setAccessToken: (token) =>
        set((state) => ({ ...state, accessToken: token })),
      signOut: () =>
        set((state) => ({ ...state, user: null, accessToken: null }))
    }),
    {
      name: 'auth-storage'
    }
  )
)
