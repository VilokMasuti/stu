import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { BarChart2, Bolt, BookAIcon, BookOpen, Donut, HelpCircle } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", icon: BarChart2, href: "/" },
  { name: "Students", icon: BookAIcon, href: "/students" },
  { name: "Chapter", icon: BookOpen, href: "/chapter" },
  { name: "Help", icon: HelpCircle, href: "/help" },
  { name: "Reports", icon: Donut, href: "/reports" },
  { name: "Settings", icon: Bolt, href: "/settings" },
];

export function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore();

  const SidebarContent = () => (
    <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <img className="h-8 w-auto" src="/Vector.png" alt="Logo" />
        </div>
        <nav className="mt-5 space-y-2 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  isActive
                    ? "bg-gray-100 text-black font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-3 py-2 rounded-md text-sm"
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={toggleSidebar}>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
