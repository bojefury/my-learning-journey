"use client";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { Product, rub } from "@/lib/data";
import { useCart } from "./cart-provider";
export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="product-card">
      <Link
        href={`/catalog/${product.slug}`}
        className="product-art"
        style={{ "--art": product.color } as React.CSSProperties}
      >
        <span>{product.tag}</span>
        <i>{product.category}</i>
        <b>{product.name.slice(0, 1)}</b>
      </Link>
      <div className="product-body">
        <div className="eyebrow">
          {product.platform} · {product.region}
        </div>
        <Link href={`/catalog/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="price-row">
          <div>
            <strong>{rub(product.price)}</strong>
            {product.oldPrice && <del>{rub(product.oldPrice)}</del>}
          </div>
          <button
            onClick={() => add(product)}
            aria-label={`Добавить ${product.name} в корзину`}
          >
            <Plus />
          </button>
        </div>
      </div>
      <button className="favorite" aria-label="Добавить в избранное">
        <Heart />
      </button>
    </article>
  );
}
