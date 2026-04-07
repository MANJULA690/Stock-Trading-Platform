import React from 'react';

const INSTRUMENTS = [
  { name:'Stocks & IPOs', icon:'📈', desc:'NSE & BSE listed equities' },
  { name:'Futures & Options', icon:'🔀', desc:'Equity & index F&O' },
  { name:'Mutual Funds', icon:'💼', desc:'Direct plans, commission-free' },
  { name:'ETFs', icon:'🧩', desc:'Gold, index & sectoral ETFs' },
  { name:'Bonds', icon:'🏦', desc:'Govt. & corporate bonds' },
  { name:'Commodities', icon:'🌾', desc:'MCX gold, silver, crude' },
];

export default function Awards() {
  return (
    <section className="section" style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)' }}>
      <div className="container-tx">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>
          <div>
            <p className="overline" style={{ marginBottom:'1rem' }}>What you can trade</p>
            <h2 style={{ fontSize:'clamp(1.8rem, 2.5vw, 2.4rem)', marginBottom:'1.25rem' }}>
              One account,<br/>every market.
            </h2>
            <p style={{ color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'1.5rem' }}>
              Over 1.3 crore clients use TradeX to trade and invest across every major asset class in Indian markets — contributing over 15% of all retail order volumes.
            </p>
            <div style={{ display:'flex', gap:'1.5rem' }}>
              {[['1.3Cr+','Clients'],['₹0','Delivery'],['₹20','F&O/Intraday']].map(([v,l]) => (
                <div key={l} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.4rem', color:'var(--accent)', fontWeight:500 }}>{v}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.05em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid-2" style={{ gap:'1rem' }}>
            {INSTRUMENTS.map(ins => (
              <div key={ins.name} style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'10px', padding:'1.25rem', transition:'border-color 0.2s, transform 0.2s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-accent)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <div style={{ fontSize:'1.6rem', marginBottom:'0.5rem' }}>{ins.icon}</div>
                <div style={{ fontWeight:600, fontSize:'0.9rem', marginBottom:'0.25rem' }}>{ins.name}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{ins.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}