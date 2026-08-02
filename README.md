# Help Store

Коммерчески ориентированный каркас магазина цифровых товаров: витрина, URL-фильтры, карточка товара, сохраняемая гостевая корзина, тестовый checkout, кабинет, admin-представление и подготовленный backend-контур.

> **Важно:** товары, отзывы, показатели, пользователи и заказы — mock data. Платёж и выдача не выполняются. Help Store не заявляет об официальной связи с Sony.

## Стек

Next.js App Router, React, strict TypeScript, Tailwind CSS 4, Zod, Prisma/PostgreSQL, Lucide, Vitest и Playwright. Framer Motion намеренно не добавлен: текущие лёгкие переходы реализуются CSS и учитывают системные настройки без дополнительного client bundle.

## Структура

- `src/app` — маршруты, metadata, API;
- `src/components` — общие и интерактивные UI-компоненты;
- `src/lib` — доменная логика, mock-каталог, provider abstractions;
- `prisma` — нормализованная схема и безопасный seed entrypoint;
- `__tests__`, `e2e` — unit и пользовательские сценарии;
- `public/brand` — технически обрезанный приложенный товарный знак;
- `docs` — архитектура, безопасность, интеграции, deployment и план.

## Требования и установка

Нужны Node.js 20+, npm 10+ и PostgreSQL 15+.

```bash
cp .env.example .env
npm install
npm run db:validate
npm run dev
```

Откройте `http://localhost:3000`. Для production: `npm run build && npm start`.

## PostgreSQL и Prisma

Создайте отдельную БД и пользователя с минимальными правами, затем задайте `DATABASE_URL`. После подключения:

```bash
npx prisma migrate dev --name init
npm run db:seed
```

Seed запрещён при `NODE_ENV=production`. Перед полноценным seed добавьте хешированные случайные development-пароли для ролей USER, MANAGER и ADMIN; слабые данные в репозиторий не включены.

## Проверки

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

## Интеграции

`PaymentProvider` и `DigitalGoodsProvider` отделяют бизнес-логику от поставщиков. Сейчас `MockPaymentProvider` возвращает только `TEST_PENDING`: он не имитирует реальную успешную оплату. Для production реализуйте подпись webhook, idempotency, сверку суммы, повторную доставку событий, возврат и журналирование. Аналогично замените `MockDigitalGoodsProvider` документированным легальным API поставщика. Подробности — в `docs/INTEGRATIONS.md`.

## Авторизация и тестовые роли

UI форм готов к Auth.js, но реальная сессия и отправка писем не подключены. До production необходимо настроить Auth.js adapter, Argon2id, подтверждение email, rate limiting, secure cookies и server-side guards. Admin-экран сейчас демонстрационный и **не должен публиковаться**, пока guards не включены.

## Бренд и mock-данные

`public/brand/help-store-logo.jpg` технически обрезан из приложенного телефонного скриншота без перерисовки знака. Для публикации владелец должен предоставить исходный PNG/SVG/WebP без интерфейса телефона и подтвердить права; замените файл, сохранив пропорции и safe area. Нейтральные обложки генерируются CSS и не используют чужие материалы. Замените mock-каталог, отзывы, метрики, контакты и юридические тексты проверенными данными.

## Ограничения текущего среза

- PostgreSQL-сервисы, Auth.js, email, rate limiter и постоянная серверная корзина спроектированы, но не подключены к UI.
- Checkout выполняет серверную Zod-валидацию и пересчёт mock-цен, но хранение заказа требует repository layer.
- Admin и кабинет содержательны, но используют mock data.
- Реальные платежи, цифровые ключи, возвраты и уведомления отсутствуют.

## Проверки, отложенные до доступности зависимостей

В среде подготовки npm registry отвечал `HTTP 403`, поэтому lockfile не был
сгенерирован, а команды Next.js, Prisma, Vitest и Playwright нельзя считать
пройденными. После восстановления доступа к registry исполнитель обязан, не
пропуская ошибки, запустить:

```bash
npm install
npm run db:validate
npm run typecheck
npm run lint
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

После успешной установки следует зафиксировать полученный `package-lock.json`.
До прохождения этих команд проект не следует публиковать.

## Перед production

Нужны: оригинал знака и права; домен и юрлица; согласованные оферта/privacy/refund; контакты и SLA; PostgreSQL; SMTP; договоры и credentials платёжного/товарного провайдеров; реальные товары, цены, остатки и изображения с лицензиями. Затем завершите auth/RBAC, миграции, аудит, мониторинг, backup/restore, CSP, webhook verification, нагрузочные и accessibility-тесты.
