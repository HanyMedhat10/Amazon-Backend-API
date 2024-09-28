const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = require("./auth");
/* const admin = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).send("No token,Access Denied");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .send("Token verification failed,authorization Denied");
      }
      const user = await User.findById(decoded.id);
    if (user.type !== "admin") {
        return res
          .status(401)
          .send("You are not authorized to access this resource");
    }
    req.user = decoded.id;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}; */

const admin = async (req, res, next) => {
    auth(req, res, async () => {
    const user = await User.findById(req.user);
    if (user.type !== "admin") {
      return res
        .status(401)
        .send("You are not authorized to access this resource");
      }
    req.user = user;
    req.token = user.token;
    next();
  });
};

module.exports = admin;
