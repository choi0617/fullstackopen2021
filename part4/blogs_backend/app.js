const config = require("./utils/config");
const http = require("http");
require("express-async-errors");
const express = require("express");
const app = express();
const logger = require("./utils/logger");
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const blogRouter = require("./controllers/blog");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const resetRouter = require("./controllers/resetRouter");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
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

app.use(middleware.getTokenFrom);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", resetRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
