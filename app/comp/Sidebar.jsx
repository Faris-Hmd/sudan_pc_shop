import { SelectLabel } from "@/components/ui/select";
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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import {
  ChartLine,
  ChartSpline,
  Contact,
  Heart,
  Home,
  Info,
  LogOut,
  Search,
  Settings,
  Thermometer,
  UserCog2,
} from "lucide-react";
import Link from "next/link";

export default function AppSidebar() {
  return (
    <Sidebar className="z-50">
      <SidebarHeader>
        <div className="flex justify-between items-center">
          <Link href={"/"} className="logo">
            Elneelen shop
          </Link>
          <SidebarTrigger size={"icon-sm"} className="ms-1" />
        </div>
        <div className="p-2 flex items-center justify-between bg-blue-500 text-white rounded-2xl shadow-2xl">
          <Avatar className="me-2 ">
            <AvatarImage
              width={40}
              className="rounded-full"
              src="https://github.com/evilrabbit.png"
            />
            <AvatarFallback className="m-1">CN</AvatarFallback>
          </Avatar>{" "}
          <div className="grow ">
            <div>Faris Hamad</div>
            <div className="text-xs text-muted">farishmd@gmail.com</div>
          </div>
          <Settings size={17} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="rounded-2xl ">
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
                  href="/products"
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
                {" "}
                <Link
                  className="p-3 flex items-center gap-2 bg-white"
                  href="/Dashboard/productsSet"
                >
                  <Settings size={18} /> Products
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                {" "}
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
                {" "}
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
                <Link
                  className="p-3 flex items-center justify-start gap-2 bg-white"
                  href="/Dashboard"
                >
                  <Contact size={18} /> Contact Us
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                {" "}
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
              <SidebarMenuItem>
                <Link
                  className="p-3 flex items-center gap-2 bg-white"
                  href="/Dashboard/productsSet"
                >
                  <LogOut size={18} /> Logout
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
