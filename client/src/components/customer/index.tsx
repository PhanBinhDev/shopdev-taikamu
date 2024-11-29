import { Outlet } from 'react-router-dom'
import HeaderCustomer from './_components/Header'

export default function CustomerLayout() {
  return (
    <div className='flex flex-col h-screen'>
      <HeaderCustomer />
      <Outlet />
    </div>
  )
}
