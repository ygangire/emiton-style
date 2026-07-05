export const cmsRoles = ["ADMIN", "MANAGER", "EDITOR"] as const;

export type CmsRole = (typeof cmsRoles)[number];

export function canAccessCms(role?: string | null) {
  return cmsRoles.includes(role as CmsRole);
}

export function isAdmin(role?: string | null) {
  return role === "ADMIN";
}
