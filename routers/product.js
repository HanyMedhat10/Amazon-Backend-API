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
// Create rating for product
router.post("/rate-product", auth, async (req, res) => {
  try {
    const { productId, rating } = req.body;
    const userId = req.userId;
    console.log('userId', userId, 'productId', productId, 'rating', rating);
    const product = await Product.findById(productId);
    //??  if user rate the product only one time
    // let alreadyRated = product.ratings.find(
    //   (r) => { r.userId.toString() === userId.toString()}
    // );
    // if (alreadyRated) {
    //   return res.status(400).send({ message: "Already rated" });
    // }
    // ??> if user rate the product more than one time and delete the old one
   for (let index = 0; index < product.ratings.length; index++) {
     if (product.ratings[index].userId.toString() === userId.toString()) {
       product.ratings.splice(index, 1);
       break;
     }
   }
    const ratingSchema = {
      userId,
      rating, 
    };
    product.ratings.push(ratingSchema);
    product.rating =
      product.ratings.reduce((acc, val) => val.rating + acc, 0) /
      product.ratings.length; 
    product.numReviews = product.ratings.length;
    await product.save();
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
