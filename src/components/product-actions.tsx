"use client";
import { ShoppingBag, Heart } from "lucide-react";
import type { Product } from "@/lib/data";
import { useCart } from "./cart-provider";
export function ProductActions({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="hero-actions">
      <button className="btn primary" onClick={() => add(product)}>
        <ShoppingBag size={18} /> Добавить в корзину
      </button>
      <button className="btn">
        <Heart size={18} /> В избранное
      </button>
    </div>
  );
}
