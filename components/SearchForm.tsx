"use client";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../data/categories";

function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search_word") || ""
  );
  const currentCategory = pathname.split("/")[3] || "";

  useEffect(() => {
    setSearchValue(searchParams.get("search_word") || "");
  }, [searchParams]);

  const handleCatChange = useCallback(
    (cat: string) => {
      push(`/products/categories/${cat}`);
    },
    [push]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const handleReset = useCallback(() => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("search_word");
    replace(`${pathname}?${params.toString()}` as any) ;
  }, [pathname, replace, searchParams]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const params = new URLSearchParams(searchParams);
      if (searchValue.trim() !== "") {
        params.set("search_word", searchValue.trim());
      } else {
        params.delete("search_word");
      }
      replace(`/products?${params.toString()}` as any );
    },
    [searchValue, searchParams, replace]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="m-2 flex flex-col sm:flex-row items-center gap-3 p-2 rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none w-full max-w-3xl mx-auto focus-within:border-blue-400 dark:focus-within:border-blue-900 focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-300"
    >
      <div className="relative flex items-center grow w-full">
        <div className="absolute left-4 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          name="search_word"
          placeholder="Search for components, brands or categories..."
          value={searchValue}
          onChange={handleInputChange}
          className="w-full pl-14 pr-10 py-3 text-sm font-semibold border-none focus:ring-0 rounded-xl outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-700 dark:text-slate-100 bg-transparent"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-3 p-1 text-slate-300 dark:text-slate-700 hover:text-rose-500 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="hidden sm:block h-8 w-px bg-slate-100 dark:bg-slate-800" />

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select value={currentCategory} onValueChange={handleCatChange}>
          <SelectTrigger className="w-full sm:w-[160px] border-none bg-slate-50 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-400 rounded-xl focus:ring-0 h-11 text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} />
              <SelectValue placeholder="All Categories" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-100 dark:border-slate-800 shadow-2xl dark:bg-slate-900">
            <SelectItem value="all" className="font-bold text-xs">ALL CATEGORIES</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="font-bold text-xs uppercase">
                {cat.replace(/_/g, " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      
      </div>
    </form>
  );
}

export default SearchForm;
