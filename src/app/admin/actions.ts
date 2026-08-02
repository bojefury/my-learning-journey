"use server";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/rbac";

export async function archiveProduct(productId: string) {
  const actor = await requirePermission("catalog");
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.product.update({
      where: { id: productId },
      data: { status: "ARCHIVED", archivedAt: new Date() },
    });
    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: "PRODUCT_ARCHIVED",
        entityType: "Product",
        entityId: productId,
      },
    });
  });
}

export async function permanentlyDeleteProduct(productId: string) {
  const actor = await requirePermission("permanentDelete");
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: "PRODUCT_DELETED",
        entityType: "Product",
        entityId: productId,
      },
    });
    await tx.product.delete({ where: { id: productId } });
  });
}

export async function changeUserRole(
  userId: string,
  role: "USER" | "MANAGER" | "ADMIN",
) {
  const actor = await requirePermission("administrators");
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.user.update({ where: { id: userId }, data: { role } });
    await tx.adminAuditLog.create({
      data: {
        actorId: actor.id,
        action: "USER_ROLE_CHANGED",
        entityType: "User",
        entityId: userId,
        metadata: { role },
      },
    });
  });
}
