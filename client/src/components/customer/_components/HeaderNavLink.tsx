import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

const linksMap: {
  title: string
  to: string
}[] = [
  {
    title: 'Sản phẩm',
    to: '/products'
  },
  {
    title: 'Danh mục',
    to: '/categories'
  },
  {
    title: 'Tin tức',
    to: '/news'
  },
  {
    title: 'Liên hệ',
    to: '/contact'
  }
]

type HeaderNavLinkProps = {
  isMobile?: boolean
}

function HeaderNavLink({ isMobile = false }: HeaderNavLinkProps) {
  return (
    <nav
      className={cn(
        'flex',
        isMobile
          ? 'flex-col gap-4'
          : 'items-center space-x-6 text-sm font-medium'
      )}>
      {linksMap.map(({ title, to }) => (
        <Link key={title} to={to} className='hidden md:block'>
          {title}
        </Link>
      ))}
    </nav>
  )
}

export default HeaderNavLink
