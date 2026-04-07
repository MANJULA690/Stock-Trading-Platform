import React from 'react';

export default function Hero() {
  return (
    <section style={{ padding:'5rem 0 3rem', background:'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)', borderBottom:'1px solid var(--border)' }}>
      <div className="container-tx">
        <p className="overline" style={{ marginBottom:'1rem' }}>Our Story</p>
        <h1 style={{ fontSize:'clamp(2rem, 4vw, 3.5rem)', maxWidth:'700px', marginBottom:'1.5rem' }}>
          We're rewriting the rules of stock broking in India.
        </h1>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem', marginTop:'3rem' }}>
          <p style={{ color:'var(--text-secondary)', lineHeight:1.9, fontSize:'1rem' }}>
            TradeX was founded with a single mission: eliminate every barrier that traders and investors face in India — whether it's cost, complexity, or technology. We pioneered flat-fee discount broking and haven't looked back since.
          </p>
          <p style={{ color:'var(--text-secondary)', lineHeight:1.9, fontSize:'1rem' }}>
            Today, 1.3+ crore clients trust us with their wealth. We contribute over 15% of all retail order volumes on NSE and BSE. Our technology processes millions of orders every day with sub-millisecond latency.
          </p>
        </div>

        <div style={{ display:'flex', gap:'3rem', marginTop:'3rem', paddingTop:'3rem', borderTop:'1px solid var(--border)' }}>
          {[['2010','Founded'],['1.3Cr+','Active Clients'],['15%','Retail Market Share'],['₹3.5L Cr','AUM']].map(([v,l]) => (
            <div key={l}>
              <div className="stat-number">{v}</div>
              <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginTop:'0.3rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}