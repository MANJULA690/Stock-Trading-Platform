import React, { useState } from "react";

const FEE_TABLE = [
  { segment:"Equity Delivery", brokerage:"Zero", stt:"0.1% on buy & sell", exchange:"0.00335% NSE / 0.003% BSE", sebi:"₹10 / crore", stamp:"0.015% on buy", total:"~0.1%" },
  { segment:"Equity Intraday", brokerage:"₹20 or 0.03%", stt:"0.025% on sell", exchange:"0.00335% NSE", sebi:"₹10 / crore", stamp:"0.003% on buy", total:"~0.05%" },
  { segment:"Equity Futures", brokerage:"₹20 or 0.03%", stt:"0.0125% on sell", exchange:"0.002% NSE", sebi:"₹10 / crore", stamp:"0.002% on buy", total:"~0.05%" },
  { segment:"Equity Options", brokerage:"₹20 per order", stt:"0.125% on sell (premium)", exchange:"0.053% NSE", sebi:"₹10 / crore", stamp:"0.003% on buy", total:"~₹20 flat" },
  { segment:"Currency Futures", brokerage:"₹20 or 0.03%", stt:"No STT", exchange:"0.00035% NSE", sebi:"₹10 / crore", stamp:"0.0001% on buy", total:"~₹20 flat" },
  { segment:"Commodity Futures", brokerage:"₹20 or 0.03%", stt:"0.01% on sell (non-agri)", exchange:"0.002% MCX", sebi:"₹10 / crore", stamp:"0.002% on buy", total:"~₹20 flat" },
];

export default function Brokerage() {
  const [qty, setQty] = useState(10);
  const [buyPrice, setBuyPrice] = useState(500);
  const [sellPrice, setSellPrice] = useState(510);

  const turnover = (qty * buyPrice) + (qty * sellPrice);
  const brokerage = Math.min(40, turnover * 0.0003);
  const stt = qty * sellPrice * 0.00025;
  const exchange = turnover * 0.0000335;
  const sebi = turnover * 0.000001;
  const total = brokerage + stt + exchange + sebi;
  const pnl = qty * (sellPrice - buyPrice);
  const netPnl = pnl - total;

  return (
    <section className="section">
      <div className="container-tx">

        {/* Brokerage Calculator */}
        <div style={{ marginBottom:"4rem" }}>
          <p className="overline" style={{ marginBottom:"0.75rem" }}>Brokerage Calculator</p>
          <h2 style={{ fontSize:"1.8rem", marginBottom:"0.5rem" }}>Calculate your exact costs</h2>
          <p style={{ color:"var(--text-secondary)", marginBottom:"2rem", fontSize:"0.9rem" }}>Based on Equity Intraday trade</p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
            <div className="tx-card">
              <h3 style={{ fontSize:"1rem", marginBottom:"1.5rem", color:"var(--text-secondary)" }}>Trade Parameters</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                <div>
                  <label className="tx-label">Quantity</label>
                  <input className="tx-input" type="number" value={qty} min={1} onChange={e => setQty(Number(e.target.value))} />
                </div>
                <div>
                  <label className="tx-label">Buy Price (₹)</label>
                  <input className="tx-input" type="number" value={buyPrice} min={1} onChange={e => setBuyPrice(Number(e.target.value))} />
                </div>
                <div>
                  <label className="tx-label">Sell Price (₹)</label>
                  <input className="tx-input" type="number" value={sellPrice} min={1} onChange={e => setSellPrice(Number(e.target.value))} />
                </div>
              </div>
            </div>

            <div className="tx-card">
              <h3 style={{ fontSize:"1rem", marginBottom:"1.5rem", color:"var(--text-secondary)" }}>Breakdown</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                {[
                  ["Brokerage", `₹${brokerage.toFixed(2)}`],
                  ["STT", `₹${stt.toFixed(2)}`],
                  ["Exchange Charges", `₹${exchange.toFixed(2)}`],
                  ["SEBI Charges", `₹${sebi.toFixed(4)}`],
                  ["Total Charges", `₹${total.toFixed(2)}`],
                ].map(([label, val]) => (
                  <div key={label} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.875rem", padding:"0.5rem 0", borderBottom:"1px solid var(--border)" }}>
                    <span style={{ color:"var(--text-secondary)" }}>{label}</span>
                    <span style={{ fontFamily:"var(--font-mono)", color:"var(--text-primary)" }}>{val}</span>
                  </div>
                ))}
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:"0.5rem" }}>
                  <span style={{ fontWeight:600 }}>Net P&L</span>
                  <span style={{ fontFamily:"var(--font-mono)", color:netPnl >= 0 ? "var(--green)" : "var(--red)", fontWeight:600, fontSize:"1.1rem" }}>
                    {netPnl >= 0 ? "+" : ""}₹{netPnl.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fee Table */}
        <div>
          <p className="overline" style={{ marginBottom:"0.75rem" }}>All Segments</p>
          <h2 style={{ fontSize:"1.8rem", marginBottom:"2rem" }}>Complete fee schedule</h2>
          <div style={{ overflowX:"auto" }}>
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Segment</th>
                  <th>Brokerage</th>
                  <th>STT/CTT</th>
                  <th>Exchange</th>
                  <th>SEBI</th>
                  <th>Stamp Duty</th>
                  <th>Approx Total</th>
                </tr>
              </thead>
              <tbody>
                {FEE_TABLE.map(row => (
                  <tr key={row.segment}>
                    <td style={{ fontWeight:600, color:"var(--text-primary)" }}>{row.segment}</td>
                    <td>
                      <span style={{ fontFamily:"var(--font-mono)", color: row.brokerage === "Zero" ? "var(--green)" : "var(--amber)" }}>
                        {row.brokerage}
                      </span>
                    </td>
                    <td style={{ fontSize:"0.82rem", color:"var(--text-secondary)" }}>{row.stt}</td>
                    <td style={{ fontSize:"0.82rem", color:"var(--text-secondary)" }}>{row.exchange}</td>
                    <td style={{ fontSize:"0.82rem", color:"var(--text-secondary)" }}>{row.sebi}</td>
                    <td style={{ fontSize:"0.82rem", color:"var(--text-secondary)" }}>{row.stamp}</td>
                    <td><span className="tx-badge tx-badge-amber">{row.total}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}