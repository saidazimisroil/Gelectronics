const Product = require("../models/Product.js");

// --------servoController----------
const servoController = {};

servoController.servo_get = servoFunc;
async function servoFunc(req, res) {
  res.render("servo", { userId: req.userId || null });
}

servoController.servo7_get = servo7Func;
async function servo7Func(req, res) {
  const products = await Product.find({ category: "servo", subCategory: "sv660n" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

servoController.servo10_get = servo10Func;
async function servo10Func(req, res) {
  const products = await Product.find({ category: "servo", subCategory: "sv660p" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

servoController.servo15_get = servo15Func;
async function servo15Func(req, res) {
  const products = await Product.find({ category: "servo", subCategory: "ms1h1" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

servoController.servo4_get = servo4;
async function servo4(req, res) {
  const products = await Product.find({ category: "servo", subCategory: "ms1h2" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

servoController.servo5_get = servo5;
async function servo5(req, res) {
  const products = await Product.find({ category: "servo", subCategory: "ms1h3" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}

module.exports = servoController;
