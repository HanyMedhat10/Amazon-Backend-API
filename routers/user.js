const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ ...user._doc, token: req.token });
});
router.post("/add-to-cart", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const { quantity } = req.body ?? 1;
    const product = await Product.findById(id);
    let user = await User.findById(req.userId);
    let check = false;
    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id == id) {
        user.cart[i].quantity += quantity;
        check = true;
        break;
      }
    }
    if (!check) {
      user.cart.push({ product, quantity: quantity });
    }
    user = await user.save();
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;
