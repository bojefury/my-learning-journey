import Link from "next/link";

export const metadata = {
  title: "Администрирование",
  robots: { index: false, follow: false },
};

export default function Admin() {
  return (
    <div className="container">
      <div className="page-hero">
        <div className="eyebrow">Доступ: ADMIN / MANAGER</div>
        <h1>Управление магазином</h1>
        <p>
          Демонстрационное представление. В production доступ проверяется на
          сервере для каждого действия.
        </p>
      </div>
      <div className="stats">
        <div className="stat">
          <span>Тестовые заказы</span>
          <b>24</b>
        </div>
        <div className="stat">
          <span>Товары</span>
          <b>6</b>
        </div>
        <div className="stat">
          <span>Ожидают обработки</span>
          <b>3</b>
        </div>
      </div>
      <section className="section">
        <div className="section-head">
          <h2>Заказы</h2>
          <Link className="btn" href="/admin/orders">
            Все заказы
          </Link>
        </div>
        <div className="panel">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Покупатель</th>
                <th>Статус</th>
                <th>Менеджер</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DEMO-1042</td>
                <td>demo@help-store.example</td>
                <td>Ожидает оплаты</td>
                <td>Не назначен</td>
              </tr>
              <tr>
                <td>DEMO-1041</td>
                <td>user@example.test</td>
                <td>Обрабатывается</td>
                <td>Demo Manager</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <h2>Каталог</h2>
          <Link className="btn primary" href="/admin/products">
            Управление каталогом
          </Link>
          <Link className="btn" href="/admin/media">
            Логотип и изображения
          </Link>
        </div>
        <div className="panel">
          <p>
            Управление товарами, категориями, регионами, ценами, промокодами,
            баннерами и FAQ подключается через service layer. Архивирование
            используется вместо безвозвратного удаления.
          </p>
        </div>
      </section>
    </div>
  );
}
