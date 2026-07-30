const express = require("express");

const {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Banners
 *   description: Banner APIs
 */

/**
 * @swagger
 * /api/banners:
 *   get:
 *     summary: Get all active banners
 *     tags: [Banners]
 *     parameters:
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *           enum: [home-top, home-middle, home-bottom, shop, product-page]
 *         description: Filter banners by position
 *     responses:
 *       200:
 *         description: Banners fetched successfully
 */
router.get("/", getBanners);

/**
 * @swagger
 * /api/banners/{id}:
 *   get:
 *     summary: Get banner by ID
 *     tags: [Banners]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Banner fetched successfully
 */
router.get("/:id", getBannerById);

/**
 * @swagger
 * /api/banners:
 *   post:
 *     summary: Create banner
 *     tags: [Banners]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: WOMEN'S
 *               subtitle:
 *                 type: string
 *                 example: Fashion COLLECTION
 *               text:
 *                 type: string
 *                 example: New Stylish Shirts, Pants & Accessries.
 *               image:
 *                 type: string
 *                 example: /uploads/banners/banner-1.jpg
 *               buttonText:
 *                 type: string
 *                 example: Book Now
 *               buttonLink:
 *                 type: string
 *                 example: /shop
 *               position:
 *                 type: string
 *                 example: home-middle
 *               className:
 *                 type: string
 *                 example: img-1
 *               sortOrder:
 *                 type: number
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Banner created successfully
 */
router.post("/", protect, adminOnly, createBanner);

/**
 * @swagger
 * /api/banners/{id}:
 *   put:
 *     summary: Update banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", protect, adminOnly, updateBanner);

/**
 * @swagger
 * /api/banners/{id}:
 *   delete:
 *     summary: Soft delete banner
 *     tags: [Banners]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, adminOnly, deleteBanner);

module.exports = router;