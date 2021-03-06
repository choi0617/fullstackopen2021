import React, { useState } from "react";

const Blog = ({ blog, handleLikes, own, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const label = visible ? "hide" : "show";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} by {blog.author}{" "}
        <button onClick={() => setVisible(!visible)}>{label}</button>
      </div>

      {visible && (
        <div>
          <p>url: {blog.url} </p>
          <p>
            likes: {blog.likes}{" "}
            <button onClick={() => handleLikes(blog.id)}>Like</button>{" "}
          </p>
          <p>{blog.user.name}</p>
          {own && <button onClick={() => removeBlog(blog.id)}>Delete</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
