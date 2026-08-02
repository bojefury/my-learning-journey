import type { ReactNode } from "react";
import { requirePermission } from "@/lib/rbac";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requirePermission("catalog");
  return children;
}
