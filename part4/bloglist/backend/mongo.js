const mongoose = require("mongoose");

const password = process.argv[2]; // 'blog-list'

const url = `mongodb+srv://morarasudanut:${password}@cluster2.jpxqy0e.mongodb.net/blog-list-app?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Create schema - tells Mongo how the objects will be stored in the database
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: String,
});

// Define model
const Blog = mongoose.model("Blog", blogSchema);

// Create a new object with the help of the Blog model
const blog = new Blog({
    title: "String",
    author: "String",
    url: "String",
    likes: "String",
});

// blog.save().then((result) => {
//     console.log("blog save");
//     mongoose.connection.close();
// });

Blog.find({}).then((result) => {
    result.forEach((blog) => {
        console.log(blog);
    });
    mongoose.connection.close();
});
