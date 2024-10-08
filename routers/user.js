const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");
const Order = require("../models/order");
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ ...user._doc, token: req.token });
});
/* It checks if the product is already in the user's cart.
If it is, it increments the quantity.
If not, it adds the product to the cart. */
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

/* remove from cart  quantity = 1 If not, it decrements the cart quantity by 1 */
router.delete("/remove-from-cart/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    let user = await User.findById(req.userId);
    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id == id) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
          break;
        } else {
          user.cart[i].quantity -= 1;
          break;
        }
      }
    }
    user = await user.save();
    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// save user address
router.post("/save-user-address", auth, async (req, res) => {
  try {
    const { address } = req.body;
    let user = await User.findById(req.userId);
    user.address = address;
    user = await user.save();
    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// order product
router.post("/order", auth, async (req, res) => {
  try {
    const { cart, totalPrice, address } = req.body;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product.quantity >= cart[i].quantity) {
        product.quantity -= cart[i].quantity;
        product = await product.save();
        products.push({ product, quantity: cart[i].quantity });
      } else {
        return res
          .status(400)
          .json({ error: `${product.name} quantity not available` });
      }
    }
    let user = await User.findById(req.userId);
    user.cart = [];
    user = await user.save();
    let order = new Order({
      products,
      totalPrice,
      address,
      userId: req.userId,
    });
    order = await order.save();
    res.json(order);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/me-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId });
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
