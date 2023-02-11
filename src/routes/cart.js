const express = require("express");
const { catchAsync, sendResponse, ExpressError } = require("../utils");
const {
  STATUS_CODES: { SUCCESS },
} = require("../constants");

const {
  cartServices: {
    getUserCart,
    deleteUserCart,
    addProductToCart,
    removeProductFromCart,
    deleteProductFromCart,
    addTable,
    removeTable,
    deleteTable,
  },
} = require("../services");
const { ObjectId } = require("mongodb");

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const { user = null } = req;
    const data = await getUserCart(user);
    sendResponse(res, SUCCESS, data);
  })
);

router.delete(
  "/",
  catchAsync(async (req, res) => {
    const { cid } = req.body;
    if (!ObjectId.isValid(cid)) {
      throw new ExpressError("Invalid cart id", 403);
    }
    const data = await deleteUserCart(cid, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/product/add",
  catchAsync(async (req, res) => {
    const { cid, pid } = req.body;

    if (!ObjectId.isValid(cid)) {
      throw new ExpressError("Invalid cart id", 402);
    } else if (!ObjectId.isValid(pid)) {
      throw new ExpressError("Invalid product id", 402);
    }
    const data = await addProductToCart(cid, pid, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/product/remove",
  catchAsync(async (req, res) => {
    const { cid, pid } = req.body;
    if (!ObjectId.isValid(cid)) {
      throw new ExpressError("Invalid cart id", 402);
    } else if (!ObjectId.isValid(pid)) {
      throw new ExpressError("Invalid product id", 402);
    }
    const data = await removeProductFromCart(cid, pid, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

router.delete(
  "/product/delete",
  catchAsync(async (req, res) => {
    const { cid, pid } = req.body;
    if (!ObjectId.isValid(cid)) {
      throw new ExpressError("Invalid cart id", 402);
    } else if (!ObjectId.isValid(pid)) {
      throw new ExpressError("Invalid product id", 402);
    }
    const data = await deleteProductFromCart(cid, pid, req.user);

    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/table/add",
  catchAsync(async (req, res) => {
    const { cid, tid } = req.body;
    if (!ObjectId.isValid(cid)) {
      throw new ExpressError("Invalid cart id", 402);
    } else if (!ObjectId.isValid(tid)) {
      throw new ExpressError("Invalid table id", 402);
    }
    const data = await addTable(cid, tid, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

router.put(
  "/table/remove",
  catchAsync(async (req, res) => {
    const { cid, tid } = req.body;
    if (!ObjectId.isValid(cid)) {
      throw new ExpressError("Invalid cart id", 402);
    } else if (!ObjectId.isValid(tid)) {
      throw new ExpressError("Invalid table id", 402);
    }
    const data = await removeTable(cid, tid, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

router.delete(
  "/table/delete",
  catchAsync(async (req, res) => {
    const { cid } = req.body;
    if (!ObjectId.isValid(cid)) {
      throw new ExpressError("Invalid cart id", 402);
    }
    const data = await deleteTable(cid, req.user);
    sendResponse(res, SUCCESS, data);
  })
);

module.exports = router;
