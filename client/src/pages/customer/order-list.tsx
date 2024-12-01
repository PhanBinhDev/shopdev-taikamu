import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Search
} from 'lucide-react'
import { useState } from 'react'

function OrderList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const renderEmptyState = () => (
    <div className='flex flex-col items-center justify-center p-8 text-center'>
      <Package className='h-12 w-12 text-muted-foreground mb-4' />
      <h3 className='text-lg font-medium'>Không có đơn hàng nào</h3>
      <p className='text-sm text-muted-foreground mt-2'>
        Khi bạn đặt hàng, chúng sẽ xuất hiện ở đây.
      </p>
    </div>
  )

  const renderOrderItem = (order) => (
    <div key={order.id} className='p-2 md:p-4 rounded-md bg-slate-50 shadow-sm'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-4'>
          <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border'>
            <img
              src='/placeholder.svg?height=80&width=80'
              alt={order.name}
              className='h-full w-full object-cover'
            />
          </div>
          <div>
            <h4 className='font-medium'>{order.name}</h4>
            <p className='text-sm text-muted-foreground'>
              Số lượng: {order.quantity}
            </p>
            <p className='mt-1 font-medium text-primary'>{order.price}</p>
          </div>
        </div>
        <div className='flex flex-col items-start gap-2 md:items-end'>
          <Badge variant='outline' className='flex items-center gap-1'>
            {order.status === 'pending' && <Clock className='h-3 w-3' />}
            {order.status === 'shipping' && <Truck className='h-3 w-3' />}
            {order.status === 'completed' && (
              <CheckCircle2 className='h-3 w-3 text-green-600' />
            )}
            {order.status === 'cancelled' && (
              <XCircle className='h-3 w-3 text-red-600' />
            )}
            {order.status === 'pending' && 'Chờ xác nhận'}
            {order.status === 'shipping' && 'Đang vận chuyển'}
            {order.status === 'completed' && 'Hoàn thành'}
            {order.status === 'cancelled' && 'Đã hủy'}
          </Badge>
          <div className='flex gap-2'>
            {order.status === 'pending' && (
              <>
                <Button variant='outline' size='sm'>
                  Hủy đơn
                </Button>
                <Button size='sm'>Chi tiết</Button>
              </>
            )}
            {order.status === 'shipping' && <Button size='sm'>Theo dõi</Button>}
            {order.status === 'completed' && (
              <>
                <Button variant='outline' size='sm'>
                  Mua lại
                </Button>
                <Button size='sm'>Đánh giá</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
  // mock data
  const orders = [
    {
      id: 1,
      name: 'Áo thun nam cổ tròn basic',
      quantity: 1,
      price: '299.000₫',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Quần jean nam form regular',
      quantity: 2,
      price: '599.000₫',
      status: 'shipping'
    },
    {
      id: 3,
      name: 'Áo khoác denim unisex',
      quantity: 1,
      price: '799.000₫',
      status: 'completed'
    }
  ]

  const filteredOrders = orders.filter(
    (order) =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || order.status === filterStatus)
  )
  return (
    <Card>
      <CardHeader className='border-b pb-4'>
        <h3 className='text-xl font-semibold'>Đơn hàng của tôi</h3>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center p-4'>
          <div className='relative flex-grow'>
            <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              className='pl-8'
              placeholder='Tìm kiếm đơn hàng...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className='w-full md:w-[180px]'>
              <SelectValue placeholder='Trạng thái' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Tất cả</SelectItem>
              <SelectItem value='pending'>Chờ xác nhận</SelectItem>
              <SelectItem value='processing'>Đang xử lý</SelectItem>
              <SelectItem value='shipping'>Đang vận chuyển</SelectItem>
              <SelectItem value='completed'>Hoàn thành</SelectItem>
              <SelectItem value='cancelled'>Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator />
        <div className='space-y-4 p-4'>
          {filteredOrders.length > 0
            ? filteredOrders.map(renderOrderItem)
            : renderEmptyState()}
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderList
