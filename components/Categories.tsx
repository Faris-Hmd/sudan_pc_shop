import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import {
  Laptop,
  Monitor,
  Video,
  HardDrive,
  Headphones,
  Keyboard,
  Speaker,
  Printer,
  Mic,
  Mouse,
  Smartphone,
  Cpu,
} from "lucide-react";

const IconMap: Record<string, any> = {
  PC: Monitor,
  LAPTOP: Laptop,
  WEBCAMS: Video,
  HARD_DRIVES: HardDrive,
  HEADSETS: Headphones,
  KEYBOARDS: Keyboard,
  SPEAKERS: Speaker,
  PRINTERS: Printer,
  MICROPHONES: Mic,
  MONITORS: Monitor,
  SSD: Cpu,
  MOUSES: Mouse,
  TABLETS: Smartphone,
};

export default function Categories() {
  return (
    <section id="categories" className="py-3 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-3 transition-colors">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto font-medium">
            Explore our professional-grade hardware inventory
          </p>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {categories.map((cat) => {
            const Icon = IconMap[cat];
            const imageUrl = `https://lzmijym9f9dkp5qm.public.blob.vercel-storage.com/icons/${cat}.png`;
            const label = cat.replace(/_/g, " ");

            return (
              <Link
                key={cat}
                href={`/products/categories/${cat}`}
                className="group flex flex-col items-center gap-3 p-4 rounded-[2.5rem] bg-card/50 border border-border transition-all duration-300 hover:bg-card hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-card rounded-[1.5rem] shadow-sm border border-border group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-300">
                  {Icon ? (
                    <Icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all" />
                  ) : (
                    <div className="relative w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform">
                      <Image
                        src={imageUrl}
                        alt={label}
                        fill
                        className="object-contain opacity-80 dark:opacity-60 dark:invert dark:brightness-200 group-hover:opacity-100 group-hover:brightness-100 transition-all"
                      />
                    </div>
                  )}
                </div>

                <span className="text-[10px] md:text-xs font-black text-muted-foreground text-center uppercase tracking-[0.1em] group-hover:text-primary transition-colors">
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
