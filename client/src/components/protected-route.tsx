import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import LoginNotification from '@/components/login-notification'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  redirectIfAuthenticated?: string
  allowedRole?: 'CUSTOMER' | 'SHOP_OWNER' | 'ADMIN'
}

export function ProtectedRoute({
  children,
  redirectTo = '/auth',
  allowedRole = 'CUSTOMER'
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  if (isAuthenticated && allowedRole !== user?.role) {
    console.log('RUN 1')
    const fallbackRoute =
      user?.role === 'SHOP_OWNER'
        ? '/shop'
        : user?.role === 'ADMIN'
        ? '/admin'
        : '/'

    return <Navigate to={fallbackRoute} replace />
  }

  if (!isAuthenticated) {
    return <LoginNotification redirectTo={redirectTo} />
  }

  return children
}
