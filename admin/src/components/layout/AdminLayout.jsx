import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="wrapper">
      <AdminSidebar />
      <div className="main-panel">
        <AdminNavbar />
        <div className="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid">
            <nav>
              <p className="copyright text-center">
                MERN Ecommerce Admin
              </p>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;
