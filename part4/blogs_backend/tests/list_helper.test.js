const { dummy, totalLikes, favoriteBlog } = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const listWithZeroBlog = [];

test("dummy function", () => {
  const blogs = [];
  const result = dummy(blogs);

  expect(result).toBe(1);
});

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

describe("total likes", () => {
  test("when list has one blog, equals the likes of that", () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has 0 blogs, result is 0", () => {
    const result = totalLikes(listWithZeroBlog);
    expect(result).toBe(0);
  });

  test("when multiple blogs, result is the sum of all the likes", () => {
    const result = totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("favorite blog (most likes)", () => {
  test("when list has 0 blogs, result is 0 ", () => {
    const result = favoriteBlog(listWithZeroBlog);
    expect(result).toEqual(null);
  });

  test("when list has 1 blog, result is that blog", () => {
      const result = favoriteBlog(listWithOneBlog)
      expect(result).toEqual(listWithOneBlog[0])
  })

  test("when many blogs, result is the blog with the most likes", () => {
      const result = favoriteBlog(blogs)
      expect(result).toEqual(blogs[2])
  })
});
