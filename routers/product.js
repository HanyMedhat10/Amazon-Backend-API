const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middlewares/auth");
router.get("/get-products", async (req, res) => {
  try {
    const category = req.query.category;
    console.log(category);
    const products = category
      ? await Product.find({ category })
      : await Product.find();
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.get("/get-products/search/:name", async (req, res) => {
  try {
    const name = req.params.name;
    console.log(name);
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
