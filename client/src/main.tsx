import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import '@/index.css'
import LoadingScreen from '@/components/loading-screen'
import { ErrorBoundary } from '@/components/error-boundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingScreen />}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Suspense>
  </StrictMode>
)
