import { BannerCarousel } from '@/components/customer/_components/banner-carousel'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function HomePage() {
  const banners = [
    {
      id: '1',
      imageUrl:
        'https://cf.shopee.vn/file/vn-11134258-7ras8-m3666qjiisypfd_xxhdpi',
      title: '12.12 Cyber Monday Sale',
      link: '/sale/cyber-monday',
      startDate: new Date('2024-12-12'),
      endDate: new Date('2024-12-13'),
      isActive: true,
      order: 1
    },
    {
      id: '2',
      imageUrl:
        'https://cf.shopee.vn/file/sg-11134258-7rfhu-m35wow1blqly92_xxhdpi',
      title: 'Christmas Special',
      link: '/sale/christmas',
      startDate: new Date('2024-12-24'),
      endDate: new Date('2024-12-26'),
      isActive: true,
      order: 2
    }
    // Add more banners as needed
  ]

  return (
    <div className='mx-auto container'>
      <div className='py-4 md:p-6'>
        <section className='pb-6 space-y-4'>
          <BannerCarousel banners={banners} />

          {/* Services Icon */}
          <div className='grid grid-cols-4 gap-4 sm:grid-cols-8'>
            {[
              { icon: '🎫', label: 'Voucher' },
              { icon: '🚚', label: 'Free Shipping' },
              { icon: '⚡', label: 'Flash Deals' },
              { icon: '🏷️', label: 'Discount Codes' },
              { icon: '👕', label: 'Style Vouchers' },
              { icon: '🌏', label: 'International' },
              { icon: '📱', label: 'Mobile Top-up' },
              { icon: '⚡', label: 'Flash Sale' }
            ].map((item, i) => (
              <Link
                to='#'
                key={i}
                className='flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-sm transition-colors hover:bg-gray-50'>
                <span className='text-2xl'>{item.icon}</span>
                <span className='mt-2 text-xs'>{item.label}</span>
              </Link>
            ))}
          </div>
        </section>
        <section className='py-12'>
          <div className='container px-4'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-2xl font-bold'>Danh mục phổ biến</h2>
              <Link
                to='/categories'
                className='flex items-center text-sm text-primary hover:underline'>
                View All <ChevronRight className='ml-1 h-4 w-4' />
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              {[
                'Electronics',
                'Fashion',
                'Home & Living',
                'Beauty',
                'Sports',
                'Books'
              ].map((category, i) => (
                <Card key={i} className='text-center'>
                  <CardContent className='p-4'>
                    <img
                      src={
                        'https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b'
                      }
                      alt={category}
                      width={64}
                      height={64}
                      className='mx-auto mb-2'
                    />
                    <p className='text-sm font-medium'>{category}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage
