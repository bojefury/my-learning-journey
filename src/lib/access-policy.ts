export type AppRole = "USER" | "MANAGER" | "ADMIN";

export const permissions = {
  catalog: ["MANAGER", "ADMIN"],
  orders: ["MANAGER", "ADMIN"],
  audit: ["MANAGER", "ADMIN"],
  permanentDelete: ["ADMIN"],
  administrators: ["ADMIN"],
} as const satisfies Record<string, readonly AppRole[]>;

export type Permission = keyof typeof permissions;

export function isAllowed(role: AppRole | undefined, permission: Permission) {
  return Boolean(role && permissions[permission].some((allowed) => allowed === role));
}

export function adminAccess(role: AppRole | undefined) {
  if (!role) return { allowed: false, destination: "/login" } as const;
  if (!isAllowed(role, "catalog"))
    return { allowed: false, destination: "/forbidden" } as const;
  return { allowed: true } as const;
}
