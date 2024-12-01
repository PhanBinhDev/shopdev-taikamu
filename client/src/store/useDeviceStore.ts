import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

interface DeviceState {
  deviceId: string | null
  initializeDeviceId: () => void
}

export const useDeviceStore = create<DeviceState>()(
  persist(
    (set) => ({
      deviceId: null,
      initializeDeviceId: () => {
        set((state) => {
          // Nếu `deviceId` chưa tồn tại, tạo mới
          if (!state.deviceId) {
            const newDeviceId = uuidv4()
            return { deviceId: newDeviceId }
          }
          return state
        })
      },
      clearDeviceId: () => set({ deviceId: null })
    }),
    {
      name: 'device-storage', // Key lưu trữ trong localStorage
      partialize: (state) => ({ deviceId: state.deviceId }) // Chỉ lưu `deviceId`
    }
  )
)
