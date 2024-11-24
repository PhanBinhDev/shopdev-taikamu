import { Link } from 'react-router-dom'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8'>
      <div className='text-center max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-4xl font-bold text-primary mb-2'>404</h1>
        <h2 className='text-2xl font-semibold text-zinc-800 mb-4'>
          Trang không tìm thấy
        </h2>
        <p className='text-zinc-600 mb-8'>
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có thể
          trang đã bị xóa hoặc URL không chính xác.
        </p>
        <div className='space-y-4'>
          <Link
            to='/'
            className='inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-[#009c5d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
            <Home className='mr-2 h-5 w-5' />
            Quay về Trang chủ
          </Link>
          <Link
            to='/products'
            className='inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-primary bg-white border border-primary rounded-md hover:bg-[#e6f7f0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
            Xem sản phẩm
            <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </div>
      </div>
    </div>
  )
}
