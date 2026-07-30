import { Link } from "react-router-dom";
import { useCommerce } from "../../context/CommerceContext";

function HeaderIcons({ onOpenSearch, onCartOpen, onWishlistOpen }) {
  const { user, cart, wishlist, logout } = useCommerce();
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
          {!user && <li><Link to="/login">Login</Link></li>}
          {!user && <li><Link to="/register">Register</Link></li>}
          {user && <li><button type="button" className="btn" onClick={logout}>Logout {user.name}</button></li>}
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </div>

      <ToolIcon
        className="mn-tool-wish"
        linkClass="mn-main-wishlist mn-wishlist-toggle"
        icon="ri-heart-line"
        label={String(wishlist.items?.length || 0)}
        labelClass="label lbl-1"
        onClick={onWishlistOpen}
      />

      <ToolIcon
        className="mn-tool-cart"
        linkClass="mn-main-cart mn-cart-toggle"
        icon="ri-shopping-cart-line"
        label={String(cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0)}
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
