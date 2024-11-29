import { AuthForm } from '@/components/auth/_components/auth-form'
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

function AuthPage() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to='/' />
  }
  return (
    <div className='mt-20'>
      <AuthForm />
    </div>
  )
}

export default AuthPage
