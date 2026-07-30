import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useCommerce } from "../context/CommerceContext";
import { formatPrice } from "../utils/formatPrice";

const initialAddress = { fullName: "", phone: "", address: "", city: "", postalCode: "", country: "" };

export default function Checkout() {
  const navigate = useNavigate();
  const { user, cart, refreshCommerce } = useCommerce();
  const [address, setAddress] = useState(initialAddress);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  if (!user) return <Prompt text="Please log in before checkout." to="/login" label="Login" />;
  if (!(cart.items || []).length) return <Prompt text="Your cart is empty." to="/shop" label="Shop now" />;

  const change = (e) => setAddress({ ...address, [e.target.name]: e.target.value });
  const applyCoupon = async () => {
    try {
      const response = await axiosInstance.post("/coupons/validate", { code: couponCode, cartTotal: cart.subTotal });
      setDiscount(response.data.data.discountAmount); setStatus(response.data.message);
    } catch (error) { setDiscount(0); setStatus(error.response?.data?.message || "Coupon could not be applied."); }
  };
  const submit = async (e) => {
    e.preventDefault(); setSubmitting(true); setStatus("");
    try {
      const response = await axiosInstance.post("/orders", {
        shippingAddress: address, paymentMethod: "cash_on_delivery", couponCode, note,
      });
      await refreshCommerce();
      navigate(`/order-success/${response.data.data._id}`, { state: { order: response.data.data } });
    } catch (error) { setStatus(error.response?.data?.message || "Unable to create order."); }
    finally { setSubmitting(false); }
  };
  return <div className="mn-main-content">
    <div className="mn-breadcrumb m-b-30"><h2 className="mn-breadcrumb-title">Secure Checkout</h2></div>
    <form onSubmit={submit}><div className="row">
      <div className="col-lg-8"><div className="mn-sidebar-wrap p-4"><h3>Shipping address</h3>
        {Object.keys(initialAddress).map((name) => <span className="mn-register-wrap" key={name}>
          <label>{name.replace(/([A-Z])/g, " $1")}*</label>
          <input name={name} value={address[name]} onChange={change} required={name !== "postalCode"} />
        </span>)}
        <label>Order note</label><textarea value={note} onChange={(e) => setNote(e.target.value)} />
      </div></div>
      <div className="col-lg-4"><div className="mn-sidebar-wrap p-4"><h3>Order summary</h3>
        {(cart.items || []).map((item) => <div key={`${item.product?._id || item.product}-${item.size}`} className="d-flex justify-content-between"><span>{item.title} × {item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div>)}
        <hr /><div className="d-flex"><input value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Coupon code" /><button type="button" onClick={applyCoupon}>Apply</button></div>
        <p>Subtotal: {formatPrice(cart.subTotal)}</p><p>Discount: -{formatPrice(discount)}</p>
        <h4>Total: {formatPrice(Math.max(0, cart.subTotal - discount))}</h4>
        <p>Payment: Cash on delivery</p>{status && <div className="alert alert-info">{status}</div>}
        <button className="mn-btn-2" type="submit" disabled={submitting}><span>{submitting ? "Placing order..." : "Place order"}</span></button>
      </div></div>
    </div></form>
  </div>;
}
function Prompt({ text, to, label }) {
  return <div className="mn-main-content text-center p-5"><h2>Checkout</h2><p>{text}</p><Link className="mn-btn-2" to={to}><span>{label}</span></Link></div>;
}
