const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "client"], default: "client" },
  password: { type: String, required: true },
  photo: { type: String, default: "../uploads/users/default.png" },
  createdAt: { type: Date, default: Date.now },
  sumDemands: { type: Number, default: 0 },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
