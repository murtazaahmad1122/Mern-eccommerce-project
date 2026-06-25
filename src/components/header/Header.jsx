import { useState } from "react";
import HeaderLeft from "./HeaderLeft";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import HeaderIcons from "./HeaderIcons";

function Header({ isSidebarOpen, onSidebarToggle }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={isSidebarOpen ? "sb-hide" : ""}>
      <div className="mn-header">
        <div className="mn-header-items">
          <HeaderLeft
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={onSidebarToggle}
            onMenuOpen={() => setIsMobileMenuOpen(true)}
          />

          <div className="right-header">
            <DesktopMenu />
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />
            <HeaderIcons />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
