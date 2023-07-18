// const express = require("express");
// const app = express();
// const cors = require("cors");
// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number,
// });

// const Blog = mongoose.model("Blog", blogSchema);

// const mongoUrl = "mongodb://localhost/bloglist";
// mongoose.connect(mongoUrl);

// app.use(cors());
// app.use(express.json());

// app.get("/api/blogs", (request, response) => {
//     Blog.find({}).then((blogs) => {
//         response.json(blogs);
//     });
// });

// app.post("/api/blogs", (request, response) => {
//     const blog = new Blog(request.body);

//     blog.save().then((result) => {
//         response.status(201).json(result);
//     });
// });

// require express
const express = require("express");

// store express app in a variable
const app = express();

// access data with json-parser
app.use(express.json());

let blogs = [
    {
        title: "Test 1",
        author: "Test 1",
        url: "url1",
        likes: "11",
        id: 1,
    },
    {
        title: "Test 22",
        author: "Test 2",
        url: "url1",
        likes: "12",
        id: 2,
    },
    {
        title: "Test 333",
        author: "Test 3",
        url: "url1",
        likes: "13",
        id: 3,
    },
    {
        title: "asdasdsda",
        author: "sdasdasadasd",
        url: "dassddasdas",
        likes: "123",
        id: 9641,
    },
    {
        title: "asdsdaasddasdsa",
        author: "dsadsadsadsadas",
        url: "dasadssdadsadas",
        likes: "1222222222222",
        id: 7630,
    },
];

// Create routes
app.get("/", (request, response) => {
    response.send("<h1>Hello from back end</h1>");
});

app.get("/api/blogs", (request, response) => {
    response.json(blogs);
});

// Fetch a single resource
app.get("/api/blogs/:id", (request, response) => {
    const id = Number(request.params.id);

    const blog = blogs.find((blog) => {
        return blog.id === id;
    });

    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

// Delete a resourse
app.delete("/api/blogs/:id", (request, response) => {
    const id = Number(request.params.id);
    blogs = blogs.filter((blog) => blog.id !== id);

    response.status(204).end();
});

// PORT listening
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
