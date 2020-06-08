const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const verify = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = verify;
    next();
  } catch (error) {
    res.status(400).send("Invalid token" + error);
  }
};
