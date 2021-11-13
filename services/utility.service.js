const jwt = require("jsonwebtoken");

exports.decodeToken = (req) => {
  return jwt.decode(req.header("token"));
}
