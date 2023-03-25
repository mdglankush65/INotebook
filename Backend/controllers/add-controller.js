const Notes = require('../models/Notes');
const { validationResult } = require('express-validator');

const addNotes = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // if there are errors then return bad requests and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.send(savedNote);
    } catch (error) {
        // if any unwanted error occured then this will run and show the 500 error status.
        console.log({ error: error.message });
        res.status(500).send("Internal Server Error.");
    }
}

module.exports=addNotes;