"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { campaigns } from "@/lib/mockData";

function StatusBadge({ status }: { status: string }) {
  const cfg = {
    active: { bg: "rgba(37,244,238,0.12)", color: "#25F4EE", border: "rgba(37,244,238,0.25)", label: "投放中" },
    paused: { bg: "rgba(255,193,7,0.12)", color: "#ffc107", border: "rgba(255,193,7,0.25)", label: "已暂停" },
    inactive: { bg: "rgba(254,44,85,0.12)", color: "#FE2C55", border: "rgba(254,44,85,0.25)", label: "已结束" },
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

function BudgetBar({ spend, budget }: { spend: number; budget: number }) {
  const pct = Math.min((spend / budget) * 100, 100);
  const color = pct > 80 ? "#FE2C55" : pct > 60 ? "#ffc107" : "#25F4EE";
  return (
    <div style={{ minWidth: 120 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8888bb", marginBottom: 3 }}>
        <span>¥{spend.toLocaleString()}</span>
        <span style={{ color }}>{pct.toFixed(0)}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3 }} />
      </div>
      <div style={{ fontSize: 10, color: "#4444660", marginTop: 2 }}>预算 ¥{budget.toLocaleString()}</div>
    </div>
  );
}

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [advFilter, setAdvFilter] = useState("all");

  const uniqueAdv = Array.from(new Set(campaigns.map((c) => c.advertiser)));

  const filtered = campaigns.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.advertiser.includes(search);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    const matchAdv = advFilter === "all" || c.advertiser === advFilter;
    return matchSearch && matchStatus && matchAdv;
  });

  const totalSpend = filtered.reduce((s, c) => s + c.spend, 0);
  const totalImpressions = filtered.reduce((s, c) => s + c.impressions, 0);
  const totalClicks = filtered.reduce((s, c) => s + c.clicks, 0);
  const avgCtr = filtered.length > 0 ? (totalClicks / totalImpressions * 100).toFixed(2) : "0";

  return (
    <DashboardLayout title="广告计划管理">
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "筛选计划总消耗", value: `¥${totalSpend.toLocaleString()}`, color: "#FE2C55" },
          { label: "总曝光量", value: `${(totalImpressions / 10000).toFixed(1)}万`, color: "#25F4EE" },
          { label: "总点击量", value: totalClicks.toLocaleString(), color: "#a855f7" },
          { label: "综合 CTR", value: `${avgCtr}%`, color: "#f59e0b" },
        ].map((c) => (
          <div key={c.label} style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 11, color: "#8888bb", marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索计划名称或广告主..."
          style={{
            flex: 1, minWidth: 200, maxWidth: 280, padding: "9px 14px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none",
          }}
        />

        <select
          value={advFilter}
          onChange={(e) => setAdvFilter(e.target.value)}
          style={{
            padding: "9px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8, color: "#e0e0f0", fontSize: 12, outline: "none", cursor: "pointer",
          }}
        >
          <option value="all" style={{ background: "#14142a" }}>全部广告主</option>
          {uniqueAdv.map((a) => (
            <option key={a} value={a} style={{ background: "#14142a" }}>{a}</option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 8 }}>
          {[{ v: "all", l: "全部" }, { v: "active", l: "投放中" }, { v: "paused", l: "已暂停" }, { v: "inactive", l: "已结束" }].map((btn) => (
            <button
              key={btn.v}
              onClick={() => setStatusFilter(btn.v)}
              style={{
                padding: "7px 14px", borderRadius: 6, border: "1px solid",
                borderColor: statusFilter === btn.v ? "#FE2C55" : "rgba(255,255,255,0.1)",
                background: statusFilter === btn.v ? "rgba(254,44,85,0.15)" : "transparent",
                color: statusFilter === btn.v ? "#FE2C55" : "#8888bb",
                fontSize: 12, cursor: "pointer",
              }}
            >
              {btn.l}
            </button>
          ))}
        </div>

        <button
          style={{
            marginLeft: "auto", padding: "9px 18px",
            background: "linear-gradient(135deg, #FE2C55, #c9003e)",
            border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 2px 12px rgba(254,44,85,0.3)",
          }}
        >
          + 新建计划
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {["计划ID", "计划名称", "所属广告主", "预算消耗", "曝光", "点击", "CTR", "投放周期", "状态", "操作"].map((h) => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, color: "#6666aa", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#6666aa", fontFamily: "monospace" }}>{c.id}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#e0e0f0", fontWeight: 500, maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#9999cc" }}>{c.advertiser}</td>
                <td style={{ padding: "12px 14px" }}>
                  <BudgetBar spend={c.spend} budget={c.budget} />
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#25F4EE" }}>{(c.impressions / 10000).toFixed(1)}万</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#a855f7" }}>{c.clicks.toLocaleString()}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#f59e0b", fontWeight: 600 }}>{c.ctr}%</td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#6666aa", whiteSpace: "nowrap" }}>
                  {c.startDate}<br />至 {c.endDate}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={c.status} />
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "4px 10px", background: "rgba(37,244,238,0.1)", border: "1px solid rgba(37,244,238,0.2)", borderRadius: 4, color: "#25F4EE", fontSize: 11, cursor: "pointer" }}>
                      详情
                    </button>
                    <button style={{ padding: "4px 10px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, color: "#8888bb", fontSize: 11, cursor: "pointer" }}>
                      {c.status === "active" ? "暂停" : "启动"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px", color: "#6666aa", fontSize: 13 }}>
            暂无符合条件的广告计划
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
