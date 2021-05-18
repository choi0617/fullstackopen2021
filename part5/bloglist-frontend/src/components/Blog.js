import React, { useState } from "react";
import Togglable from "../components/Togglable"

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view">
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes}</p>
      </Togglable>
    </div>
  );
};

export default Blog;
