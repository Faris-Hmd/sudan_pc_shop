export async function generateStaticParams() {
  return categories.map((category) => {
    return { category };
  });
}
export const revalidate = 15; // revalidate at most every 15 seconds
import { getProducts } from "@/app/data/products";
import SearchForm from "../../../comp/SearchForm";
import { categories } from "../../../data/categories";
import ProductGridCustomData from "../../../comp/ProductGridOneFile";
async function page({ params }) {
  const { category } = await params;
  const products = await getProducts("p_cat", category);

  return (
    <>
      <SearchForm />
      <ProductGridCustomData products={products} />
    </>
  );
}

export default page;
