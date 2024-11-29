import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Ticket, Search, Copy } from 'lucide-react'

function DiscountList() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for demonstration
  const discounts = [
    { id: 1, code: 'SUMMER2023', discount: '20%', validUntil: '2023-08-31' },
    { id: 2, code: 'WELCOME10', discount: '10%', validUntil: '2023-12-31' }
  ]

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderDiscountItem = (discount) => (
    <div key={discount.id} className='p-4 border-b last:border-b-0'>
      <div className='flex justify-between items-center'>
        <div>
          <h4 className='font-medium'>{discount.code}</h4>
          <p className='text-sm text-muted-foreground mt-1'>
            Giảm {discount.discount}
          </p>
          <p className='text-sm text-muted-foreground'>
            Có hiệu lực đến: {discount.validUntil}
          </p>
        </div>
        <Button variant='outline' size='sm' className='flex items-center'>
          <Copy className='h-4 w-4 mr-2' />
          Sao chép
        </Button>
      </div>
    </div>
  )

  const renderEmptyState = () => (
    <div className='flex flex-col items-center justify-center p-8 text-center'>
      <Ticket className='h-12 w-12 text-muted-foreground mb-4' />
      <h3 className='text-lg font-medium'>Không có mã giảm giá nào</h3>
      <p className='text-sm text-muted-foreground mt-2'>
        Các mã giảm giá sẽ xuất hiện ở đây khi có sẵn.
      </p>
    </div>
  )

  return (
    <Card>
      <CardHeader className='border-b pb-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-semibold'>Mã giảm giá của tôi</h3>
          <Badge variant='secondary'>2 mã có sẵn</Badge>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='relative mb-6'>
          <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            className='pl-8'
            placeholder='Tìm kiếm mã giảm giá...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='divide-y'>
          {filteredDiscounts.length > 0
            ? filteredDiscounts.map(renderDiscountItem)
            : renderEmptyState()}
        </div>
      </CardContent>
    </Card>
  )
}

export default DiscountList
