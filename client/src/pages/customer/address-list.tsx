import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, MapPin, Plus, Search, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
function AddressList() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for demonstration
  const addresses = [
    { id: 1, name: 'Nhà riêng', address: '123 Đường ABC, Quận 1, TP.HCM' },
    { id: 2, name: 'Văn phòng', address: '456 Đường XYZ, Quận 3, TP.HCM' }
  ]

  const filteredAddresses = addresses.filter(
    (address) =>
      address.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderAddressItem = (address) => (
    <div key={address.id} className='p-4 border-b last:border-b-0'>
      <div className='flex justify-between items-start'>
        <div>
          <h4 className='font-medium'>{address.name}</h4>
          <p className='text-sm text-muted-foreground mt-1'>
            {address.address}
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' size='icon'>
            <Edit className='h-4 w-4' />
          </Button>
          <Button variant='outline' size='icon'>
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderEmptyState = () => (
    <div className='flex flex-col items-center justify-center p-8 text-center'>
      <MapPin className='h-12 w-12 text-muted-foreground mb-4' />
      <h3 className='text-lg font-medium'>Không có địa chỉ nào</h3>
      <p className='text-sm text-muted-foreground mt-2'>
        Thêm địa chỉ mới để quản lý dễ dàng hơn.
      </p>
    </div>
  )

  return (
    <Card>
      <CardHeader className='border-b pb-4'>
        <div className='flex justify-between items-center'>
          <h3 className='text-xl font-semibold'>Địa chỉ của tôi</h3>
          <Button>
            <Plus className='h-4 w-4 mr-2' />
            Thêm địa chỉ mới
          </Button>
        </div>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='relative mb-6'>
          <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            className='pl-8'
            placeholder='Tìm kiếm địa chỉ...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='divide-y'>
          {filteredAddresses.length > 0
            ? filteredAddresses.map(renderAddressItem)
            : renderEmptyState()}
        </div>
      </CardContent>
    </Card>
  )
}

export default AddressList
