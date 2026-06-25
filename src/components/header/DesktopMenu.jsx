import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navigation";

function DesktopMenu() {
  return (
    <div id="mn-main-menu-desk" className="d-none d-lg-block sticky-nav">
      <div className="nav-desk">
        <div className="row">
          <div className="col-md-12 align-self-center">
            <div className="mn-main-menu">
              <ul>
                {navLinks.map((link) => (
                  <li className="non-drop" key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopMenu;