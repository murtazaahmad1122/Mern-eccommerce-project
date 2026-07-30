import { Link } from "react-router-dom";

function HeaderIcons({ onOpenSearch, onCartOpen, onWishlistOpen }) {
  return (
    <div className="mn-tool-icons">
      <div className="mn-tool-search">
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
      </div>

      <div className="mn-tool-user">
        <a href="#" className="mn-main-user">
          <i className="ri-user-line"></i>
        </a>

        <ul className="sub-menu">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <a href="register">Register</a>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </div>

      <ToolIcon
        className="mn-tool-wish"
        linkClass="mn-main-wishlist mn-wishlist-toggle"
        icon="ri-heart-line"
        label="3"
        labelClass="label lbl-1"
        onClick={onWishlistOpen}
      />

      <ToolIcon
        className="mn-tool-cart"
        linkClass="mn-main-cart mn-cart-toggle"
        icon="ri-shopping-cart-line"
        label="4"
        labelClass="label lbl-2"
        onClick={onCartOpen}
      />
    </div>
  );
}

function ToolIcon({ className, linkClass, icon, label, labelClass, onClick }) {
  return (
    <div className={className}>
      <a
        href="#"
        className={linkClass}
        onClick={(event) => {
          event.preventDefault();
          onClick?.();
        }}
      >
        {label && <span className={labelClass}>{label}</span>}
        <i className={icon}></i>
      </a>
    </div>
  );
}

export default HeaderIcons;
