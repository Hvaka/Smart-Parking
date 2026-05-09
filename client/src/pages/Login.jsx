
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import parkingCar from "../assets/parking-car.svg";

export default function Login() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const login = async (event) => {
    event.preventDefault();
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
          <div className="hero-top">
            <div className="hero-badge">P</div>
          </div>
          <div className="hero-content">
            <span className="hero-tag">SMART PARKING SYSTEM</span>
            <h1>Intelligent Parking Made Simple</h1>
            <p>Fast • Secure • Smart</p>
          </div>
          <div className="hero-image-wrap">
            <img src={parkingCar} alt="Parking car" className="hero-image" />
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <h2>Employee Login</h2>
            <p>Welcome back! Please login to continue.</p>
          </div>

          <form className="auth-card-body" onSubmit={login}>
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

            <div className="form-actions">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <button type="button" className="link-button">
                Forgot Password?
              </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-primary login-button">
              Login
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="btn btn-secondary owner-button"
              onClick={() => {
                setUsername("admin");
                setPassword("1234");
                setRemember(true);
              }}
            >
              Login as Owner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
