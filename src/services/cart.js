const Cart = require("../models/cart");
const Table = require("../models/table");
const Product = require("../models/product");
const { ExpressError } = require("../utils");

module.exports = {
  addTable,
  deleteTable,
  removeTable,
  getUserCart,
  deleteUserCart,
  addProductToCart,
  removeProductFromCart,
  deleteProductFromCart,
};

async function getUserCart(user = null) {
  let cart = await Cart.findOne({ user: user?._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  if (cart === null) cart = new Cart({ user: user._id });
  await cart.save();
  return { cart };
}

async function deleteUserCart(cid = null, user = null) {
  let cart = await Cart.findOne({ _id: cid, user: user?._id });
  if (cart === null) throw new ExpressError("Cart not found", 402);
  else await cart.delete();
  let newCart = new Cart({ user: user._id });
  await newCart.save();
  return { cart: newCart };
}

async function addProductToCart(cid = null, pid = null, user = null) {
  const cart = await Cart.findOne({ _id: cid, user: user?._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  const product = await Product.findById(pid).populate([
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  if (cart === null) {
    throw new ExpressError("Cart not found", 402);
  } else if (product === null) {
    throw new ExpressError("Product not found", 402);
  } else if (
    cart?.restaurant &&
    !cart?.restaurant.equals(product?.restaurant)
  ) {
    throw new ExpressError(
      "You cannot add items from multiple restaurants, empty your cart to continue",
      400
    );
  } else {
    const { products } = cart;
    let existingProduct = products.filter((item) =>
      item.product._id.equals(product._id)
    )[0];
    let indexOfExistingProduct = products.indexOf(existingProduct);

    if (products.length === 0 || indexOfExistingProduct === -1) {
      products.push({
        product: { ...product },
        quantity: 1,
      });
    } else {
      products[indexOfExistingProduct] = {
        product: { ...product },
        quantity: products[indexOfExistingProduct].quantity + 1,
      };
    }
    cart.products = products;
    cart.restaurant = product.restaurant;
    cart.totalAmount = cart.totalAmount + product.price;
    await cart.save();
  }
  return { cart };
}

async function removeProductFromCart(cid = null, pid = null, user = null) {
  const cart = await Cart.findOne({ _id: cid, user: user?._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  const product = await Product.findById(pid);
  if (cart === null) {
    throw new ExpressError("Cart not found", 402);
  } else if (product === null) {
    throw new ExpressError("Product not found", 402);
  } else {
    const { products } = cart;
    let existingProduct = products.filter((item) =>
      item.product._id.equals(product._id)
    )[0];
    let indexOfExistingProduct = products.indexOf(existingProduct);

    if (products.length === 0 || indexOfExistingProduct === -1) {
      throw new ExpressError("Cart is already empty", 403);
    } else {
      if (existingProduct.quantity === 1) {
        cart.products.splice(indexOfExistingProduct, 1);
        if (cart.products.length === 0 && cart.tables.length === 0)
          cart.restaurant = null;
      } else {
        cart.products[indexOfExistingProduct].quantity =
          cart.products[indexOfExistingProduct].quantity - 1;
      }
      cart.totalAmount = cart.totalAmount - product.price;
      await cart.save();
    }
  }
  return { cart };
}

async function deleteProductFromCart(cid = null, pid = null, user = null) {
  const cart = await Cart.findOne({ _id: cid, user: user?._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  const product = await Product.findById(pid);
  if (cart === null) {
    throw new ExpressError("Cart not found", 402);
  } else if (product === null) {
    throw new ExpressError("Product not found", 402);
  } else {
    const { products } = cart;
    let existingProduct = products.filter((item) =>
      item.product._id.equals(product._id)
    )[0];
    let indexOfExistingProduct = products.indexOf(existingProduct);
    if (indexOfExistingProduct === -1) {
      throw new ExpressError("Product not found in cart", 402);
    } else {
      cart.products.splice(indexOfExistingProduct, 1);
      cart.totalAmount =
        cart.totalAmount - existingProduct.quantity * product.price;
      if (cart.products.length === 0 && cart.tables.length === 0)
        cart.restaurant = null;
      await cart.save();
    }
  }
  return { cart };
}

async function addTable(cid = null, tid = null, user = null) {
  const cart = await Cart.findOne({ _id: cid, user: user?._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  const table = await Table.findById(tid);
  if (cart === null) {
    throw new ExpressError("Cart not found", 402);
  } else if (table === null) {
    throw new ExpressError("Table not found", 402);
  } else if (cart?.restaurant && !cart?.restaurant.equals(table?.restaurant)) {
    throw new ExpressError(
      "You cannot add items from multiple restaurants, empty your cart to continue",
      400
    );
  } else {
    const { tables } = cart;
    const existingTable = tables.filter((item) =>
      item._id.equals(table._id)
    )[0];
    const indexOfExistingTable = tables.indexOf(existingTable);
    if (indexOfExistingTable > -1) {
      throw new ExpressError("Table already added", 402);
    } else if (table.status != "free") {
      throw new ExpressError("Table is currently occupied", 403);
    } else {
      cart.tables.push(table);
      cart.totalAmount = cart.totalAmount + table.price;
      cart.restaurant = table.restaurant;
      await cart.save();
    }
  }
  return { cart };
}

async function removeTable(cid = null, tid = null, user = null) {
  const cart = await Cart.findOne({ _id: cid, user: user?._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  const table = await Table.findById(tid);
  if (cart === null) {
    throw new ExpressError("Cart not found", 402);
  } else if (table === null) {
    throw new ExpressError("Table not found", 402);
  } else {
    const { tables } = cart;
    const existingTable = tables.filter((item) =>
      item._id.equals(table._id)
    )[0];
    const indexOfExistingTable = tables.indexOf(existingTable);
    if (indexOfExistingTable === -1) {
      throw new ExpressError("Table not found in cart", 402);
    } else {
      cart.tables.splice(indexOfExistingTable, 1);
      cart.totalAmount = cart.totalAmount - table.price;
      if (cart.products.length === 0 && cart.tables.length === 0)
        cart.restaurant = null;
      await cart.save();
    }
  }
  return { cart };
}

async function deleteTable(cid = null, user = null) {
  const cart = await Cart.findOne({ _id: cid, user: user?._id }).populate([
    {
      path: "products.product",
      model: "Product",
    },
    {
      path: "tables",
      model: "Table",
    },
    {
      path: "restaurant",
      model: "Restaurant",
    },
  ]);
  if (cart === null) {
    throw new ExpressError("Cart not found", 402);
  } else {
    cart.tables = [];
    if (cart.products.length === 0) cart.restaurant = null;
    await cart.save();
  }

  return { cart };
}
