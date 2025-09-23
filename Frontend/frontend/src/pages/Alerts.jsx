import React, { useState, useEffect } from "react";
import "./Alerts.css";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [limit, setLimit] = useState(50000);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:2005";

  const fetchAlerts = () => {
    fetch(`${API_URL}/api/alerts`)
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleSetLimit = () => {
    fetch(`${API_URL}/api/alerts/evaluate?limit=${limit}`, { method: "POST" })
      .then(() => fetchAlerts())
      .catch((err) => console.error(err));
  };

  const clearAllAlerts = () => {
    if (!window.confirm("Clear all alerts?")) return;
    fetch(`${API_URL}/api/alerts/clear`, { method: "DELETE" })
      .then(() => fetchAlerts())
      .catch((err) => console.error(err));
  };

  // helper to decide if alert is "exceeded"
  const isExceeded = (a) => {
    // protect against missing fields
    const severity = (a.severity || "").toString().toLowerCase();
    const msg = (a.message || "").toString().toLowerCase();

    // checks: explicit HIGH severity, numeric amount > limit (if present),
    // or the message contains typical words like "exceed" or "over limit"
    if (severity === "high" || severity === "critical") return true;
    if (typeof a.amount === "number" && !isNaN(limit) && a.amount > limit) return true;
    if (/\b(exceed|exceeded|over limit|over)\b/.test(msg)) return true;

    return false;
  };

  return (
    <div className="alerts-container">
      <h2>Alerts & Limits</h2>

      <div className="limit-section">
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          placeholder="Set monthly limit"
        />
        <button onClick={handleSetLimit}>Set Limit</button>
        <button onClick={clearAllAlerts}>Clear All Alerts</button>
      </div>

      <h3>Alerts</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Severity</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {alerts.length === 0 ? (
            <tr>
              <td colSpan="4">No alerts</td>
            </tr>
          ) : (
            alerts.map((a) => {
              const exceeded = isExceeded(a);
              return (
                <tr
                  key={a.id ?? Math.random()}
                  className={`alert-row ${exceeded ? "alert-high" : ""}`}
                  data-severity={a.severity}
                  data-amount={a.amount}
                >
                  <td>{a.title}</td>
                  <td>{a.message}</td>
                  <td>
                    <span
                      className={
                        a.severity === "HIGH" || a.severity === "CRITICAL"
                          ? "badge badge-critical"
                          : a.severity === "MEDIUM"
                          ? "badge badge-warning"
                          : "badge badge-info"
                      }
                    >
                      {a.severity || "INFO"}
                    </span>
                  </td>
                  <td>{new Date(a.createdAt).toLocaleString()}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
