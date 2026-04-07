import React from 'react';
import ProductHero from './Hero';
import OpenAccount from '../OpenAccount';

const PRODUCTS = [
  {
    name: 'TradeX Kite',
    tag: 'Web & Mobile App',
    desc: 'Our ultra-fast flagship trading platform. Streaming market data, advanced candlestick charts, one-click order placement, and an elegant UI. Available on Android and iOS.',
    features: ['Real-time L2 market depth', 'Advanced charting with 100+ indicators', 'GTT (Good Till Triggered) orders', 'Options chain & payoff calculator'],
    icon: '⚡',
    badge: 'Primary Platform',
  },
  {
    name: 'TradeX Console',
    tag: 'Portfolio & Reports',
    desc: 'Your central dashboard. Gain deep insights into your trades and investments with P&L reports, holdings analysis, tax reports, and portfolio visualizations.',
    features: ['Detailed P&L statements', 'Capital gains tax report', 'Tradebook & contract notes', 'Segment-wise breakdown'],
    icon: '📊',
    badge: 'Analytics',
  },
  {
    name: 'TradeX Coin',
    tag: 'Mutual Funds',
    desc: 'Invest in direct mutual funds online, commission-free, delivered directly to your Demat account. Compare, analyze, and build SIPs effortlessly.',
    features: ['Direct plans (0% commission)', 'Auto-invest SIPs', 'Fund comparison tool', 'ELSS for tax saving'],
    icon: '💰',
    badge: 'Mutual Funds',
  },
  {
    name: 'TradeX Connect API',
    tag: 'Developer API',
    desc: 'Build powerful algo trading platforms and investment apps with our clean REST + WebSocket APIs. Used by 100+ fintech startups.',
    features: ['REST + WebSocket APIs', 'Order management system', 'Historical data access', 'Sandbox environment'],
    icon: '🔌',
    badge: 'For Developers',
  },
  {
    name: 'TradeX Academy',
    tag: 'Learning Platform',
    desc: 'The largest stock market education library in India. Bite-sized modules, videos, and quizzes covering everything from basics to advanced options strategies.',
    features: ['20,000+ lessons', '40+ structured modules', 'Market simulations', 'Certificate programs'],
    icon: '🎓',
    badge: 'Free Education',
  },
];

export default function ProductsPage() {
  return (
    <>
      <ProductHero />
      <section className="section">
        <div className="container-tx">
          <div style={{ display:'flex', flexDirection:'column', gap:'3rem' }}>
            {PRODUCTS.map((p, i) => (
              <div key={p.name} className="tx-card" style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:'2.5rem', alignItems:'start', padding:'2rem' }}>
                <div style={{ width:72, height:72, background:'var(--accent-glow)', border:'1px solid var(--border-accent)', borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem' }}>
                  {p.icon}
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.5rem' }}>
                    <h2 style={{ fontSize:'1.4rem' }}>{p.name}</h2>
                    <span className="tag">{p.badge}</span>
                  </div>
                  <p style={{ color:'var(--accent)', fontSize:'0.8rem', fontFamily:'var(--font-mono)', marginBottom:'0.75rem' }}>{p.tag}</p>
                  <p style={{ color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'1.25rem', maxWidth:'600px' }}>{p.desc}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'0.4rem' }}>
                    {p.features.map(f => (
                      <div key={f} style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.85rem', color:'var(--text-secondary)' }}>
                        <span style={{ color:'var(--accent)', fontSize:'0.7rem' }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <OpenAccount />
    </>
  );
}