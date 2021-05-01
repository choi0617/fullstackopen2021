require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.listen(PORT, () => {
  console.log(`listening on: *${PORT}`);
});
