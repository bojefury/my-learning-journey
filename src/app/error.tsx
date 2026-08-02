"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container section">
      <div className="panel">
        <h1>Что-то пошло не так</h1>
        <p className="muted">
          Мы не показываем технические детали ошибки, но вы можете повторить
          попытку.
        </p>
        <button className="btn primary" onClick={reset}>
          Попробовать снова
        </button>
      </div>
    </div>
  );
}
