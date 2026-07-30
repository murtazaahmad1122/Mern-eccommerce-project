import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders");
        setOrders(response.data.data || []);
      } catch (error) {
        setStatus({
          type: "warning",
          message: error.response?.data?.message || "Unable to load orders",
        });
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="card admin-table-card">
      <div className="card-header">
        <h4 className="card-title">Orders</h4>
        <p className="card-category">View order details and manage fulfillment</p>
      </div>
      <div className="card-body table-full-width table-responsive">
        {status.message && <div className={`alert alert-${status.type} mx-3`}>{status.message}</div>}
        {loading && <div className="admin-empty">Loading orders...</div>}
        {!loading && orders.length === 0 && <div className="admin-empty">No orders found</div>}
        {!loading && orders.length > 0 && (
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Order Status</th>
                <th>Payment</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{shortId(order._id)}</td>
                  <td>
                    <strong>{order.user?.name || "Customer"}</strong>
                    <br />
                    <small>{order.user?.email || "-"}</small>
                  </td>
                  <td>{getItemCount(order)} item(s)</td>
                  <td>{formatMoney(order.totalAmount)}</td>
                  <td>
                    <StatusBadge value={order.orderStatus} />
                  </td>
                  <td>
                    <StatusBadge value={order.paymentStatus} />
                    <br />
                    <small>{formatPaymentMethod(order.paymentMethod)}</small>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td className="text-right">
                    <Link className="btn btn-sm btn-info btn-fill" to={`${order._id}`}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function getItemCount(order) {
  return (order.items || []).reduce((total, item) => total + Number(item.quantity || 0), 0);
}

function shortId(id) {
  return id ? `#${id.slice(-8).toUpperCase()}` : "-";
}

function formatMoney(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "-";
}

function formatPaymentMethod(value) {
  return String(value || "").replaceAll("_", " ") || "-";
}

function StatusBadge({ value }) {
  return <span className={`admin-status admin-status-${value || "default"}`}>{value || "-"}</span>;
}

export default OrderListPage;
