const config = require("./utils/config");
const http = require("http");
require('express-async-errors')
const express = require("express");
const app = express();
const logger = require("./utils/logger");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const blogRouter = require("./controllers/blog");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.once("on", () => {
  logger.info("DB connected");
});

db.on("error", (error) => {
  logger.error("connection error:", error);
});

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
