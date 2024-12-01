import { IUser } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: Nullable<IUser>
  setUser: (user: IUser) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set((state) => ({ ...state, user })),
      signOut: () => set((state) => ({ ...state, user: null }))
    }),
    {
      name: 'auth-storage'
    }
  )
)
