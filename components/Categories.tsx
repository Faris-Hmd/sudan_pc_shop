import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Shop by Category
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Find exactly what you need for your setup.
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {categories.map((cat) => {
            const imageUrl = `https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/icons/${cat}.png`;
            const label = cat.replace(/_/g, " ");

            return (
              <Link
                key={cat}
                href={`/products/categories/${cat}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 hover:-translate-y-1"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  <div className="relative w-10 h-10 md:w-12 md:h-12">
                    <Image
                      src={imageUrl}
                      alt={label}
                      fill
                      className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                <span className="text-xs md:text-sm font-bold text-slate-600 text-center uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
