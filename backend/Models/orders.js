const mongoose = require("mongoose");

// تعريف مخطط الطلب
const orderSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true },
  products: [
    {
      // nameProduct: { type: String, required: true },
      nameProduct: { type: String },
      prix: { type: Number, required: true },
    },
  ],
  totalPrix: { type: Number, required: true },
  localisation: { type: String, required: true },
});

// إنشاء النموذج
const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
