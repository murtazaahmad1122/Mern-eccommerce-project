const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "items.product",
      "title price mainImg stock isActive"
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      count: wishlist.items.length,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const addItemToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      res.status(404);
      throw new Error("Product not found");
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        items: [],
      });
    }

    const alreadyExists = wishlist.items.find(
      (item) => item.product.toString() === productId
    );

    if (alreadyExists) {
      res.status(400);
      throw new Error("Product already exists in wishlist");
    }

    wishlist.items.push({
      product: product._id,
      title: product.title,
      image: product.mainImg,
      price: product.price,
      stock: product.stock,
    });

    await wishlist.save();

    res.status(201).json({
      success: true,
      message: "Item added to wishlist",
      count: wishlist.items.length,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const removeWishlistItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      res.status(404);
      throw new Error("Wishlist not found");
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Item removed from wishlist",
      count: wishlist.items.length,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

const clearWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      res.status(404);
      throw new Error("Wishlist not found");
    }

    wishlist.items = [];

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Wishlist cleared",
      count: 0,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  addItemToWishlist,
  removeWishlistItem,
  clearWishlist,
};