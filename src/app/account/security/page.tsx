export default function SecurityPage() {
  return (
    <div className="container section">
      <div className="eyebrow">Личный кабинет</div>
      <h1>Безопасность</h1>
      <div className="panel stack">
        <h2>Пароль и сеансы</h2>
        <p className="muted">
          Auth.js ещё не подключён. До этого момента изменение пароля и
          завершение сеансов недоступны.
        </p>
        <button className="btn" disabled>
          Изменить пароль
        </button>
        <button className="btn" disabled>
          Завершить другие сеансы
        </button>
      </div>
    </div>
  );
}
