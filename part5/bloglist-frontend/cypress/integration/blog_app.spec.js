describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    cy.request("POST", "http://localhost:3003/api/users/", {
      name: "john doe",
      username: "jdoe",
      password: "password",
    });
    cy.request("POST", "http://localhost:3003/api/users/", {
      name: "john adams",
      username: "jadams",
      password: "password",
    });
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("jdoe");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("john doe logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("jdoe");
      cy.get("#password").type("wrongpw");
      cy.get("#login-button").click();
      cy.contains("wrong username or password");
    });
  });

  describe("When logged in . . .", function () {
    beforeEach(function () {
      cy.login({ username: "jdoe", password: "password" });
    });

    it("A blog can be created", function () {
      cy.addBlog({
        title: "new blog 1",
        author: "author_1",
        url: "url_1.com",
      });

      cy.contains("new blog 1 by author_1");
    });
  });

  describe("When blogs exist", function () {
    beforeEach(function () {
      cy.login({ username: "jdoe", password: "password" });
      cy.addBlog({
        title: "new blog 1",
        author: "John Doe",
        url: "url_1.com",
      });
      cy.addBlog({
        title: "new blog 2",
        author: "John Doe",
        url: "url_2.com",
      });
      cy.contains("logout").click();
      cy.login({ username: "jadams", password: "password" });
      cy.addBlog({
        title: "new blog 3",
        author: "John Adams",
        url: "url_3.com",
      });
      cy.addBlog({
        title: "new blog 4",
        author: "John Adams",
        url: "url_4.com",
      });

      cy.contains("new blog 1").parent().as("blog1");
      cy.contains("new blog 2").parent().as("blog2");
      cy.contains("new blog 3").parent().as("blog3");
      cy.contains("new blog 4").parent().as("blog4");
    });

    it("a blog can be liked", function () {
      cy.get("@blog2").contains("show").click();
      cy.get("@blog2").contains("Like").click();
      cy.get("@blog2").contains("likes: 1");
    });

    it("only the owner can delete their posts", function () {
      cy.get("@blog3").contains("show").click();
      cy.get("@blog3").contains("Delete").click();
      // cy.get("html").should("not.contain", "new blog 3");
      cy.contains("new blog 3").should("not.exist");

      cy.get("@blog2").contains("show").click();
      cy.get("@blog2").should("not.contain", "Delete");
    });

    it.only("likes are ordered", function () {
      cy.get("@blog1").contains("show").click();
      cy.get("@blog1").contains("Like").click();
      cy.get("@blog1").contains("Like").click();
      cy.get("@blog1").contains("Like").click();

      cy.get("@blog2").contains("show").click();
      cy.get("@blog2").contains("Like").click();
      cy.get("@blog2").contains("Like").click();

      cy.get("@blog3").contains("show").click();
      cy.get("@blog3").contains("Like").click();

      cy.get("@blog4").contains("show").click();

      cy.get(".blog").then((blogs) => {
        // console.log("# of blogs", blogs);
        cy.wrap(blogs[0]).contains("likes: 3");
        cy.wrap(blogs[1]).contains("likes: 2");
        cy.wrap(blogs[2]).contains("likes: 1");
        cy.wrap(blogs[3]).contains("likes: 0");
      });
    });
  });
});
