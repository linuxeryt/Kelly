"use client";
import { useState, useRef } from "react";
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
  IDType,
  EnterpriseType,
  DeliveryMethod,
  Currency,
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

// 时区选项
const timezoneOptions = [
  { value: "Asia/Shanghai", label: "中国标准时间 (UTC+8)" },
  { value: "Asia/Tokyo", label: "日本标准时间 (UTC+9)" },
  { value: "Asia/Singapore", label: "新加坡时间 (UTC+8)" },
  { value: "America/Los_Angeles", label: "美国太平洋时间 (UTC-8/-7)" },
  { value: "America/New_York", label: "美国东部时间 (UTC-5/-4)" },
  { value: "Europe/London", label: "英国时间 (UTC+0/+1)" },
  { value: "Europe/Paris", label: "欧洲中部时间 (UTC+1/+2)" },
];

// 行业选项
const industryOptions = [
  "服装零售", "化妆品零售", "电子产品零售", "食品零售", "母婴用品",
  "家居装饰", "运动户外", "宠物用品", "教育培训", "金融服务",
  "医疗健康", "旅游出行", "餐饮美食", "娱乐休闲", "其他"
];

// 注册地区选项
const regionOptions = [
  "北京市", "上海市", "广东省深圳市", "广东省广州市", "浙江省杭州市",
  "浙江省宁波市", "江苏省南京市", "江苏省苏州市", "四川省成都市",
  "湖北省武汉市", "福建省厦门市", "山东省青岛市", "其他"
];

const idTypeOptions: IDType[] = ["身份证", "护照", "港澳通行证", "台湾通行证"];
const enterpriseTypeOptions: EnterpriseType[] = ["个体工商户", "有限责任公司", "股份有限公司", "个人独资企业", "合伙企业", "其他"];
const deliveryMethodOptions: DeliveryMethod[] = ["自助投放", "代运营投放"];
const currencyOptions: { value: Currency; label: string }[] = [
  { value: "CNY", label: "人民币 (CNY)" },
  { value: "USD", label: "美元 (USD)" },
  { value: "EUR", label: "欧元 (EUR)" },
  { value: "GBP", label: "英镑 (GBP)" },
  { value: "JPY", label: "日元 (JPY)" },
  { value: "HKD", label: "港币 (HKD)" },
];

