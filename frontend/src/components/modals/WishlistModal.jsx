import { Link } from "react-router-dom";

const wishlistItems = [
  {
    image: "15.jpg",
    title: "Leather bag",
    price: "$499.00",
    stock: "9 in Stock",
  },
  {
    image: "13.jpg",
    title: "Leather Belt",
    price: "$59.00",
    stock: "4 in Stock",
  },
  {
    image: "5.jpg",
    title: "T-Shirt for men",
    price: "$65.00",
    stock: "54 in Stock",
  },
];

function WishlistModal({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`mn-side-wishlist-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div
        id="mn-side-wishlist"
        className={`mn-side-wishlist ${isOpen ? "mn-open-wishlist" : ""}`}
      >
        <div className="mn-wishlist-inner">
          <div className="mn-wishlist-top">
            <div className="mn-wishlist-title">
              <span className="wishlist_title">My Wishlist</span>

              <a
                href="#"
                className="mn-wishlist-close"
                onClick={(event) => {
                  event.preventDefault();
                  onClose?.();
                }}
              >
                <i className="ri-close-line"></i>
              </a>
            </div>

            <ul className="mn-wishlist-pro-items">
              {wishlistItems.map((item) => (
                <WishlistItem key={item.title} item={item} />
              ))}
            </ul>
          </div>

          <div className="mn-wishlist-bottom">
            <div className="wishlist_btn">
              <Link to="/wishlist" className="mn-btn-1" onClick={onClose}>
                <span>
                  View Wishlist<i className="ri-arrow-right-s-line"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function WishlistItem({ item }) {
  return (
    <li className="wishlist-sidebar-list">
      <Link to="/product-detail" className="mn-pro-img">
        <img src={`/mantu-html/assets/img/product/${item.image}`} alt="product" />
      </Link>

      <div className="mn-pro-content">
        <Link to="/product-detail" className="wishlist-pro-title">
          {item.title}
        </Link>

        <span className="wishlist-price">
          <span>{item.price}</span>
          <span className="stock">- {item.stock}</span>
        </span>

        <a
          href="#"
          className="wishlist-remove-item"
          onClick={(event) => event.preventDefault()}
        >
          &times;
        </a>
      </div>
    </li>
  );
}

export default WishlistModal;
