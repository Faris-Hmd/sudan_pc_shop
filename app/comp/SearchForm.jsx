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
  // console.log("pathname", pathname.split("/")[3]);

  function handleCatOnchange(cat) {
    replace(`/products/categories/${cat.toString()}`);
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
      params.set("search_word", event.target[1].value);
    } else {
      params.delete("search_word");
    }
    replace(`/products?${params.toString()}`);
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      name="searchform"
      className="searchform"
    >
      <button
        type="reset"
        onClick={() => {
          replace(`${pathname}`);
        }}
      >
        {searchParams.get("search_word") && (
          <Reset size={16} className="text-red-300 cursor-pointer ms-2" />
        )}
      </button>
      <input
        // onChange={(e) => handleOnchange(e)}
        required
        type="text"
        name="search_word"
        placeholder="Enter product name"
        defaultValue={searchParams.get("search_word") || ""}
      />

      <Select
        defaultValue={pathname.split("/")[3] || ""}
        name="search_word"
        onValueChange={(e) => handleCatOnchange(e)}
      >
        <SelectTrigger className="m-auto">
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
            <option key={"no"} disabled>
              No categories found
            </option>
          )}
        </SelectContent>
      </Select>
      <button type="submit" className="flex items-center submitBtn">
        <Search size={18} />{" "}
        <div type="submit" value="Search" id="" className="">
          Search
        </div>
      </button>
    </form>
  );
}
export default SearchForm;
