"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, MapPin, ChevronLeft, Save } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getShippingData } from "../data/getShippingData";
import { updateShippingData } from "../actions/updateShippingData";

export default function UserInfoUpdatePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch current data from Firestore
  useEffect(() => {
    async function fetchShipping() {
      // 1. Guard clause
      if (!session?.user?.email) {
        setFetching(false);
        return;
      }

      try {
        // 2. Call the Server Action
        const result = await getShippingData(session.user.email);

        // 3. Handle the structured return from the action
        if (result && "error" in result) {
          toast.error(result.error);
        } else if (result) {
          setShipping(result);
        }
      } catch (error) {
        // Catch network-level failures
        console.error("Fetch Error:", error);
        toast.error("An unexpected error occurred");
      } finally {
        setFetching(false);
      }
    }

    fetchShipping();
  }, [session?.user?.email]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      return toast.error("Please sign in first");
    }

    setLoading(true);

    try {
      // 1. Call the Server Action
      const result = await updateShippingData(session.user.email, shipping);

      if (result.success) {
        toast.success("Profile updated", {
          description: "Your shipping information has been saved successfully.",
        });

        // 2. Trigger SWR mutation if you're using SWR to sync data immediately
        // mutate(`shipping/${session.user.email}`);

        // 3. Optional: Redirect
        setTimeout(() => router.push("/profile"), 1500);
      } else {
        toast.error("Update failed", {
          description: result.error,
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 animate-pulse">Loading your details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 pb-32">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/profile"
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400"
        >
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Edit Shipping Info
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Update where your orders get delivered
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl dark:shadow-blue-900/5 border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        {/* User Visual Summary */}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800">
          <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-500/20">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Account Bound
            </p>
            <p className="text-slate-700 dark:text-slate-300 font-bold">{session?.user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="p-6 md:p-10 space-y-6">
          {/* Address Input */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">
              Street Address
            </label>
            <input
              type="text"
              placeholder="e.g. 123 Blue Nile Street"
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-slate-900 dark:text-slate-100 font-medium"
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* City Input */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">
                City
              </label>
              <input
                type="text"
                placeholder="City Name"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-slate-900 dark:text-slate-100 font-medium"
                value={shipping.city}
                onChange={(e) =>
                  setShipping({ ...shipping, city: e.target.value })
                }
                required
              />
            </div>

            {/* ZIP Input */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">
                ZIP Code
              </label>
              <input
                type="text"
                placeholder="12345"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-slate-900 dark:text-slate-100 font-medium"
                value={shipping.zip}
                onChange={(e) =>
                  setShipping({ ...shipping, zip: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+249..."
              className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all text-slate-900 dark:text-slate-100 font-medium"
              value={shipping.phone || ""}
              onChange={(e) =>
                setShipping({ ...shipping, phone: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-[1.5rem] shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center gap-3 mt-8 uppercase tracking-widest text-sm"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {loading ? "Optimizing Database..." : "Commit Changes"}
          </button>
        </form>
      </div>

      <p className="text-center text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-widest mt-10">
        Secured by PC Shop • Encrypted Cloud Storage
      </p>
    </div>
  );
}
