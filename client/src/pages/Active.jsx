
import { useEffect, useState } from "react";
import API from "../api";
import PageShell from "../components/PageShell";

export default function Active() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/vehicle/active").then((r) => setData(r.data)).catch(() => setData([]));
  }, []);

  return (
    <PageShell title="Active Vehicles">
      <div className="table-card">
        <div className="table-card-header">
          <h3>Currently Parked Vehicles</h3>
          <span>{data.length} active</span>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Type</th>
                <th>Entry Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-row">
                    No active vehicles found.
                  </td>
                </tr>
              ) : (
                data.map((v) => (
                  <tr key={v._id}>
                    <td>{v.vehicleNumber}</td>
                    <td>{v.type}</td>
                    <td>{new Date(v.entryTime).toLocaleString()}</td>
                    <td>{v.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageShell>
  );
}
