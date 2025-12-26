"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Grid2X2,
  Package,
  User,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function BtmNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Define base items
  const navItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "Categories", href: "/products/categories", icon: Grid2X2 },
    { title: "Cart", href: "/cart", icon: ShoppingCart },
    { title: "Orders", href: "/orders", icon: Package },
  ];

  // Add Dashboard if logged in, otherwise add Profile
  if (session?.user) {
    navItems.push({
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    });
  } else {
    navItems.push({ title: "Profile", href: "/profile", icon: User });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-white/90 backdrop-blur-lg pb-safe md:hidden h-16 px-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        // Check if active (exact match for home, startsWith for others like dashboard)
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-300",
              isActive ? "text-blue-600" : "text-slate-500"
            )}
          >
            <div
              className={cn(
                "relative flex items-center justify-center rounded-full py-1 px-4 transition-all duration-300",
                isActive ? "bg-blue-50" : "bg-transparent"
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("transition-transform", isActive && "scale-110")}
              />
            </div>
            <span
              className={cn(
                "text-[10px] font-semibold transition-all",
                isActive ? "opacity-100 translate-y-0" : "opacity-80"
              )}
            >
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
