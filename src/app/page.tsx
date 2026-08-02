import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Gamepad2,
  Gift,
  Headphones,
  Layers3,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Zap,
} from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
const cats = [
  [Gamepad2, "Игры", "/catalog?category=Игры"],
  [Sparkles, "Подписки", "/subscriptions"],
  [WalletCards, "Пополнение", "/top-up"],
  [Gift, "Подарочные карты", "/gift-cards"],
  [Layers3, "Предзаказы", "/catalog?tag=Предзаказ"],
  [Zap, "Акции", "/sale"],
] as const;
export default function Home() {
  return (
    <>
      <section className="container hero">
        <div>
          <div className="eyebrow">Цифровой магазин нового поколения</div>
          <h1>
            Больше игр.
            <br />
            <em>Меньше ожидания.</em>
          </h1>
          <p>
            Игры, подписки и пополнение в одном понятном сервисе. Выберите
            регион, проверьте детали и оформите заказ без лишних шагов.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" href="/catalog">
              Открыть каталог <ArrowRight size={18} />
            </Link>
            <Link className="btn" href="/top-up">
              Пополнить баланс
            </Link>
          </div>
          <div className="trust">
            <div>
              <b>Прозрачный итог</b>
              <span>Стоимость видна до оплаты</span>
            </div>
            <div>
              <b>Поддержка</b>
              <span>Контакты доступны в заказе</span>
            </div>
            <div>
              <b>Безопасный сценарий</b>
              <span>Данные карты не хранятся</span>
            </div>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src="/api/media/logo"
            width={420}
            height={420}
            alt="Товарный знак Help Store"
            unoptimized
          />
          <span className="hero-chip one">Регион проверен</span>
          <span className="hero-chip two">Тестовый режим</span>
        </div>
      </section>
      <section className="container section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Быстрый старт</div>
            <h2>Что ищете сегодня?</h2>
          </div>
        </div>
        <div className="category-grid">
          {cats.map(([Icon, n, h]) => (
            <Link href={h} className="category" key={n}>
              <Icon />
              <b>{n}</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="container section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Выбор пользователей · mock data</div>
            <h2>Популярное</h2>
          </div>
          <Link href="/catalog">Смотреть всё →</Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 3).map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </section>
      <section className="container section">
        <div className="banner">
          <div>
            <div className="eyebrow">Пополнение баланса</div>
            <h2>
              Сначала регион.
              <br />
              Потом сумма.
            </h2>
            <p>Курс, комиссия и итог рассчитываются на сервере.</p>
          </div>
          <Link className="btn" href="/top-up">
            Рассчитать стоимость <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <section className="container section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Почему Help Store</div>
            <h2>Покупка без сюрпризов</h2>
          </div>
        </div>
        <div className="feature-grid">
          <div className="feature">
            <ShieldCheck />
            <h3>Важное — до покупки</h3>
            <p>
              Регион, платформа и формат получения заметны на карточке товара.
            </p>
          </div>
          <div className="feature">
            <RefreshCw />
            <h3>Актуальная стоимость</h3>
            <p>Сервер повторно проверяет цену перед созданием заказа.</p>
          </div>
          <div className="feature">
            <Headphones />
            <h3>История под рукой</h3>
            <p>Статусы и детали заказа собраны в личном кабинете.</p>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-head">
          <div>
            <div className="eyebrow">Три шага</div>
            <h2>Как оформить заказ</h2>
          </div>
        </div>
        <div className="steps">
          {[
            ["01", "Выберите товар", "Проверьте платформу и регион."],
            ["02", "Оформите заказ", "Укажите только необходимые контакты."],
            [
              "03",
              "Следите за статусом",
              "Тестовый заказ появится в кабинете.",
            ],
          ].map((x) => (
            <div className="step" key={x[0]}>
              <div className="eyebrow">{x[0]}</div>
              <h3>{x[1]}</h3>
              <p className="muted">{x[2]}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container section faq">
        <div className="section-head">
          <div>
            <span className="mock">Отзывы и FAQ: mock data</span>
            <h2>Частые вопросы</h2>
          </div>
        </div>
        {[
          [
            "Как выбрать регион?",
            "Он должен совпадать с регионом аккаунта. Проверьте его до оплаты.",
          ],
          [
            "Когда придёт заказ?",
            "Срок зависит от категории и отображается в деталях. В демо выдача не выполняется.",
          ],
          [
            "Это официальный магазин Sony?",
            "Нет. Help Store не заявляет об официальной связи с Sony.",
          ],
        ].map((x) => (
          <details key={x[0]}>
            <summary>{x[0]}</summary>
            <p>{x[1]}</p>
          </details>
        ))}
      </section>
      <section className="container section">
        <div className="banner">
          <h2>Готовы выбрать?</h2>
          <Link href="/catalog" className="btn">
            Перейти в каталог
          </Link>
        </div>
      </section>
    </>
  );
}
