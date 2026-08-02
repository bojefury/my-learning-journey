import Link from "next/link";
export function InfoPage({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="container">
      <div className="page-hero">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {children || (
        <div className="panel">
          <h2>Раздел подготовлен к подключению данных</h2>
          <p className="muted">
            В этой демонстрационной версии содержимое нейтральное и не создаёт
            ложных обещаний. Рабочие контакты, юридические тексты и интеграции
            необходимо предоставить перед production-запуском.
          </p>
          <Link href="/catalog" className="btn primary">
            Перейти в каталог
          </Link>
        </div>
      )}
      <div className="section" />
    </div>
  );
}
