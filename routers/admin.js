const express = require("express");
const router = express.Router();
const admin = require("../middlewares/admin");
const Product = require("../models/product");
router.post("/add-product", admin, async (req, res) => {
  try {
    const { name, description, price, quantity, category, images } = req.body;

    if (!name || !description || !price || !quantity || !category || !images) {
      return res.status(422).send({ error: "Please fill all the fields" });
    }

    let product = new Product({
      name,
      description,
      price,
      quantity,
      category,
      images,
    });
    product = await product.save();
    return res.json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
