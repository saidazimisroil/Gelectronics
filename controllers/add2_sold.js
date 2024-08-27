const Product = require("../models/Product.js");
const User = require("../models/User.js");
const fs = require("node:fs");

const add2_sold = {};
// Add2 hmi
add2_sold.hmiAdd2_get = hmiAdd2Func;
async function hmiAdd2Func(req, res) {
  res.render("add2", { addError: req.flash("addError"), userId: req.userId || null });
}

add2_sold.hmiAdd2_post = hmiAdd2Post;
function hmiAdd2Post(req, res) {
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    next(data, req, res); // Pass the 'res' object to the next function
  });
}
async function next(data, req, res) {
  const { seriya, comment } = req.body;

  if (!seriya || !comment) {
    req.flash("addError", "Barcha maydonlarni to'ldirish kerak!");
    res.redirect("/add2");
    return;
  }

  try {
    const currentDate = new Date();
    const productId = data;

    const product4check = await Product.findById(productId);
    const isSeriyaUnique = product4check.added.every((i) => i.seriya !== seriya);
    if (!isSeriyaUnique) {
      req.flash("addError", "Seriya takrorlanmasligi kerak!");
      res.redirect("/add2");
      return;
    }

    const myUser = await User.findById(req.userId);
    if (!myUser) {
      throw new Error("User not found");
    }

    const user = myUser.name;

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          added: {
            user,
            seriya,
            comment,
            date: currentDate,
          },
        },
        $inc: { amount: 1 }, // increment the amount field by 1
      },
      { new: true } // Return the modified document
    );

    res.status(201).redirect("/product");
  } catch (err) {
    req.flash("addError", err.message);
    res.redirect("/add2");
  }
}

// Sold hmi
add2_sold.hmiSold_get = hmiSoldFunc;
function hmiSoldFunc(req, res) {
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    nextSoldGet(data, req, res); // Pass the 'res' object to the next function
  });
}
async function nextSoldGet(data, req, res) {
  try {
    const product = await Product.findById(data);
    const added = product.added.slice(1);

    res.render("sold", {
      soldError: req.flash("soldError"),
      added,
      userId: req.userId || null,
    });
  } catch (err) {
    req.flash("soldError", err.message);
    res.redirect("/product");
  }
}

add2_sold.hmiSold_post = hmiSoldPost;
function hmiSoldPost(req, res) {
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    nextSold(data, req, res); // Pass the 'res' object to the next function
  });
}
async function nextSold(data, req, res) {
  const { seriya, comment } = req.body;

  if (!seriya || !comment) {
    req.flash("soldError", "Barcha maydonlarni to'ldirish kerak!");
    res.redirect("/sold");
    return;
  }

  try {
    const currentDate = new Date();
    const productId = data;

    const myUser = await User.findById(req.userId);
    if (!myUser) {
      throw new Error("User not found");
    }

    const user = myUser.name;

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $push: {
          sold: {
            user,
            seriya,
            comment,
            date: currentDate,
          },
        },
        $inc: { amount: -1 }, // Decrement the amount field by 1
        $pull: { added: { seriya } }, // Remove the selected object from the "added" array
      },
      { new: true } // Return the modified document
    );

    res.status(201).redirect("/product");
  } catch (err) {
    req.flash("soldError", err.message);
    res.redirect("/product");
  }
}

module.exports = add2_sold;
