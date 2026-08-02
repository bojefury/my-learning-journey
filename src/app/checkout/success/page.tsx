import Link from "next/link";
export default function Page() {
  return (
    <div className="container section">
      <div className="panel">
        <span className="mock">Тестовый режим</span>
        <h1>Заказ создан</h1>
        <p className="muted">
          Это не подтверждение реальной оплаты. Проверьте состояние
          демонстрационного заказа в кабинете.
        </p>
        <Link className="btn primary" href="/account/orders">
          История заказов
        </Link>
      </div>
    </div>
  );
}
