const multer = require("multer");
const express = require("express");
const { adminOnly } = require("../middleware");
const { catchAsync, sendResponse, ExpressError } = require("../utils");

const {
  cloudinary,
  storage,
} = require("../helper/cloudinary/cuisineImageStore");

const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const upload = multer({ storage });

const router = express.Router();

router.use(
  catchAsync(async (req, res, next) => {
    await adminOnly(req, res, next);
  })
);

// Upload Image
router.post(
  "/",
  upload.single("file"),
  catchAsync(async (req, res) => {
    let data = {
      url: req.file.path,
      fileName: req.file.filename,
    };
    sendResponse(res, SUCCESS, data);
  })
);
// Upload Image

// Delete Image
router.delete(
  "/",
  catchAsync(async (req, res) => {
    const response = await cloudinary.uploader.destroy(req.body.fileName);
    if (response.result != "ok")
      throw new ExpressError(`${response.result}`, 402);
    let data = { message: "Image deleted successfully" };
    sendResponse(res, SUCCESS, data);
  })
);
// Delete Image

module.exports = router;
