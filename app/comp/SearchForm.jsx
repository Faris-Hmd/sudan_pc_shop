"use client";
import { DeleteIcon, Search, X } from "lucide-react";
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
    (cat) => {
      // Navigate to the new category path
      push(`/products/categories/${cat}`);
    },
    [push]
  );

  const handleInputChange = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  const handleReset = useCallback(() => {
    // Clear local state and remove search param entirely
    setSearchValue("");
    const params = new URLSearchParams(searchParams);
    params.delete("search_word");
    // Stay on the current page but update the URL
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, replace, searchParams]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const params = new URLSearchParams(searchParams);
      if (searchValue.trim() !== "") {
        params.set("search_word", searchValue.trim());
      } else {
        params.delete("search_word");
      }

      // Always navigate to the base products page with updated params on submit
      // This ensures search applies globally, not just within a specific category route
      replace(`/products?${params.toString()}`);
    },
    [searchValue, searchParams, replace]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 p-2 border rounded-lg shadow-sm w-full max-w-lg mx-auto"
    >
      <div className="relative flex items-center flex-grow">
        <input
          type="text"
          name="search_word"
          placeholder="Enter product name"
          value={searchValue}
          onChange={handleInputChange}
          className="w-full pl-8 pr-2 py-1 border-none focus:ring-0 rounded-l-md"
        />
        {searchValue && (
          <button
            type="button" // Use type button to prevent form submission
            onClick={handleReset}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-600"
            aria-label="Clear search input"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <Select defaultValue={currentCategory} onValueChange={handleCatChange}>
        <SelectTrigger className="w-[150px] py-1 border-gray-300">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))
          ) : (
            <SelectItem key="no-categories" disabled>
              No categories found
            </SelectItem>
          )}
        </SelectContent>
      </Select>
      <button
        type="submit"
        className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
    </form>
  );
}

export default SearchForm;
