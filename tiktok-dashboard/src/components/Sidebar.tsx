"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { getVisibleMenus } from "@/lib/permissions";
import { roleLabels } from "@/lib/mockData";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useUser();

  // 获取当前用户可见的菜单
  const visibleMenus = currentUser ? getVisibleMenus(currentUser.role) : [];

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
          padding: "24px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #FE2C55, #010101)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              boxShadow: "0 0 12px rgba(254,44,85,0.5)",
            }}
          >
            ♪
          </div>
          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                background: "linear-gradient(135deg, #FE2C55, #25F4EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: 0.5,
              }}
            >
              TikTok Agency
            </div>
            <div style={{ fontSize: 10, color: "#6666aa", marginTop: 1 }}>
              官方一级代理平台
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {visibleMenus.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                marginBottom: 4,
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
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
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
