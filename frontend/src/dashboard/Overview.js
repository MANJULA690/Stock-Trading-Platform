import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="tx-card">
      <div style={{ fontSize:"0.75rem", color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"0.5rem" }}>{label}</div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.7rem", fontWeight:500, color:accent||"var(--text-primary)", lineHeight:1, marginBottom:"0.4rem" }}>{value}</div>
      {sub && <div style={{ fontSize:"0.78rem", color:"var(--text-secondary)" }}>{sub}</div>}
    </div>
  );
}

export default function Overview() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("/api/portfolio"),
      axios.get("/api/orders?limit=5"),
    ]).then(([p, o]) => {
      setPortfolio(p.data);
      setOrders(o.data.orders);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  // Build fake portfolio chart data
  const chartData = Array.from({ length: 30 }, (_, i) => {
    const base = (portfolio?.summary?.totalInvested || 100000) * 0.9;
    return {
      day: `D${i+1}`,
      value: Math.round(base * (1 + (Math.random() - 0.46) * 0.015) * (1 + i * 0.002)),
    };
  });

  const pnl = portfolio?.summary?.totalPnl || 0;
  const pnlPct = portfolio?.summary?.totalPnlPercent || 0;

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60vh", color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>
      Loading portfolio...
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom:"1.5rem" }}>
        <h1 style={{ fontSize:"1.5rem", marginBottom:"0.25rem" }}>Good morning, {user?.name?.split(" ")[0]} 👋</h1>
        <p style={{ color:"var(--text-secondary)", fontSize:"0.875rem" }}>Here's your portfolio summary for today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid-4" style={{ marginBottom:"1.5rem" }}>
        <StatCard label="Available Balance" value={`₹${(user?.accountBalance||0).toLocaleString("en-IN",{minimumFractionDigits:2})}`} accent="var(--accent)" />
        <StatCard label="Invested Value" value={`₹${(portfolio?.summary?.totalInvested||0).toLocaleString("en-IN",{maximumFractionDigits:0})}`} />
        <StatCard label="Current Value" value={`₹${(portfolio?.summary?.currentValue||0).toLocaleString("en-IN",{maximumFractionDigits:0})}`} />
        <StatCard
          label="Total P&L"
          value={`${pnl>=0?"+":""}₹${Math.abs(pnl).toLocaleString("en-IN",{maximumFractionDigits:0})}`}
          sub={`${pnl>=0?"+":""}${pnlPct}%`}
          accent={pnl>=0?"var(--green)":"var(--red)"}
        />
      </div>

      {/* Chart + Holdings */}
      <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:"1.5rem", marginBottom:"1.5rem" }}>
        <div className="tx-card">
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"1.25rem" }}>
            <h2 style={{ fontSize:"1rem" }}>Portfolio Performance</h2>
            <span style={{ fontSize:"0.78rem", color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>30 days</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:8, fontFamily:"var(--font-mono)", fontSize:"0.8rem" }}
                labelStyle={{ color:"var(--text-muted)" }}
                formatter={v => [`₹${v.toLocaleString("en-IN")}`, "Value"]}
              />
              <Area type="monotone" dataKey="value" stroke="#00d4aa" strokeWidth={2} fill="url(#pvGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="tx-card">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
            <h2 style={{ fontSize:"1rem" }}>Holdings</h2>
            <Link to="/dashboard/holdings" style={{ fontSize:"0.78rem", color:"var(--accent)" }}>View all →</Link>
          </div>
          {portfolio?.holdings?.length === 0 ? (
            <div style={{ textAlign:"center", padding:"2rem 0", color:"var(--text-muted)", fontSize:"0.875rem" }}>
              No holdings yet.<br/>
              <Link to="/dashboard/markets" style={{ color:"var(--accent)", marginTop:"0.5rem", display:"inline-block" }}>Start trading →</Link>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
              {(portfolio?.holdings||[]).slice(0,5).map(h => {
                const pnl = h.quantity*(h.currentPrice-h.avgBuyPrice);
                return (
                  <div key={h.symbol} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontFamily:"var(--font-mono)", fontWeight:500, fontSize:"0.875rem" }}>{h.symbol}</div>
                      <div style={{ fontSize:"0.75rem", color:"var(--text-muted)" }}>{h.quantity} shares</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.875rem" }}>₹{(h.currentPrice*h.quantity).toLocaleString("en-IN",{maximumFractionDigits:0})}</div>
                      <div style={{ fontSize:"0.75rem", color:pnl>=0?"var(--green)":"var(--red)", fontFamily:"var(--font-mono)" }}>
                        {pnl>=0?"+":""}₹{Math.abs(pnl).toFixed(0)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent orders */}
      <div className="tx-card">
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
          <h2 style={{ fontSize:"1rem" }}>Recent Orders</h2>
          <Link to="/dashboard/orders" style={{ fontSize:"0.78rem", color:"var(--accent)" }}>View all →</Link>
        </div>
        {orders.length === 0 ? (
          <p style={{ color:"var(--text-muted)", fontSize:"0.875rem", textAlign:"center", padding:"1.5rem 0" }}>No orders yet. <Link to="/dashboard/markets" style={{ color:"var(--accent)" }}>Go to markets</Link></p>
        ) : (
          <table className="tx-table">
            <thead><tr><th>Symbol</th><th>Type</th><th>Qty</th><th>Price</th><th>Value</th><th>Status</th><th>Time</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td style={{ fontFamily:"var(--font-mono)", fontWeight:600 }}>{o.symbol}</td>
                  <td><span className={`tx-badge ${o.orderType==="BUY"?"tx-badge-green":"tx-badge-red"}`}>{o.orderType}</span></td>
                  <td style={{ fontFamily:"var(--font-mono)" }}>{o.quantity}</td>
                  <td style={{ fontFamily:"var(--font-mono)" }}>₹{o.price.toLocaleString("en-IN")}</td>
                  <td style={{ fontFamily:"var(--font-mono)" }}>₹{(o.quantity*o.price).toLocaleString("en-IN",{maximumFractionDigits:0})}</td>
                  <td><span className="tx-badge tx-badge-green">{o.status}</span></td>
                  <td style={{ fontSize:"0.78rem", color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>{new Date(o.createdAt).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}