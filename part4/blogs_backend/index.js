const config = require("./utils/config")
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const blogRouter = require("./controllers/blog")

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.once("on", () => {
  console.log("DB connected");
});

db.on("error", (error) => {
  console.log("connection error:", error);
});

app.use(cors());
app.use(express.json());


app.use("/api/blogs", blogRouter);

app.listen(config.PORT, () => {
  console.log(`listening on: *${config.PORT}`);
});
