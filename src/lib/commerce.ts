export type CartLine = {
  productId: string;
  quantity: number;
  unitPrice: number;
};
export const PROMOS = {
  WELCOME10: { percent: 10, maxDiscount: 1000 },
} as const;
export function calculateTotals(lines: CartLine[], promo?: string) {
  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const rule = promo ? PROMOS[promo as keyof typeof PROMOS] : undefined;
  const discount = rule
    ? Math.min(Math.round((subtotal * rule.percent) / 100), rule.maxDiscount)
    : 0;
  return { subtotal, discount, total: subtotal - discount };
}
export function mergeCarts(guest: CartLine[], saved: CartLine[]) {
  const map = new Map(saved.map((x) => [x.productId, { ...x }]));
  for (const line of guest) {
    const current = map.get(line.productId);
    map.set(
      line.productId,
      current
        ? {
            ...current,
            quantity: Math.min(10, current.quantity + line.quantity),
          }
        : { ...line },
    );
  }
  return [...map.values()];
}
export const transitions: Record<string, string[]> = {
  CREATED: ["AWAITING_PAYMENT", "CANCELLED"],
  AWAITING_PAYMENT: ["PAID", "PAYMENT_FAILED", "EXPIRED", "CANCELLED"],
  PAID: ["PROCESSING", "REFUND"],
  PROCESSING: ["COMPLETED", "REFUND"],
  COMPLETED: ["REFUND"],
  PAYMENT_FAILED: ["AWAITING_PAYMENT", "CANCELLED"],
  EXPIRED: [],
  CANCELLED: [],
  REFUND: [],
};
export const canTransition = (from: string, to: string) =>
  transitions[from]?.includes(to) ?? false;
export const canManage = (role: string) =>
  role === "ADMIN" || role === "MANAGER";
