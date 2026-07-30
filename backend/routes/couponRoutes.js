const express = require("express");

const {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
} = require("../controllers/couponController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Coupon discount APIs for cart and checkout
 */

/**
 * @swagger
 * /api/coupons/validate:
 *   post:
 *     summary: Validate coupon
 *     description: |
 *       Checks if a coupon is valid for the current cart total.
 *
 *       Used on:
 *       - Cart page
 *       - Checkout page
 *
 *       It checks:
 *       - Coupon exists
 *       - Coupon is active
 *       - Coupon is not expired
 *       - Usage limit is not reached
 *       - Cart total meets minimum order amount
 *       - Calculates discount amount
 *
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - cartTotal
 *             properties:
 *               code:
 *                 type: string
 *                 example: SAVE20
 *               cartTotal:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Coupon applied successfully
 *               data:
 *                 couponId: "6866e22d2143af69c31a6c84"
 *                 code: SAVE20
 *                 discountType: percentage
 *                 discountValue: 20
 *                 discountAmount: 100
 *                 cartTotal: 500
 *                 payableAmount: 400
 *       400:
 *         description: Coupon expired, usage limit reached, or minimum amount not met
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Invalid coupon code
 */
router.post("/validate", protect, validateCoupon);

router.use(protect, adminOnly);

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get all coupons
 *     description: |
 *       Admin only.
 *
 *       Returns all coupons, including active and inactive coupons.
 *       Used in admin panel coupon management table.
 *
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupons fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               count: 1
 *               data:
 *                 - _id: "6866e22d2143af69c31a6c84"
 *                   code: SAVE20
 *                   discountType: percentage
 *                   discountValue: 20
 *                   minOrderAmount: 100
 *                   maxDiscountAmount: 200
 *                   usageLimit: 100
 *                   usedCount: 0
 *                   expiresAt: "2026-12-31T23:59:59.000Z"
 *                   isActive: true
 *       403:
 *         description: Admin access only
 */
router.get("/", getCoupons);

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create coupon
 *     description: |
 *       Admin only.
 *
 *       Creates a new coupon for cart/checkout discounts.
 *
 *       Discount types:
 *       - percentage
 *       - fixed
 *
 *       Example:
 *       - percentage means 20% off
 *       - fixed means fixed amount discount
 *
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discountType
 *               - discountValue
 *               - expiresAt
 *             properties:
 *               code:
 *                 type: string
 *                 example: SAVE20
 *               discountType:
 *                 type: string
 *                 enum: [percentage, fixed]
 *                 example: percentage
 *               discountValue:
 *                 type: number
 *                 example: 20
 *               minOrderAmount:
 *                 type: number
 *                 example: 100
 *               maxDiscountAmount:
 *                 type: number
 *                 example: 200
 *               usageLimit:
 *                 type: number
 *                 example: 100
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-12-31T23:59:59.000Z"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *       400:
 *         description: Validation error or duplicate coupon code
 *       403:
 *         description: Admin access only
 */
router.post("/", createCoupon);

/**
 * @swagger
 * /api/coupons/{id}:
 *   get:
 *     summary: Get coupon by ID
 *     description: |
 *       Admin only.
 *
 *       Returns one coupon by MongoDB ID.
 *
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6866e22d2143af69c31a6c84
 *     responses:
 *       200:
 *         description: Coupon fetched successfully
 *       404:
 *         description: Coupon not found
 *       403:
 *         description: Admin access only
 */
router.get("/:id", getCouponById);

/**
 * @swagger
 * /api/coupons/{id}:
 *   put:
 *     summary: Update coupon
 *     description: |
 *       Admin only.
 *
 *       Updates coupon fields like discount value, expiry date, active status, usage limit, etc.
 *
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6866e22d2143af69c31a6c84
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: SAVE30
 *               discountType:
 *                 type: string
 *                 enum: [percentage, fixed]
 *                 example: percentage
 *               discountValue:
 *                 type: number
 *                 example: 30
 *               minOrderAmount:
 *                 type: number
 *                 example: 150
 *               maxDiscountAmount:
 *                 type: number
 *                 example: 300
 *               usageLimit:
 *                 type: number
 *                 example: 200
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2027-12-31T23:59:59.000Z"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       404:
 *         description: Coupon not found
 *       403:
 *         description: Admin access only
 */
router.put("/:id", updateCoupon);

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     summary: Disable coupon
 *     description: |
 *       Admin only.
 *
 *       This does not permanently remove the coupon.
 *       It performs soft delete by setting:
 *
 *       isActive: false
 *
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6866e22d2143af69c31a6c84
 *     responses:
 *       200:
 *         description: Coupon disabled successfully
 *       404:
 *         description: Coupon not found
 *       403:
 *         description: Admin access only
 */
router.delete("/:id", deleteCoupon);

module.exports = router;