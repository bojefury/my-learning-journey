import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const settings = await prisma.storeSettings.findUnique({
      where: { id: "store" },
    });
    if (settings?.logoUrl) return NextResponse.redirect(settings.logoUrl, 307);
  } catch (error) {
    console.error("Unable to load the configured logo", error);
  }
  return NextResponse.redirect(
    new URL("/brand/help-store-logo.svg", request.url),
    307,
  );
}
