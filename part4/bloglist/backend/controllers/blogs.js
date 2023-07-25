const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
    try {
        const blog = await Blog.find({});
        response.json(blog);
    } catch (expression) {
        next(expression);
    }
});

blogsRouter.get("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);

        if (blog) {
            response.json(blog);
        } else {
            response.status(404).send({ error: "malformatted id" });
        }
    } catch (error) {
        next(error);
    }
});

blogsRouter.post("/", async (request, response, next) => {
    const blog = new Blog(request.body);

    try {
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const blog = { ...body, likes: body.likes };

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then((updatedBlog) => {
            response.json(updatedBlog);
        })
        .catch((error) => next(error));
});

module.exports = blogsRouter;
