import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { MenuConfig } from '@/types'

import { Link } from 'react-router-dom'

interface AppSidebarContentProps {
  menuConfig: MenuConfig[]
}

function AppSidebarContent({ menuConfig = [] }: AppSidebarContentProps) {
  return (
    <>
      {menuConfig.map((group, groupIndex) => (
        <div key={groupIndex}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item, itemIndex) => (
                <Collapsible key={itemIndex} defaultOpen={false}>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      {item.url ? (
                        <Link
                          to={item.url}
                          className='flex items-center justify-center'>
                          <SidebarMenuButton>
                            <item.icon className='size-4 mr-2' />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </Link>
                      ) : (
                        <SidebarMenuButton>
                          <item.icon className='size-4 mr-2' />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      )}
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
                  {!item?.subItems ? (
                    <></>
                  ) : (
                    <CollapsibleContent>
                      {item?.subItems?.map((subItem, subItemIndex) => (
                        <SidebarMenuItem key={subItemIndex}>
                          <SidebarMenuButton asChild>
                            <Link
                              to={subItem.url!}
                              className='pl-4 flex items-center gap-2'>
                              <subItem.icon className='w-4 h-4' />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </CollapsibleContent>
                  )}
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
      ))}
    </>
  )
}

export default AppSidebarContent
