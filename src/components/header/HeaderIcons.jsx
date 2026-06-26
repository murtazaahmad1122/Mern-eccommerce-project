function HeaderIcons({ onOpenSearch }) {
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
          {["Login", "Register", "Checkout"].map((item) => (
            <li key={item}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      <ToolIcon
        className="mn-tool-wish"
        linkClass="mn-main-wishlist mn-wishlist-toggle"
        icon="ri-heart-line"
        label="3"
        labelClass="label lbl-1"
      />

      <ToolIcon
        className="mn-tool-cart"
        linkClass="mn-main-cart mn-cart-toggle"
        icon="ri-shopping-cart-line"
        label="4"
        labelClass="label lbl-2"
      />
    </div>
  );
}

function ToolIcon({ className, linkClass, icon, label, labelClass }) {
  return (
    <div className={className}>
      <a href="#" className={linkClass}>
        {label && <span className={labelClass}>{label}</span>}
        <i className={icon}></i>
      </a>
    </div>
  );
}

export default HeaderIcons;