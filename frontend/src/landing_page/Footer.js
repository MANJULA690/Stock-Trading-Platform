import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background:'var(--bg-secondary)', borderTop:'1px solid var(--border)', padding:'3.5rem 0 2rem' }}>
      <div className="container-tx">
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'2rem', marginBottom:'3rem' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1rem' }}>
              <div style={{ width:28, height:28, background:'var(--accent)', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'0.9rem', color:'#0a0b0f' }}>T</div>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.1rem' }}>Trade<span style={{ color:'var(--accent)' }}>X</span></span>
            </div>
            <p style={{ color:'var(--text-secondary)', fontSize:'0.875rem', lineHeight:1.7, maxWidth:'280px', marginBottom:'1rem' }}>
              India's modern discount brokerage platform. Trade, invest and grow wealth with transparent pricing and advanced technology.
            </p>
            <p style={{ color:'var(--text-muted)', fontSize:'0.78rem' }}>© 2025 TradeX Broking Ltd. All rights reserved.</p>
          </div>
          {[
            { heading:'Company', links:[['About','/about'],['Products','/products'],['Pricing','/pricing'],['Careers','#'],['Blog','#']] },
            { heading:'Support', links:[['Help Center','/support'],['Create Ticket','/support'],['Grievance','#'],['Downloads','#']] },
            { heading:'Account', links:[['Open Account','/signup'],['Login','/signup?mode=login'],['Dashboard','/dashboard'],['Add Funds','#']] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{ fontSize:'0.8rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--text-muted)', marginBottom:'1rem' }}>{col.heading}</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                {col.links.map(([label, to]) => (
                  <Link key={label} to={to} style={{ color:'var(--text-secondary)', fontSize:'0.875rem', transition:'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color='var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color='var(--text-secondary)'}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop:'1px solid var(--border)', paddingTop:'1.5rem' }}>
          <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', lineHeight:1.8 }}>
            TradeX Broking Ltd.: Member of NSE & BSE — SEBI Registration no.: INZ000099999 | CDSL: Depository services — SEBI Registration no.: IN-DP-999-2024 | Commodity Trading through TradeX Commodities Pvt. Ltd. MCX: 46099 — SEBI Registration no.: INZ000099238 | Investments in securities market are subject to market risks; read all related documents carefully before investing. | Prevent unauthorised transactions in your account — update your mobile numbers/email IDs with your stock brokers.
          </p>
        </div>
      </div>
    </footer>
  );
}