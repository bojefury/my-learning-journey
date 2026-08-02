"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import type { UploadState } from "./actions";

type Action = (state: UploadState, data: FormData) => Promise<UploadState>;

export function UploadForm({
  action,
  children,
  label,
}: {
  action: Action;
  children?: ReactNode;
  label: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="panel stack">
      <h2>{label}</h2>
      {children}
      <label>
        Изображение
        <input
          className="field"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          required
        />
      </label>
      {state.error && <p role="alert">{state.error}</p>}
      {state.success && <p role="status">{state.success}</p>}
      <button className="btn primary" disabled={pending}>
        {pending ? "Загрузка…" : "Загрузить"}
      </button>
    </form>
  );
}
