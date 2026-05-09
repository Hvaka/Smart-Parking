
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function Dashboard() {
  return (
    <PageShell title="Dashboard">
      <div className="dashboard-grid">
        <div className="dashboard-card entry-card">
          <div>
            <span className="card-label">ENTRY</span>
            <h3>Register New Vehicle Entry</h3>
          </div>
          <Link className="btn btn-primary" to="/entry">
            Start Entry
          </Link>
        </div>
        <div className="dashboard-card exit-card">
          <div>
            <span className="card-label">EXIT</span>
            <h3>Process Vehicle Exit & Payment</h3>
          </div>
          <Link className="btn btn-primary" to="/active">
            Find Vehicle
          </Link>
        </div>
        <div className="dashboard-card report-card">
          <div>
            <span className="card-label">DATA</span>
            <h3>View Parking Records & Reports</h3>
          </div>
          <Link className="btn btn-primary" to="/records">
            Open Records
          </Link>
        </div>
      </div>

      <div className="summary-grid">
        <div className="stat-box">
          <h4>Today's Entries</h4>
          <strong>56</strong>
          <p>125% from yesterday</p>
        </div>
        <div className="stat-box">
          <h4>Today's Exits</h4>
          <strong>42</strong>
          <p>112% from yesterday</p>
        </div>
        <div className="stat-box">
          <h4>Active Vehicles</h4>
          <strong>14</strong>
          <p>Currently parked</p>
        </div>
      </div>
    </PageShell>
  );
}
