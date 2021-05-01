const config = require("./utils/config")
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const Blog = require("./models/blog")

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


app.get("/api/blogs", (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

app.post("/api/blogs", (req, res) => {
    const body = req.body

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    })

    newBlog.save().then(result => {
        res.status(201).json(result)
    })
})

app.listen(config.PORT, () => {
  console.log(`listening on: *${config.PORT}`);
});
