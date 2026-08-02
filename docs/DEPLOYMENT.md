# Развёртывание

1. Собрать immutable image на Node.js 20+ через `npm ci && npm run build`.
2. Подключить managed PostgreSQL, применить проверенные миграции отдельным release job.
3. Передать `DATABASE_URL`, `AUTH_SECRET` и `BLOB_READ_WRITE_TOKEN` через secret manager; настроить HTTPS, CSP, rate limiter и исходящую почту. Токен Vercel Blob должен оставаться только на сервере.
4. Запустить health/readiness checks, централизованные логи, error tracking и метрики заказов/webhook.
5. Настроить PITR backups и проверить восстановление.
6. Выполнить smoke, Playwright, accessibility, security и rollback checks сначала в staging.

Seed и mock providers в production запрещены. Admin публикуется только после server-side RBAC.

Логотип, баннеры и изображения товаров загружаются из `/admin/media` непосредственно в Vercel Blob. В PostgreSQL хранятся только публичные URL. Перед переносом между окружениями создайте отдельное Blob-хранилище для каждого окружения и примените Prisma migration с моделью `StoreSettings`.
