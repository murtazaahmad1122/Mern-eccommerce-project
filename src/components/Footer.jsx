function Footer({ isSidebarOpen, onOpenSearch }) {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className={`m-t-15 ${isSidebarOpen ? "sb-hide" : ""}`}>
        <div className="mn-footer">
          <div className="footer-container">
            <div className="footer-top p-tb-30">
              <div className="row m-minus-991">
                <div className="col-sm-12 col-lg-3 mn-footer-cat">
                  <div className="mn-footer-widget mn-footer-company">
                    <img
                      src="/src/assets/img/logo/logo.png"
                      className="mn-footer-logo"
                      alt="footer logo"
                    />
                    <img
                      src="/src/assets/img/logo/logo-dark.png"
                      className="mn-footer-dark-logo"
                      alt="footer logo"
                    />

                    <p className="mn-footer-detail">
                      The Mantu is the biggest market of grocery products. Get
                      your daily needs from our store.
                    </p>

                    <div className="mn-app-store">
                      <a href="#" className="app-img">
                        <img
                          src="/src/assets/img/footer/android.png"
                          className="adroid"
                          alt="android"
                        />
                      </a>
                      <a href="#" className="app-img">
                        <img
                          src="/src/assets/img/footer/apple.png"
                          className="apple"
                          alt="apple"
                        />
                      </a>
                    </div>
                  </div>
                </div>

                <FooterLinks
                  className="col-sm-12 col-lg-2 mn-footer-info"
                  title="Category"
                  links={["Fashion", "Cosmetics", "Bags & Purse", "Shoes", "Belts", "Perfumes"]}
                />

                <FooterLinks
                  className="col-sm-12 col-lg-2 mn-footer-account"
                  title="Company"
                  links={["About us", "Delivery", "Legal Notice", "Terms of use", "Secure payment", "Contact us"]}
                />

                <FooterLinks
                  className="col-sm-12 col-lg-2 mn-footer-service"
                  title="Account"
                  links={["Sign In", "View Cart", "Return Policy", "Become a Vendor", "Affiliate Program", "Payments"]}
                />

                <div className="col-sm-12 col-lg-3 mn-footer-cont-social">
                  <div className="mn-footer-contact">
                    <div className="mn-footer-widget">
                      <h4 className="mn-footer-heading">Contact</h4>
                      <div className="mn-footer-links mn-footer-dropdown">
                        <ul className="align-items-center">
                          <li className="mn-footer-link mn-foo-location">
                            <span className="mt-15px">
                              <i className="ri-map-pin-line"></i>
                            </span>
                            <p>
                              1234 Elm Street Springfield Avenue, Brooklyn den,
                              IL 62704 USA.
                            </p>
                          </li>

                          <li className="mn-footer-link mn-foo-call">
                            <span>
                              <i className="ri-whatsapp-line"></i>
                            </span>
                            <a href="tel:+009876543210">+00 9876543210</a>
                          </li>

                          <li className="mn-footer-link mn-foo-mail">
                            <span>
                              <i className="ri-mail-line"></i>
                            </span>
                            <a href="mailto:example@email.com">
                              example@email.com
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mn-footer-social">
                    <div className="mn-footer-widget">
                      <div className="mn-footer-links mn-footer-dropdown">
                        <ul className="align-items-center">
                          {["facebook-fill", "twitter-fill", "linkedin-fill", "instagram-line"].map(
                            (icon) => (
                              <li className="mn-footer-link" key={icon}>
                                <a href="#">
                                  <i className={`ri-${icon}`}></i>
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="row">
                <div className="mn-bottom-info">
                  <div className="footer-copy">
                    <div className="footer-bottom-copy">
                      <div className="mn-copy">
                        Copyright © <span>{year}</span>{" "}
                        <a className="site-name" href="#">
                          Murtaza Ahmad
                        </a>{" "}
                        all rights reserved.
                      </div>
                    </div>
                  </div>

                  <div className="footer-bottom-right">
                    <div className="footer-bottom-payment d-flex justify-content-center">
                      <div className="payment-link">
                        <img
                          src="/src/assets/img/footer/payment.png"
                          alt="payment"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <MobileFooterNav onOpenSearch={onOpenSearch} />
    </>
  );
}

function FooterLinks({ className, title, links }) {
  return (
    <div className={className}>
      <div className="mn-footer-widget">
        <h4 className="mn-footer-heading">{title}</h4>
        <div className="mn-footer-links mn-footer-dropdown">
          <ul className="align-items-center">
            {links.map((link) => (
              <li className="mn-footer-link" key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MobileFooterNav({ onOpenSearch }) {
  return (
    <div className="mn-footer-nav">
      <ul>
        <li>
          <a
            href="#"
            className="mn-main-search mn-search-toggle"
            onClick={(event) => {
              event.preventDefault();
              onOpenSearch?.();
            }}
            aria-label="Open search"
          >
            <i className="ri-search-line"></i>
          </a>
        </li>
        <li>
          <a href="#" className="mn-main-user">
            <i className="ri-user-line"></i>
          </a>
        </li>
        <li>
          <a href="#" className="mn-toggle-menu">
            <i className="ri-home-line"></i>
          </a>
        </li>
        <li>
          <a href="#" className="mn-main-wishlist mn-wishlist-toggle">
            <span className="label lbl-1">3</span>
            <i className="ri-heart-line"></i>
            <span>3</span>
          </a>
        </li>
        <li>
          <a href="#" className="mn-main-cart mn-cart-toggle">
            <span className="label lbl-2">4</span>
            <i className="ri-shopping-cart-line"></i>
            <span>4</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
