const express = require("express");
const router = express.Router();

const { auth } = require("../Middlewares/auth.jsx");
const { imageUpload, getImages } = require("../controllers/imageUpload.jsx");
const { getProfile, getImagesById } = require("../controllers/getProfile.jsx");

const { signup, signin } = require("../controllers/signup_in.jsx");
const { logout } = require("../controllers/logout.jsx");

router.post("/imageUpload", auth, imageUpload);
router.get("/getProfile", auth, getProfile);
router.get("/getImages", auth, getImages);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", auth, logout);
router.get("/getprofileimg", auth, getImagesById);
module.exports = router;
