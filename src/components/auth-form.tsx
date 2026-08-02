import Link from "next/link";
export function AuthForm({ mode }: { mode: "login" | "register" | "reset" }) {
  const titles = {
    login: "Вход",
    register: "Регистрация",
    reset: "Восстановление доступа",
  };
  return (
    <div className="container section">
      <form className="panel stack" style={{ maxWidth: 480, margin: "auto" }}>
        <div className="eyebrow">Безопасный доступ</div>
        <h1>{titles[mode]}</h1>
        <label>
          Email
          <input className="field" type="email" required autoComplete="email" />
        </label>
        {mode !== "reset" && (
          <label>
            Пароль
            <input
              className="field"
              type="password"
              minLength={8}
              required
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </label>
        )}
        <button className="btn primary" type="submit">
          {mode === "login"
            ? "Войти"
            : mode === "register"
              ? "Создать аккаунт"
              : "Отправить ссылку"}
        </button>
        <p className="muted">
          Форма подготовлена для Auth.js. Отправка писем в development должна
          использовать локальный адаптер.
        </p>
        {mode === "login" && (
          <>
            <Link href="/forgot-password">Забыли пароль?</Link>
            <Link href="/register">Создать аккаунт</Link>
          </>
        )}
      </form>
    </div>
  );
}
