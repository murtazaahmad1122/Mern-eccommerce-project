const User = require("../models/User");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, role, avatar, isActive } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name = name ?? user.name;
    user.role = role ?? user.role;
    user.avatar = avatar ?? user.avatar;

    if (typeof isActive === "boolean") {
      user.isActive = isActive;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        isActive: updatedUser.isActive,
      },
    });
  } catch (error) {
    next(error);
  }
};

const disableUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error("You cannot disable your own account");
    }

    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User disabled successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  disableUser,
};