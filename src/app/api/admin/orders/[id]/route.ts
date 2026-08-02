import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAllowed } from "@/lib/rbac";

export async function PATCH() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isAllowed(session.user.role, "orders"))
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // The order mutation must be implemented together with its transactional audit entry.
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}
