import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container section">
      <div className="panel">
        <div className="eyebrow">Ошибка 404</div>
        <h1>Страница не найдена</h1>
        <p className="muted">
          Возможно, товар был перемещён или адрес введён с ошибкой.
        </p>
        <Link className="btn primary" href="/">
          На главную
        </Link>
      </div>
    </div>
  );
}
