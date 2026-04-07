import React from 'react';

export default function Education() {
  return (
    <section className="section" style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border)' }}>
      <div className="container-tx">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' }}>
          <div>
            <p className="overline" style={{ marginBottom:'1rem' }}>Learn & Grow</p>
            <h2 style={{ fontSize:'clamp(1.8rem, 2.5vw, 2.4rem)', marginBottom:'1.25rem' }}>
              Free market education for everyone
            </h2>
            <p style={{ color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'1.5rem' }}>
              The largest online stock market education library in India. Covering everything from basics to advanced options strategies — absolutely free.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {[
                { name:'Academy', desc:'20,000+ structured lessons across 40+ modules', icon:'📚' },
                { name:'Market Q&A', desc:'The most active trading community. Get answers from experts.', icon:'💬' },
                { name:'Paper Trading', desc:'Practice with virtual money before going live.', icon:'🎯' },
              ].map(r => (
                <div key={r.name} style={{ display:'flex', gap:'1rem', alignItems:'flex-start', padding:'1rem', background:'var(--bg-card)', borderRadius:'10px', border:'1px solid var(--border)' }}>
                  <span style={{ fontSize:'1.4rem' }}>{r.icon}</span>
                  <div>
                    <div style={{ fontWeight:600, fontSize:'0.95rem', marginBottom:'0.2rem' }}>{r.name}</div>
                    <div style={{ fontSize:'0.83rem', color:'var(--text-secondary)' }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'16px', padding:'2rem', textAlign:'center' }}>
            <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>🎓</div>
            <h3 style={{ marginBottom:'0.75rem' }}>Start Learning Today</h3>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', lineHeight:1.7, marginBottom:'1.5rem' }}>
              Join 50 lakh+ learners. Go from zero to confident trader with our free curriculum.
            </p>
            <button className="btn-primary-tx" style={{ width:'100%', justifyContent:'center' }}>Explore Academy →</button>
          </div>
        </div>
      </div>
    </section>
  );
}