const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.get("/", (req, res) => {
    res.send("Hello Auth Model");
});
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser =await User.findOne({ email })
        if (existingUser) {
            return res.status(422).json({ error: "User already exists" });
        }
        if (password.length < 6) {
            return res
                .status(422)
                .json({ error: "Password should be at least or Bigger than 6 characters" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        let user = new User({
          name: name,
          email: email,
          password: hashedPassword,
        });
        user =  await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user =await User.findOne({email});
        if (!user) {
            return res
            .status(422)
            .json({ error: "Invalid Email or Password" });
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res
            .status(422)
            .json({ error: "Invalid Email or Password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ token, ...user._doc });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    
})

module.exports = router;