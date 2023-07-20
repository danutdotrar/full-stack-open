require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/blog");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs);
    });
});

app.get("/api/blogs/:id", (request, response, next) => {
    Blog.findById(request.params.id)
        .then((result) => {
            if (result) {
                response.json(result);
            } else {
                response.status(404).send({ error: "malformatted id" });
            }
        })
        .catch((error) => next(error));
});

app.delete("/api/blog/:id", (request, response) => {
    Blog.findByIdAndRemove(request.params.id)
        .then((result) => response.status(204).end())
        .catch((error) => console.log(error));
});

app.post("/api/blogs", (request, response) => {
    const blog = new Blog(request.body);

    blog.save().then((result) => {
        response.status(201).json(result);
    });
});

// PORT listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// // Remade backend - old
// require("dotenv").config();
// // Require express
// const express = require("express");

// // Store express app function in a variable
// const app = express();

// const Blog = require("./models/blog");

// // Allow requests from all origins using cors
// const cors = require("cors");
// app.use(cors());

// // Access data with json-parser
// app.use(express.json());

// app.use(express.static("build"));

// // Connect to mongoose
// const mongoose = require("mongoose");

// const url = `mongodb+srv://morarasudanut:blog-list@cluster2.jpxqy0e.mongodb.net/blog-list-app?retryWrites=true&w=majority`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

// // Create server routes /api/blogs
// app.get("/api/blogs", (request, response) => {
//     Blog.find({}).then((blog) => {
//         response.json(blog);
//     });
// });

// // Fetch a single resource
// app.get("/api/blogs/:id", (request, response, next) => {
//     Blog.findById(request.params.id)
//         .then((blog) => {
//             if (blog) {
//                 response.json(blog);
//             } else {
//                 response.status(404).end();
//             }
//         })
//         .catch((error) => {
//             next(error);
//         });
// });

// // Delete a resource
// app.delete("/api/blogs/:id", (request, response) => {
//     // const id = Number(request.params.id);
//     // blogs = blogs.filter((blog) => blog.id !== id);
//     Blog.findByIdAndRemove(request.params.id)
//         .then((result) => response.status(204).end())
//         .catch((error) => console.log(error));
// });

// // Add a resource
// app.post("/api/blogs", (request, response) => {
//     const body = request.body;

//     if (!body.title && !body.author) {
//         response.status(400).json({
//             error: "Title and Author is missing",
//         });
//     }

//     const blog = new Blog({
//         title: body.title,
//         author: body.author,
//         url: body.url,
//         likes: body.likes,
//     });

//     // Save data
//     blog.save().then((savedBlog) => {
//         response.json(savedBlog);
//     });
// });
