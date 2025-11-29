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
      <DialogTrigger>
        <div className="text-xs flex items-center gap-2 p-1 bg-blue-200 w-fit rounded shadow ms-2">
          Open Images <ZoomIn size={17} />{" "}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
