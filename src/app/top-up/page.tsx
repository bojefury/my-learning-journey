"use client";

import { FormEvent, useState } from "react";
import { rub } from "@/lib/data";
import type { TopUpRegion } from "@/lib/top-up";

type Quote = {
  rate: number;
  fee: number;
  total: number;
  testMode: true;
};

export default function TopUp() {
  const [region, setRegion] = useState<TopUpRegion>("TR");
  const [amount, setAmount] = useState(1000);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function requestQuote(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/top-up/quote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ region, amount }),
    });
    const payload = await response.json();
    setPending(false);
    if (!response.ok) {
      setQuote(null);
      setError(payload.error?.message || "Не удалось выполнить расчёт");
      return;
    }
    setQuote(payload.data);
  }

  return (
    <div className="container">
      <div className="page-hero">
        <div className="eyebrow">Расчёт на сервере</div>
        <h1>Пополнение баланса</h1>
        <p>
          Выберите регион аккаунта внимательно: перевод между регионами
          невозможен.
        </p>
      </div>
      <div className="detail">
        <form className="panel stack" onSubmit={requestQuote}>
          <label>
            Платформа
            <select className="field" disabled>
              <option>PlayStation</option>
            </select>
          </label>
          <label>
            Регион аккаунта
            <select
              className="field"
              value={region}
              onChange={(event) => {
                setRegion(event.target.value as TopUpRegion);
                setQuote(null);
              }}
            >
              <option value="TR">Турция</option>
              <option value="PL">Польша</option>
            </select>
          </label>
          <label>
            Сумма пополнения
            <input
              className="field"
              type="number"
              min="100"
              max="50000"
              step="1"
              value={amount}
              onChange={(event) => {
                setAmount(Number(event.target.value));
                setQuote(null);
              }}
            />
          </label>
          <div className="notice">
            Убедитесь, что регион совпадает с регионом вашего аккаунта.
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="btn primary" disabled={pending}>
            {pending ? "Рассчитываем…" : "Рассчитать на сервере"}
          </button>
        </form>
        <aside className="summary" aria-live="polite">
          <span className="mock">Тестовый расчёт</span>
          <h2>Стоимость</h2>
          {quote ? (
            <>
              <div className="summary-row">
                <span>Курс</span>
                <b>× {quote.rate}</b>
              </div>
              <div className="summary-row">
                <span>Комиссия</span>
                <b>{rub(quote.fee)}</b>
              </div>
              <div className="summary-row">
                <strong>Итого</strong>
                <strong>{rub(quote.total)}</strong>
              </div>
              <p className="muted">
                Расчёт получен с сервера. Реальный Provider пока не подключён.
              </p>
              <button
                className="btn"
                disabled
                title="Доступно после подключения поставщика"
              >
                Переход к оплате недоступен в демо
              </button>
            </>
          ) : (
            <p className="muted">
              Заполните форму, чтобы получить серверный расчёт курса, комиссии и
              итога.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
