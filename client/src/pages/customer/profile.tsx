import ProfileNav from '@/components/customer/_components/profile-nav'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '@/store/useAuthStore'
import { Award, CheckCircle, ShieldCheck, XCircle } from 'lucide-react'

function CustomerProfile() {
  const userRank = 'Thành viên Bạc'
  const { user } = useAuthStore()
  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='mx-auto max-w-6xl'>
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

          {/* Profile */}
          <Card>
            <CardHeader className='border-b pb-4'>
              <h3 className='text-xl font-semibold'>Thông tin cá nhân</h3>
            </CardHeader>
            <CardContent className='space-y-4 p-6'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='text-sm text-gray-500'>Họ và tên</label>
                  <p className='font-medium'>a Binh</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm text-gray-500'>Số điện thoại</label>
                  <p className='font-medium'>0865294312</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm text-gray-500'>Giới tính</label>
                  <p className='font-medium'>Nam</p>
                </div>
                <div className='space-y-2'>
                  <label className='text-sm text-gray-500'>Ngày sinh</label>
                  <p className='font-medium text-blue-600'>Thêm thông tin</p>
                </div>
              </div>
              <div className='pt-4'>
                <Button className='bg-blue-600 hover:bg-blue-700'>
                  Chỉnh sửa thông tin
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CustomerProfile
