"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { advertisers, trendData } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

type ReportType = "daily" | "monthly" | "reconciliation";

const reportTypes: { key: ReportType; label: string; icon: string; desc: string }[] = [
  { key: "daily", label: "每日报告", icon: "📅", desc: "当日广告投放汇总数据" },
  { key: "monthly", label: "月度报告", icon: "📆", desc: "当月完整广告表现报告" },
  { key: "reconciliation", label: "对账报告", icon: "📊", desc: "充值与消耗对账单" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ color: string; name: string; value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(20,20,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
        <div style={{ color: "#9999cc", marginBottom: 6 }}>{label}</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>{p.name}: {p.value.toLocaleString()}</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<ReportType>("daily");
  const [dateRange, setDateRange] = useState({ start: "2026-03-01", end: "2026-03-13" });
  const [selectedAdvs, setSelectedAdvs] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggleAdv = (id: string) => {
    setSelectedAdvs((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerated(false);
    await new Promise((r) => setTimeout(r, 1500));
    setGenerating(false);
    setGenerated(true);
  };

  const reportData = advertisers
    .filter((a) => selectedAdvs.length === 0 || selectedAdvs.includes(a.id))
    .map((a) => ({ name: a.name.slice(0, 4), spend: a.todaySpend, impressions: Math.round(a.impressions / 1000), ctr: a.ctr }));

  return (
    <DashboardLayout title="报告中心">
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
        {/* Left: config panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Report type */}
          <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0f0", marginBottom: 14 }}>报告类型</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {reportTypes.map((r) => (
                <div key={r.key} onClick={() => { setSelectedType(r.key); setGenerated(false); }}
                  style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid", borderColor: selectedType === r.key ? "#FE2C55" : "rgba(255,255,255,0.08)", background: selectedType === r.key ? "rgba(254,44,85,0.1)" : "rgba(255,255,255,0.02)", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{r.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: selectedType === r.key ? "#FE2C55" : "#e0e0f0" }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: "#6666aa", marginTop: 2 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0f0", marginBottom: 14 }}>日期范围</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ fontSize: 11, color: "#8888bb", display: "block", marginBottom: 4 }}>开始日期</label>
                <input type="date" value={dateRange.start} onChange={(e) => setDateRange((p) => ({ ...p, start: e.target.value }))}
                  style={{ width: "100%", padding: "8px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e0e0f0", fontSize: 13, outline: "none", boxSizing: "border-box", colorScheme: "dark" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: "#8888bb", display: "block", marginBottom: 4 }}>结束日期</label>
                <input type="date" value={dateRange.end} onChange={(e) => setDateRange((p) => ({ ...p, end: e.target.value }))}
                  style={{ width: "100%", padding: "8px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e0e0f0", fontSize: 13, outline: "none", boxSizing: "border-box", colorScheme: "dark" }} />
              </div>
            </div>
          </div>

          {/* Advertiser filter */}
          <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0f0" }}>广告主筛选</div>
              <button onClick={() => setSelectedAdvs([])} style={{ fontSize: 11, color: "#FE2C55", background: "none", border: "none", cursor: "pointer" }}>清除</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 200, overflowY: "auto" }}>
              {advertisers.map((a) => (
                <label key={a.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 8px", borderRadius: 6, background: selectedAdvs.includes(a.id) ? "rgba(254,44,85,0.08)" : "transparent" }}>
                  <input type="checkbox" checked={selectedAdvs.includes(a.id)} onChange={() => toggleAdv(a.id)}
                    style={{ accentColor: "#FE2C55", width: 14, height: 14 }} />
                  <span style={{ fontSize: 12, color: selectedAdvs.includes(a.id) ? "#e0e0f0" : "#9999bb" }}>{a.name}</span>
                </label>
              ))}
            </div>
            {selectedAdvs.length === 0 && <div style={{ fontSize: 11, color: "#5555770", marginTop: 8 }}>留空则包含全部广告主</div>}
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{ padding: "14px", background: generating ? "rgba(254,44,85,0.4)" : "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 10, color: "white", fontSize: 15, fontWeight: 700, cursor: generating ? "not-allowed" : "pointer", boxShadow: generating ? "none" : "0 4px 20px rgba(254,44,85,0.35)", transition: "all 0.2s" }}>
            {generating ? "⏳ 生成中..." : "🚀 一键生成报告"}
          </button>
        </div>

        {/* Right: report preview */}
        <div>
          {!generated && !generating && (
            <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "60px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>📈</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 8 }}>选择报告配置</div>
              <div style={{ fontSize: 13, color: "#6666aa" }}>在左侧选择报告类型、日期范围和广告主后，点击"一键生成报告"</div>
            </div>
          )}

          {generating && (
            <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "60px 40px", textAlign: "center" }}>
              <div style={{ fontSize: 50, marginBottom: 16, animation: "spin 1s linear infinite" }}>⚙️</div>
              <div style={{ fontSize: 16, color: "#e0e0f0", marginBottom: 8 }}>正在生成报告...</div>
              <div style={{ fontSize: 12, color: "#6666aa" }}>正在汇总广告数据，请稍候</div>
            </div>
          )}

          {generated && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Report header */}
              <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 20 }}>{reportTypes.find((r) => r.key === selectedType)?.icon}</span>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0" }}>
                        {reportTypes.find((r) => r.key === selectedType)?.label}
                      </div>
                      <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 11, background: "rgba(37,244,238,0.12)", color: "#25F4EE", border: "1px solid rgba(37,244,238,0.25)" }}>已生成</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6666aa" }}>
                      数据周期：{dateRange.start} 至 {dateRange.end} ·
                      广告主：{selectedAdvs.length === 0 ? "全部" : `${selectedAdvs.length}个`}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={{ padding: "8px 16px", background: "rgba(37,244,238,0.1)", border: "1px solid rgba(37,244,238,0.2)", borderRadius: 7, color: "#25F4EE", fontSize: 12, cursor: "pointer" }}>
                      📋 复制链接
                    </button>
                    <button style={{ padding: "8px 16px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 7, color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      ⬇️ 导出 Excel
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[
                  { label: "总消耗", value: "¥18,970", color: "#FE2C55" },
                  { label: "总曝光", value: "151.6万", color: "#25F4EE" },
                  { label: "总点击", value: "54,139", color: "#a855f7" },
                  { label: "平均CTR", value: "3.57%", color: "#f59e0b" },
                ].map((m) => (
                  <div key={m.label} style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "#8888bb", marginBottom: 6 }}>{m.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "18px 20px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0f0", marginBottom: 14 }}>消耗趋势</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fill: "#6666aa", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6666aa", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `¥${v / 1000}k`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="spend" name="消耗" stroke="#FE2C55" strokeWidth={2} dot={{ fill: "#FE2C55", r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "18px 20px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0f0", marginBottom: 14 }}>广告主消耗分布</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={reportData} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" tick={{ fill: "#6666aa", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#6666aa", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="spend" name="消耗(元)" fill="#FE2C55" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detail table */}
              <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13, fontWeight: 600, color: "#e0e0f0" }}>
                  广告主明细数据
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                      {["广告主", "消耗金额", "曝光量", "点击量", "CTR", "计划数"].map((h) => (
                        <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: "#6666aa", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {advertisers
                      .filter((a) => selectedAdvs.length === 0 || selectedAdvs.includes(a.id))
                      .map((a) => (
                        <tr key={a.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "11px 16px", fontSize: 13, color: "#e0e0f0" }}>{a.name}</td>
                          <td style={{ padding: "11px 16px", fontSize: 13, color: "#FE2C55", fontWeight: 600 }}>
                            {a.todaySpend > 0 ? `¥${a.todaySpend.toLocaleString()}` : "—"}
                          </td>
                          <td style={{ padding: "11px 16px", fontSize: 12, color: "#25F4EE" }}>
                            {a.impressions > 0 ? `${(a.impressions / 10000).toFixed(1)}万` : "—"}
                          </td>
                          <td style={{ padding: "11px 16px", fontSize: 12, color: "#a855f7" }}>
                            {a.impressions > 0 ? Math.round(a.impressions * a.ctr / 100).toLocaleString() : "—"}
                          </td>
                          <td style={{ padding: "11px 16px", fontSize: 12, color: "#f59e0b" }}>
                            {a.ctr > 0 ? `${a.ctr}%` : "—"}
                          </td>
                          <td style={{ padding: "11px 16px", fontSize: 12, color: "#9999cc" }}>{a.campaigns}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
