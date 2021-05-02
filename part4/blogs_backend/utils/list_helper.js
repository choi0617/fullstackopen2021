const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } 
  else if (blogs.length === 1) {
    return blogs[0].likes
  }
  else {
    const sum = blogs.reduce((prev, cur) => prev + cur.likes, 0);
    return sum;
  }
};

module.exports = { dummy, totalLikes };
