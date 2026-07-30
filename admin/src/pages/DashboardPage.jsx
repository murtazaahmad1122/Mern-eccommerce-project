import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const fallbackStats = {
  counts: {
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalReviews: 0,
  },
  revenue: {
    totalRevenue: 0,
  },
  lowStockProducts: [],
  recentOrders: [],
};

function DashboardPage() {
  const [stats, setStats] = useState(fallbackStats);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/dashboard/stats")
      .then((response) => setStats(response.data.data || fallbackStats))
      .catch((apiError) => {
        setError(apiError.response?.data?.message || "Unable to load dashboard stats");
      });
  }, []);

  const cards = [
    ["Products", stats.counts.totalProducts, "nc-icon nc-box-2"],
    ["Categories", stats.counts.totalCategories, "nc-icon nc-bullet-list-67"],
    ["Orders", stats.counts.totalOrders, "nc-icon nc-delivery-fast"],
    ["Users", stats.counts.totalUsers, "nc-icon nc-circle-09"],
    ["Reviews", stats.counts.totalReviews, "nc-icon nc-chat-round"],
    ["Revenue", `$${stats.revenue.totalRevenue || 0}`, "nc-icon nc-money-coins"],
  ];

  return (
    <>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="admin-card-grid">
        {cards.map(([label, value, icon]) => (
          <div className="card admin-stat-card" key={label}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="card-category">{label}</p>
                  <h3 className="card-title">{value}</h3>
                </div>
                <i className={`${icon} text-info`} style={{ fontSize: 36 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Low Stock Products</h4>
            </div>
            <div className="card-body">
              {stats.lowStockProducts.length === 0 ? (
                <div className="admin-empty">No low stock products</div>
              ) : (
                <ul className="list-unstyled">
                  {stats.lowStockProducts.map((product) => (
                    <li className="d-flex justify-content-between py-2" key={product._id}>
                      <span>{product.title}</span>
                      <strong>{product.stock}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Recent Orders</h4>
            </div>
            <div className="card-body">
              {stats.recentOrders.length === 0 ? (
                <div className="admin-empty">No recent orders</div>
              ) : (
                <ul className="list-unstyled">
                  {stats.recentOrders.map((order) => (
                    <li className="d-flex justify-content-between py-2" key={order._id}>
                      <span>{order.user?.name || "Customer"}</span>
                      <strong>${order.totalAmount}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
