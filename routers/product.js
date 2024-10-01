const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middlewares/auth");
router.get("/get-products", async (req, res) => {
  try {
    const category = req.query.category;
    console.log(category);
    const products = await Product.find({ category });
    res.send(products);
} catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
