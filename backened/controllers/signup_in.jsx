const User = require("../models/user.jsx");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email }); // Await the result here
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing Password",
      });
    }

    // Database entry
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Signup successful",
      user: newUser, // You may want to include the newly created user in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not registered",
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "User password does not match, please try again",
      });
    }

    // Define the payload for JWT token
    const payload = {
      userId: existingUser._id,
      email: existingUser.email,
      firstName: existingUser.firstName,
    };

    // Sign JWT token
    const token = jwt.sign(payload, process.env.JWT_SECURITY, {
      expiresIn: "2h",
    });

    let userObject = existingUser.toObject();
    userObject.token = token;
    existingUser.set(userObject);
    await existingUser.save();

    existingUser.password = undefined;
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: false,
    };

    res.cookie("token", token, options);

    res.status(200).json({
      success: true,
      message: "Signin successful",
      user_name: existingUser.name,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};
