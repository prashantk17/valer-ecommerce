import multer from "multer";

const storage = multer.memoryStorage(); // ✅ no filesystem

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files allowed"), false);
    } else {
      cb(null, true);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

export default upload;
