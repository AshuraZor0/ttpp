// Import the User model
const { compareSync } = require("bcrypt");
const User = require("../models/user.jsx");
const Images = require("../models/Images.jsx");

// Get all the images for a user
exports.getProfile = async (req, res) => {
  try {
    // Extract the user ID from the request
    const { userId } = req.User; // Assuming 'User' object is stored in 'req.user'
    // console.log(userId);
    // Find the user by ID
    const present_user = await User.findById(userId);

    // Check if the user is found
    if (!present_user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get the images associated with the user
    // console.log("present user is ", present_user);

    // Send the response
    res.status(200).json({
      success: true,
      user: present_user,
      images: present_user.Images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};

exports.getImagesById = async (req, res) => {
  try {
    const { userId } = req.User;

    const user_image = await Images.find({ user: userId }).select(
      " -user  -__v"
    );
    console.log(user_image);
    // Check if the user is found

    // Send the response
    return res.status(200).json({
      success: true,
      user_image: user_image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};
