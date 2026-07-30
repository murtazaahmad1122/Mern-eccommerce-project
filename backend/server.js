const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const heroSlideRoutes = require("./routes/heroSlideRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const couponRoutes = require("./routes/couponRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const app = express();

// Connect Database
connectDB();

// Middleware
const allowedOrigins = (
  process.env.CLIENT_URLS ||
  process.env.CLIENT_URL ||
  "http://localhost:5173,http://localhost:5174"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin.replace(/\/+$/, ""))) {
        return callback(null, true);
      }

      const error = new Error(`Origin ${origin} is not allowed by CORS`);
      error.statusCode = 403;
      return callback(error);
    },
    credentials: true,
  })
);
app.use(
  "/api/payments/stripe/webhook",
  express.raw({ type: "application/json" })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    service: "MERN Commerce API",
    status: "running",
    docs: "/docs",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/hero-slides", heroSlideRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Swagger UI
