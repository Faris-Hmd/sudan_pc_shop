"use client";
import Link from "next/link";
import { categories } from "../../../data/categories";
import { Camera, CircleX, Edit2, Loader } from "lucide-react";
import { useState } from "react";
import ProductImgCarousel from "../../../comp/carousel";
import { upload } from "@vercel/blob/client";
import { product_update } from "../../../actions/product_update";

export default function UpdateForm({ product }) {
  const [imgs, setImgs] = useState(product.p_imgs);
  const [pending, setPending] = useState(false);

  function handleImgChange(e) {
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

  function handleRemove(imgUrl) {
    console.log(imgUrl);
    const newImgs = [];
    imgs.forEach((img) => {
      // console.log(img);
      if (img.url !== imgUrl) newImgs.push(img);
    });
    setImgs(newImgs);
  }
  async function handleProductImgsSubmit(e) {
    e.preventDefault();
    setPending(true);
    function wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await wait(3000);
    if (imgs.length === 0) {
      setPending(false);
      console.log("empty imgas");
      return;
    }
    const fd = new FormData(e.target);
    let productImgsUrl = [];
    for (const img of imgs) {
      if (img.url) {
        productImgsUrl.push({ url: img.url });
      } else {
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
    }

    fd.set("p_imgs", JSON.stringify(productImgsUrl));
    fd.set("id", product.id);
    await product_update(fd);
  }

  return (
    <form
      onSubmit={(e) => handleProductImgsSubmit(e)}
      name="shopform"
      className="add_form"
    >
      {imgs.length > 0 ? (
        <ProductImgCarousel handleRemove={handleRemove} imgs={imgs} />
      ) : (
        <img className="h-60" src={"/placeholder.png"} />
      )}
      <div className="flex justify-end">
        {" "}
        <label
          className="bg-green-600 text-white p-2 rounded shadow flex items-center justify-center gap-2 hover:opacity-80"
          htmlFor="imgsInput"
        >
          <Camera size={17} /> Upload
        </label>
      </div>
      <input
        multiple
        id="imgsInput"
        name="file"
        type="file"
        accept="image/jpeg, image/png, image/webp"
        onChange={(e) => handleImgChange(e)}
      />
      <label htmlFor="p_name">Product Name</label>
      <input defaultValue={product.p_name} type="text" name="p_name" required />
      <label htmlFor="p_details">Details</label>
      <textarea
        defaultValue={product.p_details}
        name="p_details"
        required
        rows="3"
      ></textarea>

      <label htmlFor="p_cost">Cost</label>
      <input
        defaultValue={product.p_cost}
        type="number"
        name="p_cost"
        required
      />

      <label htmlFor="p_cat">Categories</label>
      <select defaultValue={product.p_cat} name="p_cat" id="p_cat" required>
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
          className="bg-green-600 flex justify-center text-white gap-2 items-center p-1.5 rounded shadow-2xl disabled:opacity-70"
          type="submit"
          value="Add Product"
          style={{ flexGrow: 1 }}
          disabled={pending}
        >
          {pending ? (
            <>
              {" "}
              <Loader size={17} className="animate-spin" /> loading...
            </>
          ) : (
            <>
              <Edit2 size={17} /> Update Product
            </>
          )}
        </button>
      </div>
    </form>
  );
}
