import { describe, expect, it } from "vitest";
import { adminAccess, isAllowed, type AppRole } from "@/lib/access-policy";

describe("administrative RBAC", () => {
  it.each([
    [undefined, false, "/login"],
    ["USER", false, "/forbidden"],
    ["MANAGER", true, undefined],
    ["ADMIN", true, undefined],
  ] as const)("handles role %s", (role, allowed, destination) => {
    expect(adminAccess(role)).toEqual(
      allowed ? { allowed: true } : { allowed: false, destination },
    );
  });

  it.each<[AppRole, boolean, boolean]>([
    ["USER", false, false],
    ["MANAGER", true, false],
    ["ADMIN", true, true],
  ])("applies the permission matrix to %s", (role, managesOrders, deletes) => {
    expect(isAllowed(role, "orders")).toBe(managesOrders);
    expect(isAllowed(role, "permanentDelete")).toBe(deletes);
    expect(isAllowed(role, "administrators")).toBe(deletes);
  });
});
