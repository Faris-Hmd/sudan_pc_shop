"use client";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../data/categories"; // Assuming this path is correct

function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  // Use local state for the input value to manage it as a controlled input
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search_word") || ""
  );
  // Get current category from pathname
  const currentCategory = pathname.split("/")[3] || "";

  // Update local state when search params change externally (e.g., direct navigation)
  useEffect(() => {
    setSearchValue(searchParams.get("search_word") || "");
  }, [searchParams]);

  const handleCatChange = useCallback(
    (cat: string) => {
      // Navigate to the new category path
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
    // Clear local state and remove search param entirely
    setSearchValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("search_word");
    // Stay on the current page but update the URL
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

      // Always navigate to the base products page with updated params on submit
      // This ensures search applies globally, not just within a specific category route
      replace(`/products?${params.toString()}` as any );
    },
    [searchValue, searchParams, replace]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-1.5 border rounded-xl shadow-sm w-full max-w-2xl mx-auto bg-white"
    >
      <div className="relative flex items-center grow">
        <Search className="absolute left-3 text-gray-400" size={16} />
        <input
          type="text"
          name="search_word"
          placeholder="Search products..."
          value={searchValue}
          onChange={handleInputChange}
          className="w-full pl-10 pr-9 py-2 text-sm border-none focus:ring-0 rounded-l-md outline-none placeholder:text-gray-400"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-3 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Clear search input"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="h-6 w-px bg-gray-200" /> {/* Visual Separator */}
      <Select value={currentCategory} onValueChange={handleCatChange}>
        <SelectTrigger className="w-[140px] border-none shadow-none focus:ring-0 h-9 text-sm">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        type="submit"
        className="flex items-center justify-center h-9 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-sm"
        aria-label="Search"
      >
        <span className="hidden sm:inline mr-2 text-sm font-medium">
          Search
        </span>
        <Search size={16} />
      </button>
    </form>
  );
}

export default SearchForm;
