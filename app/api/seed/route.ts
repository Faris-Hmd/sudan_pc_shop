import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

const CATEGORY_DATA = {
  PC: {
    imgs: [
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=1000",
    ],
    desc: "Custom-built performance workstation with high-airflow chassis.",
    priceRange: [500000, 2500000],
  },
  LAPTOP: {
    imgs: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000",
    ],
    desc: "Powerful portable computing with high-refresh display and thermal mastery.",
    priceRange: [400000, 1800000],
  },
  WEBCAMS: {
    imgs: [
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=1000",
    ],
    desc: "4K Ultra-HD webcam with auto-focus and low-light correction.",
    priceRange: [15000, 85000],
  },
  // HARD_DRIVES: {
  //   imgs: [
  //     "https://images.unsplash.com/photo-1531492746377-ad60cb3e285d?q=80&w=1000",
  //   ],
  //   desc: "High-capacity mechanical storage for enterprise-grade data backup.",
  //   priceRange: [25000, 120000],
  // },
  HEADSETS: {
    imgs: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    ],
    desc: "Spatial audio gaming headset with noise-canceling microphone.",
    priceRange: [20000, 150000],
  },
  KEYBOARDS: {
    imgs: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000",
    ],
    desc: "Mechanical deck with tactile switches and per-key RGB programming.",
    priceRange: [30000, 130000],
  },
  SPEAKERS: {
    imgs: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000",
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=1000",
    ],
    desc: "High-fidelity studio monitors with deep bass and clear acoustics.",
    priceRange: [45000, 250000],
  },
  PRINTERS: {
    imgs: [
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1000",
    ],
    desc: "High-speed laser printer with wireless cloud printing capabilities.",
    priceRange: [80000, 350000],
  },
  MICROPHONES: {
    imgs: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000",
    ],
    desc: "Professional condenser microphone for high-quality streaming and podcasts.",
    priceRange: [25000, 180000],
  },
  MONITORS: {
    imgs: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000",
      "https://images.unsplash.com/photo-1551645120-d70bfe84c826?q=80&w=1000",
    ],
    desc: "4K IPS Monitor with HDR support and ultra-low response time.",
    priceRange: [120000, 450000],
  },
  SSD: {
    imgs: [
      // "https://images.unsplash.com/photo-1597852074816-d933c4d2b988?q=80&w=1000",
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1000",
    ],
    desc: "High-speed NVMe Gen4 storage for lightning-fast boot and load times.",
    priceRange: [35000, 150000],
  },
  MOUSES: {
    imgs: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000",
    ],
    desc: "Lightweight wireless gaming mouse with high-precision optical sensor.",
    priceRange: [12000, 65000],
  },
  TABLETS: {
    imgs: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000",
    ],
    desc: "Sleek slate with high-resolution creative display and stylus support.",
    priceRange: [150000, 800000],
  },
};

const BRANDS = [
  "ASUS",
  "MSI",
  "Corsair",
  "Samsung",
  "Razer",
  "Intel",
  "AMD",
  "Logitech",
  "HP",
  "Dell",
  "EVGA",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pass = searchParams.get("pass");

  // Basic security to prevent accidental seeding
  if (process.env.NODE_ENV === "production" && pass !== "seed_me_2024") {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const categories = Object.keys(
      CATEGORY_DATA,
    ) as (keyof typeof CATEGORY_DATA)[];

    // Step 1: Guarantee EACH category has at least one elite product
    const guaranteePromises = categories.map((catKey) => {
      const config = CATEGORY_DATA[catKey];
      const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const randomImg =
        config.imgs[Math.floor(Math.random() * config.imgs.length)];
      const cost = Math.floor(
        Math.random() * (config.priceRange[1] - config.priceRange[0]) +
          config.priceRange[0],
      );

      return addDoc(collection(db, "products"), {
        p_name: `${brand} ${catKey.replace(/_/g, " ")} Elite Series`,
        p_cost: cost,
        p_cat: catKey,
        p_details: config.desc,
        p_imgs: [{ url: randomImg }],
        p_qu: Math.floor(Math.random() * 10) + 5,
        createdAt: serverTimestamp(),
        isFeatured: Math.random() > 0.6, // More featured products for the carousel
      });
    });

    // Step 2: Add 15 more random pro products to fill the inventory
    const extraPromises = Array.from({ length: 15 }).map(() => {
      const catKey = categories[Math.floor(Math.random() * categories.length)];
      const config = CATEGORY_DATA[catKey];
      const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const randomImg =
        config.imgs[Math.floor(Math.random() * config.imgs.length)];
      const cost = Math.floor(
        Math.random() * (config.priceRange[1] - config.priceRange[0]) +
          config.priceRange[0],
      );

      return addDoc(collection(db, "products"), {
        p_name: `${brand} ${catKey.replace(/_/g, " ")} Pro Gear`,
        p_cost: cost,
        p_cat: catKey,
        p_details: config.desc,
        p_imgs: [{ url: randomImg }],
        p_qu: Math.floor(Math.random() * 20) + 1,
        createdAt: serverTimestamp(),
        isFeatured: false,
      });
    });

    await Promise.all([...guaranteePromises, ...extraPromises]);

    return NextResponse.json(
      {
        success: true,
        count: guaranteePromises.length + extraPromises.length,
        message: `Database seeded successfully.`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { success: false, error: "Seeding failed" },
      { status: 500 },
    );
  }
}
