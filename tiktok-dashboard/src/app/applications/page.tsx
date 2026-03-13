"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useUser } from "@/contexts/UserContext";
import {
  accountApplications as initialApplications,
  AccountApplication,
  InternalReviewStatus,
  MediaReviewStatus,
  internalStatusLabels,
  mediaStatusLabels,
  advertisers,
  businessCenters,
  users,
} from "@/lib/mockData";
import { hasPermission } from "@/lib/permissions";

function InternalStatusBadge({ status }: { status: InternalReviewStatus }) {
  const cfg = {
    pending: { bg: "rgba(245,158,11,0.12)", color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
    approved: { bg: "rgba(37,244,238,0.12)", color: "#25F4EE", border: "rgba(37,244,238,0.25)" },
    rejected: { bg: "rgba(254,44,85,0.12)", color: "#FE2C55", border: "rgba(254,44,85,0.25)" },
  }[status];
  return (
    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
      {internalStatusLabels[status]}
    </span>
  );
}

function MediaStatusBadge({ status }: { status: MediaReviewStatus }) {
  const cfg = {
    reviewing: { bg: "rgba(168,85,247,0.12)", color: "#a855f7", border: "rgba(168,85,247,0.25)" },
    approved: { bg: "rgba(16,185,129,0.12)", color: "#10b981", border: "rgba(16,185,129,0.25)" },
    rejected: { bg: "rgba(254,44,85,0.12)", color: "#FE2C55", border: "rgba(254,44,85,0.25)" },
  }[status];
  return (
    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
      {mediaStatusLabels[status]}
    </span>
  );
}

export default function ApplicationsPage() {
  const { currentUser } = useUser();
  const [applications, setApplications] = useState<AccountApplication[]>(initialApplications);
  const [search, setSearch] = useState("");
  const [internalFilter, setInternalFilter] = useState<InternalReviewStatus | "all">("all");
  const [mediaFilter, setMediaFilter] = useState<MediaReviewStatus | "all">("all");
  const [showModal, setShowModal] = useState(false);
  const [editingApp, setEditingApp] = useState<AccountApplication | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    accountName: "",
    bcId: "",
    remark: "",
  });

  const isAdvertiser = currentUser?.role === "advertiser";
  const canEdit = currentUser ? hasPermission(currentUser.role, "applications", "edit") : false;

  // 广告主只能看自己的申请
  const userAdvertiserId = isAdvertiser ? currentUser?.bindAdvertiserId : null;

  const filtered = applications.filter((app) => {
    if (userAdvertiserId && app.advertiserId !== userAdvertiserId) return false;
    const matchSearch =
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.companyName.toLowerCase().includes(search.toLowerCase()) ||
      app.accountName.toLowerCase().includes(search.toLowerCase()) ||
      app.bcId.toLowerCase().includes(search.toLowerCase());
    const matchInternal = internalFilter === "all" || app.internalStatus === internalFilter;
    const matchMedia = mediaFilter === "all" || app.mediaStatus === mediaFilter;
    return matchSearch && matchInternal && matchMedia;
  });

  const getApplicantName = (userId: string) => users.find((u) => u.id === userId)?.username || "-";
  const getAdvertiserName = (advId: string) => advertisers.find((a) => a.id === advId)?.name || "-";

  // 广告主可绑定的BC列表
  const availableBCs = userAdvertiserId
    ? businessCenters.filter((bc) => bc.advertiserId === userAdvertiserId)
    : businessCenters;

  const openCreateModal = () => {
    setEditingApp(null);
    const advertiser = userAdvertiserId ? advertisers.find((a) => a.id === userAdvertiserId) : null;
    setFormData({
      companyName: advertiser?.companyName || "",
      accountName: "",
      bcId: "",
      remark: "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.companyName || !formData.accountName || !formData.bcId) {
      alert("请填写完整信息");
      return;
    }
    const newApp: AccountApplication = {
      id: `APP${String(applications.length + 1).padStart(3, "0")}`,
      advertiserId: userAdvertiserId || "",
      applicantId: currentUser?.id || "",
      companyName: formData.companyName,
      accountName: formData.accountName,
      bcId: formData.bcId,
      internalStatus: "pending",
      mediaStatus: "reviewing",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      updatedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      remark: formData.remark || undefined,
    };
    setApplications([...applications, newApp]);
    setShowModal(false);
  };

  const updateInternalStatus = (appId: string, status: InternalReviewStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === appId
          ? { ...app, internalStatus: status, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 16) }
          : app
      )
    );
  };

  const updateMediaStatus = (appId: string, status: MediaReviewStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === appId
          ? { ...app, mediaStatus: status, updatedAt: new Date().toISOString().replace("T", " ").slice(0, 16) }
          : app
      )
    );
  };

  // Stats
  const stats = {
    total: filtered.length,
    pending: filtered.filter((a) => a.internalStatus === "pending").length,
    approved: filtered.filter((a) => a.internalStatus === "approved").length,
    mediaApproved: filtered.filter((a) => a.mediaStatus === "approved").length,
  };

  return (
    <DashboardLayout title="开户申请">
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "总申请数", value: stats.total, color: "#a855f7" },
          { label: "待确认", value: stats.pending, color: "#f59e0b" },
          { label: "内部通过", value: stats.approved, color: "#25F4EE" },
          { label: "媒体通过", value: stats.mediaApproved, color: "#10b981" },
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
          placeholder="搜索申请编号/开户主体/账户名称/BC ID..."
          style={{ flex: 1, minWidth: 240, maxWidth: 360, padding: "9px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none" }}
        />
        <select
          value={internalFilter}
          onChange={(e) => setInternalFilter(e.target.value as InternalReviewStatus | "all")}
          style={{ padding: "9px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none", cursor: "pointer" }}
        >
          <option value="all">内部审核: 全部</option>
          <option value="pending">待确认</option>
          <option value="approved">通过</option>
          <option value="rejected">未通过</option>
        </select>
        <select
          value={mediaFilter}
          onChange={(e) => setMediaFilter(e.target.value as MediaReviewStatus | "all")}
          style={{ padding: "9px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none", cursor: "pointer" }}
        >
          <option value="all">媒体状态: 全部</option>
          <option value="reviewing">审核中</option>
          <option value="approved">通过审核</option>
          <option value="rejected">未通过审核</option>
        </select>
        {isAdvertiser && (
          <button onClick={openCreateModal} style={{ marginLeft: "auto", padding: "9px 18px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(254,44,85,0.3)" }}>
            + 提交开户申请
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {["申请编号", !isAdvertiser && "广告主", "开户主体", "申请人", "广告账户名称", "BC ID", "内部审核", "媒体状态", "申请时间", canEdit && "操作"].filter(Boolean).map((h) => (
                <th key={String(h)} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, color: "#6666aa", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#25F4EE", fontFamily: "monospace", fontWeight: 600 }}>{app.id}</td>
                {!isAdvertiser && <td style={{ padding: "12px 14px", fontSize: 12, color: "#9999cc" }}>{getAdvertiserName(app.advertiserId)}</td>}
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#e0e0f0" }}>{app.companyName}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#a855f7" }}>{getApplicantName(app.applicantId)}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#e0e0f0", fontWeight: 500 }}>{app.accountName}</td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#6666aa", fontFamily: "monospace" }}>{app.bcId}</td>
                <td style={{ padding: "12px 14px" }}>
                  {canEdit ? (
                    <select
                      value={app.internalStatus}
                      onChange={(e) => updateInternalStatus(app.id, e.target.value as InternalReviewStatus)}
                      style={{ padding: "4px 8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e0e0f0", fontSize: 11, cursor: "pointer" }}
                    >
                      <option value="pending">待确认</option>
                      <option value="approved">通过</option>
                      <option value="rejected">未通过</option>
                    </select>
                  ) : (
                    <InternalStatusBadge status={app.internalStatus} />
                  )}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  {canEdit ? (
                    <select
                      value={app.mediaStatus}
                      onChange={(e) => updateMediaStatus(app.id, e.target.value as MediaReviewStatus)}
                      style={{ padding: "4px 8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e0e0f0", fontSize: 11, cursor: "pointer" }}
                    >
                      <option value="reviewing">审核中</option>
                      <option value="approved">通过审核</option>
                      <option value="rejected">未通过审核</option>
                    </select>
                  ) : (
                    <MediaStatusBadge status={app.mediaStatus} />
                  )}
                </td>
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#6666aa" }}>{app.createdAt}</td>
                {canEdit && (
                  <td style={{ padding: "12px 14px" }}>
                    <button
                      onClick={() => {
                        if (confirm(`确定删除申请 ${app.id} 吗？`)) {
                          setApplications(applications.filter((a) => a.id !== app.id));
                        }
                      }}
                      style={{ padding: "4px 10px", background: "rgba(254,44,85,0.1)", border: "1px solid rgba(254,44,85,0.25)", borderRadius: 4, color: "#FE2C55", fontSize: 11, cursor: "pointer" }}
                    >
                      删除
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#6666aa", fontSize: 13 }}>
            暂无数据
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "28px 32px", width: 480 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 24, marginTop: 0 }}>提交开户申请</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>开户主体 *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="请输入开户主体（公司名称）"
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>广告账户名称 *</label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  placeholder="请输入广告账户名称"
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>BC ID *</label>
                <select
                  value={formData.bcId}
                  onChange={(e) => setFormData({ ...formData, bcId: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", cursor: "pointer" }}
                >
                  <option value="">请选择BC...</option>
                  {availableBCs.map((bc) => (
                    <option key={bc.id} value={bc.id}>
                      {bc.id} - {bc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>备注</label>
                <textarea
                  value={formData.remark}
                  onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                  placeholder="请输入备注信息（选填）"
                  rows={3}
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box", resize: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "10px 24px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#9999bb", fontSize: 13, cursor: "pointer" }}>
                取消
              </button>
              <button onClick={handleSave} style={{ padding: "10px 24px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(254,44,85,0.3)" }}>
                提交申请
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
