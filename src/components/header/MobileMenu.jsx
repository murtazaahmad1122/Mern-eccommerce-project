import { useEffect, useState } from "react";

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
              <li>
                <a href="/">Home</a>
              </li>

              <MobileDropdown title="Categories" items={["Classic", "List"]} />

              <MobileDropdown
                title="Products"
                items={[
                  "product detail",
                  "Product accordion",
                  "Product full width",
                  "accordion full width",
                ]}
              />

              <MobileDropdown
                title="Pages"
                items={[
                  "About Us",
                  "Contact Us",
                  "Cart",
                  "Checkout",
                  "Compare",
                  "Faq",
                  "Login",
                  "Register",
                ]}
              />

              <MobileDropdown
                title="Blog"
                items={[
                  "Right Sidebar",
                  "Full Width",
                  "Detail Right Sidebar",
                  "Detail Full Width",
                ]}
              />
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

function MobileDropdown({ title, items }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={open ? "active" : ""}>
      <span
        className="menu-toggle"
        role="button"
        tabIndex="0"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(!open);
          }
        }}
      ></span>

      <a href="#" onClick={(event) => event.preventDefault()}>
        {title}
      </a>

      <ul className={`sub-menu ${open ? "d-block" : ""}`}>
        {items.map((item) => (
          <li key={item}>
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default MobileMenu;
