const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ParaCar")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));
