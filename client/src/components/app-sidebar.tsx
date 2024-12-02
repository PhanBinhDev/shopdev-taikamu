import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator
} from '@/components/ui/sidebar'
import AppSidebarContent from './admin/_components/sidebar-content'
import { MenuConfig } from '@/types'

interface AppSidebarProps {
  children: React.ReactNode
  menuConfig: MenuConfig[]
}

export function AppSidebar({
  children, // Replace with your sidebar menu content
  menuConfig
}: AppSidebarProps) {
  return (
    <Sidebar variant='sidebar' collapsible='icon'>
      {/* Dynamic Header  */}
      {children}
      <SidebarSeparator />
      <SidebarContent className='p-2'>
        <AppSidebarContent menuConfig={menuConfig} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
