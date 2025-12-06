import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductImgCarousel from "@/app/comp/carousel";
import { ZoomIn } from "lucide-react";

export default function CarouselDial({ imgs }) {
  return (
    <Dialog>
      <DialogTrigger className=" cursor-pointer  bg-white rounded-full opacity-80  absolute top-1 left-1 flex items-center justify-center p-2  backdrop-blur-3xl hover:opacity-100">
        <ZoomIn size={17} />{" "}
      </DialogTrigger>
      <DialogContent aria-describedby="" className="sm:max-w-[425px]">
        <DialogTitle>product images</DialogTitle>
        <ProductImgCarousel
          imgH={"h-150"}
          imgs={imgs}
          imgFill={"object-contain"}
        />
      </DialogContent>
    </Dialog>
  );
}
