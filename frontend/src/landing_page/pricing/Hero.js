import React from "react";

export default function PricingHero() {
  return (
    <section style={{ padding:"5rem 0 3rem", background:"linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)", borderBottom:"1px solid var(--border)", textAlign:"center" }}>
      <div className="container-tx">
        <p className="overline" style={{ marginBottom:"1rem" }}>Pricing</p>
        <h1 style={{ fontSize:"clamp(2rem, 4vw, 3.5rem)", marginBottom:"1rem" }}>Unbeatable, transparent pricing</h1>
        <p style={{ color:"var(--text-secondary)", fontSize:"1.05rem", maxWidth:"540px", margin:"0 auto", lineHeight:1.8 }}>
          We pioneered discount broking in India. Flat fees, no hidden charges, no surprises — ever.
        </p>
      </div>
    </section>
  );
}