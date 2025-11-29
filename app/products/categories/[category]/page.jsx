import { getProducts } from "@/app/data/products";
import SearchForm from "../../../comp/SearchForm";
import ProductsList from "../../../comp/productsList";

async function page({ params }) {
  const { category } = await params;
  const products = await getProducts("p_cat", category);

  return (
    <>
      <SearchForm />
      <ProductsList products={products} />
    </>
  );
}

export default page;
