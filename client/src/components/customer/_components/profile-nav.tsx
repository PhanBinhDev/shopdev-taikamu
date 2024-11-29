import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  Bell,
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Package,
  Ticket,
  UserCircle
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

import { useLocation, useNavigate } from 'react-router-dom'

type NavItem = {
  title: string
  to?: string
  icon: LucideIcon
  destructive?: boolean
}

const navMap: NavItem[] = [
  {
    title: 'Thông tin cá nhân',
    to: '/profile',
    icon: UserCircle
  },
  {
    title: 'Đơn hàng của tôi',
    to: '/profile/orders',
    icon: Package
  },
  {
    title: 'Địa chỉ nhận hàng',
    to: '/profile/addresses',
    icon: MapPin
  },
  {
    title: 'Mã giảm giá',
    to: '/profile/discounts',
    icon: Ticket
  },
  {
    title: 'Thông báo',
    to: '/profile/notifications',
    icon: Bell
  },
  {
    title: 'Sản phẩm yêu thích',
    to: '/profile/favorites',
    icon: Heart
  },
  {
    title: 'Đăng xuất',
    icon: LogOut,
    destructive: true
  }
]

function ProfileNav() {
  const navigate = useNavigate()
  const location = useLocation()
  function onClick(item: NavItem) {
    if (item.to) {
      navigate(item.to)
    } else {
      // logout button
    }
  }

  return (
    <>
      <div className='flex justify-between gap-3 md:hidden bg-white shadow-sm p-2 rounded-md'>
        {navMap.map((item: NavItem) => {
          const { destructive, title } = item
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <TooltipProvider key={title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => onClick(item)}
                    className={cn(
                      'w-1/5 flex h-14 items-center justify-center rounded-lg bg-white group transition-all',
                      destructive && 'hover:bg-red-600',
                      isActive && 'bg-blue-600'
                    )}>
                    <Icon
                      className={cn(
                        'h-6 w-6 text-blue-600 group-hover:text-white transition-all',
                        destructive && 'group-hover:text-white',
                        isActive && 'text-white'
                      )}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className={`${destructive && 'bg-red-500'}`}>
                  <div className='text-sm text-white'>{item.title}</div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>

      <div className='hidden md:space-y-4 md:space-x-0 md:block'>
        {navMap.map((item: NavItem) => {
          const { destructive, title } = item
          const Icon = item.icon
          const isActive = location.pathname === item.to

          return (
            <Card
              key={title}
              onClick={() => onClick(item)}
              className={cn(
                'hover:bg-blue-600 hover:text-white transition-all cursor-pointer group w-full',
                isActive && 'bg-blue-600 text-white',
                destructive && 'hover:bg-red-500'
              )}>
              <CardContent className='p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Icon
                      className={cn(
                        'h-5 w-5 text-blue-600 group-hover:text-white transition-all',
                        isActive && 'text-white'
                      )}
                    />
                    <span className='hidden md:inline'>{item.title}</span>
                  </div>
                  <ChevronRight className='h-5 w-5 text-gray-400' />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}

export default ProfileNav
