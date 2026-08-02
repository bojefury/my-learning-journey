import Link from "next/link";
export default function Page() {
  return (
    <div className="container section">
      <div className="panel">
        <div className="eyebrow">Ошибка оформления</div>
        <h1>Заказ не создан</h1>
        <p className="muted">
          Товары остались в корзине. Проверьте данные и повторите попытку.
        </p>
        <Link className="btn" href="/cart">
          Вернуться в корзину
        </Link>
      </div>
    </div>
  );
}
