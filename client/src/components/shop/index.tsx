import { Outlet } from 'react-router-dom'
import { MenuConfig } from '@/types'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Search } from '@/components/search'
import { Button } from '@/components/ui/button'

import { UserNav } from '../admin/_components/user-nav'
import {
  BarChart2,
  Bell,
  Box,
  ChevronDown,
  ClipboardList,
  Clock,
  Command,
  FileText,
  Home,
  Hourglass,
  Layers,
  List,
  MessageSquare,
  Package,
  Percent,
  Phone,
  PlusCircle,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  TrendingUp,
  Users
} from 'lucide-react'

const shopMenuConfig: MenuConfig[] = [
  {
    label: 'Tổng quan',
    items: [
      {
        title: 'Dashboard',
        url: '/shop/dashboard',
        icon: Home
      },
      {
        title: 'Thông báo',
        url: '/shop/notifications',
        icon: Bell
      }
    ]
  },
  {
    label: 'Quản lý Sản phẩm',
    items: [
      {
        title: 'Sản phẩm của tôi',
        icon: Package,
        subItems: [
          {
            title: 'Danh sách sản phẩm',
            url: '/shop/products/list',
            icon: List
          },
          {
            title: 'Thêm sản phẩm mới',
            url: '/shop/products/add',
            icon: PlusCircle
          },
          {
            title: 'Quản lý biến thể',
            url: '/shop/products/variants',
            icon: Layers
          },
          {
            title: 'Kiểm tra tồn kho',
            url: '/shop/products/inventory',
            icon: Box
          }
        ]
      },
      {
        title: 'Danh mục sản phẩm',
        url: '/shop/categories',
        icon: Tag
      }
    ]
  },
  {
    label: 'Quản lý Đơn hàng',
    items: [
      {
        title: 'Danh sách đơn hàng',
        url: '/shop/orders',
        icon: ShoppingCart
      },
      {
        title: 'Đơn hàng chờ xử lý',
        url: '/shop/orders/pending',
        icon: Hourglass
      },
      {
        title: 'Lịch sử đơn hàng',
        url: '/shop/orders/history',
        icon: Clock
      }
    ]
  },
  {
    label: 'Khuyến mãi & Ưu đãi',
    items: [
      {
        title: 'Tạo mã giảm giá',
        url: '/shop/vouchers/create',
        icon: Percent
      },
      {
        title: 'Danh sách mã giảm giá',
        url: '/shop/vouchers',
        icon: ClipboardList
      }
    ]
  },
  {
    label: 'Báo cáo & Phân tích',
    items: [
      {
        title: 'Doanh thu',
        url: '/shop/reports/revenue',
        icon: BarChart2
      },
      {
        title: 'Hiệu suất sản phẩm',
        url: '/shop/reports/performance',
        icon: TrendingUp
      },
      {
        title: 'Phân tích khách hàng',
        url: '/shop/reports/customers',
        icon: Users
      }
    ]
  },
  {
    label: 'Hệ thống',
    items: [
      {
        title: 'Cài đặt shop',
        url: '/shop/settings',
        icon: Settings
      },
      {
        title: 'Chính sách & Quy định',
        url: '/shop/policies',
        icon: FileText
      }
    ]
  },
  {
    label: 'Hỗ trợ',
    items: [
      {
        title: 'Hỏi đáp',
        url: '/shop/faqs',
        icon: MessageSquare
      },
      {
        title: 'Liên hệ hỗ trợ',
        url: '/shop/support',
        icon: Phone
      }
    ]
  }
]

export default function ShopLayout() {
  return (
    <SidebarProvider>
      <AppSidebar menuConfig={shopMenuConfig}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size='lg'>
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                      <Command className='size-4' />
                    </div>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>Binggo Inc</span>
                      <span className='truncate text-xs'>Enterprise</span>
                    </div>
                    <ChevronDown className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
                  <DropdownMenuItem>
                    <Store className='mr-2 h-4 w-4' />
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='font-medium'>Binggo Inc</span>
                      <span className='text-xs text-muted-foreground'>
                        Enterprise
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Store className='mr-2 h-4 w-4' />
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='font-medium'>Shop 2</span>
                      <span className='text-xs text-muted-foreground'>
                        Standard
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <PlusCircle className='mr-2 h-4 w-4' />
                    <span className='font-medium'>Add New Shop</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </AppSidebar>
      <main className='w-full'>
        <header className='sticky top-0 z-50 flex h-16 items-center border-b bg-background px-4 w-full'>
          <SidebarTrigger />
          <Search />
          <div className='flex items-center space-x-4 lg:ml-auto'>
            {/* Notification */}
            <Button variant='ghost' size='icon' className='relative'>
              <Bell className='h-4 w-4' />
              <span className='absolute right-1 top-1 h-2 w-2 rounded-full bg-primary' />
            </Button>
            <UserNav />
          </div>
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
