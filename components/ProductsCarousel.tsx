"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Sparkles } from "lucide-react";
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
  }, [api, onSelect]);

  return (
    <div className="w-full bg-white dark:bg-[#0a0c12] transition-colors duration-700 pb-10">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[40vh] md:h-[60vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {products?.map((prod, idx) => (
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
                className={`object-cover transition-transform duration-[8000ms] ${
                  idx === activeIndex ? "scale-110" : "scale-100"
                }`}
              />
            </div>
          ))}
          {/* Theme-aware Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0c12] via-transparent to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 dark:from-[#0a0c12]/80 via-transparent to-transparent z-10" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
          <div className="bg-blue-600/10 dark:bg-blue-500/10 w-fit px-3 py-1 rounded-full border border-blue-600/20 mb-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Tag size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Priority List</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.9] uppercase tracking-tighter">
            Featured <span className="text-blue-600">Deals</span>
            <br />
            <span className="text-slate-400 dark:text-slate-600 text-2xl md:text-6xl">Hardware Deals</span>
          </h1>
        </div>
      </div>

      {/* --- COMPACT ROUNDED CAROUSEL --- */}
      <div className="relative z-30 -mt-10 md:-mt-20 max-w-7xl mx-auto px-4">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.play()}
          className="w-full"
        >
          <div className="flex justify-end items-center gap-2 mb-6 px-2">
             <CarouselPrevious className="static translate-y-0 bg-slate-100 dark:bg-white/5 border-none text-slate-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all h-10 w-10 shadow-sm" />
             <CarouselNext className="static translate-y-0 bg-slate-100 dark:bg-white/5 border-none text-slate-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all h-10 w-10 shadow-sm" />
          </div>

          <CarouselContent className="-ml-4">
            {products?.map((prod, index) => (
              <CarouselItem
                key={prod.id}
                className="pl-4 basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div 
                  className={`group relative rounded-[3rem] p-4 transition-all duration-500 border ${
                    index === activeIndex 
                    ? "bg-white dark:bg-[#161b26] border-blue-500/40  dark:border-blue-500/40 ring-1 ring-blue-500/10" 
                    : "bg-slate-50/50 dark:bg-[#11141d] border-slate-200 dark:border-white/5"
                  }`}
                >
                  {/* Rounded Image Container */}
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem]  dark:bg-[#0d0f14] border border-slate-100 dark:border-none shadow-inner">
                    <Link href={`/products/${prod.id}`}>
                      <Image
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        fill
                        src={prod.p_imgs[0].url}
                        alt={prod.p_name}
                      />
                    </Link>
                  </div>

                  {/* Info Section */}
                  <div className="mt-4 px-2">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-500 uppercase tracking-widest">
                      {prod.p_cat}
                    </span>
                    <h3 className="text-slate-800 dark:text-white font-bold text-sm md:text-base leading-tight line-clamp-1 mt-1">
                      {prod.p_name}
                    </h3>
                  </div>

                  {/* Action Pill Bar */}
                  <div className="mt-4 flex items-center justify-between  bg-white dark:bg-[#0d0f14] p-1.5 pl-4 rounded-full border border-slate-200 dark:border-white/5 shadow-sm">
                    <div className="flex flex-col">
                      <span className="text-slate-900 dark:text-white font-black text-sm md:text-base tracking-tighter">
                        {Number(prod.p_cost).toLocaleString()}
                        <span className="text-[8px] ml-1 text-slate-400 dark:text-slate-500">SDG</span>
                      </span>
                    </div>
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