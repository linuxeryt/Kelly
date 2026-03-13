"use client";
import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useUser } from "@/contexts/UserContext";
import {
  reportDataByDate,
  reportDataByAdvertiser,
  reportDataByCampaign,
  reportDataByPlatform,
  dimensionConfigs,
  metricConfigs,
  metricCategoryLabels,
  ReportRow,
  DimensionKey,
  MetricKey,
  MetricCategory,
} from "@/lib/mockData";

export default function AnalyticsPage() {
  const { currentUser } = useUser();
  const isAdvertiser = currentUser?.role === "advertiser";
  const userAdvertiserId = isAdvertiser ? currentUser?.bindAdvertiserId : null;

  // 筛选状态
  const [dateRange, setDateRange] = useState("7d");
  const [search, setSearch] = useState("");

  // 自定义维度选择
  const [selectedDimension, setSelectedDimension] = useState<DimensionKey>("date");

  // 自定义指标选择
  const [selectedMetrics, setSelectedMetrics] = useState<MetricKey[]>([
    "impressions", "clicks", "ctr", "spend", "conversions", "roas"
  ]);
  const [showMetricSelector, setShowMetricSelector] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MetricCategory | "all">("all");

  // 获取数据
  const getData = (): ReportRow[] => {
    let data: ReportRow[] = [];
    switch (selectedDimension) {
      case "date":
        data = reportDataByDate;
        break;
      case "advertiser":
        data = reportDataByAdvertiser;
        break;
      case "campaign":
        data = reportDataByCampaign;
        break;
      case "platform":
        data = reportDataByPlatform;
        break;
      default:
        data = reportDataByAdvertiser;
    }

    // 广告主只能看自己的数据
    if (userAdvertiserId && selectedDimension !== "date") {
      data = data.filter((d) => d.advertiserId === userAdvertiserId);
    }

    return data;
  };

  const data = getData();

  // 筛选
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (
        item.advertiserName?.toLowerCase().includes(searchLower) ||
        item.campaignName?.toLowerCase().includes(searchLower) ||
        item.date?.includes(searchLower) ||
        item.platform?.toLowerCase().includes(searchLower)
      );
    });
  }, [data, search]);

  // 计算汇总
  const summary = useMemo(() => {
    const sum: Record<string, number> = {};
    selectedMetrics.forEach((key) => {
      sum[key] = filteredData.reduce((s, d) => s + (Number(d[key]) || 0), 0);
    });
    // 计算率值
    if (sum.impressions > 0) {
      sum.ctr = (sum.clicks / sum.impressions) * 100;
    }
    if (sum.clicks > 0) {
      sum.conversionRate = (sum.conversions / sum.clicks) * 100;
    }
    if (sum.clicks > 0) {
      sum.cpc = sum.spend / sum.clicks;
    }
    if (sum.impressions > 0) {
      sum.cpm = (sum.spend / sum.impressions) * 1000;
    }
    if (sum.conversions > 0) {
      sum.costPerConversion = sum.spend / sum.conversions;
      sum.cpa = sum.spend / sum.conversions;
    }
    if (sum.spend > 0) {
      sum.roas = sum.conversionValue / sum.spend;
    }
    if (sum.videoViews > 0 && sum.impressions > 0) {
      sum.videoViewRate = (sum.videoViews / sum.impressions) * 100;
    }
    if (sum.videoViews > 0) {
      sum.completionRate = (filteredData.reduce((s, d) => s + (Number(d.completionRate) || 0), 0) / filteredData.length);
      sum.avgWatchTime = filteredData.reduce((s, d) => s + (Number(d.avgWatchTime) || 0), 0) / filteredData.length;
    }
    if (sum.impressions > 0 && sum.reach > 0) {
      sum.frequency = sum.impressions / sum.reach;
    }
    return sum;
  }, [filteredData, selectedMetrics]);

  // 切换指标选择
  const toggleMetric = (key: MetricKey) => {
    if (selectedMetrics.includes(key)) {
      if (selectedMetrics.length > 1) {
        setSelectedMetrics(selectedMetrics.filter((m) => m !== key));
      }
    } else {
      if (selectedMetrics.length < 10) {
        setSelectedMetrics([...selectedMetrics, key]);
      } else {
        alert("最多选择10个指标");
      }
    }
  };

  // 快速选择指标预设
  const metricPresets: { name: string; metrics: MetricKey[] }[] = [
    { name: "基础投放", metrics: ["impressions", "clicks", "ctr", "cpc", "cpm", "spend"] },
    { name: "转化效果", metrics: ["conversions", "conversionRate", "costPerConversion", "conversionValue", "roas"] },
    { name: "视频表现", metrics: ["videoViews", "videoViewRate", "avgWatchTime", "completionRate"] },
    { name: "互动数据", metrics: ["likes", "comments", "shares", "follows", "profileVisits"] },
    { name: "电商转化", metrics: ["productClicks", "addToCart", "checkouts", "purchases", "purchaseValue"] },
  ];

  // 获取维度值显示
  const getDimensionValue = (row: ReportRow): string => {
    switch (selectedDimension) {
      case "date":
        return row.date;
      case "advertiser":
        return row.advertiserName;
      case "adAccount":
        return row.adAccountName || "-";
      case "campaign":
        return row.campaignName;
      case "adGroup":
        return row.adGroupName || "-";
      case "creative":
        return row.creativeName || "-";
      case "platform":
        return row.platform;
      case "country":
        return row.country || "-";
      case "placement":
        return row.placement || "-";
      case "os":
        return row.os || "-";
      default:
        return "-";
    }
  };

  // 获取指标配置
  const getMetricConfig = (key: MetricKey) => {
    return metricConfigs.find((m) => m.key === key);
  };

  return (
    <DashboardLayout title="数据报表">
      {/* 顶部操作栏 */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* 维度选择 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, color: "#8888bb" }}>分析维度</span>
          <select
            value={selectedDimension}
            onChange={(e) => setSelectedDimension(e.target.value as DimensionKey)}
            style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, cursor: "pointer", minWidth: 140 }}
          >
            {dimensionConfigs.map((d) => (
              <option key={d.key} value={d.key}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* 时间范围 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, color: "#8888bb" }}>时间范围</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, cursor: "pointer" }}
          >
            <option value="today">今日</option>
            <option value="yesterday">昨日</option>
            <option value="7d">近7天</option>
            <option value="14d">近14天</option>
            <option value="30d">近30天</option>
            <option value="quarter">本季度</option>
          </select>
        </div>

        {/* 搜索 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 180 }}>
          <span style={{ fontSize: 11, color: "#8888bb" }}>搜索</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`搜索${dimensionConfigs.find((d) => d.key === selectedDimension)?.label || ""}...`}
            style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none" }}
          />
        </div>

        {/* 指标选择按钮 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, color: "#8888bb" }}>指标设置</span>
          <button
            onClick={() => setShowMetricSelector(!showMetricSelector)}
            style={{ padding: "8px 16px", background: showMetricSelector ? "rgba(37,244,238,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${showMetricSelector ? "#25F4EE" : "rgba(255,255,255,0.15)"}`, borderRadius: 8, color: showMetricSelector ? "#25F4EE" : "#e0e0f0", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            <span>自定义指标</span>
            <span style={{ background: "rgba(254,44,85,0.2)", color: "#FE2C55", padding: "2px 6px", borderRadius: 4, fontSize: 11 }}>{selectedMetrics.length}</span>
          </button>
        </div>

        {/* 导出按钮 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 11, color: "#8888bb" }}>操作</span>
          <button
            onClick={() => alert("导出功能开发中...")}
            style={{ padding: "8px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, cursor: "pointer" }}
          >
            导出报表
          </button>
        </div>
      </div>

      {/* 指标选择面板 */}
      {showMetricSelector && (
        <div style={{ background: "rgba(20,20,40,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0f0", margin: 0 }}>自定义指标 (已选 {selectedMetrics.length}/10)</h4>
            <button onClick={() => setShowMetricSelector(false)} style={{ background: "transparent", border: "none", color: "#8888bb", cursor: "pointer", fontSize: 18 }}>×</button>
          </div>

          {/* 快速预设 */}
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: "#8888bb", marginRight: 8 }}>快速选择：</span>
            {metricPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSelectedMetrics(preset.metrics)}
                style={{ padding: "4px 10px", marginRight: 6, marginBottom: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, color: "#e0e0f0", fontSize: 11, cursor: "pointer" }}
              >
                {preset.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedMetrics(["impressions", "clicks", "ctr", "spend", "conversions", "roas"])}
              style={{ padding: "4px 10px", marginRight: 6, marginBottom: 6, background: "rgba(254,44,85,0.1)", border: "1px solid rgba(254,44,85,0.3)", borderRadius: 4, color: "#FE2C55", fontSize: 11, cursor: "pointer" }}
            >
              重置默认
            </button>
          </div>

          {/* 分类标签 */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveCategory("all")}
              style={{ padding: "6px 12px", background: activeCategory === "all" ? "rgba(254,44,85,0.15)" : "rgba(255,255,255,0.05)", border: "none", borderRadius: 6, color: activeCategory === "all" ? "#FE2C55" : "#8888bb", fontSize: 12, cursor: "pointer" }}
            >
              全部
            </button>
            {(Object.keys(metricCategoryLabels) as MetricCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ padding: "6px 12px", background: activeCategory === cat ? "rgba(37,244,238,0.15)" : "rgba(255,255,255,0.05)", border: "none", borderRadius: 6, color: activeCategory === cat ? "#25F4EE" : "#8888bb", fontSize: 12, cursor: "pointer" }}
              >
                {metricCategoryLabels[cat]}
              </button>
            ))}
          </div>

          {/* 指标列表 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {metricConfigs
              .filter((m) => activeCategory === "all" || m.category === activeCategory)
              .map((metric) => {
                const isSelected = selectedMetrics.includes(metric.key);
                return (
                  <button
                    key={metric.key}
                    onClick={() => toggleMetric(metric.key)}
                    style={{
                      padding: "10px 12px",
                      background: isSelected ? "rgba(254,44,85,0.1)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isSelected ? "rgba(254,44,85,0.3)" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: 8,
                      color: isSelected ? "#FE2C55" : "#e0e0f0",
                      fontSize: 12,
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ width: 16, height: 16, borderRadius: 4, border: `1px solid ${isSelected ? "#FE2C55" : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>
                      {isSelected && "✓"}
                    </span>
                    {metric.label}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* 汇总卡片 */}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(selectedMetrics.length, 6)}, 1fr)`, gap: 12, marginBottom: 20 }}>
        {selectedMetrics.slice(0, 6).map((key) => {
          const config = getMetricConfig(key);
          if (!config) return null;
          const value = summary[key] || 0;
          return (
            <div key={key} style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "#8888bb", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{config.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: key === "spend" ? "#FE2C55" : key === "roas" ? "#10b981" : "#e0e0f0" }}>{config.format(value)}</div>
            </div>
          );
        })}
      </div>

      {/* 数据表格 */}
      <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                <Th>{dimensionConfigs.find((d) => d.key === selectedDimension)?.label || "维度"}</Th>
                {selectedMetrics.map((key) => {
                  const config = getMetricConfig(key);
                  return <Th key={key} alignRight>{config?.label || key}</Th>;
                })}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <Td highlight>{getDimensionValue(row)}</Td>
                  {selectedMetrics.map((key) => {
                    const config = getMetricConfig(key);
                    const value = row[key];
                    return (
                      <Td key={key} alignRight>
                        {config ? config.format(Number(value) || 0) : value}
                      </Td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                <Td bold>合计/平均</Td>
                {selectedMetrics.map((key) => {
                  const config = getMetricConfig(key);
                  const value = summary[key] || 0;
                  return <Td key={key} alignRight bold>{config ? config.format(value) : "-"}</Td>;
                })}
              </tr>
            </tfoot>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#6666aa", fontSize: 13 }}>
            暂无数据
          </div>
        )}
      </div>

      {/* 数据说明 */}
      <div style={{ marginTop: 16, padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 8, fontSize: 11, color: "#6666aa" }}>
        数据更新时间：{new Date().toLocaleString("zh-CN")} | 数据仅供参考，以TikTok广告后台数据为准
      </div>
    </DashboardLayout>
  );
}

function Th({ children, alignRight }: { children: React.ReactNode; alignRight?: boolean }) {
  return (
    <th style={{
      padding: "12px 14px",
      textAlign: alignRight ? "right" : "left",
      fontSize: 11,
      color: "#6666aa",
      fontWeight: 600,
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      whiteSpace: "nowrap",
    }}>
      {children}
    </th>
  );
}

function Td({ children, highlight, alignRight, bold }: { children: React.ReactNode; highlight?: boolean; alignRight?: boolean; bold?: boolean }) {
  return (
    <td style={{
      padding: "12px 14px",
      fontSize: 13,
      color: highlight ? "#e0e0f0" : alignRight ? "#e0e0f0" : "#9999bb",
      fontWeight: bold ? 600 : highlight ? 500 : 400,
      textAlign: alignRight ? "right" : "left",
      whiteSpace: "nowrap",
    }}>
      {children}
    </td>
  );
}