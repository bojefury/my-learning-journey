"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
export function AuthForm({ mode }: { mode: "login" | "register" | "reset" }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const titles = {
    login: "Вход",
    register: "Регистрация",
    reset: "Восстановление доступа",
  };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode !== "login") return;
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const result = await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
        redirect: false,
        redirectTo: "/admin",
      });
      if (result?.error) setError("Не удалось войти. Проверьте данные и повторите попытку.");
      else window.location.assign(result?.url ?? "/admin");
    } catch {
      setError("Не удалось войти. Проверьте данные и повторите попытку.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="container section">
      <form className="panel stack" style={{ maxWidth: 480, margin: "auto" }} onSubmit={submit}>
        <div className="eyebrow">Безопасный доступ</div>
        <h1>{titles[mode]}</h1>
        <label>
          Email
          <input className="field" name="email" type="email" required autoComplete="email" />
        </label>
        {mode !== "reset" && (
          <label>
            Пароль
            <input
              className="field"
              name="password"
              type="password"
              minLength={8}
              required
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </label>
        )}
        {error && <p role="alert">{error}</p>}
        <button className="btn primary" type="submit" disabled={pending}>
          {mode === "login"
            ? pending ? "Вход…" : "Войти"
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
