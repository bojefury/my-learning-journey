"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { rub } from "@/lib/data";
export default function Checkout() {
  const { lines, clear } = useCart();
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const total = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "idempotency-key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        email: new FormData(e.currentTarget as HTMLFormElement).get("email"),
        items: lines.map((l) => ({
          productId: l.product.id,
          quantity: l.quantity,
        })),
      }),
    });
    setBusy(false);
    if (res.ok) {
      setDone(true);
      clear();
    }
  }
  if (done)
    return (
      <div className="container section">
        <div className="panel">
          <span className="mock">Тестовый заказ</span>
          <h1>Заказ создан</h1>
          <p>
            Платёж не был выполнен. Заказ ожидает тестовой оплаты и доступен в
            демонстрационном кабинете.
          </p>
          <Link className="btn primary" href="/account">
            Открыть кабинет
          </Link>
        </div>
      </div>
    );
  return (
    <div className="container">
      <div className="page-hero">
        <div className="eyebrow">Безопасное оформление</div>
        <h1>Checkout</h1>
        <p>Мы не запрашиваем и не храним данные банковской карты.</p>
      </div>
      <form className="detail" onSubmit={submit}>
        <div className="panel stack">
          <h2>1. Контактные данные</h2>
          <label>
            Email
            <input
              className="field"
              name="email"
              type="email"
              required
              placeholder="name@example.com"
            />
          </label>
          <label>
            Способ получения
            <select className="field">
              <option>Email и личный кабинет</option>
            </select>
          </label>
          <h2>2. Оплата</h2>
          <label>
            <input type="radio" checked readOnly /> Тестовый PaymentProvider
          </label>
          <label>
            <input type="checkbox" required /> Принимаю пользовательское
            соглашение
          </label>
        </div>
        <aside className="summary">
          <span className="mock">Development mode</span>
          <h2>Ваш заказ</h2>
          {lines.map((l) => (
            <div className="summary-row" key={l.product.id}>
              <span>
                {l.product.name} × {l.quantity}
              </span>
              <b>{rub(l.product.price * l.quantity)}</b>
            </div>
          ))}
          <div className="summary-row">
            <strong>Итого</strong>
            <strong>{rub(total)}</strong>
          </div>
          <button className="btn primary" disabled={!lines.length || busy}>
            {busy ? "Проверяем…" : "Создать тестовый заказ"}
          </button>
        </aside>
      </form>
    </div>
  );
}
