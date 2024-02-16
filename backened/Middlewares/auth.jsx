const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log(token);
    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECURITY);
      console.log("Console the payload:", payload);
      req.User = payload;

      console.log("user in req", req.User);
    } catch (er) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying the token",
    });
  }
};
