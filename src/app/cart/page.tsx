"use client";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { rub } from "@/lib/data";
import { calculateTotals } from "@/lib/commerce";
import { useState } from "react";
export default function Cart() {
  const { lines, remove, setQuantity, clear } = useCart();
  const [promo, setPromo] = useState("");
  const [active, setActive] = useState("");
  const t = calculateTotals(
    lines.map((l) => ({
      productId: l.product.id,
      quantity: l.quantity,
      unitPrice: l.product.price,
    })),
    active,
  );
  return (
    <div className="container">
      <div className="page-hero">
        <div className="eyebrow">Ваш выбор</div>
        <h1>Корзина</h1>
      </div>
      {!lines.length ? (
        <div className="panel">
          <h2>Корзина пока пуста</h2>
          <p className="muted">
            Добавьте игру, подписку или карту из каталога.
          </p>
          <Link href="/catalog" className="btn primary">
            Открыть каталог
          </Link>
        </div>
      ) : (
        <>
          <div className="panel">
            {lines.map((l) => (
              <div className="cart-line" key={l.product.id}>
                <div>
                  <b>{l.product.name}</b>
                  <div className="muted">
                    {l.product.platform} · {l.product.region}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setQuantity(l.product.id, l.quantity - 1)}
                    aria-label="Уменьшить"
                  >
                    <Minus />
                  </button>{" "}
                  {l.quantity}{" "}
                  <button
                    onClick={() => setQuantity(l.product.id, l.quantity + 1)}
                    aria-label="Увеличить"
                  >
                    <Plus />
                  </button>
                </div>
                <div>
                  <b>{rub(l.product.price * l.quantity)}</b>{" "}
                  <button
                    onClick={() => remove(l.product.id)}
                    aria-label="Удалить"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
            <button className="btn" onClick={clear}>
              Очистить корзину
            </button>
          </div>
          <div className="summary">
            <label>
              Промокод
              <input
                className="field"
                value={promo}
                onChange={(e) => setPromo(e.target.value.toUpperCase())}
                placeholder="WELCOME10"
              />
            </label>
            <button className="btn" onClick={() => setActive(promo)}>
              Применить
            </button>
            <div className="summary-row">
              <span>Товары</span>
              <b>{rub(t.subtotal)}</b>
            </div>
            <div className="summary-row">
              <span>Скидка</span>
              <b>− {rub(t.discount)}</b>
            </div>
            <div className="summary-row">
              <strong>Итого</strong>
              <strong>{rub(t.total)}</strong>
            </div>
            <p className="muted">
              Цена и наличие будут повторно проверены сервером.
            </p>
            <Link href="/checkout" className="btn primary">
              Перейти к оформлению
            </Link>
          </div>
        </>
      )}
      <div className="section" />
    </div>
  );
}
