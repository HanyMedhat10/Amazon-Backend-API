const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello Auth Model");
});
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    
})

router.post("/login", (req, res) => {
    const {email,password} = req.body;
    
})

module.exports = router;