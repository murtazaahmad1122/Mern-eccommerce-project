const express = require("express");

const { getDashboardStats } = require("../controllers/dashboardController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Admin dashboard statistics APIs
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get admin dashboard statistics
 *     description: |
 *       Admin only.
 *
 *       This API gives all important dashboard data:
 *
 *       - Total active products
 *       - Total active categories
 *       - Total active users
 *       - Total orders
 *       - Total reviews
 *       - Order status counts
 *       - Total revenue
 *       - Low stock products
 *       - Recent orders
 *
 *       Used on the admin dashboard homepage.
 *
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Dashboard stats fetched successfully
 *               data:
 *                 counts:
 *                   totalProducts: 25
 *                   totalCategories: 8
 *                   totalUsers: 12
 *                   totalOrders: 30
 *                   totalReviews: 17
 *                 orders:
 *                   pending: 5
 *                   processing: 3
 *                   shipped: 7
 *                   delivered: 14
 *                   cancelled: 1
 *                 revenue:
 *                   totalRevenue: 15000
 *                   totalItemsRevenue: 14000
 *                   totalShipping: 1200
 *                   totalDiscount: 200
 *                 lowStockProducts: []
 *                 recentOrders: []
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       403:
 *         description: Admin access only
 */
router.get("/stats", protect, adminOnly, getDashboardStats);

module.exports = router;