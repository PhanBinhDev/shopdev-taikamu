'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Banner } from '@/types'
import { Link } from 'react-router-dom'

interface BannerCarouselProps {
  banners: Banner[]
  autoPlayInterval?: number
  className?: string
}

export function BannerCarousel({
  banners,
  autoPlayInterval = 5000,
  className
}: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)
  const autoPlayRef = React.useRef<NodeJS.Timeout>()

  const nextSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  const previousSlide = React.useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length])

  React.useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, nextSlide, autoPlayInterval])

  const pauseAutoPlay = () => setIsAutoPlaying(false)
  const resumeAutoPlay = () => setIsAutoPlaying(true)

  return (
    <div
      className={cn('relative overflow-hidden rounded-lg', className)}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}>
      <div
        className='flex transition-transform duration-500 ease-out'
        style={{
          transform: `translateX(-${currentSlide * 100}%)`
        }}>
        {banners.map((banner) => (
          <Link
            key={banner.id}
            to={banner.link}
            className='min-w-full flex-shrink-0'>
            <img
              src={banner.imageUrl}
              alt={banner.title}
              width={1200}
              height={400}
              className='aspect-[3/1] w-full object-cover'
            />
          </Link>
        ))}
      </div>

      <Button
        variant='ghost'
        size='icon'
        className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white'
        onClick={previousSlide}>
        <ChevronLeft className='h-6 w-6' />
      </Button>

      <Button
        variant='ghost'
        size='icon'
        className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white'
        onClick={nextSlide}>
        <ChevronRight className='h-6 w-6' />
      </Button>

      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2'>
        {banners.map((_, index) => (
          <button
            key={index}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              currentSlide === index
                ? 'bg-primary w-4'
                : 'bg-primary/50 hover:bg-primary/75'
            )}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
