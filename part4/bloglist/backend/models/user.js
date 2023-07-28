const mongoose = require("mongoose");

// Create User Schema
const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    // The user has an array of references to all of the notes created by him
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
});

// Set User Schema
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash;
    },
});

// Define model
const User = mongoose.model("User", userSchema);

module.exports = User;
