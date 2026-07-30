import { NavLink } from "react-router-dom";
import { adminRoutes } from "../../routes/adminRoutes";
import sidebarImage from "../../assets/img/sidebar-3.jpg";

function AdminSidebar() {
  return (
    <div className="sidebar" data-color="black" data-image={sidebarImage}>
      <div
        className="sidebar-background"
        style={{ backgroundImage: `url(${sidebarImage})` }}
      />
      <div className="sidebar-wrapper">
        <NavLink to="/admin/dashboard" className="admin-brand">
          Mantu Admin
        </NavLink>
        <ul className="nav">
          {adminRoutes.map((route) => (
            <li className="nav-item" key={route.path}>
              <NavLink to={route.path} className="admin-sidebar-link">
                <i className={route.icon} />
                <p>{route.name}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
