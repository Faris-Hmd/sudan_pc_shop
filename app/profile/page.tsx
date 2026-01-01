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
import { getShippingData, ShippingDataResponse } from "./data/getShippingData";

// 1. Define the Fetcher (The logic that gets the data)

export default function ProfilePage() {
  const { data: session } = useSession();

  // 2. Use SWR for Caching
  // The key is the user's email. If the email doesn't change, SWR returns cached data instantly.
  const { data, isLoading, mutate } = useSWR<ShippingDataResponse>(
    session?.user?.email ? `shipping/${session.user.email}` : null,
    // The key is passed as the first argument to the fetcher automatically if needed,
    // but here we call the action directly with the email.
    () => getShippingData(session?.user?.email!),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  // Helper to distinguish between success data and an error object
  const shippingInfo = data && !("error" in data) ? data : null;
  const fetchError = data && "error" in data ? data.error : null;

  if (!session?.user)
    return <div className="p-8 text-center">Please Sign In</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 pb-24">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-900 dark:to-indigo-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl dark:shadow-blue-900/10 flex flex-col md:flex-row items-center gap-8 text-white transition-all duration-500">
        <div className="relative group">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="User"
              className="w-32 h-32 rounded-3xl border-4 border-white/20 object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-32 h-32 rounded-3xl border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-4xl font-black">
              {session.user.name?.charAt(0)}
            </div>
          )}
          <Link
            href="/profile/edit"
            className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-2.5 rounded-2xl shadow-xl text-blue-600 dark:text-blue-400 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <Settings size={18} />
          </Link>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-4xl font-black tracking-tight">{session.user.name}</h1>
          <p className="text-blue-100 dark:text-blue-200 opacity-80 font-medium italic">{session.user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold transition-all active:scale-95"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          {
            label: "Orders",
            value: "12",
            icon: Package,
            color: "text-orange-500",
            bg: "bg-orange-50 dark:bg-orange-950/20",
            href: "/orders",
          },
          { 
            label: "Wishlist", 
            value: "8", 
            icon: Heart, 
            color: "text-rose-500",
            bg: "bg-rose-50 dark:bg-rose-950/20",
          },
          {
            label: "Cart",
            value: "3",
            icon: ShoppingBag,
            color: "text-blue-500",
            bg: "bg-blue-50 dark:bg-blue-950/20",
            href: "/cart",
          },
          {
            label: "Points",
            value: "450",
            icon: ChevronRight,
            color: "text-emerald-500",
            bg: "bg-emerald-50 dark:bg-emerald-950/20",
          },
        ].map((stat, i) => (
          <Link
             href={stat.href || "#" as any}
            key={i}
            className="group bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center hover:shadow-xl dark:hover:shadow-none hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300"
          >
            <div className={`p-3 rounded-2xl ${stat.bg} mb-3 group-hover:scale-110 transition-transform duration-500`}>
               <stat.icon className={`${stat.color}`} size={24} />
            </div>
            <span className="text-3xl font-black text-slate-900 dark:text-white transition-colors">
              {stat.value}
            </span>
            <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              {stat.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Account Details Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight ml-2 transition-colors">
            Shipping Information
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm p-2 transition-colors">
            <div className="w-full flex items-start gap-4 p-5">
              <div className="mt-1 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-2xl text-blue-600 dark:text-blue-400 transition-colors">
                <MapPin size={24} />
              </div>
              <div className="text-left flex-1">
                <p className="font-black text-slate-900 dark:text-white mb-2 transition-colors">
                  Default Address
                </p>
                {isLoading ? (
                  <Loader2 className="animate-spin text-slate-300" size={20} />
                ) : shippingInfo ? (
                  <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-between font-medium">
                    <span className="space-y-0.5">
                      <p>{shippingInfo.address}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-tight">
                        {shippingInfo.city}, {shippingInfo.zip}
                      </p>
                    </span>
                    <Link href="/profile/edit" className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
                      <Edit size={20} className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />
                    </Link>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 dark:text-slate-600 font-bold italic">
                    Establish your home base by adding an address.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
