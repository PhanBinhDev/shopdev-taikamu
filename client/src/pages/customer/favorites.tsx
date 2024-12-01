import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, Search, ShoppingCart } from 'lucide-react'

function FavoriteProducts() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data for demonstration
  const favoriteProducts = [
    {
      id: 1,
      name: 'Áo thun nam cổ tròn basic',
      price: '299.000₫',
      image: '/placeholder.svg?height=80&width=80'
    },
    {
      id: 2,
      name: 'Quần jean nam form regular',
      price: '599.000₫',
      image: '/placeholder.svg?height=80&width=80'
    }
  ]

  const filteredProducts = favoriteProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderProductItem = (product) => (
    <div key={product.id} className='p-4 border-b last:border-b-0'>
      <div className='flex items-center gap-4'>
        <img
          src={product.image}
          alt={product.name}
          className='w-20 h-20 object-cover rounded'
        />
        <div className='flex-1'>
          <h4 className='font-medium'>{product.name}</h4>
          <p className='text-sm text-muted-foreground mt-1'>{product.price}</p>
          <div className='flex gap-2 mt-2'>
            <Button size='sm'>
              <ShoppingCart className='h-4 w-4 mr-2' />
              Thêm vào giỏ hàng
            </Button>
            <Button variant='outline' size='icon'>
              <Heart className='h-4 w-4 text-red-500 fill-red-500' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderEmptyState = () => (
    <div className='flex flex-col items-center justify-center p-8 text-center'>
      <Heart className='h-12 w-12 text-muted-foreground mb-4' />
      <h3 className='text-lg font-medium'>Chưa có sản phẩm yêu thích</h3>
      <p className='text-sm text-muted-foreground mt-2'>
        Hãy thêm sản phẩm vào danh sách yêu thích của bạn.
      </p>
    </div>
  )

  return (
    <Card>
      <CardHeader className='border-b pb-4'>
        <h3 className='text-xl font-semibold'>Sản phẩm yêu thích</h3>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='relative mb-6'>
          <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            className='pl-8'
            placeholder='Tìm kiếm sản phẩm yêu thích...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='divide-y'>
          {filteredProducts.length > 0
            ? filteredProducts.map(renderProductItem)
            : renderEmptyState()}
        </div>
      </CardContent>
    </Card>
  )
}

export default FavoriteProducts
