import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/data";
import { calculateTotals } from "@/lib/commerce";
import { MockPaymentProvider } from "@/lib/providers";
const schema = z.object({
  email: z.string().email(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1).max(10),
      }),
    )
    .min(1),
});
const provider = new MockPaymentProvider();
export async function POST(req: NextRequest) {
  const key = req.headers.get("idempotency-key");
  if (!key)
    return NextResponse.json(
      {
        error: {
          code: "MISSING_IDEMPOTENCY_KEY",
          message: "Требуется ключ идемпотентности",
        },
      },
      { status: 400 },
    );
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success)
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: "Проверьте данные" } },
      { status: 400 },
    );
  const lines = parsed.data.items.flatMap((i) => {
    const p = products.find((x) => x.id === i.productId);
    return p
      ? [{ productId: p.id, quantity: i.quantity, unitPrice: p.price }]
      : [];
  });
  if (lines.length !== parsed.data.items.length)
    return NextResponse.json(
      {
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Один из товаров больше недоступен",
        },
      },
      { status: 409 },
    );
  const totals = calculateTotals(lines);
  const orderId = crypto.randomUUID();
  const payment = await provider.createPayment(orderId, totals.total, key);
  return NextResponse.json(
    { orderId, totals, payment, testMode: true },
    { status: 201 },
  );
}
