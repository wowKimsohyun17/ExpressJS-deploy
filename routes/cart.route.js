const express = require("express");
const router = express.Router();

const controller = require("../controller/cart.controller.js");


router.get("/add/:bookId", controller.addToCart);

module.exports = router;
