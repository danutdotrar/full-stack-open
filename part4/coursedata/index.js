const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require(".utils/logger");

//

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const Note = require("./models/note");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

let notes = [];

// Mongo
// const password = "8ErlvsZd3aMIv2Eq";

// const url = `mongodb+srv://fullstackopen:${password}@cluster0.8g4w7fa.mongodb.net/noteApp?retryWrites=true&w=majority`;

// Fetch
app.get("/api/notes", (request, response) => {
    Note.find({}).then((notes) => {
        response.json(notes);
    });
});

app.get("/api/notes/:id", (request, response, next) => {
    Note.findById(request.params.id)
        .then((note) => {
            if (note) {
                response.json(note);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => {
            next(error);
        });
});

app.delete("/api/notes/:id", (request, response, next) => {
    Note.findByIdAndRemove(request.param.id)
        .then((result) => response.status(204).end)
        .catch((error) => next(error));
});

// const generateId = () => {
//     const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
//     return maxId + 1;
// };

app.post("/api/notes", (request, response, next) => {
    const body = request.body;

    if (body.content === undefined) {
        return response.status(400).json({ error: "content missing" });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    });

    note.save()
        .then((savedNote) => {
            response.json(savedNote);
        })
        .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
    const { content, important } = request.body;

    // const note = {
    //     content: body.content,
    //     important: body.important,
    // };

    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: "query" }
    )
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(errorHandler);

// const PORT = process.env.PORT;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
