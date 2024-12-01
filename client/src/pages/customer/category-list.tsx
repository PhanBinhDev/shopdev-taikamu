import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'

const categories = [
  {
    id: 1,
    name: 'Balo & Túi Ví Nam',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'balo-tui-vi-nam',
    itemCount: 1234
  },
  {
    id: 2,
    name: 'Bánh Hóa Online',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'banh-hoa-online',
    itemCount: 5678
  },
  {
    id: 3,
    name: 'Chăm Sóc Thú Cưng',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'cham-soc-thu-cung',
    itemCount: 910
  },
  {
    id: 4,
    name: 'Dụng cụ và thiết bị tiện ích',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'dung-cu-thiet-bi',
    itemCount: 1112
  },
  {
    id: 5,
    name: 'Giày Dép Nam',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'giay-dep-nam',
    itemCount: 1314
  },
  {
    id: 6,
    name: 'Giày Dép Nữ',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'giay-dep-nu',
    itemCount: 1516
  },
  {
    id: 7,
    name: 'Máy Tính & Laptop',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'may-tinh-laptop',
    itemCount: 1718
  },
  {
    id: 8,
    name: 'Máy Ảnh & Máy Quay Phim',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'may-anh-quay-phim',
    itemCount: 1920
  },
  {
    id: 9,
    name: 'Mẹ & Bé',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'me-be',
    itemCount: 2122
  },
  {
    id: 10,
    name: 'Nhà Cửa & Đời Sống',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'nha-cua-doi-song',
    itemCount: 2324
  },
  {
    id: 11,
    name: 'Nhà Sách Online',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'nha-sach-online',
    itemCount: 2526
  },
  {
    id: 12,
    name: 'Phụ Kiện & Trang Sức Nữ',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'phu-kien-trang-suc-nu',
    itemCount: 2728
  },
  {
    id: 13,
    name: 'Sắc Đẹp',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'sac-dep',
    itemCount: 2930
  },
  {
    id: 14,
    name: 'Sức Khỏe',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'suc-khoe',
    itemCount: 3132
  },
  {
    id: 15,
    name: 'Thiết Bị Điện Gia Dụng',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'thiet-bi-dien-gia-dung',
    itemCount: 3334
  },
  {
    id: 16,
    name: 'Thiết Bị Điện Tử',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'thiet-bi-dien-tu',
    itemCount: 3536
  },
  {
    id: 17,
    name: 'Thể Thao & Du Lịch',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'the-thao-du-lich',
    itemCount: 3738
  },
  {
    id: 18,
    name: 'Thời Trang Nam',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'thoi-trang-nam',
    itemCount: 3940
  },
  {
    id: 19,
    name: 'Thời Trang Nữ',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'thoi-trang-nu',
    itemCount: 4142
  },
  {
    id: 20,
    name: 'Thời Trang Trẻ Em',
    image:
      'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w320_nl',
    slug: 'thoi-trang-tre-em',
    itemCount: 4344
  }
]

function CategoryList() {
  return (
    <div className='mx-auto container'>
      <div className='py-4 md:p-6'>
        <div className='grid grid-cols-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {categories.map((category) => (
            <Link key={category.id} to={`/categories/${category.slug}`}>
              <Card className='group transition-all hover:shadow-sm'>
                <CardContent className='p-4'>
                  <div className='mb-3 aspect-square overflow-hidden rounded-lg'>
                    <img
                      src={category.image}
                      alt={category.name}
                      width={200}
                      height={200}
                      className='h-full w-full object-cover transition-transform group-hover:scale-105'
                    />
                  </div>
                  <h3 className='text-center text-sm font-medium group-hover:text-primary truncate'>
                    {category.name}
                  </h3>
                  <p className='text-center text-xs text-muted-foreground'>
                    {category.itemCount.toLocaleString()} sản phẩm
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryList
