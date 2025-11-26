"use client";
import Link from "next/link";
import { product_add } from "../../../actions/product_add";
import { categories } from "../../../data/categories";
import { CircleX, Upload } from "lucide-react";
import { useState } from "react";
import ProductImgCarousel from "../../../comp/carousel";
import { upload } from "@vercel/blob/client";

export default function ProductImgUplpad() {
  const [imgs, setImgs] = useState([]);

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
        className="add_form"
      >
        <>
          {imgs.length > 0 && (
            <ProductImgCarousel handleRemove={handleRemove} imgs={imgs} />
          )}
          <input
            multiple
            name="file"
            type="file"
            accept="image/jpeg, image/png, image/webp"
            required
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
        <select name="p_cat" id="p_cat" required>
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))
          ) : (
            <option disabled>No categories found</option>
          )}
        </select>

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
            <Upload size={17} /> Add Product
          </button>
        </div>
      </form>
    </>
  );
}
