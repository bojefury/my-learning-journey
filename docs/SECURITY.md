# Безопасность

## Реализовано в срезе

Строгий TypeScript, Zod на checkout boundary, серверный пересчёт mock-цен, idempotency key, безопасные публичные ошибки, отсутствие секретов в client bundle и запрет индексации checkout/account/admin.

## Обязательно до production

Auth.js с database adapter, Argon2id, httpOnly/secure/sameSite cookies, CSRF-защита, server-side RBAC, Redis rate limiting, CSP и security headers, webhook HMAC с постоянным временем сравнения, шифрование ключей, audit retention и redaction персональных данных. Проверять права на каждом service method. Заказ и платёж создавать транзакционно, provider events дедуплицировать по внешнему ID. Секреты хранить в secret manager, не в Git.
