import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function ProductsCarousel({ products }: any) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full m-auto p-3"
    >
      <CarouselContent>
        {products?.map((prod: any, index: any) => (
          <CarouselItem key={index} className="relative md:basis-1/3">
            <div className=" w-full flex flex-col items-start gap-2 bg-white m-auto my-1 shadow  rounded overflow-hidden ">
              <Link href={`/products/${prod.id}`} className="relative w-full">
                <div className="h-60 w-full ms-auto  relative">
                  <Image
                    className="object-cover"
                    sizes="100"
                    fill
                    src={prod.p_imgs[0].url}
                    alt="Product Image"
                  />
                </div>
                <div className="p-3 absolute backdrop-blur-sm w-full bottom-0  bg-[#0004]  font-semibold">
                  <div className="text-white ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </div>
                  <span className="text-[11px]  text-green-600">
                    {prod.p_cost} SDG
                  </span>
                  <span className="text-[11px] text-white">| {prod.p_cat}</span>
                </div>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ms-16" />
      <CarouselNext className="me-16" />
    </Carousel>
  );
}
