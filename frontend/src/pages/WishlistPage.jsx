import { Link } from "react-router-dom";
import { useCommerce } from "../context/CommerceContext";
import { getMediaUrl } from "../utils/getMediaUrl";
import { formatPrice } from "../utils/formatPrice";

export default function WishlistPage() {
  const { user, wishlist, addToCart, removeFromWishlist } = useCommerce();
  if (!user) return <div className="mn-main-content text-center p-5"><h2>Wishlist</h2><p>Log in to access your wishlist.</p><Link to="/login" className="mn-btn-2"><span>Login</span></Link></div>;
  const items = wishlist.items || [];
  return <div className="mn-main-content">
    <div className="mn-breadcrumb m-b-30"><h2 className="mn-breadcrumb-title">Wishlist</h2></div>
    <section className="mn-wishlist-page p-b-15"><div className="mn-vendor-dashboard-card">
      <div className="mn-vendor-card-header"><h5>Saved products ({items.length})</h5><Link className="mn-btn-2" to="/shop"><span>Shop Now</span></Link></div>
      {items.length === 0 ? <p className="p-4">Your wishlist is empty.</p> :
      <div className="mn-vendor-card-table"><table className="mn-table"><thead><tr><th>Product</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
        <tbody>{items.map((item) => {
          const product = typeof item.product === "object" ? item.product : { _id: item.product, title: item.title, price: item.price, mainImg: item.image, stock: item.stock };
          return <tr key={product._id}><td><Link to={`/product/${product._id}`}><img className="prod-img" src={getMediaUrl(product.mainImg || item.image)} alt={product.title} /> {product.title}</Link></td>
            <td>{formatPrice(product.price)}</td><td>{product.stock > 0 ? `${product.stock} available` : "Out of stock"}</td>
            <td><button className="mn-btn-2" disabled={product.stock <= 0} onClick={() => addToCart(product)}><span>Add to cart</span></button>{" "}
              <button className="btn" onClick={() => removeFromWishlist(product._id)} aria-label="Remove"><i className="ri-delete-bin-line" /></button></td></tr>;
        })}</tbody></table></div>}
    </div></section>
  </div>;
}
