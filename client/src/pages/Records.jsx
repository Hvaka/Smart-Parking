
import { useEffect, useState } from "react";
import API from "../api";
import PageShell from "../components/PageShell";

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "-";
}

function createCsv(data) {
  const headers = [
    "Vehicle Number",
    "Type",
    "Entry Time",
    "Exit Time",
    "Amount",
    "Status"
  ];

  const rows = data.map((row) => [
    row.vehicleNumber,
    row.type,
    formatDate(row.entryTime),
    formatDate(row.exitTime),
    row.amount ?? "-",
    row.status
  ]);

  return [headers, ...rows]
    .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

export default function Records() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/vehicle/records").then((r) => setData(r.data)).catch(() => setData([]));
  }, []);

  const downloadReport = () => {
    if (!data || data.length === 0) {
      return;
    }

    const csv = createCsv(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "parking-records.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell title="Parking Records">
      <div className="table-card">
        <div className="table-card-header">
          <h3>Record History</h3>
          <button className="btn btn-outline" onClick={downloadReport} disabled={!data.length}>
            Export Report
          </button>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No parking records available.
                  </td>
                </tr>
              ) : (
                data.map((v) => (
                  <tr key={v._id}>
                    <td>{v.vehicleNumber}</td>
                    <td>{v.type}</td>
                    <td>{new Date(v.entryTime).toLocaleString()}</td>
                    <td>{v.exitTime ? new Date(v.exitTime).toLocaleString() : "-"}</td>
                    <td>{v.amount ?? "-"}</td>
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
