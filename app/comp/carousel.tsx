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
import { Search, Trash2, ZoomIn } from "lucide-react";
import CarouselDial from "./CarouselDial";

export default function ProductImgCarousel({
  imgs,
  handleRemove,
  imgFill,
  imgH,
}: any) {
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
    <>
      <Carousel setApi={setApi} className="">
        <CarouselContent className="m-auto">
          {imgs.length > 0 &&
            imgs?.map(
              (img: { url: string }, index: React.Key | null | undefined) => (
                <CarouselItem
                  className={`${imgH} w-full  relative`}
                  key={index}
                >
                  <Image
                    className={imgFill}
                    fill
                    src={img.url}
                    alt={`Product Image ${img.url}`}
                  />

                  {imgH !== "h-150" && <CarouselDial imgs={imgs} />}
                  {handleRemove && (
                    <button
                      type="button"
                      onDoubleClick={() =>
                        handleRemove && handleRemove(img.url)
                      }
                      className=" cursor-pointer text-red-700 bg-white rounded-2xl opacity-60 gap-2 absolute top-1 right-1 flex items-center p-2  backdrop-blur-3xl hover:opacity-100"
                    >
                      <Trash2 size={17} /> Remove
                    </button>
                  )}
                </CarouselItem>
              )
            )}
        </CarouselContent>
        <CarouselPrevious className="ms-12" type="button" />
        <CarouselNext className="me-12" type="button" />
      </Carousel>

      <div className="text-muted-foreground py-2 text-center text-sm">
        {!handleRemove && (
          <>
            picture {current} of {imgs.length}
          </>
        )}
      </div>
    </>
  );
}
