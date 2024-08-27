const Product = require("../models/Product.js");
const User = require("../models/User.js");
const add2_sold = require("./add2_sold.js");
// --------hmiController----------
const hmiController = {};

hmiController.hmi_get = hmiFunc;
async function hmiFunc(req, res) {
  res.render("hmi", { userId: req.userId || null });
}
hmiController.hmi7_get = hmi7Func;
async function hmi7Func(req, res) {
  const products = await Product.find({ category: "hmi", subCategory: "7dyum" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}
hmiController.hmi10_get = hmi10Func;
async function hmi10Func(req, res) {
  const products = await Product.find({ category: "hmi", subCategory: "10dyum" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}
hmiController.hmi15_get = hmi15Func;
async function hmi15Func(req, res) {
  const products = await Product.find({ category: "hmi", subCategory: "15dyum" }).lean();
  res.render("products", { products: products.reverse(), userId: req.userId || null });
}
// Add1 hmi
hmiController.hmiAdd_get = hmiAddFunc;
async function hmiAddFunc(req, res) {
  res.render("add1", { addError: req.flash("addError"), userId: req.userId || null });
}
hmiController.hmiAdd_post = hmiAddPost;
async function hmiAddPost(req, res) {
  const { title, price, description } = req.body;
  const image = req.file;
  if (!title || !price || !description) {
    req.flash("addError", "All fields are required");
    res.redirect("/hmi/add");
    return;
  }

  try {
    const product = await Product.create({
      title,
      price,
      description,
      category: "hmi",
      subCategory: "hmi" + whichHmi,
      amount: 0,
      image: image.path.split("\\")[1],
    });
    res.status(201).redirect("/hmi" + whichHmi);
  } catch (err) {
    req.flash("addError", err.message);
    res.redirect("/hmi/add");
  }
}

module.exports = hmiController;
