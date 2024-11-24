import { Link, Outlet } from 'react-router-dom'

export default function ShopLayout() {
  return (
    <div className='container mx-auto px-4'>
      <nav className='my-4'>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/shop' className='text-green-600 hover:underline'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to='/shop/products'
              className='text-green-600 hover:underline'>
              Products
            </Link>
          </li>
          <li>
            <Link to='/shop/orders' className='text-green-600 hover:underline'>
              Orders
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
