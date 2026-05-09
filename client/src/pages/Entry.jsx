
import { useState } from "react";
import API from "../api";
import PageShell from "../components/PageShell";

export default function Entry() {
  const [capturedNumber, setCapturedNumber] = useState("AP09AB1234");
  const [captcha, setCaptcha] = useState("7K3M");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = () => {
    if (enteredCaptcha.toUpperCase() === captcha) {
      setMessage("Captcha verified successfully!");
      setEnteredCaptcha("");
    } else {
      setMessage("Invalid captcha. Please try again.");
    }
  };

  const handleManualEntry = () => {
    // Navigate to manual entry or show manual entry form
  };

  return (
    <PageShell title="Vehicle Entry">
      <div className="entry-layout">
        <div className="camera-feed-card">
          <h3>Camera Live Feed</h3>
          <div className="camera-preview">
            <img
              src="https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop"
              alt="Vehicle camera feed"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0.75rem" }}
            />
          </div>
          <div className="captured-info">
            <span className="detail-label">Captured Number</span>
            <strong className="plate-number">{capturedNumber}</strong>
          </div>
        </div>

        <div className="captcha-verification-card">
          <h3>Captcha Verification</h3>
          <div className="captcha-display">
            <span>{captcha}</span>
            <button className="refresh-btn">🔄</button>
          </div>
          <label>Enter Captcha</label>
          <input
            type="text"
            value={enteredCaptcha}
            onChange={(e) => setEnteredCaptcha(e.target.value)}
            placeholder={captcha}
          />
          <button className="btn btn-primary" onClick={handleVerify}>
            Next
          </button>
          <div className="divider">or</div>
          <button className="btn btn-link" onClick={handleManualEntry}>
            Manual Entry
          </button>
          {message && (
            <div className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
