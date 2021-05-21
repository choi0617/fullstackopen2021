import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
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

  const addBlog = async (blog) => {
    try {
      // there is something wrong with setBlogs([...blogs, returnedBlog])
      // i think blogs and returnedBlog are not the same
      const returnedBlog = await blogService.create(blog);
      setBlogs([...blogs, returnedBlog])
      
      notifyWith(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added!`
      );
    } catch (error) {
      notifyWith(error.message, "error");
    }
  };

  const removeBlog = async (id) => {
    const ok = window.confirm("Are you sure you want to delete it?");
    if (ok) {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    }
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
    );
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");
  };

  const handleLikes = async (id) => {
    const blogToLike = blogs.find((b) => b.id === id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    };
    await blogService.update(id, likedBlog);
    setBlogs(
      blogs.map((b) =>
        b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b
      )
    );

    // the code below will not work because setBlogs requires
    // the whole user object not just the user id from likedBlog
    // setBlogs(blogs.map((b) => b.id === id ? { ...likedBlog} : b))
  };

  // .sort sorts the array in place (mutates the original array)
  const sortByLikes = (a, b) => b.likes - a.likes;
 
  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {}
          {user.name} logged in <BlogForm addBlog={addBlog} />
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          {blogs.sort(sortByLikes).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              own={blog.user.username === user.username}
              removeBlog={removeBlog}
              handleLikes={handleLikes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
