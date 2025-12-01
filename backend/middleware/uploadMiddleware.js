import multer from "multer";
import path from "path";
import fs from "fs";

// =============================
// Ensure Upload Folders Exist
// =============================
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir("uploads/tours");
ensureDir("uploads/receipts");

// =============================
// Tour Image Upload
// =============================
const tourStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/tours");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const uploadTourImages = multer({
  storage: tourStorage,
});

// =============================
// Booking Receipt Upload
// =============================
const receiptStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/receipts");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Allow PDF and Images Only
const receiptFileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|pdf/;
  const extValid = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeValid = allowed.test(file.mimetype);

  if (extValid && mimeValid) cb(null, true);
  else cb(new Error("Only images (jpg, png) or PDF files allowed"), false);
};

export const uploadBookingReceipt = multer({
  storage: receiptStorage,
  fileFilter: receiptFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
