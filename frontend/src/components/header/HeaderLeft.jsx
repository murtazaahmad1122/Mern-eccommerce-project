function HeaderLeft({ isSidebarOpen, onSidebarToggle, onMenuOpen }) {
  return (
    <div className="left-header">
      <a
        href="#"
        className={`mn-toggle-sidebar ${isSidebarOpen ? "active-toggle" : ""}`}
        onClick={(event) => {
          event.preventDefault();
          onSidebarToggle();
        }}
      >
        <span className="outer-ring">
          <span className="inner-ring"></span>
        </span>
      </a>

      <a href="/" className="logo">
        <img src="/src/assets/img/logo/logo.png" alt="logo" />
      </a>

      <button type="button" className="mn-toggle-menu" onClick={onMenuOpen}>
        <div className="header-icon">
          <i className="ri-menu-3-fill"></i>
        </div>
      </button>
    </div>
  );
}

export default HeaderLeft;
