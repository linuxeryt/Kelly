"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { users as initialUsers, User, UserRole, UserStatus, roleLabels, advertisers } from "@/lib/mockData";
import { roleColors } from "@/lib/permissions";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "operator" as UserRole,
    status: "active" as UserStatus,
    bindAdvertiserId: "",
  });

  // Filter users
  const filtered = users.filter((u) => {
    const matchSearch =
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  // Stats
  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin").length,
    operators: users.filter((u) => u.role === "operator").length,
    finance: users.filter((u) => u.role === "finance").length,
    sales: users.filter((u) => u.role === "sales").length,
    advertisers: users.filter((u) => u.role === "advertiser").length,
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      username: "",
      email: "",
      phone: "",
      role: "operator",
      status: "active",
      bindAdvertiserId: "",
    });
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      bindAdvertiserId: user.bindAdvertiserId || "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.username || !formData.email || !formData.phone) {
      alert("请填写完整信息");
      return;
    }
    if (formData.role === "advertiser" && !formData.bindAdvertiserId) {
      alert("广告主角色必须绑定广告主账户");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                ...formData,
                bindAdvertiserId: formData.role === "advertiser" ? formData.bindAdvertiserId : undefined,
              }
            : u
        )
      );
    } else {
      const newUser: User = {
        id: `USR${String(users.length + 1).padStart(3, "0")}`,
        ...formData,
        bindAdvertiserId: formData.role === "advertiser" ? formData.bindAdvertiserId : undefined,
        createdAt: new Date().toISOString().split("T")[0],
        lastLoginAt: "-",
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setUsers(users.filter((u) => u.id !== deleteTarget.id));
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  const toggleStatus = (user: User) => {
    setUsers(
      users.map((u) =>
        u.id === user.id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    );
  };

  const RoleBadge = ({ role }: { role: UserRole }) => (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        background: roleColors[role].bg,
        color: roleColors[role].color,
        border: `1px solid ${roleColors[role].border}`,
      }}
    >
      {roleLabels[role]}
    </span>
  );

  const StatusBadge = ({ status }: { status: UserStatus }) => (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        background: status === "active" ? "rgba(37,244,238,0.12)" : "rgba(254,44,85,0.12)",
        color: status === "active" ? "#25F4EE" : "#FE2C55",
        border: `1px solid ${status === "active" ? "rgba(37,244,238,0.25)" : "rgba(254,44,85,0.25)"}`,
      }}
    >
      {status === "active" ? "启用" : "禁用"}
    </span>
  );

  return (
    <DashboardLayout title="用户管理">
      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          { label: "总用户数", value: stats.total, color: "#e0e0f0" },
          { label: "活跃用户", value: stats.active, color: "#25F4EE" },
          { label: "管理员", value: stats.admins, color: "#FE2C55" },
          { label: "运营", value: stats.operators, color: "#25F4EE" },
          { label: "财务", value: stats.finance, color: "#10b981" },
          { label: "销售", value: stats.sales, color: "#a855f7" },
          { label: "广告主", value: stats.advertisers, color: "#f59e0b" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(20,20,40,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "16px 18px",
            }}
          >
            <div style={{ fontSize: 11, color: "#6666aa", marginBottom: 6 }}>{stat.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="搜索用户名/邮箱/手机..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: 200,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "#e0e0f0",
            fontSize: 13,
            outline: "none",
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
          style={{
            padding: "10px 14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "#e0e0f0",
            fontSize: 13,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">全部角色</option>
          <option value="admin">管理员</option>
          <option value="operator">运营</option>
          <option value="finance">财务</option>
          <option value="sales">销售</option>
          <option value="advertiser">广告主</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
          style={{
            padding: "10px 14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "#e0e0f0",
            fontSize: 13,
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">全部状态</option>
          <option value="active">启用</option>
          <option value="inactive">禁用</option>
        </select>
        <button
          onClick={openCreateModal}
          style={{
            padding: "10px 20px",
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
          + 新增用户
        </button>
      </div>

      {/* Users Table */}
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
              {["ID", "用户名", "邮箱", "手机", "角色", "状态", "创建时间", "最后登录", "操作"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 14px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#6666aa",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#6666aa" }}>{user.id}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#e0e0f0", fontWeight: 600 }}>
                  {user.username}
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#9999cc" }}>{user.email}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#9999cc" }}>{user.phone}</td>
                <td style={{ padding: "12px 14px" }}>
                  <RoleBadge role={user.role} />
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <StatusBadge status={user.status} />
                </td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#6666aa" }}>{user.createdAt}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#6666aa" }}>{user.lastLoginAt}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => openEditModal(user)}
                      style={{
                        padding: "4px 10px",
                        background: "rgba(37,244,238,0.1)",
                        border: "1px solid rgba(37,244,238,0.25)",
                        borderRadius: 4,
                        color: "#25F4EE",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => toggleStatus(user)}
                      style={{
                        padding: "4px 10px",
                        background: user.status === "active" ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)",
                        border: `1px solid ${user.status === "active" ? "rgba(245,158,11,0.25)" : "rgba(16,185,129,0.25)"}`,
                        borderRadius: 4,
                        color: user.status === "active" ? "#f59e0b" : "#10b981",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      {user.status === "active" ? "禁用" : "启用"}
                    </button>
                    <button
                      onClick={() => {
                        setDeleteTarget(user);
                        setShowDeleteModal(true);
                      }}
                      style={{
                        padding: "4px 10px",
                        background: "rgba(254,44,85,0.1)",
                        border: "1px solid rgba(254,44,85,0.25)",
                        borderRadius: 4,
                        color: "#FE2C55",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      删除
                    </button>
                  </div>
                </td>
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 440,
              background: "#14142a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "28px 32px",
            }}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 24, marginTop: 0 }}>
              {editingUser ? "编辑用户" : "新增用户"}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>用户名</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#e0e0f0",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#e0e0f0",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>手机</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#e0e0f0",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>角色</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      color: "#e0e0f0",
                      fontSize: 14,
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="admin">管理员</option>
                    <option value="operator">运营</option>
                    <option value="finance">财务</option>
                    <option value="sales">销售</option>
                    <option value="advertiser">广告主</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>状态</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      color: "#e0e0f0",
                      fontSize: 14,
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="active">启用</option>
                    <option value="inactive">禁用</option>
                  </select>
                </div>
              </div>

              {formData.role === "advertiser" && (
                <div>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>
                    绑定广告主账户 <span style={{ color: "#FE2C55" }}>*</span>
                  </label>
                  <select
                    value={formData.bindAdvertiserId}
                    onChange={(e) => setFormData({ ...formData, bindAdvertiserId: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      color: "#e0e0f0",
                      fontSize: 14,
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">请选择广告主...</option>
                    {advertisers.map((adv) => (
                      <option key={adv.id} value={adv.id}>
                        {adv.name} ({adv.id})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "10px 24px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  color: "#9999bb",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                取消
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: "10px 24px",
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
                {editingUser ? "保存" : "创建"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deleteTarget && (
        <div
          onClick={() => setShowDeleteModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 380,
              background: "#14142a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "28px 32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(254,44,85,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 24,
              }}
            >
              ⚠️
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 12, marginTop: 0 }}>
              确认删除
            </h3>
            <p style={{ fontSize: 13, color: "#9999cc", marginBottom: 24, lineHeight: 1.6 }}>
              您确定要删除用户 <span style={{ color: "#FE2C55", fontWeight: 600 }}>{deleteTarget.username}</span> 吗？
              <br />
              此操作无法撤销。
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: "10px 28px",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  color: "#9999bb",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: "10px 28px",
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
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
