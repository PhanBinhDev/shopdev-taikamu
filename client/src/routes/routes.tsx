// src/routes/routes.ts
import { lazy } from 'react'
import { ProtectedRoute } from '@/components/protected-route'

// Layouts
const CustomerLayout = lazy(() => import('@/components/customer'))
const ShopLayout = lazy(() => import('@/components/shop'))
const AdminLayout = lazy(() => import('@/components/admin'))

// Pages
const NotFound = lazy(() => import('@/components/not-found'))
const AuthPage = lazy(() => import('@/components/auth'))

// Profile
const ProfileLayout = lazy(() => import('@/components/customer/profile-layout'))
const ViewProfile = lazy(() => import('@/pages/customer/view-profile'))
const OrderList = lazy(() => import('@/pages/customer/order-list'))
const AddressList = lazy(() => import('@/pages/customer/address-list'))
const DiscountList = lazy(() => import('@/pages/customer/discount-list'))
const Notification = lazy(() => import('@/pages/customer/notification'))
const Favorites = lazy(() => import('@/pages/customer/favorites'))

// Settings Page
const Settings = lazy(() => import('@/pages/customer/settings'))

// Homepage
const HomePage = lazy(() => import('@/pages/customer/home-page'))
// View all category
const CategoryList = lazy(() => import('@/pages/customer/category-list'))

export const routes = [
  {
    path: '',
    element: <CustomerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <div>Product list</div> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfileLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: '', element: <ViewProfile /> },
          { path: 'orders', element: <OrderList /> },
          { path: 'addresses', element: <AddressList /> },
          { path: 'discounts', element: <DiscountList /> },
          { path: 'notifications', element: <Notification /> },
          { path: 'favorites', element: <Favorites /> }
        ]
      },
      {
        path: 'categories',
        element: <CategoryList />
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute allowedRole='CUSTOMER'>
            <Settings />
          </ProtectedRoute>
        )
      },
      { path: 'auth', element: <AuthPage /> }
    ]
  },
  {
    path: 'shop',
    element: (
      <ProtectedRoute allowedRole='SHOP_OWNER'>
        <ShopLayout />
      </ProtectedRoute>
    ),
    children: [{ path: 'products', element: <div>Shop Product list</div> }]
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute allowedRole='ADMIN'>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [{ path: 'dashboard', element: <div>Admin Dashboard</div> }]
  },
  { path: '*', element: <NotFound /> }
]
