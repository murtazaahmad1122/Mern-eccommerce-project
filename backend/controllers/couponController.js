const Coupon = require("../models/Coupon");

const getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    next(error);
  }
};

const getCouponById = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      res.status(404);
      throw new Error("Coupon not found");
    }

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

const createCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

const updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!coupon) {
      res.status(404);
      throw new Error("Coupon not found");
    }

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!coupon) {
      res.status(404);
      throw new Error("Coupon not found");
    }

    res.status(200).json({
      success: true,
      message: "Coupon disabled successfully",
    });
  } catch (error) {
    next(error);
  }
};

const validateCoupon = async (req, res, next) => {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

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

    if (cartTotal < coupon.minOrderAmount) {
      res.status(400);
      throw new Error(`Minimum order amount is ${coupon.minOrderAmount}`);
    }

    let discountAmount = 0;

    if (coupon.discountType === "percentage") {
      discountAmount = (cartTotal * coupon.discountValue) / 100;

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

    if (discountAmount > cartTotal) {
      discountAmount = cartTotal;
    }

    const payableAmount = cartTotal - discountAmount;

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: {
        couponId: coupon._id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        cartTotal,
        payableAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
};