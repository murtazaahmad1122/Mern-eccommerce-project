const mongoose = require("mongoose");

const heroSlideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Slide title is required"],
      trim: true,
    },

    subtitle: {
      type: String,
      default: "",
      trim: true,
    },

    discount: {
      type: String,
      default: "",
      trim: true,
    },

    text: {
      type: String,
      default: "",
      trim: true,
    },

    buttonText: {
      type: String,
      default: "Shop Now",
      trim: true,
    },

    buttonLink: {
      type: String,
      default: "/shop",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    className: {
      type: String,
      default: "",
      trim: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HeroSlide", heroSlideSchema);