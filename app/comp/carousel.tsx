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

export default function ProductImgCarousel({ imgs, handleRemove }: any) {
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
    <div className="w-full ">
      <Carousel setApi={setApi} className="w-full  ">
        <CarouselContent className="w-full m-auto ">
          {imgs.length > 0 &&
            imgs?.map(
              (img: { url: string }, index: React.Key | null | undefined) => (
                <CarouselItem
                  onDoubleClick={() => handleRemove && handleRemove(img.url)}
                  className="h-60   w-full relative"
                  key={index}
                >
                  {/* <img src={img.url} alt="" /> */}
                  <Image fill src={img.url} alt={`Product Image ${img.url}`} />
                </CarouselItem>
              )
            )}
        </CarouselContent>
        <CarouselPrevious className="ms-12" />
        <CarouselNext className="me-12" />
      </Carousel>

      <div className="text-muted-foreground py-2 text-center text-sm">
        picture {current} of {imgs.length}
      </div>
    </div>
  );
}
