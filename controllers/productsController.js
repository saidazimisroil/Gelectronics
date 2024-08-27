const Product = require("../models/Product.js");
const fs = require("node:fs");
const edit = require("./edit.js");

// --------productsController----------
const productsController = {};

productsController.main_get = mainFunc;
async function mainFunc(req, res) {
  const products = await Product.find().lean();
  res.render("index", { products: products.reverse(), userId: req.userId || null });
}

productsController.add_get = addGetFunc;
function addGetFunc(req, res) {
  res.render("add1", {
    addError: req.flash("addError"),
    userId: req.userId || null,
  });
}

productsController.add_post = addPostFunc;
async function addPostFunc(req, res) {
  const { title, price, description, category, subCategory } = req.body;
  const amount = 0;
  const image = req.file;
  console.log(req.file);
  if (!title || !price || !description || !category || !subCategory || !image) {
    req.flash("addError", "Barcha maydonlarni t'ldiring!");
    res.redirect("/add");
    return;
  }

  try {
    const product = await Product.create({
      title,
      price,
      description,
      category,
      subCategory,
      amount,
      added: [
        {
          user: req.userId, // adder
          seriya: new Date().toString(),
          comment: "String",
          date: new Date(),
        },
      ],
      image: image.path.split("\\")[1],
    });
    console.log(product);
    res.status(201).redirect("/");
  } catch (err) {
    req.flash("addError", err.message);
    res.redirect("/add");
    return;
  }
}

function writeFile(content) {
  fs.writeFile("test.txt", content, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}

productsController.about_get = aboutFunc;
function aboutFunc(req, res) {
  const id = req.params.id;
  const content = id;
  writeFile(content);
  res.redirect("/product");
}

productsController.product_get = prodFunc;
function prodFunc(req, res) {
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    next(data, req, res); // Pass the 'res' object to the next function
  });
}
async function next(data, req, res) {
  try {
    let product = await Product.findById(data);
    product.added = product.added.slice(1);
    res.render("about", { product, userId: req.userId || null });
  } catch (err) {
    res.json(err.message);
  }
}
// EDIT PRODUCT
productsController.editId_get = edit.editIdFunc;
productsController.edit_get = edit.editFunc;
productsController.edit_post = edit.editPostFunc;

module.exports = productsController;
