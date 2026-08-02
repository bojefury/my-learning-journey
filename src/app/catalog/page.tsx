import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog-client";
export const metadata = { title: "Каталог" };
export default function Catalog() {
  return (
    <div className="container">
      <div className="page-hero">
        <div className="eyebrow">Витрина</div>
        <h1>Каталог</h1>
        <p>
          Выбирайте по платформе и региону. Все товары ниже — демонстрационные и
          должны быть заменены перед запуском.
        </p>
      </div>
      <Suspense fallback={<div className="panel">Загружаем каталог…</div>}>
        <CatalogClient />
      </Suspense>
      <div className="section" />
    </div>
  );
}
