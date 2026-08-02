"use client";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { useCart } from "./cart-provider";
const links = [
  ["/catalog", "Каталог"],
  ["/catalog?category=Игры", "Игры"],
  ["/subscriptions", "Подписки"],
  ["/top-up", "Пополнение"],
  ["/sale", "Акции"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const { lines } = useCart();
  const count = lines.reduce((s, l) => s + l.quantity, 0);
  return (
    <header>
      <div className="header-inner">
        <Logo />
        <nav className={open ? "open" : ""} aria-label="Основная навигация">
          {links.map(([href, label]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <form action="/catalog" className="head-search">
          <Search size={17} />
          <input
            name="q"
            aria-label="Поиск товаров"
            placeholder="Найти игру или подписку"
          />
        </form>
        <div className="head-actions">
          <Link href="/favorites" aria-label="Избранное">
            <Heart />
          </Link>
          <Link
            href="/cart"
            aria-label={`Корзина, товаров: ${count}`}
            className="cart-icon"
          >
            <ShoppingBag />
            {count > 0 && <small>{count}</small>}
          </Link>
          <Link href="/account" aria-label="Личный кабинет">
            <User />
          </Link>
          <button
            className="menu"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
