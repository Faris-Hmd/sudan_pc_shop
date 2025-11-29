"use client";
import { DeleteIcon, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../data/categories";
function TableSearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  function handleCatOnchange(cat) {
    replace(`${pathname}?key=p_cat&value=${cat.toString()}`);
  }
  function handleOnchange(event) {
    event.preventDefault();
    if (event.target.value.trim() !== "") {
      params.set("search_word", event.target.value);
    } else {
      params.delete("search_word");
    }
    replace(`${pathname}?p_name=${params.toString()}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());
    if (values.p_name.trim() !== "") {
      //   console.log("if true");
      params.set("p_name", event.target[1].value);
    } else {
      params.delete("p_name");
    }
    replace(`${pathname}?key=p_name&value=${params.get("p_name")}`);
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      name="searchform"
      className="searchform bg-white"
    >
      <button
        type="button"
        onClick={() => {
          replace(`${pathname}`);
        }}
      >
        {searchParams.get("key") && (
          <DeleteIcon size={16} className="text-red-300 cursor-pointer ms-2" />
        )}
      </button>
      <input
        // onChange={(e) => handleOnchange(e)}
        required
        type="text"
        name="p_name"
        placeholder="Enter product name"
        defaultValue={
          searchParams.get("key") === "p_neme"
            ? searchParams.get("value")
            : "" || ""
        }
      />

      <Select
        defaultValue={
          searchParams.get("key") === "p_cat"
            ? searchParams.get("value")
            : "" || ""
        }
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
      <button
        type="submit"
        value="Search"
        className="flex items-center submitBtn"
      >
        <Search size={18} /> Search
      </button>
    </form>
  );
}
export default TableSearchForm;
