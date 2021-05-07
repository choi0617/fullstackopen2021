const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs)
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  if (!newBlog.title || !newBlog.url) {
    return res.status(400).send({
      error: "title or url missing"
    })
  }

  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog)
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end();
});

module.exports = blogRouter;
