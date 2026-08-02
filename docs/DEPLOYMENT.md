# Развёртывание

1. Собрать immutable image на Node.js 20+ через `npm ci && npm run build`.
2. Подключить managed PostgreSQL, применить проверенные миграции отдельным release job.
3. Передать секреты через secret manager; настроить HTTPS, CSP, rate limiter и исходящую почту.
4. Запустить health/readiness checks, централизованные логи, error tracking и метрики заказов/webhook.
5. Настроить PITR backups и проверить восстановление.
6. Выполнить smoke, Playwright, accessibility, security и rollback checks сначала в staging.

Seed и mock providers в production запрещены. Admin публикуется только после server-side RBAC.
