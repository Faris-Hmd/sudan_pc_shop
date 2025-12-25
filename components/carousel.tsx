"use client";

import * as React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import CarouselDial from "./CarouselDial";

interface ProductImage {
  url: string;
}

interface ProductImgCarouselProps {
  imgs: ProductImage[];
  handleRemove?: (url: string) => void;
  imgFill?: string;
  imgH?: string;
}

export default function ProductImgCarousel({
  imgs,
  handleRemove,
  imgFill = "object-cover",
  imgH = "h-64",
}: ProductImgCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="relative group w-full">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {imgs.map((img, index) => (
            <CarouselItem key={`${img.url}-${index}`} className="relative">
              <div
                className={`${imgH} w-full relative overflow-hidden rounded-lg`}
              >
                <Image
                  className={imgFill}
                  fill
                  src={img.url}
                  alt={`Product View ${index + 1}`}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Important: Ensure this button has a high z-index and pointer-events-auto */}
                {handleRemove && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents carousel from sliding when clicking delete
                      handleRemove(img.url);
                    }}
                    className="absolute top-3 right-3 z-50 pointer-events-auto flex items-center gap-2 px-3 py-1.5 
                             bg-white/90 backdrop-blur-md text-red-600 border border-red-200
                             rounded-full text-xs font-bold shadow-md hover:bg-white 
                             hover:text-red-700 transition-all active:scale-90"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                )}

                {imgH !== "h-150" && <CarouselDial imgs={imgs} />}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Improved Navigation placement */}
        <div className="flex items-center">
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 " />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 " />
        </div>
      </Carousel>

      {/* Pagination Counter */}
      <div className="mt-2 flex justify-center items-center gap-2 text-xs font-medium text-slate-500">
        <span className="px-2 py-0.5 bg-slate-100 rounded-full">
          {current} / {imgs.length}
        </span>
      </div>
    </div>
  );
}
