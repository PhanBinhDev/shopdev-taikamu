import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Cog,
  LogOut,
  Menu,
  Search,
  ShoppingBasket,
  ShoppingCart,
  UserCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'
import HeaderNavLink from './HeaderNavLink'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/useAuthStore'
import { useAuth } from '@/hooks/useAuth'

function HeaderCustomer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, signOut } = useAuth()
  const { user } = useAuthStore()
  return (
    <header className='sticky top-0 z-50 w-full bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center'>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              className='mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden'>
              <Menu className='size-6' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'} className='w-[300px] sm:w-[400px]'>
            <HeaderNavLink isMobile={true} />
          </SheetContent>
        </Sheet>
        <Link to='/' className='mr-6 flex items-center space-x-2'>
          <ShoppingCart className='h-6 w-6' />
          <span className='inline-block font-bold'>MyStore</span>
        </Link>
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <HeaderNavLink />
          <div className='w-full max-w-sm items-center md:flex'>
            <form className='flex w-full max-w-sm items-center space-x-2'>
              <Input type='search' placeholder='Search...' className='w-full' />
              <Button type='submit' size='icon' className='shrink-0'>
                <Search className='h-4 w-4' />
                <span className='sr-only'>Search</span>
              </Button>
            </form>
          </div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='relative h-8 w-8 rounded-full'>
                  <img
                    src='https://github.com/shadcn.png'
                    alt='User avatar'
                    className='h-8 w-8 rounded-full'
                  />
                  <span className='sr-only'>Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel className='font-normal flex items-center gap-2'>
                  <img
                    src='https://github.com/shadcn.png'
                    alt='User avatar'
                    className='h-8 w-8 rounded-full'
                  />
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      {user?.name}
                    </p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to='/profile'>
                  <DropdownMenuItem className='cursor-pointer'>
                    <UserCircle /> Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className='cursor-pointer'>
                  <ShoppingBasket />
                  Orders
                </DropdownMenuItem>
                <Link to={'/settings'}>
                  <DropdownMenuItem className='cursor-pointer'>
                    <Cog /> Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className='cursor-pointer hover:bg-default-50'
                  onClick={() => signOut()}>
                  <LogOut /> Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to='/auth'>
              <Button variant='ghost'>Login</Button>
            </Link>
          )}
          <Button variant='ghost' size='icon' className='relative'>
            <ShoppingCart className='h-4 w-4' />
            <span className='sr-only'>Open cart</span>
            <Badge
              variant='destructive'
              className='absolute -right-2 -top-2 h-6 w-6 rounded-full p-2'>
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default HeaderCustomer
