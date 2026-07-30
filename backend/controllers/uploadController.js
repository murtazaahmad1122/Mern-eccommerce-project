const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload an image file",
    });
  }

  const folder = req.uploadFolder || "general";
  const imageUrl = `/uploads/${folder}/${req.file.filename}`;

  return res.status(201).json({
    success: true,
    message: "Image uploaded successfully",
    data: {
      url: imageUrl,
      filename: req.file.filename,
      folder,
    },
  });
};

module.exports = {
  uploadImage,
};
