"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { ProductType } from "@/types/productsTypes";
import QuickAddBtn from "./quickAddBtn";

export default function ProductsCarousel({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <div className="w-full max-w-7xl mx-auto px-2">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <div className="flex justify-between items-end mb-6 md:mb-10 px-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Tag size={16} className="animate-pulse md:w-[18px] md:h-[18px]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Priority List</span>
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Featured Deals
            </h2>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm" />
            <CarouselNext className="static translate-y-0 h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 transition-all shadow-sm" />
          </div>
        </div>

        <CarouselContent className="-ml-2 md:-ml-4">
          {products?.map((prod, index) => (
            <CarouselItem
              key={prod.id || index}
              className="pl-2 md:pl-4 basis-[55%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="group h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-900/10 hover:border-blue-100 dark:hover:border-blue-900 flex flex-col">
                <Link href={`/products/${prod.id}`} className="block relative aspect-[16/11] overflow-hidden bg-slate-50 dark:bg-slate-800/50">
                  <Image
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    fill
                    src={prod.p_imgs[0].url}
                    alt={prod.p_name}
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="flex items-center gap-1 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg shadow-blue-600/20">
                      HOT
                    </span>
                  </div>
                </Link>

                <div className="p-3 flex flex-col flex-1 gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">
                      {prod.p_cat}
                    </span>
                    <h3 className="text-slate-800 dark:text-slate-100 font-bold text-[13px] leading-tight line-clamp-2 min-h-[2rem] group-hover:text-blue-600 transition-colors">
                      {prod.p_name}
                    </h3>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-2.5">
                    <div className="flex flex-col">
                      <span className="text-[15px] font-black text-slate-900 dark:text-white leading-none">
                        {Number(prod.p_cost).toLocaleString()}
                        <span className="text-[8px] ml-0.5 text-slate-400 font-bold uppercase">SDG</span>
                      </span>
                    </div>

                    {/* Always visible QuickAddBtn */}
                    <div className="flex-shrink-0">
                       <QuickAddBtn product={prod} />
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
