"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { performanceMetrics, overallPerformance, PerformanceMetrics } from "@/lib/mockData";

type Quarter = "Q1" | "Q2" | "Q3" | "Q4";
type Year = "2025" | "2026";

export default function PerformancePage() {
  const [quarter, setQuarter] = useState<Quarter>("Q1");
  const [year, setYear] = useState<Year>("2026");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof PerformanceMetrics | "">("");

  // 筛选
  const filteredData = performanceMetrics.filter((item) => {
    if (!search) return true;
    return item.salesName.toLowerCase().includes(search.toLowerCase());
  });

  // 排序
  const sortedData = sortBy
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortBy] as number;
        const bVal = b[sortBy] as number;
        return bVal - aVal; // 降序
      })
    : filteredData;

  // 计算排名
  const getRank = (salesId: string, field: keyof PerformanceMetrics): number => {
    const sorted = [...performanceMetrics].sort((a, b) => (b[field] as number) - (a[field] as number));
    return sorted.findIndex((item) => item.salesId === salesId) + 1;
  };

  return (
    <DashboardLayout title="代理商考核">
      {/* 整体考核汇总 */}
      <div style={{ background: "linear-gradient(135deg, rgba(254,44,85,0.1), rgba(37,244,238,0.05))", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "24px 28px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e0e0f0", margin: 0 }}>
            {year}年{quarter} 代理商整体考核
          </h3>
          <div style={{ display: "flex", gap: 10 }}>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value as Year)}
              style={{ padding: "6px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e0e0f0", fontSize: 12, cursor: "pointer" }}
            >
              <option value="2026">2026年</option>
              <option value="2025">2025年</option>
            </select>
            <select
              value={quarter}
              onChange={(e) => setQuarter(e.target.value as Quarter)}
              style={{ padding: "6px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e0e0f0", fontSize: 12, cursor: "pointer" }}
            >
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>
          </div>
        </div>

        {/* 核心指标 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <MetricCard
            label="季度累计消耗"
            value={`¥${(overallPerformance.quarterSpend / 10000).toFixed(1)}万`}
            sub="目标: ¥20万"
            progress={overallPerformance.quarterSpend / 200000 * 100}
            color="#FE2C55"
          />
          <MetricCard
            label="季度新开户"
            value={overallPerformance.quarterNewAccounts}
            sub="目标: 20户"
            progress={overallPerformance.quarterNewAccounts / 20 * 100}
            color="#25F4EE"
          />
          <MetricCard
            label="新增有消耗主体"
            value={overallPerformance.quarterNewActiveEntities}
            sub="目标: 10个"
            progress={overallPerformance.quarterNewActiveEntities / 10 * 100}
            color="#10b981"
          />
          <MetricCard
            label="客户封户率"
            value={`${overallPerformance.advertiserBlockRate.toFixed(1)}%`}
            sub="警戒线: 15%"
            isWarning={overallPerformance.advertiserBlockRate > 15}
            color={overallPerformance.advertiserBlockRate > 15 ? "#FE2C55" : "#10b981"}
          />
        </div>
      </div>

      {/* 封户率详情 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* 客户封户率 */}
        <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0f0", margin: "0 0 16px 0" }}>客户封户率分布</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <RateBar label="正常客户" count={overallPerformance.totalAdvertisers - overallPerformance.blockedAdvertisers} total={overallPerformance.totalAdvertisers} color="#10b981" />
            <RateBar label="封户客户" count={overallPerformance.blockedAdvertisers} total={overallPerformance.totalAdvertisers} color="#FE2C55" />
          </div>
          <div style={{ marginTop: 16, padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "#8888bb" }}>总客户数</span>
              <span style={{ color: "#e0e0f0", fontWeight: 600 }}>{overallPerformance.totalAdvertisers}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
              <span style={{ color: "#8888bb" }}>封户率</span>
              <span style={{ color: overallPerformance.advertiserBlockRate > 15 ? "#FE2C55" : "#10b981", fontWeight: 600 }}>{overallPerformance.advertiserBlockRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* BC封户率 */}
        <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0f0", margin: "0 0 16px 0" }}>BC封户率分布</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <RateBar label="正常BC" count={overallPerformance.totalBCs - overallPerformance.blockedBCs} total={overallPerformance.totalBCs} color="#10b981" />
            <RateBar label="封户BC" count={overallPerformance.blockedBCs} total={overallPerformance.totalBCs} color="#FE2C55" />
          </div>
          <div style={{ marginTop: 16, padding: 12, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "#8888bb" }}>总BC数</span>
              <span style={{ color: "#e0e0f0", fontWeight: 600 }}>{overallPerformance.totalBCs}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
              <span style={{ color: "#8888bb" }}>封户率</span>
              <span style={{ color: overallPerformance.bcBlockRate > 20 ? "#FE2C55" : "#ffc107", fontWeight: 600 }}>{overallPerformance.bcBlockRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 季度指标统计 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
        <StatCard label="季度累计消耗" value={`¥${(overallPerformance.quarterSpend / 10000).toFixed(1)}万`} icon="💰" />
        <StatCard label="新开户数量" value={overallPerformance.quarterNewAccounts} icon="📝" />
        <StatCard label="新增主体" value={overallPerformance.quarterNewEntities} icon="🏢" />
        <StatCard label="新增APP" value={overallPerformance.quarterNewApps} icon="📱" />
        <StatCard label="有消耗APP" value={overallPerformance.quarterActiveApps} icon="✅" />
      </div>

      {/* 销售考核明细 */}
      <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0f0", margin: 0 }}>销售考核明细</h4>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索销售姓名..."
            style={{ width: 180, padding: "8px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e0e0f0", fontSize: 12, outline: "none" }}
          />
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1200 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                <Th>销售</Th>
                <Th sortable onClick={() => setSortBy(sortBy === "advertiserBlockRate" ? "" : "advertiserBlockRate")}>客户封户率</Th>
                <Th sortable onClick={() => setSortBy(sortBy === "bcBlockRate" ? "" : "bcBlockRate")}>BC封户率</Th>
                <Th sortable onClick={() => setSortBy(sortBy === "quarterSpend" ? "" : "quarterSpend")}>季度消耗</Th>
                <Th sortable onClick={() => setSortBy(sortBy === "quarterNewAccounts" ? "" : "quarterNewAccounts")}>新开户数</Th>
                <Th sortable onClick={() => setSortBy(sortBy === "quarterNewEntities" ? "" : "quarterNewEntities")}>新增主体</Th>
                <Th sortable onClick={() => setSortBy(sortBy === "quarterNewActiveEntities" ? "" : "quarterNewActiveEntities")}>有消耗主体</Th>
                <Th sortable onClick={() => setSortBy(sortBy === "quarterNewApps" ? "" : "quarterNewApps")}>新增APP</Th>
                <Th sortable onClick={() => setSortBy(sortBy === "quarterActiveApps" ? "" : "quarterActiveApps")}>有消耗APP</Th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.salesId} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #FE2C55, #25F4EE)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>
                        {item.salesName.charAt(0)}
                      </div>
                      <span style={{ color: "#e0e0f0", fontWeight: 500 }}>{item.salesName}</span>
                    </div>
                  </Td>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: item.advertiserBlockRate > 15 ? "#FE2C55" : "#10b981", fontWeight: 600 }}>
                        {item.advertiserBlockRate.toFixed(1)}%
                      </span>
                      {item.advertiserBlockRate > 15 && <span style={{ fontSize: 11 }}>⚠️</span>}
                    </div>
                    <div style={{ fontSize: 10, color: "#6666aa", marginTop: 2 }}>
                      {item.blockedAdvertisers}/{item.totalAdvertisers}户
                    </div>
                  </Td>
                  <Td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: item.bcBlockRate > 20 ? "#FE2C55" : item.bcBlockRate > 10 ? "#ffc107" : "#10b981", fontWeight: 600 }}>
                        {item.bcBlockRate.toFixed(1)}%
                      </span>
                      {item.bcBlockRate > 20 && <span style={{ fontSize: 11 }}>⚠️</span>}
                    </div>
                    <div style={{ fontSize: 10, color: "#6666aa", marginTop: 2 }}>
                      {item.blockedBCs}/{item.totalBCs}个
                    </div>
                  </Td>
                  <Td>
                    <span style={{ color: "#FE2C55", fontWeight: 600 }}>¥{(item.quarterSpend / 10000).toFixed(1)}万</span>
                    <div style={{ fontSize: 10, color: "#6666aa", marginTop: 2 }}>
                      排名 #{getRank(item.salesId, "quarterSpend")}
                    </div>
                  </Td>
                  <Td>
                    <span style={{ color: "#25F4EE", fontWeight: 600 }}>{item.quarterNewAccounts}</span>
                    <div style={{ fontSize: 10, color: "#6666aa", marginTop: 2 }}>
                      排名 #{getRank(item.salesId, "quarterNewAccounts")}
                    </div>
                  </Td>
                  <Td>
                    <span style={{ color: "#e0e0f0" }}>{item.quarterNewEntities}</span>
                  </Td>
                  <Td>
                    <span style={{ color: "#10b981", fontWeight: 500 }}>{item.quarterNewActiveEntities}</span>
                  </Td>
                  <Td>
                    <span style={{ color: "#e0e0f0" }}>{item.quarterNewApps}</span>
                  </Td>
                  <Td>
                    <span style={{ color: "#a855f7", fontWeight: 500 }}>{item.quarterActiveApps}</span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 考核标准说明 */}
      <div style={{ marginTop: 20, padding: 16, background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: "#25F4EE", margin: "0 0 12px 0" }}>考核标准</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, fontSize: 12, color: "#8888bb" }}>
          <div>
            <strong style={{ color: "#FE2C55" }}>封户率警戒线</strong>
            <div style={{ marginTop: 4 }}>客户封户率 &gt; 15% 预警</div>
            <div>BC封户率 &gt; 20% 预警</div>
          </div>
          <div>
            <strong style={{ color: "#25F4EE" }}>季度目标</strong>
            <div style={{ marginTop: 4 }}>累计消耗目标: ¥20万</div>
            <div>新开户目标: 20户</div>
          </div>
          <div>
            <strong style={{ color: "#10b981" }}>新增指标</strong>
            <div style={{ marginTop: 4 }}>有消耗主体 / 新增APP</div>
            <div>考核客户活跃度与拓展能力</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MetricCard({ label, value, sub, progress, color, isWarning }: { label: string; value: string | number; sub: string; progress?: number; color: string; isWarning?: boolean }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16 }}>
      <div style={{ fontSize: 11, color: "#8888bb", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color }}>{value}</div>
      {progress !== undefined && (
        <div style={{ marginTop: 10 }}>
          <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${Math.min(progress, 100)}%`, height: "100%", background: color, borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 10, color: "#6666aa", marginTop: 4 }}>{sub}</div>
        </div>
      )}
      {isWarning !== undefined && (
        <div style={{ fontSize: 10, color: "#6666aa", marginTop: 4 }}>
          {isWarning ? "⚠️ 超出警戒线" : "✅ 正常范围"}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 24 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 11, color: "#8888bb" }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#e0e0f0" }}>{value}</div>
      </div>
    </div>
  );
}

function RateBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = (count / total) * 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "#8888bb" }}>{label}</span>
        <span style={{ color: "#e0e0f0" }}>{count} ({pct.toFixed(0)}%)</span>
      </div>
      <div style={{ height: 8, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

function Th({ children, sortable, onClick }: { children: React.ReactNode; sortable?: boolean; onClick?: () => void }) {
  return (
    <th
      onClick={sortable ? onClick : undefined}
      style={{
        padding: "12px 14px",
        textAlign: "left",
        fontSize: 11,
        color: "#6666aa",
        fontWeight: 600,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        whiteSpace: "nowrap",
        cursor: sortable ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {children}
      {sortable && <span style={{ marginLeft: 4, opacity: 0.5 }}>↕</span>}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td style={{ padding: "14px", fontSize: 13, verticalAlign: "middle" }}>
      {children}
    </td>
  );
}