import React from 'react';

const TEAM = [
  { name:'Arjun Mehta', role:'Founder & CEO', bio:'Bootstrapped TradeX after 10 years as a trader. Passionate about making markets accessible to every Indian.' },
  { name:'Priya Nair', role:'Co-founder & CTO', bio:'Ex-Google engineer. Architected our trading engine that handles 10M+ orders/day with 99.99% uptime.' },
  { name:'Ravi Shankar', role:'Head of Product', bio:'Previously built fintech products at Paytm and Razorpay. Obsessed with simplifying complex financial UX.' },
  { name:'Anita Desai', role:'Chief Compliance Officer', bio:'15 years at SEBI before joining TradeX. Ensures we operate at the highest regulatory standards.' },
];

export default function Team() {
  return (
    <section className="section">
      <div className="container-tx">
        <div style={{ marginBottom:'3rem' }}>
          <p className="overline" style={{ marginBottom:'0.75rem' }}>Leadership</p>
          <h2>The people behind TradeX</h2>
        </div>
        <div className="grid-2" style={{ gap:'2rem' }}>
          {TEAM.map(p => (
            <div key={p.name} className="tx-card" style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start' }}>
              <div style={{ width:60, height:60, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent-glow), var(--bg-secondary))', border:'2px solid var(--border-accent)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.4rem', color:'var(--accent)', flexShrink:0 }}>
                {p.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize:'1rem', marginBottom:'0.25rem' }}>{p.name}</h3>
                <p style={{ color:'var(--accent)', fontSize:'0.8rem', fontFamily:'var(--font-mono)', marginBottom:'0.75rem' }}>{p.role}</p>
                <p style={{ color:'var(--text-secondary)', fontSize:'0.875rem', lineHeight:1.7 }}>{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}