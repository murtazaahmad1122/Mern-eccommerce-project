import { Link } from "react-router-dom";
import { useCommerce } from "../context/CommerceContext";
import { getMediaUrl } from "../utils/getMediaUrl";
import { formatPrice } from "../utils/formatPrice";

export default function CartPage() {
  const { user, cart, loading, updateCart, removeFromCart } = useCommerce();
  if (!user) return <Message title="Your Cart" text="Log in to view and manage your server-backed cart." />;
  const items = cart.items || [];
  return (
    <div className="mn-main-content">
      <Breadcrumb title="Cart" />
      <section className="mn-cart-section p-b-15">
        {loading && <p>Loading cart...</p>}
        {!loading && items.length === 0 && <Message title="Your cart is empty" text="Browse the catalog to add products." />}
        {items.length > 0 && <div className="row">
          <div className="mn-cart-leftside col-lg-8 col-md-12">
            <div className="mn-cart-content"><div className="table-content cart-table-content"><table>
              <thead><tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th /></tr></thead>
              <tbody>{items.map((item) => {
                const productId = item.product?._id || item.product;
                return <tr key={`${productId}-${item.size}-${item.color}`}>
                  <td data-label="Product" className="mn-cart-pro-name">
                    <Link to={`/product/${productId}`}><img className="mn-cart-pro-img" src={getMediaUrl(item.image)} alt={item.title} />{item.title}</Link>
                  </td>
                  <td>{formatPrice(item.price)}</td>
                  <td><input type="number" min="1" max={item.product?.stock || 99} value={item.quantity}
                    onChange={(e) => updateCart(productId, Number(e.target.value)).catch(() => {})} /></td>
                  <td>{formatPrice(item.price * item.quantity)}</td>
                  <td><button type="button" className="btn" onClick={() => removeFromCart(productId)} aria-label={`Remove ${item.title}`}><i className="ri-delete-bin-line" /></button></td>
                </tr>;
              })}</tbody>
            </table></div></div>
          </div>
          <div className="mn-cart-rightside col-lg-4 col-md-12">
            <div className="mn-sidebar-wrap"><div className="mn-sidebar-block"><div className="mn-sb-title"><h3 className="mn-sidebar-title">Summary</h3></div>
              <div className="mn-sb-block-content"><div className="mn-cart-summary">
                <div><span>Subtotal</span><span className="text-right">{formatPrice(cart.subTotal)}</span></div>
                <div className="mn-cart-summary-total"><span>Total</span><span className="text-right">{formatPrice(cart.subTotal)}</span></div>
                <Link to="/checkout" className="mn-btn-2"><span>Proceed to checkout</span></Link>
              </div></div>
            </div></div>
          </div>
        </div>}
      </section>
    </div>
  );
}

function Breadcrumb({ title }) {
  return <div className="mn-breadcrumb m-b-30"><div className="row"><div className="col-12"><div className="row gi_breadcrumb_inner">
    <div className="col-md-6"><h2 className="mn-breadcrumb-title">{title}</h2></div>
    <div className="col-md-6"><ul className="mn-breadcrumb-list"><li><Link to="/">Home</Link></li><li className="active">{title}</li></ul></div>
  </div></div></div></div>;
}
function Message({ title, text }) {
  return <div className="text-center p-5"><h3>{title}</h3><p>{text}</p><Link className="mn-btn-2" to={title === "Your Cart" ? "/login" : "/shop"}><span>Continue</span></Link></div>;
}
