require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Category = require("../models/Category");
const sidebarCategories = require("../data/sidebarCategories");

const seedCategories = async () => {
  try {
    await connectDB();

    await Category.deleteMany({});
    await Category.insertMany(sidebarCategories);

    console.log(`${sidebarCategories.length} categories seeded successfully`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Category seed failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedCategories();
