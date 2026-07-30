const express = require("express");

const {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: User shipping address APIs
 */

router.use(protect);

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Get logged-in user's addresses
 *     description: Returns all saved shipping addresses for the authenticated user.
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses fetched successfully
 */
router.get("/", getMyAddresses);

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Create new shipping address
 *     description: Creates a new address for the authenticated user. If it is the user's first address, it becomes default automatically.
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - phone
 *               - addressLine1
 *               - city
 *               - country
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Murtaza Ahmad
 *               phone:
 *                 type: string
 *                 example: "03001234567"
 *               addressLine1:
 *                 type: string
 *                 example: House 12, Street 5
 *               addressLine2:
 *                 type: string
 *                 example: Near Main Market
 *               city:
 *                 type: string
 *                 example: Lahore
 *               state:
 *                 type: string
 *                 example: Punjab
 *               postalCode:
 *                 type: string
 *                 example: "54000"
 *               country:
 *                 type: string
 *                 example: Pakistan
 *               isDefault:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Address created successfully
 */
router.post("/", createAddress);

/**
 * @swagger
 * /api/addresses/{id}:
 *   put:
 *     summary: Update address
 *     description: Updates an existing address. User can only update their own address.
 *     tags: [Addresses]
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
 *               fullName:
 *                 type: string
 *                 example: Murtaza Ahmad
 *               phone:
 *                 type: string
 *                 example: "03001234567"
 *               addressLine1:
 *                 type: string
 *                 example: Updated House 50
 *               city:
 *                 type: string
 *                 example: Lahore
 *               country:
 *                 type: string
 *                 example: Pakistan
 *               isDefault:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Address updated successfully
 */
router.put("/:id", updateAddress);

/**
 * @swagger
 * /api/addresses/{id}:
 *   delete:
 *     summary: Delete address
 *     description: Deletes user's own saved address.
 *     tags: [Addresses]
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
 *         description: Address deleted successfully
 */
router.delete("/:id", deleteAddress);

/**
 * @swagger
 * /api/addresses/{id}/default:
 *   put:
 *     summary: Set default address
 *     description: Makes one address default and removes default status from all other addresses of the same user.
 *     tags: [Addresses]
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
 *         description: Default address updated successfully
 */
router.put("/:id/default", setDefaultAddress);

module.exports = router;