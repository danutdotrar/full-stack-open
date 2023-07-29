const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
    try {
        const blog = await Blog.find({}).populate("user", {
            username: 1,
            name: 1,
        });
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
    const body = request.body;

    const user = await User.findById(body.userId);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    try {
        const body = request.body;

        const blogObj = { ...body, likes: body.likes };

        const blog = await Blog.findByIdAndUpdate(request.params.id, blogObj, {
            new: true,
        });
        response.json(blog);
    } catch (exception) {
        next(exception);
    }
});

module.exports = blogsRouter;
