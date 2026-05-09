
import { useEffect, useState } from "react";
import API from "../api";
import PageShell from "../components/PageShell";

const PAYMENT_MODES = ["UPI", "Cash", "Card"];

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "-";
}

function formatDuration(entryTime, exitTime) {
  if (!entryTime || !exitTime) return "-";
  const start = new Date(entryTime);
  const end = new Date(exitTime);
  const diff = Math.max(end - start, 0);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

function createCsv(data) {
  const headers = [
    "#",
    "Vehicle Number",
    "Entry Time",
    "Exit Time",
    "Duration",
    "Amount",
    "Payment Mode",
    "Status"
  ];

  const rows = data.map((row, index) => [
    index + 1,
    row.vehicleNumber,
    formatDate(row.entryTime),
    formatDate(row.exitTime),
    formatDuration(row.entryTime, row.exitTime),
    row.amount ?? "-",
    row.paymentMode ?? "UPI",
    row.status
  ]);

  return [headers, ...rows]
    .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
}

export default function Records() {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    API.get("/vehicle/records")
      .then((r) => setData(r.data))
      .catch(() => setData([]));
  }, []);

  const filteredData = data
    .filter((row) => {
      const numberMatch = row.vehicleNumber?.toLowerCase().includes(searchTerm.toLowerCase());
      if (!numberMatch) return false;
      const entryTime = row.entryTime ? new Date(row.entryTime) : null;
      if (fromDate && entryTime && entryTime < new Date(fromDate)) return false;
      if (toDate && entryTime && entryTime > new Date(toDate + "T23:59:59")) return false;
      return true;
    })
    .sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime));

  const pageCount = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const pageData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const downloadReport = () => {
    if (!filteredData || filteredData.length === 0) {
      return;
    }

    const csv = createCsv(filteredData);
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

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  return (
    <PageShell title="Parking Records">
      <div className="data-filter-card">
        <div className="data-filter-row">
          <div className="filter-group">
            <label>From Date</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="filter-group">
            <label>To Date</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div className="filter-group search-group">
            <label>&nbsp;</label>
            <input
              type="text"
              placeholder="Search Vehicle Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-actions">
            <button className="btn btn-outline" onClick={handleSearch}>
              Search
            </button>
            <button className="btn btn-success" onClick={downloadReport} disabled={!filteredData.length}>
              Export Excel
            </button>
          </div>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <h3>Parking Records</h3>
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Vehicle Number</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Duration</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-row">
                    No parking records available for this filter.
                  </td>
                </tr>
              ) : (
                pageData.map((v, index) => (
                  <tr key={v._id || `${v.vehicleNumber}-${index}`}>
                    <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                    <td>{v.vehicleNumber}</td>
                    <td>{formatDate(v.entryTime)}</td>
                    <td>{formatDate(v.exitTime)}</td>
                    <td>{formatDuration(v.entryTime, v.exitTime)}</td>
                    <td>{v.amount ? `₹ ${v.amount}` : "-"}</td>
                    <td>{v.paymentMode ?? PAYMENT_MODES[index % PAYMENT_MODES.length]}</td>
                    <td>
                      <span className={`status-pill ${v.status?.toLowerCase()}`}>{v.status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="records-pagination">
          <button className="btn btn-outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </button>
          <div className="page-info">
            Page {currentPage} of {pageCount}
          </div>
          <button className="btn btn-outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount}>
            Next
          </button>
        </div>
      </div>
    </PageShell>
  );
}
