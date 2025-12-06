import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
  ChartLine,
  ChartSpline,
  Grid2X2,
  Heart,
  Home,
  Info,
  Search,
  Settings,
  Thermometer,
  UserCog2,
} from "lucide-react";
import Link from "next/link";
import SignToggle from "./SignToggle";
import UserInfo from "./UserInfo";

export default async function AppSidebar() {
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="bg-blue-500 text-white bg-gradient-to-br from-sky-700 to-sky-400">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="logo">
            Elneelen shop
          </Link>
          <SidebarTrigger size={"icon-sm"} className="ms-1" />
        </div>
        <UserInfo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="rounded-2xl">
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center justify-start gap-2 bg-white"
                  href="/"
                >
                  <Home size={18} /> Homepage
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center justify-start gap-2 bg-white"
                  href="/products"
                >
                  <Search size={18} /> Search
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center justify-start gap-2 bg-white"
                  href="/products/categories"
                >
                  <Grid2X2 size={18} /> Categories
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center justify-start gap-2 bg-white"
                  href="/wishlist"
                >
                  <Heart size={18} /> Whishlist
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center justify-start gap-2 bg-white"
                  href="/Dashboard"
                >
                  <ChartSpline size={18} /> Overview
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center gap-2 bg-white"
                  href="/Dashboard/productsSet"
                >
                  <Settings size={18} /> Products
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link
                  className="p-3 items-center flex gap-2 bg-white"
                  href="/Dashboard"
                >
                  <UserCog2 size={18} /> Users
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center gap-2 bg-white"
                  href="/Dashboard"
                >
                  <ChartLine size={18} /> Aanaltics
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center gap-2 bg-white"
                  href="/Dashboard/productsSet"
                >
                  <Settings size={18} /> Products
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="rounded-2xl ">
              <SidebarMenuItem>
                <SignToggle />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center gap-2 bg-white"
                  href="/Dashboard/productsSet"
                >
                  <Info size={18} /> About
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem className="flex justify-between bg-white">
                <label
                  htmlFor="airplane-mode"
                  className="p-3 flex items-center gap-2 bg-white"
                >
                  <Thermometer size={18} /> Dark Theme
                </label>
                <div className="flex items-center space-x-2 me-4">
                  <Switch id="airplane-mode" />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
