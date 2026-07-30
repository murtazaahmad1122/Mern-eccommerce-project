const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Coupon = require("../models/Coupon");
const mongoose = require("mongoose");

const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    let order;

    await session.withTransaction(async () => {
      const {
        shippingAddress,
        paymentMethod = "cash_on_delivery",
        shippingCharge = 0,
        taxAmount = 0,
        couponCode = "",
        note = "",
      } = req.body;

      const cart = await Cart.findOne({ user: req.user._id }).session(session);

      if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error("Cart is empty");
      }

      if (!shippingAddress) {
        res.status(400);
        throw new Error("Shipping address is required");
      }

      const orderItems = [];

      for (const item of cart.items) {
        const product = await Product.findById(item.product).session(session);

        if (!product || !product.isActive) {
          res.status(404);
          throw new Error(`Product not found: ${item.title}`);
        }

        if (product.stock < item.quantity) {
          res.status(400);
          throw new Error(`Not enough stock for ${product.title}`);
        }

        orderItems.push({
          product: product._id,
          title: product.title,
          image: product.mainImg,
          price: product.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        });

        product.stock = product.stock - item.quantity;
        await product.save({ session });
      }

      const itemsTotal = orderItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      let coupon = null;
      let discountAmount = 0;

      if (couponCode) {
        coupon = await Coupon.findOne({
          code: couponCode.toUpperCase(),
          isActive: true,
        }).session(session);

        if (!coupon) {
          res.status(404);
          throw new Error("Invalid coupon code");
        }

        if (new Date(coupon.expiresAt) < new Date()) {
          res.status(400);
          throw new Error("Coupon has expired");
        }

        if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
          res.status(400);
          throw new Error("Coupon usage limit reached");
        }

        if (itemsTotal < coupon.minOrderAmount) {
          res.status(400);
          throw new Error(`Minimum order amount is ${coupon.minOrderAmount}`);
        }

        if (coupon.discountType === "percentage") {
          discountAmount = (itemsTotal * coupon.discountValue) / 100;

          if (
            coupon.maxDiscountAmount > 0 &&
            discountAmount > coupon.maxDiscountAmount
          ) {
            discountAmount = coupon.maxDiscountAmount;
          }
        }

        if (coupon.discountType === "fixed") {
          discountAmount = coupon.discountValue;
        }

        if (discountAmount > itemsTotal) {
          discountAmount = itemsTotal;
        }

        coupon.usedCount += 1;
        await coupon.save({ session });
      }

      const totalAmount =
        itemsTotal +
        Number(shippingCharge) +
        Number(taxAmount) -
        Number(discountAmount);

      [order] = await Order.create(
        [
          {
            user: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            paymentStatus: "pending",
            orderStatus: "pending",
            itemsTotal,
            shippingCharge,
            taxAmount,
            discountAmount,
            coupon: coupon
              ? {
                  code: coupon.code,
                  discountAmount,
                }
              : undefined,
            totalAmount,
            note,
          },
        ],
        { session }
      );

      cart.items = [];
      cart.subTotal = 0;
      await cart.save({ session });
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  } finally {
    session.endSession();
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error("Not allowed to view this order");
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
