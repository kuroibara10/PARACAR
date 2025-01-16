const mongoose = require("mongoose");

const adminsSchema = new mongoose.Schema({
  gmailA: { type: String, required: true },
  passwordA: { type: String, required: true, unique: true },
  photoA: { type: String, default: "../uploads/admins/default.png" },
});

const admins = mongoose.model("admins", adminsSchema);

module.exports = admins;
