import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-blue-600 text-white p-4'>
        <h1 className='text-2xl font-bold'>E-Commerce App</h1>
      </header>
      <main className='flex-grow'>
        <Outlet />
      </main>
      <footer className='bg-gray-200 p-4 text-center'>
        <p>&copy; 2023 E-Commerce App. All rights reserved.</p>
      </footer>
    </div>
  )
}
