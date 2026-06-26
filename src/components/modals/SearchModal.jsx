import { useEffect } from "react";
import { Link } from "react-router-dom";

const searchResults = [
  {
    id: 1,
    title: "Sport Shoes",
    category: "Shoes",
    price: "$255.00",
    stock: "11 in Stock",
    image: "/src/assets/img/product/9.jpg",
    path: "/shop",
  },
  {
    id: 2,
    title: "Leather bag",
    category: "Bags",
    price: "$65.00",
    stock: "54 in Stock",
    image: "/src/assets/img/product/15.jpg",
    path: "/shop",
  },
  {
    id: 3,
    title: "T-shirt for girls",
    category: "Clothes",
    price: "$59.00",
    stock: "4 in Stock",
    image: "/src/assets/img/product/1.jpg",
    path: "/shop",
  },
];

const recentSearches = ["T-shirts", "watches", "Bags", "Belts"];

function SearchModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="mn-side-search-overlay" style={{ display: "block" }} onClick={onClose} />
      <div className="mn-side-search mn-open-search" role="dialog" aria-modal="true" aria-label="Search products">
        <div className="mn-search-inner">
          <div className="mn-search-title">
            <span className="search_title">Search</span>
            <button type="button" className="mn-search-close" onClick={onClose} aria-label="Close search">
              <i className="ri-close-line"></i>
            </button>
          </div>

          <div className="mn-search">
            <form onSubmit={(event) => event.preventDefault()}>
              <input type="text" placeholder="Search here..." />
              <a href="#" onClick={(event) => event.preventDefault()} aria-label="Search">
                <i className="ri-search-line"></i>
              </a>
            </form>
          </div>

          <div className="mn-search-list">
            <ul className="mn-search-pro-items">
              {searchResults.map((item) => (
                <li className="search-sidebar-list" key={item.id}>
                  <Link to={item.path} className="mn-pro-img" onClick={onClose}>
                    <img src={item.image} alt={item.title} />
                  </Link>
                  <div className="mn-pro-content">
                    <Link to={item.path} className="search-pro-title" onClick={onClose}>
                      {item.title}
                    </Link>
                    <Link to="/shop" className="search-cat" onClick={onClose}>
                      {item.category}
                    </Link>
                    <ul className="mn-ratings">
                      {[...Array(4)].map((_, index) => (
                        <li key={`${item.id}-${index}`}>
                          <i className="ri-star-fill"></i>
                        </li>
                      ))}
                      <li>
                        <i className="ri-star-fill grey"></i>
                      </li>
                    </ul>
                    <span className="search-price">
                      <span>{item.price}</span>
                      <span className="stock">- {item.stock}</span>
                    </span>
                    <a href="#" className="search-remove-item" onClick={(event) => event.preventDefault()}>
                      ×
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mn-search-also m-t-15">
            <div className="mn-search-title">
              <span className="search_title">Recently searches</span>
            </div>
            <ul>
              {recentSearches.map((item) => (
                <li key={item}>
                  <Link to="/shop" onClick={onClose}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchModal;
