const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nameProduct: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  prix: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  photoProduct: {
    type: String,
    default: "../uploads/products/product-01.jpg",
  }, // حقل الصورة الشخصية
  discountStatus: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
});

const products = mongoose.model("products", userSchema);

module.exports = products;
