import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'3rem' }}>
      <div>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'6rem', color:'var(--accent)', lineHeight:1, marginBottom:'1rem' }}>404</div>
        <h2 style={{ marginBottom:'0.75rem' }}>Page not found</h2>
        <p style={{ color:'var(--text-secondary)', marginBottom:'2rem' }}>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary-tx">Go Home →</Link>
      </div>
    </div>
  );
}