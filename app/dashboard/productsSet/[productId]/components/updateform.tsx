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
      formData.set("id", product.productId);

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
    <div className="bg-gray-100 lg:min-h-screen p-2">
      {/* Header Card (White background, black text/border) */}
      <div className="bg-white flex justify-between items-center mb-6 shadow-sm border-b border-gray-300 rounded-lg p-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-gray-900">
          Edit Product Details
        </h3>
        <div className="h-2 w-2 rounded-full bg-blue-500" />{" "}
        {/* Small accent */}
      </div>

      {/* Main Form Container (White background, subtle shadow) */}
      <form
        onSubmit={handleProductImgsSubmit}
        className="relative bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200 max-w-2xl mx-auto"
      >
        {/* Loading Overlay */}
        {pending && (
          <div className="z-50 cursor-wait w-full h-full backdrop-blur-sm absolute top-0 left-0 bg-white/70 flex flex-col items-center justify-center rounded-lg">
            <Loader className="animate-spin h-10 w-10 text-blue-600" />
            <p className="text-gray-800 font-semibold mt-4">
              Syncing changes...
            </p>
          </div>
        )}

        {/* Image Display Section */}
        <div className="mb-8">
          <div>
            {imgs.length > 0 ? (
              <ProductImgCarousel
                imgH={"h-64 rounded-lg shadow-inner"}
                imgFill={"object-cover"}
                handleRemove={handleRemove}
                imgs={imgs}
              />
            ) : (
              <div className="h-64 w-full bg-gray-50 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400">
                <div className="p-4 bg-white rounded-full shadow-md mb-3">
                  <ImagePlus size={40} className="text-gray-600" />
                </div>
                <p className="text-gray-600 font-medium">No product images</p>
                <p className="text-gray-400 text-xs mt-1">Add JPEGs or PNGs</p>
              </div>
            )}

            {/* Blue Action Upload Button */}
            <div className="flex justify-end mt-4">
              <label
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer shadow-sm
                  ${
                    pending
                      ? "bg-slate-100 text-slate-400"
                      : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
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
            <label className="text-sm font-semibold text-gray-800 block mb-1.5">
              Product Name
            </label>
            <input
              name="p_name"
              type="text"
              required
              defaultValue={product.p_name}
              disabled={pending}
              className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder-gray-500"
              placeholder="e.g. Mechanical Keyboard"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-800 block mb-1.5">
              Details
            </label>
            <textarea
              name="p_details"
              required
              rows={3}
              defaultValue={product.p_details}
              disabled={pending}
              className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all placeholder-gray-500 resize-none"
              placeholder="Full specifications and features..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-semibold text-gray-800 block mb-1.5">
                Cost (SDG)
              </label>
              <input
                name="p_cost"
                type="number"
                required
                defaultValue={product.p_cost}
                disabled={pending}
                className="w-full px-4 py-2.5 bg-white border border-gray-400 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none placeholder-gray-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-800 block mb-1.5">
                Category
              </label>
              <Select
                name="p_cat"
                defaultValue={product.p_cat}
                disabled={pending}
              >
                <SelectTrigger className="w-full h-[11] bg-white border border-gray-400 text-sm text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat}
                      value={cat}
                      className="text-gray-900 focus:bg-gray-100"
                    >
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Action Buttons - Blue primary, gray secondary */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <Link
            href="/Dashboard/productsSet"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <CircleX size={18} /> Cancel
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all disabled:opacity-50 
            bg-blue-600 text-white hover:bg-blue-700"
          >
            {pending ? (
              <>
                <Loader size={18} className="animate-spin" /> Saving Changes...
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
