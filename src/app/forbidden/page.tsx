import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="container section">
      <div className="panel empty-state">
        <div className="eyebrow">Ошибка 403</div>
        <h1>Недостаточно прав</h1>
        <p className="muted">У вашей учётной записи нет доступа к этому разделу.</p>
        <Link className="btn primary" href="/">На главную</Link>
      </div>
    </main>
  );
}
