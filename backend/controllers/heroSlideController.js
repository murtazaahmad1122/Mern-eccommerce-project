const HeroSlide = require("../models/HeroSlide");

const getHeroSlides = async (req, res, next) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({
      sortOrder: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: slides.length,
      data: slides,
    });
  } catch (error) {
    next(error);
  }
};

const getHeroSlideById = async (req, res, next) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);

    if (!slide) {
      res.status(404);
      throw new Error("Hero slide not found");
    }

    res.status(200).json({
      success: true,
      data: slide,
    });
  } catch (error) {
    next(error);
  }
};

const createHeroSlide = async (req, res, next) => {
  try {
    const slide = await HeroSlide.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hero slide created successfully",
      data: slide,
    });
  } catch (error) {
    next(error);
  }
};

const updateHeroSlide = async (req, res, next) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!slide) {
      res.status(404);
      throw new Error("Hero slide not found");
    }

    res.status(200).json({
      success: true,
      message: "Hero slide updated successfully",
      data: slide,
    });
  } catch (error) {
    next(error);
  }
};

const deleteHeroSlide = async (req, res, next) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!slide) {
      res.status(404);
      throw new Error("Hero slide not found");
    }

    res.status(200).json({
      success: true,
      message: "Hero slide deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHeroSlides,
  getHeroSlideById,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
};