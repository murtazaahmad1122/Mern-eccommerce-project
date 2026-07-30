import { Link } from "react-router-dom";

const cartItems = [
  {
    image: "11.jpg",
    title: "Smart watch",
    price: "$255.00",
    quantity: 1,
  },
  {
    image: "5.jpg",
    title: "T-Shirt for men",
    price: "$64.00",
    quantity: 1,
  },
  {
    image: "13.jpg",
    title: "Leather Belt",
    price: "$59.00",
    quantity: 1,
  },
  {
    image: "2.jpg",
    title: "T-Shirt for girls",
    price: "$39.00",
    quantity: 1,
  },
];

function CartModal({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`mn-side-cart-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div
        id="mn-side-cart"
        className={`mn-side-cart ${isOpen ? "mn-open-cart" : ""}`}
      >
        <div className="mn-cart-inner">
          <div className="mn-cart-top">
            <div className="mn-cart-title">
              <span className="cart_title">My Cart</span>

              <a
                href="#"
                className="mn-cart-close"
                onClick={(event) => {
                  event.preventDefault();
                  onClose?.();
                }}
              >
                <i className="ri-close-line"></i>
              </a>
            </div>
            <ul className="mn-cart-pro-items">
              {cartItems.map((item) => (
                <CartItem key={item.title} item={item} />
              ))}
            </ul>
          </div>

          <div className="mn-cart-bottom">
            <div className="cart-sub-total">
              <table className="table cart-table">
                <tbody>
                  <tr>
                    <td className="text-left">Sub-Total :</td>
                    <td className="text-right">$417.00</td>
                  </tr>
                  <tr>
                    <td className="text-left">VAT (20%) :</td>
                    <td className="text-right">$83.40</td>
                  </tr>
                  <tr>
                    <td className="text-left">Total :</td>
                    <td className="text-right primary-color">$500.40</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="cart_btn">
              <Link to="/cart" className="mn-btn-1" onClick={onClose}>
                <span>
                  Cart<i className="ri-arrow-right-s-line"></i>
                </span>
              </Link>

              <Link to="/checkout" className="mn-btn-2" onClick={onClose}>
                <span>
                  Checkout<i className="ri-arrow-right-s-line"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CartItem({ item }) {
  return (
    <li className="cart-sidebar-list">
      <Link to="/product-detail" className="mn-pro-img">
        <img src={`src/assets/img/product/${item.image}`} alt="product" />
      </Link>

      <div className="mn-pro-content">
        <Link to="/product-detail" className="cart-pro-title">
          {item.title}
        </Link>

        <span className="cart-price">
          <span>{item.price}</span> x {item.quantity}
        </span>

        <div className="qty-plus-minus">
          <input
            className="qty-input"
            type="text"
            name="mn-qtybtn"
            defaultValue={item.quantity}
          />
        </div>

        <a
          href="/cart"
          className="cart-remove-item"
          onClick={(event) => event.preventDefault()}
        >
          &times;
        </a>
      </div>
    </li>
  );
}

export default CartModal;
