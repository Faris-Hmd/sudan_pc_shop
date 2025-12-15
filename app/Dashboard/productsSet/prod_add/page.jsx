"use client";
import Link from "next/link";
import { product_add } from "../../../actions/product_add"; // Logic unchanged
import { categories } from "../../../data/categories"; // Logic unchanged
import { Camera, CircleX, Loader, Upload } from "lucide-react";
import { useState } from "react";
import ProductImgCarousel from "../../../comp/carousel"; // Logic unchanged
import { upload } from "@vercel/blob/client"; // Logic unchanged
import { toast } from "sonner"; // Logic unchanged
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductImgUplpad() {
  const [imgs, setImgs] = useState([]);
  const [pending, setPending] = useState(false);

  // --- LOGIC UNCHANGED ---
  async function handleImgChange(e) {
    const { files } = e.target;
    for (const file of files) {
      setImgs((prevImg) => [
        ...prevImg,
        {
          url: URL.createObjectURL(file),
          productImgFile: file,
        },
      ]);
    }
  }

  async function handleProductImgsSubmit(e) {
    e.preventDefault();
    setPending(true);
    try {
      function wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      if (imgs.length === 0) {
        throw new Error("Add images!");
      }
      await wait(1000); // Shortened wait for responsiveness in demo
      const fd = new FormData(e.target);
      let productImgsUrl = [];
      for (const img of imgs) {
        const newBlob = await upload(
          img.productImgFile.name,
          img.productImgFile,
          {
            access: "public",
            handleUploadUrl: "/api/uploadImgs",
          }
        );
        productImgsUrl.push({ url: newBlob.url });
      }
      fd.set("p_imgs", JSON.stringify(productImgsUrl));
      await product_add(fd);
    } catch (error) {
      if (error.message === "NEXT_REDIRECT") {
        return;
      }
      setPending(false);
      console.log(error);
      toast.error(error.message);
    }
  }

  function handleRemove(imgUrl) {
    const newImgs = [];
    imgs.forEach((img) => {
      if (img.url !== imgUrl) newImgs.push(img);
    });
    setImgs(newImgs);
  }
  // --- END LOGIC UNCHANGED ---
  return (
    // Reduced outer padding: used `p-4` instead of `p-8`
    <div className=" bg-gray-50 lg:min-h-screen">
      {/* Reduced bottom margin mb-3 */}
      <div className="bg-white flex justify-between items-center mb-4  shadow-sm border  p-4">
        <h3 className="text-xl font-semibold text-gray-800">Add Product</h3>
      </div>

      {/* Form Container Styling: added a card appearance */}
      <form
        onSubmit={(e) => handleProductImgsSubmit(e)}
        name="shopform"
        // Reduced padding: p-5 md:p-6
        className="relative bg-white p-5 md:p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
      >
        {pending && (
          <div className="z-50 cursor-progress overlay w-full h-full opacity-70 backdrop-blur-sm absolute top-0 left-0 bg-white flex items-center justify-center rounded-lg">
            <Loader className="animate-spin h-8 w-8 text-indigo-600" />
          </div>
        )}

        {/* Reduced bottom margin mb-5 */}
        <div className="mb-5">
          {imgs.length > 0 ? (
            <ProductImgCarousel
              imgH={"h-48 rounded-md"} // Reduced image height h-48
              imgFill={"object-cover"}
              handleRemove={handleRemove}
              imgs={imgs}
            />
          ) : (
            <div className="h-48 w-full bg-gray-100 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300">
              <img
                className="h-full object-cover rounded-md"
                src={"/placeholder.png"}
                alt="Placeholder"
              />
            </div>
          )}

          {/* Reduced top margin mt-3, button padding p-2 */}
          <div className="flex justify-end mt-3">
            {pending ? (
              <button
                type="button"
                disabled
                className="bg-green-600 text-white p-2 rounded-md shadow flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-not-allowed"
              >
                <Camera size={16} /> Uploading...
              </button>
            ) : (
              <label
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md shadow flex items-center justify-center gap-2 cursor-pointer transition duration-150 text-sm"
                htmlFor="imgsInput"
              >
                <Camera size={16} /> Select Images
              </label>
            )}
            <input
              className="absolute opacity-0 w-0 h-0"
              id="imgsInput"
              multiple
              name="file"
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={(e) => handleImgChange(e)}
              defaultValue={imgs}
            />
          </div>
        </div>

        {/* Labels and Inputs: Margins reduced to mt-3 and mb-1, padding p-2.5 */}
        <label
          htmlFor="p_name"
          className="block text-sm font-medium text-gray-700 mb-1 mt-3"
        >
          Product Name
        </label>
        <input
          type="text"
          name="p_name"
          required
          className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />

        <label
          htmlFor="p_details"
          className="block text-sm font-medium text-gray-700 mb-1 mt-3"
        >
          Details
        </label>
        <textarea
          name="p_details"
          required
          rows="3"
          className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        ></textarea>

        <label
          htmlFor="p_cost"
          className="block text-sm font-medium text-gray-700 mb-1 mt-3"
        >
          Cost (SDG)
        </label>
        <input
          type="number"
          name="p_cost"
          required
          className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />

        <label
          htmlFor="p_cat"
          className="block text-sm font-medium text-gray-700 mb-1 mt-3"
        >
          Categories
        </label>

        <Select name="p_cat">
          <SelectTrigger className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-categories" disabled>
                No categories found
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {/* Action Buttons Section: Reduced top margin mt-6, button padding p-2.5 */}
        <div className="flex justify-between gap-3 mt-6">
          <Link
            className="bg-gray-500 hover:bg-gray-600 text-white p-2.5 rounded-md shadow flex items-center gap-2 transition duration-150 w-full justify-center text-sm"
            href="/Dashboard/productsSet"
          >
            <CircleX size={16} /> Cancel
          </Link>
          <button
            className="bg-green-600 hover:bg-green-700 flex justify-center text-white gap-2 items-center p-2.5 rounded-md shadow-lg transition duration-150 w-full disabled:opacity-50 text-sm"
            type="submit"
            value="Add Product"
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader size={16} className="animate-spin" /> Loading...
              </>
            ) : (
              <>
                <Upload size={16} /> Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
