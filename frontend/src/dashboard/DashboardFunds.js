import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function DashboardFunds() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleAddFunds = async () => {
    if (!amount || amount <= 0) return;
    setLoading(true);
    setMsg("");
    try {
      const res = await axios.put("/api/user/add-funds", { amount: Number(amount) });
      setMsg("✅ " + res.data.message);
      setAmount("");
      window.location.reload();
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.error || "Failed"));
    } finally {
      setLoading(false);
    }
  };

  const QUICK = [1000, 5000, 10000, 25000, 50000];

  return (
    <div>
      <h1 style={{ fontSize:"1.5rem", marginBottom:"1.5rem" }}>Funds</h1>

      <div className="grid-2" style={{ gap:"2rem", alignItems:"start" }}>
        <div>
          {/* Balance card */}
          <div className="tx-card" style={{ marginBottom:"1.5rem", background:"linear-gradient(135deg, var(--bg-card), var(--bg-card-hover))", border:"1px solid var(--border-accent)" }}>
            <div style={{ fontSize:"0.75rem", color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.5rem" }}>Available Balance</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"2.5rem", fontWeight:500, color:"var(--accent)", marginBottom:"0.25rem" }}>
              ₹{(user?.accountBalance||0).toLocaleString("en-IN",{minimumFractionDigits:2})}
            </div>
            <div style={{ fontSize:"0.78rem", color:"var(--text-muted)" }}>Ready to trade</div>
          </div>

          {/* Fund limits */}
          <div className="tx-card">
            <h3 style={{ fontSize:"0.9rem", marginBottom:"1.25rem", color:"var(--text-secondary)" }}>Fund Summary</h3>
            {[
              ["Available Margin", `₹${(user?.accountBalance||0).toLocaleString("en-IN",{minimumFractionDigits:2})}`],
              ["Total Invested", `₹${(user?.totalInvested||0).toLocaleString("en-IN",{maximumFractionDigits:0})}`],
              ["Used Margin", "—"],
              ["Available Cash", `₹${(user?.accountBalance||0).toLocaleString("en-IN",{minimumFractionDigits:2})}`],
            ].map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"0.6rem 0", borderBottom:"1px solid var(--border)", fontSize:"0.875rem" }}>
                <span style={{ color:"var(--text-secondary)" }}>{l}</span>
                <span style={{ fontFamily:"var(--font-mono)", color:"var(--text-primary)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add funds */}
        <div className="tx-card">
          <h3 style={{ fontSize:"1rem", marginBottom:"1.5rem" }}>Add Funds</h3>

          <div style={{ marginBottom:"1.25rem" }}>
            <label className="tx-label">Amount (₹)</label>
            <input className="tx-input" type="number" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} min={1} style={{ fontSize:"1.1rem" }} />
          </div>

          <div style={{ marginBottom:"1.25rem" }}>
            <label className="tx-label" style={{ marginBottom:"0.6rem" }}>Quick Select</label>
            <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
              {QUICK.map(q => (
                <button key={q} onClick={() => setAmount(q)} style={{ padding:"0.4rem 0.8rem", border:"1px solid var(--border)", borderRadius:6, background:Number(amount)===q?"var(--accent-glow)":"transparent", color:Number(amount)===q?"var(--accent)":"var(--text-secondary)", cursor:"pointer", fontSize:"0.82rem", fontFamily:"var(--font-mono)", transition:"all 0.2s" }}>
                  ₹{q.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background:"var(--bg-secondary)", borderRadius:8, padding:"0.875rem", marginBottom:"1.25rem", fontSize:"0.82rem" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.35rem" }}>
              <span style={{ color:"var(--text-muted)" }}>Payment Method</span>
              <span style={{ color:"var(--text-secondary)" }}>UPI / NEFT / RTGS</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ color:"var(--text-muted)" }}>Processing Time</span>
              <span style={{ color:"var(--green)" }}>Instant (UPI)</span>
            </div>
          </div>

          {msg && <p style={{ fontSize:"0.875rem", marginBottom:"1rem", color:msg.startsWith("✅")?"var(--green)":"var(--red)" }}>{msg}</p>}

          <button className="btn-primary-tx" onClick={handleAddFunds} disabled={loading||!amount} style={{ width:"100%", justifyContent:"center", opacity:(loading||!amount)?0.6:1 }}>
            {loading ? "Processing..." : `Add ₹${Number(amount||0).toLocaleString("en-IN")} →`}
          </button>
          <p style={{ textAlign:"center", fontSize:"0.75rem", color:"var(--text-muted)", marginTop:"0.75rem" }}>Funds reflect instantly in your TradeX account</p>
        </div>
      </div>
    </div>
  );
}