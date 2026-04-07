import React, { useState } from "react";

const FAQS = [
  { q:"How do I open an account?", a:"Click 'Open Account', fill in your email, phone and PAN. Complete e-KYC online in 10 minutes. Account is typically activated within 24 hours." },
  { q:"What documents are needed for KYC?", a:"PAN card, Aadhaar (for address proof), a selfie, and your bank account details. Everything is done online — no paperwork." },
  { q:"How do I add funds to my account?", a:"Log in, go to Dashboard → Funds → Add Funds. Supports UPI, NEFT, RTGS, and bank transfer. Funds reflect in 5-30 minutes." },
  { q:"What is the brokerage charged?", a:"Equity delivery is completely free (₹0). All other trades (intraday, F&O, commodities) are charged a flat ₹20 per executed order or 0.03% — whichever is lower." },
  { q:"How do I withdraw profits?", a:"Go to Dashboard → Funds → Withdraw. Funds are credited to your registered bank account within 24 hours (usually faster)." },
  { q:"Is my money safe with TradeX?", a:"Yes. Client funds are held in segregated accounts. We are SEBI registered and comply with all regulatory requirements. We have never had a security breach." },
];

export default function SupportHero() {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = FAQS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));

  return (
    <section style={{ padding:"5rem 0 3rem", background:"linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)", borderBottom:"1px solid var(--border)" }}>
      <div className="container-tx">
        <div style={{ textAlign:"center", marginBottom:"3rem" }}>
          <p className="overline" style={{ marginBottom:"1rem" }}>Support Center</p>
          <h1 style={{ fontSize:"clamp(2rem, 4vw, 3rem)", marginBottom:"1rem" }}>How can we help?</h1>
          <div style={{ maxWidth:"500px", margin:"0 auto", position:"relative" }}>
            <input
              className="tx-input"
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft:"2.75rem", fontSize:"1rem" }}
            />
            <span style={{ position:"absolute", left:"1rem", top:"50%", transform:"translateY(-50%)", color:"var(--text-muted)" }}>🔍</span>
          </div>
        </div>

        <div style={{ maxWidth:"720px", margin:"0 auto" }}>
          <h2 style={{ fontSize:"1.2rem", marginBottom:"1.5rem", color:"var(--text-secondary)" }}>Frequently Asked Questions</h2>
          {filtered.length === 0 ? (
            <p style={{ color:"var(--text-muted)", textAlign:"center", padding:"2rem" }}>No results found. Try creating a support ticket below.</p>
          ) : (
            filtered.map((faq, i) => (
              <div key={i} style={{ borderBottom:"1px solid var(--border)", overflow:"hidden" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1.25rem 0", background:"none", border:"none", cursor:"pointer", color:"var(--text-primary)", fontFamily:"var(--font-display)", fontWeight:600, fontSize:"0.95rem", textAlign:"left", gap:"1rem" }}>
                  <span>{faq.q}</span>
                  <span style={{ color:"var(--accent)", fontSize:"1.2rem", flexShrink:0, transition:"transform 0.2s", transform:open===i?"rotate(45deg)":"rotate(0)" }}>+</span>
                </button>
                {open === i && (
                  <p style={{ color:"var(--text-secondary)", lineHeight:1.8, paddingBottom:"1.25rem", fontSize:"0.9rem" }}>{faq.a}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}