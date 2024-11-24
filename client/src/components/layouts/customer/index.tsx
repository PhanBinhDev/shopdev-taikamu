import { Link, Outlet } from 'react-router-dom'

export default function CustomerLayout() {
  return (
    <div className='container mx-auto px-4'>
      <nav className='my-4'>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/' className='text-blue-600 hover:underline'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/products' className='text-blue-600 hover:underline'>
              Products
            </Link>
          </li>
          <li>
            <Link to='/cart' className='text-blue-600 hover:underline'>
              Cart
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
