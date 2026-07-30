const express = require("express");

const {
  getWishlist,
  addItemToWishlist,
  removeWishlistItem,
  clearWishlist,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: User wishlist APIs
 */

router.use(protect);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get logged-in user's wishlist
 *     description: Returns wishlist items for the authenticated user.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist fetched successfully
 */
router.get("/", getWishlist);

/**
 * @swagger
 * /api/wishlist/items:
 *   post:
 *     summary: Add product to wishlist
 *     description: Adds a product to the authenticated user's wishlist.
 *     tags: [Wishlist]
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
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *       400:
 *         description: Product already exists in wishlist
 *       404:
 *         description: Product not found
 */
router.post("/items", addItemToWishlist);

/**
 * @swagger
 * /api/wishlist/items/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     description: Removes a product from the authenticated user's wishlist.
 *     tags: [Wishlist]
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
 *         description: Product removed from wishlist
 */
router.delete("/items/:productId", removeWishlistItem);

/**
 * @swagger
 * /api/wishlist/clear:
 *   delete:
 *     summary: Clear wishlist
 *     description: Removes all products from the authenticated user's wishlist.
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist cleared successfully
 */
router.delete("/clear", clearWishlist);

module.exports = router;