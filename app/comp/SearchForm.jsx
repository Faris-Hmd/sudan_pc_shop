"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleOnchange(event) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (event.target.value.trim() !== "") {
      params.set("search_word", event.target.value);
    } else {
      params.delete("search_word");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
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
