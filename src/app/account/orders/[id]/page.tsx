import Link from "next/link";
export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="container section">
      <Link href="/account/orders">← Все заказы</Link>
      <div className="page-hero">
        <div className="eyebrow">Тестовый заказ</div>
        <h1>Заказ {id}</h1>
        <p>Создан 02.08.2026 · данные демонстрационные</p>
      </div>
      <div className="detail">
        <div className="panel">
          <h2>Состав</h2>
          <div className="summary-row">
            <span>Stellar Frontier × 1</span>
            <b>3 490 ₽</b>
          </div>
          <div className="notice">Регион: Турция · Платформа: PS5</div>
        </div>
        <aside className="summary">
          <h2>Статус</h2>
          <span className="mock">Ожидает тестовой оплаты</span>
          <p className="muted">Реальная оплата и выдача не выполнялись.</p>
          <button className="btn" disabled>
            Отменить — после подключения БД
          </button>
        </aside>
      </div>
    </div>
  );
}
