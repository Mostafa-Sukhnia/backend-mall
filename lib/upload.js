import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, "uploads/images");
    } else if (file.mimetype.startsWith("video/")) {
      cb(null, "uploads/videos");
    } else {
      cb(new Error("File type not supported"), false);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // أقصى حجم لأي ملف: 100 ميغا
  },
  fileFilter: (req, file, cb) => {
    const maxSize = file.mimetype.startsWith("image/")
      ? 10 * 1024 * 1024
      : 100 * 1024 * 1024;
    if (
      !file.mimetype.startsWith("image/") &&
      !file.mimetype.startsWith("video/")
    ) {
      return cb(new Error("File type not supported"), false);
    }
    cb(null, true);
  },
});
