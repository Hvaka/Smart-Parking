
import { useState } from "react";
import API from "../api";
import PageShell from "../components/PageShell";

export default function Entry() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [type, setType] = useState("4W");
  const [message, setMessage] = useState("");

  const add = async () => {
    try {
      await API.post("/vehicle/entry", { vehicleNumber, type });
      setMessage("Vehicle registered successfully.");
      setVehicleNumber("");
    } catch (err) {
      setMessage("Unable to register vehicle right now.");
    }
  };

  return (
    <PageShell title="Vehicle Entry">
      <div className="entry-layout">
        <div className="entry-card">
          <h3>Manual Entry</h3>
          <label>Vehicle Number</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            placeholder="Enter vehicle number"
          />

          <label>Vehicle Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="4W">4W</option>
            <option value="2W">2W</option>
          </select>

          <button className="btn btn-primary" onClick={add}>
            Register Entry
          </button>
          {message && <div className="alert alert-success">{message}</div>}
        </div>

        <div className="entry-card capture-card">
          <h3>Camera Capture</h3>
          <div className="capture-preview">Camera preview here</div>
          <div className="capture-details">
            <span className="detail-label">Captured Number</span>
            <strong>AP09AB1234</strong>
          </div>
          <button className="btn btn-secondary">Manual Entry</button>
        </div>
      </div>
    </PageShell>
  );
}
