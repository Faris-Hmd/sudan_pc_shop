"use client";

import { put } from "@vercel/blob";
import { useState, useEffect } from "react";
import ProductImgCarousel from "../../../comp/carousel";

export default function ProductImgUplpad({ handleSubmit }) {
  const [imgs, setImgs] = useState([]);
  //   const [blob, setBlob] = useState(null);

  async function handleImgChange(e) {
    const { files } = e.target;
    console.log(files);
    for (let index = 0; index < files.length; index++) {
      setImgs((prevImg) => [
        ...prevImg,
        {
          url: URL.createObjectURL(files[index]),
          productImgFile: files[index],
        },
      ]);
    }
  }

  async function handleProductImgsSubmit(e) {
    e.preventDefault();
    let productImgsUrl = [];
    for (const img of imgs) {
      const newBlob = await put(img.productImgFile.name, img.productImgFile, {
        access: "public",
        token: "vercel_blob_rw_lzmijYm9F9DKp5qM_FjmOaOg64bys3Xrlt9vynEZ9tZwoR2",
      });
      productImgsUrl.push({ url: newBlob.url });
    }
    console.log(productImgsUrl);
    handleSubmit();
  }
  return (
    <form id="addProductForm" onSubmit={(e) => handleProductImgsSubmit(e)}>
      {imgs.length > 0 && <ProductImgCarousel imgs={imgs} />}
      <input
        multiple
        name="file"
        type="file"
        accept="image/jpeg, image/png, image/webp"
        required
        onChange={(e) => handleImgChange(e)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}
