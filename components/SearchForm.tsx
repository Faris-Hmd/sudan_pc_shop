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
    searchParams.get("search_word") || "",
  );
  const currentCategory = pathname.split("/")[3] || "";

  useEffect(() => {
    setSearchValue(searchParams.get("search_word") || "");
  }, [searchParams]);

  const handleCatChange = useCallback(
    (cat: string) => {
      push(`/products/categories/${cat}`);
    },
    [push],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [],
  );

  const handleReset = useCallback(() => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("search_word");
    replace(`${pathname}?${params.toString()}` as any);
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
      replace(`/products?${params.toString()}` as any);
    },
    [searchValue, searchParams, replace],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 p-2 rounded-xl bg-card border border-border shadow-xl shadow-primary/5 w-full max-w-3xl mx-auto focus-within:ring-4 focus-within:ring-primary/5 transition-all duration-300"
    >
      <div className="relative flex items-center grow w-full">
        <div className="absolute left-4 p-1.5 bg-muted rounded-lg text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          name="search_word"
          placeholder="Search for components..."
          value={searchValue}
          onChange={handleInputChange}
          className="w-full pl-14 pr-10 py-3 text-sm font-semibold border-none focus:ring-0 rounded-xl outline-none placeholder:text-muted-foreground text-foreground bg-transparent"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-3 p-1 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="hidden sm:block h-8 w-px bg-border" />

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select value={currentCategory} onValueChange={handleCatChange}>
          <SelectTrigger className="w-full sm:w-[160px] border-none bg-muted font-bold text-muted-foreground rounded-xl focus:ring-0 h-11 text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} />
              <SelectValue placeholder="Categories" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-border shadow-2xl bg-card">
            <SelectItem value="all" className="font-bold text-[10px]">
              ALL CATEGORIES
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem
                key={cat}
                value={cat}
                className="font-bold text-[10px] uppercase"
              >
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
