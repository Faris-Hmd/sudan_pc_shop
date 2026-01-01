"use client";

import React, { useState, useEffect } from "react";
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
import { useCart } from "@/hooks/useCart";

export default function BtmNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { cartCount } = useCart();
  const [activeHash, setActiveHash] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        } else if (activeSection === entry.target.id) {
          setActiveSection("");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const target = document.getElementById("categories");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [pathname, activeSection]);

  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    setActiveHash(window.location.hash);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  // Define base items
  const navItems = [
    { title: "Home", href: "/", icon: Home },
    { title: "Categories", href: "/#categories", icon: Grid2X2 },
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg pb-safe md:hidden h-16 px-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isHashLink = item.href.includes("#");
        const isActive = isHashLink 
          ? (pathname === "/" || pathname === "") && activeSection === item.href.split("#")[1]
          : item.href === "/" 
            ? pathname === "/" && activeSection === ""
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href as any}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 transition-all duration-300",
              isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
            )}
          >
            <div
              className={cn(
                "relative flex items-center justify-center rounded-full py-1 px-4 transition-all duration-300",
                isActive ? "bg-blue-50 dark:bg-blue-900/20" : "bg-transparent"
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn("transition-transform", isActive && "scale-110")}
              />
              {item.title === "Cart" && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white dark:border-slate-900 font-bold">
                  {cartCount}
                </span>
              )}
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
