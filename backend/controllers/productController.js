const Product = require("../models/Product");
const Category = require("../models/Category");

const allowedProductFields = [
  "title",
  "slug",
  "info",
  "category",
  "sizes",
  "mainImg",
  "hoverImg",
  "gallery",
  "price",
  "oldPrice",
  "stock",
  "colors",
  "label",
  "labelClass",
  "rating",
  "wishlistActive",
  "isNewArrival",
  "isDeal",
  "isFeatured",
  "isTrending",
  "discountPercent",
  "dealEndDate",
  "isActive",
];

const pickProductFields = (body) => {
  const productData = {};

  allowedProductFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      productData[field] = body[field];
    }
  });

  if (Array.isArray(productData.colors)) {
    productData.colors = productData.colors.map((color) => {
      if (typeof color === "string") {
        return { color };
      }

      if (color && typeof color === "object" && color.type && color.value) {
        return {
          color: color.type === "color" ? color.value : undefined,
          image: color.type === "image" ? color.value : color.image,
          src: color.src,
          hover: color.hover,
          active: color.active,
        };
      }

      return color;
    });
  }

  return productData;
};

const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      section,
      isNewArrival,
      isDeal,
      isFeatured,
      isTrending,
      activeDeal,
      page = 1,
      limit = 12,
      sort = "latest",
    } = req.query;

    // ==========================
    // Build Query
    // ==========================
    const query = {
      isActive: true,
    };

    // Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { info: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Category Filter
    if (category) {
      const escapedCategory = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const categoryDocument = await Category.findOne({
        isActive: true,
        $or: [
          { name: { $regex: `^${escapedCategory}$`, $options: "i" } },
          { slug: category.toLowerCase() },
        ],
      }).lean();
      const categoryNames = categoryDocument
        ? [categoryDocument.name, ...categoryDocument.subcategories]
        : [category];

      query.category = {
        $in: categoryNames.map((name) => {
          const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          const singularName = escapedName.endsWith("s")
            ? escapedName.slice(0, -1)
            : escapedName;

          return new RegExp(`^${singularName}s?$`, "i");
        }),
      };
    }

    // Price Filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    const booleanFilters = {
      isNewArrival,
      isDeal,
      isFeatured,
      isTrending,
    };

    Object.entries(booleanFilters).forEach(([field, value]) => {
      if (value === "true") {
        query[field] = true;
      }

      if (value === "false") {
        query[field] = false;
      }
    });

    if (section) {
      const sectionFilters = {
        "new-arrivals": { isNewArrival: true },
        deals: { isDeal: true },
        featured: { isFeatured: true },
        trending: { isTrending: true },
      };

      Object.assign(query, sectionFilters[section] || {});
    }

    if (activeDeal === "true") {
      query.isDeal = true;
      query.dealEndDate = { $gte: new Date() };
    }

    // ==========================
    // Sorting
    // ==========================
    const sortOptions = {
      latest: "-createdAt",
      oldest: "createdAt",
      "price-low": "price",
      "price-high": "-price",
      "name-asc": "title",
      "name-desc": "-title",
      rating: "-rating",
    };

    const sortOption = sortOptions[sort] || "-createdAt";

    // ==========================
    // Pagination
    // ==========================
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // ==========================
    // Database Query
    // ==========================
    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber);

    // ==========================
    // Response
    // ==========================
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",

      filters: {
        search: search || "",
        category: category || "",
        minPrice: minPrice || "",
        maxPrice: maxPrice || "",
        section: section || "",
        isNewArrival: isNewArrival || "",
        isDeal: isDeal || "",
        isFeatured: isFeatured || "",
        isTrending: isTrending || "",
        activeDeal: activeDeal || "",
        sort,
      },

      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
        totalProducts,
        totalShowing: products.length,
        limit: limitNumber,
      },

      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid product id",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = pickProductFields(req.body);
    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map((item) => item.message),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Product slug already exists",
      });
    }

    console.error("Create product error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productData = pickProductFields(req.body);

    if (Object.keys(productData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one product field to update",
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, productData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map((item) => item.message),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Product slug already exists",
      });
    }

    console.error("Update product error:", error.message);

    return res.status(400).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
