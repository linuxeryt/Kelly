import { UserRole } from "./mockData";

export type ModuleKey = "dashboard" | "advertisers" | "campaigns" | "creatives" | "billing" | "reports" | "users" | "applications";
export type ActionType = "view" | "edit" | "create" | "delete";

interface MenuConfig {
  key: ModuleKey;
  label: string;
  href: string;
  icon: string;
}

export const menuItems: MenuConfig[] = [
  { key: "dashboard", label: "数据概览", href: "/dashboard", icon: "📊" },
  { key: "advertisers", label: "广告主管理", href: "/advertisers", icon: "👥" },
  { key: "applications", label: "开户申请", href: "/applications", icon: "📝" },
  { key: "campaigns", label: "广告计划", href: "/campaigns", icon: "📋" },
  { key: "creatives", label: "创意素材库", href: "/creatives", icon: "🎨" },
  { key: "billing", label: "充值 & 账单", href: "/billing", icon: "💳" },
  { key: "reports", label: "报告中心", href: "/reports", icon: "📈" },
  { key: "users", label: "用户管理", href: "/users", icon: "👤" },
];

// 角色权限矩阵
const rolePermissions: Record<UserRole, Record<ModuleKey, ActionType[]>> = {
  admin: {
    dashboard: ["view", "edit"],
    advertisers: ["view", "edit", "create", "delete"],
    applications: ["view", "edit", "create", "delete"],
    campaigns: ["view", "edit", "create", "delete"],
    creatives: ["view", "edit", "create", "delete"],
    billing: ["view", "edit", "create"],
    reports: ["view", "create"],
    users: ["view", "edit", "create", "delete"],
  },
  operator: {
    dashboard: ["view"],
    advertisers: ["view", "edit"],
    applications: ["view", "edit"],
    campaigns: ["view", "edit", "create", "delete"],
    creatives: ["view", "edit", "create", "delete"],
    billing: [],
    reports: ["view", "create"],
    users: [],
  },
  finance: {
    dashboard: ["view"],
    advertisers: [],
    applications: [],
    campaigns: [],
    creatives: [],
    billing: ["view", "edit", "create"],
    reports: ["view", "create"],
    users: [],
  },
  sales: {
    dashboard: ["view"],
    advertisers: ["view"],
    applications: [],
    campaigns: [],
    creatives: [],
    billing: [],
    reports: ["view", "create"],
    users: [],
  },
  advertiser: {
    dashboard: ["view"],
    advertisers: [],
    applications: ["view", "create"],
    campaigns: ["view"],
    creatives: ["view", "create"],
    billing: ["view"],
    reports: ["view"],
    users: [],
  },
};

// 检查是否有权限
export function hasPermission(role: UserRole, module: ModuleKey, action: ActionType = "view"): boolean {
  const permissions = rolePermissions[role]?.[module];
  return permissions?.includes(action) ?? false;
}

// 检查是否可以访问模块（至少有 view 权限）
export function canAccessModule(role: UserRole, module: ModuleKey): boolean {
  return hasPermission(role, module, "view");
}

// 获取角色可见的菜单列表
export function getVisibleMenus(role: UserRole): MenuConfig[] {
  return menuItems.filter((item) => canAccessModule(role, item.key));
}

// 角色徽章颜色
export const roleColors: Record<UserRole, { bg: string; color: string; border: string }> = {
  admin: { bg: "rgba(254,44,85,0.12)", color: "#FE2C55", border: "rgba(254,44,85,0.25)" },
  operator: { bg: "rgba(37,244,238,0.12)", color: "#25F4EE", border: "rgba(37,244,238,0.25)" },
  finance: { bg: "rgba(16,185,129,0.12)", color: "#10b981", border: "rgba(16,185,129,0.25)" },
  sales: { bg: "rgba(168,85,247,0.12)", color: "#a855f7", border: "rgba(168,85,247,0.25)" },
  advertiser: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
};
