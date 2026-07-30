import { Link } from "react-router-dom";
import { useCommerce } from "../../context/CommerceContext";
import { getMediaUrl } from "../../utils/getMediaUrl";
import { formatPrice } from "../../utils/formatPrice";

export default function CartModal({ isOpen, onClose }) {
  const { user, cart, removeFromCart } = useCommerce();
  const items = cart.items || [];
  return <><div className={`mn-side-cart-overlay ${isOpen ? "show" : ""}`} onClick={onClose} />
    <div id="mn-side-cart" className={`mn-side-cart ${isOpen ? "mn-open-cart" : ""}`}><div className="mn-cart-inner">
      <div className="mn-cart-top"><div className="mn-cart-title"><span>My Cart</span><button className="btn mn-cart-close" onClick={onClose}><i className="ri-close-line" /></button></div>
        {!user ? <p>Please log in to view your cart.</p> : items.length === 0 ? <p>Your cart is empty.</p> :
        <ul className="mn-cart-pro-items">{items.map((item) => {
          const id = item.product?._id || item.product;
          return <li className="cart-sidebar-list" key={`${id}-${item.size}`}><Link to={`/product/${id}`} className="mn-pro-img" onClick={onClose}><img src={getMediaUrl(item.image)} alt={item.title} /></Link>
            <div className="mn-pro-content"><Link to={`/product/${id}`}>{item.title}</Link><span className="cart-price">{formatPrice(item.price)} × {item.quantity}</span>
              <button className="btn cart-remove-item" onClick={() => removeFromCart(id)}>&times;</button></div></li>;
        })}</ul>}
      </div><div className="mn-cart-bottom"><p>Subtotal: <strong>{formatPrice(cart.subTotal)}</strong></p><div className="cart_btn">
        <Link to="/cart" className="mn-btn-1" onClick={onClose}><span>Cart</span></Link>
        <Link to="/checkout" className="mn-btn-2" onClick={onClose}><span>Checkout</span></Link>
      </div></div>
    </div></div></>;
}
