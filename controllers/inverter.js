const Product = require("../models/Product.js");

// --------inverterController----------
const inverterController = {};

inverterController.inverter_get = inverterFunc;
async function inverterFunc(req, res) {
  res.render("inverter", { userId: req.userId || null });
}

inverterController.inverter7_get = inverter7Func;
async function inverter7Func(req, res) {
  const products = await Product.find({ category: "inverter", subCategory: "md200" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

inverterController.inverter10_get = inverter10Func;
async function inverter10Func(req, res) {
  const products = await Product.find({ category: "inverter", subCategory: "md290" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

inverterController.inverter15_get = inverter15Func;
async function inverter15Func(req, res) {
  const products = await Product.find({ category: "inverter", subCategory: "md310" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

inverterController.inverter4_get = inverter4;
async function inverter4(req, res) {
  const products = await Product.find({ category: "inverter", subCategory: "md500" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

inverterController.inverter5_get = inverter5;
async function inverter5(req, res) {
  const products = await Product.find({ category: "inverter", subCategory: "cs710" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

module.exports = inverterController;
