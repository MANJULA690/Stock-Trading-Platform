import React from 'react';

export default function ProductHero() {
  return (
    <section style={{ padding:'5rem 0 3rem', background:'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)', borderBottom:'1px solid var(--border)', textAlign:'center' }}>
      <div className="container-tx">
        <p className="overline" style={{ marginBottom:'1rem' }}>Our Platform</p>
        <h1 style={{ fontSize:'clamp(2rem, 4vw, 3.5rem)', marginBottom:'1rem' }}>
          Technology built for traders
        </h1>
        <p style={{ color:'var(--text-secondary)', fontSize:'1.05rem', maxWidth:'560px', margin:'0 auto', lineHeight:1.8 }}>
          A suite of sleek, fast, and intuitive platforms for every kind of investor — from first-timers to institutional-grade traders.
        </p>
      </div>
    </section>
  );
}