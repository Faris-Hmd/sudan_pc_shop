import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sudan PC Shop",
    short_name: "SudanPC",
    description: "Premium PC components and accessories in Sudan",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
    //   {
    //     src: "/favicon.ico",
    //     sizes: "512x512",
    //     type: "image/png",  
    //   },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
