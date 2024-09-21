const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
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
    req.user = decoded.id;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
module.exports = auth;