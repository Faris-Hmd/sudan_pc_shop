"use client";

import { put } from "@vercel/blob";
import { useState, useEffect } from "react";
import ProductImgCarousel from "../comp/carousel";

export default function ProductImgUplpad() {
  const [imgs, setImgs] = useState([]);
  const [blob, setBlob] = useState(null);

  async function handleImgChange(e) {
    const { files } = e.target;
    // console.log(files);
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

  async function handleSubmit(e) {
    e.preventDefault();
    let productImgsUrl = [];
    for (const img of imgs) {
      const newBlob = await put(img.productImgFile.name, img.productImgFile, {
        access: "public",
        token: "vercel_blob_rw_lzmijYm9F9DKp5qM_FjmOaOg64bys3Xrlt9vynEZ9tZwoR2",
      });
      productImgsUrl.push({ url: newBlob.url });
    }
    // console.log(productImgsUrl);
  }
  return (
    <div className="m-auto flex justify-center flex-col items-center">
      <h1>Upload Your Avatar</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
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
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </div>
  );
}
