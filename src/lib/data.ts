export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  platform: string;
  region: string;
  price: number;
  oldPrice?: number;
  tag: string;
  color: string;
  description: string;
};
export const products: Product[] = [
  {
    id: "1",
    slug: "stellar-frontier",
    name: "Stellar Frontier",
    category: "Игры",
    platform: "PS5",
    region: "Турция",
    price: 3490,
    oldPrice: 4290,
    tag: "Хит",
    color: "#1769ff",
    description: "Космическое приключение с исследованием далёких миров.",
  },
  {
    id: "2",
    slug: "racing-apex",
    name: "Racing Apex",
    category: "Игры",
    platform: "PS4 / PS5",
    region: "Польша",
    price: 2890,
    tag: "Новинка",
    color: "#7246ff",
    description: "Динамичные заезды, карьера и сетевые соревнования.",
  },
  {
    id: "3",
    slug: "plus-extra-90",
    name: "Подписка Extra · 90 дней",
    category: "Подписки",
    platform: "PlayStation",
    region: "Турция",
    price: 4590,
    oldPrice: 4990,
    tag: "−8%",
    color: "#0c98d7",
    description: "Демонстрационный товар подписки для выбранного региона.",
  },
  {
    id: "4",
    slug: "wallet-1000",
    name: "Карта пополнения · 1 000",
    category: "Карты",
    platform: "PlayStation",
    region: "Польша",
    price: 2390,
    tag: "Код",
    color: "#1558b0",
    description:
      "Цифровой код пополнения для аккаунта соответствующего региона.",
  },
  {
    id: "5",
    slug: "shadow-protocol",
    name: "Shadow Protocol",
    category: "Игры",
    platform: "PS5",
    region: "США",
    price: 5190,
    tag: "Предзаказ",
    color: "#d15348",
    description: "Тактический экшен в технологичном мегаполисе.",
  },
  {
    id: "6",
    slug: "family-adventure",
    name: "Family Adventure",
    category: "Игры",
    platform: "PS4 / PS5",
    region: "Турция",
    price: 1890,
    oldPrice: 2490,
    tag: "−24%",
    color: "#13a6a2",
    description: "Красочное совместное приключение для всей семьи.",
  },
];
export const rub = (n: number) =>
  new Intl.NumberFormat("ru-RU").format(n) + " ₽";
