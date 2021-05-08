const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
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

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);

  // for (let blog of initialBlogs) {
  //   let blogObj = new Blog(blog);
  //   await blogObj.save();
  // }
});

describe("when there are initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe("viewing a specific blog", () => {
  test("id field is correctly named", async () => {
    const response = await api.get("/api/blogs");
    console.log(response);

    expect(response.body[0].id).toBeDefined();
  });

  test("returns 400 if id is invalid", async () => {
    const invalidId = "00000";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("adding a new blog", () => {
  test("a new blog post is added", async () => {
    const newBlog = {
      title: "Great developer experience",
      author: "Hector Ramos",
      url: "https://jestjs.io/blog/2017/01/30/a-great-developer-experience",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(titles).toContain("Great developer experience");
  });

  test("likes default to 0", async () => {
    const newBlog = {
      title: "Blazing Fast Delightful Testing",
      author: "Rick Hanlon",
      url: "https://jestjs.io/blog/2017/01/30/a-great-developer-experience",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const justAddedBlog = response.body.find((b) => b.url === newBlog.url);

    expect(justAddedBlog.likes).toBe(0);
  });

  test("returns 400 bad request when title or url is missing", async () => {
    const newBlog = {
      author: "Rick Hanlon",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deletion of a blog", () => {
  test("blog post is deleted", async () => {
    await api.delete("/api/blogs/5a422bc61b54a676234d17fc").expect(204);

    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);

    expect(response.body).toHaveLength(initialBlogs.length - 1);
    expect(titles).not.toContain("Type wars");
  });
});

describe("updating a blog", () => {
  test("blog post is updated", async () => {
    const aBlog = await api.get("/api/blogs/5a422bc61b54a676234d17fc");
    await api
      .put("/api/blogs/5a422bc61b54a676234d17fc")
      .send({
        likes: aBlog.body.likes + 1,
      })
      .expect(200);

    const response = await api.get("/api/blogs/5a422bc61b54a676234d17fc");
    expect(response.body.likes).toBe(aBlog.body.likes + 1);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secretpw", 10);
    const user = new User({
      username: "root",
      passwordHash,
    });

    await user.save();
  });

  test("create user succeeds", async () => {
    const usersAtStart = await User.find({});

    // no need for newUser = new User({}) because
    // you are sending newUser data as a POST request
    const newUser = {
      username: "testusername",
      name: "john doe",
      password: "supersecret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain("testusername");
  });

  test("creation of user fails if username is taken", async () => {
    const usersAtStart = await User.find({});

    const newUser = {
      username: "root",
      password: "supersecret",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
