const express = require("express");

const {
  getUsers,
  getUserById,
  updateUser,
  disableUser,
} = require("../controllers/adminUserController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Users
 *   description: Admin user management APIs
 */

router.use(protect, adminOnly);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     description: |
 *       Admin only.
 *
 *       Returns all customers and admins.
 *       Used in admin panel user management table.
 *
 *     tags: [Admin Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.get("/", getUsers);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Admin only. Returns one user without password.
 *     tags: [Admin Users]
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
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Update user
 *     description: |
 *       Admin only.
 *
 *       Admin can update:
 *       - name
 *       - role
 *       - avatar
 *       - isActive
 *
 *       This is used to promote user to admin, disable account, or update basic profile.
 *
 *     tags: [Admin Users]
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
 *               name:
 *                 type: string
 *                 example: Murtaza Ahmad
 *               role:
 *                 type: string
 *                 enum: [admin, customer]
 *                 example: customer
 *               avatar:
 *                 type: string
 *                 example: /uploads/users/avatar.jpg
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Disable user
 *     description: |
 *       Admin only.
 *
 *       This API does not permanently delete the user.
 *       It disables the user by setting:
 *
 *       isActive: false
 *
 *       Disabled users cannot login.
 *
 *     tags: [Admin Users]
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
 *         description: User disabled successfully
 *       400:
 *         description: Admin cannot disable own account
 *       404:
 *         description: User not found
 */
router.delete("/:id", disableUser);

module.exports = router;