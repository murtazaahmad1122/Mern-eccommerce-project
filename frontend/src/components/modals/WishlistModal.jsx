import { Link } from "react-router-dom";
import { useCommerce } from "../../context/CommerceContext";
import { getMediaUrl } from "../../utils/getMediaUrl";
import { formatPrice } from "../../utils/formatPrice";

export default function WishlistModal({ isOpen, onClose }) {
  const { user, wishlist, removeFromWishlist } = useCommerce();
  const items = wishlist.items || [];
  return <><div className={`mn-side-wishlist-overlay ${isOpen ? "show" : ""}`} onClick={onClose} />
    <div id="mn-side-wishlist" className={`mn-side-wishlist ${isOpen ? "mn-open-wishlist" : ""}`}><div className="mn-wishlist-inner">
      <div className="mn-wishlist-top"><div className="mn-wishlist-title"><span>My Wishlist</span><button className="btn" onClick={onClose}><i className="ri-close-line" /></button></div>
        {!user ? <p>Please log in to view your wishlist.</p> : items.length === 0 ? <p>Your wishlist is empty.</p> :
        <ul className="mn-wishlist-pro-items">{items.map((item) => {
          const product = typeof item.product === "object" ? item.product : { _id: item.product, ...item };
          return <li className="wishlist-sidebar-list" key={product._id}><Link to={`/product/${product._id}`} className="mn-pro-img" onClick={onClose}><img src={getMediaUrl(product.mainImg || item.image)} alt={product.title} /></Link>
            <div className="mn-pro-content"><Link to={`/product/${product._id}`}>{product.title}</Link><span>{formatPrice(product.price)}</span>
              <button className="btn wishlist-remove-item" onClick={() => removeFromWishlist(product._id)}>&times;</button></div></li>;
        })}</ul>}
      </div><div className="mn-wishlist-bottom"><Link to="/wishlist" className="mn-btn-1" onClick={onClose}><span>View Wishlist</span></Link></div>
    </div></div></>;
}
