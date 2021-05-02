const dummy = (blogs) => {
  return 1;
};

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
  // const arrayOfLikes = blogs.map(blog => blog.likes)

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

module.exports = { dummy, totalLikes, favoriteBlog };
