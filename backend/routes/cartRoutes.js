const express = require("express");

const {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Shopping cart management APIs
 */

router.use(protect);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get logged-in user's cart
 *     description: Returns the authenticated user's shopping cart with all items and subtotal.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 user: "6863a9bdf1c2b75d5c123456"
 *                 items:
 *                   - product:
 *                       _id: "6864a2f7d4b1ef3b67123456"
 *                       title: "Sport Shoes"
 *                       price: 120
 *                       mainImg: "/uploads/products/shoes.jpg"
 *                     quantity: 2
 *                     price: 120
 *                     title: "Sport Shoes"
 *                     image: "/uploads/products/shoes.jpg"
 *                 subTotal: 240
 *       401:
 *         description: Unauthorized
 */
router.get("/", getUserCart);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add a product to cart
 *     description: Adds a new product to the logged-in user's cart or increases quantity if already exists.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "6864a2f7d4b1ef3b67123456"
 *               quantity:
 *                 type: integer
 *                 default: 1
 *                 example: 2
 *               size:
 *                 type: string
 *                 example: xl
 *               color:
 *                 type: string
 *                 example: "#de8abc"
 *     responses:
 *       200:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Item added to cart
 *       400:
 *         description: Invalid request or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post("/items", addItemToCart);

/**
 * @swagger
 * /api/cart/items/{productId}:
 *   put:
 *     summary: Update cart item quantity
 *     description: Updates the quantity of a specific product in the user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: "6864a2f7d4b1ef3b67123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 */
router.put("/items/:productId", updateCartItem);

/**
 * @swagger
 * /api/cart/items/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     description: Removes a product from the authenticated user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: "6864a2f7d4b1ef3b67123456"
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 */
router.delete("/items/:productId", removeCartItem);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear user's cart
 *     description: Removes all products from the authenticated user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Cart cleared
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart not found
 */
router.delete("/clear", clearCart);

module.exports = router;
