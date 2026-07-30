import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function TablePage({ title, apiPath }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get(apiPath)
      .then((response) => {
        const payload = response.data.data;
        setRows(Array.isArray(payload) ? payload : payload?.data || []);
      })
      .catch((apiError) => {
        setError(apiError.response?.data?.message || `Unable to load ${title.toLowerCase()}`);
      });
  }, [apiPath, title]);

  return (
    <div className="card admin-table-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h4 className="card-title">{title}</h4>
          <p className="card-category">Connected to {apiPath}</p>
        </div>
      </div>
      <div className="card-body table-full-width table-responsive">
        {error && <div className="alert alert-warning mx-3">{error}</div>}
        {!error && rows.length === 0 && <div className="admin-empty">No records found</div>}
        {rows.length > 0 && (
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                {Object.keys(rows[0]).slice(0, 6).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id || row.id}>
                  {Object.keys(rows[0]).slice(0, 6).map((key) => (
                    <td key={key}>{formatCell(row[key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function formatCell(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return value.name || value.title || value.email || value._id || "-";
  return String(value);
}

export default TablePage;
