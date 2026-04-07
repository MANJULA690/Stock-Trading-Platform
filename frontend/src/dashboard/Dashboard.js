import React, { useState } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Overview from "./Overview";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Markets from "./Markets";
import DashboardFunds from "./DashboardFunds";

const NAV = [
  { path: "", label: "Overview", icon: "◈" },
  { path: "holdings", label: "Holdings", icon: "💼" },
  { path: "orders", label: "Orders", icon: "📋" },
  { path: "markets", label: "Markets", icon: "📈" },
  { path: "funds", label: "Funds", icon: "💳" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return <Navigate to="/signup?mode=login" replace />;

  const currentPath = location.pathname.replace("/dashboard/", "").replace("/dashboard", "");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? "220px" : "64px",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowX: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: "#0a0b0f", flexShrink: 0 }}>T</div>
          {sidebarOpen && <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", whiteSpace: "nowrap" }}>Trade<span style={{ color: "var(--accent)" }}>X</span></span>}
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "1rem 0.5rem" }}>
          {NAV.map(item => {
            const active = (item.path === "" && currentPath === "") || (item.path !== "" && currentPath.startsWith(item.path));
            return (
              <Link key={item.path} to={`/dashboard/${item.path}`} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.65rem 0.75rem", borderRadius: "8px", marginBottom: "0.25rem",
                color: active ? "var(--accent)" : "var(--text-secondary)",
                background: active ? "var(--accent-glow)" : "transparent",
                transition: "all 0.2s", textDecoration: "none", whiteSpace: "nowrap", overflow: "hidden",
              }}>
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ fontSize: "0.875rem", fontWeight: active ? 600 : 400 }}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid var(--border)" }}>
          {sidebarOpen && (
            <div style={{ marginBottom: "0.75rem", overflow: "hidden" }}>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{user.name}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{user.email}</div>
            </div>
          )}
          <button onClick={logout} style={{ width: "100%", background: "transparent", border: "1px solid var(--border)", borderRadius: "6px", padding: "0.5rem", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
            <span>⏻</span>{sidebarOpen && " Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Top bar */}
        <div style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", padding: "0 1.5rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.1rem", padding: "0.25rem" }}>☰</button>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: "var(--text-secondary)" }}>
              {NAV.find(n => (n.path === "" && currentPath === "") || (n.path !== "" && currentPath.startsWith(n.path)))?.label || "Dashboard"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Balance: <span style={{ color: "var(--accent)" }}>₹{(user.accountBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
            <Link to="/" style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>← Site</Link>
          </div>
        </div>

        {/* Routes */}
        <div style={{ padding: "1.5rem" }}>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/funds" element={<DashboardFunds />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}