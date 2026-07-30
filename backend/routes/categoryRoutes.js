const express = require("express");

const {
  getCategories,
  getSidebarCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category APIs
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all active categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 */
router.get("/", getCategories);

/**
 * @swagger
 * /api/categories/sidebar:
 *   get:
 *     summary: Get categories grouped for sidebar
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Sidebar categories fetched successfully
 */
router.get("/sidebar", getSidebarCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category MongoDB ID
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Clothes
 *               slug:
 *                 type: string
 *                 example: clothes
 *               section:
 *                 type: string
 *                 example: Fashion
 *               image:
 *                 type: string
 *                 example: clothes-2.svg
 *               subcategories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [T-shirts, Shirts, Gowns, Dresses, Sharees, Jeans]
 *               sortOrder:
 *                 type: number
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Category created successfully
 */
router.post("/", protect, adminOnly, createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Clothes Updated
 *               slug:
 *                 type: string
 *                 example: clothes-updated
 *               section:
 *                 type: string
 *                 example: Fashion
 *               image:
 *                 type: string
 *                 example: clothes-2.svg
 *               subcategories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [T-shirts, Shirts, Gowns]
 *               sortOrder:
 *                 type: number
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put("/:id", protect, adminOnly, updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Soft delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category MongoDB ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;
