const express = require("express");
const router = express.Router();


const { auth } = require("../Middlewares/auth.jsx");
const {like} = require("../controllers/like.jsx");

router.post("/likePost",auth,like);
module.exports = router;