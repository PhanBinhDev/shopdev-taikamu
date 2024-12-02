import { Link, Outlet } from 'react-router-dom'
import { Search } from './_components/search'
import { UserNav } from './_components/user-nav'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '../ui/sidebar'
import { AppSidebar } from '../app-sidebar'
import { Button } from '@/components/ui/button'
import {
  Home,
  User,
  Store,
  Package,
  ShoppingCart,
  Percent,
  Settings,
  BarChart2,
  Bell,
  Tag,
  Shield,
  MessageSquare,
  FileText,
  List,
  Clock,
  Lock,
  CheckCircle,
  Eye,
  FileSearch,
  Command
} from 'lucide-react'
import { MenuConfig } from '@/types'
const adminMenuConfig: MenuConfig[] = [
  {
    label: 'Tổng quan',
    items: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: Home
      }
    ]
  },
  {
    label: 'Người dùng',
    items: [
      {
        title: 'Quản lý tài khoản',
        icon: User,
        subItems: [
          {
            title: 'Danh sách',
            icon: List,
            url: '/admin/users/list'
          },
          {
            title: 'Khóa/Mở khóa',
            icon: Lock,
            url: '/admin/users/lock'
          },
          {
            title: 'Lịch sử hoạt động',
            icon: Clock,
            url: '/admin/users/history'
          }
        ]
      },
      {
        title: 'Quản lý cửa hàng',
        icon: Store,
        subItems: [
          {
            title: 'Danh sách',
            icon: List,
            url: '/admin/stores/list'
          },
          {
            title: 'Phê duyệt shop mới',
            url: '/admin/shops/approve',
            icon: CheckCircle
          },
          {
            title: 'Khóa/Mở khóa shop',
            url: '/admin/shops/lock',
            icon: Lock
          },
          {
            title: 'Đánh giá hoạt động',
            url: '/admin/shops/reviews',
            icon: Eye
          }
        ]
      }
    ]
  },
  {
    label: 'Sản phẩm & Đơn hàng',
    items: [
      {
        title: 'Quản lý sản phẩm',
        icon: Package,
        subItems: [
          {
            title: 'Danh sách sản phẩm',
            url: '/admin/products/list',
            icon: List
          },
          {
            title: 'Phê duyệt sản phẩm mới',
            url: '/admin/products/approve',
            icon: CheckCircle
          },
          {
            title: 'Tìm kiếm & Lọc sản phẩm',
            url: '/admin/products/search',
            icon: FileSearch
          },
          {
            title: 'Xóa hoặc tạm ẩn',
            url: '/admin/products/hide',
            icon: Lock
          }
        ]
      },
      {
        title: 'Quản lý đơn hàng',
        url: '/admin/orders',
        icon: ShoppingCart
      },
      {
        title: 'Danh mục sản phẩm',
        url: '/admin/categories',
        icon: Tag
      }
    ]
  },
  {
    label: 'Khuyến mãi & Báo cáo',
    items: [
      {
        title: 'Mã giảm giá',
        url: '/admin/vouchers',
        icon: Percent
      },
      {
        title: 'Thống kê',
        url: '/admin/reports',
        icon: BarChart2
      }
    ]
  },
  {
    label: 'Hệ thống',
    items: [
      {
        title: 'Cài đặt',
        url: '/admin/settings',
        icon: Settings
      },
      {
        title: 'Khiếu nại',
        url: '/admin/complaints',
        icon: Shield
      },
      {
        title: 'Quản lý nội dung',
        url: '/admin/cms',
        icon: FileText
      }
    ]
  },
  {
    label: 'Hỗ trợ',
    items: [
      {
        title: 'Thông báo',
        url: '/admin/notifications',
        icon: Bell
      },
      {
        title: 'Phản hồi',
        url: '/admin/support',
        icon: MessageSquare
      }
    ]
  }
]

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar menuConfig={adminMenuConfig}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size='lg' asChild>
                <Link to='/admin'>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                    <Command className='size-4' />
                  </div>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>Binggo Inc</span>
                    <span className='truncate text-xs'>Enterprise</span>
                  </div>
                </Link>
              </SidebarMenuButton>
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
