const fs = require("fs");
const path = require("path");
const multer = require("multer");

const allowedFolders = ["users", "products", "categories", "banners", "hero"];
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const requestedFolder = req.body.folder || "general";
    const folder = allowedFolders.includes(requestedFolder)
      ? requestedFolder
      : "general";
    const uploadPath = path.join(__dirname, "..", "uploads", folder);

    fs.mkdirSync(uploadPath, { recursive: true });
    req.uploadFolder = folder;

    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase();
    const baseName = path
      .basename(file.originalname, extension)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    cb(null, `${baseName}-${Date.now()}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only jpg, png, webp, and svg images are allowed"));
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = upload;
