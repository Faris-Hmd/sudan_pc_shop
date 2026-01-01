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
  Loader2,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { getUser } from "@/services/userServices";
import { useCart } from "@/hooks/useCart";
import { getOrdersWh } from "@/services/ordersServices";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { cartCount } = useCart();

  // Fetch real user data
  const { data, isLoading: shippingLoading } = useSWR(
    session?.user?.email ? `user/${session.user.email}` : null,
    () => getUser(session?.user?.email!),
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  // Fetch real orders count
  const { data: orders, isLoading: ordersLoading } = useSWR(
    session?.user?.email ? `orders-count/${session.user.email}` : null,
    () => getOrdersWh([{ field: "customer_email", op: "==", val: session?.user?.email }]),
    { revalidateOnFocus: false, dedupingInterval: 30000 }
  );

  const shippingInfo = data?.shippingInfo;

  if (!session?.user)
    return <div className="p-8 text-center">Please Sign In</div>;

  const stats = [
    {
      label: "Orders",
      value: ordersLoading ? "..." : (orders?.length || 0).toString(),
      icon: Package,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      href: "/orders",
    },
    { 
      label: "Wishlist", 
      value: "00", 
      icon: Heart, 
      color: "text-rose-500",
      bg: "bg-rose-50 dark:bg-rose-500/10",
    },
    {
      label: "Cart",
      value: cartCount.toString().padStart(2, '0'),
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      href: "/cart",
    },
    {
      label: "Points",
      value: "0.0",
      icon: ChevronRight,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-32">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                Profile
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Manage your account and preferences
              </p>
            </div>
            <Link
              href="/profile/edit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-sm"
            >
              <Edit size={16} />
              <span className="hidden md:inline">Edit Profile</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
        {/* User Info Card */}
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 p-6 md:p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-6 text-white border border-slate-700/50">
        {/* Background Grid & Glows - Inherited from Hero aesthetic */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)`,
              backgroundSize: '3rem 3rem',
              maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 70%, transparent 100%)'
            }}
          />
          <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-blue-600/30 blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-indigo-600/30 blur-3xl animate-pulse [animation-delay:2s]" />
        </div>

        <div className="relative group shrink-0">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="User"
              className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-white/10 object-cover shadow-2xl group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white text-3xl font-black">
              {session.user.name?.charAt(0)}
            </div>
          )}
          <Link
            href="/profile/edit"
            className="absolute -bottom-1 -right-1 bg-blue-600 p-1.5 rounded-xl shadow-lg text-white hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all border border-white/10"
          >
            <Settings size={14} />
          </Link>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1 relative z-10">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              {session.user.name}
            </span>
          </h1>
          <p className="text-slate-400 font-medium text-sm tracking-tight">{session.user.email}</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <Link
             href={stat.href || "#" as any}
            key={i}
            className="group bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300"
          >
            <div className={`p-2 rounded-xl ${stat.bg} mb-2`}>
               <stat.icon className={`${stat.color}`} size={18} />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {stat.value}
            </span>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              {stat.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Details Sections */}
      <div className="grid md:grid-cols-1 gap-4">
        <section className="space-y-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2.5 rounded-xl text-blue-600 dark:text-blue-400 transition-colors">
                <MapPin size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                    Primary Address
                  </p>
                  <Link href="/profile/edit" className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all group">
                    <Edit size={14} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </Link>
                </div>
                {shippingLoading ? (
                  <Loader2 className="animate-spin text-slate-300" size={16} />
                ) : shippingInfo ? (
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {shippingInfo.address}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-tight">
                      {shippingInfo.city}, {shippingInfo.zip}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 font-medium italic">
                    Add a shipping address to your profile
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
}
