const express = require("express");

const {
  getHeroSlides,
  getHeroSlideById,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} = require("../controllers/heroSlideController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hero Slides
 *   description: Hero slider APIs
 */

/**
 * @swagger
 * /api/hero-slides:
 *   get:
 *     summary: Get all active hero slides
 *     tags: [Hero Slides]
 *     responses:
 *       200:
 *         description: Hero slides fetched successfully
 */
router.get("/", getHeroSlides);

/**
 * @swagger
 * /api/hero-slides/{id}:
 *   get:
 *     summary: Get hero slide by ID
 *     tags: [Hero Slides]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hero slide MongoDB ID
 *     responses:
 *       200:
 *         description: Hero slide fetched successfully
 *       404:
 *         description: Hero slide not found
 */
router.get("/:id", getHeroSlideById);

/**
 * @swagger
 * /api/hero-slides:
 *   post:
 *     summary: Create hero slide
 *     tags: [Hero Slides]
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
 *                 example: Fashion sale
 *               subtitle:
 *                 type: string
 *                 example: for women's
 *               discount:
 *                 type: string
 *                 example: 50%
 *               text:
 *                 type: string
 *                 example: Elevate your every day. Style that speaks volumes.
 *               buttonText:
 *                 type: string
 *                 example: Shop Now
 *               buttonLink:
 *                 type: string
 *                 example: /shop
 *               image:
 *                 type: string
 *                 example: /uploads/hero/slide-1.jpg
 *               className:
 *                 type: string
 *                 example: slide-1
 *               sortOrder:
 *                 type: number
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Hero slide created successfully
 */
router.post("/", protect, adminOnly, createHeroSlide);

/**
 * @swagger
 * /api/hero-slides/{id}:
 *   put:
 *     summary: Update hero slide
 *     tags: [Hero Slides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hero slide MongoDB ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fashion sale updated
 *               subtitle:
 *                 type: string
 *                 example: for men's
 *               discount:
 *                 type: string
 *                 example: 35%
 *               text:
 *                 type: string
 *                 example: Wear the change. Fashion that feels good.
 *               buttonText:
 *                 type: string
 *                 example: Shop Now
 *               buttonLink:
 *                 type: string
 *                 example: /shop
 *               image:
 *                 type: string
 *                 example: /uploads/hero/slide-2.jpg
 *               className:
 *                 type: string
 *                 example: slide-2
 *               sortOrder:
 *                 type: number
 *                 example: 2
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Hero slide updated successfully
 */
router.put("/:id", protect, adminOnly, updateHeroSlide);

/**
 * @swagger
 * /api/hero-slides/{id}:
 *   delete:
 *     summary: Soft delete hero slide
 *     tags: [Hero Slides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hero slide MongoDB ID
 *     responses:
 *       200:
 *         description: Hero slide deleted successfully
 */
router.delete("/:id", protect, adminOnly, deleteHeroSlide);

module.exports = router;