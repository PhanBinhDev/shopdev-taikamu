import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Layouts
const RootLayout = lazy(() => import('@/components/layouts'))
const CustomerLayout = lazy(() => import('@/components/layouts/customer'))
const ShopLayout = lazy(() => import('@/components/layouts/shop'))
const AdminLayout = lazy(() => import('@/components/layouts/admin'))

// Pages

import NotFound from '@/components/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <CustomerLayout />,
        children: [
          {
            index: true,
            element: <div>Home Page</div>
          },
          {
            path: 'products',
            element: <div>Product list</div>
          }
        ]
      },
      {
        path: 'shop',
        element: <ShopLayout />,
        children: [
          {
            path: 'products',
            element: <div>Shop Product list</div>
          }
        ]
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: <div>Admin Dashboard</div>
          }
        ]
      },
      {
        path: 'auth'
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
