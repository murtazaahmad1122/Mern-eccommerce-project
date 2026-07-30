import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function CrudListPage({ resource }) {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);

  const columns = useMemo(() => resource.columns || [], [resource.columns]);

  const loadRows = useCallback(async () => {
    try {
      setLoading(true);
      setStatus({ type: "", message: "" });
      const response = await axiosInstance.get(resource.apiPath);
      const payload = response.data.data;
      setRows(Array.isArray(payload) ? payload : payload?.data || []);
    } catch (error) {
      setStatus({
        type: "warning",
        message: error.response?.data?.message || `Unable to load ${resource.title.toLowerCase()}`,
      });
    } finally {
      setLoading(false);
    }
  }, [resource.apiPath, resource.title]);

  useEffect(() => {
    // The asynchronous request owns the loading lifecycle for this resource.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadRows();
  }, [loadRows]);

  const handleDelete = async (row) => {
    const confirmed = window.confirm(`Delete ${row.title || row.name || "this record"}?`);

    if (!confirmed) {
      return;
    }

    try {
      await axiosInstance.delete(`${resource.apiPath}/${row._id}`);
      setStatus({ type: "success", message: "Record deleted successfully" });
      loadRows();
    } catch (error) {
      setStatus({
        type: "danger",
        message: error.response?.data?.message || "Unable to delete record",
      });
    }
  };

  return (
    <div className="card admin-table-card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h4 className="card-title">{resource.title}</h4>
          <p className="card-category">Manage {resource.title.toLowerCase()} from the API</p>
        </div>
        <Link className="btn btn-info btn-fill" to={resource.createPath}>
          Add New
        </Link>
      </div>
      <div className="card-body table-full-width table-responsive">
        {status.message && <div className={`alert alert-${status.type} mx-3`}>{status.message}</div>}
        {loading && <div className="admin-empty">Loading records...</div>}
        {!loading && rows.length === 0 && <div className="admin-empty">No records found</div>}
        {!loading && rows.length > 0 && (
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                {columns.map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id}>
                  {columns.map((key) => (
                    <td key={key}>{formatCell(row[key])}</td>
                  ))}
                  <td className="text-right admin-actions">
                    <Link className="btn btn-sm btn-outline-info" to={`${row._id}/edit`}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </button>
                  </td>
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
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return value.name || value.title || value.email || value._id || "-";
  return String(value);
}

export default CrudListPage;
