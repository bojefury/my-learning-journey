export default function ProfilePage() {
  return (
    <div className="container section">
      <div className="eyebrow">Личный кабинет</div>
      <h1>Профиль</h1>
      <form className="panel stack" style={{ maxWidth: 620 }}>
        <label>
          Имя
          <input className="field" defaultValue="Demo User" disabled />
        </label>
        <label>
          Email
          <input
            className="field"
            defaultValue="demo@help-store.example"
            disabled
          />
        </label>
        <p className="muted">
          Редактирование станет доступно после подключения Auth.js и PostgreSQL.
        </p>
        <button className="btn" disabled>
          Сохранить
        </button>
      </form>
    </div>
  );
}
