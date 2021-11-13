const userService = require("../services/user.service");

exports.addUser = (req, res) => {
  userService.addUser(req.body)
      .then(result => {
        res.send(result)
      })
      .catch(error => {
        res.send(error)
      })
};

exports.loginUser = (req, res) => {
  if (!(req.body.email && req.body.password)) {
    return res.status(400).send({
      status: "failed",
      message: "email or password not provided",
    });
  }
  userService.loginUser(req.body)
      .then(result => {
        res.send(result)
      })
      .catch((error) => {
        res.send(error)
      })
}

