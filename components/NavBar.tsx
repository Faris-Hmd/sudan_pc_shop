"use client";

import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  Search,
  Home,
  ShoppingCart,
  Package,
  LayoutDashboard,
  Truck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useCart } from "@/hooks/useCart";
import { Logo } from "@/components/Logo";

import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { getDriverByEmail } from "@/services/driversServices";
import useSWR from "swr";

const NAV_ITEMS = [
  { title: "Home", href: "/", icon: Home },
  { title: "Cart", href: "/cart", icon: ShoppingCart },
  { title: "Orders", href: "/orders", icon: Package },
];

export default function Navbar() {
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const pathname = usePathname();

  // Check if current user is a driver
  const { data: driver } = useSWR(
    session?.user?.email ? `nav-driver-${session.user.email}` : null,
    () => getDriverByEmail(session?.user?.email as string)
  );


  return (
    <nav className={`sticky backdrop-blur-md top-0 z-50 transition-all duration-300 ${
        "bg-white/85 dark:bg-slate-900/2 backdrop-blur-md py-4 border-b border-transparent dark:border-slate-800"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5 transition-transform active:scale-95">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:rotate-12 transition-transform duration-300">
              <Logo className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                SUDAN<span className="text-blue-600">PC</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Hardware Store</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.title}
                  href={item.href as any}
                  className={`relative px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                    isActive  
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20" 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {item.title}
                  {item.title === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 font-bold animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}
            
            {session?.user && (
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
            )}
            
            {session?.user && (
              <Link
                href="/dashboard"
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  pathname.startsWith("/dashboard")
                    ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <LayoutDashboard size={18} strokeWidth={pathname.startsWith("/dashboard") ? 2.5 : 2} />
                Dashboard
              </Link>
            )}

            {driver && (
              <Link
                href={"/driver" as any}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  pathname.startsWith("/driver")
                    ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Truck size={18} strokeWidth={pathname.startsWith("/driver") ? 2.5 : 2} />
                Driver Hub
              </Link>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            href="/products"
            className="p-2.5 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all active:scale-95"
          >
            <Search size={22} strokeWidth={2.5} />
          </Link>

          <div className="h-8 w-px bg-slate-100 hidden sm:block mx-1" />

          {session?.user ? (
            <Link href="/profile" className="transition-transform active:scale-90">
              <Avatar className="h-10 w-10 overflow-hidden rounded-xl border-2 border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center bg-white dark:bg-slate-800 transition-colors">
                <AvatarImage
                  src={session.user?.image || ""}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-bold text-xs">
                  {session.user?.name?.substring(0, 2).toUpperCase() || "PC"}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-6 py-2.5 text-sm font-black text-white bg-slate-900 dark:bg-blue-600 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-slate-200 dark:shadow-none active:scale-95"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
