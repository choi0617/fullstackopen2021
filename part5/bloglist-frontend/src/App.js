import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable"
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyWith = (message, type = "success") => {
    setNotification({
      message,
      type,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // does a post request to /api/login then returns response.data to const user
      // which also holds the token
      const user = await loginService.login({
        username,
        password,
      });

      // Values saved to the storage are DOMstrings, so we cannot save a
      // JavaScript object as is.
      // The object has to be parsed to JSON first, with the method JSON.stringify.
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      notifyWith(`${user.name} welcome back!`);
    } catch (exception) {
      notifyWith("wrong username or password", "error");
    }
  };

  const addBlog = async (e) => {
    e.preventDefault();
    const blogObj = {
      title,
      author,
      url,
    };

    const returnedBlog = await blogService.create(blogObj);
    setBlogs([...blogs, returnedBlog]);
    setTitle("");
    setAuthor("");
    setUrl("");
    notifyWith(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added!`
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel={"login"}>
        <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
      </Togglable>
    )
  };

  const blogForm = () => {
    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          title:{" "}
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          author:{" "}
          <input
            type="text"
            name="Author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          url:{" "}
          <input
            type="text"
            name="Url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <button type="submit">create</button>
        </form>
      </div>
    );
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");
  };

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {}
          {user.name} logged in {blogForm()}{" "}
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
