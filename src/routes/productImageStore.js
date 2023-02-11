const multer = require("multer");
const express = require("express");
const { catchAsync, sendResponse, ExpressError } = require("../utils");
const { vendorOnly } = require("../middleware");

const {
  cloudinary,
  storage,
} = require("../helper/cloudinary/productImageStore");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const upload = multer({ storage });

const router = express.Router();

router.use(
  catchAsync(async (req, res, next) => {
    await vendorOnly(req, res, next);
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
    const response = await cloudinary.uploader.destroy(req.body.url);
    if (response.result != "ok")
      throw new ExpressError(`${response.result}`, 402);
    let data = { message: "Image deleted successfully" };
    sendResponse(res, SUCCESS, data);
  })
);
// Delete Image

module.exports = router;
