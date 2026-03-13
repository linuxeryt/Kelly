"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useUser } from "@/contexts/UserContext";
import {
  advertiserFinances,
  contracts,
  settlements,
  paymentRecords,
  policyConfigs,
  financeSummary,
  contractStatusLabels,
  settlementStatusLabels,
  ContractStatus,
  SettlementStatus,
  PolicyType,
} from "@/lib/mockData";

type TabKey = "overview" | "contracts" | "settlements" | "payments";

export default function FinancePage() {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [search, setSearch] = useState("");
  const [contractFilter, setContractFilter] = useState<ContractStatus | "all">("all");
  const [settlementFilter, setSettlementFilter] = useState<SettlementStatus | "all">("all");
  const [showContractDetail, setShowContractDetail] = useState<string | null>(null);
  const [showFinanceDetail, setShowFinanceDetail] = useState<string | null>(null);

  // 筛选广告主财务
  const filteredFinances = advertiserFinances.filter((f) =>
    f.advertiserName.toLowerCase().includes(search.toLowerCase())
  );

  // 筛选合同
  const filteredContracts = contracts.filter((c) => {
    const matchSearch = c.advertiserName.toLowerCase().includes(search.toLowerCase()) ||
      c.contractNo.toLowerCase().includes(search.toLowerCase());
    const matchFilter = contractFilter === "all" || c.status === contractFilter;
    return matchSearch && matchFilter;
  });

  // 筛选结算
  const filteredSettlements = settlements.filter((s) => {
    const matchSearch = s.advertiserName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = settlementFilter === "all" || s.status === settlementFilter;
    return matchSearch && matchFilter;
  });

  // 筛选回款
  const filteredPayments = paymentRecords.filter((p) =>
    p.advertiserName.toLowerCase().includes(search.toLowerCase())
  );

  // 即将到期合同（30天内）
  const expiringContracts = contracts.filter((c) => {
    if (c.status !== "active" && c.status !== "expiring") return false;
    const endDate = new Date(c.endDate);
    const today = new Date();
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft > 0;
  });

  // 逾期账户
  const overdueAccounts = advertiserFinances.filter((f) => f.overdueAmount > 0);

  return (
    <DashboardLayout title="财务管理">
      {/* 预警提醒 */}
      {(expiringContracts.length > 0 || overdueAccounts.length > 0) && (
        <div style={{ marginBottom: 20 }}>
          {expiringContracts.length > 0 && (
            <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "14px 18px", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <div style={{ flex: 1 }}>
                <span style={{ color: "#ffc107", fontWeight: 600, fontSize: 13 }}>合同到期提醒：</span>
                <span style={{ color: "#e0e0f0", fontSize: 13, marginLeft: 6 }}>
                  有 <span style={{ color: "#ffc107", fontWeight: 700 }}>{expiringContracts.length}</span> 份合同将在30天内到期
                </span>
                {expiringContracts.slice(0, 2).map((c) => (
                  <span key={c.id} style={{ marginLeft: 8, fontSize: 12, color: "#8888bb" }}>
                    {c.advertiserName}（{c.endDate}）
                  </span>
                ))}
              </div>
              <button
                onClick={() => { setActiveTab("contracts"); setContractFilter("expiring"); }}
                style={{ padding: "6px 14px", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 6, color: "#ffc107", fontSize: 12, cursor: "pointer" }}
              >
                查看详情
              </button>
            </div>
          )}
          {overdueAccounts.length > 0 && (
            <div style={{ background: "rgba(254,44,85,0.08)", border: "1px solid rgba(254,44,85,0.2)", borderRadius: 10, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 20 }}>🚨</span>
              <div style={{ flex: 1 }}>
                <span style={{ color: "#FE2C55", fontWeight: 600, fontSize: 13 }}>逾期账户提醒：</span>
                <span style={{ color: "#e0e0f0", fontSize: 13, marginLeft: 6 }}>
                  有 <span style={{ color: "#FE2C55", fontWeight: 700 }}>{overdueAccounts.length}</span> 个账户存在逾期欠款，总计
                  <span style={{ color: "#FE2C55", fontWeight: 700 }}> ¥{overdueAccounts.reduce((s, a) => s + a.overdueAmount, 0).toLocaleString()}</span>
                </span>
                {overdueAccounts.slice(0, 2).map((a) => (
                  <span key={a.advertiserId} style={{ marginLeft: 8, fontSize: 12, color: "#8888bb" }}>
                    {a.advertiserName}（¥{a.overdueAmount.toLocaleString()}）
                  </span>
                ))}
              </div>
              <button
                onClick={() => setActiveTab("overview")}
                style={{ padding: "6px 14px", background: "rgba(254,44,85,0.15)", border: "1px solid rgba(254,44,85,0.3)", borderRadius: 6, color: "#FE2C55", fontSize: 12, cursor: "pointer" }}
              >
                查看详情
              </button>
            </div>
          )}
        </div>
      )}

      {/* 汇总卡片 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 20 }}>
        <SummaryCard label="总余额" value={`¥${(financeSummary.totalBalance / 10000).toFixed(1)}万`} color="#10b981" />
        <SummaryCard label="可用授信" value={`¥${((financeSummary.totalCreditLimit - financeSummary.totalCreditUsed) / 10000).toFixed(1)}万`} color="#25F4EE" />
        <SummaryCard label="本月消耗" value={`¥${(financeSummary.monthTotalSpend / 10000).toFixed(1)}万`} color="#FE2C55" />
        <SummaryCard label="本月回款" value={`¥${(financeSummary.monthTotalPayment / 10000).toFixed(1)}万`} color="#a855f7" />
        <SummaryCard label="待收欠款" value={`¥${(financeSummary.totalOutstanding / 10000).toFixed(1)}万`} color="#ffc107" />
        <SummaryCard label="逾期金额" value={`¥${(financeSummary.totalOverdue / 10000).toFixed(1)}万`} color="#FE2C55" isWarning={financeSummary.totalOverdue > 0} />
      </div>

      {/* Tab切换 */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 3 }}>
          {[
            { key: "overview" as TabKey, label: "财务概览" },
            { key: "contracts" as TabKey, label: "合同管理" },
            { key: "settlements" as TabKey, label: "本月结算" },
            { key: "payments" as TabKey, label: "回款记录" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "8px 20px",
                borderRadius: 6,
                border: "none",
                background: activeTab === tab.key ? "linear-gradient(135deg, #FE2C55, #c9003e)" : "transparent",
                color: activeTab === tab.key ? "white" : "#8888bb",
                fontSize: 13,
                fontWeight: activeTab === tab.key ? 600 : 400,
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索广告主..."
          style={{ flex: 1, maxWidth: 240, padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none" }}
        />

        {activeTab === "contracts" && (
          <select
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value as ContractStatus | "all")}
            style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, cursor: "pointer" }}
          >
            <option value="all">全部状态</option>
            <option value="active">生效中</option>
            <option value="expiring">即将到期</option>
            <option value="expired">已过期</option>
          </select>
        )}

        {activeTab === "settlements" && (
          <select
            value={settlementFilter}
            onChange={(e) => setSettlementFilter(e.target.value as SettlementStatus | "all")}
            style={{ padding: "8px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, cursor: "pointer" }}
          >
            <option value="all">全部状态</option>
            <option value="pending">待确认</option>
            <option value="confirmed">已确认</option>
            <option value="invoiced">已开票</option>
            <option value="paid">已付款</option>
          </select>
        )}
      </div>

      {/* 财务概览 */}
      {activeTab === "overview" && (
        <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                <Th>广告主</Th>
                <Th>合作政策</Th>
                <Th alignRight>账户余额</Th>
                <Th alignRight>授信额度</Th>
                <Th alignRight>本月消耗</Th>
                <Th alignRight>本月回款</Th>
                <Th alignRight>欠款金额</Th>
                <Th>合同状态</Th>
                <Th>合同到期</Th>
                <Th>操作</Th>
              </tr>
            </thead>
            <tbody>
              {filteredFinances.map((f) => (
                <tr key={f.advertiserId} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: f.overdueAmount > 0 ? "rgba(254,44,85,0.03)" : "transparent" }}>
                  <Td highlight>{f.advertiserName}</Td>
                  <Td><PolicyBadge type={f.policyType} /></Td>
                  <Td alignRight>
                    <span style={{ color: "#10b981", fontWeight: 600 }}>¥{f.balance.toLocaleString()}</span>
                  </Td>
                  <Td alignRight>
                    <div style={{ fontSize: 12 }}>
                      <span style={{ color: "#e0e0f0" }}>¥{f.creditLimit.toLocaleString()}</span>
                      {f.creditUsed > 0 && (
                        <span style={{ color: "#ffc107", marginLeft: 4 }}>(已用¥{f.creditUsed.toLocaleString()})</span>
                      )}
                    </div>
                  </Td>
                  <Td alignRight>
                    <span style={{ color: "#FE2C55", fontWeight: 500 }}>¥{f.monthSpend.toLocaleString()}</span>
                  </Td>
                  <Td alignRight>
                    <span style={{ color: "#25F4EE", fontWeight: 500 }}>¥{f.monthPayment.toLocaleString()}</span>
                  </Td>
                  <Td alignRight>
                    {f.overdueAmount > 0 ? (
                      <div>
                        <span style={{ color: "#FE2C55", fontWeight: 600 }}>¥{f.overdueAmount.toLocaleString()}</span>
                        <span style={{ fontSize: 10, color: "#FE2C55", display: "block" }}>逾期{f.overdueDays}天</span>
                      </div>
                    ) : f.outstandingAmount > 0 ? (
                      <span style={{ color: "#ffc107" }}>¥{f.outstandingAmount.toLocaleString()}</span>
                    ) : (
                      <span style={{ color: "#6666aa" }}>-</span>
                    )}
                  </Td>
                  <Td>
                    <ContractStatusBadge status={f.contractStatus} />
                  </Td>
                  <Td>
                    <span style={{ color: f.contractStatus === "expiring" ? "#ffc107" : "#8888bb", fontSize: 12 }}>
                      {f.contractEndDate}
                    </span>
                  </Td>
                  <Td>
                    <button
                      onClick={() => setShowFinanceDetail(f.advertiserId)}
                      style={{ padding: "4px 10px", background: "rgba(37,244,238,0.1)", border: "1px solid rgba(37,244,238,0.25)", borderRadius: 4, color: "#25F4EE", fontSize: 11, cursor: "pointer" }}
                    >
                      详情
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 合同管理 */}
      {activeTab === "contracts" && (
        <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                <Th>合同编号</Th>
                <Th>广告主</Th>
                <Th>合同名称</Th>
                <Th>合作政策</Th>
                <Th alignRight>合同金额</Th>
                <Th alignRight>服务费率</Th>
                <Th alignRight>授信额度</Th>
                <Th>有效期</Th>
                <Th>状态</Th>
                <Th>操作</Th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <Td>
                    <span style={{ color: "#25F4EE", fontFamily: "monospace", fontSize: 12 }}>{c.contractNo}</span>
                  </Td>
                  <Td highlight>{c.advertiserName}</Td>
                  <Td>{c.contractName}</Td>
                  <Td><PolicyBadge type={c.policyType} /></Td>
                  <Td alignRight>¥{c.contractAmount.toLocaleString()}</Td>
                  <Td alignRight>{c.serviceFeeRate}%</Td>
                  <Td alignRight>¥{c.creditLimit.toLocaleString()}</Td>
                  <Td>
                    <div style={{ fontSize: 11 }}>
                      <div style={{ color: "#8888bb" }}>{c.startDate}</div>
                      <div style={{ color: c.status === "expiring" ? "#ffc107" : "#6666aa" }}>至 {c.endDate}</div>
                    </div>
                  </Td>
                  <Td><ContractStatusBadge status={c.status} /></Td>
                  <Td>
                    <button
                      onClick={() => setShowContractDetail(c.id)}
                      style={{ padding: "4px 10px", background: "rgba(37,244,238,0.1)", border: "1px solid rgba(37,244,238,0.25)", borderRadius: 4, color: "#25F4EE", fontSize: 11, cursor: "pointer" }}
                    >
                      详情
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 本月结算 */}
      {activeTab === "settlements" && (
        <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                <Th>结算单号</Th>
                <Th>广告主</Th>
                <Th>结算周期</Th>
                <Th alignRight>总消耗</Th>
                <Th alignRight>服务费</Th>
                <Th alignRight>结算金额</Th>
                <Th>状态</Th>
                <Th>发票信息</Th>
                <Th>应付款日期</Th>
                <Th>操作</Th>
              </tr>
            </thead>
            <tbody>
              {filteredSettlements.map((s) => (
                <tr key={s.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <Td>
                    <span style={{ color: "#25F4EE", fontFamily: "monospace", fontSize: 12 }}>{s.id}</span>
                  </Td>
                  <Td highlight>{s.advertiserName}</Td>
                  <Td>
                    <span style={{ fontSize: 12 }}>{s.startDate} ~ {s.endDate}</span>
                  </Td>
                  <Td alignRight>
                    <span style={{ color: "#FE2C55", fontWeight: 500 }}>¥{s.totalSpend.toLocaleString()}</span>
                  </Td>
                  <Td alignRight>¥{s.serviceFee.toLocaleString()}</Td>
                  <Td alignRight>
                    <span style={{ color: "#e0e0f0", fontWeight: 600 }}>¥{s.totalAmount.toLocaleString()}</span>
                  </Td>
                  <Td><SettlementStatusBadge status={s.status} /></Td>
                  <Td>
                    {s.invoiceNo ? (
                      <div style={{ fontSize: 11 }}>
                        <div style={{ color: "#25F4EE" }}>{s.invoiceNo}</div>
                        <div style={{ color: "#6666aa" }}>{s.invoiceDate}</div>
                      </div>
                    ) : (
                      <span style={{ color: "#6666aa" }}>-</span>
                    )}
                  </Td>
                  <Td>
                    <span style={{ color: "#8888bb", fontSize: 12 }}>{s.paymentDueDate}</span>
                  </Td>
                  <Td>
                    <div style={{ display: "flex", gap: 6 }}>
                      {s.status === "pending" && (
                        <button style={{ padding: "4px 10px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 4, color: "#10b981", fontSize: 11, cursor: "pointer" }}>
                          确认
                        </button>
                      )}
                      {s.status === "confirmed" && (
                        <button style={{ padding: "4px 10px", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", borderRadius: 4, color: "#a855f7", fontSize: 11, cursor: "pointer" }}>
                          开票
                        </button>
                      )}
                      <button style={{ padding: "4px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, color: "#8888bb", fontSize: 11, cursor: "pointer" }}>
                        详情
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: 16, background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#8888bb" }}>本月结算汇总</span>
              <div style={{ display: "flex", gap: 24 }}>
                <span>总消耗：<span style={{ color: "#FE2C55", fontWeight: 600 }}>¥{settlements.reduce((s, i) => s + i.totalSpend, 0).toLocaleString()}</span></span>
                <span>服务费：<span style={{ color: "#ffc107", fontWeight: 600 }}>¥{settlements.reduce((s, i) => s + i.serviceFee, 0).toLocaleString()}</span></span>
                <span>结算总额：<span style={{ color: "#e0e0f0", fontWeight: 600 }}>¥{settlements.reduce((s, i) => s + i.totalAmount, 0).toLocaleString()}</span></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 回款记录 */}
      {activeTab === "payments" && (
        <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                <Th>回款单号</Th>
                <Th>广告主</Th>
                <Th alignRight>回款金额</Th>
                <Th>回款方式</Th>
                <Th>银行信息</Th>
                <Th>回款日期</Th>
                <Th>备注</Th>
                <Th>录入人</Th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <Td>
                    <span style={{ color: "#25F4EE", fontFamily: "monospace", fontSize: 12 }}>{p.id}</span>
                  </Td>
                  <Td highlight>{p.advertiserName}</Td>
                  <Td alignRight>
                    <span style={{ color: "#10b981", fontWeight: 600, fontSize: 14 }}>¥{p.amount.toLocaleString()}</span>
                  </Td>
                  <Td>{p.paymentMethod}</Td>
                  <Td>
                    <div style={{ fontSize: 11 }}>
                      <div style={{ color: "#8888bb" }}>{p.bankName}</div>
                      <div style={{ color: "#6666aa" }}>{p.bankAccount}</div>
                    </div>
                  </Td>
                  <Td>
                    <span style={{ color: "#e0e0f0" }}>{p.paymentDate}</span>
                  </Td>
                  <Td>
                    <span style={{ color: "#8888bb", fontSize: 12 }}>{p.remark || "-"}</span>
                  </Td>
                  <Td>
                    <span style={{ color: "#a855f7", fontSize: 12 }}>{p.createdBy}</span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ padding: 16, background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={{ color: "#8888bb" }}>本月回款汇总</span>
              <span>回款总额：<span style={{ color: "#10b981", fontWeight: 600 }}>¥{paymentRecords.reduce((s, i) => s + i.amount, 0).toLocaleString()}</span></span>
            </div>
          </div>
        </div>
      )}

      {/* 合同详情弹窗 */}
      {showContractDetail && (
        <DetailModal title="合同详情" onClose={() => setShowContractDetail(null)}>
          {(() => {
            const c = contracts.find((x) => x.id === showContractDetail);
            if (!c) return null;
            const policy = policyConfigs.find((p) => p.type === c.policyType);
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <DetailItem label="合同编号" value={c.contractNo} />
                  <DetailItem label="广告主" value={c.advertiserName} />
                  <DetailItem label="合同名称" value={c.contractName} />
                  <DetailItem label="合作政策" value={<PolicyBadge type={c.policyType} />} />
                  <DetailItem label="合同金额" value={`¥${c.contractAmount.toLocaleString()}`} />
                  <DetailItem label="服务费率" value={`${c.serviceFeeRate}%`} />
                  <DetailItem label="授信额度" value={`¥${c.creditLimit.toLocaleString()}`} />
                  <DetailItem label="结算周期" value={`${c.paymentCycle}天`} />
                  <DetailItem label="开始日期" value={c.startDate} />
                  <DetailItem label="结束日期" value={c.endDate} />
                  <DetailItem label="签约人" value={c.signedBy} />
                  <DetailItem label="签约日期" value={c.signedDate} />
                </div>
                {policy && (
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 12, color: "#8888bb", marginBottom: 8 }}>政策权益</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {policy.benefits.map((b, i) => (
                        <span key={i} style={{ padding: "4px 10px", background: "rgba(37,244,238,0.1)", borderRadius: 4, fontSize: 11, color: "#25F4EE" }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {c.remark && (
                  <div>
                    <span style={{ fontSize: 12, color: "#8888bb" }}>备注：</span>
                    <span style={{ color: "#e0e0f0" }}>{c.remark}</span>
                  </div>
                )}
              </div>
            );
          })()}
        </DetailModal>
      )}

      {/* 财务详情弹窗 */}
      {showFinanceDetail && (
        <DetailModal title="财务详情" onClose={() => setShowFinanceDetail(null)}>
          {(() => {
            const f = advertiserFinances.find((x) => x.advertiserId === showFinanceDetail);
            if (!f) return null;
            const c = contracts.find((x) => x.advertiserId === f.advertiserId);
            const s = settlements.filter((x) => x.advertiserId === f.advertiserId);
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 14 }}>
                  <h4 style={{ fontSize: 13, color: "#25F4EE", margin: "0 0 12px 0" }}>账户信息</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <DetailItem label="账户余额" value={`¥${f.balance.toLocaleString()}`} />
                    <DetailItem label="可用授信" value={`¥${f.availableCredit.toLocaleString()}`} />
                    <DetailItem label="本月消耗" value={`¥${f.monthSpend.toLocaleString()}`} />
                    <DetailItem label="本月充值" value={`¥${f.monthRecharge.toLocaleString()}`} />
                    <DetailItem label="累计消耗" value={`¥${f.totalSpend.toLocaleString()}`} />
                    <DetailItem label="累计回款" value={`¥${f.totalPayment.toLocaleString()}`} />
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 14 }}>
                  <h4 style={{ fontSize: 13, color: "#25F4EE", margin: "0 0 12px 0" }}>合同信息</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <DetailItem label="合同编号" value={f.contractNo} />
                    <DetailItem label="合作政策" value={<PolicyBadge type={f.policyType} />} />
                    <DetailItem label="合同到期" value={f.contractEndDate} />
                    <DetailItem label="合同状态" value={<ContractStatusBadge status={f.contractStatus} />} />
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 14 }}>
                  <h4 style={{ fontSize: 13, color: "#25F4EE", margin: "0 0 12px 0" }}>财务联系人</h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    <DetailItem label="联系人" value={f.financeContact} />
                    <DetailItem label="电话" value={f.financePhone} />
                    <DetailItem label="邮箱" value={f.financeEmail} />
                  </div>
                </div>
                {f.overdueAmount > 0 && (
                  <div style={{ background: "rgba(254,44,85,0.08)", borderRadius: 8, padding: 14, border: "1px solid rgba(254,44,85,0.2)" }}>
                    <h4 style={{ fontSize: 13, color: "#FE2C55", margin: "0 0 8px 0" }}>逾期信息</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <DetailItem label="逾期金额" value={`¥${f.overdueAmount.toLocaleString()}`} />
                      <DetailItem label="逾期天数" value={`${f.overdueDays}天`} />
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </DetailModal>
      )}
    </DashboardLayout>
  );
}

// 组件
function SummaryCard({ label, value, color, isWarning }: { label: string; value: string; color: string; isWarning?: boolean }) {
  return (
    <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 11, color: "#8888bb", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color }}>{isWarning && <span style={{ marginRight: 4 }}>⚠️</span>}{value}</div>
    </div>
  );
}

function PolicyBadge({ type }: { type: PolicyType }) {
  const config = policyConfigs.find((p) => p.type === type);
  return (
    <span style={{
      padding: "3px 10px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      background: `${config?.color}20`,
      color: config?.color,
      border: `1px solid ${config?.color}40`,
    }}>
      {config?.label || type}
    </span>
  );
}

function ContractStatusBadge({ status }: { status: ContractStatus }) {
  const cfg: Record<ContractStatus, { bg: string; color: string }> = {
    active: { bg: "rgba(16,185,129,0.12)", color: "#10b981" },
    expiring: { bg: "rgba(245,158,11,0.12)", color: "#ffc107" },
    expired: { bg: "rgba(254,44,85,0.12)", color: "#FE2C55" },
    terminated: { bg: "rgba(255,255,255,0.06)", color: "#8888bb" },
  };
  return (
    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: cfg[status].bg, color: cfg[status].color }}>
      {contractStatusLabels[status]}
    </span>
  );
}

function SettlementStatusBadge({ status }: { status: SettlementStatus }) {
  const cfg: Record<SettlementStatus, { bg: string; color: string }> = {
    pending: { bg: "rgba(245,158,11,0.12)", color: "#ffc107" },
    confirmed: { bg: "rgba(37,244,238,0.12)", color: "#25F4EE" },
    invoiced: { bg: "rgba(168,85,247,0.12)", color: "#a855f7" },
    paid: { bg: "rgba(16,185,129,0.12)", color: "#10b981" },
  };
  return (
    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: cfg[status].bg, color: cfg[status].color }}>
      {settlementStatusLabels[status]}
    </span>
  );
}

function Th({ children, alignRight }: { children: React.ReactNode; alignRight?: boolean }) {
  return (
    <th style={{ padding: "12px 14px", textAlign: alignRight ? "right" : "left", fontSize: 11, color: "#6666aa", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", whiteSpace: "nowrap" }}>
      {children}
    </th>
  );
}

function Td({ children, highlight, alignRight }: { children: React.ReactNode; highlight?: boolean; alignRight?: boolean }) {
  return (
    <td style={{ padding: "12px 14px", fontSize: 13, color: highlight ? "#e0e0f0" : "#9999bb", fontWeight: highlight ? 500 : 400, textAlign: alignRight ? "right" : "left" }}>
      {children}
    </td>
  );
}

function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <span style={{ fontSize: 11, color: "#8888bb" }}>{label}：</span>
      <span style={{ fontSize: 13, color: "#e0e0f0" }}>{value}</span>
    </div>
  );
}

function DetailModal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "24px 28px", width: 600, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#e0e0f0", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#8888bb", fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}