import { notFound } from "next/navigation";
import { products, rub } from "@/lib/data";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <div className="container">
      <section className="detail">
        <div
          className="detail-art"
          style={{
            background: `radial-gradient(circle at 70% 20%,#ffffff55,transparent 25%),linear-gradient(145deg,${p.color},#050b1c)`,
          }}
        >
          {p.name[0]}
        </div>
        <div>
          <div className="eyebrow">
            {p.category} · {p.tag}
          </div>
          <h1>{p.name}</h1>
          <p className="muted">{p.description}</p>
          <div className="detail-price">
            {rub(p.price)}{" "}
            {p.oldPrice && <del className="muted">{rub(p.oldPrice)}</del>}
          </div>
          <div className="notice">
            <b>Проверьте до покупки:</b> товар предназначен для {p.platform},
            регион аккаунта — {p.region}. Регион цифрового товара изменить
            нельзя.
          </div>
          <ProductActions product={p} />
          <div className="stack">
            <div className="panel">
              <b>Формат получения</b>
              <p className="muted">
                Цифровой товар. В демо-режиме реальная выдача не выполняется.
              </p>
            </div>
            <div className="panel">
              <b>Наличие</b>
              <p className="muted">Доступен в демонстрационном каталоге</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <h2>Описание и получение</h2>
        </div>
        <div className="feature-grid">
          <div className="feature">
            <h3>Характеристики</h3>
            <p>
              Платформа: {p.platform}
              <br />
              Регион: {p.region}
              <br />
              Тип: цифровой товар
            </p>
          </div>
          <div className="feature">
            <h3>Как получить</h3>
            <p>
              После тестовой оплаты статус появится в кабинете. Реальный
              провайдер не подключён.
            </p>
          </div>
          <div className="feature">
            <h3>Совместимость</h3>
            <p>
              Убедитесь, что платформа и регион аккаунта совпадают с карточкой
              товара.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-head">
          <h2>Похожие товары</h2>
        </div>
        <div className="product-grid">
          {products
            .filter((x) => x.id !== p.id)
            .slice(0, 3)
            .map((x) => (
              <ProductCard key={x.id} product={x} />
            ))}
        </div>
      </section>
    </div>
  );
}
