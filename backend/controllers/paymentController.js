const Stripe = require("stripe");
const Order = require("../models/Order");

const getOrderAmountInSmallestUnit = (order) => Math.round(order.totalAmount * 100);

const getStripeClient = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not configured");
  }

  return Stripe(process.env.STRIPE_SECRET_KEY);
};

const createStripePaymentIntent = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const stripe = getStripeClient();

    const order = await Order.findById(orderId).populate("user", "email");

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error("Not allowed to pay for this order");
    }

    if (order.paymentStatus === "paid") {
      res.status(400);
      throw new Error("Order is already paid");
    }

    const amount = getOrderAmountInSmallestUnit(order);

    if (amount < 1) {
      res.status(400);
      throw new Error("Order total must be greater than 0");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: process.env.STRIPE_CURRENCY || "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
      },
      receipt_email: order.user.email,
    });

    order.paymentMethod = "stripe";
    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      email: order.user.email,
    };
    await order.save();

    res.status(200).json({
      success: true,
      message: "Stripe payment intent created successfully",
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: order.totalAmount,
        currency: paymentIntent.currency,
      },
    });
  } catch (error) {
    next(error);
  }
};

const confirmStripePayment = async (req, res, next) => {
  try {
    const { orderId, paymentIntentId, paymentMethodId } = req.body;
    const stripe = getStripeClient();

    const order = await Order.findById(orderId).populate("user", "email");

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      res.status(403);
      throw new Error("Not allowed to confirm this payment");
    }

    if (order.paymentStatus === "paid") {
      return res.status(200).json({
        success: true,
        message: "Order is already paid",
        data: order,
      });
    }

    let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.metadata.orderId !== order._id.toString()) {
      res.status(400);
      throw new Error("Payment intent does not belong to this order");
    }

    if (paymentIntent.status !== "succeeded" && paymentMethodId) {
      paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      });
    }

    if (paymentIntent.status !== "succeeded") {
      res.status(400);
      throw new Error(
        `Payment has not succeeded yet. Current status: ${paymentIntent.status}`
      );
    }

    const expectedAmount = getOrderAmountInSmallestUnit(order);
    const expectedCurrency = (process.env.STRIPE_CURRENCY || "usd").toLowerCase();

    if (
      paymentIntent.amount !== expectedAmount ||
      paymentIntent.currency !== expectedCurrency
    ) {
      res.status(400);
      throw new Error("Stripe payment amount or currency does not match this order");
    }

    order.paymentMethod = "stripe";
    order.paymentStatus = "paid";
    order.paymentResult = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      email: order.user.email,
    };
    order.paidAt = new Date();

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment confirmed successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const handleStripeWebhook = async (req, res) => {
  const stripe = getStripeClient();
  const signature = req.headers["stripe-signature"];

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).send("Webhook Error: Stripe webhook secret is not configured");
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;

    if (orderId) {
      const order = await Order.findById(orderId).populate("user", "email");

      if (order && order.paymentStatus !== "paid") {
        order.paymentMethod = "stripe";
        order.paymentStatus = "paid";
        order.paymentResult = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          email: order.user?.email || "",
        };
        order.paidAt = new Date();

        await order.save();
      }
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;

    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "failed",
        paymentResult: {
          id: paymentIntent.id,
          status: paymentIntent.status,
        },
      });
    }
  }

  return res.status(200).json({ received: true });
};

module.exports = {
  createStripePaymentIntent,
  confirmStripePayment,
  handleStripeWebhook,
};
