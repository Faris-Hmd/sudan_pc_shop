"use client";
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
        placeholder="product"
        defaultValue={searchParams.get("search_word") || ""}
      />
      {/* <select name="search_opt" id="" required>
          <option value="p_name">Name</option>
          <option value="p_cat">category</option>
        </select> */}
      <input type="submit" value="Search" id="" className="pr-1 pl-1" />
    </form>
  );
}
export default SearchForm;
