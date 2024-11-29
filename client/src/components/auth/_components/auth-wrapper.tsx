import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import SocialAuth from './social-auth'
import { Button } from '@/components/ui/button'

interface AuthWrapperProps {
  children: React.ReactNode
  title: string
  description: string
  showSocial?: boolean
}

function AuthWrapper({
  children,
  title,
  description,
  showSocial = true
}: AuthWrapperProps) {
  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          {children}
          {showSocial && (
            <div className='flex justify-center gap-2'>
              <SocialAuth />
            </div>
          )}
        </div>
        <div className='mt-4 text-center text-sm'>
          {/* Term */}
          <Button variant='link' className='underline'>
            Terms & Conditions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AuthWrapper
