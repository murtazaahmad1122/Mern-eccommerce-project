const express = require("express");

const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
} = require("../controllers/reviewController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Product reviews and ratings APIs
 */

/**
 * @swagger
 * /api/reviews/product/{productId}:
 *   get:
 *     summary: Get product reviews
 *     description: |
 *       Public API.
 *
 *       Returns all active reviews for one product.
 *       Used on the product detail page review section.
 *
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6864a2f7d4b1ef3b67123456
 *     responses:
 *       200:
 *         description: Product reviews fetched successfully
 */
router.get("/product/:productId", getProductReviews);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create product review
 *     description: |
 *       Logged-in user adds a review to a product.
 *
 *       Rules:
 *       - User must be logged in.
 *       - Product must exist.
 *       - One user can review one product only once.
 *       - Rating must be between 1 and 5.
 *       - After review is saved, product average rating is recalculated.
 *
 *     tags: [Reviews]
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
 *               - rating
 *               - comment
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 6864a2f7d4b1ef3b67123456
 *               rating:
 *                 type: number
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: Very good quality product.
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Already reviewed or validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.post("/", protect, createReview);

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     description: |
 *       Admin only.
 *
 *       Used in admin panel to moderate reviews.
 *
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
 *       403:
 *         description: Admin access only
 */
router.get("/", protect, adminOnly, getAllReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update own review
 *     description: |
 *       Logged-in user can update only their own review.
 *
 *       After update, product average rating is recalculated.
 *
 *     tags: [Reviews]
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
 *               rating:
 *                 type: number
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Updated review, excellent product.
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       403:
 *         description: Not allowed to update this review
 *       404:
 *         description: Review not found
 */
router.put("/:id", protect, updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review
 *     description: |
 *       Soft deletes a review by setting isActive to false.
 *
 *       Allowed:
 *       - Review owner
 *       - Admin
 *
 *       After delete, product average rating is recalculated.
 *
 *     tags: [Reviews]
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
 *         description: Review deleted successfully
 *       403:
 *         description: Not allowed to delete this review
 *       404:
 *         description: Review not found
 */
router.delete("/:id", protect, deleteReview);

module.exports = router;