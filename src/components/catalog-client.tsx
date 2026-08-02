"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { products } from "@/lib/data";
import { ProductCard } from "./product-card";

const platforms = [...new Set(products.map((product) => product.platform))];
const regions = [...new Set(products.map((product) => product.region))];
const categories = [...new Set(products.map((product) => product.category))];

export function CatalogClient() {
  const params = useSearchParams();
  const router = useRouter();
  const q = (params.get("q") || "").trim().toLocaleLowerCase("ru-RU");
  const category = params.get("category") || "";
  const platform = params.get("platform") || "";
  const region = params.get("region") || "";
  const tag = params.get("tag") || "";
  const discounted = params.get("discounted") === "true";
  const sort = params.get("sort") || "popular";

  let list = products.filter(
    (product) =>
      (!q ||
        `${product.name} ${product.category} ${product.platform} ${product.region}`
          .toLocaleLowerCase("ru-RU")
          .includes(q)) &&
      (!category || product.category === category) &&
      (!platform || product.platform === platform) &&
      (!region || product.region === region) &&
      (!tag || product.tag === tag) &&
      (!discounted || Boolean(product.oldPrice)),
  );

  list = [...list].sort((a, b) => {
    if (sort === "cheap") return a.price - b.price;
    if (sort === "expensive") return b.price - a.price;
    if (sort === "discount") {
      const discountA = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
      const discountB = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
      return discountB - discountA;
    }
    if (sort === "new") return b.id.localeCompare(a.id);
    return Number(Boolean(b.oldPrice)) - Number(Boolean(a.oldPrice));
  });

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/catalog${next.size ? `?${next}` : ""}`);
  }

  function reset() {
    router.push("/catalog");
  }

  return (
    <div className="catalog-layout">
      <aside className="filters panel" aria-label="Фильтры каталога">
        <div className="filter-title">
          <b>Фильтры</b>
          <button type="button" onClick={reset}>
            Сбросить
          </button>
        </div>
        <label>
          Категория
          <select
            className="field"
            value={category}
            onChange={(event) => setParam("category", event.target.value)}
          >
            <option value="">Все категории</option>
            {categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Платформа
          <select
            className="field"
            value={platform}
            onChange={(event) => setParam("platform", event.target.value)}
          >
            <option value="">Все платформы</option>
            {platforms.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Регион
          <select
            className="field"
            value={region}
            onChange={(event) => setParam("region", event.target.value)}
          >
            <option value="">Все регионы</option>
            {regions.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label className="check-row">
          <input
            type="checkbox"
            checked={discounted}
            onChange={(event) =>
              setParam("discounted", event.target.checked ? "true" : "")
            }
          />
          Только со скидкой
        </label>
      </aside>
      <div>
        <div className="toolbar">
          <input
            className="field"
            defaultValue={params.get("q") || ""}
            onKeyDown={(event) => {
              if (event.key === "Enter")
                setParam("q", event.currentTarget.value);
            }}
            placeholder="Название, категория или платформа"
            aria-label="Поиск"
          />
          <select
            className="field"
            value={sort}
            onChange={(event) => setParam("sort", event.target.value)}
            aria-label="Сортировка"
          >
            <option value="popular">По популярности</option>
            <option value="new">По новизне</option>
            <option value="cheap">Сначала дешевле</option>
            <option value="expensive">Сначала дороже</option>
            <option value="discount">По размеру скидки</option>
          </select>
        </div>
        <div className="results-meta">
          <p className="muted" aria-live="polite">
            Найдено: {list.length}
          </p>
          {(q || category || platform || region || tag || discounted) && (
            <button className="text-button" type="button" onClick={reset}>
              Очистить параметры
            </button>
          )}
        </div>
        {list.length ? (
          <div className="product-grid">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="panel empty-state">
            <h2>Ничего не найдено</h2>
            <p className="muted">
              Измените запрос, регион или выбранную категорию.
            </p>
            <button className="btn" type="button" onClick={reset}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
