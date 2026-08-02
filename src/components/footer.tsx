import Link from "next/link";
import { Logo } from "./logo";
export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <Logo />
          <p>Цифровые товары и понятный путь от выбора до получения.</p>
          <span className="mock">Демонстрационная версия</span>
        </div>
        <div>
          <b>Магазин</b>
          <Link href="/catalog">Каталог</Link>
          <Link href="/subscriptions">Подписки</Link>
          <Link href="/gift-cards">Подарочные карты</Link>
        </div>
        <div>
          <b>Помощь</b>
          <Link href="/faq">FAQ</Link>
          <Link href="/contacts">Контакты</Link>
          <Link href="/legal/refund">Возврат</Link>
        </div>
        <div>
          <b>Документы</b>
          <Link href="/legal/terms">Соглашение</Link>
          <Link href="/legal/privacy">Конфиденциальность</Link>
          <span>support@help-store.example</span>
        </div>
      </div>
      <div className="legal">
        © 2026 Help Store. Упоминаемые товарные знаки принадлежат их владельцам.
        Help Store не заявляет об официальной связи с Sony. Способы оплаты:
        тестовые placeholders.
      </div>
    </footer>
  );
}
