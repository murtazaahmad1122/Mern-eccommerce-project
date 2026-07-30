const Banner = require("../models/Banner");

const getBanners = async (req, res, next) => {
  try {
    const { position } = req.query;

    const query = { isActive: true };

    if (position) {
      query.position = position;
    }

    const banners = await Banner.find(query).sort({
      sortOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: banners.length,
      data: banners,
    });
  } catch (error) {
    next(error);
  }
};

const getBannerById = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      res.status(404);
      throw new Error("Banner not found");
    }

    res.status(200).json({
      success: true,
      data: banner,
    });
  } catch (error) {
    next(error);
  }
};

const createBanner = async (req, res, next) => {
  try {
    const banner = await Banner.create(req.body);

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    next(error);
  }
};

const updateBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      res.status(404);
      throw new Error("Banner not found");
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!banner) {
      res.status(404);
      throw new Error("Banner not found");
    }

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};