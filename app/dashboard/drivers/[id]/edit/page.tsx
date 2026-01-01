"use client";

import React from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { getDriver } from "@/services/driversServices";
import { DriverForm } from "@/components/dashboard/DriverForm";
import { Loader2 } from "lucide-react";

export default function EditDriverPage() {
  const { id } = useParams();
  const { data: driver, isLoading } = useSWR(id ? `driver-${id}` : null, () => getDriver(id as string));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-400 font-bold animate-pulse uppercase tracking-[0.2em] text-[10px]">Retrieving Credentials...</p>
      </div>
    );
  }

  if (!driver) {
    return <div className="p-20 text-center font-black text-rose-500 uppercase tracking-widest">Driver Data Nullified</div>;
  }

  return <DriverForm initialData={driver} isEdit />;
}
