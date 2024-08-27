const mongoose = require("mongoose");
//-----------PRODUCT------------
// schema for all products
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  amount: Number,
  image: String,
  category: String,
  subCategory: String,
  added: [
    {
      user: String, // adder
      seriya: String,
      comment: String,
      date: Date,
    },
  ],
  sold: [
    {
      user: String, // seller
      seriya: String,
      comment: String,
      date: Date,
    },
  ],
});
// productSchema.index({ "added.seriya": 1 }, { unique: true });

// saying about saved product
productSchema.post("save", function (doc, next) {
  console.log("new product is saved", doc);
  next();
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
