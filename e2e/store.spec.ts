import { test, expect } from "@playwright/test";
test("catalog to test checkout", async ({ page }) => {
  await page.goto("/catalog");
  await page.getByRole("button", { name: /Добавить Stellar/ }).click();
  await page.getByLabel(/Корзина/).click();
  await expect(page.getByText("Stellar Frontier")).toBeVisible();
  await page.getByRole("link", { name: "Перейти к оформлению" }).click();
  await page.getByLabel("Email").fill("demo@example.test");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Создать тестовый заказ" }).click();
  await expect(page.getByText("Заказ создан")).toBeVisible();
});
test("admin view", async ({ page }) => {
  await page.goto("/admin");
  await expect(
    page.getByRole("heading", { name: "Управление магазином" }),
  ).toBeVisible();
});
