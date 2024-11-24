import { Loader2 } from 'lucide-react'
function LoadingScreen() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <Loader2 className='w-8 h-8 animate-spin text-blue-500' />
    </div>
  )
}

export default LoadingScreen
