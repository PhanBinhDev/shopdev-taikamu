import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function ViewProfile() {
  return (
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
  )
}

export default ViewProfile
