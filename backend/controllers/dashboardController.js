const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Order = require("../models/Order");
const Review = require("../models/Review");

const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalReviews,
      lowStockProducts,
      recentOrders,
      revenueStats,
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Category.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.countDocuments({ orderStatus: "pending" }),
      Order.countDocuments({ orderStatus: "processing" }),
      Order.countDocuments({ orderStatus: "shipped" }),
      Order.countDocuments({ orderStatus: "delivered" }),
      Order.countDocuments({ orderStatus: "cancelled" }),
      Review.countDocuments({ isActive: true }),

      Product.find({ isActive: true, stock: { $lte: 5 } })
        .select("title mainImg stock price")
        .sort({ stock: 1 })
        .limit(10),

      Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 })
        .limit(10),

      Order.aggregate([
        {
          $match: {
            orderStatus: { $ne: "cancelled" },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
            totalItemsRevenue: { $sum: "$itemsTotal" },
            totalShipping: { $sum: "$shippingCharge" },
            totalDiscount: { $sum: "$discountAmount" },
          },
        },
      ]),
    ]);

    const revenue = revenueStats[0] || {
      totalRevenue: 0,
      totalItemsRevenue: 0,
      totalShipping: 0,
      totalDiscount: 0,
    };

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        counts: {
          totalProducts,
          totalCategories,
          totalUsers,
          totalOrders,
          totalReviews,
        },

        orders: {
          pending: pendingOrders,
          processing: processingOrders,
          shipped: shippedOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
        },

        revenue: {
          totalRevenue: revenue.totalRevenue,
          totalItemsRevenue: revenue.totalItemsRevenue,
          totalShipping: revenue.totalShipping,
          totalDiscount: revenue.totalDiscount,
        },

        lowStockProducts,
        recentOrders,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};