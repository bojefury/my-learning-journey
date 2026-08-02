import Link from "next/link";
export const metadata = { title: "История заказов", robots: { index: false } };
export default function OrdersPage() {
  return (
    <div className="container section">
      <div className="eyebrow">Личный кабинет</div>
      <h1>История заказов</h1>
      <div className="panel">
        <table className="table">
          <thead>
            <tr>
              <th>Номер</th>
              <th>Дата</th>
              <th>Статус</th>
              <th>Итого</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link href="/account/orders/DEMO-1042">DEMO-1042</Link>
              </td>
              <td>02.08.2026</td>
              <td>
                <span className="mock">Тест · ожидает оплаты</span>
              </td>
              <td>3 490 ₽</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="muted">
        Показаны демонстрационные данные. Постоянное хранение заказов
        подключается через PostgreSQL repository.
      </p>
    </div>
  );
}
