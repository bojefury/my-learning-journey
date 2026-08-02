import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateTopUpQuote } from "@/lib/top-up";

const requestSchema = z.object({
  region: z.enum(["TR", "PL"]),
  amount: z.number().int().min(100).max(50000),
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Укажите регион и сумму от 100 до 50 000",
        },
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    data: calculateTopUpQuote(parsed.data.region, parsed.data.amount),
  });
}
