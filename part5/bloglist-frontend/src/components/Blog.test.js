import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog", () => {
    test('renders title and author', () => {
        const blogContent = {
            author: 'Ron Jeffries',
            title: 'You’re NOT gonna need it!',
            url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed/',
            likes: 3,
          }
    
        const component = render(
            <Blog blog={blogContent} />
        )
    
        expect(component.container).toHaveTextContent(blogContent.title)
        expect(component.container).toHaveTextContent(blogContent.author)
        expect(component.container).not.toHaveTextContent(blogContent.url)
    })
})

