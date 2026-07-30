const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getUserCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
      "title price mainImg stock"
    );

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
        subTotal: 0,
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const addItemToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, size = "", color = "" } = req.body;
    const quantityNumber = Number(quantity);

    if (!Number.isInteger(quantityNumber) || quantityNumber < 1) {
      res.status(400);
      throw new Error("Quantity must be at least 1");
    }

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (product.stock < quantityNumber) {
      res.status(400);
      throw new Error("Not enough product stock");
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantityNumber;

      if (product.stock < newQuantity) {
        res.status(400);
        throw new Error("Not enough product stock");
      }

      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity: quantityNumber,
        price: product.price,
        title: product.title,
        image: product.mainImg,
        size,
        color,
      });
    }

    cart.calculateTotal();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    const quantityNumber = Number(quantity);

    if (!Number.isInteger(quantityNumber) || quantityNumber < 1) {
      res.status(400);
      throw new Error("Quantity must be at least 1");
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      res.status(404);
      throw new Error("Cart item not found");
    }

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (product.stock < quantityNumber) {
      res.status(400);
      throw new Error("Not enough product stock");
    }

    item.quantity = quantityNumber;

    cart.calculateTotal();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.calculateTotal();
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    cart.items = [];
    cart.subTotal = 0;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
