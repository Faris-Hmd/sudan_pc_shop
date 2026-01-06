"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProductType } from "@/types/productsTypes";
import QuickAddBtn from "./quickAddBtn";

export default function ProductsCarousel({ products }: { products: ProductType[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  // Define plugin but don't activate yet
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);

    // DISABLE autoplay on mobile devices (less than 768px)
    if (window.innerWidth < 768) {
      plugin.current.stop();
    }
  }, [api, onSelect]);

  return (
    <div className="w-full bg-white dark:bg-[#0a0c12] pb-4">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[22vh] md:h-[60vh] w-full flex items-center overflow-hidden">
        
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10">
          <div className="md:hidden absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900 dark:to-[#0a0c12]" />

          <div className="hidden md:block absolute inset-0">
            {products?.slice(0, 5).map((prod, idx) => (
              <div
                key={`bg-${prod.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  idx === activeIndex ? "opacity-30 dark:opacity-20" : "opacity-0"
                }`}
              >
                <Image
                  src={prod.p_imgs[0].url}
                  alt="bg"
                  fill
                  priority={idx === 0}
                  className="object-cover transition-transform duration-[8000ms] scale-110"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0c12] via-transparent to-transparent z-10" />
        </div>

        {/* HERO TEXT */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-6">
          <div className="bg-blue-600/10 dark:bg-blue-500/10 w-fit px-2 py-0.5 rounded-full border border-blue-600/20 mb-2 md:mb-4">
            <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
              <Tag size={9} />
              <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest">Featured</span>
            </div>
          </div>
          <h1 className="text-2xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] uppercase tracking-tighter">
            Featured <span className="text-blue-600">Deals</span>
            <br />
            <span className="hidden md:block text-slate-400 dark:text-slate-600 md:text-6xl">Hardware Deals</span>
          </h1>
        </div>
      </div>

      {/* --- CAROUSEL --- */}
      <div className="relative z-30 -mt-2 md:-mt-20 max-w-7xl mx-auto px-3 md:px-4">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          className="w-full"
        >
          {/* Smaller Controls */}
          <div className="flex justify-end items-center gap-1.5 mb-2 px-1">
            <CarouselPrevious className="static translate-y-0 bg-slate-100 dark:bg-white/5 border-none h-7 w-7 md:h-10 md:w-10" />
            <CarouselNext className="static translate-y-0 bg-slate-100 dark:bg-white/5 border-none h-7 w-7 md:h-10 md:w-10" />
          </div>

          <CarouselContent className="-ml-2 md:-ml-4">
            {products?.map((prod, index) => (
              <CarouselItem
                key={prod.id}
                className="pl-2 basis-[65%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div 
                  className={`group rounded-[1.2rem] md:rounded-[3rem] p-2 md:p-4 transition-all duration-300 border ${
                    index === activeIndex 
                    ? "bg-white dark:bg-[#161b26] border-blue-500/40 shadow-md" 
                    : "bg-slate-50/20 dark:bg-[#11141d] border-transparent"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[1rem] md:rounded-[2.5rem] bg-slate-100 dark:bg-[#0d0f14]">
                    <Link href={`/products/${prod.id}`}>
                      <Image
                        className="object-cover md:transition-transform md:duration-700 md:group-hover:scale-110"
                        fill
                        sizes="(max-width: 768px) 40vw, 25vw"
                        src={prod.p_imgs[0].url}
                        alt={prod.p_name}
                      />
                    </Link>
                  </div>

                  {/* Details */}
                  <div className="mt-2 px-1">
                    <span className="text-[7px] md:text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                      {prod.p_cat}
                    </span>
                    <h3 className="text-slate-800 dark:text-white font-bold text-[11px] md:text-base leading-tight line-clamp-1">
                      {prod.p_name}
                    </h3>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-2 flex items-center justify-between bg-white dark:bg-[#0d0f14] p-1 pl-2.5 rounded-full border border-slate-100 dark:border-white/5">
                    <span className="text-slate-900 dark:text-white font-black text-[10px] md:text-base">
                      {Number(prod.p_cost).toLocaleString()}
                      <span className="text-[6px] ml-0.5 text-slate-400">SDG</span>
                    </span>
                    <QuickAddBtn product={prod} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}