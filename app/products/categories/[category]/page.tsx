export async function generateStaticParams() {
  return categories.map((category) => {
    return { category };
  });
}
export const revalidate = 15; // revalidate at most every 15 seconds
import { getProducts } from "@/data/products";
import SearchForm from "@/components/SearchForm";
import { categories } from "@/data/categories";
import ProductGrid from "@/components/ProductGrid";
async function page({ params }: { params: { category: string } }) {
  const { category } = await params;
  const products = await getProducts("p_cat", category);

  return (
    <>
      <SearchForm />
      <ProductGrid products={products} />
    </>
  );
}

export default page;
