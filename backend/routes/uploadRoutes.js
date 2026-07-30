const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadImage } = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: Image upload APIs
 */

/**
 * @swagger
 * /api/uploads:
 *   post:
 *     summary: Upload an image
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               folder:
 *                 type: string
 *                 enum: [users, products, categories, banners, hero]
 *                 example: users
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid upload
 *       401:
 *         description: Not authorized
 */
router.post("/", protect, upload.single("image"), uploadImage);

/**
 * @swagger
 * /api/uploads/admin:
 *   post:
 *     summary: Upload an admin-managed image
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               folder:
 *                 type: string
 *                 enum: [products, categories, banners, hero]
 *                 example: products
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       403:
 *         description: Admin access only
 */
router.post("/admin", protect, adminOnly, upload.single("image"), uploadImage);

module.exports = router;
