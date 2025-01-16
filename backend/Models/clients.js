const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nameClient: { type: String, required: true },
  gmailC: { type: String, required: true, unique: true },
  passwordC: { type: String, required: true },
  sumDemands: { type: Number, default: 0 },
  photoClient: { type: String, default: "../uploads/clients/default.png" }, // حقل الصورة الشخصية
});

const clients = mongoose.model("clients", userSchema);

module.exports = clients;
