import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
const paymentStatuses = ["pending", "paid", "failed"];

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState({ orderStatus: "", paymentStatus: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadOrder = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/orders/${id}`);
      const orderData = response.data.data;
      setOrder(orderData);
      setFormData({
        orderStatus: orderData.orderStatus || "pending",
        paymentStatus: orderData.paymentStatus || "pending",
      });
    } catch (error) {
      setStatus({
        type: "danger",
        message: error.response?.data?.message || "Unable to load order",
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // The asynchronous request owns the loading lifecycle for this order.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrder();
  }, [loadOrder]);

  const handleStatusUpdate = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setStatus({ type: "", message: "" });
      const response = await axiosInstance.put(`/orders/${id}/status`, formData);
      setOrder(response.data.data);
      setStatus({ type: "success", message: "Order status updated successfully" });
    } catch (error) {
      setStatus({
        type: "danger",
        message: error.response?.data?.message || "Unable to update order status",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-order-page">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h4 className="card-title">Order Details</h4>
            <p className="card-category">{order?._id || id}</p>
          </div>
          <Link className="btn btn-outline-secondary" to="/admin/orders">
            Back
          </Link>
        </div>
        <div className="card-body">
          {status.message && <div className={`alert alert-${status.type}`}>{status.message}</div>}
          {loading && <div className="admin-empty">Loading order...</div>}
          {!loading && order && (
            <>
              <div className="admin-order-grid">
                <InfoPanel title="Customer">
                  <p>
                    <strong>{order.user?.name || "Customer"}</strong>
                  </p>
                  <p>{order.user?.email || "-"}</p>
                  <p>User ID: {getId(order.user)}</p>
                </InfoPanel>

                <InfoPanel title="Shipping Address">
                  <p>
                    <strong>{order.shippingAddress?.fullName}</strong>
                  </p>
                  <p>{order.shippingAddress?.phone}</p>
                  <p>{order.shippingAddress?.address}</p>
                  <p>
                    {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                  </p>
                  <p>{order.shippingAddress?.country}</p>
                </InfoPanel>

                <InfoPanel title="Dates">
                  <p>Created: {formatDate(order.createdAt)}</p>
                  <p>Updated: {formatDate(order.updatedAt)}</p>
                  <p>Paid: {formatDate(order.paidAt)}</p>
                </InfoPanel>

                <InfoPanel title="Payment">
                  <p>Method: {formatPaymentMethod(order.paymentMethod)}</p>
                  <p>
                    Status: <StatusBadge value={order.paymentStatus} />
                  </p>
                  <p>Payment ID: {order.paymentResult?.id || "-"}</p>
                  <p>Email: {order.paymentResult?.email || "-"}</p>
                </InfoPanel>
              </div>

              <form className="admin-status-form" onSubmit={handleStatusUpdate}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Order Status</label>
                      <select
                        className="form-control"
                        value={formData.orderStatus}
                        onChange={(event) =>
                          setFormData((current) => ({ ...current, orderStatus: event.target.value }))
                        }
                      >
                        {orderStatuses.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Payment Status</label>
                      <select
                        className="form-control"
                        value={formData.paymentStatus}
                        onChange={(event) =>
                          setFormData((current) => ({ ...current, paymentStatus: event.target.value }))
                        }
                      >
                        {paymentStatuses.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 admin-status-submit">
                    <button className="btn btn-info btn-fill" disabled={saving} type="submit">
                      {saving ? "Saving..." : "Update Status"}
                    </button>
                  </div>
                </div>
              </form>

              {order.paymentMethod === "cash_on_delivery" && (
                <div className="alert alert-info">
                  For cash on delivery orders, keep payment pending until cash is received. When delivered and paid,
                  set order status to delivered and payment status to paid.
                </div>
              )}

              <div className="table-responsive">
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Variation</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Line Total</th>
                      <th>Product ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(order.items || []).map((item) => (
                      <tr key={`${item.product}-${item.size}-${item.color}`}>
                        <td>
                          <div className="admin-order-product">
                            {item.image && <img alt="" src={getMediaUrl(item.image)} />}
                            <span>{item.title}</span>
                          </div>
                        </td>
                        <td>
                          Size: {item.size || "-"}
                          <br />
                          Color: {item.color || "-"}
                        </td>
                        <td>{formatMoney(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatMoney(Number(item.price || 0) * Number(item.quantity || 0))}</td>
                        <td>{getId(item.product)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-order-summary">
                <SummaryRow label="Items Total" value={order.itemsTotal} />
                <SummaryRow label="Shipping" value={order.shippingCharge} />
                <SummaryRow label="Tax" value={order.taxAmount} />
                <SummaryRow label={`Discount${order.coupon?.code ? ` (${order.coupon.code})` : ""}`} value={-Number(order.discountAmount || 0)} />
                <SummaryRow label="Grand Total" value={order.totalAmount} strong />
              </div>

              {order.note && (
                <div className="admin-note">
                  <strong>Customer Note:</strong> {order.note}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoPanel({ title, children }) {
  return (
    <div className="admin-info-panel">
      <h5>{title}</h5>
      {children}
    </div>
  );
}

function SummaryRow({ label, value, strong }) {
  return (
    <div className={strong ? "admin-summary-row admin-summary-total" : "admin-summary-row"}>
      <span>{label}</span>
      <strong>{formatMoney(value)}</strong>
    </div>
  );
}

function StatusBadge({ value }) {
  return <span className={`admin-status admin-status-${value || "default"}`}>{value || "-"}</span>;
}

function getId(value) {
  if (!value) return "-";
  if (typeof value === "string") return value;
  return value._id || "-";
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

function getMediaUrl(value) {
  if (!value) return "";
  if (value.startsWith("http") || value.startsWith("data:")) return value;
  if (value.startsWith("/uploads")) return `${getApiOrigin()}${value}`;
  return value;
}

function getApiOrigin() {
  const baseUrl = axiosInstance.defaults.baseURL || "http://localhost:5000/api";
  return baseUrl.replace(/\/api\/?$/, "");
}

export default OrderDetailPage;
