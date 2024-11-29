import { Link, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className='container mx-auto px-4'>
      <nav className='my-4'>
        <ul className='flex space-x-4'>
          <li>
            <Link to='/admin' className='text-red-600 hover:underline'>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/admin/users' className='text-red-600 hover:underline'>
              Users
            </Link>
          </li>
          <li>
            <Link to='/admin/shops' className='text-red-600 hover:underline'>
              Shops
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
