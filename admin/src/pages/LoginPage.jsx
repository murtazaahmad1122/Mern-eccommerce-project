import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

function LoginPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const { token, data } = response.data;

      if (data.role !== "admin") {
        setError("Admin access only");
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(data));
      window.location.href = "/admin/dashboard";
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="wrapper d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="card" style={{ width: 420 }}>
        <div className="card-header">
          <h4 className="card-title">Admin Login</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button className="btn btn-info btn-fill btn-block" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
