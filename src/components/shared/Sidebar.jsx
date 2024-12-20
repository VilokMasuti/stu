import { cn } from "@/lib/utils"
import { Sheet, SheetContent, } from "@/components/ui/sheet"
import { BarChart2, BookOpen, HelpCircle, Settings, Users } from 'lucide-react'
import { useSidebarStore } from "@/store/sidebar-store"

const navigation = [
  { name: 'Dashboard', icon: BarChart2, href: '/', current: false },
  { name: 'Students', icon: Users, href: '/students', current: true },
  { name: 'Chapter', icon: BookOpen, href: '/chapter', current: false },
  { name: 'Help', icon: HelpCircle, href: '/help', current: false },
  { name: 'Settings', icon: Settings, href: '/settings', current: false },
]

export function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore()

  const SidebarContent = () => (
    <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <img className="h-8 w-auto" src="/logo.svg" alt="Quyl" />
        </div>
        <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
              )}
            >
              <item.icon
                className={cn(
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={toggleSidebar}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}

