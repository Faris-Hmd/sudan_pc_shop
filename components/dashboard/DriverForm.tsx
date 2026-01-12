"use client";

import React, { useState } from "react";
import { Driver } from "@/types/userTypes";
import {
  Truck,
  Phone,
  User,
  Save,
  ChevronLeft,
  Loader2,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addDriver, upDriver } from "@/services/driversServices";

interface DriverFormProps {
  initialData?: Driver;
  isEdit?: boolean;
}

export function DriverForm({ initialData, isEdit }: DriverFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Driver, "id">>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    vehicle: initialData?.vehicle || "",
    status: initialData?.status || "Active",
    currentOrders: initialData?.currentOrders || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit && initialData?.id) {
        const res = await upDriver(initialData.id, formData);
        if (res.success) {
          toast.success("Driver profile updated");
          router.push("/dashboard/drivers" as any);
          router.refresh();
        } else {
          toast.error(res.error || "Update failed");
        }
      } else {
        const res = await addDriver(formData);
        if (res.success) {
          toast.success("New driver deployed");
          router.push("/dashboard/drivers" as any);
          router.refresh();
        } else {
          toast.error(res.error || "Onboarding failed");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 pb-32">
      <header className="flex items-center gap-4 mb-8 pulse-in">
        <Link
          href={"/dashboard/drivers" as any}
          className="p-3 hover:bg-muted rounded-2xl transition-colors text-muted-foreground"
        >
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight">
            {isEdit ? "Technical" : "Personnel"}{" "}
            <span className="text-primary italic">
              {isEdit ? "Update" : "Onboarding"}
            </span>
          </h1>
          <p className="text-sm text-muted-foreground font-medium italic">
            {isEdit
              ? "Modify driver credentials and status."
              : "Register a new operative to the logistics network."}
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-[2.5rem] border border-border p-6 md:p-10 shadow-xl shadow-primary/5 space-y-8 transition-all">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">
              Operator Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30"
                size={18}
              />
              <input
                required
                type="text"
                placeholder="e.g. Ahmed Ali"
                className="w-full pl-12 pr-6 py-4 bg-muted border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-foreground"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">
              Operator Email (Login)
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30"
                size={18}
              />
              <input
                required
                type="email"
                placeholder="e.g. ahmed@sudanpc.com"
                className="w-full pl-12 pr-6 py-4 bg-muted border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-foreground"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">
              Secure Contact
            </label>
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30"
                size={18}
              />
              <input
                required
                type="tel"
                placeholder="+249..."
                className="w-full pl-12 pr-6 py-4 bg-muted border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-foreground"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">
              Vehicle ID / Model
            </label>
            <div className="relative">
              <Truck
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30"
                size={18}
              />
              <input
                required
                type="text"
                placeholder="e.g. Toyota Hilux - KRT 1234"
                className="w-full pl-12 pr-6 py-4 bg-muted border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-foreground"
                value={formData.vehicle}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] ml-2">
              Operational Status
            </label>
            <div className="flex gap-4">
              {["Active", "Inactive"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, status: status as any })
                  }
                  className={`flex-1 py-4 rounded-2xl font-black transition-all border ${
                    formData.status === status
                      ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-muted border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-black py-5 rounded-[1.5rem] shadow-xl shadow-primary/10 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {loading
              ? "Syncing Protocols..."
              : isEdit
                ? "Commit Changes"
                : "Deploy Operative"}
          </button>
        </div>
      </form>
    </div>
  );
}
