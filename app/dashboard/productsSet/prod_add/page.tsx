"use client";
import Link from "next/link";
import { categories } from "@/data/categories"; // Logic unchanged
import { Camera, CircleX, ImagePlus, Loader, Upload } from "lucide-react";
import { useState } from "react";
import ProductImgCarousel from "@/components/carousel"; // Logic unchanged
import { upload } from "@vercel/blob/client"; // Logic unchanged
import { toast } from "sonner"; // Logic unchanged
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductImage, ProductType } from "@/types/productsTypes";
import { addProduct } from "@/services/productsServices";

export default function ProductImgUplpad() {
  const [imgs, setImgs] = useState<ProductImage[]>([]);
  const [pending, setPending] = useState(false);
  function handleImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImgs: ProductImage[] = files.map((file) => ({
      url: URL.createObjectURL(file),
      productImgFile: file,
    }));

    setImgs((prev) => [...prev, ...newImgs]);
  }

  function handleRemove(imgUrl: string) {
    setImgs((prev) => prev.filter((img) => img.url !== imgUrl));
    URL.revokeObjectURL(imgUrl);
  }
  async function handleProductImgsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (imgs.length === 0) {
      return toast.error("Please add images!");
    }

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const uploadAndSubmit = async (): Promise<string> => {
      setPending(true);
      try {
        // 1. Parallel Upload
        // Assuming 'upload' is a typed function from a library like Vercel Blob
        const uploadTasks = imgs.map((img) =>
          upload(img.productImgFile?.name, img?.productImgFile, {
            access: "public",
            handleUploadUrl: "/api/uploadImgs",
          })
        );

        const blobs = await Promise.all(uploadTasks);
        const productImgsUrl = blobs.map((blob) => ({ url: blob.url }));

        // 2. Prepare and Send Data

        // Execute Server Action (Ensure product_add is typed to accept FormData)
        await addProduct({
          p_name: formData.get("p_name") as string,
          p_cat: formData.get("p_cat") as string,
          p_cost: formData.get("p_cost") as unknown as number,
          p_details: formData.get("p_details") as string,
          p_imgs: productImgsUrl ,
        });

        // 3. Cleanup
        imgs.forEach((img) => URL.revokeObjectURL(img.url)); // Cleanup memory
        setImgs([]);
        formElement.reset();

        return "Product added successfully!";
      } catch (error) {
        throw new Error("Failed to upload images or save product.");
      } finally {
        setPending(false);
      }
    };

    toast.promise(uploadAndSubmit(), {
      loading: "Uploading images and saving product...",
      success: (data: string) => data,
      error: (err: Error) => err.message,
    });
  }

  // --- END LOGIC UNCHANGED ---
  return (
    <div className="bg-transparent lg:min-h-screen p-2">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 flex justify-between items-center mb-6 shadow-sm border border-slate-100 dark:border-slate-800 rounded-lg p-4 max-w-2xl mx-auto transition-colors">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Add New Product</h3>
      </div>

      <form
        onSubmit={handleProductImgsSubmit}
        className="relative bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto transition-colors"
      >
        {/* Loading Overlay */}
        {pending && (
          <div className="z-50 cursor-wait w-full h-full backdrop-blur-[2px] absolute top-0 left-0 bg-white/60 dark:bg-slate-900/60 flex flex-col items-center justify-center rounded-xl transition-all">
            <Loader className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-400" />
            <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">Processing...</p>
          </div>
        )}

        {/* Image Section */}
        <div className="mb-6">
          <div className="relative group">
            {imgs.length > 0 ? (
              <ProductImgCarousel
                imgH={"h-56 rounded-xl shadow-inner"}
                imgFill={"object-cover"}
                handleRemove={handleRemove}
                imgs={imgs}
              />
            ) : (
              <div className="h-64 w-full bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 transition-colors">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-md mb-3 border border-slate-100 dark:border-slate-800">
                  <ImagePlus size={40} className="text-slate-400 dark:text-slate-600" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-bold">No product images</p>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Add JPEGs or PNGs</p>
              </div>
            )}

            {/* Float Upload Button */}
            <div className="flex justify-end mt-4">
              <label
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer shadow-sm
                  ${
                    pending
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                      : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-900/50"
                  }
                `}
                htmlFor="imgsInput"
              >
                <Camera size={18} />
                {pending ? "Uploading..." : "Select Images"}
              </label>
              <input
                className="hidden"
                id="imgsInput"
                multiple
                name="file"
                type="file"
                accept="image/*"
                onChange={handleImgChange}
                disabled={pending}
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1.5">
              Product Name
            </label>
            <input
              name="p_name"
              type="text"
              required
              disabled={pending}
              placeholder="e.g. Gaming PC Case"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1.5">
              Details
            </label>
            <textarea
              name="p_details"
              required
              rows={3}
              disabled={pending}
              placeholder="Describe the product features..."
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1.5">
                Cost (SDG)
              </label>
              <input
                name="p_cost"
                type="number"
                required
                disabled={pending}
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1.5">
                Category
              </label>
              <Select name="p_cat" disabled={pending}>
                <SelectTrigger className="w-full h-[42px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="font-semibold text-xs uppercase tracking-wider">
                        {cat.replace(/_/g, " ")}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No categories
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
          <Link
            href="/dashboard/productsSet"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <CircleX size={18} /> Cancel
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="flex-2 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {pending ? (
              <>
                <Loader size={18} className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload size={18} /> Publish Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
