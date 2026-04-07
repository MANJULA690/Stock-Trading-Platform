import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderModal({ stock, onClose, onOrder }) {
  const [orderType, setOrderType] = useState("BUY");
  const [qty, setQty] = useState(1);
  const [productType, setProductType] = useState("CNC");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const total = qty * stock.price;
  const brokerage = productType === "CNC" ? 0 : Math.min(20, total * 0.0003);

  const handleSubmit = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await axios.post("/api/orders/place", {
        symbol: stock.symbol,
        companyName: stock.name,
        orderType,
        productType,
        orderVariety: "MARKET",
        quantity: qty,
        price: stock.price,
      });
      setMsg("✅ " + res.data.message);
      onOrder && onOrder();
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.error || "Order failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:2000 }} onClick={onClose}>
      <div style={{ background:"var(--bg-card)", border:"1px solid var(--border)", borderRadius:16, padding:"2rem", width:380, maxWidth:"90vw" }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"1.5rem" }}>
          <div>
            <h2 style={{ fontSize:"1.2rem", marginBottom:"0.2rem" }}>{stock.symbol}</h2>
            <p style={{ color:"var(--text-secondary)", fontSize:"0.82rem" }}>{stock.name}</p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"var(--text-secondary)", cursor:"pointer", fontSize:"1.2rem" }}>×</button>
        </div>

        <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.25rem" }}>
          {["BUY","SELL"].map(t => (
            <button key={t} onClick={() => setOrderType(t)} style={{ flex:1, padding:"0.6rem", border:"1px solid", borderRadius:8, cursor:"pointer", fontWeight:600, transition:"all 0.2s",
              borderColor: orderType===t ? (t==="BUY"?"var(--green)":"var(--red)") : "var(--border)",
              background: orderType===t ? (t==="BUY"?"rgba(0,212,170,0.15)":"rgba(255,77,109,0.15)") : "transparent",
              color: orderType===t ? (t==="BUY"?"var(--green)":"var(--red)") : "var(--text-secondary)",
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"1.25rem" }}>
          <div>
            <label className="tx-label">Market Price</label>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"1.4rem", color:"var(--text-primary)" }}>₹{stock.price.toFixed(2)}</div>
          </div>
          <div>
            <label className="tx-label">Product Type</label>
            <select className="tx-input" value={productType} onChange={e => setProductType(e.target.value)} style={{ cursor:"pointer" }}>
              <option value="CNC">CNC — Delivery (₹0 brokerage)</option>
              <option value="MIS">MIS — Intraday (₹20 flat)</option>
              <option value="NRML">NRML — Carry Forward</option>
            </select>
          </div>
          <div>
            <label className="tx-label">Quantity</label>
            <input className="tx-input" type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))} />
          </div>
        </div>

        <div style={{ background:"var(--bg-secondary)", borderRadius:8, padding:"0.875rem 1rem", marginBottom:"1.25rem", fontSize:"0.85rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.4rem" }}>
            <span style={{ color:"var(--text-muted)" }}>Order Value</span>
            <span style={{ fontFamily:"var(--font-mono)" }}>₹{total.toLocaleString("en-IN",{maximumFractionDigits:0})}</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.4rem" }}>
            <span style={{ color:"var(--text-muted)" }}>Brokerage</span>
            <span style={{ fontFamily:"var(--font-mono)", color:"var(--amber)" }}>{brokerage === 0 ? "₹0 Free" : `₹${brokerage.toFixed(2)}`}</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", fontWeight:600 }}>
            <span>Total</span>
            <span style={{ fontFamily:"var(--font-mono)", color:"var(--accent)" }}>₹{(total+brokerage).toLocaleString("en-IN",{maximumFractionDigits:0})}</span>
          </div>
        </div>

        {msg && <p style={{ fontSize:"0.85rem", marginBottom:"1rem", color:msg.startsWith("✅")?"var(--green)":"var(--red)" }}>{msg}</p>}

        <button onClick={handleSubmit} disabled={loading} className="btn-primary-tx" style={{ width:"100%", justifyContent:"center", background:orderType==="BUY"?"var(--accent)":"var(--red)", color:orderType==="BUY"?"#0a0b0f":"#fff", opacity:loading?0.7:1 }}>
          {loading ? "Placing..." : `${orderType} ${qty} × ${stock.symbol}`}
        </button>
      </div>
    </div>
  );
}

