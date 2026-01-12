"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, ChevronRight, ChevronLeft } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProductType } from "@/types/productsTypes";
import QuickAddBtn from "./quickAddBtn";
import { cn } from "@/lib/utils";

export default function ProductsCarousel({
  products,
}: {
  products: ProductType[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
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

  if (!products || products.length === 0) return null;

  return (
    <section className="relative py-8 md:py-16 overflow-hidden bg-muted/20 border border-border rounded-sm">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:mb-2">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20">
              <Zap size={12} className="text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                High Performance
              </span>
            </div>
            <h2 className="text-2xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-[0.85]">
              Featured
              <span className="text-primary italic">Hardware</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => api?.scrollPrev()}
                className="w-10 h-10 border border-border flex items-center justify-center hover:bg-card hover:border-primary transition-all active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 border border-border flex items-center justify-center hover:bg-card hover:border-primary transition-all active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="h-10 w-[1px] bg-border hidden md:block" />
          </div>
        </div>

        {/* Carousel Component */}
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-6">
            {products.map((product, idx) => (
              <CarouselItem
                key={product.id}
                className="pl-3 md:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <div
                  className={cn(
                    "group relative bg-card border border-border rounded-sm p-3 md:p-5 transition-all duration-500",
                    idx === activeIndex
                      ? "border-primary shadow-xl shadow-primary/5"
                      : "hover:border-primary/50",
                  )}
                >
                  {/* Product Media */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted mb-4 md:mb-6">
                    <Link
                      href={`/products/${product.id}`}
                      className="block h-full"
                    >
                      <Image
                        src={product.p_imgs[0].url}
                        alt={product.p_name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 bg-background/90 backdrop-blur-sm border rounded-xl border-border text-[9px] font-black text-primary uppercase tracking-widest">
                        {product.p_cat}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="space">
                    <div className="">
                      <h3 className="text-base md:text-xl font-black text-foreground leading-tight line-clamp-2 uppercase tracking-tight">
                        {product.p_name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-60">
                          Hardware Value
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl md:text-2xl font-black text-foreground tracking-tighter">
                            {Number(product.p_cost).toLocaleString()}
                          </span>
                          <span className="text-[10px] font-black text-primary uppercase">
                            SDG
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 scale-90 md:scale-100 origin-right">
                        <QuickAddBtn product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
