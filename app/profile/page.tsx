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
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-4 pb-24">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-500 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-8 text-white">
        <div className="relative">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="User"
              className="w-32 h-32 rounded-full border-4 border-white/30 object-cover shadow-2xl"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-white/30 bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold">
              {session.user.name?.charAt(0)}
            </div>
          )}
          <Link
            href="/profile/edit"
            className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg text-blue-600 hover:scale-110 transition"
          >
            <Settings size={16} />
          </Link>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-1">{session.user.name}</h1>
          <p className="text-blue-100 opacity-90 mb-4">{session.user.email}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl transition"
            >
              <LogOut size={18} /> Sign Out
            </button>
            {/* <Link
              href="/UserInfoUpdate"
              className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-50 transition"
            >
              Edit Profile
            </Link> */}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Orders",
            value: "12",
            icon: Package,
            color: "text-orange-500",
            href: "/orders",
          },
          { label: "Wishlist", value: "8", icon: Heart, color: "text-red-500" },
          {
            label: "Cart",
            value: "3",
            icon: ShoppingBag,
            color: "text-blue-500",
            href: "/cart",
          },
          {
            label: "Points",
            value: "450",
            icon: ChevronRight,
            color: "text-green-500",
          },
        ].map((stat, i) => (
          <Link
             href={stat.href || "#" as any}
            key={i}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-md transition"
          >
            <stat.icon className={`${stat.color} mb-2`} size={24} />
            <span className="text-2xl font-bold text-gray-800">
              {stat.value}
            </span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </Link>
        ))}
      </div>

      {/* Account Details Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Shipping Info</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2">
            <div className="w-full flex items-start gap-4 p-4">
              <div className="mt-1 bg-blue-50 p-2 rounded-lg text-blue-600">
                <MapPin size={20} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-gray-800 mb-1">
                  Default Shipping Address
                </p>
                {isLoading ? (
                  <Loader2 className="animate-spin text-gray-300" size={16} />
                ) : shippingInfo ? (
                  <div className="text-sm text-gray-600 flex items-center justify-between">
                    <span>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.zip}
                      </p>
                    </span>
                    <Link href="/profile/edit">
                      <Edit size={20} className="inline ml-2 text-gray-400" />
                    </Link>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No address found.
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
