import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    axios.get("/api/orders?limit=100")
      .then(r => setOrders(r.data.orders))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "ALL" ? orders : orders.filter(o => o.orderType === filter);

  return (
    <div>
      <h1 style={{ fontSize:"1.5rem", marginBottom:"1.5rem" }}>Order History</h1>

      {/* Filter tabs */}
      <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.5rem" }}>
        {["ALL","BUY","SELL"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding:"0.45rem 1rem", borderRadius:"6px", border:"1px solid", borderColor:filter===f?"var(--accent)":"var(--border)", background:filter===f?"var(--accent-glow)":"transparent", color:filter===f?"var(--accent)":"var(--text-secondary)", fontSize:"0.85rem", cursor:"pointer", fontFamily:"var(--font-mono)", transition:"all 0.2s" }}>
            {f}
          </button>
        ))}
        <span style={{ marginLeft:"auto", color:"var(--text-muted)", fontSize:"0.82rem", alignSelf:"center", fontFamily:"var(--font-mono)" }}>{filtered.length} orders</span>
      </div>

      <div className="tx-card" style={{ padding:0, overflow:"hidden" }}>
        {loading ? (
          <div style={{ textAlign:"center", padding:"3rem", color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"4rem", color:"var(--text-muted)" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>📋</div>
            <p>No orders found.</p>
          </div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Product</th>
                  <th>Variety</th>
                  <th style={{ textAlign:"right" }}>Qty</th>
                  <th style={{ textAlign:"right" }}>Price</th>
                  <th style={{ textAlign:"right" }}>Value</th>
                  <th style={{ textAlign:"right" }}>Brokerage</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o._id}>
                    <td style={{ fontFamily:"var(--font-mono)", fontWeight:700 }}>{o.symbol}</td>
                    <td><span className={`tx-badge ${o.orderType==="BUY"?"tx-badge-green":"tx-badge-red"}`}>{o.orderType}</span></td>
                    <td style={{ fontSize:"0.8rem", color:"var(--text-secondary)" }}>{o.productType}</td>
                    <td style={{ fontSize:"0.8rem", color:"var(--text-secondary)" }}>{o.orderVariety}</td>
                    <td style={{ textAlign:"right", fontFamily:"var(--font-mono)" }}>{o.quantity}</td>
                    <td style={{ textAlign:"right", fontFamily:"var(--font-mono)" }}>₹{o.price.toLocaleString("en-IN")}</td>
                    <td style={{ textAlign:"right", fontFamily:"var(--font-mono)" }}>₹{(o.quantity*o.price).toLocaleString("en-IN",{maximumFractionDigits:0})}</td>
                    <td style={{ textAlign:"right", fontFamily:"var(--font-mono)", color:"var(--amber)" }}>₹{(o.brokerage||0).toFixed(2)}</td>
                    <td><span className="tx-badge tx-badge-green">{o.status}</span></td>
                    <td style={{ fontSize:"0.78rem", color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>
                      {new Date(o.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"2-digit"})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}