import React from 'react';
import { Link } from 'react-router-dom';

export default function OpenAccount() {
  return (
    <section style={{ padding:'5rem 0', background:'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)', borderTop:'1px solid var(--border)', textAlign:'center' }}>
      <div className="container-tx">
        <p className="overline" style={{ marginBottom:'1rem' }}>Get Started Today</p>
        <h2 style={{ fontSize:'clamp(2rem, 3.5vw, 3rem)', marginBottom:'1rem', maxWidth:'600px', margin:'0 auto 1rem' }}>
          Open your free TradeX account
        </h2>
        <p style={{ color:'var(--text-secondary)', maxWidth:'480px', margin:'0 auto 2.5rem', lineHeight:1.7 }}>
          Join 1.3 crore investors. Get full access to all markets, research, and tools at zero account opening fee.
        </p>
        <Link to="/signup" className="btn-primary-tx" style={{ fontSize:'1.1rem', padding:'1rem 2.5rem' }}>
          Open Free Account →
        </Link>
        <p style={{ marginTop:'1.25rem', fontSize:'0.82rem', color:'var(--text-muted)' }}>
          Account opening is 100% free. No minimum balance required.
        </p>
      </div>
    </section>
  );
}