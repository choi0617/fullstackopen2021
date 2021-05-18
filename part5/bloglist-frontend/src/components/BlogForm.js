import React, { useState } from "react";

const BlogForm = ({addBlog}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addBlog({title, author, url});
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
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

export default BlogForm;
