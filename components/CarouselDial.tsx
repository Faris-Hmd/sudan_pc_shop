"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductImgCarousel from "@/components/carousel";
import { ZoomIn } from "lucide-react";

// Define a strict interface for the image objects
interface ProductImage {
  url: string;
  alt?: string; // Good practice for accessibility
}

interface CarouselDialProps {
  imgs: ProductImage[];
}

export default function CarouselDial({ imgs }: CarouselDialProps) {
  return (
    <Dialog>
      <DialogTrigger
        className="absolute top-2 left-2 flex items-center justify-center p-2 bg-white/80 hover:bg-white rounded-full shadow-sm backdrop-blur-md transition-all cursor-pointer z-10"
        aria-label="Zoom product images"
      >
        <ZoomIn size={18} className="text-gray-700" />
      </DialogTrigger>

      {/* aria-describedby={undefined} is standard for Dialogs with no description text */}
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-2xl border-none bg-transparent shadow-none p-0"
      >
        <DialogTitle className="sr-only">Product Images Gallery</DialogTitle>

        <div className="relative w-full max-h-[80vh]">
          <ProductImgCarousel
            // Use standard Tailwind scale or a custom bracket value
            imgH="h-[400px] md:h-[600px]"
            imgs={imgs}
            imgFill="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
