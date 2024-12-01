import { Outlet } from 'react-router-dom'
import HeaderCustomer from './_components/Header'

export default function CustomerLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <HeaderCustomer />
      <div className='bg-gray-50 h-full'>
        <Outlet />
      </div>
    </div>
  )
}
