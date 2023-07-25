const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("the returned length is correct", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(3);
});

test("the unique identifier is named id", async () => {
    const response = await api.get("/api/blogs");

    const content = response.body.map((r) => r.id);

    expect(content).toBeDefined();
});

test("add a new blog is working", async () => {
    const newBlog = {
        title: "New Blog Test 123",
        author: "new blog",
        url: "urlhurl",
        likes: "999",
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
    await mongoose.connection.close();
});
