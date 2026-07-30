const mongoose = require("mongoose");

const productColorSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    src: {
      type: String,
      trim: true,
    },
    hover: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [120, "Product title cannot be longer than 120 characters"],
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    info: {
      type: String,
      trim: true,
      maxlength: [1000, "Product info cannot be longer than 1000 characters"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    sizes: {
      type: [String],
      default: [],
    },
    mainImg: {
      type: String,
      required: [true, "Main product image is required"],
      trim: true,
    },
    hoverImg: {
      type: String,
      trim: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be negative"],
    },
    oldPrice: {
      type: Number,
      min: [0, "Old price cannot be negative"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Product stock cannot be negative"],
      default: 0,
    },
    colors: {
      type: [productColorSchema],
      default: [],
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
    labelClass: {
      type: String,
      trim: true,
      default: "",
    },
    rating: {
      type: Number,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be greater than 5"],
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    wishlistActive: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
    isDeal: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    discountPercent: {
      type: Number,
      min: [0, "Discount percent cannot be less than 0"],
      max: [100, "Discount percent cannot be greater than 100"],
      default: 0,
    },
    dealEndDate: {
      type: Date,
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

productSchema.pre("save", function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
});

module.exports = mongoose.model("Product", productSchema);
