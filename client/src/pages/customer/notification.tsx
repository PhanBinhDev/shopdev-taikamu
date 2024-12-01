import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Bell, Search, Package, Tag, Info } from 'lucide-react'

function Notification() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for demonstration
  const notifications = [
    {
      id: 1,
      type: 'order',
      message: 'Đơn hàng #12345 đã được giao thành công',
      date: '2023-06-15'
    },
    {
      id: 2,
      type: 'promotion',
      message: 'Giảm giá 30% cho tất cả sản phẩm mùa hè',
      date: '2023-06-14'
    },
    {
      id: 3,
      type: 'info',
      message: 'Cập nhật chính sách đổi trả mới',
      date: '2023-06-13'
    }
  ]

  const filteredNotifications = notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderNotificationItem = (notification) => (
    <div key={notification.id} className='p-4 border-b last:border-b-0'>
      <div className='flex items-start gap-4'>
        <div className='mt-1'>
          {notification.type === 'order' && (
            <Package className='h-5 w-5 text-blue-500' />
          )}
          {notification.type === 'promotion' && (
            <Tag className='h-5 w-5 text-green-500' />
          )}
          {notification.type === 'info' && (
            <Info className='h-5 w-5 text-yellow-500' />
          )}
        </div>
        <div className='flex-1'>
          <p className='font-medium'>{notification.message}</p>
          <p className='text-sm text-muted-foreground mt-1'>
            {notification.date}
          </p>
        </div>
      </div>
    </div>
  )

  const renderEmptyState = () => (
    <div className='flex flex-col items-center justify-center p-8 text-center'>
      <Bell className='h-12 w-12 text-muted-foreground mb-4' />
      <h3 className='text-lg font-medium'>Không có thông báo nào</h3>
      <p className='text-sm text-muted-foreground mt-2'>
        Bạn sẽ nhận được thông báo về đơn hàng và khuyến mãi ở đây.
      </p>
    </div>
  )

  return (
    <Card>
      <CardHeader className='border-b pb-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-semibold'>Thông báo của tôi</h3>
          <Badge variant='secondary'>3 thông báo mới</Badge>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='relative mb-6'>
          <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            className='pl-8'
            placeholder='Tìm kiếm thông báo...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='divide-y'>
          {filteredNotifications.length > 0
            ? filteredNotifications.map(renderNotificationItem)
            : renderEmptyState()}
        </div>
      </CardContent>
    </Card>
  )
}

export default Notification
