const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const Note = require("./models/note");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

let notes = [];

// Mongo

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = "8ErlvsZd3aMIv2Eq";

const url = `mongodb+srv://fullstackopen:${password}@cluster0.8g4w7fa.mongodb.net/noteApp?retryWrites=true&w=majority`;

// mongoose.set("strictQuery", false);
// mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
});

// Format object
noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

// const Note = mongoose.model("Note", noteSchema);

// Fetch
app.get("/api/notes", (request, response) => {
    Note.find({}).then((notes) => {
        response.json(notes);
    });
    // response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
    // const id = Number(request.params.id);
    // const note = notes.find((note) => note.id === id);

    // if (note) {
    //     response.json(note);
    // } else {
    //     response.status(404).end();
    // }

    Note.findById(request.params.id).then((note) => {
        response.json(note);
    });
});

app.delete("/api/notes/:id", (request, response) => {
    const id = Number(request.params.id);
    notes = notes.filter((note) => note.id !== id);

    response.status(204).end();
});

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
};

app.post("/api/notes", (request, response) => {
    const body = request.body;

    if (body.content === undefined) {
        return response.status(400).json({ error: "content missing" });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    });

    note.save().then((savedNote) => {
        response.json(savedNote);
    });
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