export default function ApplicationsPage() {
  const { currentUser } = useUser();
  const [applications, setApplications] = useState<AccountApplication[]>(initialApplications);
  const [search, setSearch] = useState("");
  const [internalFilter, setInternalFilter] = useState<InternalReviewStatus | "all">("all");
  const [mediaFilter, setMediaFilter] = useState<MediaReviewStatus | "all">("all");
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AccountApplication | null>(null);

  const businessLicenseRef = useRef<HTMLInputElement>(null);
  const authorizationRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    companyName: "",
    businessLicensePhoto: "",
    unifiedSocialCreditCode: "",
    region: "",
    enterpriseType: "有限责任公司" as EnterpriseType,
    industry: "",
    legalPerson: "",
    idType: "身份证" as IDType,
    idNumber: "",
    unionPayAccount: "",
    contactPhone: "",
    authorizationDocument: "",
    accountName: "",
    timezone: "Asia/Shanghai",
    currency: "CNY" as Currency,
    deliveryMethod: "自助投放" as DeliveryMethod,
    promotionLink: "",
    bcId: "",
    remark: "",
  });

  const canCreate = currentUser ? hasPermission(currentUser.role, "applications", "create") : false;
  const canEdit = currentUser ? hasPermission(currentUser.role, "applications", "edit") : false;
  const isAdvertiser = currentUser?.role === "advertiser";

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
    const advertiser = userAdvertiserId ? advertisers.find((a) => a.id === userAdvertiserId) : null;
    setFormData({
      companyName: advertiser?.companyName || "",
      businessLicensePhoto: "",
      unifiedSocialCreditCode: "",
      region: "",
      enterpriseType: "有限责任公司",
      industry: "",
      legalPerson: "",
      idType: "身份证",
      idNumber: "",
      unionPayAccount: "",
      contactPhone: "",
      authorizationDocument: "",
      accountName: "",
      timezone: "Asia/Shanghai",
      currency: "CNY",
      deliveryMethod: "自助投放",
      promotionLink: "",
      bcId: "",
      remark: "",
    });
    setShowModal(true);
  };

  const handleFileUpload = (field: "businessLicensePhoto" | "authorizationDocument", file: File) => {
    // 模拟文件上传，实际项目中应调用API上传
    const fakeUrl = `/uploads/${file.name}`;
    setFormData({ ...formData, [field]: fakeUrl });
  };

  const handleSave = () => {
    if (!formData.companyName || !formData.unifiedSocialCreditCode || !formData.accountName || !formData.bcId) {
      alert("请填写必填信息");
      return;
    }
    const newApp: AccountApplication = {
      id: `APP${String(applications.length + 1).padStart(3, "0")}`,
      advertiserId: userAdvertiserId || "",
      applicantId: currentUser?.id || "",
      ...formData,
      internalStatus: "pending",
      mediaStatus: "reviewing",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      updatedAt: new Date().toISOString().replace("T", " ").slice(0, 16),
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

  const viewDetail = (app: AccountApplication) => {
    setSelectedApp(app);
    setShowDetailModal(true);
  };

  // Stats
  const stats = {
    total: filtered.length,
    pending: filtered.filter((a) => a.internalStatus === "pending").length,
    approved: filtered.filter((a) => a.internalStatus === "approved").length,
    mediaApproved: filtered.filter((a) => a.mediaStatus === "approved").length,
  };

  // 表单输入组件
  const FormInput = ({ label, required, ...props }: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>
        {label} {required && <span style={{ color: "#FE2C55" }}>*</span>}
      </label>
      <input
        {...props}
        style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
      />
    </div>
  );

  const FormSelect = ({ label, required, options, ...props }: { label: string; required?: boolean; options: { value: string; label: string }[] | string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div>
      <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>
        {label} {required && <span style={{ color: "#FE2C55" }}>*</span>}
      </label>
      <select
        {...props}
        style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", cursor: "pointer", boxSizing: "border-box" }}
      >
        <option value="">请选择...</option>
        {options.map((opt) => (
          <option key={typeof opt === "string" ? opt : opt.value} value={typeof opt === "string" ? opt : opt.value}>
            {typeof opt === "string" ? opt : opt.label}
          </option>
        ))}
      </select>
    </div>
  );

  const FormFileUpload = ({ label, required, field, accept, fileRef }: { label: string; required?: boolean; field: "businessLicensePhoto" | "authorizationDocument"; accept: string; fileRef: React.RefObject<HTMLInputElement | null> }) => (
    <div>
      <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>
        {label} {required && <span style={{ color: "#FE2C55" }}>*</span>}
      </label>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={{ padding: "10px 18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, cursor: "pointer" }}
        >
          选择文件
        </button>
        {formData[field] && (
          <span style={{ fontSize: 12, color: "#25F4EE" }}>
            {formData[field].split("/").pop()}
          </span>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(field, file);
        }}
        style={{ display: "none" }}
      />
    </div>
  );

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
        {canCreate && (
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
              {["申请编号", !isAdvertiser && "广告主", "开户主体", "申请人", "广告账户名称", "投放方式", "BC ID", "内部审核", "媒体状态", "申请时间", "操作"].filter(Boolean).map((h) => (
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
                <td style={{ padding: "12px 14px", fontSize: 12, color: "#9999bb" }}>{app.deliveryMethod}</td>
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
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => viewDetail(app)}
                      style={{ padding: "4px 10px", background: "rgba(37,244,238,0.1)", border: "1px solid rgba(37,244,238,0.25)", borderRadius: 4, color: "#25F4EE", fontSize: 11, cursor: "pointer" }}
                    >
                      详情
                    </button>
                    {canEdit && (
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
                    )}
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

      {/* Create Modal */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)", overflowY: "auto", padding: "20px 0" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "28px 32px", width: 720, maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 24, marginTop: 0 }}>提交开户申请</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* 企业信息 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>企业信息</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <FormInput label="开户主体（企业名称）" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="请输入企业名称" />
                  <FormInput label="统一社会信用代码" required value={formData.unifiedSocialCreditCode} onChange={(e) => setFormData({ ...formData, unifiedSocialCreditCode: e.target.value })} placeholder="请输入统一社会信用代码" />
                  <FormFileUpload label="营业执照" required field="businessLicensePhoto" accept="image/*,.pdf" fileRef={businessLicenseRef} />
                  <FormSelect label="注册地区" required options={regionOptions} value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} />
                  <FormSelect label="企业类型" required options={enterpriseTypeOptions} value={formData.enterpriseType} onChange={(e) => setFormData({ ...formData, enterpriseType: e.target.value as EnterpriseType })} />
                  <FormSelect label="所属行业" required options={industryOptions} value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} />
                </div>
              </div>

              {/* 法人信息 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>法人信息</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <FormInput label="法定代表人" required value={formData.legalPerson} onChange={(e) => setFormData({ ...formData, legalPerson: e.target.value })} placeholder="请输入法定代表人姓名" />
                  <FormSelect label="证件类型" required options={idTypeOptions} value={formData.idType} onChange={(e) => setFormData({ ...formData, idType: e.target.value as IDType })} />
                  <FormInput label="法人证件号码" required value={formData.idNumber} onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })} placeholder="请输入证件号码" />
                </div>
              </div>

              {/* 结算信息 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>结算信息</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <FormInput label="银联账号" required value={formData.unionPayAccount} onChange={(e) => setFormData({ ...formData, unionPayAccount: e.target.value })} placeholder="请输入银联账号" />
                  <FormInput label="手机号码" required value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} placeholder="请输入手机号码" />
                  <FormFileUpload label="对外敏感信息授权书" field="authorizationDocument" accept="image/*,.pdf" fileRef={authorizationRef} />
                </div>
              </div>

              {/* 广告账户信息 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>广告账户信息</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <FormInput label="广告账户名称" required value={formData.accountName} onChange={(e) => setFormData({ ...formData, accountName: e.target.value })} placeholder="请输入广告账户名称" />
                  <FormSelect label="BC ID" required options={availableBCs.map((bc) => ({ value: bc.id, label: `${bc.id} - ${bc.name}` }))} value={formData.bcId} onChange={(e) => setFormData({ ...formData, bcId: e.target.value })} />
                  <FormSelect label="广告账户时区" required options={timezoneOptions} value={formData.timezone} onChange={(e) => setFormData({ ...formData, timezone: e.target.value })} />
                  <FormSelect label="广告结算币种" required options={currencyOptions} value={formData.currency} onChange={(e) => setFormData({ ...formData, currency: e.target.value as Currency })} />
                  <FormSelect label="投放方式" required options={deliveryMethodOptions} value={formData.deliveryMethod} onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as DeliveryMethod })} />
                  <FormInput label="推广链接" required value={formData.promotionLink} onChange={(e) => setFormData({ ...formData, promotionLink: e.target.value })} placeholder="https://example.com" />
                </div>
              </div>

              {/* 备注 */}
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

      {/* Detail Modal */}
      {showDetailModal && selectedApp && (
        <div onClick={() => setShowDetailModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)", overflowY: "auto", padding: "20px 0" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "28px 32px", width: 720, maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 24, marginTop: 0 }}>申请详情 - {selectedApp.id}</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* 企业信息 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>企业信息</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <DetailItem label="开户主体" value={selectedApp.companyName} />
                  <DetailItem label="统一社会信用代码" value={selectedApp.unifiedSocialCreditCode} />
                  <DetailItem label="营业执照" value={selectedApp.businessLicensePhoto ? "已上传" : "未上传"} />
                  <DetailItem label="注册地区" value={selectedApp.region} />
                  <DetailItem label="企业类型" value={selectedApp.enterpriseType} />
                  <DetailItem label="所属行业" value={selectedApp.industry} />
                </div>
              </div>

              {/* 法人信息 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>法人信息</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <DetailItem label="法定代表人" value={selectedApp.legalPerson} />
                  <DetailItem label="证件类型" value={selectedApp.idType} />
                  <DetailItem label="法人证件号码" value={selectedApp.idNumber} />
                </div>
              </div>

              {/* 结算信息 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>结算信息</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <DetailItem label="银联账号" value={selectedApp.unionPayAccount} />
                  <DetailItem label="手机号码" value={selectedApp.contactPhone} />
                  <DetailItem label="对外敏感信息授权书" value={selectedApp.authorizationDocument ? "已上传" : "未上传"} />
                </div>
              </div>

              {/* 广告账户信息 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>广告账户信息</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <DetailItem label="广告账户名称" value={selectedApp.accountName} />
                  <DetailItem label="BC ID" value={selectedApp.bcId} />
                  <DetailItem label="广告账户时区" value={timezoneOptions.find((t) => t.value === selectedApp.timezone)?.label || selectedApp.timezone} />
                  <DetailItem label="广告结算币种" value={currencyOptions.find((c) => c.value === selectedApp.currency)?.label || selectedApp.currency} />
                  <DetailItem label="投放方式" value={selectedApp.deliveryMethod} />
                  <DetailItem label="推广链接" value={selectedApp.promotionLink} />
                </div>
              </div>

              {/* 审核状态 */}
              <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: 16 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#25F4EE", marginBottom: 12 }}>审核状态</h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 12, color: "#9999bb" }}>内部审核状态：</span>
                    <InternalStatusBadge status={selectedApp.internalStatus} />
                  </div>
                  <div>
                    <span style={{ fontSize: 12, color: "#9999bb" }}>媒体审核状态：</span>
                    <MediaStatusBadge status={selectedApp.mediaStatus} />
                  </div>
                  <DetailItem label="申请时间" value={selectedApp.createdAt} />
                  <DetailItem label="更新时间" value={selectedApp.updatedAt} />
                </div>
              </div>

              {selectedApp.remark && (
                <div>
                  <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>备注</label>
                  <div style={{ padding: "10px 14px", background: "rgba(255,255,255,0.05)", borderRadius: 8, color: "#e0e0f0", fontSize: 14 }}>
                    {selectedApp.remark}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
              <button onClick={() => setShowDetailModal(false)} style={{ padding: "10px 24px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#9999bb", fontSize: 13, cursor: "pointer" }}>
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

// 详情展示组件
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ fontSize: 12, color: "#9999bb" }}>{label}：</span>
      <span style={{ fontSize: 14, color: "#e0e0f0" }}>{value || "-"}</span>
    </div>
  );
}