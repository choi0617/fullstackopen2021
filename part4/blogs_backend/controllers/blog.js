const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

// const getTokenFrom = (req) => {
//   const authorization = req.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer")) {
//     return authorization.substring(7);
//   }
//   return null;
// };

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.post("/", userExtractor, async (req, res) => {
  const body = req.body;
  // const token = req.token;

  // const decodedToken = jwt.verify(token, process.env.SECRET);
  // if (!token || !decodedToken) {
  //   return res.status(401).json({
  //     error: "token missing or invalid",
  //   });
  // }

  // decodedToken {
  //   username: 'username2',
  //   name: 'Jane Doe',
  //   id: '6099e3779103f42c9c0f0046',
  //   iat: 1620700193
  // }

  // const user = await User.findById(decodedToken.id);
  const user = req.user;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (!newBlog.title || !newBlog.url) {
    return res.status(400).send({
      error: "title or url missing",
    });
  }

  if (!newBlog.likes) {
    newBlog.likes = 0;
  }

  const savedBlog = await newBlog.save();
  console.log("user", user);
  // user.blogs = user.blogs.concat(savedBlog._id);
  // await user.save();

  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", userExtractor, async (req, res) => {
  /* 
    get token from request middleware
    decode the token and get the userToken obj
    check to see if token or if the decoded userToken id is valid
    find user by id
    find blog by req.params.id
    the returned user and blog obj needs to be converted toString so we can compare
    remove the blog
    update the user.blogs property as well
  */
  // const token = req.token;

  // const decodedToken = jwt.verify(token, process.env.SECRET);

  // if (!token || !decodedToken.id) {
  //   return res.status(401).json({
  //     error: "token missing or invalid",
  //   });
  // }

  // const user = await User.findById(decodedToken.id);
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: "only the creator can delete blogs" });
  }

  await blog.remove();
  user.blogs = user.blogs.filter(
    (b) => b.id.toString() !== req.params.id.toString()
  );
  await user.save();
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

module.exports = blogRouter;
