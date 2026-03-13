"use client";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f0f1a" }}>
      <Sidebar />
      <main style={{ marginLeft: 240, flex: 1, minHeight: "100vh" }}>
        {/* Top header */}
        <header
          style={{
            padding: "16px 28px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(13,13,31,0.8)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#e0e0f0" }}>
            {title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 12, color: "#6666aa" }}>
              {new Date().toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <div
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                background: "rgba(37,244,238,0.1)",
                border: "1px solid rgba(37,244,238,0.2)",
                fontSize: 11,
                color: "#25F4EE",
              }}
            >
              ● 系统正常
            </div>
          </div>
        </header>
        {/* Content */}
        <div style={{ padding: "24px 28px" }}>{children}</div>
      </main>
    </div>
  );
}
