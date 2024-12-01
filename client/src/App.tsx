import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@/lib/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import { useDeviceStore } from './store/useDeviceStore'
import { useEffect } from 'react'

export function App() {
  const { initializeDeviceId } = useDeviceStore()

  useEffect(() => {
    initializeDeviceId()
  }, [initializeDeviceId])
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
