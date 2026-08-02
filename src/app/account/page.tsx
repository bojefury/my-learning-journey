import Link from "next/link";
export const metadata = {
  title: "Личный кабинет",
  robots: { index: false, follow: false },
};
export default function Account() {
  return (
    <div className="container">
      <div className="page-hero">
        <div className="eyebrow">Демонстрационный пользователь</div>
        <h1>Личный кабинет</h1>
      </div>
      <div className="dashboard">
        <aside className="side">
          <Link href="/account">Обзор</Link>
          <Link href="/account/orders">Заказы</Link>
          <Link href="/favorites">Избранное</Link>
          <Link href="/account/profile">Профиль</Link>
          <Link href="/account/security">Безопасность</Link>
          <Link href="/account/notifications">Уведомления</Link>
          <Link href="/account/referrals">Рефералы</Link>
        </aside>
        <div>
          <div className="stats">
            <div className="stat">
              <span className="muted">Заказов</span>
              <b>1</b>
            </div>
            <div className="stat">
              <span className="muted">В обработке</span>
              <b>1</b>
            </div>
            <div className="stat">
              <span className="muted">Избранное</span>
              <b>0</b>
            </div>
          </div>
          <section className="section">
            <h2>Последние заказы</h2>
            <div className="panel">
              <table className="table">
                <thead>
                  <tr>
                    <th>Заказ</th>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#DEMO-1042</td>
                    <td>02.08.2026</td>
                    <td>
                      <span className="mock">Тест · ожидает оплаты</span>
                    </td>
                    <td>3 490 ₽</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <div className="notice">
            Персональные предложения и заказ показаны как mock data.
          </div>
        </div>
      </div>
      <div className="section" />
    </div>
  );
}
