import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Help Store",
    short_name: "Help Store",
    description: "Магазин цифровых товаров",
    start_url: "/",
    display: "standalone",
    background_color: "#040b1d",
    theme_color: "#1768ee",
    icons: [
      {
        src: "/brand/help-store-logo.svg",
        sizes: "920x920",
        type: "image/svg+xml",
      },
    ],
  };
}
