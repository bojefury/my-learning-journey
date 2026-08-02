export default function NotificationsPage() {
  return (
    <div className="container section">
      <div className="eyebrow">Личный кабинет</div>
      <h1>Уведомления</h1>
      <div className="panel empty-state">
        <h2>Новых уведомлений нет</h2>
        <p className="muted">
          Статусы заказов появятся здесь после подключения постоянного
          хранилища.
        </p>
      </div>
    </div>
  );
}
