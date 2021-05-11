const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ username: body.username });

  // if user === null is true, passwordCorrect will be false
  // OR if user === null is false, then await bycrypt.compare()
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(passwordCorrect && user)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  // this obj is returned when the token is decoded by jwt.verify()
  const userForToken = {
    username: user.username,
    name: user.name,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
