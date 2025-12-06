"use client";
import Link from "next/link";
import { product_add } from "../../../actions/product_add";
import { categories } from "../../../data/categories";
import { Camera, CircleX, Loader, Upload } from "lucide-react";
import { useState } from "react";
import ProductImgCarousel from "../../../comp/carousel";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
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
      await wait(10000);
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
      // console.log(img);
      if (img.url !== imgUrl) newImgs.push(img);
    });
    setImgs(newImgs);
  }

  return (
    <>
      <div className="bg-white flex justify-between items-center mb-2 p-2 border-b shadow flex-wrap">
        <h3>Add Product</h3>
      </div>
      <form
        onSubmit={(e) => handleProductImgsSubmit(e)}
        name="shopform"
        className="add_form relative"
      >
        {pending && (
          <div className="z-50 cursor-progress overlay w-full h-full  opacity-50 backdrop-blur-3xl absolute top-0 right-0 bg-white flex items-center justify-center">
            <Loader className={"animate-spin "} />
          </div>
        )}
        <>
          {imgs.length > 0 ? (
            <ProductImgCarousel
              imgH={"h-60"}
              imgFill={"object-cover"}
              handleRemove={handleRemove}
              imgs={imgs}
            />
          ) : (
            <img className="h-60 object-cover" src={"/placeholder.png"} />
          )}
          {pending ? (
            <div className="flex justify-end">
              <button
                type="button"
                disabled
                className="bg-green-600 text-white p-2 rounded shadow flex items-center justify-center gap-2 disabled:opacity-80 hover:opacity-80"
              >
                <Camera size={17} /> Upload
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <label
                className="bg-green-600 text-white p-2 rounded shadow flex items-center justify-center gap-2 hover:opacity-80"
                htmlFor="imgsInput"
              >
                <Camera size={17} /> Upload
              </label>
            </div>
          )}
          <input
            // className="hidden"
            className="absolute right-1000"
            id="imgsInput"
            multiple
            name="file"
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={(e) => handleImgChange(e)}
            defaultValue={imgs}
          />
        </>
        <label htmlFor="p_name">Product Name</label>
        <input type="text" name="p_name" required />
        <label htmlFor="p_details">Details</label>
        <textarea name="p_details" required rows="3"></textarea>

        <label htmlFor="p_cost">Cost</label>
        <input type="number" name="p_cost" required />

        <label htmlFor="p_cat">Categories</label>

        <Select name="p_cat">
          <SelectTrigger className="w-full ">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))
            ) : (
              <option key={"no"} disabled>
                No categories found
              </option>
            )}
          </SelectContent>
        </Select>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            gap: "2px",
            alignItems: "center",
          }}
        >
          <Link
            className="bg-gray-500 text-white p-1.5 rounded shadow flex items-center gap-1"
            href="/Dashboard/productsSet"
          >
            <CircleX size={17} /> Cancel
          </Link>
          <button
            className="bg-green-600 flex justify-center text-white gap-2 items-center p-1.5 rounded shadow-2xl "
            type="submit"
            value="Add Product"
            style={{ flexGrow: 1 }}
          >
            {pending ? (
              <>
                <Loader size={17} className="animate-spin" /> loading...
              </>
            ) : (
              <>
                <Upload size={17} /> Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
