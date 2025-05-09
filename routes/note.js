const express = require("express");
const noteRoutes = express.Router();
const Note = require("../models/Note");
const tokenAuth = require("../middleware/tokenValid");
const { titleAndContentValid, idValid } = require("../middleware/noteValid");
const checkErrors = require("../middleware/expValidatorResult");

// Create a new note
noteRoutes.post("/", tokenAuth, titleAndContentValid, checkErrors, async (req, res, next) => {
    try {
        const { title, content } = req.body;

        // check if this title or content is exist or not
        let check = await Note.findOne({ title: title }).exec();
        if (check) return res.status(409).json({ success: false, msg: "this title is already exist" });
        check = await Note.findOne({ content: content }).exec();
        if (check) return res.status(409).json({ success: false, msg: "this content is already exist" });

        const newNote = new Note({ title: title, content: content, author: req.payload.id });
        await newNote.save();
        return res.status(200).json({ success: true, msg: "note made successfuly", newNote });
    } catch (err) {
        next(err)
    }
})

// View all notes
noteRoutes.get("/", tokenAuth, async (req, res, next) => {
    try {
        const notes = await Note.find({});
        return res.status(200).json(notes);
    } catch (err) {
        next(err)
    }
})

// View a single note through path prameters
noteRoutes.get("/:id", tokenAuth, idValid, checkErrors, async (req, res, next) => {
    try {
        const note = await Note.findOne({ _id: req.params.id }).populate("author", "username email").exec();
        if (!note) return res.status(404).json({ success: false, msg: "note not found" });
        return res.status(200).json(note);
    } catch (err) {
        next(err)
    }
})

// Update a note (only author can update his note)
noteRoutes.patch("/:id", tokenAuth, idValid, titleAndContentValid, checkErrors, async (req, res, next) => {
    try {
        const { title, content } = req.body;

        // find this note and check if it exist or not 
        const note = await Note.findOne({ _id: req.params.id }).exec();
        if (!note) return res.status(404).json({ success: false, msg: "note not found" });

        // check if author of this task is the current user (authorization) 
        if (note.author != req.payload.id) return res.status(403).send({ success: false, msg: "you are not allowed to update this note" })

        // check if the title exist or not 
        const checkTitle = await Note.findOne({ title: title }).exec();
        if (checkTitle) return res.status(409).json({ success: false, msg: "this title is already exist" });

        // start updating the task     
        const updatedNote = await Note.findOneAndUpdate({ _id: req.params.id }, { title: title, content: content }, { new: true })
        return res.status(200).json({ success: true, msg: "note updated successfuly", msg: updatedNote });
    } catch (err) {
        next(err)
    }
})

// Delete a note
noteRoutes.delete("/:id", tokenAuth, idValid, checkErrors, async (req, res, next) => {
    try {
        // find this note and check if it exist or not 
        const note = await Note.findOne({ _id: req.params.id }).exec();
        if (!note) return res.status(404).json({ success: false, msg: "note not found" });

        // check if author of this task is the current user 
        if (note.author != req.payload.id) return res.status(403).send({ success: false, msg: "you are not allowed to delete this note" })

        // start delete the task     
        const deletedNote = await Note.findByIdAndDelete({ _id: req.params.id })
        return res.status(200).json({ success: true, msg: `${deletedNote.title} has been deleted succesfully` });
    } catch (err) {
        next(err)
    }
})

module.exports = noteRoutes;