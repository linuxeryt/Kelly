"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { getVisibleMenuGroups } from "@/lib/permissions";
import { roleLabels } from "@/lib/mockData";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useUser();

  // 获取当前用户可见的菜单分组
  const visibleMenuGroups = currentUser ? getVisibleMenuGroups(currentUser.role) : [];

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d0d1f 0%, #121228 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "20px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src="/logo.png"
            alt="PixelPro"
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              objectFit: "contain",
            }}
          />
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#e0e0f0",
                letterSpacing: 0.3,
              }}
            >
              PixelPro
            </div>
            <div style={{ fontSize: 10, color: "#6666aa", marginTop: 2 }}>
              TikTok官方一级代理
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {visibleMenuGroups.map((group) => (
          <div key={group.groupKey} style={{ marginBottom: 8 }}>
            {/* 分组标题 */}
            <div
              style={{
                padding: "8px 14px 6px",
                fontSize: 10,
                color: "#5555aa",
                fontWeight: 600,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {group.groupLabel}
            </div>
            {/* 分组菜单项 */}
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 14px",
                    borderRadius: 8,
                    marginBottom: 2,
                    textDecoration: "none",
                    color: active ? "#ffffff" : "#8888bb",
                    background: active
                      ? "linear-gradient(135deg, rgba(254,44,85,0.2), rgba(37,244,238,0.08))"
                      : "transparent",
                    borderLeft: active ? "3px solid #FE2C55" : "3px solid transparent",
                    fontWeight: active ? 600 : 400,
                    fontSize: 13,
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{ fontSize: 15 }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User info */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {currentUser ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FE2C55, #25F4EE)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                color: "white",
              }}
            >
              {currentUser.username.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e0e0f0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {currentUser.username}
              </div>
              <div style={{ fontSize: 10, color: "#6666aa" }}>
                {roleLabels[currentUser.role]}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                fontSize: 11,
                color: "#6666aa",
                background: "transparent",
                padding: "4px 8px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}
            >
              退出
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: 12,
              color: "#FE2C55",
              textDecoration: "none",
              padding: "8px",
              borderRadius: 6,
              border: "1px solid rgba(254,44,85,0.3)",
            }}
          >
            请登录
          </Link>
        )}
      </div>
    </aside>
  );
}