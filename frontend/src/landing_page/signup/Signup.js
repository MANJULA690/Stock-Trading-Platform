import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  const [params] = useSearchParams();
  const isLogin = params.get('mode') === 'login';
  const [mode, setMode] = useState(isLogin ? 'login' : 'register');
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password, form.phone);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:'calc(100vh - 130px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem 1.5rem', background:'var(--bg-primary)' }}>
      <div style={{ width:'100%', maxWidth:'440px' }}>
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ width:48, height:48, background:'var(--accent)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.5rem', color:'#0a0b0f', margin:'0 auto 1rem' }}>T</div>
          <h1 style={{ fontSize:'1.8rem', marginBottom:'0.5rem' }}>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
          <p style={{ color:'var(--text-secondary)', fontSize:'0.9rem' }}>
            {mode === 'login' ? 'Log in to your TradeX account' : 'Start trading in minutes. No fees.'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display:'flex', background:'var(--bg-secondary)', borderRadius:'10px', padding:'4px', marginBottom:'1.75rem', border:'1px solid var(--border)' }}>
          {['register','login'].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex:1, padding:'0.6rem', border:'none', borderRadius:'7px', cursor:'pointer', background:mode===m?'var(--bg-card)':'transparent', color:mode===m?'var(--text-primary)':'var(--text-secondary)', fontFamily:'var(--font-body)', fontWeight:mode===m?600:400, fontSize:'0.9rem', transition:'all 0.2s' }}>
              {m === 'register' ? 'Sign Up' : 'Log In'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="tx-card" style={{ borderRadius:'16px' }}>
          {error && (
            <div style={{ background:'rgba(255,77,109,0.1)', border:'1px solid rgba(255,77,109,0.3)', borderRadius:'8px', padding:'0.75rem 1rem', color:'var(--red)', fontSize:'0.875rem', marginBottom:'1.25rem' }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
            {mode === 'register' && (
              <div>
                <label className="tx-label">Full Name</label>
                <input className="tx-input" type="text" placeholder="Arjun Sharma" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
              </div>
            )}
            <div>
              <label className="tx-label">Email Address</label>
              <input className="tx-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
            </div>
            {mode === 'register' && (
              <div>
                <label className="tx-label">Phone Number</label>
                <input className="tx-input" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
              </div>
            )}
            <div>
              <label className="tx-label">Password</label>
              <input className="tx-input" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required minLength={6} />
            </div>

            <button type="submit" className="btn-primary-tx" disabled={loading} style={{ width:'100%', justifyContent:'center', marginTop:'0.5rem', opacity:loading?0.7:1, fontSize:'1rem', padding:'0.9rem' }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Log In →' : 'Create Free Account →'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'1.25rem', fontSize:'0.82rem', color:'var(--text-muted)' }}>
            By signing up, you agree to our{' '}
            <Link to="/support" style={{ color:'var(--accent)' }}>Terms of Service</Link>
          </p>
        </div>

        <p style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.875rem', color:'var(--text-secondary)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} style={{ background:'none', border:'none', color:'var(--accent)', cursor:'pointer', fontSize:'0.875rem', fontWeight:600 }}>
            {mode === 'login' ? 'Sign up free' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}