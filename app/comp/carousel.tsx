"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ProductImgCarousel({ imgs }: any) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-xs w-full">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent className="w-full">
          {imgs.map(
            (img: { url: string }, index: React.Key | null | undefined) => (
              <CarouselItem className="h-60 w-full" key={index}>
                <Image fill src={img.url} alt={`Product Image ${img.url}`} />
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="text-muted-foreground py-2 text-center text-sm">
        picture {current} of {count}
      </div>
    </div>
  );
}
