import {
  getProductsIds,
  getProduct,
  getProducts,
} from "@/services/productsServices";
import ProductImgCarousel from "@/components/carousel";
import ProductGrid from "@/components/ProductGrid";
import CartBtn from "./components/cartBtn";
import { ChevronLeft, Info, Package, ShieldCheck } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return await getProductsIds();
}

export const revalidate = 15;
export const metadata = {
  title: `SPS | Product Detail`,
  description: "Product technical details and specifications",
};

export default async function ProductsDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProduct(id);
  const prodSameCate = await getProducts("p_cat", product?.p_cat, 7);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Package size={48} className="text-muted-foreground/30" />
        <h1 className="text-xl font-black text-foreground uppercase tracking-tighter">
          Product not found
        </h1>
        <Link
          href="/products"
          className="text-xs font-bold text-primary uppercase underline"
        >
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors pb-20">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <Link
          href={("/products/categories/" + product?.p_cat) as any}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Back to Catalog
          </span>
        </Link>
      </div>

      <div className="container mx-auto px-0 md:px-6 max-w-7xl">
        {/* Main Product Card */}
        <div className="bg-card md:rounded-[2.5rem] shadow-2xl shadow-primary/5 border-y md:border border-border overflow-hidden transition-all">
          <div className="grid md:grid-cols-2">
            {/* Left: Interactive Gallery */}
            <div className="relative bg-card flex items-center justify-center border-b md:border-b-0 md:border-r border-border">
              <div className="w-full h-full">
                <ProductImgCarousel
                  imgH={"h-[400px] md:h-[550px]"}
                  imgs={product.p_imgs}
                  imgFill={"object-cover p-4 md:p-12"}
                />
              </div>
              <div className="absolute top-6 left-6 hidden md:block">
                <span className="px-3 py-1 text-[9px] font-black text-info bg-info/10 rounded-full uppercase tracking-tighter">
                  Official Hardware
                </span>
              </div>
            </div>

            {/* Right: Technical Details */}
            <div className="p-6 md:p-12 flex flex-col">
              <div className="flex-1 space-y-8">
                {/* Product Meta */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-[9px] font-black text-primary-foreground bg-primary rounded-md uppercase tracking-widest">
                      {product.p_cat}
                    </span>
                    <div className="h-[1px] w-8 bg-border" />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      SKU: {id.slice(0, 8)}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight uppercase tracking-tighter">
                    {product.p_name}
                  </h1>

                  <div className="flex items-center gap-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-primary tracking-tighter">
                        {Number(product.p_cost).toLocaleString()}
                      </span>
                      <span className="text-xs font-black text-muted-foreground uppercase">
                        SDG
                      </span>
                    </div>
                  </div>
                </div>

                {/* Structured Specs */}
                <div className="grid grid-cols-2 gap-3 py-6 border-y border-border">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                      Status
                    </p>
                    <div className="flex items-center gap-1.5 text-success">
                      <ShieldCheck size={14} />
                      <span className="text-xs font-bold uppercase tracking-tight">
                        In Stock
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                      Delivery
                    </p>
                    <div className="flex items-center gap-1.5 text-foreground/80">
                      <Package size={14} />
                      <span className="text-xs font-bold uppercase tracking-tight">
                        Fast Shipping
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description Text */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-foreground">
                    <Info size={14} className="text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest">
                      Technical Overview
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    {product.p_details}
                  </p>
                </div>
              </div>

              {/* Action Area */}
              <div className="mt-12">
                <CartBtn product={{ ...product, id } as any} />
                <p className="text-[8px] text-center mt-4 text-muted-foreground font-bold uppercase tracking-[0.2em]">
                  Secure Transaction • Verified SPS Hardware
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Feed */}
        <div className="mt-16 space-y-8 px-4 md:px-0">
          <div className="flex items-end justify-between border-b border-border pb-4">
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">
                Related Assets
              </p>
              <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">
                Similar Products
              </h3>
            </div>
            <Link
              href={("/products/categories/" + product?.p_cat) as any}
              className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={prodSameCate} />
        </div>
      </div>
    </div>
  );
}
