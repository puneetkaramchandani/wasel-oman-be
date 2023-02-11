const express = require("express");
const {
  catchAsync,
  sendResponse,
  validateSchema,
  createNewProductSchema,
  ExpressError,
  updateProductDetailsSchema,
} = require("../utils");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const {
  productServices: {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
  },
} = require("../services");
const { vendorOnly, restaurantOnly } = require("../middleware");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const data = await getAllProducts();
    sendResponse(res, SUCCESS, data);
  })
);

//

router.use(
  catchAsync(async (req, res, next) => {
    await vendorOnly(req, res, next);
  })
);

router.use(
  catchAsync(async (req, res, next) => {
    await restaurantOnly(req, res, next);
  })
);

router.post(
  "/new",
  catchAsync(async (req, res) => {
    await validateSchema(createNewProductSchema, req.body);
    const data = await createNewProduct(req.body, req.restaurant);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/edit",
  catchAsync(async (req, res) => {
    await validateSchema(updateProductDetailsSchema, req.body);
    const { product_id } = req.body;
    if (!ObjectId.isValid(product_id)) {
      throw new ExpressError("Invalid product id", 403);
    }
    const data = await updateProduct(req.body, req.restaurant);
    sendResponse(res, SUCCESS, data);
  })
);

router.delete(
  "/delete",
  catchAsync(async (req, res) => {
    const { product_id } = req.body;
    if (!product_id || !ObjectId.isValid(product_id)) {
      throw new ExpressError("Please provide a valid product id", 403);
    }
    const data = await deleteProduct(req.body, req.restaurant);
    sendResponse(res, SUCCESS, data);
  })
);
//  Vendor Only Routes

module.exports = router;
