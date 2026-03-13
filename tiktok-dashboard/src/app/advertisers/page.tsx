"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { advertisers } from "@/lib/mockData";

type Advertiser = typeof advertisers[0];

function StatusBadge({ status }: { status: string }) {
  const cfg = {
    active: { bg: "rgba(37,244,238,0.12)", color: "#25F4EE", border: "rgba(37,244,238,0.25)", label: "投放中" },
    paused: { bg: "rgba(255,193,7,0.12)", color: "#ffc107", border: "rgba(255,193,7,0.25)", label: "已暂停" },
    inactive: { bg: "rgba(254,44,85,0.12)", color: "#FE2C55", border: "rgba(254,44,85,0.25)", label: "未激活" },
  }[status] || { bg: "rgba(255,255,255,0.05)", color: "#888", border: "rgba(255,255,255,0.1)", label: status };

  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {cfg.label}
    </span>
  );
}

function BalanceBar({ balance, total }: { balance: number; total: number }) {
  const pct = Math.min((balance / total) * 100, 100);
  const color = pct > 50 ? "#25F4EE" : pct > 20 ? "#ffc107" : "#FE2C55";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8888bb", marginBottom: 4 }}>
        <span>¥{balance.toLocaleString()}</span>
        <span>{pct.toFixed(0)}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.6s" }} />
      </div>
    </div>
  );
}

export default function AdvertisersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showRecharge, setShowRecharge] = useState<Advertiser | null>(null);
  const [amount, setAmount] = useState("");

  const filtered = advertisers.filter((a) => {
    const matchSearch = a.name.includes(search) || a.id.includes(search);
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout title="广告主账户管理">
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "总广告主数", value: advertisers.length, color: "#a855f7" },
          { label: "投放中", value: advertisers.filter((a) => a.status === "active").length, color: "#25F4EE" },
          { label: "总余额", value: `¥${advertisers.reduce((s, a) => s + a.balance, 0).toLocaleString()}`, color: "#10b981" },
          { label: "今日总消耗", value: `¥${advertisers.reduce((s, a) => s + a.todaySpend, 0).toLocaleString()}`, color: "#FE2C55" },
        ].map((c) => (
          <div
            key={c.label}
            style={{
              background: "rgba(20,20,40,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "16px 18px",
            }}
          >
            <div style={{ fontSize: 11, color: "#8888bb", marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 16,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索广告主名称或ID..."
          style={{
            flex: 1,
            minWidth: 200,
            maxWidth: 320,
            padding: "9px 14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "#e0e0f0",
            fontSize: 13,
            outline: "none",
          }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { v: "all", label: "全部" },
            { v: "active", label: "投放中" },
            { v: "paused", label: "已暂停" },
            { v: "inactive", label: "未激活" },
          ].map((btn) => (
            <button
              key={btn.v}
              onClick={() => setFilter(btn.v)}
              style={{
                padding: "7px 16px",
                borderRadius: 6,
                border: "1px solid",
                borderColor: filter === btn.v ? "#FE2C55" : "rgba(255,255,255,0.1)",
                background: filter === btn.v ? "rgba(254,44,85,0.15)" : "transparent",
                color: filter === btn.v ? "#FE2C55" : "#8888bb",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: filter === btn.v ? 600 : 400,
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <button
          style={{
            marginLeft: "auto",
            padding: "9px 18px",
            background: "linear-gradient(135deg, #FE2C55, #c9003e)",
            border: "none",
            borderRadius: 8,
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(254,44,85,0.3)",
          }}
        >
          + 新建广告主
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "rgba(20,20,40,0.8)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {["ID", "广告主名称", "账户余额", "今日消耗", "CTR", "计划数", "状态", "操作"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: 11,
                    color: "#6666aa",
                    fontWeight: 600,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((adv) => (
              <tr
                key={adv.id}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "14px 16px", fontSize: 11, color: "#6666aa", fontFamily: "monospace" }}>
                  {adv.id}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 14, color: "#e0e0f0", fontWeight: 500 }}>
                  {adv.name}
                </td>
                <td style={{ padding: "14px 16px", minWidth: 160 }}>
                  <BalanceBar balance={adv.balance} total={adv.totalBudget} />
                </td>
                <td style={{ padding: "14px 16px", fontSize: 14, color: adv.todaySpend > 0 ? "#FE2C55" : "#6666aa", fontWeight: 600 }}>
                  {adv.todaySpend > 0 ? `¥${adv.todaySpend.toLocaleString()}` : "—"}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#25F4EE" }}>
                  {adv.ctr > 0 ? `${adv.ctr}%` : "—"}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: "#e0e0f0" }}>{adv.campaigns}</td>
                <td style={{ padding: "14px 16px" }}>
                  <StatusBadge status={adv.status} />
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => setShowRecharge(adv)}
                      style={{
                        padding: "5px 12px",
                        background: "linear-gradient(135deg, #FE2C55, #c9003e)",
                        border: "none",
                        borderRadius: 5,
                        color: "white",
                        fontSize: 11,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                    >
                      充值
                    </button>
                    <button
                      style={{
                        padding: "5px 12px",
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 5,
                        color: "#9999bb",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      详情
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recharge Modal */}
      {showRecharge && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowRecharge(null)}
        >
          <div
            style={{
              background: "#14142a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "32px",
              width: 400,
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 6 }}>账户充值</div>
            <div style={{ fontSize: 13, color: "#6666aa", marginBottom: 24 }}>{showRecharge.name}</div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#9999bb", marginBottom: 6 }}>当前余额</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#25F4EE" }}>
                ¥{showRecharge.balance.toLocaleString()}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>充值金额（元）</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="请输入充值金额"
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
                }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {[5000, 10000, 20000, 50000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(String(v))}
                    style={{
                      flex: 1,
                      padding: "6px",
                      background: amount === String(v) ? "rgba(254,44,85,0.2)" : "rgba(255,255,255,0.05)",
                      border: `1px solid ${amount === String(v) ? "#FE2C55" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: 6,
                      color: amount === String(v) ? "#FE2C55" : "#8888bb",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    ¥{(v / 10000).toFixed(0)}万
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setShowRecharge(null)}
                style={{
                  flex: 1,
                  padding: "11px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  color: "#9999bb",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                取消
              </button>
              <button
                onClick={() => { alert(`已成功为「${showRecharge.name}」充值 ¥${amount}`); setShowRecharge(null); setAmount(""); }}
                style={{
                  flex: 2,
                  padding: "11px",
                  background: "linear-gradient(135deg, #FE2C55, #c9003e)",
                  border: "none",
                  borderRadius: 8,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(254,44,85,0.3)",
                }}
              >
                确认充值
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
