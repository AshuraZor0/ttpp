const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  Images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      //required: true,
      ref: "Image",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
