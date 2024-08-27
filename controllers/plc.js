const Product = require("../models/Product.js");
const User = require("../models/User.js");
const add2_sold = require("./add2_sold.js");
// --------plcController----------
const plcController = {};

plcController.plc_get = plcFunc;
async function plcFunc(req, res) {
  res.render("plc", { userId: req.userId || null });
}
plcController.plc7_get = plc7Func;
async function plc7Func(req, res) {
  const products = await Product.find({ category: "plc", subCategory: "h1u" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}
plcController.plc10_get = plc10Func;
async function plc10Func(req, res) {
  const products = await Product.find({ category: "plc", subCategory: "h3u" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}
plcController.plc15_get = plc15Func;
async function plc15Func(req, res) {
  const products = await Product.find({ category: "plc", subCategory: "h5u" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}
module.exports = plcController;
