const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: String,
    default: new Date().toLocaleString("en-US", {
      month: "numeric",
      day: "2-digit",
      year: "2-digit",
      weekday: "long",
    }),
  },
});

module.exports = mongoose.model("Image", imageSchema);
