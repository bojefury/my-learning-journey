export const TOP_UP_RULES = {
  TR: { label: "Турция", rate: 2.4, fee: 149, min: 100, max: 50000 },
  PL: { label: "Польша", rate: 1.15, fee: 149, min: 100, max: 50000 },
} as const;

export type TopUpRegion = keyof typeof TOP_UP_RULES;

export function calculateTopUpQuote(region: TopUpRegion, amount: number) {
  const rule = TOP_UP_RULES[region];
  if (!Number.isInteger(amount) || amount < rule.min || amount > rule.max) {
    throw new Error("INVALID_AMOUNT");
  }
  const converted = Math.round(amount * rule.rate);
  return {
    region,
    amount,
    rate: rule.rate,
    fee: rule.fee,
    converted,
    total: converted + rule.fee,
    currency: "RUB" as const,
    testMode: true,
  };
}
