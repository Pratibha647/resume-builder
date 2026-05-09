const multer = require("multer");

// Use memoryStorage instead of diskStorage.
// Vercel serverless functions have a READ-ONLY filesystem,
// so saving files to disk is not possible in production.
// With memoryStorage, uploaded files are available as req.file.buffer
// and can be converted to base64 strings for storage in MongoDB.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png formats are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
});

module.exports = upload;