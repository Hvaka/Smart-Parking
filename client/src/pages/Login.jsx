
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (err) {
      setError("Invalid login. Use admin/1234 or emp/1234.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-hero">
          <div className="hero-content">
            <div className="hero-badge">P</div>
            <h1>SMART PARKING SYSTEM</h1>
            <p>Smart solution for parking management</p>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <div>
              <h2>Employee Login</h2>
              <p>Welcome back! Please login to continue.</p>
            </div>
          </div>

          <div className="auth-card-body">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary" onClick={login}>
              Login
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setUsername("admin");
                setPassword("1234");
              }}
            >
              Login as Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
