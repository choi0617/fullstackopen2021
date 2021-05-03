const _ = require("lodash");

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    const sum = blogs.reduce((prev, cur) => prev + cur.likes, 0);
    return sum;
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else if (blogs.length === 1) {
    return blogs[0];
  } else {
    const blogWithMostLikes = blogs.reduce((accumulator, current) => {
      if (current.likes > accumulator.likes) {
        return current;
      } else {
        return accumulator;
      }
    });
    return blogWithMostLikes;
  }
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else if (blogs.length === 1) {
    return blogs[0];
  } else {
    const blogsByAuthors = _.values(_.groupBy(blogs, "author")).map(blog => ({
        author: blog[0].author,
        blogs: blog.length
    }))
    const blogWithMostAuthors = blogsByAuthors[blogsByAuthors.length - 1]
    return blogWithMostAuthors
  }
};

module.exports = { totalLikes, favoriteBlog, mostBlogs };
