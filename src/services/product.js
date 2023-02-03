const Product = require("../models/product");
const { ExpressError } = require("../utils");

module.exports = {
  updateProduct,
  deleteProduct,
  getAllProducts,
  createNewProduct,
};

async function getAllProducts() {
  const products = await Product.find();
  return { products };
}

async function createNewProduct(data, restaurant) {
  await Product.checkExistingProduct(restaurant, data);
  const product = new Product({
    ...data,
    restaurant: restaurant._id,
  });
  await product.save();
  return { product };
}

async function updateProduct(data, restaurant) {
  const { product_id, product_details } = data;
  const product = await Product.findOneAndUpdate(
    {
      _id: product_id,
      restaurant: restaurant._id,
    },
    { ...product_details },
    { runValidators: true, new: true }
  );
  if (product != null) {
    return { product };
  } else {
    throw new ExpressError("Product not found", 403);
  }
}

async function deleteProduct(data, restaurant) {
  const product = await Product.findOne({
    _id: data.product_id,
    restaurant: restaurant._id,
  });
  if (product != null) {
    await product.delete();
    return { product };
  } else {
    throw new ExpressError("Product not found", 403);
  }
}
