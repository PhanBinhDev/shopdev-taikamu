import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Banner } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface BannerSectionProps {
  mainBanners: Banner[]
  sideBanners: Banner[]
  autoPlayInterval?: number
  className?: string
}
export function BannerSection({
  mainBanners,
  sideBanners,
  autoPlayInterval = 5000,
  className
}: BannerSectionProps) {
  const minOrder = Math.min(...mainBanners.map((banner) => banner.order))
  const [currentSlide, setCurrentSlide] = useState(minOrder)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % mainBanners.length)
  }, [mainBanners.length])
  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev - 1 + mainBanners.length) % mainBanners.length
    )
  }, [mainBanners.length])

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setTimeout(nextSlide, autoPlayInterval)
    }
    return () => clearTimeout(autoPlayRef.current)
  }, [isAutoPlaying, nextSlide, autoPlayInterval])

  const pauseAutoPlay = () => setIsAutoPlaying(false)
  const resumeAutoPlay = () => setIsAutoPlaying(true)
  return (
    <div className={cn('flex gap-4', className)}>
      {/* Main Carousel */}
      <div
        className='w-[70%] relative overflow-hidden rounded-lg'
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}>
        <div
          className='flex transition-transform duration-500 ease-out'
          style={{
            transform: `translate(-${currentSlide * 100}%)`
          }}>
          {mainBanners.map((banner) => (
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
          onClick={prevSlide}>
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
          {mainBanners.map((_, index) => (
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
      <div className='flex flex-1 flex-col gap-4'>
        {sideBanners.slice(0, 2).map((banner) => (
          <Link
            key={banner.id}
            to={banner.link}
            className='min-w-full flex-shrink-0 h-[49%]'>
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className='h-full w-full object-cover'
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
