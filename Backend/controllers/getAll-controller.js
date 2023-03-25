const Notes = require('../models/Notes');

const getAll = async (req, res) => {
    try {
        const note = await Notes.find({ user: req.user.id })
        res.send(note);
    } catch (error) {
        // if any unwanted error occured then this will run and show the 500 error status.
        console.log({ error: error.message });
        res.status(500).send("Internal Server Error.");
    }

}

module.exports =getAll;