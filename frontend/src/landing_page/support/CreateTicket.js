import React, { useState } from "react";
import axios from "axios";

const CATEGORIES = [
  { value:"account", label:"Account & KYC" },
  { value:"trading", label:"Trading Issues" },
  { value:"payment", label:"Payments & Funds" },
  { value:"technical", label:"Technical / App Issues" },
  { value:"other", label:"Other" },
];

export default function CreateTicket() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", category:"other", message:"" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/support/ticket", form);
      setSuccess(res.data);
      setForm({ name:"", email:"", subject:"", category:"other", message:"" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container-tx">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>

          {/* Contact info */}
          <div>
            <p className="overline" style={{ marginBottom:"1rem" }}>Contact Us</p>
            <h2 style={{ fontSize:"2rem", marginBottom:"1rem" }}>Still need help?</h2>
            <p style={{ color:"var(--text-secondary)", lineHeight:1.8, marginBottom:"2rem" }}>
              Our support team responds within 24 hours on weekdays. For urgent trading issues, use the priority channel.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
              {[
                { icon:"📧", title:"Email Support", desc:"support@tradex.in", sub:"Response within 24 hours" },
                { icon:"📞", title:"Phone Support", desc:"+91 80-4040-2020", sub:"Mon–Fri, 9AM–6PM IST" },
                { icon:"💬", title:"Live Chat", desc:"Available on the app", sub:"Mon–Fri, 8AM–8PM IST" },
              ].map(c => (
                <div key={c.title} className="tx-card" style={{ display:"flex", gap:"1rem", alignItems:"flex-start", padding:"1.25rem" }}>
                  <span style={{ fontSize:"1.5rem" }}>{c.icon}</span>
                  <div>
                    <div style={{ fontWeight:600, fontSize:"0.9rem", marginBottom:"0.2rem" }}>{c.title}</div>
                    <div style={{ color:"var(--accent)", fontFamily:"var(--font-mono)", fontSize:"0.875rem" }}>{c.desc}</div>
                    <div style={{ color:"var(--text-muted)", fontSize:"0.78rem", marginTop:"0.2rem" }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket form */}
          <div>
            <div className="tx-card" style={{ borderRadius:"16px" }}>
              <h3 style={{ marginBottom:"1.5rem", fontSize:"1.1rem" }}>Create a Support Ticket</h3>

              {success ? (
                <div style={{ textAlign:"center", padding:"2rem 0" }}>
                  <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>✅</div>
                  <h3 style={{ marginBottom:"0.5rem" }}>Ticket Submitted!</h3>
                  <p style={{ color:"var(--text-secondary)", fontSize:"0.9rem", marginBottom:"1rem" }}>{success.message}</p>
                  <div style={{ background:"var(--accent-glow)", border:"1px solid var(--border-accent)", borderRadius:"8px", padding:"0.75rem 1.25rem", display:"inline-block" }}>
                    <span style={{ color:"var(--text-muted)", fontSize:"0.78rem" }}>Ticket ID: </span>
                    <span style={{ fontFamily:"var(--font-mono)", color:"var(--accent)", fontWeight:600 }}>{success.ticket?.ticketId}</span>
                  </div>
                  <br />
                  <button className="btn-outline-tx" style={{ marginTop:"1.5rem" }} onClick={() => setSuccess(null)}>Submit Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                  {error && (
                    <div style={{ background:"rgba(255,77,109,0.1)", border:"1px solid rgba(255,77,109,0.3)", borderRadius:"8px", padding:"0.75rem 1rem", color:"var(--red)", fontSize:"0.875rem" }}>
                      ⚠ {error}
                    </div>
                  )}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                    <div>
                      <label className="tx-label">Name</label>
                      <input className="tx-input" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
                    </div>
                    <div>
                      <label className="tx-label">Email</label>
                      <input className="tx-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required />
                    </div>
                  </div>
                  <div>
                    <label className="tx-label">Category</label>
                    <select className="tx-input" value={form.category} onChange={e => setForm({...form, category:e.target.value})} style={{ cursor:"pointer" }}>
                      {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="tx-label">Subject</label>
                    <input className="tx-input" type="text" placeholder="Brief description of your issue" value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} required />
                  </div>
                  <div>
                    <label className="tx-label">Message</label>
                    <textarea className="tx-input" rows={5} placeholder="Describe your issue in detail..." value={form.message} onChange={e => setForm({...form, message:e.target.value})} required style={{ resize:"vertical", minHeight:"120px" }} />
                  </div>
                  <button type="submit" className="btn-primary-tx" disabled={loading} style={{ width:"100%", justifyContent:"center", opacity:loading?0.7:1 }}>
                    {loading ? "Submitting..." : "Submit Ticket →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}