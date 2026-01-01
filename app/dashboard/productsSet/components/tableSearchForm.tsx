"use client";

import { Search, X, Filter, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";
import { useRef } from "react";

function TableSearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const activeKey = searchParams.get("key");
  const activeValue = searchParams.get("value");

  function handleCatOnchange(cat: string) {
    if (cat === "all") {
      handleReset();
    } else {
      replace(`${pathname}?key=p_cat&value=${cat}` as any);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const p_name = formData.get("p_name")?.toString();

    if (p_name?.trim()) {
      replace(
        `${pathname}?key=p_name&value=${encodeURIComponent(p_name.trim())} ` as any
      );
    }
  }

  function handleReset() {
    if (formRef.current) formRef.current.reset();
    replace(pathname as any );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto"
    >
      <div className="relative flex items-center w-full md:w-64 group">
        <Search
          size={16}
          className="absolute left-4 text-slate-400 group-focus-within:text-blue-500 transition-colors"
        />

        <input
          type="text"
          name="p_name"
          placeholder="Search products..."
          defaultValue={activeKey === "p_name" ? activeValue || "" : ""}
          className="w-full pl-11 pr-10 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm h-[40px]"
        />

        {activeValue && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-all"
          >
            <X size={14} strokeWidth={3} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <Select
          value={activeKey === "p_cat" ? activeValue || "" : ""}
          onValueChange={handleCatOnchange}
        >
          <SelectTrigger className="w-full md:w-[160px] h-[40px] rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm shadow-sm transition-colors focus:ring-4 focus:ring-blue-500/10">
            <div className="flex items-center gap-2.5">
              <Filter size={14} className="text-slate-400" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-xl dark:bg-slate-900 dark:border-slate-800">
            <SelectItem value="all" className="font-bold text-blue-600 dark:text-blue-400">
              All Categories
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="font-medium text-slate-700 dark:text-slate-300">
                {cat.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 h-[40px] rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-none transition-all active:scale-95 w-full md:w-auto"
        >
          <span className="md:hidden text-sm font-black uppercase tracking-tight">Search</span>
          <Search size={18} strokeWidth={3} className="hidden md:block" />
          <ArrowRight size={16} className="md:hidden" />
        </button>
      </div>
    </form>
  );
}

export default TableSearchForm;