export default function Markets() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [sector, setSector] = useState("All");
  const sectors = ["All", ...new Set(stocks.map(s => s.sector))];

  const fetchStocks = () => {
    axios.get("/api/stocks")
      .then(r => setStocks(r.data.stocks))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStocks();
    const t = setInterval(fetchStocks, 10000); // refresh every 10s
    return () => clearInterval(t);
  }, []);

  const filtered = stocks.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
    const matchSector = sector === "All" || s.sector === sector;
    return matchSearch && matchSector;
  });

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem" }}>
        <div>
          <h1 style={{ fontSize:"1.5rem", marginBottom:"0.25rem" }}>Markets</h1>
          <p style={{ color:"var(--text-secondary)", fontSize:"0.85rem" }}>Live prices · Refreshes every 10s</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem", flexWrap:"wrap" }}>
        <input className="tx-input" type="text" placeholder="Search symbol or company..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth:280 }} />
        <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
          {sectors.map(s => (
            <button key={s} onClick={() => setSector(s)} style={{ padding:"0.4rem 0.75rem", border:"1px solid", borderRadius:6, cursor:"pointer", fontSize:"0.78rem", fontFamily:"var(--font-mono)", transition:"all 0.2s",
              borderColor:sector===s?"var(--accent)":"var(--border)", background:sector===s?"var(--accent-glow)":"transparent", color:sector===s?"var(--accent)":"var(--text-secondary)" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="tx-card" style={{ padding:0, overflow:"hidden" }}>
        {loading ? (
          <div style={{ textAlign:"center", padding:"3rem", color:"var(--text-muted)", fontFamily:"var(--font-mono)" }}>Loading market data...</div>
        ) : (
          <div style={{ overflowX:"auto" }}>
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Sector</th>
                  <th style={{ textAlign:"right" }}>Price</th>
                  <th style={{ textAlign:"right" }}>Change</th>
                  <th style={{ textAlign:"right" }}>Volume</th>
                  <th style={{ textAlign:"right" }}>52W H/L</th>
                  <th style={{ textAlign:"center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.symbol} style={{ cursor:"pointer" }}>
                    <td style={{ fontFamily:"var(--font-mono)", fontWeight:700 }}>{s.symbol}</td>
                    <td style={{ fontSize:"0.82rem", color:"var(--text-secondary)", maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</td>
                    <td><span className="tx-badge tx-badge-amber" style={{ fontSize:"0.7rem" }}>{s.sector}</span></td>
                    <td style={{ textAlign:"right", fontFamily:"var(--font-mono)", fontWeight:600 }}>₹{s.price.toFixed(2)}</td>
                    <td style={{ textAlign:"right" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.85rem", color:s.change>=0?"var(--green)":"var(--red)" }}>
                        {s.change>=0?"+":""}{s.change.toFixed(2)} ({s.changePercent>=0?"+":""}{s.changePercent}%)
                      </span>
                    </td>
                    <td style={{ textAlign:"right", fontFamily:"var(--font-mono)", fontSize:"0.82rem", color:"var(--text-secondary)" }}>{(s.volume/1000).toFixed(0)}K</td>
                    <td style={{ textAlign:"right", fontSize:"0.78rem", fontFamily:"var(--font-mono)", color:"var(--text-muted)" }}>
                      {s.week52High.toFixed(0)} / {s.week52Low.toFixed(0)}
                    </td>
                    <td style={{ textAlign:"center" }}>
                      <button className="btn-primary-tx" onClick={() => setSelected(s)} style={{ padding:"0.35rem 0.9rem", fontSize:"0.78rem" }}>
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <OrderModal stock={selected} onClose={() => setSelected(null)} onOrder={fetchStocks} />}
    </div>
  );
}