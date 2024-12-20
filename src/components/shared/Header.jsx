import { MessageSquare, HelpCircle, Bell, Settings, Menu, Search, } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSidebarStore } from "@/store/sidebar-store"

export function Header() {
  const { toggleSidebar } = useSidebarStore()

  return (
    <header className="sticky top-0 z-40 flex h-20   shrink-0 items-center gap-x-4   px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden -ml-2"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div className="flex flex-1 items-center justify-between gap-x-4">
        <form className="flex-1 max-w-lg   bg-white rounded-lg" >
          <div className="relative">
            <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 ml-3" />
            <Input
              type="search"

              placeholder="Search your course"
              className="h-10 md:h-10 w-full pl-10  rounded-lg focus-visible:ring-0 "
            />
          </div>
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button variant="ghost" size="icon" className="relative">
            <HelpCircle className="h-6 w-6 text-gray-400" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <MessageSquare className="h-6 w-6 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Settings className="h-6 w-6 text-gray-400" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-6 w-6 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          <div className="hidden items-center gap-x-3 lg:flex">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/Avatar Image.png" alt="AD" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="text-sm  font-bold">Adeline H. Dancy</span>
          </div>
        </div>
      </div>
    </header>
  )
}

