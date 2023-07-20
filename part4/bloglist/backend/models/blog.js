const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Connect to mongoose
const url = process.env.MONGODB_URI;
console.log("connecting to ", url);

mongoose
    .connect(url)
    .then((result) => console.log("connected to MongoDB"))
    .catch((error) => {
        console.log("error connecting to MongoDB: ", error);
    });

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
