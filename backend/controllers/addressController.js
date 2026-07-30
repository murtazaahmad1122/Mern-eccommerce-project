const Address = require("../models/Address");

const getMyAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: addresses.length,
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  try {
    const addressCount = await Address.countDocuments({ user: req.user._id });

    const address = await Address.create({
      ...req.body,
      user: req.user._id,
      isDefault: addressCount === 0 ? true : req.body.isDefault || false,
    });

    if (address.isDefault) {
      await Address.updateMany(
        { user: req.user._id, _id: { $ne: address._id } },
        { isDefault: false }
      );
    }

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!address) {
      res.status(404);
      throw new Error("Address not found");
    }

    if (address.isDefault) {
      await Address.updateMany(
        { user: req.user._id, _id: { $ne: address._id } },
        { isDefault: false }
      );
    }

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      res.status(404);
      throw new Error("Address not found");
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const setDefaultAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!address) {
      res.status(404);
      throw new Error("Address not found");
    }

    await Address.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );

    address.isDefault = true;
    await address.save();

    res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};