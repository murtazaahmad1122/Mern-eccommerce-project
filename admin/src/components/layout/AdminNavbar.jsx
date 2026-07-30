import { Link, useLocation } from "react-router-dom";
import { adminRoutes } from "../../routes/adminRoutes";

function AdminNavbar() {
  const location = useLocation();
  const currentRoute = adminRoutes.find((route) => location.pathname.startsWith(route.path));

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to={currentRoute?.path || "/admin/dashboard"}>
          {currentRoute?.name || "Admin"}
        </Link>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-sm btn-outline-danger" type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
