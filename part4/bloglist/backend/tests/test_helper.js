const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "Test",
        author: "Test author",
        url: "test url",
        likes: "1",
    },
];

const nonExistingId = async () => {
    const blog = new Blog({
        title: "Test",
        author: "Test author",
        url: "test url",
        likes: "1",
    });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
};
