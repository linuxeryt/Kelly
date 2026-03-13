"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { trendData, advertisers } from "@/lib/mockData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const kpis = [
  { label: "今日总消耗", value: "¥18,970", change: "+12.4%", up: true, icon: "💰", color: "#FE2C55" },
  { label: "今日总曝光", value: "1,516,000", change: "+8.7%", up: true, icon: "👁", color: "#25F4EE" },
  { label: "活跃广告主", value: "6", change: "共8个", up: true, icon: "👥", color: "#a855f7" },
  { label: "平均 CTR", value: "3.45%", change: "+0.3%", up: true, icon: "🎯", color: "#f59e0b" },
  { label: "活跃广告计划", value: "6", change: "共8个", up: true, icon: "📋", color: "#10b981" },
  { label: "账户余额总计", value: "¥229,950", change: "-¥18,970", up: false, icon: "💳", color: "#6366f1" },
];

const topAdvertisers = [...advertisers]
  .sort((a, b) => b.todaySpend - a.todaySpend)
  .slice(0, 5);

function KPICard({ label, value, change, up, icon, color }: typeof kpis[0]) {
  return (
    <div
      style={{
        background: "rgba(20,20,40,0.8)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12,
        padding: "20px 22px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: "#8888bb", marginBottom: 8 }}>{label}</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#e0e0f0" }}>{value}</div>
          <div
            style={{
              marginTop: 6,
              fontSize: 11,
              color: up ? "#25F4EE" : "#FE2C55",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {up ? "▲" : "▼"} {change}
          </div>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: `rgba(${color === "#FE2C55" ? "254,44,85" : color === "#25F4EE" ? "37,244,238" : color === "#a855f7" ? "168,85,247" : color === "#f59e0b" ? "245,158,11" : color === "#10b981" ? "16,185,129" : "99,102,241"},0.15)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(20,20,40,0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: "10px 14px",
          fontSize: 12,
        }}
      >
        <div style={{ color: "#9999cc", marginBottom: 6 }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
            {p.name}: {p.name === "消耗(元)" ? "¥" : ""}{p.value.toLocaleString()}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <DashboardLayout title="数据概览">
      {/* KPI Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Spend trend */}
        <div
          style={{
            background: "rgba(20,20,40,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e0e0f0" }}>消耗趋势（近7日）</div>
            <div style={{ fontSize: 11, color: "#6666aa", marginTop: 4 }}>单位：元</div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FE2C55" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: "#6666aa", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6666aa", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `¥${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="spend" name="消耗(元)" stroke="#FE2C55" fill="url(#spendGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Impressions trend */}
        <div
          style={{
            background: "rgba(20,20,40,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#e0e0f0" }}>曝光量趋势（近7日）</div>
            <div style={{ fontSize: 11, color: "#6666aa", marginTop: 4 }}>单位：次</div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#25F4EE" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#25F4EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: "#6666aa", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6666aa", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="impressions" name="曝光量" stroke="#25F4EE" fill="url(#impGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
        {/* Top advertisers table */}
        <div
          style={{
            background: "rgba(20,20,40,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e0e0f0", marginBottom: 16 }}>
            广告主消耗排行榜（今日）
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["排名", "广告主", "今日消耗", "CTR", "曝光量"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "6px 8px",
                      fontSize: 11,
                      color: "#6666aa",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      fontWeight: 500,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topAdvertisers.map((adv, i) => (
                <tr key={adv.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: "10px 8px" }}>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: i === 0 ? "#FE2C55" : i === 1 ? "#a855f7" : i === 2 ? "#f59e0b" : "rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      {i + 1}
                    </div>
                  </td>
                  <td style={{ padding: "10px 8px", fontSize: 13, color: "#ccccee" }}>{adv.name}</td>
                  <td style={{ padding: "10px 8px", fontSize: 13, color: "#FE2C55", fontWeight: 600 }}>
                    ¥{adv.todaySpend.toLocaleString()}
                  </td>
                  <td style={{ padding: "10px 8px", fontSize: 13, color: "#25F4EE" }}>{adv.ctr}%</td>
                  <td style={{ padding: "10px 8px", fontSize: 12, color: "#8888bb" }}>
                    {(adv.impressions / 10000).toFixed(1)}万
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar chart - spend by advertiser */}
        <div
          style={{
            background: "rgba(20,20,40,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            padding: "20px 24px",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e0e0f0", marginBottom: 16 }}>
            各广告主今日消耗对比
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={topAdvertisers.map((a) => ({ name: a.name.slice(0, 4) + "…", spend: a.todaySpend }))}
              margin={{ left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: "#6666aa", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6666aa", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `¥${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="spend" name="消耗(元)" fill="#FE2C55" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
