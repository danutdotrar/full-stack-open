const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// To create a new user, we will need to make a HTTP POST request to the users path
usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    // bcrypt settings
    const saltRounds = 10;
    // We will store the hash of the password
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new User
    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

// Return all the users from the database
usersRouter.get("/", async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

module.exports = usersRouter;
