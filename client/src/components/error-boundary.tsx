import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  fallback?: ReactNode // Kiểu cho fallback
  children: ReactNode // Con của ErrorBoundary
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    console.log('RUNNN')
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback // Nếu có fallback, render nó
      }
      return (
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-4'>
              Oops, something went wrong!
            </h2>
            <p className='text-gray-600 mb-4'>{this.state.error?.message}</p>
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded'
              onClick={() => window.location.reload()}>
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children // Nếu không có lỗi, render children
  }
}
