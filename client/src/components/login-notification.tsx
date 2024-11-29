import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from './ui/card'
import { Lock } from 'lucide-react'

interface LoginNotificationProps {
  redirectTo: string
}
function LoginNotification({ redirectTo }: LoginNotificationProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLoginClick = () => {
    navigate(redirectTo, { state: { from: location } })
  }
  return (
    <div className='flex-1 h-screen flex items-center justify-center'>
      <Card className='m-auto w-full max-w-md'>
        <CardContent className='flex flex-col items-center p-8'>
          <div className='mb-6 rounded-full bg-primary/10 p-4'>
            <Lock className='h-12 w-12 text-primary' />
          </div>
          <h1 className='mb-2 text-center text-2xl font-bold tracking-tight'>
            Access Restricted
          </h1>
          <p className='mb-8 text-center text-sm text-muted-foreground'>
            Please log in to access this page. Your session may have expired.
          </p>
          <Button
            onClick={handleLoginClick}
            className='w-full bg-primary font-medium hover:bg-primary/90'
            size='lg'>
            Continue to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginNotification
