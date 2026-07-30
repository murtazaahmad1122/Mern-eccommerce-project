const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    size: {
      type: String,
      default: "",
      trim: true,
    },

    color: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    subTotal: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.methods.calculateTotal = function () {
  this.subTotal = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

module.exports = mongoose.model("Cart", cartSchema);
