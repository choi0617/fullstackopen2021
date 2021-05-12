const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const unknownEndpoint = (req, res) => {
  res.status(400).send({ error: "Unknown endpoint " });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

const getTokenFrom = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({
      error: "token missing or invalid",
    });
  }
  req.user = await User.findById(decodedToken.id);
  next();
};

module.exports = { errorHandler, unknownEndpoint, getTokenFrom, userExtractor };
