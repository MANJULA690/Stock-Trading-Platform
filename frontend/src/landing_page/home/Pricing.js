import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <section className="section">
      <div className="container-tx">
        <div style={{ textAlign:'center', marginBottom:'3rem' }}>
          <p className="overline" style={{ marginBottom:'0.75rem' }}>Transparent Pricing</p>
          <h2 style={{ fontSize:'clamp(1.8rem, 3vw, 2.5rem)' }}>No surprises. Ever.</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem', maxWidth:'900px', margin:'0 auto' }}>
          {[
            { title:'Equity Delivery', price:'₹0', sub:'Zero brokerage', desc:'Buy and hold stocks long-term absolutely free.', tag:'Free Forever', accent:true },
            { title:'Intraday & F&O', price:'₹20', sub:'per executed order', desc:'Flat fee per order or 0.03% — whichever is lower.', tag:'Flat Rate' },
            { title:'Mutual Funds', price:'₹0', sub:'Direct plans', desc:'Invest in direct mutual funds. No commission charged.', tag:'Free Forever' },
          ].map(plan => (
            <div key={plan.title} className="tx-card" style={{ textAlign:'center', position:'relative', border:plan.accent?'1px solid var(--border-accent)':'1px solid var(--border)', boxShadow:plan.accent?'var(--shadow-accent)':'none' }}>
              {plan.accent && <div style={{ position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)', background:'var(--accent)', color:'#0a0b0f', fontSize:'0.7rem', fontWeight:700, padding:'0.2rem 0.75rem', borderRadius:'20px', fontFamily:'var(--font-mono)' }}>MOST POPULAR</div>}
              <div className="tag" style={{ marginBottom:'1rem' }}>{plan.tag}</div>
              <h3 style={{ fontSize:'1rem', marginBottom:'0.5rem' }}>{plan.title}</h3>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'2.5rem', color:plan.accent?'var(--accent)':'var(--text-primary)', fontWeight:500, margin:'0.5rem 0' }}>{plan.price}</div>
              <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginBottom:'0.75rem' }}>{plan.sub}</div>
              <p style={{ fontSize:'0.875rem', color:'var(--text-secondary)', lineHeight:1.7 }}>{plan.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:'2rem' }}>
          <Link to="/pricing" style={{ color:'var(--accent)', fontSize:'0.9rem' }}>View full fee schedule →</Link>
        </div>
      </div>
    </section>
  );
}