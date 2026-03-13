"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { creatives } from "@/lib/mockData";

function CreativeStatusBadge({ status }: { status: string }) {
  const cfg = {
    approved: { bg: "rgba(37,244,238,0.12)", color: "#25F4EE", border: "rgba(37,244,238,0.25)", label: "已审核" },
    reviewing: { bg: "rgba(255,193,7,0.12)", color: "#ffc107", border: "rgba(255,193,7,0.25)", label: "审核中" },
    rejected: { bg: "rgba(254,44,85,0.12)", color: "#FE2C55", border: "rgba(254,44,85,0.25)", label: "已拒绝" },
  }[status] || { bg: "rgba(255,255,255,0.05)", color: "#888", border: "rgba(255,255,255,0.1)", label: status };

  return (
    <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
      {cfg.label}
    </span>
  );
}

export default function CreativesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const filtered = creatives.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.advertiser.includes(search);
    const matchType = typeFilter === "all" || c.type === typeFilter;
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <DashboardLayout title="创意素材库">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "素材总数", value: creatives.length, color: "#a855f7" },
          { label: "视频素材", value: creatives.filter((c) => c.type === "视频").length, color: "#FE2C55" },
          { label: "图片素材", value: creatives.filter((c) => c.type === "图片").length, color: "#25F4EE" },
          { label: "待审核", value: creatives.filter((c) => c.status === "reviewing").length, color: "#ffc107" },
        ].map((c) => (
          <div key={c.label} style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontSize: 11, color: "#8888bb", marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: c.color }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索素材名称或广告主..."
          style={{ flex: 1, minWidth: 200, maxWidth: 280, padding: "9px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none" }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          {[{ v: "all", l: "全部类型" }, { v: "视频", l: "视频" }, { v: "图片", l: "图片" }].map((btn) => (
            <button key={btn.v} onClick={() => setTypeFilter(btn.v)}
              style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid", borderColor: typeFilter === btn.v ? "#a855f7" : "rgba(255,255,255,0.1)", background: typeFilter === btn.v ? "rgba(168,85,247,0.15)" : "transparent", color: typeFilter === btn.v ? "#a855f7" : "#8888bb", fontSize: 12, cursor: "pointer" }}>
              {btn.l}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {[{ v: "all", l: "全部状态" }, { v: "approved", l: "已审核" }, { v: "reviewing", l: "审核中" }, { v: "rejected", l: "已拒绝" }].map((btn) => (
            <button key={btn.v} onClick={() => setStatusFilter(btn.v)}
              style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid", borderColor: statusFilter === btn.v ? "#FE2C55" : "rgba(255,255,255,0.1)", background: statusFilter === btn.v ? "rgba(254,44,85,0.15)" : "transparent", color: statusFilter === btn.v ? "#FE2C55" : "#8888bb", fontSize: 12, cursor: "pointer" }}>
              {btn.l}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: 3 }}>
          {([["grid", "⊞"], ["list", "☰"]] as const).map(([v, icon]) => (
            <button key={v} onClick={() => setView(v)}
              style={{ padding: "5px 10px", borderRadius: 4, border: "none", background: view === v ? "rgba(254,44,85,0.3)" : "transparent", color: view === v ? "#FE2C55" : "#8888bb", cursor: "pointer", fontSize: 14 }}>
              {icon}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowUpload(true)}
          style={{ marginLeft: "auto", padding: "9px 18px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(254,44,85,0.3)" }}>
          ↑ 上传素材
        </button>
      </div>

      {/* Grid view */}
      {view === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {filtered.map((c) => (
            <div key={c.id}
              style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(254,44,85,0.3)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}>
              {/* Thumbnail */}
              <div style={{ height: 140, background: "linear-gradient(135deg, #1a1a3e, #0f0f2a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative" }}>
                {c.thumbnail}
                <div style={{ position: "absolute", top: 8, right: 8 }}>
                  <CreativeStatusBadge status={c.status} />
                </div>
                <div style={{ position: "absolute", bottom: 8, left: 8, padding: "2px 8px", borderRadius: 4, background: "rgba(0,0,0,0.6)", fontSize: 10, color: c.type === "视频" ? "#FE2C55" : "#25F4EE", fontWeight: 600 }}>
                  {c.type} {c.duration !== "-" && `· ${c.duration}`}
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: "14px 14px 16px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0f0", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 10 }}>{c.advertiser}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8888bb" }}>
                  <span>曝光 {c.views > 0 ? `${(c.views / 10000).toFixed(1)}万` : "—"}</span>
                  <span>CTR {c.ctr > 0 ? `${c.ctr}%` : "—"}</span>
                  <span>{c.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List view */
        <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {["预览", "素材名称", "广告主", "类型", "尺寸", "曝光量", "CTR", "上传日期", "状态"].map((h) => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, color: "#6666aa", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "10px 14px", fontSize: 28 }}>{c.thumbnail}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, color: "#e0e0f0", fontWeight: 500 }}>{c.name}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "#9999cc" }}>{c.advertiser}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: c.type === "视频" ? "#FE2C55" : "#25F4EE" }}>{c.type}</td>
                  <td style={{ padding: "10px 14px", fontSize: 11, color: "#8888bb" }}>{c.size}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "#25F4EE" }}>{c.views > 0 ? `${(c.views / 10000).toFixed(1)}万` : "—"}</td>
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "#f59e0b" }}>{c.ctr > 0 ? `${c.ctr}%` : "—"}</td>
                  <td style={{ padding: "10px 14px", fontSize: 11, color: "#6666aa" }}>{c.uploadDate}</td>
                  <td style={{ padding: "10px 14px" }}><CreativeStatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px", color: "#6666aa", fontSize: 13 }}>暂无素材</div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={() => setShowUpload(false)}>
          <div style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "32px", width: 460, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 6 }}>上传素材</div>
            <div style={{ fontSize: 13, color: "#6666aa", marginBottom: 24 }}>支持视频（MP4/MOV）和图片（JPG/PNG）格式</div>

            <div style={{ border: "2px dashed rgba(254,44,85,0.3)", borderRadius: 10, padding: "40px 20px", textAlign: "center", marginBottom: 20, cursor: "pointer", background: "rgba(254,44,85,0.04)" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📁</div>
              <div style={{ fontSize: 13, color: "#9999bb", marginBottom: 4 }}>拖拽文件到此处，或点击选择文件</div>
              <div style={{ fontSize: 11, color: "#5555770" }}>最大支持 500MB · 视频最长 60 秒</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>所属广告主</label>
              <select style={{ width: "100%", padding: "9px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none" }}>
                <option style={{ background: "#14142a" }}>请选择广告主</option>
                <option style={{ background: "#14142a" }}>潮流服饰旗舰店</option>
                <option style={{ background: "#14142a" }}>数码电子专营</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowUpload(false)} style={{ flex: 1, padding: "11px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#9999bb", fontSize: 14, cursor: "pointer" }}>取消</button>
              <button onClick={() => { alert("素材上传功能即将上线！"); setShowUpload(false); }} style={{ flex: 2, padding: "11px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>确认上传</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
