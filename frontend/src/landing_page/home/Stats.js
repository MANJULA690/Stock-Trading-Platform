import React from 'react';

const FEATURES = [
  { icon:'⚡', title:'Zero Commission', desc:'Trade equity delivery for free. Flat ₹20 for intraday & F&O. No hidden charges ever.' },
  { icon:'🛡️', title:'Secure & Regulated', desc:'SEBI registered. Your funds are kept in segregated client accounts. Bank-grade encryption.' },
  { icon:'📊', title:'Advanced Analytics', desc:'Real-time market data, depth charts, P&L reports, and portfolio insights in one dashboard.' },
  { icon:'📱', title:'Multi-Platform', desc:'Trade on web, Android, or iOS. Seamless sync across all your devices in real time.' },
  { icon:'🎓', title:'Learn & Earn', desc:'Free access to our 20,000+ lesson library. Learn markets before risking capital.' },
  { icon:'🤖', title:'Smart Alerts', desc:'AI-powered nudges that warn you of risky trades before you execute them.' },
];

export default function Stats() {
  return (
    <section className="section">
      <div className="container-tx">
        <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
          <p className="overline" style={{ marginBottom:'0.75rem' }}>Why TradeX</p>
          <h2 style={{ fontSize:'clamp(1.8rem, 3vw, 2.5rem)' }}>Built for serious traders</h2>
          <p style={{ color:'var(--text-secondary)', marginTop:'0.75rem', maxWidth:'480px', margin:'0.75rem auto 0' }}>
            Everything you need to make confident market decisions, all in one place.
          </p>
        </div>
        <div className="grid-3">
          {FEATURES.map(f => (
            <div key={f.title} className="tx-card" style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              <div style={{ fontSize:'1.8rem', lineHeight:1 }}>{f.icon}</div>
              <h3 style={{ fontSize:'1rem', fontWeight:700 }}>{f.title}</h3>
              <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', lineHeight:1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}