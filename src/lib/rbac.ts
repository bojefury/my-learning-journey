import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { adminAccess, isAllowed, type Permission } from "@/lib/access-policy";
export { isAllowed, permissions } from "@/lib/access-policy";

export async function requirePermission(permission: Permission) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const access = adminAccess(session.user.role);
  if (!access.allowed) redirect(access.destination);
  if (!isAllowed(session.user.role, permission)) redirect("/forbidden");
  return session.user;
}

export async function auditAdminAction(input: {
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, string | number | boolean | null>;
}) {
  return prisma.adminAuditLog.create({ data: input });
}
