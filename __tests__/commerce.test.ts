import { describe, expect, it } from "vitest";
import {
  calculateTotals,
  canManage,
  canTransition,
  mergeCarts,
} from "../src/lib/commerce";
describe("commerce", () => {
  it("calculates and caps promo discount", () =>
    expect(
      calculateTotals(
        [{ productId: "1", quantity: 2, unitPrice: 10000 }],
        "WELCOME10",
      ),
    ).toEqual({ subtotal: 20000, discount: 1000, total: 19000 }));
  it("merges cart quantities safely", () =>
    expect(
      mergeCarts(
        [{ productId: "1", quantity: 3, unitPrice: 100 }],
        [{ productId: "1", quantity: 8, unitPrice: 100 }],
      )[0].quantity,
    ).toBe(10));
  it("enforces roles", () => {
    expect(canManage("USER")).toBe(false);
    expect(canManage("MANAGER")).toBe(true);
  });
  it("validates status transitions", () => {
    expect(canTransition("PAID", "PROCESSING")).toBe(true);
    expect(canTransition("COMPLETED", "PAID")).toBe(false);
  });
});

describe("top-up quotes", async () => {
  const { calculateTopUpQuote } = await import("../src/lib/top-up");
  it("calculates the server-owned conversion and fee", () =>
    expect(calculateTopUpQuote("TR", 1000)).toEqual({
      region: "TR",
      amount: 1000,
      rate: 2.4,
      fee: 149,
      converted: 2400,
      total: 2549,
      currency: "RUB",
      testMode: true,
    }));
  it("rejects an out-of-range amount", () =>
    expect(() => calculateTopUpQuote("PL", 99)).toThrow("INVALID_AMOUNT"));
});
