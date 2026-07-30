const Review = require("../models/Review");
const Product = require("../models/Product");
const Order = require("../models/Order");

const updateProductRating = async (productId) => {
  const stats = await Review.aggregate([
    {
      $match: {
        product: productId,
        isActive: true,
      },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      rating: Number(stats[0].averageRating.toFixed(1)),
      numReviews: stats[0].numReviews,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      numReviews: 0,
    });
  }
};

const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isActive: true,
    })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      res.status(404);
      throw new Error("Product not found");
    }

    const deliveredOrder = await Order.findOne({
      user: req.user._id,
      orderStatus: "delivered",
      "items.product": productId,
    });

    if (!deliveredOrder) {
      res.status(403);
      throw new Error("You can review this product after it is delivered");
    }

    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      res.status(400);
      throw new Error("You already reviewed this product");
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      name: req.user.name,
      rating,
      comment,
    });

    await updateProductRating(product._id);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    const isOwner = review.user.toString() === req.user._id.toString();

    if (!isOwner) {
      res.status(403);
      throw new Error("You can update only your own review");
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    await updateProductRating(review.product);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error("Review not found");
    }

    const isOwner = review.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error("You are not allowed to delete this review");
    }

    review.isActive = false;
    await review.save();

    await updateProductRating(review.product);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("product", "title mainImg")
      .populate("user", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
};
