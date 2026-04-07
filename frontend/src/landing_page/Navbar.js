import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TICKER = [
  { sym: 'NIFTY 50', price: '22,456.80', chg: '+0.43%', up: true },
  { sym: 'SENSEX', price: '73,887.15', chg: '+0.38%', up: true },
  { sym: 'RELIANCE', price: '2,945.50', chg: '-0.21%', up: false },
  { sym: 'TCS', price: '3,812.00', chg: '+1.05%', up: true },
  { sym: 'HDFCBANK', price: '1,723.40', chg: '+0.67%', up: true },
  { sym: 'INFY', price: '1,456.75', chg: '-0.33%', up: false },
  { sym: 'GOLD', price: '72,340', chg: '+0.12%', up: true },
  { sym: 'USDINR', price: '83.42', chg: '-0.05%', up: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = [
    { to: '/products', label: 'Products' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/support', label: 'Support' },
  ];

  return (
    <>
      <div style={{ background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)', overflow:'hidden', padding:'0.4rem 0', fontSize:'0.72rem', fontFamily:'var(--font-mono)' }}>
        <div style={{ display:'flex', animation:'ticker-scroll 35s linear infinite', whiteSpace:'nowrap' }}>
          {[...TICKER,...TICKER].map((item,i) => (
            <span key={i} style={{ padding:'0 2.5rem', color:'var(--text-secondary)', borderRight:'1px solid var(--border)' }}>
              <span style={{ color:'var(--text-primary)', fontWeight:500 }}>{item.sym}</span>{' '}
              <span>{item.price}</span>{' '}
              <span style={{ color:item.up?'var(--green)':'var(--red)' }}>{item.chg}</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>

      <nav style={{ position:'sticky', top:0, zIndex:1000, background:scrolled?'rgba(10,11,15,0.92)':'var(--bg-primary)', backdropFilter:scrolled?'blur(16px)':'none', borderBottom:'1px solid var(--border)', transition:'background 0.3s' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 1.5rem', display:'flex', alignItems:'center', height:'64px', gap:'1.5rem' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.5rem', textDecoration:'none', marginRight:'auto' }}>
            <div style={{ width:32, height:32, background:'var(--accent)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1rem', color:'#0a0b0f' }}>T</div>
            <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.3rem', color:'var(--text-primary)', letterSpacing:'-0.02em' }}>
              Trade<span style={{ color:'var(--accent)' }}>X</span>
            </span>
          </Link>

          <div style={{ display:'flex', gap:'0.25rem', alignItems:'center' }}>
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} style={{ padding:'0.45rem 0.9rem', borderRadius:'6px', color:location.pathname===l.to?'var(--accent)':'var(--text-secondary)', fontWeight:500, fontSize:'0.9rem', transition:'color 0.2s', background:location.pathname===l.to?'var(--accent-glow)':'transparent' }}>{l.label}</Link>
            ))}
          </div>

          <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn-outline-tx" style={{ padding:'0.5rem 1rem', fontSize:'0.85rem' }}>Dashboard</Link>
                <button onClick={logout} className="btn-ghost-tx" style={{ fontSize:'0.85rem', padding:'0.5rem 1rem' }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/signup?mode=login" style={{ color:'var(--text-secondary)', fontWeight:500, fontSize:'0.9rem', padding:'0.45rem 0.75rem' }}>Login</Link>
                <Link to="/signup" className="btn-primary-tx" style={{ padding:'0.5rem 1.25rem', fontSize:'0.875rem' }}>Open Account</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}