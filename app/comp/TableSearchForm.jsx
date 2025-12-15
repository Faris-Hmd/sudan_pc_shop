"use client";
import { DeleteIcon, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// Ensure these components are styled well with Tailwind in your project
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../data/categories";

// Mock categories data for demonstration, replace with your actual data source

function TableSearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  // --- LOGIC UNCHANGED ---
  function handleCatOnchange(cat) {
    replace(`${pathname}?key=p_cat&value=${cat.toString()}`);
  }

  // Note: handleOnchange function was commented out in the input field in the original code,
  // so it is kept here but not actively used in the provided JSX.
  /*
  function handleOnchange(event) {
    // ... original logic ...
  }
  */

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    if (values.p_name.trim() !== "") {
      params.set("p_name", event.target[1].value);
    } else {
      params.delete("p_name");
    }
    replace(`${pathname}?key=p_name&value=${params.get("p_name")}`);
  }
  // --- END LOGIC UNCHANGED ---

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      name="searchform"
      // Added modern styling for the form container: flex layout, gap, rounded corners, shadow, border
      className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-200 w-full md:w-auto"
    >
      {/* Clear Search Button */}
      <button
        type="button"
        onClick={() => {
          // Logic for clearing search remains unchanged
          replace(`${pathname}`);
        }}
        // Styled button for clear icon
        className="text-gray-400 hover:text-red-500 transition duration-150"
        title="Clear Search Parameters"
      >
        {searchParams.get("key") && (
          <DeleteIcon size={18} className="cursor-pointer" />
        )}
      </button>

      {/* Search Input Field */}
      <input
        // onChange={(e) => handleOnchange(e)} // Kept as commented out in original
        required
        type="text"
        name="p_name"
        placeholder="Enter product name"
        defaultValue={
          // Logic for default value remains unchanged
          searchParams.get("key") === "p_name"
            ? searchParams.get("value")
            : "" || ""
        }
        // Styled input field: clean, focus ring, no default border (handled by form container border)
        className="p-2 border-none focus:ring-0 focus:outline-none w-full text-sm"
      />

      {/* Category Select Dropdown */}
      <Select
        defaultValue={
          // Logic for default value remains unchanged
          searchParams.get("key") === "p_cat"
            ? searchParams.get("value")
            : "" || ""
        }
        name="search_word"
        onValueChange={(e) => handleCatOnchange(e)} // Logic unchanged
      >
        <SelectTrigger className="w-[180px] text-sm">
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
            // Logic for no categories found remains unchanged
            <SelectItem value="no-categories" disabled>
              No categories found
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Submit Button */}
      <button
        type="submit"
        value="Search"
        // Styled submit button: primary color, rounded, hover effects, flex layout
        className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out text-sm"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
}

export default TableSearchForm;
