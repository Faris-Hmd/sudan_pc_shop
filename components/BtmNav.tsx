"use client"; // Required for usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingCart,
  Grid2X2,
  Package,
  User,
  ChartArea,
} from "lucide-react";
import { cn } from "@/lib/utils"; // Standard shadcn helper
import { useSession } from "next-auth/react";

const NAV_ITEMS = [
  { title: "Home", href: "/", icon: Home },
  { title: "Categories", href: "/products/categories", icon: Grid2X2 },
  { title: "Cart", href: "/cart", icon: ShoppingCart },
  { title: "Orders", href: "/orders", icon: Package },
  { title: "Profile", href: "/profile", icon: User },
];

export default function BtmNav() {
  const pathname = usePathname();
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="w-full fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-white/80 backdrop-blur-md pb-safe md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-1.5 py-2 transition-all duration-200",
              isActive ? "text-black-600" : "text-muted-foreground"
            )}
          >
            <div
              className={cn(
                "relative flex items-center justify-center rounded-full p-1 px-4 transition-all"
              )}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span
              className={cn(
                "text-[10px] font-medium",
                isActive && "font-bold scale-105"
              )}
            >
              {item.title}
            </span>
          </Link>
        );
      })}
      <Link
        href={"/dashboard"}
        className={cn(
          "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-all duration-200",
          pathname === "/dashboard" ? "text-black-600" : "text-muted-foreground"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full p-1 px-4 transition-all"
          )}
        >
          <ChartArea
            size={22}
            strokeWidth={pathname === "/dashboard" ? 2.5 : 2}
          />
        </div>
        <span
          className={cn(
            "text-[10px] font-medium",
            pathname === "/dashboard" && "font-bold scale-105"
          )}
        >
          Dashboard
        </span>
      </Link>
    </nav>
  );
}
