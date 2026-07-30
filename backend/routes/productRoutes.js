const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all active products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get one product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - mainImg
 *               - price
 *               - stock
 *             properties:
 *               title:
 *                 type: string
 *                 example: Cotton fabric T-shirt
 *               info:
 *                 type: string
 *                 example: Soft cotton t-shirt for daily wear.
 *               category:
 *                 type: string
 *                 example: T-shirt
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [s, m, xl]
 *               mainImg:
 *                 type: string
 *                 example: 17.jpg
 *               hoverImg:
 *                 type: string
 *                 example: 18.jpg
 *               price:
 *                 type: number
 *                 example: 120
 *               oldPrice:
 *                 type: number
 *                 example: 130
 *               stock:
 *                 type: number
 *                 example: 25
 *               isNewArrival:
 *                 type: boolean
 *                 example: true
 *               isDeal:
 *                 type: boolean
 *                 example: false
 *               isFeatured:
 *                 type: boolean
 *                 example: true
 *               isTrending:
 *                 type: boolean
 *                 example: false
 *               discountPercent:
 *                 type: number
 *                 example: 20
 *               dealEndDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-07-31T23:59:59.000Z
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", protect, adminOnly, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               title: Updated Cotton T-shirt
 *               price: 125
 *               stock: 30
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/:id", protect, adminOnly, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
