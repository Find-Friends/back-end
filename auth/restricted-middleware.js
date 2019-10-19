const jwt = require("jsonwebtoken");

const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      if (err) {
        res
          .status(401)
          .json({ message: "You are not authorized to see this content." });
      } else {
        req.user = {};
        next();
      }
    });
  } else {
    res
      .status(400)
      .json({ message: "Please provide a token to view this content." });
  }
};
