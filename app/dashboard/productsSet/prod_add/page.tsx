"use client";
import Link from "next/link";
import { product_add } from "./actions/product_add"; // Logic unchanged
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
import { ProductImage } from "@/types/productsTypes";

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
          upload(img.productImgFile.name, img.productImgFile, {
            access: "public",
            handleUploadUrl: "/api/uploadImgs",
          })
        );

        const blobs = await Promise.all(uploadTasks);
        const productImgsUrl = blobs.map((blob) => ({ url: blob.url }));

        // 2. Prepare and Send Data
        formData.set("p_imgs", JSON.stringify(productImgsUrl));

        // Execute Server Action (Ensure product_add is typed to accept FormData)
        await product_add(formData);

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
    <div className="bg-gray-50 lg:min-h-screen p-2">
      {/* Header */}
      <div className="bg-white flex justify-between items-center mb-6 shadow-sm border rounded-lg p-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-bold text-slate-800">Add New Product</h3>
      </div>

      <form
        onSubmit={handleProductImgsSubmit}
        className="relative bg-white p-6 rounded-xl shadow-md border border-slate-100 max-w-2xl mx-auto"
      >
        {/* Loading Overlay */}
        {pending && (
          <div className="z-50 cursor-wait w-full h-full backdrop-blur-[2px] absolute top-0 left-0 bg-white/60 flex flex-col items-center justify-center rounded-xl transition-all">
            <Loader className="animate-spin h-10 w-10 text-blue-600" />
            <p className="text-blue-600 font-medium mt-2">Processing...</p>
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
              <div className="h-64 w-full bg-gray-50 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400">
                <div className="p-4 bg-white rounded-full shadow-md mb-3">
                  <ImagePlus size={40} className="text-gray-600" />
                </div>
                <p className="text-gray-600 font-medium">No product images</p>
                <p className="text-gray-400 text-xs mt-1">Add JPEGs or PNGs</p>
              </div>
            )}

            {/* Float Upload Button */}
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

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">
              Product Name
            </label>
            <input
              name="p_name"
              type="text"
              required
              disabled={pending}
              placeholder="e.g. Gaming PC Case"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1.5">
              Details
            </label>
            <textarea
              name="p_details"
              required
              rows={3}
              disabled={pending}
              placeholder="Describe the product features..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                Cost (SDG)
              </label>
              <input
                name="p_cost"
                type="number"
                required
                disabled={pending}
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1.5">
                Category
              </label>
              <Select name="p_cat" disabled={pending}>
                <SelectTrigger className="w-full h-[42px] bg-slate-50 border-slate-200 text-sm">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
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
        <div className="flex items-center gap-3 mt-8 border-t pt-6">
          <Link
            href="/Dashboard/productsSet"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <CircleX size={18} /> Cancel
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="flex-2 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-md hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
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
