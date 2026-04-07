import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section style={{ padding:'6rem 0 4rem', background:'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)', position:'relative', overflow:'hidden' }}>
      {/* Background grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize:'60px 60px', opacity:0.3 }} />
      <div style={{ position:'absolute', top:'20%', right:'5%', width:'500px', height:'500px', background:'radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div className="container-tx" style={{ position:'relative' }}>
        <div style={{ maxWidth:'720px' }}>
          <div className="tag" style={{ marginBottom:'1.5rem', display:'inline-block' }}>
            ◆ India's Next-Gen Trading Platform
          </div>
          <h1 style={{ fontSize:'clamp(2.5rem, 5vw, 4rem)', lineHeight:1.1, marginBottom:'1.5rem', fontWeight:800 }}>
            Trade Smarter.{' '}
            <span style={{ color:'var(--accent)', display:'block' }}>Invest Better.</span>
          </h1>
          <p style={{ fontSize:'1.15rem', color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'2.5rem', maxWidth:'560px' }}>
            Stocks, derivatives, mutual funds, ETFs & bonds — all on one blazing-fast platform with zero hidden charges.
          </p>
          <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
            <Link to="/signup" className="btn-primary-tx" style={{ fontSize:'1rem', padding:'0.875rem 2rem' }}>
              Start Trading Free →
            </Link>
            <Link to="/products" className="btn-outline-tx" style={{ fontSize:'1rem', padding:'0.875rem 2rem' }}>
              Explore Platform
            </Link>
          </div>
          <div style={{ marginTop:'3rem', display:'flex', gap:'2.5rem', flexWrap:'wrap' }}>
            {[['1.3Cr+','Active Clients'],['₹3.5L Cr','Assets Managed'],['15%','Market Share'],['₹0','Equity Delivery']].map(([v,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.5rem', fontWeight:500, color:'var(--accent)' }}>{v}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', marginTop:'0.2rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini chart graphic */}
        <div style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)', width:'420px', display:'none' }} className="desktop-only">
          <svg viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#00d4aa" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0 180 L40 160 L80 170 L120 140 L160 120 L200 90 L240 100 L280 70 L320 50 L360 40 L400 20 L420 15" stroke="#00d4aa" strokeWidth="2.5" fill="none"/>
            <path d="M0 180 L40 160 L80 170 L120 140 L160 120 L200 90 L240 100 L280 70 L320 50 L360 40 L400 20 L420 15 L420 220 L0 220 Z" fill="url(#chartGrad)"/>
          </svg>
        </div>
      </div>
    </section>
  );
}