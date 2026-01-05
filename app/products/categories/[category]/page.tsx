export async function generateStaticParams() {
  return categories.map((category) => {
    return { category };
  });
}
export const revalidate = 15; // revalidate at most every 15 seconds
import SearchForm from "@/components/SearchForm";
import { categories } from "@/data/categories";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/services/productsServices";
async function page({ params }: { params: { category: string } }) {
  const { category } = await params;
  const products = await getProducts("p_cat", category);

  return (
    <div className="px-2">
      <SearchForm />
      <ProductGrid products={products}   showSort={true} />
    </div>
  );
}

export default page;
