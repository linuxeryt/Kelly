"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  advertisers as initialAdvertisers,
  Advertiser,
  AdvertiserStatus,
  businessCenters,
  adAccounts,
  users,
  BusinessCenter,
  AdAccount,
} from "@/lib/mockData";

function StatusBadge({ status }: { status: string }) {
  const cfg = {
    active: { bg: "rgba(37,244,238,0.12)", color: "#25F4EE", border: "rgba(37,244,238,0.25)", label: "投放中" },
    paused: { bg: "rgba(255,193,7,0.12)", color: "#ffc107", border: "rgba(255,193,7,0.25)", label: "已暂停" },
    inactive: { bg: "rgba(254,44,85,0.12)", color: "#FE2C55", border: "rgba(254,44,85,0.25)", label: "未激活" },
    reviewing: { bg: "rgba(168,85,247,0.12)", color: "#a855f7", border: "rgba(168,85,247,0.25)", label: "审核中" },
    disabled: { bg: "rgba(102,102,170,0.12)", color: "#6666aa", border: "rgba(102,102,170,0.25)", label: "已禁用" },
  }[status] || { bg: "rgba(255,255,255,0.05)", color: "#888", border: "rgba(255,255,255,0.1)", label: status };

  return (
    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
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
  const [advertisers, setAdvertisers] = useState<Advertiser[]>(initialAdvertisers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showRecharge, setShowRecharge] = useState<Advertiser | null>(null);
  const [showDetail, setShowDetail] = useState<Advertiser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAdv, setEditingAdv] = useState<Advertiser | null>(null);
  const [amount, setAmount] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    contractDate: "",
    email: "",
    phone: "",
    salesId: "",
    status: "active" as AdvertiserStatus,
  });

  const salesUsers = users.filter((u) => u.role === "sales" && u.status === "active");

  const filtered = advertisers.filter((a) => {
    const matchSearch = a.name.includes(search) || a.id.includes(search) || a.companyName.includes(search);
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  const getSalesName = (salesId: string) => {
    const sales = users.find((u) => u.id === salesId);
    return sales?.username || "-";
  };

  const getAdvBCs = (advId: string): BusinessCenter[] => {
    return businessCenters.filter((bc) => bc.advertiserId === advId);
  };

  const getBCAdAccounts = (bcId: string): AdAccount[] => {
    return adAccounts.filter((aa) => aa.bcId === bcId);
  };

  const openCreateModal = () => {
    setEditingAdv(null);
    setFormData({ name: "", companyName: "", contractDate: "", email: "", phone: "", salesId: "", status: "active" });
    setShowModal(true);
  };

  const openEditModal = (adv: Advertiser) => {
    setEditingAdv(adv);
    setFormData({
      name: adv.name,
      companyName: adv.companyName,
      contractDate: adv.contractDate,
      email: adv.email,
      phone: adv.phone,
      salesId: adv.salesId,
      status: adv.status,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.companyName || !formData.email || !formData.phone || !formData.salesId) {
      alert("请填写完整信息");
      return;
    }
    if (editingAdv) {
      setAdvertisers(advertisers.map((a) => (a.id === editingAdv.id ? { ...a, ...formData } : a)));
    } else {
      const newAdv: Advertiser = {
        id: `ADV${String(advertisers.length + 1).padStart(3, "0")}`,
        ...formData,
        bcIds: [],
        balance: 0,
        totalBudget: 0,
        todaySpend: 0,
        impressions: 0,
        ctr: 0,
        campaigns: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setAdvertisers([...advertisers, newAdv]);
    }
    setShowModal(false);
  };

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
          placeholder="搜索广告主名称/ID/公司..."
          style={{ flex: 1, minWidth: 200, maxWidth: 320, padding: "9px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none" }}
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
              style={{ padding: "7px 16px", borderRadius: 6, border: "1px solid", borderColor: filter === btn.v ? "#FE2C55" : "rgba(255,255,255,0.1)", background: filter === btn.v ? "rgba(254,44,85,0.15)" : "transparent", color: filter === btn.v ? "#FE2C55" : "#8888bb", fontSize: 12, cursor: "pointer", fontWeight: filter === btn.v ? 600 : 400 }}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <button onClick={openCreateModal} style={{ marginLeft: "auto", padding: "9px 18px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(254,44,85,0.3)" }}>
          + 新建广告主
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.03)" }}>
              {["ID", "广告主名称", "公司", "归属销售", "BC数", "账户余额", "今日消耗", "状态", "操作"].map((h) => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, color: "#6666aa", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", whiteSpace: "nowrap" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((adv) => (
              <tr key={adv.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "12px 14px", fontSize: 11, color: "#6666aa", fontFamily: "monospace" }}>{adv.id}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#e0e0f0", fontWeight: 500 }}>{adv.name}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#9999cc", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{adv.companyName}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#a855f7" }}>{getSalesName(adv.salesId)}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#25F4EE", fontWeight: 600 }}>{adv.bcIds.length}</td>
                <td style={{ padding: "12px 14px", minWidth: 140 }}>
                  <BalanceBar balance={adv.balance} total={adv.totalBudget || 1} />
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: adv.todaySpend > 0 ? "#FE2C55" : "#6666aa", fontWeight: 600 }}>
                  {adv.todaySpend > 0 ? `¥${adv.todaySpend.toLocaleString()}` : "—"}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={adv.status} />
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setShowDetail(adv)} style={{ padding: "4px 10px", background: "rgba(37,244,238,0.1)", border: "1px solid rgba(37,244,238,0.25)", borderRadius: 4, color: "#25F4EE", fontSize: 11, cursor: "pointer" }}>
                      详情
                    </button>
                    <button onClick={() => openEditModal(adv)} style={{ padding: "4px 10px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", borderRadius: 4, color: "#a855f7", fontSize: 11, cursor: "pointer" }}>
                      编辑
                    </button>
                    <button onClick={() => setShowRecharge(adv)} style={{ padding: "4px 10px", background: "rgba(254,44,85,0.1)", border: "1px solid rgba(254,44,85,0.25)", borderRadius: 4, color: "#FE2C55", fontSize: 11, cursor: "pointer" }}>
                      充值
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div onClick={() => setShowDetail(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "28px 32px", width: 680, maxHeight: "85vh", overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#e0e0f0", marginBottom: 4, marginTop: 0 }}>{showDetail.name}</h3>
                <div style={{ fontSize: 13, color: "#6666aa" }}>{showDetail.companyName}</div>
              </div>
              <StatusBadge status={showDetail.status} />
            </div>

            {/* Basic Info */}
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#6666aa", marginBottom: 12, fontWeight: 600 }}>基本信息</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 4 }}>合同签约</div>
                  <div style={{ fontSize: 13, color: "#e0e0f0" }}>{showDetail.contractDate}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 4 }}>邮箱</div>
                  <div style={{ fontSize: 13, color: "#e0e0f0" }}>{showDetail.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 4 }}>电话</div>
                  <div style={{ fontSize: 13, color: "#e0e0f0" }}>{showDetail.phone}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 4 }}>归属销售</div>
                  <div style={{ fontSize: 13, color: "#a855f7" }}>{getSalesName(showDetail.salesId)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 4 }}>账户余额</div>
                  <div style={{ fontSize: 13, color: "#25F4EE", fontWeight: 600 }}>¥{showDetail.balance.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 4 }}>今日消耗</div>
                  <div style={{ fontSize: 13, color: "#FE2C55", fontWeight: 600 }}>¥{showDetail.todaySpend.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* BC List */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: "#e0e0f0", marginBottom: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                BC 商务中心
                <span style={{ fontSize: 11, color: "#25F4EE", background: "rgba(37,244,238,0.1)", padding: "2px 8px", borderRadius: 10 }}>{getAdvBCs(showDetail.id).length} 个</span>
              </div>
              {getAdvBCs(showDetail.id).map((bc) => (
                <div key={bc.id} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "14px 18px", marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, color: "#6666aa", fontFamily: "monospace" }}>{bc.id}</span>
                      <span style={{ fontSize: 14, color: "#e0e0f0", fontWeight: 500 }}>{bc.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, color: "#6666aa" }}>{bc.timezone}</span>
                      <StatusBadge status={bc.status} />
                    </div>
                  </div>
                  {/* Ad Accounts under this BC */}
                  <div style={{ paddingLeft: 12, borderLeft: "2px solid rgba(37,244,238,0.3)" }}>
                    <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 8 }}>广告账户 ({getBCAdAccounts(bc.id).length})</div>
                    {getBCAdAccounts(bc.id).map((aa) => (
                      <div key={aa.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <span style={{ fontSize: 10, color: "#6666aa", fontFamily: "monospace", width: 50 }}>{aa.id}</span>
                        <span style={{ fontSize: 12, color: "#e0e0f0", flex: 1 }}>{aa.name}</span>
                        <span style={{ fontSize: 11, color: "#25F4EE" }}>¥{aa.balance.toLocaleString()}</span>
                        <span style={{ fontSize: 10, color: "#6666aa" }}>{aa.currency}</span>
                        <StatusBadge status={aa.status} />
                      </div>
                    ))}
                    {getBCAdAccounts(bc.id).length === 0 && <div style={{ fontSize: 11, color: "#6666aa" }}>暂无广告账户</div>}
                  </div>
                </div>
              ))}
              {getAdvBCs(showDetail.id).length === 0 && <div style={{ fontSize: 13, color: "#6666aa", textAlign: "center", padding: 20 }}>暂无绑定的 BC</div>}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setShowDetail(null)} style={{ padding: "10px 28px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#9999bb", fontSize: 13, cursor: "pointer" }}>
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "28px 32px", width: 480 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 24, marginTop: 0 }}>{editingAdv ? "编辑广告主" : "新建广告主"}</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>客户简称 *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>状态</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as AdvertiserStatus })} style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", cursor: "pointer" }}>
                    <option value="active">投放中</option>
                    <option value="paused">已暂停</option>
                    <option value="inactive">未激活</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>公司全称 *</label>
                <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>合同签约时间</label>
                  <input type="date" value={formData.contractDate} onChange={(e) => setFormData({ ...formData, contractDate: e.target.value })} style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>归属销售 *</label>
                  <select value={formData.salesId} onChange={(e) => setFormData({ ...formData, salesId: e.target.value })} style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", cursor: "pointer" }}>
                    <option value="">请选择销售...</option>
                    {salesUsers.map((s) => (
                      <option key={s.id} value={s.id}>{s.username}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>邮箱 *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>电话 *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)} style={{ padding: "10px 24px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#9999bb", fontSize: 13, cursor: "pointer" }}>
                取消
              </button>
              <button onClick={handleSave} style={{ padding: "10px 24px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(254,44,85,0.3)" }}>
                {editingAdv ? "保存" : "创建"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recharge Modal */}
      {showRecharge && (
        <div onClick={() => setShowRecharge(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "32px", width: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 6 }}>账户充值</div>
            <div style={{ fontSize: 13, color: "#6666aa", marginBottom: 24 }}>{showRecharge.name}</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#9999bb", marginBottom: 6 }}>当前余额</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#25F4EE" }}>¥{showRecharge.balance.toLocaleString()}</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>充值金额（元）</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="请输入充值金额" style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {[5000, 10000, 20000, 50000].map((v) => (
                  <button key={v} onClick={() => setAmount(String(v))} style={{ flex: 1, padding: "6px", background: amount === String(v) ? "rgba(254,44,85,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${amount === String(v) ? "#FE2C55" : "rgba(255,255,255,0.1)"}`, borderRadius: 6, color: amount === String(v) ? "#FE2C55" : "#8888bb", fontSize: 11, cursor: "pointer" }}>
                    ¥{(v / 10000).toFixed(0)}万
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowRecharge(null)} style={{ flex: 1, padding: "11px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#9999bb", fontSize: 14, cursor: "pointer" }}>
                取消
              </button>
              <button onClick={() => { alert(`已成功为「${showRecharge.name}」充值 ¥${amount}`); setShowRecharge(null); setAmount(""); }} style={{ flex: 2, padding: "11px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(254,44,85,0.3)" }}>
                确认充值
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
