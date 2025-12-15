import Link from "next/link";
import Image from "next/image";

// Your list of categories
const categories = [
  "PC",
  "LAPTOP",
  "WEBCAMS",
  "HARD_DRIVES",
  "HEADSETS",
  "KEYBOARDS",
  "SPEAKERS",
  "PRINTERS",
  "MICROPHONES",
  "MONITORS",
  // "TABLETS",
  // "PROJECTORS",
  // "SCANNERS",
  "SSD",
  "MOUSES",
  // "DESKTOP",
];

export default function Categories() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2 text-center">
        Browse By Category
      </h2>

      {/* Responsive Grid Container */}
      {/* It will show 3 columns on mobile, 4 on medium screens, and 6 on large screens */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* We map over all categories now for a complete list */}
        {categories.map((cat) => {
          // Construct the image URL
          const imageUrl = `https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/icons/${cat}.png`;

          return (
            <div
              key={cat}
              // Card Styling: Clean background, shadow, interactive hover effects
              className="group bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <Link href={"/products/categories/" + cat}>
                <div className="flex flex-col items-center justify-center p-4 h-full w-full">
                  {/* Image Container with Next/Image */}
                  <div className="h-16 w-16 relative mb-3">
                    <Image
                      sizes="(max-width: 768px) 50vw, 33vw"
                      alt={`Category: ${cat}`}
                      fill
                      src={imageUrl}
                      className="object-cover" // Ensures icons look good even if image shape varies
                    />
                  </div>

                  {/* Category Name */}
                  <div className="text-sm font-semibold text-gray-700 text-center capitalize group-hover:text-blue-600 transition duration-300">
                    {/* Replaces underscores with spaces for cleaner UI display */}
                    {cat.replace(/_/g, " ")}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
