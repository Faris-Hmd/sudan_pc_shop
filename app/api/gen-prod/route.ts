import { categories } from "@/data/categories";
import { productsRef } from "@/db/firebase";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

const PRODUCT_IMAGES = [
  "https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/blue1.jpeg",
  "https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/green2.jpeg",
];

const CATEGORIES = [
  "Processors",
  "Graphics Cards",
  "Memory",
  "Storage",
  "Motherboards",
  "Power Supplies",
];

const BRANDS = ["Intel", "AMD", "NVIDIA", "ASUS", "MSI", "Corsair"];

export async function GET() {
  try {
    const createdProducts = [];

    // Generate 10 random products
    for (let i = 0; i < 10; i++) {
      const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const cat = categories[Math.floor(Math.random() * categories.length)];
      const imgUrl =
        PRODUCT_IMAGES[Math.floor(Math.random() * PRODUCT_IMAGES.length)];
      const price = Math.floor(Math.random() * (1200 - 50 + 1)) + 50;

      const productObj = {
        p_name: `${brand} Pro ${cat} Series ${i + 1}`,
        p_cat: cat,
        p_imgs: [{ url: imgUrl }],
        p_details: `High-performance ${cat} designed for 2025 gaming standards. Features include advanced cooling, 4K optimization, and a 2-year Sudan PC Shop warranty.`,
        p_cost: price,
        createdAt: serverTimestamp(), // Good practice for sorting
      };

      const docRef = await addDoc(productsRef, productObj);
      createdProducts.push({ id: docRef.id, ...productObj });
    }

    return NextResponse.json({
      message: "Successfully seeded 10 products",
      products: createdProducts,
    });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
