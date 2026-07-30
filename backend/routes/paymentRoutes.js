const express = require("express");
const {
  createStripePaymentIntent,
  confirmStripePayment,
  handleStripeWebhook,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Stripe payment APIs
 */

/**
 * @swagger
 * /api/payments/stripe/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags: [Payments]
 *     description: Called by Stripe. Do not call this manually from frontend.
 *     responses:
 *       200:
 *         description: Webhook received
 */
router.post("/stripe/webhook", handleStripeWebhook);

router.use(protect);

/**
 * @swagger
 * /api/payments/stripe/create-payment-intent:
 *   post:
 *     summary: Create Stripe payment intent
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 6866e22d2143af69c31a6c84
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 */
router.post("/stripe/create-payment-intent", createStripePaymentIntent);

/**
 * @swagger
 * /api/payments/stripe/confirm:
 *   post:
 *     summary: Confirm Stripe payment and mark order paid
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentIntentId
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 6866e22d2143af69c31a6c84
 *               paymentIntentId:
 *                 type: string
 *                 example: pi_123456789
 *               paymentMethodId:
 *                 type: string
 *                 description: Optional for Swagger/testing. Use pm_card_visa with Stripe test mode.
 *                 example: pm_card_visa
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 */
router.post("/stripe/confirm", confirmStripePayment);

module.exports = router;
