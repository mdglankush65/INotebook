const Notes = require('../models/Notes');

const deleteNote = async (req, res) => {

    try {
        // find the note to be deleted and delete it.
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found.") }

        // Allow deletion only if the user owns this note 
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed.") }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted.", note: note });
    } catch (error) {
        // if any unwanted error occured then this will run and show the 500 error status.
        console.log({ error: error.message });
        res.status(500).send("Internal Server Error.");
    }
}

module.exports = deleteNote;