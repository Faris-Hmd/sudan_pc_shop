"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Lock, Loader2, LogIn, ShieldCheck } from "lucide-react";

export default function UserInfo() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle redirect in useEffect to avoid "render while updating" warnings
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Verifying Session...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-500/5 transition-all">
        
        {/* Icon Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-3xl flex items-center justify-center mb-6 ring-8 ring-blue-50/50 dark:ring-blue-900/10">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Secure <span className="text-blue-600">Access</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">
            Authentication Required
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 rounded-2xl p-4 mb-8">
            <div className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-emerald-500 mt-0.5" />
                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    Sign in with your authorized Google account to access your dashboard and order history.
                </p>
            </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => signIn("google")}
          className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-500/10 transition-all active:scale-[0.98]"
        >
          <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">
            Continue with Google
          </span>
        </button>

        {/* Footer */}
        <p className="text-center mt-8 text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          Encrypted Connection • v2.0.4
        </p>
      </div>
    </div>
  );
}