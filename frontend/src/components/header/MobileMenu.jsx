import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../../data/navigation";

function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`mn-mobile-menu-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div
        id="mn-mobile-menu"
        className={`mn-mobile-menu ${isOpen ? "mn-menu-open" : ""}`}
      >
        <div className="mn-menu-title">
          <span className="menu_title">My Menu</span>
          <button type="button" className="mn-close-menu" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="mn-menu-inner">
          <div className="mn-menu-content">
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="header-res-lan-curr">
            <div className="header-res-social">
              <div className="header-top-social">
                <ul className="mb-0">
                  {[
                    "facebook-fill",
                    "twitter-fill",
                    "instagram-line",
                    "linkedin-fill",
                  ].map((icon) => (
                    <li className="list-inline-item" key={icon}>
                      <a href="#">
                        <i className={`ri-${icon}`}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;