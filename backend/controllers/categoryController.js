const Category = require("../models/Category");
const Product = require("../models/Product");

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const normalizeCategoryName = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/s$/, "");

const getCategories = async (req, res, next) => {
  try {
    const [categories, products] = await Promise.all([
      Category.find({ isActive: true })
        .sort({
          section: 1,
          sortOrder: 1,
          createdAt: -1,
        })
        .lean(),
      Product.find({ isActive: true }).select("category mainImg").lean(),
    ]);

    const categoriesWithProducts = categories.map((category) => {
      const categoryNames = new Set(
        [category.name, ...category.subcategories].map(normalizeCategoryName)
      );
      const matchingProducts = products.filter((product) =>
        categoryNames.has(normalizeCategoryName(product.category))
      );

      return {
        ...category,
        productCount: matchingProducts.length,
        previewImages: matchingProducts
          .map((product) => product.mainImg)
          .filter(Boolean)
          .slice(0, 3),
      };
    });

    res.status(200).json({
      success: true,
      count: categoriesWithProducts.length,
      data: categoriesWithProducts,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getSidebarCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      section: 1,
      sortOrder: 1,
      createdAt: -1,
    });

    const groupedCategories = categories.reduce((groups, category) => {
      const section = category.section;

      if (!groups[section]) {
        groups[section] = [];
      }

      groups[section].push({
        _id: category._id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        subcategories: category.subcategories,
        sortOrder: category.sortOrder,
      });

      return groups;
    }, {});

    res.status(200).json({
      success: true,
      data: groupedCategories,
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, slug, section, image, subcategories, sortOrder, isActive } =
      req.body;

    const category = await Category.create({
      name,
      slug: slug || slugify(name),
      section,
      image,
      subcategories,
      sortOrder,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name, slug, section, image, subcategories, sortOrder, isActive } =
      req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slug || (name ? slugify(name) : undefined),
        section,
        image,
        subcategories,
        sortOrder,
        isActive,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getSidebarCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
