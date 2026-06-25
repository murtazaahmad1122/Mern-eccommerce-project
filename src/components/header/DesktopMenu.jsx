function DesktopMenu() {
  return (
    <div id="mn-main-menu-desk" className="d-none d-lg-block sticky-nav">
      <div className="nav-desk">
        <div className="row">
          <div className="col-md-12 align-self-center">
            <div className="mn-main-menu">
              <ul>
                <li className="non-drop">
                  <a href="/">Home</a>
                </li>

                <li className="dropdown drop-list">
                  <a href="#" className="dropdown-arrow">
                    Categories <i className="ri-arrow-down-s-line"></i>
                  </a>

                  <ul className="mega-menu d-block">
                    <li className="d-flex">
                      <span className="bg"></span>

                      <MenuBlock
                        title="Classic"
                        items={[
                          "Shop Right sidebar",
                          "Banner Right sidebar",
                          "Shop Full Width",
                          "Banner Full Width",
                        ]}
                      />

                      <MenuBlock
                        title="List"
                        items={[
                          "Shop Right sidebar",
                          "Banner Right sidebar",
                          "Shop Full Width",
                          "Banner Full Width",
                        ]}
                      />
                    </li>
                  </ul>
                </li>
                 <li className="non-drop">
                  <a href="products.html">Products</a>
                </li>
                <li className="non-drop">
                  <a href="contact.html">Contact Us</a>
                </li>
                

                {/* <li className="dropdown drop-list">
                  <a href="#" className="dropdown-arrow">
                    Pages <i className="ri-arrow-down-s-line"></i>
                  </a>

                  <ul className="sub-menu">
                    <li className="dropdown position-static">
                      <a href="#" className="mn-sub-drop">
                        Blog <i className="ri-arrow-down-s-line"></i>
                      </a>

                      <ul className="sub-menu sub-menu-child">
                        {[
                          "right sidebar",
                          "Full Width",
                          "Detail right sidebar",
                          "Detail Full Width",
                        ].map((item) => (
                          <li key={item}>
                            <a href="#">{item}</a>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {[
                      "About Us",
                      "Contact Us",
                      "Cart",
                      "Checkout",
                      "Compare",
                      "FAQ",
                      "Login",
                    ].map((item) => (
                      <li key={item}>
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuBlock({ title, items }) {
  return (
    <ul className="d-block mega-block">
      <li className="menu_title">
        <a href="#">{title}</a>
      </li>

      {items.map((item) => (
        <li key={item}>
          <a href="#">{item}</a>
        </li>
      ))}
    </ul>
  );
}

function DropMenu({ title, items }) {
  return (
    <li className="dropdown drop-list">
      <a href="#" className="dropdown-arrow">
        {title} <i className="ri-arrow-down-s-line"></i>
      </a>

      <ul className="sub-menu">
        {items.map((item) => (
          <li key={item}>
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default DesktopMenu;