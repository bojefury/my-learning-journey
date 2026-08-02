"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/data";
type Line = { product: Product; quantity: number };
type Cart = {
  lines: Line[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, n: number) => void;
  clear: () => void;
};
const C = createContext<Cart | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    try {
      setLines(JSON.parse(localStorage.getItem("help-cart") || "[]"));
    } catch {
      localStorage.removeItem("help-cart");
    } finally {
      setHydrated(true);
    }
  }, []);
  useEffect(() => {
    if (hydrated) localStorage.setItem("help-cart", JSON.stringify(lines));
  }, [hydrated, lines]);
  const value = useMemo(
    () => ({
      lines,
      add: (p: Product) =>
        setLines((v) => {
          const x = v.find((l) => l.product.id === p.id);
          return x
            ? v.map((l) =>
                l.product.id === p.id
                  ? { ...l, quantity: Math.min(10, l.quantity + 1) }
                  : l,
              )
            : [...v, { product: p, quantity: 1 }];
        }),
      remove: (id: string) =>
        setLines((v) => v.filter((l) => l.product.id !== id)),
      setQuantity: (id: string, n: number) =>
        setLines((v) =>
          v.map((l) =>
            l.product.id === id
              ? { ...l, quantity: Math.max(1, Math.min(10, n)) }
              : l,
          ),
        ),
      clear: () => setLines([]),
    }),
    [lines],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export function useCart() {
  const c = useContext(C);
  if (!c) throw new Error("CartProvider required");
  return c;
}
