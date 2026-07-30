const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    addressLine1: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    addressLine2: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    state: {
      type: String,
      default: "",
      trim: true,
    },

    postalCode: {
      type: String,
      default: "",
      trim: true,
    },

    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressSchema);