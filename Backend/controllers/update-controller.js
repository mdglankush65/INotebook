const Notes = require('../models/Notes');

const updateNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // creating a new note object and then adding the data
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // find the note to be updated and update it.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found.") }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed.") }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        // if any unwanted error occured then this will run and show the 500 error status.
        console.log({ error: error.message });
        res.status(500).send("Internal Server Error.");
    }
}

module.exports = updateNote;