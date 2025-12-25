"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Loader2, MapPin, ChevronLeft, Save } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/db/firebase";

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
    async function getShippingData() {
      if (!session?.user?.email) return;

      try {
        const userRef = doc(db, "users", session.user.email);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists() && docSnap.data().shippingInfo) {
          setShipping(docSnap.data().shippingInfo);
        }
      } catch (error) {
        console.error("Error fetching shipping info:", error);
        toast.error("Failed to load existing information");
      } finally {
        setFetching(false);
      }
    }

    getShippingData();
  }, [session?.user?.email]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return toast.error("Please sign in first");

    setLoading(true);
    try {
      const userRef = doc(db, "users", session.user.email);

      // Update Firestore
      await setDoc(
        userRef,
        {
          shippingInfo: shipping,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      toast.success("Profile updated", {
        description: "Your shipping information has been saved successfully.",
      });

      // Optional: Redirect back to profile after short delay
      setTimeout(() => router.push("/Profile"), 1500);
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Update failed", {
        description: "There was an error saving to the database.",
      });
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
          href="/Profile"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Shipping Info
          </h1>
          <p className="text-sm text-gray-500">
            Update where your orders get delivered
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* User Visual Summary */}
        <div className="bg-blue-50 p-6 flex items-center gap-4 border-b border-gray-100">
          <div className="bg-blue-600 p-3 rounded-2xl text-white">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Account
            </p>
            <p className="text-gray-700 font-medium">{session?.user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-6">
          {/* Address Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Street Address
            </label>
            <input
              type="text"
              placeholder="e.g. 123 Blue Nile Street"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* City Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                City
              </label>
              <input
                type="text"
                placeholder="City"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                value={shipping.city}
                onChange={(e) =>
                  setShipping({ ...shipping, city: e.target.value })
                }
                required
              />
            </div>

            {/* ZIP Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">
                ZIP Code
              </label>
              <input
                type="text"
                placeholder="12345"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
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
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+249..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center gap-3 mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {loading ? "Saving Changes..." : "Save Information"}
          </button>
        </form>
      </div>

      <p className="text-center text-gray-400 text-xs mt-8">
        Your data is securely stored in our encrypted database.
      </p>
    </div>
  );
}
