const express = require("express");
const router = express.Router();
const admin = require("../middlewares/admin");
const { Product } = require("../models/product");
const Order = require("../models/order");
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

// get all products
router.get("/get-products", admin, async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

// get products by ID
router.get("/get-product/:id", admin, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    return res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
router.get('/get-orders', admin, async (req, res) => {try {
  
  const orders = await Order.find();
  res.send(orders)
  
} catch (error) {
  console.error(error);
  res.status(500).send({ error: error.message });
}});

// update products by ID
router.patch('/update-order/:id', admin, async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    /* let order = await Order.findById(id);
    order.status = status;
    order = await order.save(); */
    return res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});


// delete products by ID
router.delete("/delete-product/:id", admin, async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete({ _id: id });
    return res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});


module.exports = router;
