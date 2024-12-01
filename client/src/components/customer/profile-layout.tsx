import ProfileNav from '@/components/customer/_components/profile-nav'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/store/useAuthStore'
import { Award, CheckCircle, ShieldCheck, XCircle } from 'lucide-react'
import { Outlet } from 'react-router-dom'

function ProfileLayout() {
  const userRank = 'Thành viên Bạc'
  const { user } = useAuthStore()
  return (
    <div className='mx-auto container'>
      <div className=' py-4 md:p-8'>
        <div className='grid gap-6 md:grid-cols-[300px_1fr]'>
          {/* Card user */}
          <div className='space-y-6'>
            <Card className='bg-blue-600 text-white h-fit'>
              <CardContent className='flex flex-col items-center p-6'>
                <Avatar className='h-24 w-24 border-4 border-white'>
                  <AvatarImage src='https://placeholder.svg' alt='Profile' />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <h2 className='mt-4 text-2xl font-bold'>a {user?.name}</h2>
                <p className='text-blue-100'>0865294312</p>
                <div className='mt-4 flex items-center'>
                  {user?.isActive ? (
                    <Badge
                      variant='secondary'
                      className='flex items-center gap-1 bg-green-500 text-white hover:bg-green-600 transition-all'>
                      <CheckCircle className='h-4 w-4' />
                      Đã xác minh
                    </Badge>
                  ) : (
                    <div className='flex flex-col items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='flex items-center gap-1 bg-red-500 text-white hover:bg-red-600 transition-all'>
                        <XCircle className='h-4 w-4' />
                        Chưa xác minh
                      </Badge>
                      <Button
                        variant='secondary'
                        size='sm'
                        className='flex ic gap-1'>
                        <ShieldCheck className='size-4' />
                        Xác minh ngay
                      </Button>
                    </div>
                  )}
                </div>
                <div className='mt-2 flex items-center bg-blue-700 rounded-full px-3 py-1'>
                  <Award className='h-4 w-4 mr-1 text-yellow-400' />
                  <span className='text-sm font-medium'>{userRank}</span>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Function Card For Mobile */}
            <ProfileNav />
            {/* Function Card For Desktop */}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
