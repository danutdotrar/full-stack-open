const mongoose = require("mongoose");

// Create schema
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: String,
});

// Set format schema
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

// Export module
module.exports = mongoose.model("Blog", blogSchema);
