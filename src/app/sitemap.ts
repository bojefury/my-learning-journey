import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://help-store.example";
  return [
    "",
    "/catalog",
    "/subscriptions",
    "/gift-cards",
    "/top-up",
    "/sale",
    "/about",
    "/contacts",
    "/faq",
    ...products.map((p) => `/catalog/${p.slug}`),
  ].map((url) => ({ url: base + url, lastModified: new Date() }));
}
