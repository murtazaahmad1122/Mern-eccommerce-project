import { useState } from "react";

function Sidebar({ isOpen, onClose }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (title) => {
    setOpenDropdown((current) => (current === title ? null : title));
  };

  return (
    <>
      <div
        className={`mn-sidebar-overlay ${isOpen ? "mn-sidebar-overlay-hide" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`mn-sidebar ${isOpen ? "sidebar-hide" : ""}`}>
        <div className="mn-sidebar-body">
          <button
            type="button"
            className="side-close"
            title="Close"
            onClick={onClose}
          ></button>

          <ul className="mn-sb-list">
            <li className="mn-sb-title condense">
              <span>Fashion</span>
            </li>

            <SidebarDropdown
              icon="clothes-2.svg"
              title="Clothes"
              items={["T-shirts", "Shirts", "gowns", "Dresses", "sharees", "jeans"]}
              isOpen={openDropdown === "Clothes"}
              onToggle={() => toggleDropdown("Clothes")}
            />

            <SidebarItem icon="shoes.svg" title="Shoes" />
            <SidebarItem icon="glasses.svg" title="glasses" />

            <SidebarDropdown
              icon="bag.svg"
              title="Bags"
              items={["Purse", "Bags", "wallet"]}
              isOpen={openDropdown === "Bags"}
              onToggle={() => toggleDropdown("Bags")}
            />

            <SidebarItem icon="hat.svg" title="Hat" />

            <SidebarDropdown
              icon="makeup.svg"
              title="Makeup"
              items={["Lipstick", "eye liner", "nail paint", "Makeup kit"]}
              isOpen={openDropdown === "Makeup"}
              onToggle={() => toggleDropdown("Makeup")}
            />

            <SidebarDropdown
              icon="cosmetics.svg"
              title="Cosmetics"
              items={["Shampoo", "face wash", "body wash", "sunscreen", "serum"]}
              isOpen={openDropdown === "Cosmetics"}
              onToggle={() => toggleDropdown("Cosmetics")}
            />

            <li className="mn-sb-title condense">
              <span>Bakery</span>
            </li>

            <SidebarDropdown
              icon="cake.svg"
              title="Cake"
              items={["cup cake", "pastry", "Cake"]}
              isOpen={openDropdown === "Cake"}
              onToggle={() => toggleDropdown("Cake")}
            />
            <SidebarItem icon="bread.svg" title="Bread" />

            <li className="mn-sb-title condense">
              <span>Vegetables</span>
            </li>

            <SidebarDropdown
              icon="tuber.svg"
              title="tuber root"
              items={["Sweet Potato", "Ginger", "cassava"]}
              isOpen={openDropdown === "tuber root"}
              onToggle={() => toggleDropdown("tuber root")}
            />

            <SidebarItem icon="tomato.svg" title="Tomato" />
            <SidebarItem icon="lemon.svg" title="Lemon" />

            <li className="mn-sb-title condense">
              <span>Fruits</span>
            </li>

            <SidebarItem icon="avocado.svg" title="avocado" />
            <SidebarItem icon="strawberry.svg" title="strawberry" />
            <SidebarItem icon="cherry.svg" title="cherry" />
            <SidebarItem icon="lychee.svg" title="Lychee" />
          </ul>
        </div>
      </div>
    </>
  );
}

function SidebarItem({ icon, title }) {
  return (
    <li className="mn-sb-item sb-drop-item">
      <a href="#" className="mn-drop-toggle">
        <img src={`/src/assets/img/icons/${icon}`} alt={title} />
        <span className="condense">{title}</span>
      </a>
    </li>
  );
}

function SidebarDropdown({ icon, title, items, isOpen, onToggle }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <li className="mn-sb-item sb-drop-item">
      <a
        href="#"
        className={`mn-drop-toggle ${isOpen ? "active-nav" : ""}`}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={(event) => {
          event.preventDefault();
          onToggle();
        }}
        onKeyDown={handleKeyDown}
      >
        <img src={`/src/assets/img/icons/${icon}`} alt={`${title} icon`} />
        <span className="condense">
          {title}
          <i className="drop-arrow ri-arrow-down-s-line"></i>
        </span>
      </a>

      <ul className="mn-sb-drop" style={{ display: isOpen ? "block" : "none" }}>
        {items.map((item) => (
          <li className="list" key={item}>
            <a href="#" className="mn-page-link drop">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default Sidebar;
