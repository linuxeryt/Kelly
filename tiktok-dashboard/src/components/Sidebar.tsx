"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "数据概览", icon: "📊" },
  { href: "/advertisers", label: "广告主管理", icon: "👥" },
  { href: "/campaigns", label: "广告计划", icon: "📋" },
  { href: "/creatives", label: "创意素材库", icon: "🎨" },
  { href: "/billing", label: "充值 & 账单", icon: "💳" },
  { href: "/reports", label: "报告中心", icon: "📈" },
];

export default function Sidebar() {
  const pathname = usePathname();

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
        {navItems.map((item) => {
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
            A
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#e0e0f0" }}>
              代理商管理员
            </div>
            <div style={{ fontSize: 10, color: "#6666aa" }}>admin@agency.com</div>
          </div>
          <Link
            href="/login"
            style={{
              marginLeft: "auto",
              fontSize: 11,
              color: "#6666aa",
              textDecoration: "none",
              padding: "4px 8px",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            退出
          </Link>
        </div>
      </div>
    </aside>
  );
}
