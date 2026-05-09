import { NavLink, useNavigate } from "react-router-dom";

export default function PageShell({ title, children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">P</div>
          <div>
            <div className="brand-title">Smart Parking</div>
            <div className="brand-subtitle">System</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">📊</span>
            Dashboard
          </NavLink>
          <NavLink
            to="/entry"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">➡️</span>
            Entry
          </NavLink>
          <NavLink
            to="/active"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">⬅️</span>
            Exit
          </NavLink>
          <NavLink
            to="/records"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">📈</span>
            Data
          </NavLink>
          <NavLink
            to="/active"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">🚗</span>
            Active Vehicles
          </NavLink>
          <button className="sidebar-link" style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <span className="sidebar-icon">⚙️</span>
            Settings
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-link logout-btn" onClick={handleLogout}>
            <span className="sidebar-icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <div className="topbar">
          <div className="page-title">{title}</div>
          <div className="topbar-actions">
            <div className="topbar-badge">Admin</div>
            <div className="topbar-avatar">E</div>
          </div>
        </div>

        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}
