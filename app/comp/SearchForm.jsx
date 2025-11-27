"use client";
import { DeleteIcon, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  function handleCatOnchange(cat) {
    replace(`${pathname}?search_word=${cat.toString()}`);
  }
  function handleOnchange(event) {
    event.preventDefault();
    if (event.target.value.trim() !== "") {
      params.set("search_word", event.target.value);
    } else {
      params.delete("search_word");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    if (values.search_word.trim() !== "") {
      console.log("if true");
      params.set("search_word", event.target[0].value);
    } else {
      params.delete("search_word");
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      name="searchform"
      className="searchform"
    >
      <input
        // onChange={(e) => handleOnchange(e)}
        required
        type="text"
        name="search_word"
        placeholder="Enter product name"
        defaultValue={searchParams.get("search_word") || ""}
      />
      <button
        type="button"
        onClick={() => {
          params.delete("search_word");
          replace(`${pathname}?${params.toString()}`);
        }}
      >
        {searchParams.get("search_word") && (
          <DeleteIcon size={16} className="text-red-300 cursor-pointer" />
        )}
      </button>
      <Select
        defaultValue={searchParams.get("search_word") || ""}
        name="search_word"
        onValueChange={(e) => handleCatOnchange(e)}
      >
        <SelectTrigger className="w-full ">
          <SelectValue placeholder="Categpries" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))
          ) : (
            <option key={"no"} disabled>
              No categories found
            </option>
          )}
        </SelectContent>
      </Select>
      <div className="flex items-center submitBtn">
        <Search size={18} />{" "}
        <button type="submit" value="Search" id="" className="">
          Search
        </button>
      </div>
    </form>
  );
}
export default SearchForm;
