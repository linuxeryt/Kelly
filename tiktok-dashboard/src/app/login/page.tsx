"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { users, roleLabels } from "@/lib/mockData";
import { roleColors } from "@/lib/permissions";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      setError("请选择登录用户");
      return;
    }
    if (!password) {
      setError("请输入密码");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    login(selectedUserId);
    setLoading(false);
    router.push("/dashboard");
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a1a 0%, #0f0f2a 50%, #150a1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background circles */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(254,44,85,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,244,238,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", width: "100%", maxWidth: 1000, margin: "0 auto", padding: "20px", gap: 0, alignItems: "center", justifyContent: "center" }}>
        {/* Left branding */}
        <div
          style={{
            flex: 1,
            padding: "60px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="hidden md:flex"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
            <img
              src="/logo.png"
              alt="PixelPro"
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                objectFit: "contain",
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#e0e0f0",
                }}
              >
                PixelPro
              </div>
              <div style={{ fontSize: 12, color: "#6666aa", marginTop: 2 }}>
                TikTok官方一级代理商
              </div>
            </div>
          </div>

          <h2
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#e0e0f0",
              lineHeight: 1.3,
              marginBottom: 20,
            }}
          >
            全面掌控您的<br />
            <span
              style={{
                background: "linear-gradient(135deg, #FE2C55, #25F4EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              广告投放业务
            </span>
          </h2>
          <p style={{ color: "#8888bb", fontSize: 14, lineHeight: 1.8, marginBottom: 40 }}>
            专为 TikTok 官方代理商打造的一站式广告主管理平台，
            实时监控投放数据，高效管理旗下广告主账户。
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: "📊", text: "实时数据监控与消耗趋势分析" },
              { icon: "👥", text: "多广告主账户集中管理" },
              { icon: "📋", text: "跨账户广告计划统一视图" },
              { icon: "📈", text: "一键生成专业报告" },
            ].map((feature) => (
              <div
                key={feature.text}
                style={{ display: "flex", alignItems: "center", gap: 12, color: "#9999cc" }}
              >
                <span style={{ fontSize: 18 }}>{feature.icon}</span>
                <span style={{ fontSize: 13 }}>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right login form */}
        <div
          style={{
            width: 400,
            background: "rgba(20, 20, 40, 0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: "40px 36px",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Mobile logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <img
              src="/logo.png"
              alt="PixelPro"
              style={{
                width: 40,
                height: 40,
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
                }}
              >
                PixelPro
              </div>
              <div style={{ fontSize: 11, color: "#6666aa" }}>代理商管理后台</div>
            </div>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#e0e0f0", marginBottom: 8, marginTop: 0 }}>
            欢迎登录
          </h3>
          <p style={{ fontSize: 13, color: "#6666aa", marginBottom: 28 }}>
            选择您的账户并输入密码
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block", fontWeight: 500 }}>
                选择用户
              </label>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#e0e0f0",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239999bb'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  backgroundSize: "16px",
                }}
              >
                <option value="" style={{ background: "#14142a", color: "#6666aa" }}>请选择登录用户...</option>
                {users.filter((u) => u.status === "active").map((user) => (
                  <option key={user.id} value={user.id} style={{ background: "#14142a", color: "#e0e0f0" }}>
                    {user.username} ({roleLabels[user.role]})
                  </option>
                ))}
              </select>
            </div>

            {selectedUser && (
              <div
                style={{
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  marginBottom: 18,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #FE2C55, #25F4EE)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {selectedUser.username.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0f0" }}>
                      {selectedUser.username}
                    </div>
                    <div style={{ fontSize: 11, color: "#6666aa" }}>{selectedUser.email}</div>
                  </div>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 600,
                      background: roleColors[selectedUser.role].bg,
                      color: roleColors[selectedUser.role].color,
                      border: `1px solid ${roleColors[selectedUser.role].border}`,
                    }}
                  >
                    {roleLabels[selectedUser.role]}
                  </span>
                </div>
              </div>
            )}

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontSize: 12, color: "#9999bb", fontWeight: 500 }}>
                  密码
                </label>
                <a
                  href="#"
                  style={{ fontSize: 12, color: "#FE2C55", textDecoration: "none" }}
                >
                  忘记密码？
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "#e0e0f0",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(254,44,85,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {error && (
              <div
                style={{
                  padding: "10px 14px",
                  background: "rgba(254,44,85,0.1)",
                  border: "1px solid rgba(254,44,85,0.3)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#FE2C55",
                  marginBottom: 16,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: loading
                  ? "rgba(254,44,85,0.4)"
                  : "linear-gradient(135deg, #FE2C55, #c9003e)",
                border: "none",
                borderRadius: 8,
                color: "white",
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: loading ? "none" : "0 4px 20px rgba(254,44,85,0.35)",
                transition: "all 0.2s",
              }}
            >
              {loading ? "登录中..." : "登 录"}
            </button>
          </form>

          <div
            style={{
              marginTop: 24,
              padding: "12px 14px",
              background: "rgba(37,244,238,0.06)",
              border: "1px solid rgba(37,244,238,0.15)",
              borderRadius: 8,
              fontSize: 11,
              color: "#5599aa",
              lineHeight: 1.6,
            }}
          >
            演示模式：选择用户后输入任意密码即可登录，不同角色可见不同菜单
          </div>

          <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: "#4444660" }}>
            <span style={{ color: "#555577" }}>遇到问题？联系 </span>
            <a href="mailto:support@agency.com" style={{ color: "#FE2C55", textDecoration: "none" }}>
              技术支持
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
