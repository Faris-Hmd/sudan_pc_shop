import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; // Example of an icon for a button
import { ProductType } from "@/types/productsTypes";

export default function ProductsCarousel({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      // Added max-w-7xl for better layout on large screens
      className="w-full max-w-7xl m-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="flex justify-between items-center my-6">
        <h2
          id="shop"
          className="text-3xl font-extrabold text-gray-900" // Darker text for better contrast
        >
          Offers and Discounts
        </h2>
        {/* Added navigation controls to the header */}
        <div className="flex space-x-4">
          <CarouselPrevious className="static transform-none ms-0 text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400" />
          <CarouselNext className="static transform-none me-0 text-gray-600 hover:text-gray-900 border-gray-300 hover:border-gray-400" />
        </div>
      </div>

      <CarouselContent className="mx-auto">
        {products?.map((prod, index: any) => (
          <CarouselItem
            key={index}
            className="md:basis-1/3 lg:basis-1/4 p-2 mx-auto"
          >
            <div className="w-full flex flex-col bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
              <Link href={`/products/${prod.id}`}>
                <div className="relative h-56 w-full">
                  {" "}
                  {/* Fixed height for consistent card size */}
                  <Image
                    className="object-cover"
                    sizes="100"
                    fill
                    src={prod.p_imgs[0].url}
                    alt="Product Image"
                  />
                  {/* Optional: Add a discount badge */}
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    20% Off
                  </span>
                </div>

                <div className="p-4">
                  {/* Product Title - use `prod.p_name` for a title if available */}
                  <h3 className="text-gray-800 font-semibold text-lg truncate mb-1">
                    {prod.p_name}
                  </h3>

                  {/* Product Description - replace 'Lorem ipsum...' with actual product description if you have one */}
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {/* Your original description was long; keep it brief */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-400">
                        {prod.p_cat}
                      </span>
                      <span className="text-xl font-bold text-green-700">
                        {prod.p_cost} SDG
                      </span>
                    </div>

                    {/* Optional: Add a "Shop Now" link or button */}
                    <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                      Shop Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Navigation buttons were moved to the header div */}
    </Carousel>
  );
}
