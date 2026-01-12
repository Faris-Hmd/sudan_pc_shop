"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MapPin, ChevronLeft, Save, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser, upUser } from "@/services/userServices";
import Loading, { Spinner } from "@/components/Loading";

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

  useEffect(() => {
    async function fetchShipping() {
      if (!session?.user?.email) {
        setFetching(false);
        return;
      }
      try {
        const result = await getUser(session.user.email);
        if (result?.shippingInfo) {
          setShipping(result.shippingInfo);
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      } finally {
        setFetching(false);
      }
    }
    fetchShipping();
  }, [session?.user?.email]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) return toast.error("Please sign in first");

    setLoading(true);
    try {
      const result = await upUser(session.user.email, {
        shippingInfo: shipping,
      });

      if (result.success) {
        toast.success("Profile updated");
        setTimeout(() => router.push("/profile"), 1500);
      } else {
        toast.error("Update failed", { description: result.error });
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loading size="lg" text="Syncing Profile..." />;
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* MATCHED HEADER STYLE */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border px-5 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center justify-center bg-primary/10 p-2 rounded-lg hover:bg-primary/20 transition-all group"
            >
              <ChevronLeft size={18} className="text-primary" />
            </Link>
            <div>
              <h1 className="text-lg font-black text-foreground uppercase tracking-tighter">
                Edit <span className="text-primary">Profile</span>
              </h1>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                Shipping Config
              </p>
            </div>
          </div>

          <div className="hidden sm:flex bg-muted px-3 py-1.5 rounded-lg border border-border">
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter ">
              ID: {session?.user?.email?.split("@")[0]}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-4 md:p-6">
        <div className="bg-card rounded-sm border border-border shadow-sm overflow-hidden">
          {/* Header Internal Banner */}
          <div className="p-6 bg-primary/5 border-b border-border flex items-center gap-4">
            <div className="bg-primary p-3 rounded-2xl text-primary-foreground">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                Data Security
              </p>
              <p className="text-xs text-muted-foreground font-bold">
                {session?.user?.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="p-6 space-y-5">
            {/* Street Address */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">
                Street Address
              </label>
              <input
                type="text"
                className="w-full p-4 bg-muted border border-border rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold text-foreground"
                value={shipping.address}
                onChange={(e) =>
                  setShipping({ ...shipping, address: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* City */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">
                  City
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-muted border border-border rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold text-foreground"
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                  required
                />
              </div>

              {/* ZIP */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">
                  ZIP
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-muted border border-border rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold text-foreground"
                  value={shipping.zip}
                  onChange={(e) =>
                    setShipping({ ...shipping, zip: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">
                Contact Number
              </label>
              <input
                type="tel"
                className="w-full p-4 bg-muted border border-border rounded-2xl focus:border-primary outline-none transition-all text-sm font-bold text-foreground"
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
              className="w-full bg-primary hover:opacity-90 text-primary-foreground font-black py-4 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-3 mt-4 uppercase tracking-tighter text-xs "
            >
              {loading ? <Spinner size="sm" /> : <Save size={18} />}
              {loading ? "Syncing..." : "Commit Changes"}
            </button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-[9px] font-black uppercase tracking-[0.3em] mt-8">
          Secured Protocol • Cloud Sync Active
        </p>
      </main>
    </div>
  );
}
