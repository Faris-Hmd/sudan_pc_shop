"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  Search,
  Home,
  Grid2X2,
  ShoppingCart,
  Package,
  User,
  LayoutDashboard,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const NAV_ITEMS = [
  { title: "Home", href: "/", icon: Home },
  { title: "Categories", href: "/products/categories", icon: Grid2X2 },
  { title: "Cart", href: "/cart", icon: ShoppingCart },
  { title: "Orders", href: "/orders", icon: Package },
  { title: "Profile", href: "/profile", icon: User },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center px-4 py-3 border-b border-gray-200 shadow-sm">
      {/* Brand Logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo Icon */}
          <img src="/favicon.ico" alt="Sudan PC Logo" className="w-8 h-8" />
          {/* Logo Text */}
          <span className="uppercase font-extrabold text-xl tracking-tighter text-blue-600">
            Sudan PC
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 ml-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive ? "text-blue-600" : "text-slate-600"
                }`}
              >
                <Icon size={18} />
                {item.title}
              </Link>
            );
          })}

          {/* Dashboard Link if logged in */}
          {session?.user && (
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-blue-600 border-l pl-6 ml-2 ${
                pathname.startsWith("/dashboard")
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <Link
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          href="/products"
        >
          <Search size={20} className="text-slate-600" />
        </Link>

        {session?.user ? (
          <Link href="/profile">
            <Avatar className="h-9 w-9 flex items-center justify-center overflow-hidden rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-105 bg-white">
              <AvatarImage
                src={session.user?.image || "github.com"}
                className="h-full w-full object-cover"
              />
              <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-xs uppercase">
                {session.user?.name?.substring(0, 2) || "PC"}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
