import ProductsCarousel from "../components/ProductsCarousel";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "@/services/productsServices";
export const revalidate = 15; // revalidate at most every hour
export const metadata = {
  title: "SPS | Home",
  description: "Home",
};

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Hero />
      
      <main className="container mx-auto px-2 md:px-6 py-12 space-y-5">
        <section id="shop" className="scroll-mt-24 space-y-5">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-1 bg-blue-600 rounded-full" />
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
              Featured Components
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium transition-colors">
              Upgrade your rig with our top-rated selections for performance and aesthetics.
            </p>
          </div>
          <ProductGrid products={products.slice(0, 6)} />
        </section>

        <section className="space-y-5">
           <ProductsCarousel products={products.filter((p) => p.isFeatured === true)} />
        </section>

        <Categories />
      </main>
    </>
  );
}
