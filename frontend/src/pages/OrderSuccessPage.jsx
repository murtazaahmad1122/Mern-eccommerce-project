import { Link, useLocation, useParams } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const order = state?.order;
  return <div className="mn-main-content text-center p-5">
    <i className="ri-checkbox-circle-line" style={{ fontSize: 64 }} />
    <h2>Order placed successfully</h2>
    <p>Order reference: <strong>{id}</strong></p>
    {order && <p>Total: {formatPrice(order.totalAmount)} · Status: {order.orderStatus}</p>}
    <p>Your order is now available to the admin operations dashboard.</p>
    <Link to="/shop" className="mn-btn-2"><span>Continue shopping</span></Link>
  </div>;
}
