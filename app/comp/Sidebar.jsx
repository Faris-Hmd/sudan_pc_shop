import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
  ChartSpline,
  Grid2X2,
  Home,
  Info,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Thermometer,
  Truck,
} from "lucide-react";
import Link from "next/link";
import SignToggle from "./SignToggle";
import UserInfo from "./UserInfo";

const NAV_ITEMS = [
  { title: "Homepage", href: "/", icon: Home },
  { title: "My Cart", href: "/Cart", icon: ShoppingCart },
  { title: "Orders", href: "/orders", icon: Truck },
  { title: "Search", href: "/products", icon: Search },
  { title: "Categories", href: "/products/categories", icon: Grid2X2 },
];

const ADMIN_ITEMS = [
  { title: "Manage Order", href: "/Dashboard/manegeOrder", icon: Package },
  { title: "Overview", href: "/Dashboard", icon: ChartSpline },
  { title: "Products", href: "/Dashboard/productsSet", icon: Settings },
];

export default async function AppSidebar() {
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="bg-gradient-to-br from-sky-700 to-sky-400 p-4 text-white">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="font-bold text-lg tracking-tight">
            Elneelen Shop
          </Link>
          <SidebarTrigger
            size="icon"
            className="text-white hover:bg-white/20"
          />
        </div>
        <UserInfo />
      </SidebarHeader>

      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ADMIN_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pb-8">
        <SidebarMenu>
          <SidebarMenuItem>
            <SignToggle />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/about">
                <Info />
                <span>About</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="flex items-center justify-between px-2 py-1.5">
            <div className="flex items-center gap-2 text-sm">
              <Thermometer size={18} />
              <span>Dark Theme</span>
            </div>
            <Switch id="theme-mode" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
