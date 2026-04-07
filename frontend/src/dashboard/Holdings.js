import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Holdings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/portfolio")
      .then(r => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color:"var(--text-muted)", fontFamily:"var(--font-mono)", padding:"3rem", textAlign:"center" }}>Loading holdings...</div>;

  const s = data?.summary || {};
  const holdings = data?.holdings || [];

  return (
    <div>
      <h1 style={{ fontSize:"1.5rem", marginBottom:"1.5rem" }}>Holdings</h1>

      {/* Summary cards */}
      <div className="grid-4" style={{ marginBottom:"1.5rem" }}>
        {[
          { label:"Invested", value:`₹${(s.totalInvested||0).toLocaleString("en-IN",{maximumFractionDigits:0})}` },
          { label:"Current Value", value:`₹${(s.currentValue||0).toLocaleString("en-IN",{maximumFractionDigits:0})}` },
          { label:"Day P&L", value:"—", accent:"var(--text-muted)" },
          { label:"Total P&L", value:`${(s.totalPnl||0)>=0?"+":""}₹${Math.abs(s.totalPnl||0).toLocaleString("en-IN",{maximumFractionDigits:0})}`, accent:(s.totalPnl||0)>=0?"var(--green)":"var(--red)" },
        ].map(c => (
          <div key={c.label} className="tx-card">
            <div style={{ fontSize:"0.72rem", color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.4rem" }}>{c.label}</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.4rem", fontWeight:500, color:c.accent||"var(--text-primary)" }}>{c.value}</div>
          </div>
        ))}
      </div>

      {/* Holdings table */}
      <div className="tx-card" style={{ padding:0, overflow:"hidden" }}>
        <div style={{ padding:"1.25rem 1.5rem", borderBottom:"1px solid var(--border)" }}>
          <h2 style={{ fontSize:"1rem" }}>Your Holdings ({holdings.length})</h2>
        </div>
        {holdings.length === 0 ? (
          <div style={{ textAlign:"center", padding:"4rem", color:"var(--text-muted)" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>📭</div>
            <p>No holdings yet. Start by buying stocks from Markets.</p>
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th style={{ textAlign:"right" }}>Qty</th>
                  <th style={{ textAlign:"right" }}>Avg Price</th>
                  <th style={{ textAlign:"right" }}>LTP</th>
                  <th style={{ textAlign:"right" }}>Invested</th>
                  <th style={{ textAlign:"right" }}>Current</th>
                  <th style={{ textAlign:"right" }}>P&L</th>
                  <th style={{ textAlign:"right" }}>P&L%</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map(h => {
                  const inv = h.quantity * h.avgBuyPrice;
                  const cur = h.quantity * h.currentPrice;
                  const pnl = cur - inv;
                  const pct = ((pnl/inv)*100).toFixed(2);
                  return (
                    <tr key={h.symbol}>
                      <td style={{ fontFamily:"var(--font-mono)", fontWeight:700, color:"var(--text-primary)" }}>{h.symbol}</td>
                      <td style={{ fontSize:"0.82rem", color:"var(--text-secondary)" }}>{h.companyName || "—"}</td>
                      <td style={{ textAlign:"right", fontFamily:"var(--font-mono)" }}>{h.quantity}</td>
                      <td style={{ textAlign:"right", fontFamily:"var(--font-mono)" }}>₹{h.avgBuyPrice.toFixed(2)}</td>
                      <td style={{ textAlign:"right", fontFamily:"var(--font-mono)" }}>₹{h.currentPrice.toFixed(2)}</td>
                      <td style={{ textAlign:"right", fontFamily:"var(--font-mono)" }}>₹{inv.toLocaleString("en-IN",{maximumFractionDigits:0})}</td>
                      <td style={{ textAlign:"right", fontFamily:"var(--font-mono)" }}>₹{cur.toLocaleString("en-IN",{maximumFractionDigits:0})}</td>
                      <td style={{ textAlign:"right", fontFamily:"var(--font-mono)", color:pnl>=0?"var(--green)":"var(--red)" }}>
                        {pnl>=0?"+":""}₹{Math.abs(pnl).toFixed(0)}
                      </td>
                      <td style={{ textAlign:"right" }}>
                        <span className={`tx-badge ${pnl>=0?"tx-badge-green":"tx-badge-red"}`}>{pnl>=0?"+":""}{pct}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}