const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Checkout and Order Management APIs
 */

router.use(protect);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: |
 *       Creates an order using the authenticated user's cart.
 *
 *       ### What happens internally?
 *
 *       - Gets the logged-in user's cart.
 *       - Checks that the cart is not empty.
 *       - Validates product stock.
 *       - Copies cart items into the Order.
 *       - Decreases product stock.
 *       - Calculates totals.
 *       - Saves the order.
 *       - Clears the user's cart.
 *
 *       Used when the customer clicks **Place Order** on the checkout page.
 *
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingAddress
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: Murtaza Ahmad
 *                   phone:
 *                     type: string
 *                     example: "03001234567"
 *                   address:
 *                     type: string
 *                     example: House 12 Street 5
 *                   city:
 *                     type: string
 *                     example: Lahore
 *                   postalCode:
 *                     type: string
 *                     example: "54000"
 *                   country:
 *                     type: string
 *                     example: Pakistan
 *
 *               paymentMethod:
 *                 type: string
 *                 enum:
 *                   - cash_on_delivery
 *                   - stripe
 *                   - paypal
 *                 example: cash_on_delivery
 *
 *               shippingCharge:
 *                 type: number
 *                 example: 80
 *
 *               taxAmount:
 *                 type: number
 *                 example: 15
 *
 *               couponCode:
 *                 type: string
 *                 example: SAVE20
 *
 *               note:
 *                 type: string
 *                 example: Please deliver after 6 PM.
 *
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order created successfully
 *
 *       400:
 *         description: Cart is empty or insufficient stock
 *
 *       401:
 *         description: Unauthorized
 */
router.post("/", createOrder);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get logged-in user's orders
 *
 *     description: |
 *       Returns every order created by the authenticated user.
 *
 *       Used for:
 *
 *       - My Orders page
 *       - Customer Dashboard
 *       - Order History
 *
 *     tags: [Orders]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/my-orders", getMyOrders);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin)
 *
 *     description: |
 *       Returns every order in the system.
 *
 *       Used inside Admin Panel.
 *
 *       Requires:
 *       - Admin Login
 *
 *     tags: [Orders]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       403:
 *         description: Admin access required
 */
router.get("/", adminOnly, getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get single order details
 *
 *     description: |
 *       Returns complete information about one order.
 *
 *       Customer can only view their own order.
 *
 *       Admin can view every order.
 *
 *     tags: [Orders]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6866e22d2143af69c31a6c84
 *
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin)
 *
 *     description: |
 *       Updates the current order status.
 *
 *       Available statuses:
 *
 *       - pending
 *       - processing
 *       - shipped
 *       - delivered
 *       - cancelled
 *
 *       Payment Status:
 *
 *       - pending
 *       - paid
 *       - failed
 *
 *       Used from the Admin Dashboard.
 *
 *     tags: [Orders]
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 6866e22d2143af69c31a6c84
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - processing
 *                   - shipped
 *                   - delivered
 *                   - cancelled
 *                 example: shipped
 *
 *               paymentStatus:
 *                 type: string
 *                 enum:
 *                   - pending
 *                   - paid
 *                   - failed
 *                 example: paid
 *
 *     responses:
 *       200:
 *         description: Order updated successfully
 *
 *       403:
 *         description: Admin access required
 *
 *       404:
 *         description: Order not found
 */
router.put("/:id/status", adminOnly, updateOrderStatus);

module.exports = router;
