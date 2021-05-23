import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog", () => {
  test("renders title and author", () => {
    const blogContent = {
      author: "Ron Jeffries",
      title: "You’re NOT gonna need it!",
      url: "https://ronjeffries.com/xprog/articles/practices/pracnotneed/",
      likes: 3,
    };

    const component = render(<Blog blog={blogContent} />);

    expect(component.container).toHaveTextContent(blogContent.title);
    expect(component.container).toHaveTextContent(blogContent.author);
    expect(component.container).not.toHaveTextContent(blogContent.url);
  });

  test("expands blog's url and likes when button clicked", () => {
    const blogContent = {
      author: "Ron Jeffries",
      title: "You’re NOT gonna need it!",
      url: "https://ronjeffries.com/xprog/articles/practices/pracnotneed/",
      likes: 3,
      user: {
        name: "john doe",
      },
    };

    const component = render(<Blog blog={blogContent} />);
    const button = component.getByText("show");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(blogContent.url);
    expect(component.container).toHaveTextContent(blogContent.likes);
    expect(component.container).toHaveTextContent(blogContent.user.name);
  });

  test("when liked twice, the event handler gets called twice", () => {
    const blogContent = {
      author: "Ron Jeffries",
      title: "You’re NOT gonna need it!",
      url: "https://ronjeffries.com/xprog/articles/practices/pracnotneed/",
      likes: 3,
      user: {
        name: "john doe",
      },
    };

    const handleLikes = jest.fn();

    const component = render(
      <Blog blog={blogContent} handleLikes={handleLikes} />
    );

    const showButton = component.getByText("show");
    fireEvent.click(showButton);

    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(handleLikes.mock.calls).toHaveLength(2);
  });
});
