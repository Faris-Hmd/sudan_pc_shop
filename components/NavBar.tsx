"use client";

import { usePathname } from "next/navigation";
import { Search, Home, ShoppingCart, Package } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useCart } from "@/hooks/useCart";
import { Logo } from "@/components/Logo";

import { ModeToggle } from "@/components/ModeToggle";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const NAV_ITEMS = [
  { title: "Home", href: "/", icon: Home },
  { title: "Cart", href: "/cart", icon: ShoppingCart },
  { title: "Orders", href: "/orders", icon: Package },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className={`sticky top-0 z-50 glass py-3 border-b border-border`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-transform active:scale-95"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-300">
              <Logo className="text-primary-foreground w-6 h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-foreground tracking-tight">
                SUDAN<span className="text-primary">PC</span>
              </span>
              <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-0.5">
                Hardware Store
              </span>
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
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {item.title}
                  {item.title === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-background font-bold animate-in zoom-in">
                      {cartCount}
                    </span>
                  )}
                </Link>
              );
            })}

            {session?.user && <div className="h-6 w-px bg-border mx-2" />}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            href="/products"
            className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all active:scale-95"
          >
            <Search size={22} strokeWidth={2.5} />
          </Link>

          <div className="h-8 w-px bg-border hidden sm:block mx-1" />

          {session?.user ? (
            <Link
              href="/profile"
              className="transition-transform active:scale-90"
            >
              <Avatar className="h-10 w-10 overflow-hidden rounded-xl border-2 border-border shadow-sm flex items-center justify-center bg-card transition-colors">
                <AvatarImage
                  src={session.user?.image || ""}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                  {session.user?.name?.substring(0, 2).toUpperCase() || "PC"}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-6 py-2.5 text-xs font-black text-primary-foreground bg-primary rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 active:scale-95"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
