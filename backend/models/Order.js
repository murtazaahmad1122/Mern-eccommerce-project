const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
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

const shippingAddressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "Order must have at least one item",
      },
    },

    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cash_on_delivery", "stripe", "paypal"],
      default: "cash_on_delivery",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentResult: {
      id: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
    },

    paidAt: {
      type: Date,
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    itemsTotal: {
      type: Number,
      required: true,
      default: 0,
    },

    shippingCharge: {
      type: Number,
      default: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    coupon: {
      code: {
        type: String,
        default: "",
        trim: true,
      },
      discountAmount: {
        type: Number,
        default: 0,
      },
    },

    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    note: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
