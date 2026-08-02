import Link from "next/link";
export default function Page() {
  return (
    <div className="container section">
      <Link href="/admin">← Dashboard</Link>
      <div className="page-hero">
        <div className="eyebrow">ADMIN / MANAGER</div>
        <h1>Orders</h1>
        <p>
          Демонстрационный административный раздел. Изменения отключены до
          подключения server-side RBAC и PostgreSQL.
        </p>
      </div>
      <div className="panel empty-state">
        <h2>Безопасный read-only режим</h2>
        <p className="muted">
          Здесь появятся проверяемые операции после реализации repository layer
          и административного аудита.
        </p>
        <button className="btn" disabled>
          Изменение недоступно
        </button>
      </div>
    </div>
  );
}
