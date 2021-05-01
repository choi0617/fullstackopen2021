const logger = require("../utils/logger");

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

module.exports = { errorHandler, unknownEndpoint };
