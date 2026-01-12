"use client";

import { signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import {
  Package,
  MapPin,
  Settings,
  LogOut,
  ShoppingBag,
  Heart,
  ChevronRight,
  Edit,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { getUser } from "@/services/userServices";
import { useCart } from "@/hooks/useCart";
import { getUserOrdersStats } from "@/services/ordersServices";
import Loading from "@/components/Loading";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { cartCount } = useCart();

  // Fetch real user data
  const { data, isLoading: shippingLoading } = useSWR(
    session?.user?.email ? `user/${session.user.email}` : null,
    () => getUser(session?.user?.email!),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      dedupingInterval: 120000,
    },
  );

  // Fetch real orders count
  const { data: orders, isLoading: ordersLoading } = useSWR(
    session?.user?.email ? `orders-count/${session.user.email}` : null,
    () => getUserOrdersStats(session?.user?.email!),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  const shippingInfo = data?.shippingInfo;

  if (!session?.user)
    return <div className="p-8 text-center">Please Sign In</div>;

  const stats = [
    {
      label: "Orders",
      value: ordersLoading ? "..." : (orders?.count || 0).toString(),
      icon: Package,
      color: "text-warning",
      bg: "bg-warning/10",
      href: "/orders",
    },
    {
      label: "Wishlist",
      value: "00",
      icon: Heart,
      color: "text-error",
      bg: "bg-error/10",
    },
    {
      label: "Cart",
      value: cartCount.toString().padStart(2, "0"),
      icon: ShoppingBag,
      color: "text-info",
      bg: "bg-info/10",
      href: "/cart",
    },
    {
      label: "Points",
      value: "0.0",
      icon: Zap,
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="page-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-foreground m-0 uppercase tracking-tighter">
                Profile
              </h1>
            </div>
            <Link
              href="/profile/edit"
              className="flex items-center justify-center gap-2 bg-primary/10 p-2 rounded-lg hover:bg-primary/20 transition-all duration-300 group"
            >
              <Edit
                size={16}
                className="text-primary group-hover:scale-110 transition-transform"
              />
              <span className="text-[11px] font-black uppercase tracking-tight text-primary hidden md:block">
                Edit Profile
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 space-y-4 md:space-y-6">
        {/* User Info Card */}
        <div className="relative isolate overflow-hidden bg-card border border-border p-4 md:p-6 rounded-lg shadow flex flex-col sm:flex-row items-center gap-6">
          {/* Background Grid & Glows - Enhanced with more color/shape */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
              style={{
                backgroundImage: `radial-gradient(var(--primary) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-info/10 blur-[80px]" />

            {/* Geometric Accent Shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -rotate-45 translate-x-16 -translate-y-16 border-l border-b border-primary/10 hidden md:block" />
          </div>

          <div className="relative group shrink-0">
            {/* Avatar Glow Shape */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-info rounded-lg blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />

            {session.user?.image ? (
              <img
                src={session.user.image}
                alt="User"
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg border border-border/50 object-cover shadow-2xl group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg border border-border/50 bg-muted flex items-center justify-center text-foreground text-2xl font-black">
                {session.user?.name?.charAt(0)}
              </div>
            )}
            <Link
              href="/profile/edit"
              className="absolute -bottom-1 -right-1 bg-primary p-1.5 rounded-xl shadow-lg text-primary-foreground hover:opacity-90 hover:scale-110 transition-all border border-border"
            >
              <Settings size={14} />
            </Link>
          </div>

          <div className="flex-1 text-center sm:text-left relative z-10 w-full">
            <div className="space-y-1">
              <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground m-0 uppercase leading-none">
                {session.user?.name}
              </h1>
              <p className="text-muted-foreground font-bold text-[10px] md:text-xs uppercase tracking-widest m-0 opacity-70">
                {session.user?.email}
              </p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-6 pt-4 border-t border-border/50">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-error/10 hover:text-error hover:border-error/30 border border-border text-foreground rounded text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 group"
              >
                <LogOut
                  size={12}
                  className="group-hover:-translate-x-0.5 transition-transform"
                />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, i) => (
            <Link
              href={stat.href || ("#" as any)}
              key={i}
              className="group relative bg-card p-3 md:p-4 rounded-lg border border-border flex flex-col items-center hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Corner Shape Accent */}
              <div
                className={cn(
                  "absolute top-0 right-0 w-8 h-8 opacity-10 -translate-y-4 translate-x-4 rotate-45",
                  stat.bg,
                )}
              />

              <div
                className={`p-1.5 rounded-md ${stat.bg} mb-1.5 relative z-10`}
              >
                <stat.icon className={`${stat.color}`} size={16} />
              </div>
              <span className="text-lg font-black text-foreground">
                {stat.value}
              </span>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Details Sections */}
        <div className="grid md:grid-cols-1 gap-2 md:gap-4">
          <div className="space-y-2">
            <div className="bg-card rounded-lg border border-border p-3 md:p-4 transition-colors">
              <div className="flex items-center gap-3">
                <div className="bg-info/10 p-2 rounded-md text-info transition-colors">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                      Primary Address
                    </p>
                    <Link
                      href="/profile/edit"
                      className="p-1 hover:bg-muted rounded-lg transition-all group"
                    >
                      <Edit
                        size={14}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                    </Link>
                  </div>
                  {shippingLoading ? (
                    <Loading
                      size="sm"
                      text=""
                      className="min-h-0 p-0 justify-start"
                    />
                  ) : shippingInfo ? (
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-foreground truncate">
                        {shippingInfo.address}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">
                        {shippingInfo.city}, {shippingInfo.zip}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground font-medium italic">
                      Add a shipping address to your profile
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
