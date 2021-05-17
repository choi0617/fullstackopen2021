import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

    }
  }, [])

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

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username:{" "}
          <input
            type="text"
            name="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form>
        <input type="text" placeholder="add blog" />
      </form>
    );
  };

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogUser")
  };

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      {user === null ? (
        loginForm()
      ) : (
        <div>
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
