import { ProtectedRoute } from '@/components/protected-route'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Layouts
const CustomerLayout = lazy(() => import('@/components/customer'))
const ShopLayout = lazy(() => import('@/components/shop'))
const AdminLayout = lazy(() => import('@/components/admin'))

// Pages
const NotFound = lazy(() => import('@/components/not-found'))
const AuthPage = lazy(() => import('@/components/auth'))

// Profile
const ProfileLayout = lazy(() => import('@/components/customer/profile-layout'))
const ViewProfile = lazy(() => import('@/components/customer/view-profile'))
const OrderList = lazy(() => import('@/components/customer/order-list'))
const AddressList = lazy(() => import('@/components/customer/address-list'))
const DiscountList = lazy(() => import('@/components/customer/discount-list'))
const Notification = lazy(() => import('@/components/customer/notification'))
const Favorites = lazy(() => import('@/components/customer/favorites'))

export const router = createBrowserRouter([
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
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: '', element: <ViewProfile /> },
          {
            path: 'orders',
            element: <OrderList />
          },
          {
            path: 'addresses',
            element: <AddressList />
          },
          {
            path: 'discounts',
            element: <DiscountList />
          },
          {
            path: 'notifications',
            element: <Notification />
          },
          {
            path: 'favorites',
            element: <Favorites />
          }
        ]
      },
      {
        path: 'auth',
        element: <AuthPage />
      }
    ]
  },
  {
    path: 'shop',
    element: (
      <ProtectedRoute allowedRole='SHOP_OWNER'>
        <ShopLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'products',
        element: <div>Shop Product list</div>
      }
    ]
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute allowedRole='ADMIN'>
        {' '}
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <div>Admin Dashboard</div>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
