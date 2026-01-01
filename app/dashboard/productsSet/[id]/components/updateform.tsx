"use client";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Camera, CircleX, Edit2, ImagePlus, Loader } from "lucide-react";
import { useState } from "react";
import ProductImgCarousel from "@/components/carousel";
import { upload } from "@vercel/blob/client";
import { product_update } from "../actions/product_update";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductImage, ProductType } from "@/types/productsTypes";

export default function UpdateForm({ product }: { product: ProductType }) {
  const [imgs, setImgs] = useState<ProductImage[]>(product.p_imgs || []);
  const [pending, setPending] = useState(false);

  function handleImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImgs = files.map((file) => ({
      url: URL.createObjectURL(file),
      productImgFile: file,
    }));
    setImgs((prev) => [...prev, ...newImgs]);
  }

  function handleRemove(imgUrl: string) {
    console.log("remove");
    // If it's a local blob, revoke it to free memory
    if (imgUrl.startsWith("blob:")) {
      URL.revokeObjectURL(imgUrl);
    }
    setImgs((prev) => prev.filter((img) => img.url !== imgUrl));
  }

  async function handleProductImgsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (imgs.length === 0)
      return toast.error("Product must have at least one image");

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    // Start loading state
    setPending(true);
    const toastId = toast.loading("Updating product and images...");

    try {
      // 1. Filter existing vs new images
      const existingUrls = imgs
        .filter((img) => !img.url.startsWith("blob:"))
        .map((img) => ({ url: img.url }));

      const newFiles = imgs.filter((img) => img.url.startsWith("blob:"));

      // 2. Parallel Upload (faster in 2025)
      const uploadTasks = newFiles.map((img) =>
        upload(img.productImgFile.name, img.productImgFile, {
          access: "public",
          handleUploadUrl: "/api/uploadImgs",
        })
      );

      const uploadedBlobs = await Promise.all(uploadTasks);
      const newUrls = uploadedBlobs.map((blob) => ({ url: blob.url }));

      // 3. Prepare Final Data
      const finalImgs = [...existingUrls, ...newUrls];
      formData.set("p_imgs", JSON.stringify(finalImgs));
      formData.set("id", product.id);

      // 4. Server Action
      await product_update(formData);

      // 5. Success
      toast.success("Product updated successfully!", { id: toastId });
      setPending(false);
    } catch (error: any) {
      // Critical Fix: Ignore Next.js redirect "errors"
      if (error.message === "NEXT_REDIRECT") {
        toast.success("Redirecting...", { id: toastId });
        return;
      }

      console.error("Update Error:", error);
      toast.error(error.message || "Failed to update product", { id: toastId });
      setPending(false);
    }
  }
  return (
    // Use a light gray background for contrast
    <div className="bg-transparent lg:min-h-screen p-2">
      {/* Header Card (White background, black text/border) */}
  

      {/* Main Form Container (White background, subtle shadow) */}
      <form
        onSubmit={handleProductImgsSubmit}
        className="relative bg-white dark:bg-slate-900 p-6 md:p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto transition-colors"
      >
        {/* Loading Overlay */}
        {pending && (
          <div className="z-50 cursor-wait w-full h-full backdrop-blur-[2px] absolute top-0 left-0 bg-white/60 dark:bg-slate-900/60 flex flex-col items-center justify-center rounded-xl transition-all">
            <Loader className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-400" />
            <p className="text-blue-600 dark:text-blue-400 font-black mt-4 uppercase tracking-widest text-xs">
              Syncing changes...
            </p>
          </div>
        )}

        {/* Image Display Section */}
        <div className="mb-8">
          <div>
            {imgs.length > 0 ? (
              <ProductImgCarousel
                imgH={"h-64 rounded-xl shadow-inner"}
                imgFill={"object-cover"}
                handleRemove={handleRemove}
                imgs={imgs}
              />
            ) : (
              <div className="h-64 w-full bg-slate-50 dark:bg-slate-800/50 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 transition-colors">
                <div className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-md mb-3 border border-slate-100 dark:border-slate-800">
                  <ImagePlus size={40} className="text-slate-400 dark:text-slate-600" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-bold">No product images</p>
                <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Add JPEGs or PNGs</p>
              </div>
            )}

            {/* Blue Action Upload Button */}
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

        {/* Form Fields - Black/Slate text and borders */}
        <div className="space-y-5">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1.5">
              Product Name
            </label>
            <input
              name="p_name"
              type="text"
              required
              defaultValue={product.p_name}
              disabled={pending}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
              placeholder="e.g. Mechanical Keyboard"
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
              defaultValue={product.p_details}
              disabled={pending}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
              placeholder="Full specifications and features..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1.5">
                Cost (SDG)
              </label>
              <input
                name="p_cost"
                type="number"
                required
                defaultValue={product.p_cost}
                disabled={pending}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1.5">
                Category
              </label>
              <Select
                name="p_cat"
                defaultValue={product.p_cat}
                disabled={pending}
              >
                <SelectTrigger className="w-full h-[42px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-600">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-gray-900 dark:text-slate-100 focus:bg-gray-100 dark:focus:bg-slate-800 font-semibold text-xs uppercase tracking-wider"
                    >
                      {cat.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Buttons - Blue primary, gray secondary */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <Link
            href="/dashboard/productsSet"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <CircleX size={18} /> Cancel
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-black shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 
            bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
          >
            {pending ? (
              <>
                <Loader size={18} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Edit2 size={18} /> Update Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
