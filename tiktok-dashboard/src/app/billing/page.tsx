"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { billingRecords, advertisers } from "@/lib/mockData";

type BalanceFilter = "all" | "low" | "critical" | "warning";

export default function BillingPage() {
  const [tab, setTab] = useState<"records" | "balances">("records");
  const [typeFilter, setTypeFilter] = useState("all");
  const [balanceFilter, setBalanceFilter] = useState<BalanceFilter>("all");
  const [customThreshold, setCustomThreshold] = useState("");
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedAdv, setSelectedAdv] = useState("");

  const filteredRecords = billingRecords.filter((r) => typeFilter === "all" || r.type === typeFilter);

  // 低余额筛选逻辑
  const getBalanceStatus = (balance: number, totalBudget: number) => {
    const pct = (balance / totalBudget) * 100;
    if (pct <= 10 || balance <= 5000) return "critical"; // 严重低余额
    if (pct <= 20 || balance <= 10000) return "low"; // 低余额
    if (pct <= 30) return "warning"; // 预警
    return "normal";
  };

  const filteredAdvertisers = advertisers.filter((adv) => {
    if (balanceFilter === "all") return true;
    const status = getBalanceStatus(adv.balance, adv.totalBudget);
    if (balanceFilter === "critical") return status === "critical";
    if (balanceFilter === "low") return status === "critical" || status === "low";
    if (balanceFilter === "warning") return status === "critical" || status === "low" || status === "warning";
    return true;
  }).filter((adv) => {
    // 自定义阈值筛选
    if (customThreshold) {
      const threshold = parseInt(customThreshold);
      return adv.balance <= threshold;
    }
    return true;
  });

  // 低余额统计
  const lowBalanceStats = {
    critical: advertisers.filter((a) => getBalanceStatus(a.balance, a.totalBudget) === "critical").length,
    low: advertisers.filter((a) => getBalanceStatus(a.balance, a.totalBudget) === "low").length,
    warning: advertisers.filter((a) => getBalanceStatus(a.balance, a.totalBudget) === "warning").length,
  };
  const totalLowBalance = lowBalanceStats.critical + lowBalanceStats.low;

  const totalRecharge = billingRecords.filter((r) => r.type === "充值").reduce((s, r) => s + r.amount, 0);
  const totalConsume = billingRecords.filter((r) => r.type === "消耗").reduce((s, r) => s + Math.abs(r.amount), 0);
  const totalBalance = advertisers.reduce((s, a) => s + a.balance, 0);

  return (
    <DashboardLayout title="充值 & 账单">
      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "总余额", value: `¥${totalBalance.toLocaleString()}`, sub: "全部广告主", color: "#10b981", icon: "💰" },
          { label: "本月充值", value: `¥${totalRecharge.toLocaleString()}`, sub: "本月累计", color: "#25F4EE", icon: "⬆️" },
          { label: "本月消耗", value: `¥${totalConsume.toLocaleString()}`, sub: "本月累计", color: "#FE2C55", icon: "⬇️" },
          { label: "充值笔数", value: billingRecords.filter((r) => r.type === "充值").length, sub: "本月", color: "#a855f7", icon: "📑" },
        ].map((c) => (
          <div key={c.label} style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `${c.color}` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: "#8888bb", marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: c.color }}>{c.value}</div>
                <div style={{ fontSize: 11, color: "#5555770", marginTop: 4 }}>{c.sub}</div>
              </div>
              <span style={{ fontSize: 26 }}>{c.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tab + action */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 3 }}>
          {([["records", "充值记录"], ["balances", "账户余额"]] as const).map(([v, l]) => (
            <button key={v} onClick={() => setTab(v)}
              style={{ padding: "8px 20px", borderRadius: 6, border: "none", background: tab === v ? "linear-gradient(135deg, #FE2C55, #c9003e)" : "transparent", color: tab === v ? "white" : "#8888bb", fontSize: 13, fontWeight: tab === v ? 600 : 400, cursor: "pointer" }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {tab === "records" && (
            <div style={{ display: "flex", gap: 8 }}>
              {[{ v: "all", l: "全部" }, { v: "充值", l: "充值" }, { v: "消耗", l: "消耗" }].map((btn) => (
                <button key={btn.v} onClick={() => setTypeFilter(btn.v)}
                  style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid", borderColor: typeFilter === btn.v ? "#FE2C55" : "rgba(255,255,255,0.1)", background: typeFilter === btn.v ? "rgba(254,44,85,0.15)" : "transparent", color: typeFilter === btn.v ? "#FE2C55" : "#8888bb", fontSize: 12, cursor: "pointer" }}>
                  {btn.l}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={() => setShowRecharge(true)}
            style={{ padding: "9px 18px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 12px rgba(254,44,85,0.3)" }}>
            + 发起充值
          </button>
        </div>
      </div>

      {/* Low Balance Alert - 仅在账户余额tab显示 */}
      {tab === "balances" && totalLowBalance > 0 && (
        <div style={{ background: "rgba(254,44,85,0.08)", border: "1px solid rgba(254,44,85,0.2)", borderRadius: 10, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <span style={{ color: "#FE2C55", fontWeight: 600, fontSize: 13 }}>低余额预警：</span>
            <span style={{ color: "#e0e0f0", fontSize: 13, marginLeft: 6 }}>
              当前有 <span style={{ color: "#FE2C55", fontWeight: 700 }}>{lowBalanceStats.critical}</span> 个账户余额严重不足，
              <span style={{ color: "#ffc107", fontWeight: 700 }}>{lowBalanceStats.low}</span> 个账户余额偏低，请及时充值
            </span>
          </div>
          <button
            onClick={() => setBalanceFilter("low")}
            style={{ padding: "6px 14px", background: "rgba(254,44,85,0.15)", border: "1px solid rgba(254,44,85,0.3)", borderRadius: 6, color: "#FE2C55", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>
            查看低余额账户
          </button>
        </div>
      )}

      {/* Records table */}
      {tab === "records" && (
        <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                {["流水号", "广告主", "操作类型", "金额", "操作后余额", "操作人", "时间", "备注"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "#6666aa", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                  <td style={{ padding: "13px 16px", fontSize: 11, color: "#6666aa", fontFamily: "monospace" }}>{r.id}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#ccccee" }}>{r.advertiser}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: r.type === "充值" ? "rgba(37,244,238,0.12)" : "rgba(254,44,85,0.12)", color: r.type === "充值" ? "#25F4EE" : "#FE2C55", border: `1px solid ${r.type === "充值" ? "rgba(37,244,238,0.25)" : "rgba(254,44,85,0.25)"}` }}>
                      {r.type}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 700, color: r.type === "充值" ? "#25F4EE" : "#FE2C55" }}>
                    {r.type === "充值" ? "+" : ""}¥{Math.abs(r.amount).toLocaleString()}
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: "#e0e0f0" }}>¥{r.balance.toLocaleString()}</td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: "#9999cc" }}>{r.operator}</td>
                  <td style={{ padding: "13px 16px", fontSize: 11, color: "#6666aa" }}>{r.date}</td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: "#8888bb" }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Balances tab */}
      {tab === "balances" && (
        <>
          {/* 余额筛选栏 */}
          <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 3 }}>
              {[
                { v: "all" as BalanceFilter, l: "全部", count: advertisers.length },
                { v: "critical" as BalanceFilter, l: "严重不足", count: lowBalanceStats.critical, color: "#FE2C55" },
                { v: "low" as BalanceFilter, l: "余额偏低", count: lowBalanceStats.low, color: "#ffc107" },
                { v: "warning" as BalanceFilter, l: "预警", count: lowBalanceStats.warning, color: "#25F4EE" },
              ].map((btn) => (
                <button key={btn.v} onClick={() => setBalanceFilter(btn.v)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 6,
                    border: "none",
                    background: balanceFilter === btn.v ? "linear-gradient(135deg, #FE2C55, #c9003e)" : "transparent",
                    color: balanceFilter === btn.v ? "white" : (btn.color || "#8888bb"),
                    fontSize: 12,
                    cursor: "pointer",
                    fontWeight: balanceFilter === btn.v ? 600 : 400,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}>
                  {btn.l}
                  <span style={{
                    background: balanceFilter === btn.v ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                    padding: "1px 6px",
                    borderRadius: 10,
                    fontSize: 10,
                  }}>
                    {btn.count}
                  </span>
                </button>
              ))}
            </div>

            {/* 自定义阈值筛选 */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
              <span style={{ fontSize: 12, color: "#8888bb" }}>余额 ≤</span>
              <input
                type="number"
                value={customThreshold}
                onChange={(e) => setCustomThreshold(e.target.value)}
                placeholder="输入金额"
                style={{ width: 100, padding: "6px 10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#e0e0f0", fontSize: 12, outline: "none" }}
              />
              <span style={{ fontSize: 12, color: "#8888bb" }}>元</span>
              {customThreshold && (
                <button
                  onClick={() => setCustomThreshold("")}
                  style={{ padding: "4px 8px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 4, color: "#8888bb", fontSize: 11, cursor: "pointer" }}>
                  清除
                </button>
              )}
            </div>
          </div>

          {/* 余额表格 */}
          <div style={{ background: "rgba(20,20,40,0.8)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  {["广告主", "当前余额", "预算总额", "余额占比", "今日消耗", "状态", "操作"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, color: "#6666aa", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAdvertisers.map((adv) => {
                  const pct = (adv.balance / adv.totalBudget) * 100;
                  const balanceStatus = getBalanceStatus(adv.balance, adv.totalBudget);
                  const color = balanceStatus === "critical" ? "#FE2C55" : balanceStatus === "low" ? "#ffc107" : balanceStatus === "warning" ? "#25F4EE" : "#25F4EE";
                  return (
                    <tr key={adv.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: balanceStatus === "critical" ? "rgba(254,44,85,0.05)" : balanceStatus === "low" ? "rgba(255,193,7,0.03)" : "transparent" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = balanceStatus === "critical" ? "rgba(254,44,85,0.08)" : balanceStatus === "low" ? "rgba(255,193,7,0.06)" : "rgba(255,255,255,0.02)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = balanceStatus === "critical" ? "rgba(254,44,85,0.05)" : balanceStatus === "low" ? "rgba(255,193,7,0.03)" : "transparent")}>
                      <td style={{ padding: "13px 16px", fontSize: 13, color: "#e0e0f0", fontWeight: 500 }}>
                        {adv.name}
                        {balanceStatus === "critical" && <span style={{ marginLeft: 8, fontSize: 11, color: "#FE2C55" }}>⚠️ 急需充值</span>}
                        {balanceStatus === "low" && <span style={{ marginLeft: 8, fontSize: 11, color: "#ffc107" }}>⚡ 需充值</span>}
                      </td>
                      <td style={{ padding: "13px 16px", fontSize: 16, fontWeight: 700, color }}>¥{adv.balance.toLocaleString()}</td>
                      <td style={{ padding: "13px 16px", fontSize: 12, color: "#8888bb" }}>¥{adv.totalBudget.toLocaleString()}</td>
                      <td style={{ padding: "13px 16px", minWidth: 150 }}>
                        <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: color, borderRadius: 3 }} />
                        </div>
                        <div style={{ fontSize: 11, color, marginTop: 3 }}>{pct.toFixed(1)}%</div>
                      </td>
                      <td style={{ padding: "13px 16px", fontSize: 13, color: adv.todaySpend > 0 ? "#FE2C55" : "#6666aa" }}>
                        {adv.todaySpend > 0 ? `¥${adv.todaySpend.toLocaleString()}` : "—"}
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: adv.status === "active" ? "rgba(37,244,238,0.12)" : "rgba(255,255,255,0.06)", color: adv.status === "active" ? "#25F4EE" : "#8888bb", border: `1px solid ${adv.status === "active" ? "rgba(37,244,238,0.25)" : "rgba(255,255,255,0.1)"}` }}>
                          {adv.status === "active" ? "正常" : adv.status === "paused" ? "暂停" : "未激活"}
                        </span>
                      </td>
                      <td style={{ padding: "13px 16px" }}>
                        <button style={{ padding: "5px 14px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 5, color: "white", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                          充值
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredAdvertisers.length === 0 && (
              <div style={{ padding: 40, textAlign: "center", color: "#6666aa", fontSize: 13 }}>
                暂无符合条件的账户
              </div>
            )}
          </div>
        </>
      )}

      {/* Recharge modal */}
      {showRecharge && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(4px)" }} onClick={() => setShowRecharge(false)}>
          <div style={{ background: "#14142a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "32px", width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#e0e0f0", marginBottom: 20 }}>发起充值</div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>选择广告主</label>
              <select value={selectedAdv} onChange={(e) => setSelectedAdv(e.target.value)} style={{ width: "100%", padding: "10px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none" }}>
                <option value="" style={{ background: "#14142a" }}>请选择广告主</option>
                {advertisers.map((a) => <option key={a.id} value={a.id} style={{ background: "#14142a" }}>{a.name}（余额 ¥{a.balance.toLocaleString()}）</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>充值金额（元）</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="请输入金额"
                style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {[5000, 10000, 20000, 50000].map((v) => (
                  <button key={v} onClick={() => setAmount(String(v))} style={{ flex: 1, padding: "6px", background: amount === String(v) ? "rgba(254,44,85,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${amount === String(v) ? "#FE2C55" : "rgba(255,255,255,0.1)"}`, borderRadius: 6, color: amount === String(v) ? "#FE2C55" : "#8888bb", fontSize: 11, cursor: "pointer" }}>
                    ¥{v / 10000}万
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, color: "#9999bb", marginBottom: 6, display: "block" }}>备注（可选）</label>
              <input type="text" placeholder="充值备注说明" style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#e0e0f0", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowRecharge(false)} style={{ flex: 1, padding: "11px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#9999bb", fontSize: 14, cursor: "pointer" }}>取消</button>
              <button onClick={() => { if (!selectedAdv || !amount) { alert("请选择广告主并输入金额"); return; } alert(`充值成功！已为广告主充值 ¥${amount}`); setShowRecharge(false); setAmount(""); setSelectedAdv(""); }} style={{ flex: 2, padding: "11px", background: "linear-gradient(135deg, #FE2C55, #c9003e)", border: "none", borderRadius: 8, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                确认充值
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
